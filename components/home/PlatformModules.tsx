"use client";

import { useState } from "react";
import Image from "next/image";
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

/** Eight points on the dial's circumference, one per module, 45 degrees apart. */
const DIAL_DOTS: { left: string; top: string; size: number }[] = [
  { left: "50%", top: "3.2%", size: 12 },
  { left: "83.1%", top: "16.9%", size: 9 },
  { left: "96.8%", top: "50%", size: 14 },
  { left: "83.1%", top: "83.1%", size: 9 },
  { left: "50%", top: "96.8%", size: 12 },
  { left: "16.9%", top: "83.1%", size: 9 },
  { left: "3.2%", top: "50%", size: 14 },
  { left: "16.9%", top: "16.9%", size: 9 },
];

/**
 * "One platform. Many worlds." rendered literally: a dial built from the
 * mark's own ring geometry, eight points on its circumference (one per
 * module, sized like a small planetary system) around a central lens that
 * holds the platform-in-use image. The points orbit slowly, the dashed inner
 * ring turns the other way, and hovering a module in the list lights its
 * point on the dial. All motion is gated behind motion-safe.
 */
export function PlatformModules() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden border-t border-border-light px-8 py-16 md:px-16 md:py-24">
      <div className="grid grid-cols-1 gap-x-16 gap-y-4 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-widest text-adire">
            The platform
          </p>
          <h2 className="font-display text-[34px] leading-[1.08] text-ink md:text-[46px]">
            One platform. Many worlds.
          </h2>
        </div>
        <p className="self-center font-sans text-[17px] leading-relaxed text-body md:text-[19px]">
          A printed page, a phone, a headset, a classroom display and a cloud that remembers what
          each learner did. Eight parts, built to work together and built to work alone.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 items-center gap-x-16 gap-y-12 lg:grid-cols-[0.85fr_1.15fr]">
        {/* The dial. Hidden on small screens where the module list carries alone. */}
        <div className="relative mx-auto hidden aspect-square w-full max-w-130 lg:block">
          <div className="absolute inset-0 rounded-full border border-border" aria-hidden="true" />
          <div
            className="absolute inset-11 rounded-full border border-dashed border-border motion-safe:animate-[orbit-reverse_70s_linear_infinite]"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 motion-safe:animate-[orbit_90s_linear_infinite]"
            aria-hidden="true"
          >
            {DIAL_DOTS.map((dot, i) => {
              const accent = ACCENTS[i % ACCENTS.length];
              const lit = hovered === i;
              return (
                <span
                  key={i}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-[box-shadow,scale] duration-300"
                  style={{
                    left: dot.left,
                    top: dot.top,
                    width: dot.size,
                    height: dot.size,
                    backgroundColor: accent,
                    scale: lit ? 1.9 : 1,
                    boxShadow: lit ? `0 0 0 6px ${accent}33, 0 0 22px ${accent}` : "none",
                  }}
                />
              );
            })}
          </div>
          <div className="absolute inset-[26%] rounded-full border-2 border-adire p-2.5">
            <div className="relative h-full w-full overflow-hidden rounded-full">
              <Image
                src="/brand/platform-scan.png"
                alt="Hands holding a phone over an open picture book while a small 3D forest scene with a tree, a fox and a deer rises off the page in warm golden light"
                fill
                sizes="(min-width: 1024px) 340px, 1px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
          {MODULES.map((module, i) => {
            const accent = ACCENTS[i % ACCENTS.length];
            return (
              <div
                key={module.name}
                className="flex gap-4"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Ring-badge monogram: the module's own initial in the system's
                    standard ring frame, not a stock icon. */}
                <div
                  className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 transition-transform duration-300"
                  style={{ borderColor: accent, transform: hovered === i ? "scale(1.08)" : "scale(1)" }}
                >
                  <div
                    className="absolute inset-1.5 rounded-full border opacity-40"
                    style={{ borderColor: accent }}
                  />
                  <span className="font-display text-[16px]" style={{ color: accent }}>
                    {module.name[0]}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-[16px] text-ink">{module.name}</h3>
                  <p className="mt-1 font-sans text-[13.5px] leading-relaxed text-body">
                    {module.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-14">
        <Button href="/platform" variant="dark">
          See how the platform fits together
        </Button>
      </div>
    </section>
  );
}
