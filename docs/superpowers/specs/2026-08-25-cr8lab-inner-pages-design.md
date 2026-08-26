# CR8LAB Inner Pages: Design Spec (funder-first set)

Status: draft for review. Builds on `2026-08-24-cr8lab-design-system-home-404-design.md` (tokens, type, ring motif, the fixed world) and on the shipped Home page, whose components are the vocabulary here. Copy source for every page is `docs/cr8labb-com-Full-Website-Copy.docx`, with "cr8labb" replaced by "CR8LAB" throughout and unconfirmed facts kept in `[brackets]`.

## Scope and sequence

Ten pages remain in the IA. The copy deck's own checklist says the site must be live before 28 August 2026 for two funding applications, so the set a reviewer or investor actually clicks ships first, at full quality:

1. **Work** (proof)
2. **Platform** (what it is)
3. **Products** (what you can buy)
4. **Studio** (who you are, boilerplate, careers, press)
5. **Contact** (how to reach you, with a working form)

Labs, Solutions, Research, Community and Resources follow at the same quality immediately after and are out of scope for this spec. Until they ship, their nav and footer links resolve to the branded 404, which is on-brand but not a substitute; the second batch closes that.

## The inner-page world

Every inner page lives in the same fixed world as Home, minus the opening dive:

- `PageBackground` gains a `variant="inner"` mode: no headset photo, no dive timeline. The base is the inside-the-lens glow at rest, and the tone masks (bone / adire / ink layers, feathered edges inside section padding) work exactly as on Home. Sections opt in with `data-tone` wrappers. Nothing about the legibility rule changes.
- Every page opens with a **page hero** on the glow (dark, bone text): kicker (mono, functional), H1 in Titan One, one supporting paragraph, and a ring device specific to that page (below). The hero is `min-h-[70dvh]`, not a full viewport, so the page's substance is reachable in one scroll.
- The fixed nav is `theme="dark"` everywhere and flips by tone as on Home. The Footer is unchanged.
- Motion follows the Home rules: `Reveal` on every section, ambient orbits only where a ring device already exists, everything gated behind `motion-safe`.
- Metadata per page from the copy deck's "Meta titles and descriptions" section.

## Shared components (new)

- `PageHero` (`components/layout/PageHero.tsx`): kicker, H1, lede, an optional `device` slot (React node) rendered to the right on lg, above on smaller screens. Sets the page's `<h1>`.
- `StatChip` extracted from `ProofSection`/`TrustBar`: mono numeral with the bracketed part in `laterite-text`, label beneath. Used by Work.
- `RingList` (`components/ui/RingList.tsx`): a list where each item carries the system's ring-dot marker in an accent, used for bullet content across pages (Platform constraints, Products key points, Studio values). Replaces bare `<ul>` bullets, which would be the generic default.
- `MediaSlot` stays the placeholder for imagery not yet generated.

## Page designs

### Work (`/work`)

- Hero device: the **portal arch** from Home's proof section, holding the classroom image already in the repo.
- **Flagship case study** as the page's spine, in the copy deck's own structure: Client, Challenge, Solution, The hard part, Impact. Each of the five is a full-width beat on alternating tones (bone, bone, adire, bone, ink) with the heading pinned (sticky) on lg while the copy scrolls, the Home `SectionTeaser` pattern. "The hard part" is set apart on adire: the deck says it is the section buyers actually read.
- **Impact** renders the six bracketed metrics as `StatChip`s in a 3x2 grid. The quote slot is omitted entirely, per the deck: no invented testimonials.
- **Further work**: the five sector blocks (museums, brands, publishing, training, culture) are all bracketed placeholders in the deck, so they render as a single honest holding section using the deck's holding copy ("Some of our work sits under client agreements...") with the five sectors as ring-marked labels, not as fake case-study cards.

### Platform (`/platform`)

