# Project 03 — AI Receptionist & Smart Booking (GHL + Twilio + OpenAI)

> A 24/7 voice agent for service businesses (plumbers, salons, dental
> practices) that picks up missed and after-hours calls, answers FAQs,
> checks live calendar availability, books appointments straight into
> GoHighLevel, and SMS-confirms the customer.

**Stack:** GoHighLevel (CRM + calendar + workflows) · Twilio (voice + SMS) ·
OpenAI Realtime API (`gpt-4o-realtime-preview`) · a tiny Node/Express
relay (Cloudflare Worker or Railway) to bridge Twilio Media Streams
↔ OpenAI Realtime

**Estimated time to ship:** 8–12 hours including voice tuning and live-call testing.

---

## 1. Architecture

```
┌──────────────┐
│  Customer    │
│  dials the   │
│  business    │
│  number      │
└──────┬───────┘
       │
       ▼
┌──────────────────────────┐
│  Twilio Voice            │
│  (the business's number) │
│  Forward-on-no-answer    │
│  AND after-hours rule    │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│  Twilio <Connect> TwiML  │
│  → opens a Media Stream  │
│    WebSocket to our      │
│    relay server          │
└──────┬───────────────────┘
       │  (audio frames, 8kHz μ-law, both directions)
       ▼
┌──────────────────────────────────────────────┐
│  Relay server (Node, Cloudflare Worker, etc.)│
│  • re-frames audio to 24kHz PCM for OpenAI   │
│  • opens a parallel WS to OpenAI Realtime    │
│  • exposes "tools" to the model:             │
│      - get_business_hours()                  │
│      - get_calendar_availability(date)       │
│      - book_appointment(slot, contact)       │
│      - send_sms_followup(to, body)           │
│      - handoff_to_human()                    │
└──────────────────────┬───────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
  ┌──────────┐   ┌──────────┐   ┌──────────────┐
  │  OpenAI  │   │  GHL API │   │  Twilio SMS  │
  │ Realtime │   │ calendars│   │   (confirm)  │
  │  voice   │   │ contacts │   │              │
  │  agent   │   │ appts    │   │              │
  └──────────┘   └──────────┘   └──────────────┘

                       │ (after call ends)
                       ▼
              ┌──────────────────────┐
              │  GHL Workflow:       │
              │  • Create contact    │
              │  • Tag "ai-booked"   │
              │  • SMS confirmation  │
              │  • Owner daily digest│
              └──────────────────────┘
```

---

## 2. GHL setup

### 2.1 Calendar

- Create a `Bookable Calendar` for each service (e.g. "Cleaning",
  "Consultation", "Emergency Visit").
- Set the calendar's availability windows correctly. The AI will read
  these — wrong hours = wrong bookings.
- Note each calendar's `calendarId` — the relay needs it.

### 2.2 Custom fields on Contact

| Field           | Type    | Used for                                            |
|-----------------|---------|-----------------------------------------------------|
| `ai_call_id`    | Text    | Twilio Call SID — for debugging                     |
| `ai_intent`     | Text    | "booking" / "info" / "complaint" / "spam"           |
| `ai_summary`    | Text    | One-paragraph call summary from the model           |
| `ai_handoff`    | Boolean | True if customer asked for a human                  |
| `last_call_at`  | Date    | Timestamp of last AI handling                       |

### 2.3 Workflows

| Workflow name             | Trigger                          | Actions                                          |
|---------------------------|----------------------------------|--------------------------------------------------|
| `AI — appointment booked` | Contact tag `ai-booked` added    | SMS confirm to customer · email owner summary    |
| `AI — handoff requested`  | Contact tag `ai-handoff` added   | SMS owner immediately · create CRM task          |
| `AI — daily digest`       | Recurring, 8:00 AM local         | Email owner: yesterday's AI calls + outcomes     |

### 2.4 Private Integration token

- GHL → Settings → Integrations → Private Integrations → create one with
  these scopes: `contacts.write`, `calendars.read`, `calendars.write`,
  `conversations.write`, `locations.read`.
- Save the token — the relay uses it for all GHL API calls.

---

## 3. Twilio setup

### 3.1 Numbers

- The business's existing landline → port to Twilio, OR set up
  conditional call forwarding (busy / no-answer / after-hours) from the
  landline → a Twilio number.
- For testing, buy a fresh Twilio number first; only switch the real
  business number once it's working end-to-end.

