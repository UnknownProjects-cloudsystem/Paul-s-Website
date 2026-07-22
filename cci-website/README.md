# Caissie Canine Instruction — Website

A premium, cinematic, SEO-optimized website for **Caissie Canine Instruction (CCI)** — real-world canine training built on decades of police K9 experience, led by retired Sergeant Paul Caissie.

Built with **Next.js (App Router) · React · TypeScript · Tailwind CSS · GSAP · Lenis · React Three Fiber**.

---

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local
#   then fill in the values (see "Environment variables" below)

# 3. Run the dev server
npm run dev          # http://localhost:3000

# 4. Production build
npm run build
npm start
```

> **Note:** This project was scaffolded and code-reviewed in an environment without npm registry access, so `npm install`/`next build` were **not** run there. Run them locally — everything is wired for a clean build. If you hit a version conflict, the pinned versions in `package.json` are known-compatible; `npm install` should resolve cleanly.

---

## Tech stack

| Concern            | Choice                                              |
| ------------------ | --------------------------------------------------- |
| Framework          | Next.js 14 (App Router) + React 18 + TypeScript     |
| Styling            | Tailwind CSS (custom tactical/gold design system)   |
| Animation          | GSAP (+ count-ups, hero timeline)                   |
| Smooth scroll      | Lenis (disabled for `prefers-reduced-motion`/touch) |
| 3D                 | React Three Fiber + Three.js (hero particle field)  |
| Motion (available) | Framer Motion (installed for future use)            |
| Forms              | Multi-step assessment form → API route → webhook    |

---

## Project structure

```
cci-website/
├─ public/assets/caissie/        # All media (web-optimized, web-safe filenames)
│  ├─ logo/  video/  paul/  certification/
│  ├─ gallery/  partners/  testimonials/  memorial/
├─ src/
│  ├─ app/                        # Routes (App Router)
│  │  ├─ page.tsx                 # Home
│  │  ├─ about/  contact/
│  │  ├─ private-dog-training/  puppy-training/  behaviour-training/
│  │  ├─ e-collar-training/  service-therapy-dog-training/
│  │  ├─ corporate-k9-services/
│  │  ├─ partners/  testimonials/  legacy/
│  │  ├─ k9-knowledge-hub/  k9-knowledge-hub/[slug]/
│  │  ├─ api/inquiry/route.ts     # Lead handler (webhook → SMS)
│  │  ├─ sitemap.ts  robots.ts  not-found.tsx  layout.tsx  globals.css
│  ├─ components/                 # UI, layout, sections, motion, three, forms
│  └─ lib/                        # site config, services, partners, blog, SEO
└─ docs/                          # Sitemap, user flows, motion spec, design system
```

---

## Environment variables

Copy `.env.example` → `.env.local` and set:

| Variable                   | Required | Purpose                                                        |
| -------------------------- | -------- | -------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`     | yes      | Canonical URLs, sitemap, Open Graph, JSON-LD                   |
| `TWILIO_ACCOUNT_SID`       | yes\*    | Twilio account SID (`AC…`) — sends the lead SMS                |
| `TWILIO_AUTH_TOKEN`        | yes\*    | Twilio auth token (secret)                                     |
| `TWILIO_FROM_NUMBER`       | yes\*    | Your SMS-capable Twilio number (E.164, e.g. `+1905…`)         |
| `OWNER_SMS_NUMBER`         | yes      | Destination for lead texts (default `+16475104080`)           |
| `INQUIRY_WEBHOOK_URL`      | optional | Zapier "Catch Hook" URL for backup logging (Sheets/Airtable)  |
| `INQUIRY_WEBHOOK_SECRET`   | optional | Shared secret echoed to Zapier to reject spoofed calls         |
| `NEXT_PUBLIC_GA_ID`        | optional | Google Analytics 4 (omit to disable)                           |
| `NEXT_PUBLIC_CLARITY_ID`   | optional | Microsoft Clarity (omit to disable)                            |

\* Without Twilio (and without a webhook) the form still works in dev — submissions are accepted and logged to the server console instead of texted.

---

## Inquiry form → SMS notification

The contact form posts JSON to `POST /api/inquiry`. The route validates input, blocks spam (honeypot + 60s dedupe), formats the SMS body, then dispatches via **two independent channels** (either or both can be enabled):

