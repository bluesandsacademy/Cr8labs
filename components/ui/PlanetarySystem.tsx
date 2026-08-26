import Image from "next/image";

const ACCENTS = ["#F5A623", "#2C276C", "#B6502E", "#8F87CF"];

/**
 * Four orbits, two bodies each, at increasing radius (percent of the dial)
 * and decreasing speed: the inner world turns in under a minute, the outer
 * one takes more than two. Sizes vary like a real system; two bodies carry a
 * moon. Angles are start positions; the orbits rotate clockwise from there.
 */
type Planet = { index: number; angle: number; size: number; moon?: boolean };
const ORBITS: { radius: number; period: number; dashed?: boolean; planets: Planet[] }[] = [
  { radius: 30, period: 48, planets: [{ index: 0, angle: 300, size: 16 }, { index: 4, angle: 120, size: 11 }] },
  { radius: 36.5, period: 74, dashed: true, planets: [{ index: 1, angle: 20, size: 20, moon: true }, { index: 5, angle: 200, size: 13 }] },
  { radius: 42.5, period: 104, planets: [{ index: 2, angle: 240, size: 14 }, { index: 6, angle: 60, size: 24, moon: true }] },
  { radius: 47.5, period: 140, planets: [{ index: 3, angle: 160, size: 17 }, { index: 7, angle: 340, size: 11 }] },
];

/** Degrees of orbit a body's trail covers behind it. */
const TRAIL_DEG = 42;

const point = (radius: number, angle: number) => {
  const rad = (angle * Math.PI) / 180;
  return { x: 50 + radius * Math.cos(rad), y: 50 + radius * Math.sin(rad) };
};

/**
 * A small planetary system built from the mark's ring geometry: a central
 * lens (the sun, with a danfo corona) and eight bodies on four orbits, each
 * shaded as a lit sphere in its accent, turning at its own period with a
 * soft comet tail so the motion reads even in a still frame. `lit` picks
 * out one body (Home lights the hovered module). All motion is gated behind
 * reduced-motion. Presentation only; whoever renders it owns any state.
 */
export function PlanetarySystem({
  image,
  lit = null,
  idPrefix = "ps",
  className = "",
}: {
  image: { src: string; alt: string };
  lit?: number | null;
  /** Keeps SVG gradient ids unique when two systems share a page. */
  idPrefix?: string;
  className?: string;
}) {
  return (
    <div
      data-testid="planetary-system"
      className={`relative mx-auto aspect-square w-full max-w-130 ${className}`}
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
            <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100">
              <defs>
                {orbit.planets.map((planet) => {
                  const accent = ACCENTS[planet.index % ACCENTS.length];
                  const a = point(orbit.radius, planet.angle - TRAIL_DEG);
                  const b = point(orbit.radius, planet.angle);
                  return (
                    <linearGradient
                      key={planet.index}
                      id={`${idPrefix}-trail-${planet.index}`}
                      gradientUnits="userSpaceOnUse"
                      x1={a.x}
                      y1={a.y}
                      x2={b.x}
                      y2={b.y}
                    >
                      <stop offset="0" stopColor={accent} stopOpacity="0" />
                      <stop offset="1" stopColor={accent} stopOpacity={lit === planet.index ? 0.95 : 0.6} />
                    </linearGradient>
                  );
                })}
              </defs>
              {orbit.planets.map((planet) => {
                const a = point(orbit.radius, planet.angle - TRAIL_DEG);
                const b = point(orbit.radius, planet.angle);
                return (
                  <path
                    key={planet.index}
                    d={`M ${a.x} ${a.y} A ${orbit.radius} ${orbit.radius} 0 0 1 ${b.x} ${b.y}`}
                    fill="none"
                    stroke={`url(#${idPrefix}-trail-${planet.index})`}
                    strokeWidth={planet.size / 12}
                    strokeLinecap="round"
                  />
                );
              })}
            </svg>

            {orbit.planets.map((planet) => {
              const accent = ACCENTS[planet.index % ACCENTS.length];
              const isLit = lit === planet.index;
              const pos = point(orbit.radius, planet.angle);
              return (
                <span
                  key={planet.index}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-[box-shadow,scale] duration-300"
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    width: planet.size,
                    height: planet.size,
                    scale: isLit ? 1.5 : 1,
                    background: `radial-gradient(circle at 32% 30%, color-mix(in oklab, ${accent}, white 58%) 0%, ${accent} 44%, color-mix(in oklab, ${accent}, black 42%) 100%)`,
                    boxShadow: isLit
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
                          background: "radial-gradient(circle at 35% 30%, #ded6c4 0%, #8c8272 55%, #453f35 100%)",
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
          <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 340px, 60vw" className="object-cover" />
        </div>
      </div>
    </div>
  );
}
