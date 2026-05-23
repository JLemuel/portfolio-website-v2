# Project 01 — Content Repurposing Engine (Zapier)

> Turn one long-form piece of content (blog post, podcast transcript, YouTube video)
> into a LinkedIn post, X thread, newsletter intro, and 3 quote-card captions —
> automatically, in the brand's voice.

**Stack:** Notion (source + destination) · Zapier (orchestration) · OpenAI GPT-4o-mini

**Estimated time to ship:** 2–3 hours including testing.

---

## 1. Architecture

```
┌─────────────────────┐        ┌────────────────────┐
│  Notion             │        │  Zapier            │
│  Source Content DB  │───────▶│  Trigger: New row  │
│  (Status = Ready)   │        │  with Status=Ready │
└─────────────────────┘        └─────────┬──────────┘
                                         │
                                         ▼
                               ┌──────────────────┐
                               │  Formatter       │
                               │  Truncate body   │
                               │  to ~6,000 chars │
                               └─────────┬────────┘
                                         │
                                         ▼
                          ┌──────────────────────────────┐
                          │  4 × OpenAI Steps            │
                          │   ① LinkedIn post            │
                          │   ② X thread (5-8 tweets)    │
                          │   ③ Newsletter intro         │
                          │   ④ 3 quote-card captions    │
                          └──────────────┬───────────────┘
                                         │
                                         ▼
                          ┌──────────────────────────────┐
                          │  Notion                      │
                          │  Generated Drafts DB         │
                          │  (one row, 4 fields filled)  │
                          └──────────────────────────────┘
```

---

## 2. Notion setup

### Database A — `Source Content`

| Property      | Type            | Notes                                                       |
|---------------|-----------------|-------------------------------------------------------------|
| `Title`       | Title           | Original piece title                                        |
| `Source URL`  | URL             | Optional — original link                                    |
| `Body`        | Text            | The long-form content (paste blog text / transcript here)   |
| `Brand`       | Select          | e.g. `Acme`, `Self` — lets you serve multiple brands later  |
| `Status`      | Select          | `Draft` · `Ready` · `Processed`                             |
| `Processed At`| Date            | Filled by Zapier when complete                              |

### Database B — `Generated Drafts`

| Property            | Type   | Notes                                                  |
|---------------------|--------|--------------------------------------------------------|
| `Title`             | Title  | Mirror of source title + " — Drafts"                   |
| `Source`            | Relation → Source Content | Link back to the source row            |
| `LinkedIn Post`     | Text   | Filled by Zapier                                       |
| `X Thread`          | Text   | One tweet per line, numbered                           |
| `Newsletter Intro`  | Text   | Two paragraphs                                         |
| `Quote Captions`    | Text   | Three short captions, one per line                     |
| `Status`            | Select | `New` · `Approved` · `Published`                       |
| `Created At`        | Created time | Auto                                             |

---

## 3. The Zap, step by step

### Step 1 — Trigger: Notion → "New Database Item"

- **Database:** `Source Content`
- **Filter (in trigger):** `Status` equals `Ready`
- Test with one existing row that has Status=Ready.

### Step 2 — Filter (Zapier built-in)

> Optional but recommended. Skip rows without a `Body`.

- **Only continue if:** `Body` (text) exists.

### Step 3 — Formatter by Zapier: "Truncate"

- **Transform:** Truncate
- **Input:** `Body` from step 1
- **Max length:** `6000` characters
- **Append ellipsis:** No
- This keeps us safely inside GPT-4o-mini's context window without paying for tokens you don't need.

### Step 4 — OpenAI: Generate LinkedIn Post

- **Model:** `gpt-4o-mini`
- **Temperature:** `0.7`
- **System message:** see prompt §4.1
- **User message:** the truncated body from step 3
- **Output field name:** map to `LinkedIn Post`

### Step 5 — OpenAI: Generate X Thread

- Same model + temp. System prompt §4.2.

### Step 6 — OpenAI: Generate Newsletter Intro

- Same model. Temperature `0.6`. System prompt §4.3.

### Step 7 — OpenAI: Generate Quote Captions

- Same model. Temperature `0.8` (a bit more playful). System prompt §4.4.

### Step 8 — Notion: Create Database Item

- **Database:** `Generated Drafts`
- **Title:** `{{Step 1 Title}} — Drafts`
- **Source (relation):** `{{Step 1 Page ID}}`
- **LinkedIn Post:** `{{Step 4 Output}}`
- **X Thread:** `{{Step 5 Output}}`
- **Newsletter Intro:** `{{Step 6 Output}}`
- **Quote Captions:** `{{Step 7 Output}}`
- **Status:** `New`

### Step 9 — Notion: Update Database Item (close the loop)

- **Database:** `Source Content`
- **Item:** `{{Step 1 Page ID}}`
- **Status:** `Processed`
- **Processed At:** `{{zap_meta_human_now}}`

---

## 4. The prompts

> All four prompts share a **brand voice preamble**. Customize the bracketed
> bits per client. The current voice is "indie hacker / founder" — punchy,
> specific, no LinkedIn-influencer fluff.

### Brand voice preamble (paste at the top of every system prompt)

