/**
 * The deck's team block is four bracketed placeholders, and it says so:
 * real names and credits go here, nothing else. Four honest cards, no faces.
 */
const TEAM: { name: string; role: string; line: string }[] = [
  { name: "[Name]", role: "[role]", line: "[One line on what they have shipped.]" },
  { name: "[Name]", role: "[role]", line: "[One line.]" },
  { name: "[Name]", role: "[role]", line: "[One line.]" },
  { name: "[Name]", role: "[role]", line: "[One line.]" },
];

const ACCENTS = ["#F5A623", "#2C276C", "#B6502E", "#8F87CF"];

export function Team() {
  return (
    <section className="px-8 py-16 md:px-16 md:py-24">
      <h2 className="font-display text-[30px] leading-[1.08] text-ink md:text-[40px]">Team</h2>
      <ul className="mt-10 grid grid-cols-1 border-l border-t border-border-light sm:grid-cols-2 lg:grid-cols-4">
        {TEAM.map((person, i) => (
          <li key={i} className="border-b border-r border-border-light p-6 md:p-7">
            <span
              className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-full border-2"
              style={{ borderColor: ACCENTS[i] }}
              aria-hidden="true"
            >
              <span className="absolute inset-2 rounded-full border opacity-40" style={{ borderColor: ACCENTS[i] }} />
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: ACCENTS[i] }} />
            </span>
            <h3 className="font-display text-[20px] leading-tight text-ink">{person.name}</h3>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-muted">{person.role}</p>
            <p className="mt-3 font-sans text-[14px] leading-relaxed text-body">{person.line}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
