import { Button } from "@/components/ui/Button";

/**
 * A page's last word on ink: one line from the copy deck and one action.
 * Deliberately quiet; the closing glow lives in the fixed world's ink layer.
 */
export function ClosingBeat({
  text,
  cta,
}: {
  text: string;
  cta: { label: string; href: string };
}) {
  return (
    <section className="px-8 py-24 text-center md:px-16 md:py-32">
      <p className="mx-auto max-w-160 break-words font-display text-[28px] leading-[1.15] text-bone md:text-[38px]">
        {text}
      </p>
      <div className="mt-9 flex justify-center">
        <Button href={cta.href} variant="primary">
          {cta.label}
        </Button>
      </div>
    </section>
  );
}
