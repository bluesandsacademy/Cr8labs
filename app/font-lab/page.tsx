/* Temporary comparison page for choosing the display font - not linked from
   anywhere, visit /font-lab directly. Delete once the decision is made.
   Candidates load straight from Fontshare's CDN here (fine for a throwaway
   lab page; the winner gets self-hosted properly like the others). */

const CANDIDATES: { name: string; family: string; note: string; weight: number }[] = [
  {
    name: "Cabinet Grotesk",
    family: "'Cabinet Grotesk', sans-serif",
    note: "Warm, characterful grotesk. Bold without being stiff; the safest of the three.",
    weight: 800,
  },
  {
    name: "Chillax",
    family: "'Chillax', sans-serif",
    note: "Rounded and genuinely playful, still confident at scale. The most 'kids-content' friendly.",
    weight: 600,
  },
  {
    name: "Tanker",
    family: "'Tanker', sans-serif",
    note: "One heavy poster weight. Loudest and most memorable; General Sans would carry all smaller headings.",
    weight: 400,
  },
];

export default function FontLab() {
  return (
    <div className="min-h-dvh bg-adire-dark px-8 py-16 md:px-16">
      <link
        rel="stylesheet"
        href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800&f[]=chillax@600&f[]=tanker@400&display=swap"
      />

      <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-adire-caption">
        Font lab · temporary · delete after deciding
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
