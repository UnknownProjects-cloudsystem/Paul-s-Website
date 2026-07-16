# User Journeys & Lead Flow

_The conversion paths the site is designed around (FigJam-equivalent planning)._

## 1. Private dog owner

```
Entry (Home / Google / service page)
  → Hero: "Real-World Canine Training…" + Book a Training Assessment
  → Authority stats (trust)
  → About preview (why Paul)
  → Private services preview → Private Dog Training hub
        → picks specific need (Puppy / Behaviour / E-Collar / Service-Therapy)
        → reads highlights + FAQ (objection handling)
  → CTA: Request a Private Training Assessment
  → Contact: multi-step assessment form
  → Success screen + owner receives SMS
```

Primary goal: **assessment form submission**. Secondary: **call / text** (sticky mobile bar, header phone).

## 2. Corporate / security client

```
Entry (Corporate K9 page / referral)
  → Tactical hero: authority-forward headline
  → Capabilities (consultation, evaluation, certification…)
  → Process flow: Assessment → Plan → Handler Support → Evaluation → Certification
  → Authority block (since 1993, 6 canines, Chief Instructor, expert witness…)
  → Corporate training video
  → CTA: Request a Corporate K9 Consultation
  → Contact form (Service Type = Corporate / Working K9)
```

Distinct visual identity (navy, tactical grid, scan animation) signals a different, professional audience.

## 3. Returning visitor / existing client

```
Knowledge Hub (SEO/educational) → article → related service → Contact
Partners → discover network → (optional) Contact to join
Legacy / Testimonials → trust & emotional connection (footer-accessible)
```

## 4. Inquiry → lead notification workflow

```
Assessment form (4 steps, client-side validated, SMS-consent required)
   → POST /api/inquiry
        • honeypot check (silent drop)
        • field validation (name, valid email, 10+ digit phone, consent)
        • 60s dedupe (no duplicate SMS on double-submit)
        • build formatted SMS body
        → POST to Zapier Catch Hook  { secret, submittedAt, smsText, lead }
              → Twilio: SMS to owner (client # tap-to-call inside)
              → Google Sheets / Airtable: append lead row (backup + log)
              → (optional) email backup
   → UI: success confirmation (or graceful error with phone fallback)
```

**Lead record fields stored:** Submission Date · Name · Phone · Email · City · Service Type · Dog (breed/age/weight/gender/spay-neuter/level) · Main Concern · Message · (add Lead Status / Contacted? in the sheet).

**Suggested lead statuses:** New · Contacted · Waiting for Reply · Booked · Not a Fit · Completed.
