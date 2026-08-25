const ACCENTS = ["#F5A623", "#8F87CF", "#D97A50"];

/**
 * Nine sectors, each with one line on what the platform does there. Lines
 * are drawn from the copy deck's Products and Solutions pages; nothing here
 * claims a customer or a number.
 */
const SECTORS: { name: string; line: string }[] = [
  {
    name: "Education",
    line: "Virtual laboratories and AR books that run offline on the devices schools already own.",
  },
  {
    name: "Museums and culture",
    line: "AR layers over existing exhibits, reconstructions of what is missing, and a version visitors carry home.",
  },
  {
    name: "Publishing",
    line: "A digital layer for the titles you already print, or new immersive titles co-published with the studio.",
  },
  {
    name: "Healthcare",
    line: "Places and procedures you can step inside and practise, built for headset and for browser.",
  },
  {
    name: "Manufacturing and industrial training",
    line: "Simulations of your actual procedures, and safety scenarios that can go wrong without consequence.",
  },
  {
    name: "Retail and brands",
    line: "Packaging and product AR at true scale, delivered from a QR code with nothing to download.",
  },
  {
    name: "Tourism",
    line: "Location based experiences for trails, campuses and events, in the visitor's own phone.",
  },
  {
    name: "Government",
    line: "State level deployment with device supply, teacher certification and reporting that stands up to an audit.",
  },
  {
    name: "Creative and cultural industries",
    line: "Original African assets from the library, and a production partner in the same time zone.",
  },
];

/**
 * A contact sheet on the indigo band: nine cells on a hairline grid, each
 * with the system's ring marker, the sector in display type, and one plain
 * line on what runs there. No cards, no shadows: the fixed world stays
 * visible through every cell. Hovering a cell wakes its marker (the centre
 * dot grows and a dashed orbit appears and turns), the same "in motion"
 * language the Labs section uses.
 */
export function Industries() {
  return (
    // A full-height scene, not a strip: the indigo world needs room to settle
    // before the next section starts pulling it back toward bone.
    <section className="relative flex min-h-[80dvh] flex-col justify-center overflow-hidden px-8 py-16 md:px-16 md:py-24">
      <div
        className="pointer-events-none absolute -right-40 -top-56 h-130 w-130 rounded-full border-[3px] border-adire-light/15"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 -top-40 h-90 w-90 rounded-full border border-dashed border-adire-light/20 motion-safe:animate-[orbit_140s_linear_infinite]"
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

      <ul className="relative mt-12 grid grid-cols-1 border-l border-t border-bone/12 sm:grid-cols-2 lg:grid-cols-3">
        {SECTORS.map((sector, i) => {
          const accent = ACCENTS[i % ACCENTS.length];
          return (
            <li
              key={sector.name}
              className="group relative border-b border-r border-bone/12 p-6 transition-colors duration-300 hover:bg-bone/[0.04] md:p-7"
            >
              <span
                className="relative mb-5 flex h-9 w-9 items-center justify-center rounded-full border-[1.5px]"
                style={{ borderColor: accent }}
                aria-hidden="true"
              >
                <span
                  className="h-1.5 w-1.5 rounded-full transition-transform duration-300 group-hover:scale-[1.8]"
                  style={{ backgroundColor: accent }}
                />
                <span
                  className="absolute -inset-2 rounded-full border border-dashed opacity-0 transition-opacity duration-300 group-hover:opacity-60 motion-safe:group-hover:animate-[orbit_14s_linear_infinite]"
                  style={{ borderColor: accent }}
                />
              </span>
              <h3 className="font-display text-[19px] leading-tight text-bone">{sector.name}</h3>
              <p className="mt-2 font-sans text-[13.5px] leading-relaxed text-bone/60 transition-colors duration-300 group-hover:text-bone/85">
                {sector.line}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
