const LIGHT_ACCENTS = ["#F5A623", "#2C276C", "#B6502E"];
const DARK_ACCENTS = ["#F5A623", "#8F87CF", "#D97A50"];

/**
 * The system's list: each item carries the ring-dot marker in a cycling
 * accent instead of a browser bullet. `tone` picks the accent set and text
 * colours for the background the list sits on.
 */
export function RingList({ items, tone = "light" }: { items: string[]; tone?: "light" | "dark" }) {
  const accents = tone === "dark" ? DARK_ACCENTS : LIGHT_ACCENTS;
  const text = tone === "dark" ? "text-bone/85" : "text-body";
  return (
    <ul className="flex flex-col gap-4">
      {items.map((item, i) => {
        const accent = accents[i % accents.length];
        return (
          <li key={item} className="flex gap-4">
            <span
              className="relative mt-[5px] flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border-[1.5px]"
              style={{ borderColor: accent }}
              aria-hidden="true"
            >
              <span className="h-1 w-1 rounded-full" style={{ backgroundColor: accent }} />
            </span>
            <span className={`font-sans text-[16px] leading-relaxed md:text-[17px] ${text}`}>{item}</span>
          </li>
        );
      })}
    </ul>
  );
}
