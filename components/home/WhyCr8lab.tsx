const PILLARS: { lead: string; rest: string; accent: string }[] = [
  {
    lead: "We build the technology, not the integration.",
    rest: "The 3D assets, the engine work, the content library and the platform are ours. That is why we can change them, price them in naira, and licence them out.",
    accent: "#F5A623",
  },
  {
    lead: "We design for the low end first.",
    rest: "If it runs well on a mid range Android over a weak connection with the power off, it runs beautifully everywhere else. Most competitors design in reverse and never arrive.",
    accent: "#2C276C",
  },
  {
    lead: "We ship products, not pilots.",
    rest: "A campaign lasts six weeks. A school term does not care about your roadmap.",
    accent: "#B6502E",
  },
];

export function WhyCr8lab() {
  return (
    <section className="relative overflow-hidden border-t border-border-light px-8 py-16 md:px-16 md:py-20">
      <div
        className="pointer-events-none absolute -bottom-48 -right-24 h-120 w-120 rounded-full border-9 border-laterite/5"
        aria-hidden="true"
      />

      <div className="relative max-w-200">
        <h2 className="font-display text-[34px] font-semibold leading-[1.08] text-ink md:text-[46px]">
          Built in Africa. Designed for African realities. Made for global use.
        </h2>
      </div>

      <div className="relative mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
        {PILLARS.map((pillar) => (
          <div key={pillar.lead}>
            {/* Not a 01/02/03 marker - these three don't run in any order that
                matters, so numbering them would claim a sequence that isn't
                there. A ring-dot rule instead, same device as every eyebrow. */}
            <div className="mb-4 flex items-center gap-2.5">
              <span
                className="relative flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border-[1.5px]"
                style={{ borderColor: pillar.accent }}
              >
                <span className="h-1 w-1 rounded-full" style={{ backgroundColor: pillar.accent }} />
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <h3 className="font-display text-[19px] font-semibold leading-snug text-ink">
              {pillar.lead}
            </h3>
            <p className="mt-3 font-sans text-[15px] leading-relaxed text-body">{pillar.rest}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
