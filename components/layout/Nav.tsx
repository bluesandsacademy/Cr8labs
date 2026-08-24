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
        className={`${open ? "flex" : "hidden"} absolute left-0 right-0 top-full flex-col gap-5 border-t px-8 py-6 md:static md:flex md:flex-row md:items-center md:gap-6.5 md:border-none md:p-0 ${
          isDark ? "border-adire-light/30 bg-adire-dark" : "border-border-light bg-bone"
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
