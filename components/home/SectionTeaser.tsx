import { Button } from "@/components/ui/Button";

/**
 * Editorial two-column section: the eyebrow/heading column pins (CSS sticky)
 * while the body copy scrolls past it, so each section holds its ground for a
 * beat instead of sliding by - the same "anchored while content arrives"
 * feeling as the hero, by layout rather than scroll-jacking. Full-width, no
 * centered dead margins.
 */
export function SectionTeaser({
  eyebrow,
  heading,
  body,
  cta,
}: {
  eyebrow?: string;
  heading: string;
  body: string;
  cta?: { label: string; href: string };
}) {
  return (
    <section className="relative overflow-hidden border-t border-border-light px-8 py-16 md:px-16 md:py-20">
      {/* A fragment of the mark's own ring, bleeding off the frame - the same
          device as the hero's watermark, at section scale. */}
      <div
        className="pointer-events-none absolute -right-40 top-1/2 h-100 w-100 -translate-y-1/2 rounded-full border-9 border-adire/5"
        aria-hidden="true"
      />

      <div className="relative grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="self-start lg:sticky lg:top-28">
          {eyebrow && (
            <div className="mb-4 flex items-center gap-2.5">
              <span className="relative flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border-[1.5px] border-adire">
                <span className="h-1 w-1 rounded-full bg-adire" />
              </span>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-adire">
                {eyebrow}
              </p>
            </div>
          )}
          <h2 className="font-display text-[34px] font-semibold leading-[1.08] text-ink md:text-[46px]">
            {heading}
          </h2>
        </div>

        <div className="flex flex-col justify-center">
          <p className="font-sans text-[17px] leading-relaxed text-body md:text-[19px]">{body}</p>
          {cta && (
            <div className="mt-8">
              <Button href={cta.href} variant="dark">
                {cta.label}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
