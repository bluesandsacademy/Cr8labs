/* Temporary comparison page for choosing the display font - not linked from
   anywhere, visit /font-lab directly. Delete once the decision is made.
   Candidates load straight from the CDNs here (fine for a throwaway lab page;
   the winner gets self-hosted properly like the others).

   Round 3: Titan One led round 2, so this is Titan One plus its three
   closest cousins in the rounded-poster-black family. */

const CANDIDATES: { name: string; family: string; note: string; weight: number }[] = [
  {
    name: "Titan One (round 2 leader)",
    family: "'Titan One', sans-serif",
    note: "The reference. Rounded poster black, single weight, friendly but loud.",
    weight: 400,
  },
  {
    name: "Paytone One",
    family: "'Paytone One', sans-serif",
    note: "Slightly narrower and more upright than Titan. A touch more grown-up, same warmth.",
    weight: 400,
  },
  {
    name: "Lilita One",
    family: "'Lilita One', sans-serif",
    note: "Bouncier, with a bit of storybook energy. The most playful of the three.",
    weight: 400,
  },
  {
    name: "Baloo 2",
    family: "'Baloo 2', sans-serif",
    note: "The practical pick: nearly the same rounded mass, but a full weight range instead of one - headings at every size could stay in-family.",
    weight: 800,
  },
];

export default function FontLab() {
  return (
    <div className="min-h-dvh bg-adire-dark px-8 py-16 md:px-16">
      {/* Single-page font load is the point here - this page IS the experiment. */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Titan+One&family=Paytone+One&family=Lilita+One&family=Baloo+2:wght@800&display=swap"
      />

      <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-adire-caption">
        Font lab · round 3: Titan One and three cousins · temporary, delete after deciding
      </p>

      <div className="mt-10 flex flex-col gap-16">
        {CANDIDATES.map((candidate) => (
          <section key={candidate.name}>
            <div className="mb-3 flex items-baseline gap-4">
              <h2 className="font-mono text-[13px] font-bold uppercase tracking-widest text-danfo">
                {candidate.name}
              </h2>
              <p className="font-sans text-[13px] text-adire-caption">{candidate.note}</p>
            </div>
            <p
              className="max-w-240 text-[44px] leading-[1.04] tracking-tight text-bone md:text-[66px]"
              style={{ fontFamily: candidate.family, fontWeight: candidate.weight }}
            >
              The future of learning lives <span className="text-danfo">beyond the page</span>
            </p>
            <p
              className="mt-6 text-[26px] text-bone/90"
              style={{ fontFamily: candidate.family, fontWeight: candidate.weight }}
            >
              One platform. Many worlds. · Where our work runs · Nothing here.
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
