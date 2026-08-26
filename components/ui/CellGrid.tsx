const LIGHT_ACCENTS = ["#F5A623", "#2C276C", "#B6502E"];
const DARK_ACCENTS = ["#F5A623", "#8F87CF", "#D97A50"];

export type Cell = { title: string; body: string; meta?: string };

/**
 * The contact-sheet grid used across the site: cells on a hairline grid,
 * each with the ring marker, a title in display type, the deck's paragraph,
 * and an optional mono line (a status, a date). No cards, no shadows; the
 * fixed world stays visible through every cell.
 */
export function CellGrid({
  items,
  tone = "light",
  columns = 3,
  heading,
  intro,
}: {
  items: Cell[];
  tone?: "light" | "dark";
  columns?: 2 | 3;
  heading?: string;
  intro?: string;
}) {
  const dark = tone === "dark";
  const accents = dark ? DARK_ACCENTS : LIGHT_ACCENTS;
  const line = dark ? "border-bone/12" : "border-border-light";
  const cols = columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <section className="px-8 py-16 md:px-16 md:py-24">
      {(heading || intro) && (
        <div className="mb-12 grid grid-cols-1 gap-x-16 gap-y-4 lg:grid-cols-[1fr_1.2fr]">
          {heading && (
            <h2 className={`font-display text-[34px] leading-[1.08] md:text-[46px] ${dark ? "text-bone" : "text-ink"}`}>
              {heading}
            </h2>
          )}
          {intro && (
            <p className={`self-center font-sans text-[17px] leading-relaxed md:text-[19px] ${dark ? "text-bone/75" : "text-body"}`}>
              {intro}
            </p>
          )}
        </div>
      )}
      <ul className={`grid grid-cols-1 border-l border-t ${line} ${cols}`}>
        {items.map((item, i) => {
          const accent = accents[i % accents.length];
          return (
            <li key={item.title} className={`group border-b border-r p-6 transition-colors duration-300 md:p-7 ${line} ${dark ? "hover:bg-bone/[0.04]" : "hover:bg-ink/[0.03]"}`}>
              <span
                className="relative mb-5 flex h-9 w-9 items-center justify-center rounded-full border-[1.5px]"
                style={{ borderColor: accent }}
                aria-hidden="true"
              >
                <span className="h-1.5 w-1.5 rounded-full transition-transform duration-300 group-hover:scale-[1.8]" style={{ backgroundColor: accent }} />
                <span
                  className="absolute -inset-2 rounded-full border border-dashed opacity-0 transition-opacity duration-300 group-hover:opacity-60 motion-safe:group-hover:animate-[orbit_14s_linear_infinite]"
                  style={{ borderColor: accent }}
                />
              </span>
              <h3 className={`font-display text-[20px] leading-tight ${dark ? "text-bone" : "text-ink"}`}>{item.title}</h3>
              <p className={`mt-3 font-sans text-[14px] leading-relaxed ${dark ? "text-bone/70" : "text-body"}`}>{item.body}</p>
              {item.meta && (
                <p className={`mt-4 font-mono text-[11px] leading-relaxed ${dark ? "text-adire-caption" : "text-muted"}`}>{item.meta}</p>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
