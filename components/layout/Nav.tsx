"use client";

import { useEffect, useState } from "react";
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

const ACCENTS = ["#F5A623", "#8F87CF", "#D97A50"];

/**
 * The home page's fixed background writes the current world tone to
 * `<html data-tone>` as sections pass beneath the nav. Following it here
 * lets a dark-themed nav flip to ink text over bone sections instead of
 * vanishing bone-on-bone. Pages without a background never set it, so the
 * `theme` prop alone decides there.
 */
function useDocumentTone() {
  const [tone, setTone] = useState<string | undefined>(undefined);

  useEffect(() => {
    const root = document.documentElement;
    const read = () => setTone(root.dataset.tone);
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ["data-tone"] });
    return () => observer.disconnect();
  }, []);

  return tone;
}

/**
 * Below xl the menu is a full-screen takeover of the same dark world the
 * hero dives into (indigo, the ring-light glow, grain, a ring fragment off
 * the edge), with the nine destinations in display type rising in one after
 * another. From xl the very same list is the ordinary link row. One element,
 * two treatments, so nothing is duplicated in the DOM.
 */
export function Nav({ theme = "light" }: { theme?: "light" | "dark" }) {
  const [open, setOpen] = useState(false);
  const documentTone = useDocumentTone();
  const isDark = documentTone === "light" ? false : theme === "dark";
  // The bar sits over the takeover when it is open, so it goes dark with it.
  const barDark = isDark || open;

  const focusRing = barDark ? "focus-ring-dark" : "focus-ring-light";
  const barColor = barDark ? "bg-bone" : "bg-ink";
  const desktopLink = isDark ? "xl:text-bone xl:hover:text-white" : "xl:text-body xl:hover:text-ink";

  // While the takeover is open the page behind must not scroll, and Escape closes it.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <nav className="relative z-10 flex items-center justify-between px-8 py-7 md:px-16">
      <Link href="/" className={`relative z-50 flex items-center gap-2.75 rounded-[3px] ${focusRing}`}>
        <Image
          src="/brand/cr8lab-mark.png"
          alt="CR8LAB mark"
          width={320}
          height={206}
          priority
          className={`h-6.5 w-auto transition-[filter,opacity] duration-500 ${barDark ? "brightness-0 invert opacity-90" : ""}`}
        />
        <span
          className={`font-display text-[21px] font-bold transition-colors duration-500 ${barDark ? "text-bone" : "text-ink"}`}
        >
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
        className={`relative z-50 flex h-9 w-9 shrink-0 items-center justify-center rounded-[3px] xl:hidden ${focusRing}`}
      >
        <span className="relative block h-4 w-5" aria-hidden="true">
          <span
            className={`absolute left-0 h-[1.6px] w-5 rounded-full transition-all duration-200 ease-out ${barColor} ${
              open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 top-1/2 h-[1.6px] w-5 -translate-y-1/2 rounded-full transition-opacity duration-150 ease-out ${barColor} ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 h-[1.6px] w-5 rounded-full transition-all duration-200 ease-out ${barColor} ${
              open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
            }`}
          />
        </span>
      </button>

      <div
        data-testid="nav-links"
        className={`${open ? "flex motion-safe:animate-[menu-in_260ms_ease-out_both]" : "hidden"} fixed inset-0 z-40 h-dvh flex-col overflow-y-auto bg-adire-dark px-8 pb-8 pt-28 text-bone xl:static xl:z-auto xl:flex xl:h-auto xl:animate-none xl:flex-row xl:items-center xl:gap-6.5 xl:overflow-visible xl:bg-transparent xl:p-0`}
      >
        {/* The world: the hero's inside-the-lens glow, grain, and a ring
            fragment bleeding off the edge. Decoration only, and never at xl. */}
        <div
          className="pointer-events-none absolute inset-0 xl:hidden"
          style={{
            background:
              "radial-gradient(circle at 82% 22%, rgba(245,166,35,0.30) 0%, rgba(44,39,108,0.55) 38%, rgba(23,19,15,0.96) 80%)",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-[38vw] top-[6vh] h-[80vw] w-[80vw] rounded-full border-[3px] border-adire-light/25 xl:hidden"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-[38vw] top-[6vh] h-[80vw] w-[80vw] scale-[0.72] rounded-full border border-dashed border-adire-light/30 motion-safe:animate-[orbit_120s_linear_infinite] xl:hidden"
          aria-hidden="true"
        />
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07] mix-blend-overlay xl:hidden"
          aria-hidden="true"
        >
          <filter id="menu-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#menu-noise)" />
        </svg>

        <ul className="relative flex flex-1 flex-col justify-center gap-1 xl:contents">
          {NAV_LINKS.map((link, i) => (
            <li
              key={link.href}
              className="motion-safe:animate-[menu-link-in_520ms_cubic-bezier(0.2,0.7,0.2,1)_both] xl:animate-none"
              style={{ animationDelay: `${120 + i * 45}ms` }}
            >
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className={`group flex items-center gap-4 rounded-[3px] py-2 font-display text-[clamp(30px,8.5vw,40px)] leading-[1.05] text-bone transition-colors duration-500 focus-ring-dark xl:gap-0 xl:py-0 xl:font-sans xl:text-[12px] xl:font-semibold xl:uppercase xl:leading-normal xl:tracking-wide ${desktopLink} ${
                  isDark ? "xl:focus-ring-dark" : "xl:focus-ring-light"
                }`}
              >
                <span
                  className="relative flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border-[1.5px] transition-transform duration-300 group-active:scale-125 xl:hidden"
                  style={{ borderColor: ACCENTS[i % ACCENTS.length] }}
                  aria-hidden="true"
                >
                  <span
                    className="h-1 w-1 rounded-full"
                    style={{ backgroundColor: ACCENTS[i % ACCENTS.length] }}
                  />
                </span>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div
          className="relative mt-8 flex flex-col gap-5 motion-safe:animate-[menu-link-in_520ms_cubic-bezier(0.2,0.7,0.2,1)_both] xl:contents"
          style={{ animationDelay: "560ms" }}
        >
          <Button
            href="/contact"
            variant={barDark ? "light" : "dark"}
            theme={barDark ? "dark" : "light"}
            className="w-full text-center xl:w-auto"
          >
            Book a demo
          </Button>
          <p className="font-mono text-[11px] text-adire-caption xl:hidden">
            Lagos, Nigeria. Building since [year].
          </p>
        </div>
      </div>
    </nav>
  );
}
