# CR8LAB Design System, Home Page & 404 Page: Design Spec

Status: approved. Source of truth for the design decisions below is the published Claude Design canvas (https://claude.ai/code/artifact/2480b604-301b-41cb-8bee-ec703ce7ae27) and its working files under `design/cr8lab-brand-system/` in this repo. This document transcribes the confirmed decisions into a durable, non-visual reference for implementation.

## Brand

- Canonical name: **CR8LAB** (not "cr8labb" or "cr8labs"; confirmed over the strategy doc's inconsistent spelling and this repo's own name).
- Full company scope (per `docs/cr8labb-com-Full-Website-Copy.docx`): a broad creative-technology company spanning education, museums, government, publishers, retail, training, etc. Education (Blue Sands) is the proving ground, not the whole identity. This spec covers only the Home page and the 404 page; the other ~9 pages from the docx are future phases.
- The existing `public/logo.png` wordmark ("c8labb" + "Just create it" tagline) is **not** used as-is. Only its ring/aperture icon mark is reused (cropped, recolored to its own sampled color). The wordmark is reset to "CR8LAB" set in Ojuju. The tagline is dropped. This was flagged as an assumption during design and not corrected, so treat it as confirmed.
- Explicit deviation from the docx: the "Smart Blackboard" hardware line item is removed entirely (user instruction, not in scope for this doc's pages anyway).

## Design tokens

### Color

| Token | Hex | Use |
|---|---|---|
| `ink` | `#17130F` | primary dark neutral (warm near-black, not pure #000) |
| `bone` | `#F3ECDE` | primary light neutral (warm sand, not sterile white) |
| `danfo` | `#F5A623` | signature accent; Lagos danfo-bus yellow. CTAs, focus-ring outer color pairs with bone gap. |
| `adire` | `#2C276C` | secondary accent; sampled directly from `public/logo.png` (not invented). Named for Yoruba indigo resist-dye cloth. |
| `adire-dark` | `#211D54` | darker tint of adire, used for the hero portal panel and 404 background |
| `adire-light` | `#6E67B8` | lighter tint, used for secondary ring strokes on dark backgrounds |
| `adire-tint` | `#8F87CF` | lightened tint for text/accents on Ink backgrounds where full-strength adire fails contrast |
| `adire-caption` | `#A39CC9` | muted violet-grey, for captions on dark adire backgrounds (passes AA there) |
| `laterite` | `#B6502E` | tertiary accent; Lagos red-earth road color. Doubles as the semantic "error" hue (already warm red-orange, no separate error color invented). Sparing use at full strength (borders, dots), never as small text on light backgrounds. |
| `laterite-text` | `#A34A28` | darkened variant of laterite, required for small error text on bone (full-strength laterite measures 4.28:1 there, below AA; this measures 5.01:1) |
| `laterite-tint` | `#D97A50` | lightened tint for text/accents on Ink backgrounds |
| `success` | `#4F7355` | one utility color not from the core five, added for form/alert success states. Muted/earthy to match the palette family, not a generic bright green. |
| `success-text` | `#456B4B` | darkened variant for small success text on bone (measures 5.17:1) |
| `muted` | `#6b6455` | secondary/caption text on bone (measures 4.99:1) |
| `body` | `#453F35` | body copy on bone |
| `border` | `#C9BFA6` | default input/divider border on bone |
| `border-light` | `#E4DAC4` | hairline dividers on bone |
| `disabled` | `#9C9484` | placeholder/disabled text on bone (below AA by design; standard practice for non-active-state text) |

2026 rationale: warm neutrals (ink/bone) replace pure black/white per the move away from stark minimalism; danfo/adire/laterite are all sourced from specific Lagos references (danfo minibuses, adire dye, laterite road earth) rather than a generic "African colors" palette.

### Type

- **Display** (headings): **Ojuju**, Google Fonts, a variable Afro-grotesque font by Chisaokwu Joboson / Ụdị Foundry (Lagos), inspired by Dogon masquerade dancers. Weights used: 600, 700 (800 available if a heavier moment is needed later). Used with restraint; headings only, never body copy.
- **Body**: **Switzer**, Fontshare (Indian Type Foundry), free commercial license. Deliberately not Inter/Space Grotesk/any top-5 AI-default font. Weights: 400, 500, 600, 700.
- **Data/labels**: **JetBrains Mono**, Google Fonts. Reserved strictly for genuine data (stat numerals, technical labels); never decorative eyebrows. Weights: 500, 600, 700.

Type scale (see `design/cr8lab-brand-system/Typography.dc.html` for full detail):
- H1: Ojuju 700, 52–66px depending on context (hero uses larger), line-height ~1.0–1.05
- H2: Ojuju 600, 34px
- H3: Ojuju 600, 24px
- H4: Switzer 600, 18px
- Body large: Switzer 400, 17–18px
- Body: Switzer 400, 15–16px
- Caption: Switzer 400, 13px
- Kicker/label (functional wayfinding only, never decorative): JetBrains Mono 500, 11px, uppercase, tracked

## Signature motif: the ring

`public/logo.png` is built entirely from nested open rings and arcs (a "C" of two open arcs, an "8" of two stacked ring-in-ring targets). This is the system's one recurring device, applied functionally, not decoratively:
- **Icon badges**: a circular ring frame (2px border + a fainter inset ring) around any icon, colored via the icon's own accent.
- **Keyboard focus**: every interactive element's `:focus-visible` state is a two-ring outline (`box-shadow: 0 0 0 3px bone, 0 0 0 6px adire`) instead of a generic browser outline. This is real accessibility, not decoration.
- **Section dividers**: a thin line broken by a small ring-with-center-dot, instead of a plain `<hr>`.
- **Hero portal**: the enlarged ring graphic in the hero's right panel is a scaled-up version of the mark itself; the page visually "assembles" out of the same rings the logo is built from.
- **404 page**: the same rings, broken apart into scattered, dashed, differently-rotated fragments; "nothing assembled here," the inverse of the hero's complete portal.
- **Background watermark**: a very low-opacity (3.5%) large ring bleeds off a corner of the hero, on the opposite side from the portal so the two ring graphics don't visually merge.

## Home page

Layout (desktop reference: `design/cr8lab-brand-system/Main.dc.html`):
- **Nav**: CR8LAB mark (icon + Ojuju wordmark) left, links right (Platform, Products, Solutions, Work, Labs, Studio, Research, Community), "Book a demo" CTA (ink-filled pill).
- **Hero**: two-column. Left: H1 "The future of learning lives *beyond the page*" (the italicized-here phrase is colored `adire`, not italic; foreshadows the indigo portal), body copy, two CTAs (primary `danfo`-filled "Explore the platform", ghost-outlined "Book a demo"). Right: the ring portal panel on `adire-dark`, seamed to the text column by a diagonal danfo/ink striped "seam" (references the danfo bus paint stripe, a second, distinct device from the ring motif; used once, only here).
- **Ring-dot divider**, then **trust bar**: the line "Built for Africa. Designed for the world. Running on technology we own." plus four stat counters (schools / students / countries / interactive experiences). All four numbers are unconfirmed docx placeholders; **keep them bracketed** (`[100]+`, `[20,000]+`, `[6]`, `[250]+`) until real figures are supplied; do not invent numbers.
- **Footer** (not previously mockup'd in the canvas; content sourced directly from the docx's global footer copy; see Implementation Plan for exact copy): footer statement, four link columns (Platform / Products / Company / Get in touch), legal line, newsletter line. Visual treatment follows established tokens (ink background, bone text, ring-dot divider at top) rather than needing a new signature device; footers should stay quiet per "spend the boldness in one place."

Copy source: `docs/cr8labb-com-Full-Website-Copy.docx`, Page 1 (Home) and the global nav/footer section, with "cr8labb" replaced by "CR8LAB" throughout.

## 404 page

Reference: `design/cr8lab-brand-system/NotFound.dc.html`. Full-bleed dark page (radial gradient `adire` family, darkest at the edges), not the light bone background used elsewhere; the rationale is that a 404 is "the portal with nothing behind it," the same place the hero scrolls into, not a separate error template. Contains: dark-variant nav (bone text/mark, ink-filled CTA becomes bone-filled), five scattered dashed ring fragments at different sizes/rotations/opacities, a warm danfo glow behind the headline, paper-grain texture overlay, large left-aligned H1 "Nothing here." (92px, the "." in a dimmer `adire-tint` color), subtext "Not even in three dimensions.", body "Try the work, or tell us what you were looking for.", two CTAs ("See the work" primary, "Get in touch" ghost; both in the dark-page button treatment, hover as opacity/lift, not a color swap, to avoid the contrast bug found and fixed during design: a generic `a:hover` color rule was overriding button text color and reintroducing a failed-contrast state). No footer on this page, matching the canvas.

Copy source: docx microcopy section; "Nothing here. Not even in three dimensions. Try the work, or tell us what you were looking for."

## Motion

Reference: `design/cr8lab-brand-system/Motion.dc.html` (built as a live, working demo, not just a description).
- Micro-interactions (button/card/link hover): 150–180ms ease-out. Lift + shadow for buttons/cards, an underline that draws in for text links. Never a color swap on hover for buttons; that was tried and reverted after it reintroduced a contrast bug.
- Loading: continuous rotation (ring construction reused as a spinner), never more than one spinner visible at once. Under `prefers-reduced-motion`, the spinner slows substantially but does not stop (it's the one exception; a loading indicator that stops looks broken/stuck).
- Scroll-linked (hero portal only, not repeated elsewhere): CSS `animation-timeline: scroll()`, pinned via `position: sticky` inside a scroll container. **Important implementation note from a real bug found during design**: the pinned/sticky element must not itself have `overflow: hidden`; that creates a second, empty scroll container and `scroll(nearest ...)` silently binds to it instead of the real scroll container, making the animation permanently inert. Clip on the outer scroll frame instead. Falls back to a static state via `@supports not (animation-timeline: scroll())` and is disabled (replaced with a plain crossfade or static state) under `prefers-reduced-motion`.
- Page reveals: not used on the hero (it's present on load; the scroll sequence carries the motion). Elsewhere, 400–600ms ease-out with 60–80ms stagger, when/if implemented.

## Accessibility floor

- All interactive elements get the two-ring `:focus-visible` treatment (see Signature motif above), not a generic outline and not `outline: none` alone.
- Every color pairing used for text has been contrast-checked against WCAG AA (4.5:1 normal text, 3:1 large text/non-text). Where a core palette color failed at small text sizes (laterite, success-green), a darkened text-only variant is defined above; use those variants for text, the full-strength hex for borders/fills/dots only.
- `prefers-reduced-motion` is respected everywhere motion is used (see Motion section).
- No fake OS chrome, no cliché icons (rockets/wands/generic magnifying glasses; an early draft used one for an empty state and it was redrawn as a broken ring instead).

## Known gaps / explicit assumptions carried into implementation

1. Footer was not mocked up visually in the canvas; its content is transcribed directly from the docx and its visual treatment follows established tokens (see Home page section above).
2. The canvas mockups are fixed-width desktop (1440px) only. Responsive/mobile behavior was not designed pixel-by-pixel and is left to standard, brand-consistent judgment during implementation (documented per-component in the implementation plan).
3. Envato-sourced imagery/video for the hero portal and any other real photography/render is not yet available; placeholder treatment (as already shown in the canvas) carries into code until real assets are supplied.
4. The brand mark image asset is a cropped PNG (320×206px, non-square) sampled from `public/logo.png`; it is not a redrawn vector. Fine for now; a proper SVG redraw is future work.
5. Domain/email (`hello@cr8lab.com` used in a few places) is unconfirmed; kept bracketed.
