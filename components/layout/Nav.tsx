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
  const barColor = isDark ? "bg-bone" : "bg-ink";

  return (
    <nav className="relative z-10 flex items-center justify-between px-8 py-7 md:px-16">
      <Link href="/" className={`flex items-center gap-2.75 rounded-[3px] ${focusRing}`}>
        <Image
          src="/brand/cr8lab-mark.png"
          alt="CR8LAB mark"
          width={320}
          height={206}
          priority
          className={`h-6.5 w-auto ${isDark ? "brightness-0 invert opacity-90" : ""}`}
        />
        <span className={`font-display text-[21px] font-bold ${isDark ? "text-bone" : "text-ink"}`}>
          CR8LAB
        </span>
      </Link>

      {/* Nine top-level links plus a CTA don't fit md/lg widths without wrapping or
          crowding, so the full row only appears from xl up; everything narrower than
          that gets this toggle, not just phones. */}
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-[3px] xl:hidden ${focusRing}`}
      >
        <span className="relative block h-4 w-5" aria-hidden="true">
          <span
            className={`absolute left-0 h-[1.6px] w-5 rounded-full transition-all duration-150 ease-out ${barColor} ${
              open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 top-1/2 h-[1.6px] w-5 -translate-y-1/2 rounded-full transition-opacity duration-150 ease-out ${barColor} ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 h-[1.6px] w-5 rounded-full transition-all duration-150 ease-out ${barColor} ${
              open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
            }`}
          />
        </span>
      </button>

      <div
        data-testid="nav-links"
        className={`${open ? "flex animate-[nav-menu-in_180ms_ease-out]" : "hidden"} absolute left-0 right-0 top-full flex-col gap-5 border-t px-8 py-6 shadow-lg xl:static xl:flex xl:animate-none xl:flex-row xl:items-center xl:gap-6.5 xl:border-none xl:bg-transparent xl:p-0 xl:shadow-none ${
          isDark ? "border-adire-light/30 bg-adire-dark" : "border-border-light bg-bone"
        }`}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className={`rounded-[3px] text-[12px] font-semibold uppercase tracking-wide ${linkColor} ${linkHoverColor} ${focusRing}`}
          >
            {link.label}
          </Link>
        ))}
        <Button
          href="/contact"
          variant={isDark ? "light" : "dark"}
          theme={theme}
          className="w-full xl:w-auto"
        >
          Book a demo
        </Button>
        <p className={`font-mono text-[11px] xl:hidden ${isDark ? "text-adire-caption" : "text-muted"}`}>
          Lagos, Nigeria. Building since [year].
        </p>
      </div>
    </nav>
  );
}
