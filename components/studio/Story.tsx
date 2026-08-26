/**
 * "Our story" as a manifesto: the deck's first sentence as the pull line,
 * the two paragraphs beneath, and the mark's ring fragment off the edge.
 */
export function Story() {
  return (
    <section className="relative overflow-hidden px-8 py-20 md:px-16 md:py-28">
      <div
        className="pointer-events-none absolute -left-64 top-1/2 h-150 w-150 -translate-y-1/2 rounded-full border-[26px] border-adire/6"
        aria-hidden="true"
      />
      <div className="relative">
        <p className="mb-5 font-mono text-[11px] font-semibold uppercase tracking-widest text-adire">Our story</p>
        <h2 className="max-w-220 font-display text-[34px] leading-[1.12] text-ink md:text-[52px] md:leading-[1.06]">
          CR8LAB started with a <span className="text-adire">supply problem</span>.
        </h2>
        <div className="ml-auto mt-10 flex max-w-170 flex-col gap-6 md:mt-14">
          <p className="font-sans text-[17px] leading-relaxed text-body md:text-[19px]">
            We were building augmented reality science content for African schools and there was
            nowhere to buy what we needed. The 3D libraries were built for other markets, with other
            faces, other streets and other light. The AR vendors quoted in dollars for experiences
            that would not open on the phones our audience owned. So we built the pipeline
            ourselves: writers, illustrators, 3D artists, animators, sound designers and engine
            developers, in one building, working to one standard.
          </p>
          <p className="font-sans text-[17px] leading-relaxed text-body md:text-[19px]">
            Once that pipeline existed, it turned out education was only the hardest use of it, not
            the only one. CR8LAB is that company. Blue Sands is the first platform built on it, and
            the proof that it works.
          </p>
        </div>
      </div>
    </section>
  );
}
