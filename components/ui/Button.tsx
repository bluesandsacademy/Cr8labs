import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "ghost" | "dark" | "light";
type ButtonTheme = "light" | "dark";

const STATIC_VARIANT_CLASSES: Record<"primary" | "dark" | "light", string> = {
  primary:
    "bg-danfo text-ink shadow-[0_10px_24px_-12px_rgba(245,166,35,0.55)] hover:-translate-y-0.5",
  dark: "bg-ink text-bone hover:opacity-85",
  // Bone-filled, ink text: for a solid CTA that needs to sit on a dark background
  // (e.g. the nav CTA on the 404 page), where the "dark" variant's ink fill would
  // have too little contrast against an already-dark page.
  light: "bg-bone text-ink hover:opacity-85",
};

// ghost depends on both variant and theme (an outline button needs an ink outline
// on a light page, a bone outline on a dark one), so it isn't a flat lookup.
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

  return (
    <Link
      href={href}
      className={`inline-block rounded-[3px] px-6.5 py-3.75 text-center font-sans text-[15px] font-semibold transition-all duration-150 ease-out ${variantClasses} ${FOCUS_RING_CLASSES[theme]} ${className ?? ""}`}
    >
      {children}
    </Link>
  );
}