**1. Twilio (primary — recommended).** Texts `OWNER_SMS_NUMBER` directly from the server. Just add four env vars:

```
TWILIO_ACCOUNT_SID=AC…
TWILIO_AUTH_TOKEN=…
TWILIO_FROM_NUMBER=+1…        # your Twilio SMS number
OWNER_SMS_NUMBER=+16475104080 # where leads are texted (change anytime)
```

Get the SID/token from the [Twilio Console](https://console.twilio.com) dashboard, and buy/verify an SMS-capable number for `TWILIO_FROM_NUMBER`. **Note for Canada/US:** Twilio requires A2P 10DLC registration (or a Toll-Free verified number) before application-to-person SMS will deliver — set this up in the Twilio Console under *Messaging → Regulatory Compliance*.

**2. Zapier webhook (optional backup / logging).** Set `INQUIRY_WEBHOOK_URL` to a *Webhooks by Zapier → Catch Hook* URL. The route posts `{ secret, submittedAt, smsText, lead }`; from there add a Zapier action to append the `lead` to **Google Sheets / Airtable** for a permanent lead log (and/or a second Twilio SMS / email backup). Filter on `secret === INQUIRY_WEBHOOK_SECRET` to reject spoofed calls.

The owner's text includes the client's number formatted so it's tap-to-call. The route returns success to the user even if a channel is delayed, so no lead is ever lost. The current SMS body format:

```
New CCI Inquiry

Name: …
Phone: …            ← tap to call the client back
Email: …
City: …
Service: …
Dog: breed, age, gender
Concern: …

Message: …

Reply to client: …
```

---

## Media assets

All media lives in `public/assets/caissie/` with **web-safe filenames** (lowercase, hyphenated — no spaces, apostrophes or ampersands) so there are no broken paths. Source files from the supplied ZIP were renamed during organization:

- The two large demo videos were compressed for web (Corporate ≈ 21 MB @540p, Private ≈ 15 MB @480p). Originals were ~146 MB / ~221 MB.
- Oversized photos (certification, Paul #1) were resized/compressed.
- Browser-export junk (`Gallary Images/7_files/`) was ignored.

A full path map is in `docs/DESIGN-SYSTEM.md` and `src/lib/gallery.ts` / `partners.ts` / etc.

---

## Content to finalize before launch

These are clearly marked in code with comments:

- **Testimonials** (`src/lib/testimonials.ts`) — quotes/before/after are realistic *placeholders* structured from each client's name & dogs. Replace with the clients' real words from the existing site.
- **Partner names, categories & links** (`src/lib/partners.ts`) — categories are best-effort from the logos; `href` values are `#` placeholders. Confirm names and add real URLs.
- **Memorial tributes** (`src/lib/memorials.ts`) — respectful role-based copy; expand with personal detail if desired.
- **Favicon** — currently the `.avif` logo. Add a proper `app/icon.png` / `favicon.ico` for best browser support.

---

## Performance & accessibility

- Videos are **lazy** (poster image, play-on-click) — never autoplay all at once. Hero video is muted/looped and small (~3.3 MB).
- Images use `next/image` (AVIF/WebP, responsive `sizes`, lazy below the fold).
- All motion respects `prefers-reduced-motion`; Lenis and 3D are reduced/disabled accordingly.
- Semantic HTML, keyboard-accessible nav & form, visible focus states, alt text throughout.
- All SEO copy is real HTML (never trapped in canvas).

## SEO

- Unique `<title>`/description/canonical/OG per page via `pageMeta()`.
- JSON-LD: `LocalBusiness` (global), `Person` (about), `Service` (service pages), `FAQPage`, `BreadcrumbList`, `Article` (blog).
- `sitemap.xml` and `robots.txt` are generated (`app/sitemap.ts`, `app/robots.ts`).
- Local keywords (Durham Region, Toronto, GTA, Markham, Mississauga, Ajax, Oshawa, Whitby, Pickering, Uxbridge…) appear naturally in copy, FAQs and footer.

---

## Deploy

Optimized for **Vercel** (zero-config Next.js). Any Node host works:

```bash
npm run build && npm start
```

Set the environment variables in your host's dashboard. Point `caissiecanineinstruction.ca` at the deployment and confirm `NEXT_PUBLIC_SITE_URL` matches.
