import { Smartphone, Glasses } from "lucide-react";

const WAYS = [
  {
    name: "Augmented reality",
    body: "The story appears in your room, on your desk, on the page in front of you. Runs on the phone or tablet the audience already owns. Lowest barrier, widest reach.",
    accent: "#FFEB59",
    icon: Smartphone,
  },
  {
    name: "Virtual reality",
    body: "You are placed inside the world. Full presence, full attention, nothing else in view. Highest impact, best for training, exhibitions and flagship experiences.",
    accent: "#2C276C",
    icon: Glasses,
  },
];

/** "Two ways in", ported from bluesandsk12's benefits.jsx card language. */
export function ArVrSection() {
  return (
    <section className="relative section-y overflow-hidden" style={{ background: "#F6F8FB" }}>
      <div className="relative page-frame">
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <span className="inline-block font-mono text-xs font-bold uppercase tracking-[0.14em] text-adire/70 sm:text-sm">
            Two ways in
          </span>
          <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl">
            AR brings the story to you. VR takes you to the story.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          {WAYS.map((way) => (
            <div
              key={way.name}
              className="rounded-[1.8rem] border-4 bg-white p-7 shadow-[0_8px_0_rgba(23,19,15,0.08)] transition-transform duration-200 hover:-translate-y-2 lg:p-8"
              style={{ borderColor: way.accent }}
            >
              <span
                className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-md"
                style={{ backgroundColor: way.accent }}
                aria-hidden="true"
              >
                <way.icon
                  className="h-7 w-7"
                  style={{ color: way.accent === "#FFEB59" ? "#17130F" : "#F3ECDE" }}
                  strokeWidth={2.2}
                />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold leading-snug text-ink">{way.name}</h3>
              <p className="mt-3 font-sans text-base font-semibold leading-relaxed text-body">{way.body}</p>
            </div>
          ))}
        </div>

        <p className="relative mt-12 max-w-2xl font-display text-2xl leading-snug text-ink lg:mt-16 lg:text-3xl">
          One production pipeline feeds both. We choose the format the audience and the budget can carry,
          not the one that sounds most impressive.
        </p>
      </div>
    </section>
  );
}
