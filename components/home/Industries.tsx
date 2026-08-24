const ACCENTS = ["#F5A623", "#8F87CF", "#D97A50"];

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

/**
 * A full-bleed adire band: the page's first return to the hero's dark world
 * since leaving it, which breaks the run of bone sections and gives the pills
 * real contrast. Ring-outlined pills in accent tints (the on-dark variants of
 * the palette), flowing wrap rather than a grid of rectangles.
 */
export function Industries() {
  return (
    <section className="relative overflow-hidden bg-adire-dark px-8 py-16 md:px-16 md:py-24">
      <div
        className="pointer-events-none absolute -right-40 -top-56 h-130 w-130 rounded-full border-[3px] border-adire-light/15"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 -top-40 h-90 w-90 rounded-full border border-dashed border-adire-light/20"
        aria-hidden="true"
      />

      <div className="relative grid grid-cols-1 gap-x-16 gap-y-4 lg:grid-cols-[1fr_1.2fr]">
        <h2 className="font-display text-[34px] leading-[1.08] text-bone md:text-[46px]">
          Where our work runs
        </h2>
        <p className="self-center font-sans text-[17px] leading-relaxed text-bone/75 md:text-[19px]">
          We started in classrooms because that is the hardest room to hold. The same technology
          now runs in galleries, showrooms, training centres and campaigns.
        </p>
      </div>

      <div className="relative mt-12 flex flex-wrap gap-3">
        {TILES.map((tile, i) => {
          const accent = ACCENTS[i % ACCENTS.length];
          return (
            <div
              key={tile}
              className="flex items-center gap-2.5 rounded-full border-[1.5px] px-5 py-3 font-sans text-[14px] font-medium text-bone"
              style={{ borderColor: accent }}
            >
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: accent }}
              />
              {tile}
            </div>
          );
        })}
      </div>
    </section>
  );
}
