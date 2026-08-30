import { MapPin, Layers, Cpu, WifiOff } from "lucide-react";

const PILLARS = [
  { lead: "African market insight", rest: "We build for the classrooms, budgets, devices and networks that actually exist here, not the ones in the brief.", accent: "#FFEB59", icon: MapPin },
  { lead: "Content and IP we already own", rest: "A working library of 3D assets, characters and simulations that we reuse instead of rebuilding.", accent: "#2C276C", icon: Layers },
  { lead: "AI and XR capability in-house", rest: "Story, 3D, engineering and AI under one roof. Nothing brokered out, nothing waiting on a vendor.", accent: "#B6502E", icon: Cpu },
  { lead: "Offline craft", rest: "Full immersive experiences that run with no network at all. Most studios cannot ship this.", accent: "#6E67B8", icon: WifiOff },
];

export function WhyCr8lab() {
  return (
    <section className="relative section-y overflow-hidden" style={{ background: "#FFFBF0" }}>
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-laterite/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative page-frame">
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <span className="inline-block font-mono text-xs font-bold uppercase tracking-[0.14em] text-adire/70 sm:text-sm">
            Our advantage
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl lg:text-5xl">
            Creative capability and technology infrastructure in the same company.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.lead}
              className="rounded-[1.8rem] border-4 bg-white p-6 shadow-[0_8px_0_rgba(23,19,15,0.08)] transition-transform duration-200 hover:-translate-y-2"
              style={{ borderColor: pillar.accent }}
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-2xl shadow-md"
                style={{ backgroundColor: pillar.accent }}
                aria-hidden="true"
              >
                <pillar.icon
                  className="h-6 w-6"
                  style={{ color: pillar.accent === "#FFEB59" ? "#17130F" : "#F3ECDE" }}
                  strokeWidth={2.2}
                />
              </span>
              <h3 className="mt-4 font-display text-base font-bold leading-snug text-ink">{pillar.lead}</h3>
              <p className="mt-2.5 font-sans text-sm font-semibold leading-relaxed text-body">
                {pillar.rest}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
