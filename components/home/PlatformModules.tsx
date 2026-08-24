import { Button } from "@/components/ui/Button";

const ACCENTS = ["#F5A623", "#2C276C", "#B6502E", "#8F87CF"];

const MODULES: { name: string; description: string }[] = [
  {
    name: "Interactive Books",
    description: "Printed titles with a full digital layer that lifts off the page when scanned.",
  },
  {
    name: "AR Experiences",
    description:
      "Scan a page, a poster, a product or a room, and watch the subject assemble itself in front of you.",
  },
  {
    name: "VR Learning",
    description: "Places you can enter and move through, for headset and for browser.",
  },
  {
    name: "Virtual Science Labs",
    description:
      "Practical experiments a student can run alone or as a class, with no equipment and no risk.",
  },
  {
    name: "AI Learning Companion",
    description:
      "A tutor that follows the curriculum, adapts to a learner's pace, and reports to the teacher rather than around her.",
  },
  {
    name: "Teacher Studio",
    description: "Where a teacher builds an immersive lesson without writing code.",
  },
  {
    name: "Creator Platform",
    description:
      "Where a student builds their own experience, which is where the ambition stops being ours and becomes theirs.",
  },
  {
    name: "Analytics",
    description: "What was understood, what was not, and what to do about it before the term ends.",
  },
];

export function PlatformModules() {
  return (
    <section className="relative overflow-hidden px-8 py-20 md:px-16 md:py-28">
      <div
        className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full border-28 border-danfo/6"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-160">
        <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-widest text-adire">
          The platform
        </p>
        <h2 className="font-display text-[32px] font-semibold leading-tight text-ink md:text-[40px]">
          One platform. Many worlds.
        </h2>
        <p className="mt-5 max-w-140 font-sans text-[17px] leading-relaxed text-body">
          A printed page, a phone, a headset, a classroom display and a cloud that remembers what
          each learner did. Eight parts, built to work together and built to work alone.
        </p>
      </div>

      <div className="relative mx-auto mt-14 grid max-w-260 grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {MODULES.map((module, i) => {
          const accent = ACCENTS[i % ACCENTS.length];
          return (
            <div key={module.name}>
              {/* A ring-badge monogram, not a generic bullet or stock icon - each
                  module's mark is just its own initial, framed the same way every
                  icon in this system is framed. */}
              <div
                className="relative flex h-13 w-13 items-center justify-center rounded-full border-2"
                style={{ borderColor: accent }}
              >
                <div
                  className="absolute inset-2 rounded-full border opacity-40"
                  style={{ borderColor: accent }}
                />
                <span className="font-display text-[19px] font-bold" style={{ color: accent }}>
                  {module.name[0]}
                </span>
              </div>
              <h3 className="mt-4 font-display text-[17px] font-semibold text-ink">
                {module.name}
              </h3>
              <p className="mt-1.5 font-sans text-[14px] leading-relaxed text-body">
                {module.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="relative mx-auto mt-14 max-w-160">
        <Button href="/platform" variant="dark">
          See how the platform fits together
        </Button>
      </div>
    </section>
  );
}
