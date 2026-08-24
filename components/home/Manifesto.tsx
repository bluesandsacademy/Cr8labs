/**
 * The belief statement gets a manifesto treatment: one oversized display
 * sentence with the operative phrase in adire, body copy hanging off it, and a
 * giant open-ring fragment bleeding off the left edge (the mark's "C" at
 * architectural scale). No card, no columns-of-equal-weight: a statement.
 */
export function Manifesto() {
  return (
    <section className="relative overflow-hidden border-t border-border-light px-8 py-20 md:px-16 md:py-32">
      <div
        className="pointer-events-none absolute -left-64 top-1/2 h-150 w-150 -translate-y-1/2 rounded-full border-[26px] border-adire/6"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-64 top-1/2 h-150 w-150 -translate-y-1/2 scale-75 rounded-full border-[3px] border-adire/10"
        aria-hidden="true"
      />

      <div className="relative">
        <p className="max-w-270 font-display text-[34px] leading-[1.14] text-ink md:text-[54px] md:leading-[1.08]">
          Learning should never be limited to <span className="text-adire">words on a page</span>
        </p>
        <p className="ml-auto mt-10 max-w-170 font-sans text-[17px] leading-relaxed text-body md:mt-14 md:text-[19px]">
          Every child deserves to see an idea move. To run an experiment without a laboratory that
          costs more than the school. To stand inside a place they will never fly to, and a century
          they will never live in. To finish the lesson believing they could build something
          themselves. That belief is the whole reason CR8LAB exists, and it is the test every
          product here has to pass.
        </p>
      </div>
    </section>
  );
}
