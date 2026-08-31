import type { LucideIcon } from "lucide-react";
import { FileText, Box, Move, Mic, Smartphone } from "lucide-react";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";

// No lemon here: a thin icon stroke in #FFEB59 on this section's white/pale
// background is the same near-invisible contrast failure the site's other
// lemon-on-light bugs were. Five accents, none of them lemon.
const ACCENTS = ["#2C276C", "#B6502E", "#6E67B8", "#8F87CF", "#F5A623"];

const STEPS: { name: string; body: string; icon: LucideIcon }[] = [
  {
    name: "Story and script",
    body: "Research, rights and narrative design, done with the institution or the community the story belongs to.",
    icon: FileText,
  },
  {
    name: "3D worlds and characters",
    body: "Modelling, rigging, animation and environment production. Assets we own and reuse.",
    icon: Box,
  },
  {
    name: "Spatial interaction",
    body: "Pick up, rotate, walk through, trigger, solve. The world responds to the person in it.",
    icon: Move,
  },
  {
    name: "AI and voice",
    body: "Characters that answer, narrate and adapt to the user in real time.",
    icon: Mic,
  },
  {
    name: "Distribution",
    body: "Phone, tablet, headset, web and full offline packages for low connectivity environments.",
    icon: Smartphone,
  },
];

/**
 * The solution: same copy and step data NumberedSteps used to render as a
 * bordered-box, icon-square, numbered 5-up grid — replaced here, since a
 * grid like that doesn't fit next to a video anyway, and the bordered-box
 * card plus numeral is exactly the pattern the rest of the site is moving
 * away from. Video sticky on the left (the CEO's second demo clip;
 * product-demo-1.mp4 is on Products); on the right, a plain divided list —
 * a coloured icon glyph, bold name, body — no numerals, no boxes.
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

          <ol className="flex flex-col divide-y divide-border border-t border-border">
            {STEPS.map((step, i) => {
              const accent = ACCENTS[i % ACCENTS.length];
              return (
                <li key={step.name} className="flex items-start gap-4 py-6 sm:py-7">
                  <step.icon
                    className="mt-1 h-6 w-6 shrink-0"
                    style={{ color: accent }}
                    strokeWidth={2.2}
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-lg font-bold leading-tight text-ink">
                      {step.name}
                    </h3>
                    <p className="mt-1.5 font-sans text-sm font-semibold leading-relaxed text-body">
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
