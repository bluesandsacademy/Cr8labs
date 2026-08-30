import type { LucideIcon } from "lucide-react";

const ACCENTS = ["#FFEB59", "#2C276C", "#B6502E", "#6E67B8", "#F5A623"];

/**
 * Ported from bluesandsk12's metrics.jsx: a centered eyebrow/heading over a
 * row of equal cards, each an icon square on a coloured border with a flat
 * offset shadow. The metric's number swaps for a step number here.
 */
export function NumberedSteps({
  eyebrow,
  heading,
  intro,
  steps,
  closing,
  background = "linear-gradient(180deg, #ffffff 0%, #EAF6FF 100%)",
}: {
  eyebrow: string;
  heading: string;
  intro?: string;
  steps: { number: string; name: string; body: string; icon: LucideIcon }[];
  closing?: string;
  background?: string;
}) {
  return (
    <section className="relative section-y overflow-hidden" style={{ background }}>
      <div className="relative page-frame">
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <span className="inline-block font-mono text-xs font-bold uppercase tracking-[0.14em] text-adire/70 sm:text-sm">
            {eyebrow}
          </span>
          <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl">
            {heading}
          </h2>
          {intro && (
            <p className="mx-auto mt-4 max-w-md font-sans text-lg font-semibold text-body">{intro}</p>
          )}
        </div>

        <ol className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-5">
          {steps.map((step, i) => {
            const accent = ACCENTS[i % ACCENTS.length];
            return (
              <li
                key={step.number}
                className={`flex flex-col items-center gap-3 rounded-[1.6rem] border-4 bg-white p-6 text-center shadow-[0_8px_0_rgba(23,19,15,0.08)] transition-transform duration-200 hover:-translate-y-1.5 lg:p-7 ${
                  i === steps.length - 1 ? "col-span-2 lg:col-span-1" : ""
                }`}
                style={{ borderColor: accent }}
              >
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-md"
                  style={{ backgroundColor: accent }}
                  aria-hidden="true"
                >
                  <step.icon
                    className="h-7 w-7"
                    style={{ color: accent === "#FFEB59" ? "#17130F" : "#F3ECDE" }}
                    strokeWidth={2.2}
                  />
                </span>
                <p className="font-mono text-xs font-bold text-muted">{step.number}</p>
                <h3 className="font-display text-base font-bold leading-tight text-ink">{step.name}</h3>
                <p className="font-sans text-sm font-semibold leading-snug text-body">{step.body}</p>
              </li>
            );
          })}
        </ol>

        {closing && (
          <p className="relative mx-auto mt-12 max-w-2xl text-center font-display text-2xl leading-snug text-ink lg:mt-16 lg:text-3xl">
            {closing}
          </p>
        )}
      </div>
    </section>
  );
}
