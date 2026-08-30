import { Button } from "@/components/ui/Button";

/**
 * A centered page-intro hero: eyebrow, H1, subhead, one or two CTAs, on a
 * gradient wash. Every inner page below Home uses this now instead of
 * CR8LAB's old ring-portal PageHero.
 */
export function SimpleHero({
  eyebrow,
  title,
  lede,
  primaryCta,
  secondaryCta,
  background = "linear-gradient(180deg, #F6F8FB 0%, #FFFFFF 100%)",
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  background?: string;
}) {
  return (
    <section className="relative section-y overflow-hidden text-center" style={{ background }}>
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-danfo/20 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative page-frame">
        <div className="mx-auto max-w-3xl">
          {eyebrow && (
            <span className="inline-block font-mono text-xs font-bold uppercase tracking-[0.14em] text-adire/70 sm:text-sm">
              {eyebrow}
            </span>
          )}
          <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {lede && (
            <p className="mx-auto mt-5 max-w-2xl font-sans text-lg font-semibold leading-relaxed text-body">
              {lede}
            </p>
          )}
          {(primaryCta || secondaryCta) && (
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              {primaryCta && (
                <Button href={primaryCta.href} variant="primary">
                  {primaryCta.label}
                </Button>
              )}
              {secondaryCta && (
                <Button href={secondaryCta.href} variant="dark">
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
