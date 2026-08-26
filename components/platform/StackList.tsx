import { LAYERS } from "./StackRings";

const ACCENTS = ["#F5A623", "#B6502E", "#2C276C", "#F5A623", "#B6502E", "#2C276C", "#F5A623"];

const COPY: Record<(typeof LAYERS)[number], string> = {
  "Physical books":
    "The entry point, and the reason this works in places other platforms cannot reach. A printed title needs no charge, no signal and no account. It is also the most trusted object in a classroom. Every page is designed as a trigger, so the digital layer is invited rather than imposed.",
  "Mobile app":
    "The scanner, the player and the offline store. Content packs download once and run without a connection. The app is built for entry level Android first, with an install size and memory budget set by the cheapest device our schools actually use.",
  "Cloud platform":
    "Accounts, classes, licensing, content delivery and sync. Schools, teachers, students, parents and administrators each get their own view and their own permissions. Content updates ship centrally without anyone reinstalling anything.",
  "AI engine":
    "Adaptive sequencing, explanation on demand, and question generation mapped to the curriculum rather than to a general model's guesswork. The teacher sees what the AI told a student, and can correct it. No automated decision sets a child's placement or grade.",
  "Learning analytics":
    "Time on task, attempts, misconceptions, class-level gaps and term-level progress. Written to be read in five minutes by someone teaching four classes, not by a data analyst.",
  "Creator Studio":
    "The authoring layer. Teachers assemble lessons from the asset library, add their own media, set assessments and publish to their class. Advanced users build new interactions without writing code.",
  "Immersive experiences":
    "The output. AR scenes, VR environments, virtual laboratories, interactive stories and classroom displays, all drawing on the same asset library so nothing is built twice.",
};

/**
 * The stack as a spec sheet: seven rows on hairlines, each the layer's ring
 * marker and name against the deck's paragraph. The order is the order the
 * deck gives (and the rings draw), outside in.
 */
export function StackList() {
  return (
    <section className="px-8 py-16 md:px-16 md:py-24">
      <h2 className="max-w-160 font-display text-[34px] leading-[1.08] text-ink md:text-[46px]">
        Seven layers, one experience
      </h2>
      <ol className="mt-12 border-t border-border-light">
        {LAYERS.map((layer, i) => (
          <li
            key={layer}
            className="grid grid-cols-1 gap-x-16 gap-y-3 border-b border-border-light py-8 lg:grid-cols-[1fr_1.6fr]"
          >
            <div className="flex items-start gap-4">
              <span
                className="relative mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-[1.5px]"
                style={{ borderColor: ACCENTS[i] }}
                aria-hidden="true"
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ACCENTS[i] }} />
              </span>
              <h3 className="font-display text-[22px] leading-tight text-ink md:text-[26px]">{layer}</h3>
            </div>
            <p className="font-sans text-[16px] leading-relaxed text-body md:text-[17px]">{COPY[layer]}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
