export const LAYERS = [
  "Physical books",
  "Mobile app",
  "Cloud platform",
  "AI engine",
  "Learning analytics",
  "Creator Studio",
  "Immersive experiences",
] as const;

const ACCENTS = ["#F5A623", "#D97A50", "#8F87CF", "#F5A623", "#D97A50", "#8F87CF", "#F5A623"];

/**
 * The seven-layer stack as seven concentric rings, outermost first: the
 * printed book is the outer world you start from, the immersive experience
 * the centre you arrive at. A legend names each ring in order; the deck's
 * own diagram caption sits beneath. The outermost dashed ring turns slowly.
 */
export function StackRings() {
  const radii = [190, 165, 140, 115, 90, 65, 40];
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 items-center gap-8 sm:grid-cols-[1fr_auto]">
        <div className="relative mx-auto aspect-square w-full max-w-90">
          <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
            {radii.map((r, i) => (
              <circle
                key={r}
                cx="200"
                cy="200"
                r={r}
                fill="none"
                stroke={ACCENTS[i]}
                strokeOpacity={i === 0 ? 0.9 : 0.55}
                strokeWidth={i === 0 ? 2 : 1.5}
                strokeDasharray={i === 0 ? "6 8" : undefined}
                className={i === 0 ? "origin-center motion-safe:animate-[orbit_140s_linear_infinite]" : undefined}
              />
            ))}
            <circle cx="200" cy="200" r="12" fill="#F5A623" />
          </svg>
        </div>
        <ol className="flex flex-col gap-2.5">
          {LAYERS.map((layer, i) => (
            <li key={layer} className="flex items-center gap-3">
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: ACCENTS[i] }}
                aria-hidden="true"
              />
              <span className="font-mono text-[11px] uppercase tracking-wide text-bone/80">{layer}</span>
            </li>
          ))}
        </ol>
      </div>
      <p className="max-w-110 font-mono text-[11px] leading-relaxed text-adire-caption">
        Physical books, mobile app, cloud platform, AI engine, learning analytics, creator studio,
        immersive experiences. Content flows down the stack. Evidence flows back up.
      </p>
    </div>
  );
}
