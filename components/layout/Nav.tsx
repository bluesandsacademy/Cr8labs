"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Building2, Layers, ShoppingBag, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { name: "About", href: "/about", Icon: Building2 },
  { name: "Solutions", href: "/solutions", Icon: Layers },
  { name: "Products", href: "/products", Icon: ShoppingBag },
  { name: "Industries", href: "/industries", Icon: Building2 },
  { name: "Contact", href: "/contact", Icon: Mail },
];

/**
 * Ported from bluesandsk12's components/common/header.jsx: a sticky, opaque
 * bar (not a fixed transparent overlay), pill-shaped links with an icon and
 * a label, hides on scroll down and reveals on scroll up, a rounded-full
 * mobile toggle and a plain slide-down mobile menu. No full-screen dark
 * takeover, no ring/orbit decoration: that was CR8LAB's old nav.
 */
export function Nav({ theme = "light" }: { theme?: "light" | "dark" }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 80);
        lastY = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-bone/95 backdrop-blur-sm transition-[transform,box-shadow,border-color] duration-300 ${
        scrolled ? "border-adire/10 shadow-[0_6px_20px_-12px_rgba(23,19,15,0.25)]" : "border-transparent"
      } ${hidden ? "-translate-y-full" : "translate-y-0"}`}
    >
      <nav className="page-frame flex h-20 items-center justify-between sm:h-24">
        <Link href="/" className="flex shrink-0 items-center gap-2.75 rounded-[3px] focus-ring-light" onClick={closeMenu}>
          <Image src="/brand/cr8lab-mark.png" alt="CR8LAB mark" width={320} height={206} priority className="h-9 w-auto sm:h-11" />
          <span className="font-display text-xl font-bold text-ink">CR8LAB</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex lg:gap-1.5" data-testid="nav-links-desktop">
          {NAV_LINKS.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2 font-sans text-sm font-bold text-ink transition-colors hover:bg-white hover:text-adire"
              >
                <link.Icon className="h-4 w-4" strokeWidth={2.5} />
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex">
          <Button href="/contact" variant={theme === "dark" ? "primary" : "dark"}>
            Book a demo
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink/12 bg-white text-ink transition-colors hover:text-adire lg:hidden"
        >
          {open ? <X className="h-6 w-6" strokeWidth={2.5} /> : <Menu className="h-6 w-6" strokeWidth={2.5} />}
        </button>
      </nav>

      <div data-testid="nav-links" className={`${open ? "" : "hidden"} border-t border-adire/10 bg-bone lg:hidden`}>
        <nav className="space-y-1 px-4 py-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={closeMenu}
              className="flex items-center gap-2.5 rounded-xl px-3 py-3 font-sans text-base font-bold text-ink transition-colors hover:bg-white hover:text-adire"
            >
              <link.Icon className="h-5 w-5" strokeWidth={2.5} />
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={closeMenu}
            className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-danfo px-5 py-3 text-center font-display font-bold text-ink shadow-[0_6px_0_var(--color-adire-dark)]"
          >
            Book a demo
          </Link>
          <p className="px-3 pt-3 font-mono text-[11px] text-muted">Lagos, Nigeria. Building since [year].</p>
        </nav>
      </div>
    </header>
  );
}