### 3.2 Voice webhook (TwiML)

Point the Twilio number's "A call comes in" webhook to your relay's
`/incoming-call` endpoint. The relay returns this TwiML:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Connect>
    <Stream url="wss://your-relay.example.com/media-stream">
      <Parameter name="business_id" value="acme-plumbing" />
    </Stream>
  </Connect>
</Response>
```

### 3.3 After-hours / missed-call rule

Two options — pick one:

- **Easy:** Set Twilio number to forward to the real landline first,
  with `timeout=18`. On no-answer, the call hits the TwiML above.
- **Cleaner:** A Twilio Studio flow that branches on business hours
  first (using the location's timezone), and only opens the Media
  Stream when out-of-hours or unanswered.

---

## 4. The relay server

A small Node/Express service (deploy on Railway, Render, Fly, or a
Cloudflare Worker with WebSocket support). Two endpoints:

- `POST /incoming-call` — returns the TwiML above.
- `WS /media-stream` — bridges Twilio audio ↔ OpenAI Realtime, and
  handles tool calls.

### 4.1 The bridge loop (pseudocode)

```javascript
ws.on('connection', async (twilioSocket) => {
  const openaiSocket = await connectOpenAIRealtime({
    model: 'gpt-4o-realtime-preview',
    voice: 'alloy',                       // or 'sage' / 'verse'
    instructions: SYSTEM_PROMPT,           // see §5
    tools: TOOL_SCHEMAS,                   // see §6
    turn_detection: { type: 'server_vad' },
    input_audio_format: 'g711_ulaw',
    output_audio_format: 'g711_ulaw',
    input_audio_transcription: { model: 'whisper-1' },
  });

  // Twilio → OpenAI
  twilioSocket.on('message', (msg) => {
    const event = JSON.parse(msg);
    if (event.event === 'media') {
      openaiSocket.send(JSON.stringify({
        type: 'input_audio_buffer.append',
        audio: event.media.payload, // already base64 μ-law
      }));
    } else if (event.event === 'start') {
      callMeta = { streamSid: event.start.streamSid, ... };
    } else if (event.event === 'stop') {
      finalizeCall(callMeta);  // write GHL contact + summary
    }
  });

  // OpenAI → Twilio
  openaiSocket.on('message', async (msg) => {
    const event = JSON.parse(msg);

    if (event.type === 'response.audio.delta') {
      twilioSocket.send(JSON.stringify({
        event: 'media',
        streamSid: callMeta.streamSid,
        media: { payload: event.delta },
      }));
    }

    if (event.type === 'response.function_call_arguments.done') {
      const result = await handleToolCall(
        event.name,
        JSON.parse(event.arguments),
        callMeta,
      );
      openaiSocket.send(JSON.stringify({
        type: 'conversation.item.create',
        item: {
          type: 'function_call_output',
          call_id: event.call_id,
          output: JSON.stringify(result),
        },
      }));
      openaiSocket.send(JSON.stringify({ type: 'response.create' }));
    }

    if (event.type === 'conversation.item.input_audio_transcription.completed') {
      transcript.push({ role: 'user', text: event.transcript });
    }
  });
});
```

> **Audio format note.** Twilio Media Streams use 8kHz μ-law base64.
> OpenAI Realtime accepts `g711_ulaw` directly, so no resampling is
> needed if you set both formats above. This is the single most common
> setup bug — get it right first.

---

## 5. The system prompt

```
You are the virtual receptionist for [BUSINESS NAME], a [SERVICE TYPE]
in [CITY]. You are answering a phone call.

VOICE STYLE
- Warm, calm, conversational. You are NOT a chatbot — you are a person.
- Short sentences. Wait for the caller to respond.
- Confirm details by repeating them back: "So that's Tuesday at 2 PM,
  is that right?"
- Never say "As an AI" or "I'm a language model". You are the
  receptionist.

WHAT YOU CAN DO
- Answer questions about hours, location, services, and pricing using
  the FAQ knowledge below.
- Check live calendar availability and book appointments via your tools.
- Take a message and arrange a callback for anything you can't handle.
- Send an SMS confirmation after a booking.

WHAT YOU CANNOT DO
- Quote specific prices for custom work — say a human will follow up.
- Make promises about same-day service unless the calendar shows it.
- Handle complaints — apologize briefly, capture the issue, hand off.

