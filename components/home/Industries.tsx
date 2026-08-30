import { GraduationCap, Landmark, Briefcase, ShieldCheck } from "lucide-react";

const ACCENTS = ["#FFEB59", "#8F87CF", "#D97A50", "#F5A623"];

const SECTORS = [
  {
    name: "Education",
    line: "Schools, universities and ministries. Laboratories, field trips and practicals that no budget or building could otherwise deliver.",
    icon: GraduationCap,
  },
  {
    name: "Culture and publishing",
    line: "Museums, publishers, archives and tourism boards. Collections and titles that visitors can enter instead of observe.",
    icon: Landmark,
  },
  {
    name: "Brands and enterprise",
    line: "Agencies, retailers and consumer brands. Products, activations and stores that customers can hold, configure and walk through.",
    icon: Briefcase,
  },
  {
    name: "Training and simulation",
    line: "Employers, health services and technical operators. Repeatable practice on the tasks that carry real cost when they go wrong.",
    icon: ShieldCheck,
  },
];

/**
 * "Who we build for": the dark banner treatment bluesandsk12 uses for its
 * social-proof/stat band (benefits.jsx), reused here as the industries grid.
 */
export function Industries() {
  return (
    <section className="relative section-y overflow-hidden bg-adire-dark">
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-danfo/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-adire-light/25 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative page-frame">
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <span className="inline-block font-mono text-xs font-bold uppercase tracking-[0.14em] text-danfo sm:text-sm">
            Who we build for
          </span>
          <h2 className="mt-3 font-display text-3xl leading-tight text-bone sm:text-4xl lg:text-5xl">
            Built for anyone with something worth stepping into.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {SECTORS.map((sector, i) => {
            const accent = ACCENTS[i % ACCENTS.length];
            return (
              <div
                key={sector.name}
                className="rounded-[1.8rem] border-4 bg-adire-mid p-6 shadow-[0_8px_0_rgba(0,0,0,0.25)] transition-transform duration-200 hover:-translate-y-2 lg:p-7"
                style={{ borderColor: accent }}
              >
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-md"
                  style={{ backgroundColor: accent }}
                  aria-hidden="true"
                >
                  <sector.icon
                    className="h-7 w-7"
                    style={{ color: accent === "#FFEB59" ? "#17130F" : "#F3ECDE" }}
                    strokeWidth={2.2}
                  />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold leading-tight text-bone">
                  {sector.name}
                </h3>
                <p className="mt-2 font-sans text-sm font-semibold leading-relaxed text-bone/70">
                  {sector.line}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
