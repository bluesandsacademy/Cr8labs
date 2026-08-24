/* Temporary comparison page for choosing the display font - not linked from
   anywhere, visit /font-lab directly. Delete once the decision is made.
   Candidates load straight from the CDNs here (fine for a throwaway lab page;
   the winner gets self-hosted properly like the others).

   Round 2: Tanker led round 1, so this is Tanker plus five in the same
   heavy/poster/playful family. */

const CANDIDATES: { name: string; family: string; note: string; weight: number }[] = [
  {
    name: "Tanker (round 1 leader)",
    family: "'Tanker', sans-serif",
    note: "The reference. One heavy poster weight, loud and inky.",
    weight: 400,
  },
  {
    name: "Chubbo",
    family: "'Chubbo', sans-serif",
    note: "Rounder and friendlier than Tanker, same chunky mass. The most playful of the set.",
    weight: 700,
  },
  {
    name: "Panchang",
    family: "'Panchang', sans-serif",
    note: "Blockier and more squared-off. Heavy tech-poster energy, least playful, most engineered.",
    weight: 800,
  },
  {
    name: "Sharpie",
    family: "'Sharpie', sans-serif",
    note: "Marker-drawn feel. Loud with a hand-made streak; the biggest personality swing.",
    weight: 700,
  },
  {
    name: "Shrikhand",
    family: "'Shrikhand', serif",
    note: "Fat, bouncy, high-energy with a subtle swash character. Distinctive and joyful.",
    weight: 400,
  },
  {
    name: "Titan One",
    family: "'Titan One', sans-serif",
    note: "Rounded poster black. Sits between Tanker's loudness and Chubbo's friendliness.",
    weight: 400,
  },
];

export default function FontLab() {
  return (
    <div className="min-h-dvh bg-adire-dark px-8 py-16 md:px-16">
      <link
        rel="stylesheet"
        href="https://api.fontshare.com/v2/css?f[]=tanker@400&f[]=chubbo@700&f[]=panchang@800&f[]=sharpie@700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Shrikhand&family=Titan+One&display=swap"
      />

      <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-adire-caption">
        Font lab · round 2: Tanker and five cousins · temporary, delete after deciding
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
