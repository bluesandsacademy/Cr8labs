import { Button } from "@/components/ui/Button";

/** Ported from bluesandsk12's final-cta.jsx: a warm gradient band, centered copy, stacked buttons. */
export function ClosingCta() {
  return (
    <section
      className="relative section-y overflow-hidden text-center"
      style={{ background: "linear-gradient(180deg, #FFF6D6 0%, #FFE8A3 100%)" }}
    >
      <div className="relative page-frame">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl">
            Tell us what you want people to step into.
          </h2>
          <p className="mx-auto mt-5 max-w-lg font-sans text-lg font-semibold leading-relaxed text-body">
            Pilots, partnerships, licensing or investment. Start with a conversation about the material
            you already have.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/contact" variant="primary">
              Start a project
            </Button>
            <Button href="/contact?route=demo#form" variant="dark">
              Book a demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