CALL FLOW
1. Greet: "Thanks for calling [BUSINESS NAME], this is [AGENT NAME].
   How can I help you today?"
2. Listen. Identify intent: booking / info / complaint / other.
3. If booking: collect name, phone (read back), service, preferred
   day/time. Use tools to find an available slot. Confirm. Book.
4. If info: answer from FAQ. If the answer isn't in the FAQ, say
   "I'll have someone follow up with you on that — what's the best
   number?"
5. If complaint or anything sensitive: apologize, capture details,
   call handoff_to_human().
6. Close: confirm the next step, thank them, end the call.

HARD RULES
- After TWO failed turns to understand the caller, offer to text a
  human and call handoff_to_human().
- If the caller asks for a human at ANY point, immediately call
  handoff_to_human() — do not try to talk them out of it.
- Never invent calendar slots. Always call get_calendar_availability
  before proposing a time.
- Never collect credit card numbers or sensitive medical info on the
  call. Direct those to the human follow-up.

FAQ (paste the business's actual answers here)
- Hours: [Mon–Fri 8AM–6PM, Sat 9AM–2PM, closed Sundays]
- Address: [123 Main St, Anytown]
- Service area: [25 miles around Anytown]
- Emergency service: [Yes, 24/7, $150 trip fee]
- Payment: [Cash, all major cards, financing available]
- Insurance: [We don't process insurance, customer files claim]
```

---

## 6. The tools (function definitions)

### 6.1 `get_business_hours()`

```json
{
  "type": "function",
  "name": "get_business_hours",
  "description": "Returns the business's current open/closed status and today's hours.",
  "parameters": { "type": "object", "properties": {} }
}
```

Implementation hits GHL or a hardcoded local timezone table.

### 6.2 `get_calendar_availability(date, service)`

```json
{
  "type": "function",
  "name": "get_calendar_availability",
  "description": "Returns available 30-minute slots for a given date and service. Use this BEFORE proposing a time.",
  "parameters": {
    "type": "object",
    "properties": {
      "date": { "type": "string", "description": "ISO date, YYYY-MM-DD. Defaults to today if omitted." },
      "service": { "type": "string", "enum": ["cleaning", "consultation", "emergency"] }
    },
    "required": ["service"]
  }
}
```

Implementation: `GET /calendars/{calendarId}/free-slots?startDate=...&endDate=...`
on the GHL API. Return at most 3 nearest slots to keep the model's
spoken response short.

### 6.3 `book_appointment(slot_iso, service, contact)`

```json
{
  "type": "function",
  "name": "book_appointment",
  "description": "Book an appointment for the caller. Only call after the caller has explicitly confirmed the time and their name + phone.",
  "parameters": {
    "type": "object",
    "properties": {
      "slot_iso": { "type": "string", "description": "ISO datetime of the chosen slot" },
      "service": { "type": "string" },
      "contact": {
        "type": "object",
        "properties": {
          "name": { "type": "string" },
          "phone": { "type": "string" },
          "notes": { "type": "string" }
        },
        "required": ["name", "phone"]
      }
    },
    "required": ["slot_iso", "service", "contact"]
  }
}
```

Implementation: upsert GHL contact → create appointment → add tag
`ai-booked` → return `{ok: true, confirmation_id, slot_human}`.

### 6.4 `send_sms_followup(to, body)`

For sending a confirmation text or a "we'll call you back" text.

### 6.5 `handoff_to_human()`

```json
{
  "type": "function",
  "name": "handoff_to_human",
  "description": "Transfer the call, OR if no human is available, text the owner and tell the caller someone will call them back within 15 minutes.",
  "parameters": { "type": "object", "properties": {} }
}
```

Implementation: during business hours, issue a Twilio `<Dial>` to the
owner. Out of hours, add tag `ai-handoff` to the contact (triggers the
GHL workflow that SMSes the owner) and have the model say:
"I've let [OWNER NAME] know — they'll call you back within 15 minutes."

---

## 7. After the call

When Twilio sends the `stop` event:

1. Ask OpenAI Realtime for a final summary (one prompt to the same
   session, or a separate `chat.completions` call against the transcript).
2. Write to GHL:
   - Contact record (created or updated)
   - `ai_summary`, `ai_intent`, `ai_call_id`, `last_call_at`
3. If `ai_intent === "booking"` and a booking was made → already tagged
   `ai-booked` by `book_appointment` (the GHL workflow handles SMS).
4. If `ai_intent === "complaint"` or `ai_handoff === true` → tag `ai-handoff`.
5. Store the full transcript in S3 / R2 / GHL note for audit.

---

## 8. Testing checklist

### Smoke tests (text-only, no phone needed)
- [ ] `/incoming-call` returns valid TwiML
- [ ] WS endpoint accepts a connection
- [ ] Mock-feed a recorded audio file → confirm OpenAI streams audio back
- [ ] Each tool returns a sane response when called manually

### Live call scripts (use a real phone)
- [ ] **Happy path booking.** "Hi, I'd like to book a cleaning for
      Friday afternoon." → ends with confirmed appointment in GHL and
      an SMS to your phone.
- [ ] **Info-only call.** "What are your hours?" → correct answer,
      no booking attempt.
- [ ] **After-hours emergency.** Call at 11 PM. → agent quotes the
      emergency policy, books or hands off correctly.
- [ ] **Caller wants a human.** "Can I speak to someone?" → immediate
      handoff, no resistance.
- [ ] **Caller mumbles / silent.** → graceful retry, then handoff after
      two failed turns.
- [ ] **Wrong-number / spam call.** "Is this XYZ?" → agent corrects
      politely, ends call.
- [ ] **Reschedule.** "Actually can we make that Saturday instead?"
      → checks availability, updates the appointment.
- [ ] **Voicemail breakthrough.** Call ringing → forwarded mid-ring →
      agent picks up cleanly with no missing greeting.

### Quality bar
- [ ] First response latency under 1.2 seconds (Twilio→OpenAI→Twilio)
- [ ] Zero hallucinated calendar slots over 10 test calls
- [ ] Owner can read a daily digest and feel like the AI handled it
      the way they would have

---

## 9. Cost estimate

| Line item                        | Unit cost                       | At 100 calls/mo (~5 min avg) |
|----------------------------------|---------------------------------|------------------------------|
| Twilio number                    | $1.15/mo                        | $1.15                        |
| Twilio voice (inbound)           | ~$0.0085/min                    | ~$4.25                       |
| Twilio Media Streams             | $0.004/min                      | ~$2.00                       |
| OpenAI Realtime API              | ~$0.06/min input, $0.24/min out | ~$120–150                    |
| Relay server (Railway/Render)    | $5–10/mo                        | $10                          |
| GHL                              | client already pays             | $0                           |
| **Total**                        |                                 | **~$140/mo**                 |

For a service business losing even 1 missed booking per week at $200+
ticket, this pays back inside the first week.

> Realtime API pricing is the dominant cost and is volatile — re-quote
> the client right before launch.

---

## 10. Portfolio case study source text

**Problem.** Service businesses (plumbers, salons, dental practices)
lose ~30% of new-customer revenue to missed calls. After hours nobody
picks up — and the customer just dials the next listing on Google.

**Solution.** A GHL workflow routes missed and after-hours calls through
Twilio to an OpenAI Realtime voice agent. The agent answers as the
business, handles common FAQs (hours, pricing, location), queries GHL's
calendar for live availability, and books the appointment directly into
GHL. After two failed turns it offers to text a human. The owner gets
an SMS summary of every call the next morning.

**Outcome.** Captures bookings outside business hours that would have
been lost. Owners regain peace of mind — no more "I missed three calls
during dinner" anxiety. The setup runs entirely inside GHL with one
external Twilio number and one OpenAI key.

---

## 11. Next steps for John

1. Spin up the relay server skeleton on Railway (Node/Express +
   `ws` package). Deploy a `/health` endpoint first.
2. Buy a test Twilio number. Point its Voice webhook at the relay.
3. Get an OpenAI key with Realtime API access enabled.
4. Connect Twilio Media Streams to a "hello world" echo — confirm
   audio flows both ways before adding OpenAI.
5. Add OpenAI Realtime with no tools yet. Call in. Have a chat.
6. Add tools one at a time: hours → availability → booking → SMS → handoff.
7. Build the GHL calendar, custom fields, and workflows per §2.
8. Run the live-call scripts in §8 with a friend on the other end.
9. Tune the system prompt and FAQ until it sounds like a real person.
10. Swap the test Twilio number for the client's forwarded business
    number. Soft-launch for a week with the owner monitoring.
11. Screenshot the GHL daily digest + a transcript + the architecture
    diagram — send back for the portfolio case study.
