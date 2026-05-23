# Project 02 — Lead Qualification Pipeline (n8n)

> Capture inbound leads from any source, enrich and score them with GPT-4,
> sync to GoHighLevel as a contact, and ping the right sales rep in Slack
> with an AI-drafted opening message — all within 5 minutes of submission.

**Stack:** n8n (orchestration) · OpenAI GPT-4 · GoHighLevel (CRM) · Slack (notifications) · Clearbit/Apollo (enrichment, optional)

**Estimated time to ship:** 4–6 hours including testing and ICP tuning.

---

## 1. Architecture

```
┌──────────────────────┐
│  Inbound sources     │
│  • Webform           │
│  • GHL form          │──┐
│  • Calendly          │  │
│  • Email parser      │  │
└──────────────────────┘  │
                          ▼
              ┌─────────────────────────┐
              │  n8n Webhook Trigger    │
              │  POST /lead-intake      │
              └────────────┬────────────┘
                           │
                           ▼
              ┌─────────────────────────┐
              │  Normalize (Function)   │
              │  email, name, company,  │
              │  message, source, utm   │
              └────────────┬────────────┘
                           │
                           ▼
              ┌─────────────────────────┐
              │  Enrich (HTTP Request)  │
              │  Clearbit / Apollo      │
              │  → industry, size,      │
              │    stack, title         │
              └────────────┬────────────┘
                           │
                           ▼
              ┌─────────────────────────┐
              │  OpenAI: Score 0–100    │
              │  vs ICP rubric          │
              │  → score, reasons,      │
              │    bucket (hot/warm/cold)│
              └────────────┬────────────┘
                           │
            ┌──────────────┴──────────────┐
            ▼                             ▼
  ┌──────────────────┐         ┌──────────────────────┐
  │  GHL: Upsert     │         │  IF score > 75       │
  │  contact + tags  │         │  (Hot lead)          │
  │  + custom fields │         └─────────┬────────────┘
  └──────────────────┘                   │
                                         ▼
                            ┌──────────────────────────┐
                            │  OpenAI: Draft opener    │
                            │  personalized to lead    │
                            └──────────┬───────────────┘
                                       │
                                       ▼
                            ┌──────────────────────────┐
                            │  Slack: DM the right rep │
                            │  (channel routed by      │
                            │   territory / vertical)  │
                            └──────────────────────────┘
            ▼
  (warm/cold) → GHL nurture sequence + daily digest email
```

---

## 2. The ICP rubric (define this FIRST)

> The whole pipeline is only as good as this document. Write it before you
> build a single node. Keep it under one page.

### Template — fill this in with the client

```
IDEAL CUSTOMER PROFILE — [CLIENT NAME]

FIRMOGRAPHIC (must-haves)
- Company size: [e.g. 10–200 employees]
- Industry: [e.g. B2B SaaS, professional services]
- Geography: [e.g. North America, EU]
- Tech stack signals: [e.g. uses HubSpot OR Salesforce]
- Revenue range: [e.g. $1M–$50M ARR]

PERSONA (the human filling the form)
- Job titles: [e.g. Head of Ops, COO, RevOps Manager]
- Seniority: [Director or above]
- Buying authority: budget owner or strong influencer

INTENT SIGNALS (boost score)
- Mentions current pain ("we're drowning in...", "manually doing...")
- Mentions current tools (suggests integration awareness)
- Specific timeline ("by end of Q3", "before our offsite")
- Asks about pricing / implementation

DISQUALIFIERS (auto-cold)
- Personal Gmail/Yahoo/Hotmail email AND no company name
- Student / academic / job-seeker tone
- Competitor domain
- Country outside service area
- "Just curious" / "doing research"

SCORING GUIDE
- 90–100: Hot — firmographic match + senior persona + clear intent
- 75–89:  Hot — firmographic match + senior persona, intent unclear
- 50–74:  Warm — partial match, needs nurture
- 25–49:  Cold — wrong size/industry, low intent
- 0–24:   Disqualified — auto-route to graveyard
```

Save this rubric in a `system prompt` field on the OpenAI node. It is the
single source of truth.

---

## 3. n8n setup, step by step

### Step 1 — Webhook trigger

- **Node:** `Webhook`
- **HTTP Method:** `POST`
- **Path:** `lead-intake`
- **Response Mode:** `Last Node` (so the form gets a real response)
- **Authentication:** Header Auth, `X-API-Key: <random secret>`

Test with curl:

```bash
curl -X POST https://<your-n8n>/webhook/lead-intake \
  -H "X-API-Key: <secret>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Founder",
    "email": "jane@acme.io",
    "company": "Acme",
    "message": "We are drowning in manual onboarding and need help by Q3",
    "source": "website-form",
    "utm_source": "linkedin"
  }'
```

### Step 2 — Normalize (Function node)

