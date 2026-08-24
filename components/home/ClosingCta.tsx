import { Button } from "@/components/ui/Button";

export function ClosingCta() {
  return (
    <section className="relative overflow-hidden bg-ink px-8 py-24 text-center md:px-16 md:py-32">
      {/* A bookend for the hero's own glow - the site opened by diving into a
          ring of light, and closes with an echo of the same one. */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-160 w-160 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(245,166,35,0.16) 0%, rgba(245,166,35,0) 60%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-90 w-90 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-danfo/10"
        aria-hidden="true"
      />

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
