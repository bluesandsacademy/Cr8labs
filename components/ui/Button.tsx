import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "ghost" | "dark" | "light";
type ButtonTheme = "light" | "dark";

// A flat, offset "block" shadow rather than a blurred drop shadow: the
// button reads as a solid object sitting slightly proud of the page, and
// presses flush on click/hover. One shadow colour (adire-dark) across every
// filled variant so it stays legible on both bone and ink backgrounds.
const STATIC_VARIANT_CLASSES: Record<"primary" | "dark" | "light", string> = {
  primary: "bg-danfo text-ink shadow-[0_6px_0_var(--color-adire-dark)]",
  dark: "bg-ink text-bone shadow-[0_6px_0_var(--color-adire-dark)]",
  // Bone-filled, ink text: for a solid CTA that needs to sit on a dark background
  // (e.g. the nav CTA on the 404 page), where the "dark" variant's ink fill would
  // have too little contrast against an already-dark page.
  light: "bg-bone text-ink shadow-[0_6px_0_var(--color-adire-dark)]",
};

// ghost depends on both variant and theme (an outline button needs an ink outline
// on a light page, a bone outline on a dark one), so it isn't a flat lookup. No
// block shadow here: an outline CTA reads as secondary, not as a pressable object.
const GHOST_CLASSES: Record<ButtonTheme, string> = {
  light: "bg-transparent border-[1.5px] border-ink text-ink hover:bg-ink hover:text-bone",
  dark: "bg-transparent border-[1.5px] border-bone text-bone hover:bg-bone hover:text-ink",
};

const FOCUS_RING_CLASSES: Record<ButtonTheme, string> = {
  light: "focus-ring-light",
  dark: "focus-ring-dark",
};

export function Button({
  href,
  variant,
  theme = "light",
  className,
  children,
}: {
  href: string;
  variant: ButtonVariant;
  theme?: ButtonTheme;
  className?: string;
  children: ReactNode;
}) {
  const variantClasses = variant === "ghost" ? GHOST_CLASSES[theme] : STATIC_VARIANT_CLASSES[variant];
  const isFilled = variant !== "ghost";

  return (
    <Link
      href={href}
      className={`inline-block rounded-2xl px-6.5 py-3.75 text-center font-display text-[15px] font-bold transition-all duration-150 ease-out ${
        isFilled ? "hover:translate-y-[3px] hover:shadow-[0_3px_0_var(--color-adire-dark)]" : ""
      } ${variantClasses} ${FOCUS_RING_CLASSES[theme]} ${className ?? ""}`}
    >
      {children}
    </Link>
  );
}
