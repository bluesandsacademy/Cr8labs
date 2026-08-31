import type { LucideIcon } from "lucide-react";
import { FileText, Box, Move, Mic, Smartphone } from "lucide-react";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";

const ACCENTS = ["#FFEB59", "#2C276C", "#B6502E", "#6E67B8", "#F5A623"];

const STEPS: { number: string; name: string; body: string; icon: LucideIcon }[] = [
  {
    number: "01",
    name: "Story and script",
    body: "Research, rights and narrative design, done with the institution or the community the story belongs to.",
    icon: FileText,
  },
  {
    number: "02",
    name: "3D worlds and characters",
    body: "Modelling, rigging, animation and environment production. Assets we own and reuse.",
    icon: Box,
  },
  {
    number: "03",
    name: "Spatial interaction",
    body: "Pick up, rotate, walk through, trigger, solve. The world responds to the person in it.",
    icon: Move,
  },
  {
    number: "04",
    name: "AI and voice",
    body: "Characters that answer, narrate and adapt to the user in real time.",
    icon: Mic,
  },
  {
    number: "05",
    name: "Distribution",
    body: "Phone, tablet, headset, web and full offline packages for low connectivity environments.",
    icon: Smartphone,
  },
];

/**
 * The solution: same copy and step data NumberedSteps rendered as a 5-up
 * grid, now paired with the CEO's second demo clip (product-demo-1.mp4 is
 * on Products; this is the other one) so the section shows the engine
 * running while it describes the five layers. Video sits sticky on the
 * left, the steps run as a single column on the right — a plain 5-across
 * grid doesn't fit next to it.
 */
export function SolutionSection() {
  return (
    <section
      className="relative section-y overflow-hidden"
      style={{ background: "linear-gradient(180deg, #ffffff 0%, #EAF6FF 100%)" }}
    >
      <div className="relative page-frame">
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <span className="inline-block font-mono text-xs font-bold uppercase tracking-[0.14em] text-adire/70 sm:text-sm">
            The solution
          </span>
          <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl">
            One immersive engine. Every project runs on it.
          </h2>
          <p className="mx-auto mt-4 max-w-md font-sans text-lg font-semibold text-body">
            Every experience we ship is built from the same five layers. We built them once and we
            reuse them across every industry we serve.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.8rem] bg-adire-dark shadow-[0_20px_48px_-16px_rgba(23,19,15,0.4)] sm:aspect-[16/10] lg:aspect-[4/5]">
              <BackgroundVideo
                src="/brand/ceo/product-demo-2.mp4"
                rate={0.5}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <ol className="flex flex-col gap-4">
            {STEPS.map((step, i) => {
              const accent = ACCENTS[i % ACCENTS.length];
              return (
                <li
                  key={step.number}
                  className="flex items-start gap-4 rounded-[1.6rem] border-4 bg-white p-5 shadow-[0_8px_0_rgba(23,19,15,0.08)] sm:p-6"
                  style={{ borderColor: accent }}
                >
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-md"
                    style={{ backgroundColor: accent }}
                    aria-hidden="true"
                  >
                    <step.icon
                      className="h-6 w-6"
                      style={{ color: accent === "#FFEB59" ? "#17130F" : "#F3ECDE" }}
                      strokeWidth={2.2}
                    />
                  </span>
                  <div>
                    <p className="font-mono text-xs font-bold text-muted">{step.number}</p>
                    <h3 className="mt-0.5 font-display text-base font-bold leading-tight text-ink">
                      {step.name}
                    </h3>
                    <p className="mt-1 font-sans text-sm font-semibold leading-snug text-body">
                      {step.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <p className="relative mx-auto mt-12 max-w-2xl text-center font-display text-2xl leading-snug text-ink lg:mt-16 lg:text-3xl">
          Same engine for a classroom, a museum, a broadcaster and a brand.
        </p>
      </div>
    </section>
  );
}
