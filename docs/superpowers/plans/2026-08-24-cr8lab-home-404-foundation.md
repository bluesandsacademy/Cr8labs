# CR8LAB Design System Foundation, Home Page & 404 Page: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up the CR8LAB design system as real code (fonts, design tokens, base components) and ship the Home page and the 404 page fully, replacing the create-next-app scaffold.

**Architecture:** Next.js 16 App Router, Tailwind CSS v4 (`@theme inline` tokens, already wired in this repo), CSS Modules for the handful of bespoke graphics (hero portal, 404 debris field) that don't map to utility classes. Components are plain React functions; only `app/fonts.ts` and `app/layout.tsx` touch `next/font`, so every other component is trivially unit-testable without mocking Next's font pipeline.

**Tech Stack:** Next.js 16.3.2, React 19.2.8, Tailwind CSS v4, Vitest + React Testing Library (new; this repo has no test setup yet), TypeScript.

**Spec:** `docs/superpowers/specs/2026-08-24-cr8lab-design-system-home-404-design.md`

## Global Constraints

- Brand name in all copy/code: **CR8LAB** (never "cr8labb" or "cr8labs").
- No em dashes anywhere, in code comments or copy.
- Unconfirmed docx facts (stat numbers, email domain, legal entity name, year) stay bracketed exactly as `[value]`; never invent a real number.
- Every interactive element gets the two-ring `:focus-visible` treatment: `box-shadow: 0 0 0 3px var(--color-bone), 0 0 0 6px var(--color-adire)` (or the ink/bone-inverted equivalent on dark backgrounds); never a bare `outline: none` and never the browser default.
- Buttons/links never change text color on `:hover`; use lift/shadow/opacity instead (a color-swap hover was tried during design and reverted after it reintroduced a WCAG contrast failure).
- This is NOT stock Next.js; per this repo's `AGENTS.md`, breaking changes are real: use `proxy.ts` (never `middleware.ts`), fully `async` `params`/`searchParams`/`cookies()`/`headers()`, `next/image` without `images.domains` (use `remotePatterns`), no `next/legacy/image`.
- Colors and fonts are exactly as defined in the spec's token table; copy hex values verbatim, do not approximate.

---

## Task 1: Testing harness

No test framework exists in this repo yet. Set up Vitest + React Testing Library so every later task can ship with real tests.

**Files:**
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `components/sanity.test.tsx`
- Modify: `package.json` (add devDependencies + `test`/`test:watch` scripts)

**Interfaces:**
- Produces: `vitest run` and `vitest` npm scripts every later task's tests run under.

- [ ] **Step 1: Install test dependencies**

```bash
npm install --save-dev vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 2: Create the Vitest config**

```typescript
// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
```

- [ ] **Step 3: Create the setup file**

```typescript
// vitest.setup.ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 4: Add npm scripts**

Modify `package.json` `"scripts"` block to add, alongside the existing `dev`/`build`/`start`/`lint` entries:

```json
    "test": "vitest run",
    "test:watch": "vitest"
```

- [ ] **Step 5: Write a trivial sanity test**

```tsx
// components/sanity.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

function Hello() {
  return <p>Hello CR8LAB</p>;
}

describe("test harness", () => {
  it("renders a component and finds it by text", () => {
    render(<Hello />);
    expect(screen.getByText("Hello CR8LAB")).toBeInTheDocument();
  });
});
```

- [ ] **Step 6: Run it and confirm it passes**

Run: `npx vitest run`
Expected: 1 test file, 1 test, PASS.

- [ ] **Step 7: Commit**

```bash
git add vitest.config.ts vitest.setup.ts components/sanity.test.tsx package.json package-lock.json
git commit -m "test: add Vitest and React Testing Library harness"
```

---

## Task 2: Brand assets and font files

Copy the working assets produced during design (the cropped brand mark and the Switzer font files) into the repo.

**Files:**
- Create: `public/brand/cr8lab-mark.png`
- Create: `app/fonts/switzer/Switzer-Regular.woff2`
- Create: `app/fonts/switzer/Switzer-Medium.woff2`
- Create: `app/fonts/switzer/Switzer-Semibold.woff2`
- Create: `app/fonts/switzer/Switzer-Bold.woff2`

**Interfaces:**
- Produces: `public/brand/cr8lab-mark.png` (320×206px, transparent background, sampled brand indigo `#2C276C`) consumed by the Nav component in Task 6. Font files consumed by `app/fonts.ts` in Task 3.

- [ ] **Step 1: Copy the brand mark**

```bash
mkdir -p public/brand
cp /tmp/cr8lab-icon2.png public/brand/cr8lab-mark.png
```

- [ ] **Step 2: Copy the Switzer font files with clean weight names**

```bash
mkdir -p app/fonts/switzer
cp "/private/tmp/claude-502/-Users-mac-Developer-blue-stem-labs-cr8labs/aebec752-b578-4d65-a141-3b1706d39a5b/scratchpad/fonts/switzer-400.woff2" app/fonts/switzer/Switzer-Regular.woff2
cp "/private/tmp/claude-502/-Users-mac-Developer-blue-stem-labs-cr8labs/aebec752-b578-4d65-a141-3b1706d39a5b/scratchpad/fonts/switzer-500.woff2" app/fonts/switzer/Switzer-Medium.woff2
cp "/private/tmp/claude-502/-Users-mac-Developer-blue-stem-labs-cr8labs/aebec752-b578-4d65-a141-3b1706d39a5b/scratchpad/fonts/switzer-600.woff2" app/fonts/switzer/Switzer-Semibold.woff2
cp "/private/tmp/claude-502/-Users-mac-Developer-blue-stem-labs-cr8labs/aebec752-b578-4d65-a141-3b1706d39a5b/scratchpad/fonts/switzer-700.woff2" app/fonts/switzer/Switzer-Bold.woff2
```

