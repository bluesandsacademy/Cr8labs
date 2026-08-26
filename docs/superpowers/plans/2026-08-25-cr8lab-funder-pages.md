# CR8LAB Funder-First Pages: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship Work, Platform, Products, Studio and Contact at the Home page's quality, in that order, before 28 August 2026.

**Architecture:** Next.js 16 App Router routes under `app/<page>/page.tsx`, each a server component composing shared layout pieces (`PageBackground` in `inner` mode, `Nav`, `PageHero`, `Footer`) and page-local sections under `components/<page>/`. Contact adds one server action (`app/contact/actions.ts`) and one client form component. Every section is transparent over the fixed world and declares its tone with a `data-tone` wrapper, exactly as Home does.

**Tech Stack:** Next.js 16.3.2, React 19, Tailwind v4, GSAP (existing `Reveal`), Resend (new, Contact only), Vitest + RTL.

**Spec:** `docs/superpowers/specs/2026-08-25-cr8lab-inner-pages-design.md`

## Global Constraints

- **Copy is the deck, verbatim.** Every sentence comes from `docs/cr8labb-com-Full-Website-Copy.docx` with "cr8labb" replaced by "CR8LAB". No invented descriptions, sectors, testimonials, bios or numbers. Thin sections use the deck's own holding copy; where the deck has nothing, the page has nothing. `[Brackets]` stay exactly as the deck has them.
- No em dashes anywhere, in copy or code comments.
- Two-ring `:focus-visible` on every interactive element (`focus-ring-light` / `focus-ring-dark`); buttons never change text colour on hover.
- Every section that carries text is wrapped in `<div data-tone="light|adire|ink">` and keeps at least 64px of padding top and bottom, so the tone masks' 120px feather never crosses text (the legibility rule, verified on Home).
- Motion only behind `motion-safe:`; `Reveal` on every section after the hero.
- Smart Blackboard does not appear anywhere.
- This is NOT stock Next.js (see `AGENTS.md`): server actions with `"use server"`, async `searchParams`, no `middleware.ts`.
- Secrets only via env (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`); never committed. `.env.local` is git-ignored already.

---

## Task 1: Inner-page world and shared pieces

**Files:**
- Modify: `components/home/PageBackground.tsx` (add `variant` prop)
- Modify: `components/home/PageBackground.test.tsx`
- Create: `components/layout/PageHero.tsx`, `components/layout/PageHero.test.tsx`
- Create: `components/ui/RingList.tsx`, `components/ui/RingList.test.tsx`
- Create: `components/ui/StatChip.tsx`, `components/ui/StatChip.test.tsx`
- Create: `components/layout/InnerPage.tsx` (composes background + nav + main + footer)

**Interfaces:**
- `PageBackground({ variant?: "home" | "inner" })`: `inner` renders no headset image and builds no dive timeline; the glow layer starts at opacity 1. Tone masks unchanged.
- `PageHero({ kicker, title, lede, device?: ReactNode })` renders `<header>` with `<h1>`; `min-h-[70dvh]`, bone text, grid `lg:grid-cols-[1.1fr_0.9fr]` when a device is given.
- `RingList({ items: string[], tone: "light" | "dark", accents?: string[] })` renders `<ul>` with ring-dot markers.
- `StatChip({ value, label, tone })` renders the numeral with the bracketed part in `laterite-text` (light) or `laterite-tint` (dark).
- `InnerPage({ children })` renders `<PageBackground variant="inner" />`, the fixed dark `Nav`, `<main className="relative z-10">{children}<Footer /></main>`.

- [ ] Write failing tests: `PageBackground` with `variant="inner"` renders no `img[src*="hero-headset"]`; `PageHero` renders the h1 and lede; `RingList` renders every item as a list item; `StatChip` splits `[100]+` into a bracketed span and a plus.
- [ ] Implement; run `npx vitest run components`; all pass.
- [ ] Commit: `feat: inner-page world, PageHero, RingList and StatChip`.

## Task 2: Work page

**Files:** `app/work/page.tsx`, `app/work/page.test.tsx`, `components/work/CaseStudy.tsx`, `components/work/FurtherWork.tsx`.

**Copy source:** deck Page 5 (Work): Hero H1 "Work", supporting text; Flagship case study (TITLE, CLIENT, CHALLENGE, SOLUTION, THE HARD PART, IMPACT bullets); "Holding copy while the page is thin" paragraph; the five "Further work" sector labels only (their bracketed descriptions are omitted). Metadata from "Meta titles and descriptions: WORK".

**Layout:** `PageHero` (device: portal arch with `proof-classroom.png`). `CaseStudy`: title as H2, client line in mono; four beats (Challenge bone, Solution bone, The hard part adire, Impact ink) each a sticky-heading two-column section; Impact = six `StatChip`s in a 3x2 grid. `FurtherWork` (bone): the holding copy as the paragraph, the five sectors as ring-marked labels, no cards.

- [ ] Tests: h1 "Work"; the CHALLENGE sentence "Across six African markets, between 45 and 75 percent of secondary schools have no adequate science laboratory." present; six stat values bracketed (`[100]`, `[20,000]`, `[250]`, `[X]` x2, `[X]`); the holding copy present; no element text matches "Named quote".
- [ ] `npm run build` passes; commit `feat: Work page`.

## Task 3: Platform page

**Files:** `app/platform/page.tsx`, `app/platform/page.test.tsx`, `components/platform/StackRings.tsx`, `components/platform/StackGrid.tsx`.

**Copy source:** deck Page 2 (Platform): hero, "Seven layers, one experience" with the seven layer paragraphs and DIAGRAM CAPTION; "The constraints we designed around, on purpose" five bullets; "It has to live with what schools already run" four bullets (brackets verbatim, including the note about roadmap); "A classroom is not an advertising market" five bullets + CTA; "Build on CR8LAB" paragraph + CTA; Closing CTA line. Metadata PLATFORM.

**Layout:** hero device `StackRings` (seven concentric rings, labels, caption in mono). `StackGrid`: seven cells on the hairline grid (bone). Constraints: `RingList` on adire. Interoperability, Security, Developers: bone `SectionTeaser`-style beats with `RingList`. Closing on ink with Book a demo.

- [ ] Tests: h1 "One platform. Multiple worlds."; all seven layer names; the sentence "No automated decision sets a child's placement or grade."; the bracketed export line contains "roadmap".
- [ ] Commit `feat: Platform page`.

## Task 4: Products page

**Files:** `app/products/page.tsx`, `app/products/page.test.tsx`, `components/products/ProductSection.tsx`, `components/products/HardwareStrip.tsx`; `PlatformModules` dial extracted to `components/ui/PlanetarySystem.tsx` taking `{ labels: string[] }` so Home and Products share it.

**Copy source:** deck Page 3 (Products): hero; 3.1 to 3.8 (ONE LINE, WHAT IT IS, WHO IT IS FOR, KEY POINTS, CTA); Hardware strip, first and third items only (Smart Blackboard removed). Metadata PRODUCTS.

- [ ] Tests: h1 "Eight products. One library. One account."; all eight product names; "Smart Blackboard" absent; the two hardware items present; every CTA label present.
- [ ] Commit `feat: Products page`.

## Task 5: Studio page

**Files:** `app/studio/page.tsx`, `app/studio/page.test.tsx`, `components/studio/*`.

**Copy source:** deck Page 7 (Studio): hero; Our story (two paragraphs); What we value (five); Team (four bracketed lines, rendered bracketed); How we work; Technology (bracketed list verbatim); Partners (bracketed); Recognition (bracketed); Press and media + BOILERPLATE; Careers. The deck's "NOTE FOR THE BUILD" is not rendered. Metadata STUDIO.

- [ ] Tests: h1 "The studio"; the boilerplate's first sentence; "[Name], [role]." present four times; no `<img>` in the team block.
- [ ] Commit `feat: Studio page`.

## Task 6: Contact page and form

**Files:** `app/contact/page.tsx`, `app/contact/page.test.tsx`, `app/contact/actions.ts`, `components/contact/ContactForm.tsx`, `components/contact/ContactForm.test.tsx`, `components/contact/Routes.tsx`, `.env.example`.

**Copy source:** deck Page 11 (Contact): hero; seven routes; FORM FIELDS (with the "I am here to", "Where will this run?", "Timeline", "Budget range" option lists verbatim); UNDER THE FORM; THANK YOU PAGE; Direct details (bracketed); Microcopy FORM ERROR. Metadata CONTACT.

**Form contract:** `submitContact(prevState, formData)` server action: validates required fields (name, email format, message), checks honeypot `website` is empty and `startedAt` is at least 3 seconds old, then sends via Resend (`RESEND_API_KEY`; to `CONTACT_TO_EMAIL`; from `CONTACT_FROM_EMAIL`) the submission and the thank-you. Returns `{ status: "success" } | { status: "error", message, fields? }`. If `RESEND_API_KEY` is unset, the action returns an error with the deck's FORM ERROR copy and logs the submission server-side (so a misconfigured deploy fails loudly, not silently).

- [ ] `npm install resend`; add `.env.example` with the three keys.
- [ ] Tests: `ContactForm` renders every field and option list; submitting with an empty name shows a field error; the `?route=partner` search param preselects "partner"; the success state shows "Got it. We are reading it now."
- [ ] Manual: with a real key in `.env.local`, one submission arrives.
- [ ] Commit `feat: Contact page with Resend-backed form`.

## Task 7: Wiring and verification

- [ ] Home's Work/Platform/Products CTAs and Footer/Nav links now resolve; `next build` lists the five routes.
- [ ] Run the legibility sweep script against each new route (padding audit + text-on-blend sweep at 1440 and 390).
- [ ] Screenshot each page hero on desktop and phone; fix anything that reads generic.
- [ ] `grep -rn "\[" app components --include=*.tsx | grep -v "\[data-\|className\|\[&\|\[--\|\[clamp\|\[linear\|\[radial\|\[menu\|\[orbit\|\[float\|\[pulse"` lists every bracket for the user's pre-launch pass; save the list to `docs/pre-launch-brackets.md`.
- [ ] Merge to main.
