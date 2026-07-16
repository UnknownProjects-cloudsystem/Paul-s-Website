# Design System

_Cinematic, premium, tactical — police-inspired without being aggressive. Defined in `tailwind.config.ts` + `globals.css`._

## Color palette

| Token             | Hex       | Use                                  |
| ----------------- | --------- | ------------------------------------ |
| `charcoal`        | `#0E0F12` | Page background                      |
| `ink`            | `#16181D` | Alternating section background       |
| `gunmetal`        | `#1E2228` | Card surfaces                        |
| `steel`           | `#2A2F38` | Borders, dividers                    |
| `steel-light`     | `#3A414C` | Hover borders                        |
| `navy`            | `#0B1726` | Corporate / tactical sections        |
| `silver`          | `#C7CCD4` | Body text                            |
| `fog`             | `#8A909B` | Muted/secondary text                 |
| `soft-white`      | `#F4F6F8` | Headings                             |
| `gold` / `gold-bright` / `gold-deep` | `#C9A24A` / `#E2C173` / `#9E7C2E` | Badge accent, CTAs, highlights |

## Typography

- **Headings:** Oswald (bold, condensed, uppercase) → `font-display`. Helpers: `.heading-xl`, `.heading-lg`, `.heading-md` (all fluid `clamp()`).
- **Body:** Inter → `font-body`. Helper: `.body-lg`.
- **Eyebrow labels:** uppercase, `tracking-label` (0.18em), gold → `.label-eyebrow`.
- Fonts load via `<link>` (offline-safe build) with system fallbacks.

## Components & helpers

| Class / component        | Purpose                                            |
| ------------------------ | -------------------------------------------------- |
| `.btn-gold/-outline/-ghost` | Button variants (also `Button.tsx`)             |
| `.card-surface`          | Standard card (gunmetal + border + shadow)         |
| `.glass`                 | Glassmorphism (blur + translucent border)          |
| `.container-cci`         | Max-width 1240px content container                 |
| `.gold-text`             | Gold gradient text clip                            |
| `.hairline`             | Subtle divider                                     |
| `Section` / `SectionHeader` | Consistent section spacing + eyebrow/title/intro |
| `TiltCard` / `ServiceCard` | 3D hover cards                                    |
| `StatCounter`            | Animated count-up                                  |
| `FAQAccordion`           | Accessible accordion                               |
| `Reveal`                 | Scroll-reveal wrapper                              |

Animations: `animate-scan`, `animate-pulse-glow`, `animate-scroll-cue`, `animate-fade-up`. Backgrounds: `bg-grid-tactical`, `bg-radial-fade`. Shadows: `shadow-card`, `shadow-gold`.

## Asset path map (web-safe → source)

```
logo/cci-logo.avif                ← Company Logo/CaissieCanine1_edited_edited.avif
video/hero.mp4                    ← Hero Video/Hero Video.mp4
video/corporate-training.mp4      ← Corporate Training Session.mp4 (compressed 540p)
video/private-training.mp4        ← Private Services.mp4 (compressed 480p)
video/session-1|3|4|5.mp4         ← Training Sessions/Training Session 1|3|4|5.mp4
video/private-session.mp4         ← Private Sessions/Training Session - Private Session.mp4
paul/paul-1.jpg                   ← Caissie's Images/Cassie Image 1.jpg (resized)
paul/paul-2.jpg                   ← Caissie's Images/Caissie image 2.jpg
paul/paul-3.webp                  ← Caissie's Images/Caissie 3.webp
certification/certification.jpg   ← Certification/Certification.jpg (resized)
gallery/{1..39}.webp|jpg          ← Gallary Images/{n}.webp|jpg  (7_files junk ignored)
partners/<slug>.avif|png          ← Partners Images/*  (renamed web-safe)
testimonials/<slug>.avif          ← Testimonal Images/*
memorial/<dog>.webp               ← Memorial Images/*  (one image per dog)
```

Filenames are intentionally lowercased/hyphenated (no spaces, `&`, or `'`) to guarantee no broken paths.