```javascript
const body = $input.first().json.body ?? $input.first().json;

return [{
  json: {
    name: (body.name || '').trim(),
    email: (body.email || '').toLowerCase().trim(),
    company: (body.company || '').trim(),
    message: (body.message || '').trim(),
    source: body.source || 'unknown',
    utm_source: body.utm_source || null,
    utm_campaign: body.utm_campaign || null,
    submitted_at: new Date().toISOString(),
    domain: (body.email || '').split('@')[1] || null,
  }
}];
```

### Step 3 — Filter out obvious junk (IF node)

Drop the lead and exit early if any of these are true:

- `email` is empty
- `email` matches a personal-email regex `^[^@]+@(gmail|yahoo|hotmail|outlook|icloud)\.`
  AND `company` is empty
- `domain` is in your competitor blocklist

For dropped leads, branch to a "log only" Notion/Airtable row so you can audit later.

### Step 4 — Enrich (HTTP Request node)

> Optional but high-leverage. Skip if budget is tight.

- **URL:** `https://api.clearbit.com/v2/companies/find?domain={{$json.domain}}`
- **Auth:** Bearer `<CLEARBIT_KEY>` (or use Apollo, similar shape)
- **Continue on fail:** ON — enrichment failures should NOT kill the workflow

Merge the enrichment response back onto the lead object:

```javascript
const lead = $('Normalize').first().json;
const enrich = $input.first().json;
return [{
  json: {
    ...lead,
    industry: enrich?.category?.industry || null,
    company_size: enrich?.metrics?.employees || null,
    company_revenue: enrich?.metrics?.estimatedAnnualRevenue || null,
    tech_stack: enrich?.tech || [],
    company_country: enrich?.geo?.country || null,
  }
}];
```

### Step 5 — Score with OpenAI

- **Node:** `OpenAI` (or `HTTP Request` to /chat/completions)
- **Model:** `gpt-4o` (use `gpt-4o-mini` if cost-sensitive)
- **Temperature:** `0.2` (scoring should be repeatable)
- **Response Format:** `JSON object`
- **System prompt:** see §4
- **User message:**

```
Lead submission:
- Name: {{name}}
- Email: {{email}}
- Company: {{company}}
- Domain: {{domain}}
- Message: {{message}}
- Source: {{source}} (utm: {{utm_source}} / {{utm_campaign}})

Enrichment:
- Industry: {{industry}}
- Company size: {{company_size}} employees
- Estimated revenue: {{company_revenue}}
- Tech stack: {{tech_stack}}
- Country: {{company_country}}
```

Parse the JSON output into structured fields (`score`, `bucket`, `reasons`,
`disqualifiers`, `suggested_opener_angle`).

### Step 6 — Upsert into GHL

- **Node:** `HTTP Request` (GHL API v2)
- **Method:** `POST` → `https://services.leadconnectorhq.com/contacts/upsert`
- **Headers:** `Authorization: Bearer <GHL_TOKEN>`, `Version: 2021-07-28`
- **Body:**

```json
{
  "locationId": "<LOCATION_ID>",
  "email": "{{$json.email}}",
  "firstName": "{{$json.name.split(' ')[0]}}",
  "lastName": "{{$json.name.split(' ').slice(1).join(' ')}}",
  "companyName": "{{$json.company}}",
  "tags": ["lead-pipeline", "score-{{$json.bucket}}", "src-{{$json.source}}"],
  "customFields": [
    {"key": "lead_score", "field_value": "{{$json.score}}"},
    {"key": "lead_reasons", "field_value": "{{$json.reasons}}"},
    {"key": "icp_industry", "field_value": "{{$json.industry}}"}
  ]
}
```

### Step 7 — Branch on score (Switch node)

| Bucket   | Score range | Route to                                              |
|----------|-------------|-------------------------------------------------------|
| Hot      | 75–100      | Step 8 (Slack ping)                                   |
| Warm     | 50–74       | GHL workflow `nurture-warm` (drip campaign)           |
| Cold     | 25–49       | GHL workflow `nurture-cold` (newsletter only)         |
| DQ       | 0–24        | Add tag `dq` + exit (no further automation)           |

### Step 8 — OpenAI: draft a personalized opener (Hot only)

- **Model:** `gpt-4o-mini`
- **Temperature:** `0.7`
- **System prompt:** see §4.2
- **User message:** the full enriched lead + the `suggested_opener_angle`
  from Step 5

### Step 9 — Slack: ping the right rep

- **Node:** `Slack` (or HTTP to Slack incoming webhook)
- **Channel:** route by territory or vertical
  - US East → `#sales-east`
  - US West → `#sales-west`
  - EU → `#sales-eu`
  - Fallback → `#sales-leads`
- **Message:**

```
*🔥 Hot lead — score {{score}}/100*
*{{name}}* · {{company}} ({{industry}}, ~{{company_size}} employees)
✉️ {{email}} · 🌐 {{domain}}

*Why hot:* {{reasons}}

*Suggested opener:*
> {{opener_text}}

<https://app.gohighlevel.com/v2/location/.../contacts/{{ghl_contact_id}}|Open in GHL>
```

Include a *Claim* button (Slack interactive) that assigns ownership in GHL.

### Step 10 — Respond to webhook (so the form gets a 200)

