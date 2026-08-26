export type Sector = { slug: string; name: string; problem: string; solution: string; impact: string };

const TONE = {
  light: { name: "text-ink", label: "text-adire", body: "text-body", line: "border-border-light" },
  adire: { name: "text-bone", label: "text-danfo", body: "text-bone/80", line: "border-bone/12" },
  ink: { name: "text-bone", label: "text-danfo", body: "text-bone/80", line: "border-bone/12" },
} as const;

/**
 * One sector, in the deck's own order: the problem first, then the
 * solution, then the impact, side by side so a buyer can find their own row
 * and read across. The deck insists on this order; it is the point.
 */
export function SectorRow({ sector, tone }: { sector: Sector; tone: keyof typeof TONE }) {
  const t = TONE[tone];
  return (
    <section id={sector.slug} className={`scroll-mt-24 border-t px-8 py-16 md:px-16 md:py-20 ${t.line}`}>
      <h2 className={`font-display text-[32px] leading-[1.06] md:text-[44px] ${t.name}`}>{sector.name}</h2>
      <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-3">
        {(["problem", "solution", "impact"] as const).map((key) => (
          <div key={key}>
            <p className={`mb-3 font-mono text-[11px] font-semibold uppercase tracking-widest ${t.label}`}>{key}</p>
            <p className={`font-sans text-[15px] leading-relaxed md:text-[16px] ${t.body}`}>{sector[key]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
