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
      className={`inline-block rounded-[3px] px-6.5 py-3.75 font-sans text-[15px] font-semibold transition-all duration-150 ease-out ${VARIANT_CLASSES[variant]} ${FOCUS_RING_CLASSES[theme]}`}
    >
      {children}
    </Link>
  );
}
