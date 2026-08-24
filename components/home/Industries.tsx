const ACCENTS = ["#F5A623", "#2C276C", "#B6502E"];

const TILES: string[] = [
  "Education",
  "Museums and culture",
  "Publishing",
  "Healthcare",
  "Manufacturing and industrial training",
  "Retail and brands",
  "Tourism",
  "Government",
  "Creative and cultural industries",
];

export function Industries() {
  return (
    <section className="border-t border-border-light px-8 py-16 md:px-16 md:py-20">
      <div className="grid grid-cols-1 gap-x-16 gap-y-4 lg:grid-cols-[1fr_1.2fr]">
        <h2 className="font-display text-[34px] font-semibold leading-[1.08] text-ink md:text-[46px]">
          Where our work runs
        </h2>
        <p className="self-center font-sans text-[17px] leading-relaxed text-body md:text-[19px]">
          We started in classrooms because that is the hardest room to hold. The same technology
          now runs in galleries, showrooms, training centres and campaigns.
        </p>
      </div>

      {/* Ring-outlined pills instead of a grid of bordered rectangles - the same
          circular language as everything else, and a flowing wrap instead of a
          rigid grid so it reads as one connected set, not a table of chips. */}
      <div className="mt-12 flex flex-wrap gap-3">
        {TILES.map((tile, i) => {
          const accent = ACCENTS[i % ACCENTS.length];
          return (
            <div
              key={tile}
              className="flex items-center gap-2.5 rounded-full border-[1.5px] bg-bone px-5 py-3 font-sans text-[14px] font-medium text-ink"
              style={{ borderColor: accent }}
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: accent }} />
              {tile}
            </div>
          );
        })}
      </div>
    </section>
  );
}
