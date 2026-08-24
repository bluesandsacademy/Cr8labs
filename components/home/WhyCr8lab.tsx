const PILLARS: { lead: string; rest: string }[] = [
  {
    lead: "We build the technology, not the integration.",
    rest: "The 3D assets, the engine work, the content library and the platform are ours. That is why we can change them, price them in naira, and licence them out.",
  },
  {
    lead: "We design for the low end first.",
    rest: "If it runs well on a mid range Android over a weak connection with the power off, it runs beautifully everywhere else. Most competitors design in reverse and never arrive.",
  },
  {
    lead: "We ship products, not pilots.",
    rest: "A campaign lasts six weeks. A school term does not care about your roadmap.",
  },
];

export function WhyCr8lab() {
  return (
    <section className="px-8 py-20 md:px-16 md:py-28">
      <div className="mx-auto max-w-160">
        <h2 className="font-display text-[32px] font-semibold leading-tight text-ink md:text-[40px]">
          Built in Africa. Designed for African realities. Made for global use.
        </h2>
      </div>

      <div className="mx-auto mt-12 grid max-w-260 grid-cols-1 gap-10 md:grid-cols-3">
        {PILLARS.map((pillar) => (
          <div key={pillar.lead}>
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
