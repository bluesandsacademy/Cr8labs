import { Button } from "@/components/ui/Button";

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
    <section className="relative overflow-hidden px-8 py-20 md:px-16 md:py-28">
      {/* A fragment of the mark's own ring, bleeding off the frame - the same
          device as the hero's watermark, at section scale, so the motif shows up
          as structure even where there's no icon or divider to carry it. */}
      <div
        className="pointer-events-none absolute -right-40 top-1/2 h-100 w-100 -translate-y-1/2 rounded-full border-9 border-adire/5"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-160">
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
        <h2 className="font-display text-[32px] font-semibold leading-tight text-ink md:text-[40px]">
          {heading}
        </h2>
        <p className="mt-5 max-w-140 font-sans text-[17px] leading-relaxed text-body">{body}</p>
        {cta && (
          <div className="mt-8">
            <Button href={cta.href} variant="dark">
              {cta.label}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
