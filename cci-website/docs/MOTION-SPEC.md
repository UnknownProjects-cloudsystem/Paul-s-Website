# Motion & Interaction Specification

_How the site should feel. Premium and purposeful — motion supports content, never distracts. All effects honor `prefers-reduced-motion` and scale down on mobile/touch._

## Engines

- **GSAP** — hero entrance timeline, stat count-ups.
- **Lenis** — smooth scrolling (desktop, pointer:fine, motion allowed). Disabled on touch & reduced-motion.
- **IntersectionObserver** — scroll reveals (`.reveal` → `.is-visible`), lightweight and reliable.
- **CSS 3D transforms** — hover tilt cards, parallax layers, perspective.
- **React Three Fiber** — subtle hero particle depth field (`<primitive>` THREE.Points).

## Per-interaction spec

| Interaction                | Behaviour                                                                                  |
| -------------------------- | ----------------------------------------------------------------------------------------- |
| Hero video entrance        | Full-bleed muted loop, dark gradient overlays; poster fallback before load.                |
| Hero text reveal           | GSAP stagger (y+opacity) on eyebrow → H1 → sub → CTAs, then floating service tags.         |
| Hero parallax              | Video layer translates ~0.25×, content ~0.12× of scroll (transform-only, rAF-throttled).   |
| 3D particle field          | 1300 gold points, slow Y-rotation + pointer-reactive tilt; 350 points / static if reduced. |
| Scroll-triggered stats     | Count-up via GSAP when the stat strip enters view (year renders un-grouped).               |
| 3D hover service cards     | Pointer-driven `rotateX/rotateY` tilt + gold radial glow following cursor (pointer:fine).  |
| Section reveals            | Fade-up on enter, optional stagger delay per card.                                         |
| Corporate tactical section | Animated grid background + downward "scan" sweep; navy palette.                            |
| Gallery hover              | Image scale 1.05 + subtle dim; click → full-screen modal with prev/next.                   |
| Partner card hover         | Lift (-translate-y) + gold border; category filter chips.                                  |
| Testimonials               | Horizontal snap carousel with arrow controls; card → modal (before/after + quote).         |
| Mobile sticky CTA          | Fixed Call / Text / Inquiry bar; never overlaps content (body padding reserved).           |
| Page transitions           | Next.js routing (template/layout). **No Barba.js** (Next handles routing).                 |
| Contact form               | 4-step progress indicator with animated active state; accordion-style validation messages. |

## Rules

1. Premium, not childish. 2. Supports content. 3. Smooth on desktop **and** mobile. 4. Heavy effects reduced on low-power/touch. 5. `prefers-reduced-motion` fully respected (transitions ~0ms, reveals shown instantly, Lenis & 3D off). 6. No important/SEO text inside canvas. 7. No scroll-jacking.