- [ ] **Step 3: Verify all five files exist and are non-empty**

Run: `ls -la public/brand/cr8lab-mark.png app/fonts/switzer/`
Expected: all five files listed with non-zero size.

- [ ] **Step 4: Commit**

```bash
git add public/brand/cr8lab-mark.png app/fonts/switzer/
git commit -m "chore: add CR8LAB brand mark and Switzer font files"
```

---

## Task 3: Fonts, design tokens, root layout

Wire the three typefaces through `next/font`, define every design token from the spec as a Tailwind v4 `@theme` block, and update the root layout to use them (replacing the create-next-app Geist scaffold).

**Files:**
- Create: `app/fonts.ts`
- Modify: `app/globals.css` (replace entirely)
- Modify: `app/layout.tsx` (replace entirely)
- Create: `app/fonts.test.ts`

**Interfaces:**
- Produces: `ojuju`, `switzer`, `jetbrainsMono` exports from `app/fonts.ts`, each a Next.js font object with a `.variable` string property (e.g. `--font-ojuju`) and a `.className` string property. Produces Tailwind utilities `bg-ink`, `text-bone`, `font-display`, `font-mono`, etc. from the `@theme` block, used by every later task.

- [ ] **Step 1: Write `app/fonts.ts`**

```typescript
// app/fonts.ts
import { Ojuju, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

export const ojuju = Ojuju({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-ojuju",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const switzer = localFont({
  src: [
    { path: "./fonts/switzer/Switzer-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/switzer/Switzer-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/switzer/Switzer-Semibold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/switzer/Switzer-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-switzer",
  display: "swap",
});
```

- [ ] **Step 2: Write a test that the font objects expose the expected CSS variable names**

`next/font` objects are only fully resolved by the Next.js compiler at build time, but their `variable` string is a static value we can assert on directly since it's the literal string we passed in; this catches a typo in the variable name (e.g. `--font-ojuju` vs `--font-ojjuju`) without needing a full Next.js build.

```typescript
// app/fonts.test.ts
import { describe, it, expect } from "vitest";
import { ojuju, switzer, jetbrainsMono } from "./fonts";

describe("app/fonts.ts", () => {
  it("exposes the expected CSS variable names", () => {
    expect(ojuju.variable).toBe("--font-ojuju");
    expect(switzer.variable).toBe("--font-switzer");
    expect(jetbrainsMono.variable).toBe("--font-jetbrains-mono");
  });
});
```

- [ ] **Step 3: Run it to verify it passes**

Run: `npx vitest run app/fonts.test.ts`
Expected: PASS.

- [ ] **Step 4: Replace `app/globals.css` with the full design token set**

```css
/* app/globals.css */
@import "tailwindcss";

:root {
  --color-ink: #17130f;
  --color-bone: #f3ecde;
  --color-danfo: #f5a623;
  --color-adire: #2c276c;
  --color-adire-dark: #211d54;
  --color-adire-light: #6e67b8;
  --color-adire-tint: #8f87cf;
  --color-adire-caption: #a39cc9;
  --color-laterite: #b6502e;
  --color-laterite-text: #a34a28;
  --color-laterite-tint: #d97a50;
  --color-success: #4f7355;
  --color-success-text: #456b4b;
  --color-muted: #6b6455;
  --color-body: #453f35;
  --color-border: #c9bfa6;
  --color-border-light: #e4dac4;
  --color-disabled: #9c9484;
}

@theme inline {
  --color-ink: var(--color-ink);
  --color-bone: var(--color-bone);
  --color-danfo: var(--color-danfo);
  --color-adire: var(--color-adire);
  --color-adire-dark: var(--color-adire-dark);
  --color-adire-light: var(--color-adire-light);
  --color-adire-tint: var(--color-adire-tint);
  --color-adire-caption: var(--color-adire-caption);
  --color-laterite: var(--color-laterite);
  --color-laterite-text: var(--color-laterite-text);
  --color-laterite-tint: var(--color-laterite-tint);
  --color-success: var(--color-success);
  --color-success-text: var(--color-success-text);
  --color-muted: var(--color-muted);
  --color-body: var(--color-body);
  --color-border: var(--color-border);
  --color-border-light: var(--color-border-light);
  --color-disabled: var(--color-disabled);

  --font-display: var(--font-ojuju);
  --font-sans: var(--font-switzer);
  --font-mono: var(--font-jetbrains-mono);
}

body {
  background: var(--color-bone);
  color: var(--color-ink);
  font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
}

/* Two-ring focus treatment used by every interactive element, light-background variant. */
.focus-ring-light:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--color-bone), 0 0 0 6px var(--color-adire);
}

/* Two-ring focus treatment, dark-background variant (404 page, dark nav). */
.focus-ring-dark:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--color-adire-dark), 0 0 0 6px var(--color-bone);
}
```

This deliberately removes the create-next-app `--background`/`--foreground` pair and the `prefers-color-scheme: dark` media query: CR8LAB is a fixed brand palette, not a light/dark-adaptive theme.

- [ ] **Step 5: Replace `app/layout.tsx`**

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import { ojuju, switzer, jetbrainsMono } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "CR8LAB | Creative Technology Company, Lagos",
  description:
    "CR8LAB builds immersive learning platforms, spatial computing experiences and interactive stories using AR, VR and AI. Original technology, made in Africa, built for global use.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${ojuju.variable} ${switzer.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