Return:

```json
{ "ok": true, "received": true }
```

(Never return the score to the public webhook — that's internal.)

---

## 4. The prompts

### 4.1 Scoring prompt (system)

```
You are a B2B sales qualifier for [CLIENT NAME].

Your job: score the lead below from 0–100 against the ICP rubric, classify
into a bucket, and explain in 1–2 sentences why.

[PASTE ICP RUBRIC FROM §2 HERE]

You MUST return valid JSON in exactly this shape:

{
  "score": <integer 0-100>,
  "bucket": "<hot|warm|cold|dq>",
  "reasons": "<one or two sentences, plain English>",
  "disqualifiers": ["<reason1>", "<reason2>"],
  "suggested_opener_angle": "<one sentence: what hook will land best with this specific lead>"
}

Rules:
- Be honest. A bad fit at the wrong size is not "warm" — it's cold.
- If a hard disqualifier fires (personal email + no company, competitor
  domain, wrong geography, student / job-seeker tone), score <= 24.
- The "suggested_opener_angle" should reference something SPECIFIC from
  the lead (their message, their company, their industry) — not a generic
  "thanks for reaching out".

Return ONLY the JSON object. No prose, no markdown fences.
```

### 4.2 Opener-drafting prompt (system)

```
You are [REP'S FIRST NAME], a [TITLE] at [CLIENT NAME]. Write the FIRST
message you would send this hot lead.

Style:
- Plain text, 3–5 sentences max.
- Reference one specific thing they said or one specific thing about
  their company. Show you read the form.
- Offer one concrete next step: a 20-minute call, a Loom video, a
  quick async answer to their question.
- No "Thanks for reaching out", no "Hope this finds you well", no
  "I came across your company". Skip the throat-clearing.
- Sign off with first name only.

Lead context:
{{full_lead_json}}

Suggested angle from the scorer:
{{suggested_opener_angle}}

Output ONLY the message text. No subject line, no preamble.
```

---

## 5. Testing checklist

- [ ] Send 5 curl test leads spanning hot / warm / cold / DQ buckets.
- [ ] Verify scores are reasonable and the JSON parses cleanly every time.
- [ ] Confirm each lead lands in GHL with correct tags + custom fields.
- [ ] Confirm hot leads ping the correct Slack channel within ~30 seconds.
- [ ] Confirm the drafted opener references something specific (not generic).
- [ ] Confirm warm/cold leads enter the correct GHL nurture workflow.
- [ ] Confirm DQ leads are tagged but NOT pinged to Slack and NOT in nurture.
- [ ] Send a deliberately broken payload (missing email) — workflow should
      log and exit cleanly, no error spam.
- [ ] Re-submit an existing lead — verify GHL upsert updates instead of duplicating.
- [ ] Run for one full business day in shadow mode (no Slack ping) and
      review the scores manually with the sales lead. Tune the rubric.
- [ ] Flip Slack pings on.

---

## 6. Cost estimate

- n8n self-hosted: free (small VPS, ~$5/mo)
- n8n Cloud Starter: $20/mo, 2,500 executions/mo
- OpenAI GPT-4o scoring: ~$0.003 per lead
- OpenAI GPT-4o-mini opener: ~$0.0005 per hot lead
- Clearbit Reveal API: ~$0.15 per enriched company (free tier: 50/mo)
- GHL: customer already pays
- Slack: free

At 500 leads/month with 20% hot rate: roughly $3–5 in OpenAI + ~$75 in
Clearbit = **~$80/month total**. Replaces ~10 hours/week of manual triage.

---

## 7. Portfolio case study source text

**Problem.** Sales reps spend hours each week sifting through inbound
forms, LinkedIn DMs, and demo requests to figure out which leads are
worth chasing. Most leads get a generic reply 24+ hours later — by then
they've gone cold.

**Solution.** An n8n workflow ingests new leads from forms, GHL, email,
and chat. Each lead is enriched (company size, industry, tech stack),
then scored 0–100 by GPT-4 against an ideal-customer profile defined in
a single rubric. Hot leads (>75) trigger a Slack ping to the rep with a
pre-drafted opener tailored to that specific lead. Cold leads are
auto-routed into a nurture sequence inside GHL.

**Outcome.** 10+ hours of triage saved per rep per week. Response time
on hot leads drops from 24h to under 5 minutes. Conversion on responded
leads goes up because the first message is already relevant — not a
generic template.

---

## 8. Next steps for John

1. Spin up n8n (self-hosted Docker or n8n Cloud).
2. Get an OpenAI API key with at least $20 prepaid credit.
3. Get a Clearbit or Apollo API key (or skip enrichment for v1).
4. Get GHL API token + Location ID from the client's GHL account.
5. Sit with the client for 60 minutes to write the ICP rubric (§2). This
   is the highest-leverage hour of the whole build.
6. Build nodes per §3 in order; test after every node.
7. Run shadow mode for one business day per §5.
8. Screenshot the n8n canvas, a sample Slack ping, and a GHL contact
   page — send back for the portfolio case study.
