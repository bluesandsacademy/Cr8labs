import { Button } from "@/components/ui/Button";

export function ClosingCta() {
  return (
    // No background or glow of its own: the page's fixed ink tone layer carries
    // the closing echo of the hero's ring-light, held still behind this copy.
    <section className="relative flex min-h-[80dvh] flex-col justify-center overflow-hidden px-8 py-24 text-center md:px-16 md:py-32">
      <div className="relative mx-auto max-w-160">
        <h2 className="font-display text-[32px] font-semibold leading-tight text-bone md:text-[44px]">
          The next generation will not learn the way the last one did
        </h2>
        <p className="mx-auto mt-5 max-w-135 font-sans text-[17px] leading-relaxed text-bone">
          Whether you run a school, a ministry, a museum, a publishing house or a fund, the
          conversation starts the same way. Tell us what you want people to be able to do.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
          <Button href="/contact" variant="primary">
            Book a demo
          </Button>
          <Button href="/contact?route=partner" variant="ghost" theme="dark">
            Partner with us
          </Button>
        </div>
      </div>
    </section>
  );
}
