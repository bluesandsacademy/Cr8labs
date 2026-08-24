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
    <section className="px-8 py-20 md:px-16 md:py-28">
      <div className="mx-auto max-w-160">
        <h2 className="font-display text-[32px] font-semibold leading-tight text-ink md:text-[40px]">
          Where our work runs
        </h2>
        <p className="mt-5 max-w-140 font-sans text-[17px] leading-relaxed text-body">
          We started in classrooms because that is the hardest room to hold. The same technology
          now runs in galleries, showrooms, training centres and campaigns.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-260 grid-cols-2 gap-3 sm:grid-cols-3">
        {TILES.map((tile) => (
          <div
            key={tile}
            className="rounded-[3px] border border-border bg-bone px-5 py-4 font-sans text-[14px] font-medium text-ink"
          >
            {tile}
          </div>
        ))}
      </div>
    </section>
  );
}