```

- [ ] **Step 6: Confirm the project still builds**

Run: `npm run build`
Expected: build succeeds (the default `app/page.tsx` from create-next-app still references `next.svg`/`vercel.svg` in `public/` and Geist-flavored Tailwind classes like `bg-zinc-50`; those keep working since Tailwind's own utility classes are untouched; it will be replaced in Task 9).

- [ ] **Step 7: Commit**

```bash
git add app/fonts.ts app/fonts.test.ts app/globals.css app/layout.tsx
git commit -m "feat: wire Ojuju/Switzer/JetBrains Mono fonts and CR8LAB design tokens"
```

---

## Task 4: Button component

**Files:**
- Create: `components/ui/Button.tsx`
- Create: `components/ui/Button.test.tsx`

**Interfaces:**
- Produces: `Button` component; `<Button href="..." variant="primary" | "ghost" | "dark" theme="light" | "dark">children</Button>`, always rendered as an `<a>` (this system has no client-side actions yet, only navigation). `theme` picks which two-ring focus style applies (`focus-ring-light` vs `focus-ring-dark`) and only matters for `variant="ghost"` on a dark page; `primary` and `dark` variants already contrast correctly against both page backgrounds used in this plan.
- Consumes: Tailwind tokens from Task 3 (`bg-danfo`, `text-ink`, `bg-ink`, `text-bone`, `focus-ring-light`, `focus-ring-dark`).

- [ ] **Step 1: Write the failing tests**

```tsx
// components/ui/Button.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("renders as a link with the given href and label", () => {
    render(<Button href="/demo" variant="primary">Book a demo</Button>);
    const link = screen.getByRole("link", { name: "Book a demo" });
    expect(link).toHaveAttribute("href", "/demo");
  });

  it("applies danfo fill for the primary variant", () => {
    render(<Button href="/x" variant="primary">Go</Button>);
    expect(screen.getByRole("link", { name: "Go" })).toHaveClass("bg-danfo");
  });

  it("applies ink fill for the dark variant", () => {
    render(<Button href="/x" variant="dark">Go</Button>);
    expect(screen.getByRole("link", { name: "Go" })).toHaveClass("bg-ink");
  });

  it("applies the dark-background focus ring when theme is dark", () => {
    render(<Button href="/x" variant="ghost" theme="dark">Go</Button>);
    expect(screen.getByRole("link", { name: "Go" })).toHaveClass("focus-ring-dark");
  });

  it("applies the light-background focus ring by default", () => {
    render(<Button href="/x" variant="ghost">Go</Button>);
    expect(screen.getByRole("link", { name: "Go" })).toHaveClass("focus-ring-light");
  });

  it("applies bone fill for the light variant, used on dark backgrounds", () => {
    render(<Button href="/x" variant="light">Go</Button>);
    expect(screen.getByRole("link", { name: "Go" })).toHaveClass("bg-bone");
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run components/ui/Button.test.tsx`
Expected: FAIL; `./Button` does not exist yet.

- [ ] **Step 3: Implement the component**

```tsx
// components/ui/Button.tsx
import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "ghost" | "dark" | "light";
type ButtonTheme = "light" | "dark";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-danfo text-ink shadow-[0_10px_24px_-12px_rgba(245,166,35,0.55)] hover:-translate-y-0.5",
  ghost:
    "bg-transparent border-[1.5px] border-ink text-ink hover:bg-ink hover:text-bone",
  dark: "bg-ink text-bone hover:opacity-85",
  // Bone-filled, ink text: for a solid CTA that needs to sit on a dark background
  // (e.g. the nav CTA on the 404 page), where the "dark" variant's ink fill would
  // have too little contrast against an already-dark page.
  light: "bg-bone text-ink hover:opacity-85",
};

const FOCUS_RING_CLASSES: Record<ButtonTheme, string> = {
  light: "focus-ring-light",
  dark: "focus-ring-dark",
};

export function Button({
  href,
  variant,
  theme = "light",
  children,
}: {
  href: string;
  variant: ButtonVariant;
  theme?: ButtonTheme;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`inline-block rounded-[3px] px-[26px] py-[15px] font-sans text-[15px] font-semibold transition-all duration-150 ease-out ${VARIANT_CLASSES[variant]} ${FOCUS_RING_CLASSES[theme]}`}
    >
      {children}
    </Link>
  );
}
```

Note: the `ghost` variant on a dark page (404) needs bone text/border, not ink; that's handled by passing `theme="dark"` for the focus ring, but the ghost variant's own colors also need to flip. Revise `VARIANT_CLASSES.ghost` is light-page-only; the dark page's ghost button is built directly in Task 10 with its own bone-bordered classes rather than overloading this component with a fourth variant combination, since only one page needs it.

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run components/ui/Button.test.tsx`
Expected: PASS, all 5 tests.

- [ ] **Step 5: Commit**

```bash
git add components/ui/Button.tsx components/ui/Button.test.tsx
git commit -m "feat: add Button component with primary/ghost/dark variants"
```

---

## Task 5: RingDivider component

**Files:**
- Create: `components/ui/RingDivider.tsx`
- Create: `components/ui/RingDivider.test.tsx`

