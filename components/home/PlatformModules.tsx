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

/**
 * Four orbits, two modules each, at increasing radius (percent of the dial)
 * and decreasing speed: the inner world turns in under a minute, the outer
 * one takes more than two. Sizes vary like a real system; two planets carry
 * a moon. Angles are start positions; the orbits rotate clockwise from there.
 */
type Planet = { module: number; angle: number; size: number; moon?: boolean };
const ORBITS: { radius: number; period: number; dashed?: boolean; planets: Planet[] }[] = [
  { radius: 30, period: 48, planets: [{ module: 0, angle: 300, size: 16 }, { module: 4, angle: 120, size: 11 }] },
  { radius: 36.5, period: 74, dashed: true, planets: [{ module: 1, angle: 20, size: 20, moon: true }, { module: 5, angle: 200, size: 13 }] },
  { radius: 42.5, period: 104, planets: [{ module: 2, angle: 240, size: 14 }, { module: 6, angle: 60, size: 24, moon: true }] },
  { radius: 47.5, period: 140, planets: [{ module: 3, angle: 160, size: 17 }, { module: 7, angle: 340, size: 11 }] },
];

/** Degrees of orbit a planet's trail covers behind it. */
const TRAIL_DEG = 42;

const point = (radius: number, angle: number) => {
  const rad = (angle * Math.PI) / 180;
  return { x: 50 + radius * Math.cos(rad), y: 50 + radius * Math.sin(rad) };
};

/**
 * "One platform. Many worlds." rendered literally: a small planetary system
 * built from the mark's own ring geometry. The central lens (the platform in
 * use) is the sun, with a soft danfo corona; the eight modules are planets
 * on four orbits, each shaded as a lit sphere in its accent, turning at its
 * own period and trailing a soft comet tail along its orbit so the motion
 * reads even in a still frame. Hovering a module in the list lights its
 * planet. All motion is gated behind reduced-motion.
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
        {/* The system. Hidden on small screens where the module list carries alone. */}
        <div
          data-testid="platform-dial"
          className="relative mx-auto hidden aspect-square w-full max-w-130 lg:block"
          aria-hidden="true"
        >
          {/* Corona: the sun's light spills onto the inner orbits. */}
          <div
            className="absolute inset-[14%] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(245,166,35,0.28) 0%, rgba(245,166,35,0.1) 42%, rgba(245,166,35,0) 70%)",
            }}
          />

          {ORBITS.map((orbit) => (
            <div key={orbit.radius} className="absolute inset-0">
              <div
                className={`absolute rounded-full border ${orbit.dashed ? "border-dashed" : ""}`}
                style={{
                  inset: `${50 - orbit.radius}%`,
                  borderColor: `rgba(23,19,15,${0.16 - (orbit.radius - 30) * 0.004})`,
                }}
              />
              <div className="orbit-spin absolute inset-0" style={{ ["--period" as string]: `${orbit.period}s` }}>
                {/* Comet tails: a short arc of the orbit behind each planet,
                    fading in toward it. Rotates with the planets. */}
                <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100">
                  <defs>
                    {orbit.planets.map((planet) => {
                      const accent = ACCENTS[planet.module % ACCENTS.length];
                      const a = point(orbit.radius, planet.angle - TRAIL_DEG);
                      const b = point(orbit.radius, planet.angle);
                      return (
                        <linearGradient
                          key={planet.module}
                          id={`trail-${planet.module}`}
                          gradientUnits="userSpaceOnUse"
                          x1={a.x}
                          y1={a.y}
                          x2={b.x}
                          y2={b.y}
                        >
                          <stop offset="0" stopColor={accent} stopOpacity="0" />
                          <stop offset="1" stopColor={accent} stopOpacity={hovered === planet.module ? 0.95 : 0.6} />
                        </linearGradient>
                      );
                    })}
                  </defs>
                  {orbit.planets.map((planet) => {
                    const a = point(orbit.radius, planet.angle - TRAIL_DEG);
                    const b = point(orbit.radius, planet.angle);
                    return (
                      <path
                        key={planet.module}
                        d={`M ${a.x} ${a.y} A ${orbit.radius} ${orbit.radius} 0 0 1 ${b.x} ${b.y}`}
                        fill="none"
                        stroke={`url(#trail-${planet.module})`}
                        strokeWidth={planet.size / 12}
                        strokeLinecap="round"
                      />
                    );
                  })}
                </svg>

                {orbit.planets.map((planet) => {
                  const accent = ACCENTS[planet.module % ACCENTS.length];
                  const lit = hovered === planet.module;
                  const pos = point(orbit.radius, planet.angle);
                  return (
                    <span
                      key={planet.module}
                      className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-[box-shadow,scale] duration-300"
                      style={{
                        left: `${pos.x}%`,
                        top: `${pos.y}%`,
                        width: planet.size,
                        height: planet.size,
                        scale: lit ? 1.5 : 1,
                        background: `radial-gradient(circle at 32% 30%, color-mix(in oklab, ${accent}, white 58%) 0%, ${accent} 44%, color-mix(in oklab, ${accent}, black 42%) 100%)`,
                        boxShadow: lit
                          ? `0 0 0 6px ${accent}2e, 0 0 30px ${accent}`
                          : `0 0 ${planet.size}px ${accent}55, inset -${planet.size / 8}px -${planet.size / 8}px ${planet.size / 4}px rgba(23,19,15,0.25)`,
                      }}
                    >
                      {planet.moon && (
                        <span className="orbit-spin-reverse absolute inset-0" style={{ ["--period" as string]: "7s" }}>
                          <span
                            className="absolute left-1/2 h-[5px] w-[5px] -translate-x-1/2 rounded-full"
                            style={{
                              top: -(planet.size * 0.5 + 6),
                              background:
                                "radial-gradient(circle at 35% 30%, #ded6c4 0%, #8c8272 55%, #453f35 100%)",
                            }}
                          />
                        </span>
                      )}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}

          {/* The sun: the platform in use, in the system's standard double ring. */}
          <div className="absolute inset-[26%] rounded-full border-2 border-adire p-2.5 shadow-[0_0_60px_-10px_rgba(245,166,35,0.55)]">
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