- Hero device: the **seven-layer stack**, drawn as seven concentric rings labelled from the outside in (Physical books, Mobile app, Cloud platform, AI engine, Learning analytics, Creator Studio, Immersive experiences). Content flows inward, evidence flows out, which is the deck's own diagram caption; the caption is set beneath in mono.
- **The stack**: seven beats, one per layer, on a hairline grid (the Industries contact-sheet treatment) so the layers read as one system. Each cell: ring marker in the layer's accent, layer name in Titan One, the deck's paragraph.
- **Built for African conditions**: five constraints as a `RingList` on adire.
- **Interoperability**, **Security and data rights**, **Developers**: bone sections, `RingList` bullets, brackets preserved verbatim (the deck insists roadmap items say "roadmap"). Security carries the deck's CTA "Read our full position on children's data" as a ghost button to `/platform/security` (404 until written; noted).
- Closing CTA: the deck's line, "The fastest way to understand the platform is thirty minutes with it in your hands," with Book a demo.

### Products (`/products`)

- Hero device: the **planetary system** from Home's platform dial, reused with the eight products as planets (same component, different labels), the lens holding the platform-scan image.
- **Eight product sections**, one per product, in deck order, alternating bone/adire/ink so the page breathes. Each: product name in Titan One, one line in display type, "What it is" paragraph, "Who it is for" line in mono, key points as `RingList`, and its CTA as a dark/light button to the product's future route (`/products/books` etc.; 404 until built). Hovering a planet in the hero is not wired to sections (keep it simple; the anchors are the page's own headings).
- **Hardware strip**: the deck lists three items; **Smart Blackboard is removed** per the standing instruction. The remaining two (Virtual Science Lab tablet, Spotty camera and book holder) render as two ring-marked cards on ink.

### Studio (`/studio`)

- Hero device: the **satellite cluster** from Home's community section, holding a `MediaSlot` for a studio photograph (shot list below).
- **Our story**: two paragraphs on bone, set as a manifesto (the Home `Manifesto` treatment) with the deck's first sentence as the pull line.
- **What we value**: five values as a `RingList` on adire.
- **Team**: the deck's bracketed placeholders, rendered honestly as four bracketed cards with a note that real names and credits replace them. No stock faces, no invented bios.
- **How we work**, **Technology**, **Partners**, **Recognition**: bone; short paragraphs; the technology and partner lists are bracketed in the deck and stay bracketed.
- **Press and media** and **Careers**: ink; the boilerplate rendered in full as a quotable block with a mono "Boilerplate" kicker.

### Contact (`/contact`)

- Hero: the deck's "Start here" and lede; device: a single large ring with the seven routes as points on its circumference (a quieter cousin of the planetary system, static, no orbit).
- **Seven routes** as the Industries contact-sheet grid (bone), each cell a route name in Titan One and its paragraph. `?route=` in the URL (the Home CTAs already link `/contact?route=partner` etc.) preselects the form's "I am here to" field.
- **The form**: every field from the deck. Text inputs and selects use the design system's States sheet (focus ring, error and success colours). Submission is a Next.js server action that validates on the server and sends two emails through Resend: the submission to `[hello@cr8lab.com]` (read from env, never hardcoded) and the deck's thank-you copy to the sender. Errors use the deck's own error copy. A honeypot field and a minimum time-to-submit check handle spam without a CAPTCHA.
- **Thank-you** state renders in place with the deck's thank-you copy; the direct-details line (email, phone, address, socials) stays bracketed.

## Content facts that stay bracketed

Everything in `[brackets]` in the deck stays bracketed on the page: stat numbers, partner names, team names, technology list, curriculum mappings, integration lists, pricing, email addresses, phone, address, year. The site can go live with brackets showing, which the deck explicitly warns against; a pre-launch pass by the user to fill or cut each bracket is a separate task, and every bracket is reachable by a single grep for `\[`.

## Imagery to generate (Envato), all 4K, brand rules as before

1. `studio-team.png` (square, circle-crop safe): the Lagos studio, three or four people at desks with 3D work on screens turned away, warm pendant light, indigo shadows. Documentary, no visible logos or readable screens.
2. `platform-stack.png` (optional, landscape): a printed children's book, a phone, a tablet and a small headset laid out on a wooden table in a line, warm light, indigo background. Used on Platform if it lands; the page does not depend on it.

Work reuses `proof-classroom.png`; Products reuses `platform-scan.png`.

## Out of scope

Labs, Solutions, Research, Community, Resources (second batch). Product sub-routes (`/products/books` etc.), `/platform/*` sub-pages, legal pages, careers and press pages: linked, not built.