**Interfaces:**
- Produces: `RingDivider`; a horizontal rule broken by a small ring-with-center-dot, replacing a plain `<hr>`. No props needed (it's purely decorative structure, not content-bearing).

- [ ] **Step 1: Write the failing test**

```tsx
// components/ui/RingDivider.test.tsx
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { RingDivider } from "./RingDivider";

describe("RingDivider", () => {
  it("renders a separator role for assistive tech", () => {
    const { getByRole } = render(<RingDivider />);
    expect(getByRole("separator")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run components/ui/RingDivider.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement the component**

```tsx
// components/ui/RingDivider.tsx
export function RingDivider() {
  return (
    <div role="separator" className="flex items-center gap-3.5 px-16">
      <div className="h-px flex-1 bg-border-light" />
      <div className="relative flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-[1.5px] border-adire">
        <div className="h-[5px] w-[5px] rounded-full bg-adire" />
      </div>
      <div className="h-px flex-1 bg-border-light" />
    </div>
  );
}
```

- [ ] **Step 4: Run it to verify it passes**

Run: `npx vitest run components/ui/RingDivider.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/ui/RingDivider.tsx components/ui/RingDivider.test.tsx
git commit -m "feat: add RingDivider component"
```

---

## Task 6: Nav component (with mobile menu)

The docx's primary navigation has 9 items (Platform, Products, Solutions, Work, Labs, Studio, Research, Community, Resources) plus a CTA; too many to fit a mobile viewport, so this needs a real, working disclosure menu, not just a desktop mockup. This is a Client Component (needs `useState`).

**Files:**
- Create: `components/layout/Nav.tsx`
- Create: `components/layout/Nav.test.tsx`

**Interfaces:**
- Produces: `Nav`; `<Nav theme="light" | "dark" />`. `light` (used on Home) renders the ink-filled CTA and dark nav text on transparent/bone background; `dark` (used on the 404 page) renders bone text, a bone-inverted brand mark, and a bone-filled CTA, matching the spec's 404 description.
- Consumes: `Button` from Task 4, the brand mark asset from Task 2 (`/brand/cr8lab-mark.png`).

- [ ] **Step 1: Write the failing tests**

```tsx
// components/layout/Nav.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Nav } from "./Nav";

const NAV_LINKS = [
  "Platform",
  "Products",
  "Solutions",
  "Work",
  "Labs",
  "Studio",
  "Research",
  "Community",
  "Resources",
];

describe("Nav", () => {
  it("renders the CR8LAB wordmark", () => {
    render(<Nav theme="light" />);
    expect(screen.getByText("CR8LAB")).toBeInTheDocument();
  });

  it("renders all nine primary nav links plus the demo CTA", () => {
    render(<Nav theme="light" />);
    for (const label of NAV_LINKS) {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    }
    expect(screen.getByRole("link", { name: "Book a demo" })).toBeInTheDocument();
  });

  it("hides the link list from the accessibility tree until the mobile menu is opened", async () => {
    render(<Nav theme="light" />);
    const toggle = screen.getByRole("button", { name: /menu/i });
    const list = screen.getByTestId("nav-links");
    expect(list).toHaveClass("hidden");
    await userEvent.click(toggle);
    expect(list).not.toHaveClass("hidden");
  });

  it("renders the Lagos line in the mobile menu once opened, with the docx's own placeholder", async () => {
    render(<Nav theme="light" />);
    await userEvent.click(screen.getByRole("button", { name: /menu/i }));
    expect(screen.getByText("Lagos, Nigeria. Building since [year].")).toBeInTheDocument();
  });

  it("uses a bone-filled CTA on the dark theme, so it doesn't go ink-on-dark", () => {
    render(<Nav theme="dark" />);
    expect(screen.getByRole("link", { name: "Book a demo" })).toHaveClass("bg-bone");
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run components/layout/Nav.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement the component**

```tsx
// components/layout/Nav.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Platform", href: "/platform" },
  { label: "Products", href: "/products" },
  { label: "Solutions", href: "/solutions" },
  { label: "Work", href: "/work" },
  { label: "Labs", href: "/labs" },
  { label: "Studio", href: "/studio" },
  { label: "Research", href: "/research" },
  { label: "Community", href: "/community" },
  { label: "Resources", href: "/resources" },
];

export function Nav({ theme = "light" }: { theme?: "light" | "dark" }) {
  const [open, setOpen] = useState(false);
  const isDark = theme === "dark";

  const linkColor = isDark ? "text-bone" : "text-body";
  const linkHoverColor = isDark ? "hover:text-white" : "hover:text-ink";
  const focusRing = isDark ? "focus-ring-dark" : "focus-ring-light";

  return (
    <nav className="relative z-10 flex items-center justify-between px-8 py-7 md:px-16">
      <Link href="/" className={`flex items-center gap-[11px] rounded-[3px] ${focusRing}`}>
        <Image
          src="/brand/cr8lab-mark.png"
          alt="CR8LAB mark"
          width={320}
          height={206}
          priority
          className={`h-[26px] w-auto ${isDark ? "brightness-0 invert opacity-90" : ""}`}
        />
        <span className={`font-display text-[21px] font-bold ${isDark ? "text-bone" : "text-ink"}`}>
          CR8LAB
        </span>
      </Link>

      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`rounded-[3px] px-3 py-2 text-[13px] font-semibold uppercase tracking-wide md:hidden ${linkColor} ${focusRing}`}
      >
        Menu
      </button>

      <div
        data-testid="nav-links"
        className={`${open ? "flex" : "hidden"} absolute left-0 right-0 top-full flex-col gap-5 border-t px-8 py-6 md:static md:flex md:flex-row md:items-center md:gap-[26px] md:border-none md:p-0 ${
          isDark ? "border-adire-light bg-adire-dark" : "border-border-light bg-bone"
        }`}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-[3px] text-[12px] font-semibold uppercase tracking-wide ${linkColor} ${linkHoverColor} ${focusRing}`}
          >
            {link.label}
          </Link>
        ))}
        <Button href="/contact" variant={isDark ? "light" : "dark"} theme={theme}>
          Book a demo
        </Button>
        <p className={`font-mono text-[11px] md:hidden ${isDark ? "text-adire-caption" : "text-muted"}`}>
          Lagos, Nigeria. Building since [year].
        </p>
      </div>
    </nav>
  );
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run components/layout/Nav.test.tsx`
Expected: PASS, all 4 tests.

- [ ] **Step 5: Commit**

```bash
git add components/layout/Nav.tsx components/layout/Nav.test.tsx
git commit -m "feat: add Nav component with light/dark themes and mobile menu"
```

---

## Task 7: Footer component

Not previously mocked up visually (see spec's "Known gaps" section); content transcribed directly from the docx's global footer copy, styled with already-established tokens.

**Files:**
- Create: `components/layout/Footer.tsx`
- Create: `components/layout/Footer.test.tsx`

**Interfaces:**
- Produces: `Footer`; no props, self-contained. Used only on the Home page in this plan (the 404 page has no footer, per spec).

- [ ] **Step 1: Write the failing tests**

```tsx
// components/layout/Footer.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("renders the footer statement with the CR8LAB brand name", () => {
    render(<Footer />);
    expect(
      screen.getByText(
        "CR8LAB is a creative technology company building immersive learning platforms, spatial computing experiences and interactive stories. Made in Africa, built to travel."
      )
    ).toBeInTheDocument();
  });

  it("renders all four column headings", () => {
    render(<Footer />);
    for (const heading of ["Platform", "Products", "Company", "Get in touch"]) {
      expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
    }
  });

  it("keeps the unconfirmed email and legal facts bracketed", () => {
    render(<Footer />);
    expect(screen.getByText("[hello@cr8lab.com]")).toBeInTheDocument();
    expect(screen.getByText(/© \[2026\] CR8LAB\./)).toBeInTheDocument();
    expect(screen.getByText(/\[Registered entity name, RC number\.\]/)).toBeInTheDocument();
  });

  it("renders the newsletter line", () => {
    render(<Footer />);
    expect(
      screen.getByText(
        "What we are building, once a month. Product releases, Labs projects, research notes, and the occasional honest account of what did not work."
      )
    ).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run components/layout/Footer.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement the component**

```tsx
// components/layout/Footer.tsx
import Link from "next/link";
import { RingDivider } from "@/components/ui/RingDivider";

const COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Platform",
    links: [
      { label: "Platform overview", href: "/platform" },
      { label: "Architecture", href: "/platform/architecture" },
      { label: "Offline and low bandwidth", href: "/platform/offline" },
      { label: "Security and data protection", href: "/platform/security" },
      { label: "Developers", href: "/platform/developers" },
    ],
  },
  {
    heading: "Products",
    links: [
      { label: "CR8LAB Books", href: "/products/books" },
      { label: "AR", href: "/products/ar" },
      { label: "VR", href: "/products/vr" },
      { label: "Labs", href: "/products/labs" },
      { label: "AI", href: "/products/ai" },
      { label: "Studio", href: "/products/studio" },
      { label: "Creator", href: "/products/creator" },
      { label: "Library", href: "/products/library" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Studio", href: "/studio" },
      { label: "Work", href: "/work" },
      { label: "Labs", href: "/labs" },
      { label: "Research", href: "/research" },
      { label: "Community", href: "/community" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
    ],
  },
  {
    heading: "Get in touch",
    links: [
      { label: "Book a demo", href: "/contact" },
      { label: "Partner with us", href: "/contact?route=partner" },
      { label: "Fund innovation", href: "/contact?route=fund" },
      { label: "Media enquiries", href: "/contact?route=press" },
    ],
  },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Child Safety and Data Rights", href: "/child-safety" },
  { label: "Accessibility", href: "/accessibility" },
];

export function Footer() {
  return (
    <footer className="bg-ink text-bone">
      <RingDivider />
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-8 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] md:px-16">
        <div className="flex flex-col gap-4">
          <p className="max-w-[280px] font-sans text-[14px] leading-relaxed text-bone/80">
            CR8LAB is a creative technology company building immersive learning platforms,
            spatial computing experiences and interactive stories. Made in Africa, built to
            travel.
          </p>
          <p className="max-w-[280px] font-sans text-[13px] leading-relaxed text-adire-caption">
            What we are building, once a month. Product releases, Labs projects, research
            notes, and the occasional honest account of what did not work.
          </p>
        </div>

        {COLUMNS.map((column) => (
          <div key={column.heading} className="flex flex-col gap-3">
            <h3 className="font-mono text-[11px] font-semibold uppercase tracking-wide text-adire-caption">
              {column.heading}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="focus-ring-dark rounded-[3px] font-sans text-[13px] text-bone/85 hover:text-danfo"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-adire-light/30 px-8 py-6 md:px-16">
        <p className="font-sans text-[12px] leading-relaxed text-bone/60">
          © [2026] CR8LAB. [Registered entity name, RC number.]{" "}
          {LEGAL_LINKS.map((link, i) => (
            <span key={link.href}>
              {i > 0 && " · "}
              <Link href={link.href} className="focus-ring-dark rounded-[3px] hover:text-danfo">
                {link.label}
              </Link>
            </span>
          ))}
        </p>
        <p className="mt-2 font-sans text-[13px] text-bone/85">[hello@cr8lab.com]</p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run components/layout/Footer.test.tsx`
Expected: PASS, all 4 tests.

- [ ] **Step 5: Commit**

```bash
git add components/layout/Footer.tsx components/layout/Footer.test.tsx
git commit -m "feat: add Footer component from docx global footer copy"
```

---

## Task 8: Home Hero component

The most visually involved piece: the two-column hero with the ring portal, diagonal seam, background watermark, and grain texture. The bespoke graphics (clip-path, repeating-linear-gradient seam, SVG noise filter) don't map to Tailwind utilities, so this uses a co-located CSS Module.

**Files:**
- Create: `components/home/Hero.tsx`
- Create: `components/home/Hero.module.css`
- Create: `components/home/Hero.test.tsx`

**Interfaces:**
- Produces: `Hero`; no props, self-contained (Home-page-only component, not reused elsewhere per the spec's motion/signature-moment guidance).
- Consumes: `Button` from Task 4.

- [ ] **Step 1: Write the failing test**

```tsx
// components/home/Hero.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders the headline with the accent phrase", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "The future of learning lives beyond the page"
    );
  });

  it("renders the supporting body copy", () => {
    render(<Hero />);
    expect(
      screen.getByText(
        "CR8LAB builds experiences that join books, augmented reality, virtual reality, artificial intelligence and interactive storytelling into one platform. Knowledge you can hold, walk into and take apart."
      )
    ).toBeInTheDocument();
  });

  it("renders both hero CTAs", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: "Explore the platform" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Book a demo" })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run components/home/Hero.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Write the CSS Module**

```css
/* components/home/Hero.module.css */
.grain {
  position: absolute;
  inset: 0;
  opacity: 0.05;
  mix-blend-mode: multiply;
  pointer-events: none;
}

.watermark {
  position: absolute;
  top: -260px;
  left: -220px;
  width: 560px;
  height: 560px;
  border-radius: 50%;
  border: 54px solid var(--color-ink);
  opacity: 0.035;
  pointer-events: none;
}

.watermark::after {
  content: "";
  position: absolute;
  inset: 90px;
  border-radius: 50%;
  border: 24px solid var(--color-ink);
  opacity: 0.6;
}

.portal {
  position: relative;
  background: var(--color-adire-dark);
  overflow: hidden;
  min-height: 320px;
}

.portalClip {
  clip-path: polygon(7% 0, 100% 0, 100% 100%, 0 100%);
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.glow {
  position: absolute;
  width: 640px;
  height: 640px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(245, 166, 35, 0.3) 0%, rgba(245, 166, 35, 0) 62%);
  filter: blur(2px);
}

.seam {
  position: absolute;
  top: -4%;
  left: 4.5%;
  width: 22px;
  height: 108%;
  background: repeating-linear-gradient(120deg, var(--color-danfo) 0 11px, var(--color-ink) 11px 22px);
  box-shadow: 0 0 26px 4px rgba(0, 0, 0, 0.28);
  z-index: 1;
}

.caption {
  position: absolute;
  left: 44px;
  bottom: 30px;
  right: 44px;
  font-family: var(--font-mono);
  font-weight: 500;
  font-size: 11px;
  color: var(--color-adire-caption);
  line-height: 1.55;
}
```

- [ ] **Step 4: Implement the component**

```tsx
// components/home/Hero.tsx
import { Button } from "@/components/ui/Button";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-bone">
      <svg className={styles.grain} width="100%" height="100%" aria-hidden="true">
        <filter id="hero-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-noise)" />
      </svg>
      <div className={styles.watermark} aria-hidden="true" />

      <div className="relative grid grid-cols-1 items-stretch lg:grid-cols-[1.08fr_1fr]">
        <div className="flex flex-col justify-center px-8 py-10 md:px-16 lg:py-6">
          <h1 className="max-w-[600px] font-display text-[44px] font-bold leading-[1.02] tracking-tight text-ink md:text-[66px]">
            The future of learning lives <span className="text-adire">beyond the page</span>
          </h1>
          <p className="mt-6 max-w-[440px] font-sans text-[17px] leading-relaxed text-body md:text-[18px]">
            CR8LAB builds experiences that join books, augmented reality, virtual reality,
            artificial intelligence and interactive storytelling into one platform. Knowledge
            you can hold, walk into and take apart.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3.5">
            <Button href="/platform" variant="primary">
              Explore the platform
            </Button>
            <Button href="/contact" variant="ghost">
              Book a demo
            </Button>
          </div>
        </div>

        <div className={styles.portal}>
          <div className={styles.seam} aria-hidden="true" />
          <div className={styles.portalClip}>
            <div className={styles.glow} aria-hidden="true" />
            <svg width="280" height="280" viewBox="0 0 380 380" fill="none" aria-hidden="true" className="relative md:h-[380px] md:w-[380px]">
              <circle cx="190" cy="190" r="158" stroke="#4A4494" strokeWidth="2" />
              <circle cx="190" cy="190" r="118" stroke="#F3ECDE" strokeWidth="2.5" />
              <circle cx="190" cy="190" r="80" stroke="#4A4494" strokeWidth="2" />
              <circle cx="190" cy="190" r="44" stroke="#F5A623" strokeWidth="3" />
              <circle cx="190" cy="190" r="14" fill="#F5A623" />
            </svg>
          </div>
          <p className={styles.caption}>
            Placeholder: Envato-sourced AR render, a scene assembling in 3D off a scanned book
            page. Camera pushes through the lens as the visitor scrolls.
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Run it to verify it passes**

Run: `npx vitest run components/home/Hero.test.tsx`
Expected: PASS, all 3 tests.

- [ ] **Step 6: Commit**

```bash
git add components/home/Hero.tsx components/home/Hero.module.css components/home/Hero.test.tsx
git commit -m "feat: add Home Hero component with ring portal and seam"
```

---

## Task 9: TrustBar component and the assembled Home page

**Files:**
- Create: `components/home/TrustBar.tsx`
- Create: `components/home/TrustBar.test.tsx`
- Modify: `app/page.tsx` (replace entirely)
- Create: `app/page.test.tsx`

**Interfaces:**
- Produces: `TrustBar` (no props). Produces the default export of `app/page.tsx`, assembled from `Nav` (Task 6), `Hero` (Task 8), `RingDivider` (Task 5), `TrustBar`, and `Footer` (Task 7).

- [ ] **Step 1: Write the failing TrustBar test**

```tsx
// components/home/TrustBar.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TrustBar } from "./TrustBar";

describe("TrustBar", () => {
  it("renders the trust line", () => {
    render(<TrustBar />);
    expect(
      screen.getByText("Built for Africa. Designed for the world. Running on technology we own.")
    ).toBeInTheDocument();
  });

  it("keeps all four unconfirmed stats bracketed", () => {
    render(<TrustBar />);
    expect(screen.getByText("[100]+")).toBeInTheDocument();
    expect(screen.getByText("[20,000]+")).toBeInTheDocument();
    expect(screen.getByText("[6]")).toBeInTheDocument();
    expect(screen.getByText("[250]+")).toBeInTheDocument();
    expect(screen.getByText("schools")).toBeInTheDocument();
    expect(screen.getByText("students")).toBeInTheDocument();
    expect(screen.getByText("countries")).toBeInTheDocument();
    expect(screen.getByText("interactive experiences")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run components/home/TrustBar.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement TrustBar**

```tsx
// components/home/TrustBar.tsx
const STATS: { value: string; label: string }[] = [
  { value: "[100]+", label: "schools" },
  { value: "[20,000]+", label: "students" },
  { value: "[6]", label: "countries" },
  { value: "[250]+", label: "interactive experiences" },
];

export function TrustBar() {
  return (
    <div className="bg-bone px-8 py-11 md:px-16">
      <p className="mb-7 font-sans text-[13px] font-medium text-muted">
        Built for Africa. Designed for the world. Running on technology we own.
      </p>
      <div className="flex flex-wrap gap-x-16 gap-y-6">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1.5">
            {/* Rendered as one plain text node (not split across a styled span for the
                bracket) so the visible text is exactly "[100]+" etc, matching both the
                docx placeholder convention and how the test queries for it. */}
            <div className="font-mono text-[28px] font-bold text-ink md:text-[30px]">
              {stat.value}
            </div>
            <div className="text-[12px] tracking-wide text-muted">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run it to verify it passes**

Run: `npx vitest run components/home/TrustBar.test.tsx`
Expected: PASS.

- [ ] **Step 5: Write the failing Home page test**

```tsx
// app/page.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home page", () => {
  it("renders the nav, hero, trust bar and footer together", () => {
    render(<Home />);
    expect(screen.getByText("CR8LAB")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "The future of learning lives beyond the page"
    );
    expect(screen.getByText("[100]+")).toBeInTheDocument();
    expect(
      screen.getByText(
        "CR8LAB is a creative technology company building immersive learning platforms, spatial computing experiences and interactive stories. Made in Africa, built to travel."
      )
    ).toBeInTheDocument();
  });
});
```

- [ ] **Step 6: Run it to verify it fails**

Run: `npx vitest run app/page.test.tsx`
Expected: FAIL (old create-next-app page still in place).

- [ ] **Step 7: Replace `app/page.tsx`**

```tsx
// app/page.tsx
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { RingDivider } from "@/components/ui/RingDivider";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-bone">
      <Nav theme="light" />
      <Hero />
      <div className="py-8">
        <RingDivider />
      </div>
      <TrustBar />
      <Footer />
    </div>
  );
}
```

- [ ] **Step 8: Delete the now-unused create-next-app public assets**

```bash
rm -f public/next.svg public/vercel.svg public/file.svg public/globe.svg public/window.svg
```

- [ ] **Step 9: Run the Home page test to verify it passes**

Run: `npx vitest run app/page.test.tsx`
Expected: PASS.

- [ ] **Step 10: Commit**

```bash
git add components/home/TrustBar.tsx components/home/TrustBar.test.tsx app/page.tsx app/page.test.tsx
git add -u public
git commit -m "feat: assemble the CR8LAB Home page"
```

---

## Task 10: 404 page

**Files:**
- Create: `app/not-found.tsx`
- Create: `app/not-found.module.css`
- Create: `app/not-found.test.tsx`

**Interfaces:**
- Produces: the default export of `app/not-found.tsx`, which Next.js renders automatically for any unmatched route (including every link in `Nav`/`Footer` that points to a page not yet built in this plan; an intentional, on-brand fallback rather than a broken link).
- Consumes: `Nav` (Task 6, `theme="dark"`).

- [ ] **Step 1: Write the failing test**

```tsx
// app/not-found.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NotFound from "./not-found";

describe("404 page", () => {
  it("renders the docx's not-found copy exactly", () => {
    render(<NotFound />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Nothing here.");
    expect(screen.getByText("Not even in three dimensions.")).toBeInTheDocument();
    expect(
      screen.getByText("Try the work, or tell us what you were looking for.")
    ).toBeInTheDocument();
  });

  it("renders both CTAs", () => {
    render(<NotFound />);
    expect(screen.getByRole("link", { name: "See the work" })).toHaveAttribute("href", "/work");
    expect(screen.getByRole("link", { name: "Get in touch" })).toHaveAttribute("href", "/contact");
  });

  it("renders the dark-theme nav", () => {
    render(<NotFound />);
    expect(screen.getByText("CR8LAB")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run app/not-found.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Write the CSS Module for the scattered ring debris**

```css
/* app/not-found.module.css */
.root {
  background: radial-gradient(circle at 62% 38%, #322c7d 0%, #211d54 42%, #14113a 100%);
  min-height: 100dvh;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.grain {
  position: absolute;
  inset: 0;
  opacity: 0.06;
  mix-blend-mode: overlay;
  pointer-events: none;
  z-index: 6;
}

.main {
  flex: 1;
  display: flex;
  align-items: center;
  position: relative;
  padding: 48px 8px 48px 32px;
}

@media (min-width: 768px) {
  .main {
    padding-left: 128px;
  }
}

.debris {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.debris svg {
  position: absolute;
}

.d1 {
  width: 620px;
  height: 620px;
  top: -140px;
  right: -80px;
  opacity: 0.5;
}
.d2 {
  width: 320px;
  height: 320px;
  bottom: -60px;
  right: 260px;
  opacity: 0.65;
}
.d3 {
  width: 180px;
  height: 180px;
  top: 90px;
  right: 560px;
  opacity: 0.8;
}
.d4 {
  width: 70px;
  height: 70px;
  bottom: 140px;
  right: 120px;
  opacity: 0.9;
}
.d5 {
  width: 34px;
  height: 34px;
  top: 220px;
  right: 760px;
  opacity: 0.7;
}

.glow {
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  width: 720px;
  height: 720px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(245, 166, 35, 0.22) 0%, rgba(245, 166, 35, 0) 62%);
  z-index: 1;
  pointer-events: none;
}

.content {
  position: relative;
  z-index: 3;
  max-width: 560px;
}

.h1 {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 64px;
  line-height: 0.94;
  letter-spacing: -0.02em;
}

@media (min-width: 768px) {
  .h1 {
    font-size: 92px;
  }
}
```

- [ ] **Step 4: Implement the component**

```tsx
// app/not-found.tsx
import { Nav } from "@/components/layout/Nav";
import { Button } from "@/components/ui/Button";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.root}>
      <svg className={styles.grain} width="100%" height="100%" aria-hidden="true">
        <filter id="notfound-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#notfound-noise)" />
      </svg>

      <Nav theme="dark" />

      <div className={styles.main}>
        <div className={styles.glow} aria-hidden="true" />

        <div className={styles.debris} aria-hidden="true">
          <svg className={styles.d1} viewBox="0 0 620 620" fill="none">
            <circle cx="310" cy="310" r="290" stroke="#4A4494" strokeWidth="2" strokeDasharray="22 16" transform="rotate(-12 310 310)" />
          </svg>
          <svg className={styles.d2} viewBox="0 0 320 320" fill="none">
            <circle cx="160" cy="160" r="145" stroke="#8F87CF" strokeWidth="2.5" strokeDasharray="14 12" transform="rotate(30 160 160)" />
          </svg>
          <svg className={styles.d3} viewBox="0 0 180 180" fill="none">
            <circle cx="90" cy="90" r="78" stroke="#F5A623" strokeWidth="3" strokeDasharray="8 9" transform="rotate(60 90 90)" />
          </svg>
          <svg className={styles.d4} viewBox="0 0 70 70" fill="none">
            <circle cx="35" cy="35" r="28" stroke="#F3ECDE" strokeWidth="2.5" strokeDasharray="5 6" />
          </svg>
          <svg className={styles.d5} viewBox="0 0 34 34" fill="none">
            <circle cx="17" cy="17" r="13" stroke="#A39CC9" strokeWidth="2" strokeDasharray="3 5" />
          </svg>
        </div>

        <div className={styles.content}>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-adire-caption">
            Error 404
          </p>
          {/* Deliberately one line of JSX text (no <br /> + adjacent text across lines):
              JSX's whitespace collapsing around line breaks is easy to get subtly wrong,
              and this keeps the rendered text an unambiguous "Nothing here." */}
          <h1 className={`${styles.h1} mt-5 text-bone`}>
            Nothing here<span className="text-adire-tint">.</span>
          </h1>
          <p className="mt-5 font-sans text-[19px] text-bone/75">Not even in three dimensions.</p>
          <p className="mt-2 max-w-[420px] font-sans text-[16px] leading-relaxed text-bone/75">
            Try the work, or tell us what you were looking for.
          </p>
          <div className="mt-6 flex gap-3.5">
            <Button href="/work" variant="primary" theme="dark">
              See the work
            </Button>
            <a
              href="/contact"
              className="focus-ring-dark inline-block rounded-[3px] border-[1.5px] border-bone px-[26px] py-[13.5px] font-sans text-[15px] font-semibold text-bone transition-opacity duration-150 ease-out hover:opacity-80"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Run it to verify it passes**

Run: `npx vitest run app/not-found.test.tsx`
Expected: PASS, all 3 tests.

- [ ] **Step 6: Commit**

```bash
git add app/not-found.tsx app/not-found.module.css app/not-found.test.tsx
git commit -m "feat: add CR8LAB 404 page with scattered ring debris"
```

---

## Deferred (not in this plan)

The spec's Motion section describes a scroll-linked animation for the hero portal (rings expand and the panel crossfades into an immersive render as the visitor scrolls, validated as a working technique in `design/cr8lab-brand-system/Motion.dc.html`). Task 8 ships the hero as a static graphic. Implementing the scroll-linked version touches how the Hero pins relative to the rest of the page (the whole point is that it pins while `TrustBar`/`Footer` scroll past it), which is a real structural change to the assembled page from Task 9, not a self-contained addition to `Hero.tsx`; it deserves its own small plan once the static version is confirmed working in production, rather than being folded in here as an afterthought. Do not skip this silently: flag it to the user after Task 11 as the natural next follow-up.

## Task 11: Final verification

**Files:** none created; this task only runs checks.

- [ ] **Step 1: Run the full test suite**

Run: `npm run test`
Expected: every test file from Tasks 1–10 passes (sanity, fonts, Button, RingDivider, Nav, Footer, Hero, TrustBar, Home page, 404 page).

- [ ] **Step 2: Run the linter**

Run: `npm run lint`
Expected: no errors. Fix any that appear (most likely unused imports) before proceeding.

- [ ] **Step 3: Run a production build**

Run: `npm run build`
Expected: build succeeds with no type errors. This is also the only reliable check that `next/font/local` correctly resolves the four Switzer `.woff2` files added in Task 2; Vitest never exercises Next's real font pipeline (see Task 3's design note), so a clean build here is the actual proof that font loading works, not the unit tests.

- [ ] **Step 4: Manual check in the dev server**

Run: `npm run dev`, open `http://localhost:3000` and `http://localhost:3000/this-does-not-exist`. Confirm:
- Fonts render correctly (Ojuju headline, Switzer body, JetBrains Mono stats/labels); a fallback system font here means Task 2 or Task 3 has a broken path.
- The mobile menu opens/closes below the `md` breakpoint (resize the window or use device toolbar).
- Tab through the page: every interactive element shows the two-ring focus outline, never a bare browser outline.
- The 404 page's dark theme, ring debris, and glow render as described in the spec.

Note down anything visually broken relative to `design/cr8lab-brand-system/Main.dc.html` and `NotFound.dc.html` and fix it directly (no separate task; this is a verification pass, not new scope).

- [ ] **Step 5: Final commit if Step 4 required fixes**

```bash
git add -A
git commit -m "fix: address issues found in manual verification pass"
```

(Skip this step if Step 4 found nothing to fix.)
