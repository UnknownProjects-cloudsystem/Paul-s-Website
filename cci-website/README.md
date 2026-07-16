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
| Forms              | Multi-step assessment form → API route → email      |

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
│  │  ├─ api/inquiry/route.ts     # Lead handler (Resend email)
│  │  ├─ sitemap.ts  robots.ts  not-found.tsx  layout.tsx  globals.css
│  ├─ components/                 # UI, layout, sections, motion, three, forms
│  └─ lib/                        # site config, services, partners, blog, SEO
└─ docs/                          # Sitemap, user flows, motion spec, design system
```

---

## Environment variables

Copy `.env.example` → `.env.local` and set:

| Variable                   | Required | Purpose                                      |
| -------------------------- | -------- | -------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`     | yes      | Canonical URLs, sitemap and structured data  |
| `RESEND_API_KEY`           | yes      | Secure server-side inquiry email delivery    |
| `INQUIRY_TO_EMAIL`         | yes      | Inbox that receives new website inquiries    |
| `INQUIRY_FROM_EMAIL`       | yes      | Verified sender used by the email service    |
| `NEXT_PUBLIC_GA_ID`        | optional | Google Analytics 4                           |
| `NEXT_PUBLIC_CLARITY_ID`   | optional | Microsoft Clarity                            |

---

## Inquiry form → email

The contact form posts JSON to `POST /api/inquiry`. The route validates the submission, blocks spam with a honeypot and short duplicate window, then sends a formatted email through Resend. The visitor's address is assigned as the reply-to address.

For local testing, add the values from `.env.example` to `.env.local`, then run `npm run test:email`.

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
- JSON-LD: `Organization` and `WebSite` (global), `Person` (about), `Service` (service pages), `FAQPage`, `BreadcrumbList`, `Article` (blog).
- `sitemap.xml` and `robots.txt` are generated (`app/sitemap.ts`, `app/robots.ts`).
- Local keywords (Durham Region, Toronto, GTA, Markham, Mississauga, Ajax, Oshawa, Whitby, Pickering, Uxbridge…) appear naturally in copy, FAQs and footer.

---

## Deploy

Optimized for **Vercel** (zero-config Next.js). Any Node host works:

```bash
npm run build && npm start
```

Set the environment variables in your host's dashboard. Point `caissiecanineinstruction.com` at the deployment and confirm `NEXT_PUBLIC_SITE_URL` matches.