```
You are a writer for [BRAND NAME], a [ONE-LINE DESCRIPTION]. Their voice is:
- Specific over generic. Concrete numbers, examples, names.
- Plain English. No "leverage", no "synergy", no "in today's fast-paced world".
- Short sentences. Punchy. Confident without being arrogant.
- One clear idea per piece. Cut anything that doesn't serve it.
- Honest. If something is hard, say it's hard. If something failed, say so.

NEVER use these words: leverage, synergy, paradigm, journey, ecosystem,
unlock, game-changing, revolutionary, deep dive, in today's, at the end of the day.
```

### 4.1 LinkedIn post

```
[BRAND VOICE PREAMBLE]

Take the article below and write ONE LinkedIn post that someone in the
[TARGET ROLE, e.g. "founders, marketers, technical PMs"] audience would
stop scrolling for.

Rules:
- 180–250 words.
- Open with a hook line that's either a sharp claim, a surprising number,
  or a one-sentence story. Never start with "I" or "Excited to share".
- Body: 3–5 punchy paragraphs, one idea each. Use line breaks generously.
- Close with a single open question to drive comments.
- No hashtags. No emojis except one (1) optional at the very end.
- Output ONLY the post text. No preamble, no "Here's your post:", nothing.

Article:
"""
{user_message}
"""
```

### 4.2 X thread

```
[BRAND VOICE PREAMBLE]

Turn the article below into an X (Twitter) thread of 5 to 8 tweets.

Rules:
- Tweet 1 is the hook — make me want to read tweet 2.
- Each tweet 220 characters or less.
- One idea per tweet. No "1/" "2/" — Twitter numbers them automatically.
- Last tweet ends with a callback or a soft CTA (link back to source, etc.).
- No hashtags. No emojis.

Format the output exactly like this, one tweet per line, separated by a
single blank line:

[tweet 1]

[tweet 2]

[tweet 3]
...

Article:
"""
{user_message}
"""
```

### 4.3 Newsletter intro

```
[BRAND VOICE PREAMBLE]

Write a 2-paragraph newsletter intro that teases the article below to
get readers to click through.

Paragraph 1: A specific scene, story, or surprising stat from the piece.
4–5 sentences max.

Paragraph 2: What the reader will learn / why they should care. End with
one sentence that points them to the full article.

No subject line. No "Hey friends," No sign-off. Just the two paragraphs.

Article:
"""
{user_message}
"""
```

### 4.4 Quote captions

```
[BRAND VOICE PREAMBLE]

Pull THREE quote-card captions from the article below. Each caption is a
short, standalone insight that would work as text on a square image.

Rules:
- Each caption: 12–20 words max.
- Punchy. Quotable. A claim, not a question.
- Self-contained — don't reference "the article" or "above".
- No hashtags, no emojis, no attribution.

Output exactly three captions, one per line, with no numbering or bullets.

Article:
"""
{user_message}
"""
```

---

## 5. Testing checklist

- [ ] Create one Source Content row with a real ~2,000 word article. Set Status=Ready.
- [ ] Run the Zap manually (don't turn it on yet).
- [ ] Check each OpenAI step output in Zapier history.
- [ ] Confirm Generated Drafts row was created with all 4 fields filled.
- [ ] Confirm Source row Status flipped to `Processed`.
- [ ] Read the outputs critically:
  - Does the LinkedIn post sound like the brand?
  - Is the X thread actually 5–8 tweets, each <280 chars?
  - Does the newsletter intro hook the reader?
  - Are the captions quotable?
- [ ] If anything feels off, iterate the prompt and re-run.
- [ ] Once happy, **turn the Zap ON**.

---

## 6. Cost estimate

- GPT-4o-mini at current pricing: ~$0.0002 per generation pair (4 outputs).
- Zapier free tier: 100 tasks/month. This Zap uses ~6 tasks per source piece → ~16 pieces/month free.
- For volume, upgrade to Zapier Starter ($19.99/mo, 750 tasks).

---

## 7. Portfolio case study source text

> This text becomes the "Problem / Solution / Outcome" inside the
> portfolio modal once we ship.

**Problem.** Content teams produce one great long-form asset and then
spend the next two days manually chopping it into LinkedIn carousels,
X threads, and newsletter blurbs. Distribution is where the reach lives,
and it always slips.

**Solution.** A Zapier workflow watches a Notion "Source Content"
database. The moment a row flips to `Ready`, four GPT-4o-mini calls
generate platform-native variations in the brand's voice — LinkedIn,
X, newsletter intro, three quote captions — and drop them all into a
"Generated Drafts" database in Notion for human approval. Total run
time: ~30 seconds per piece. Total cost: less than a tenth of a cent.

**Outcome.** Six-plus assets per long-form piece, in under a minute,
in voice. Content teams ship 3–5× more distribution per upstream piece
without hiring.

---

## 8. Next steps for John

1. Sign up for Zapier (free tier).
2. Get an OpenAI API key — https://platform.openai.com/api-keys
   (~$5 prepaid credit is plenty for testing).
3. Create the two Notion databases per §2.
4. Build the Zap per §3, using the prompts in §4.
5. Test per §5. Screenshot each step + the final Notion drafts.
6. Send screenshots back — I'll fold them into the portfolio case study.
