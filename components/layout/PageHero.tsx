import type { ReactNode } from "react";

/**
 * The opening of every inner page: on the glow (dark, bone text), a kicker
 * that names where you are, the page's H1 in display type, one supporting
 * paragraph from the copy deck, and a ring device specific to the page on
 * the right (above on small screens). Seventy percent of a viewport, not a
 * full one, so the page's substance is one scroll away.
 */
export function PageHero({
  kicker,
  title,
  lede,
  device,
}: {
  kicker?: string;
  title: string;
  lede: string;
  device?: ReactNode;
}) {
  return (
    // overflow-x-clip: a rotating orbit container (the planetary system) is a
    // square whose corners sweep past its box; clip them rather than let them
    // widen the page. Clip, not hidden, so nothing becomes a scroll container.
    <header className="relative flex min-h-[70dvh] items-center overflow-x-clip px-8 pb-16 pt-32 md:px-16 md:pb-20 md:pt-40">
      <div
        className={`grid w-full grid-cols-1 items-center gap-y-12 ${device ? "gap-x-20 lg:grid-cols-[1.1fr_0.9fr]" : ""}`}
      >
        <div>
          {kicker && (
            <div className="mb-5 flex items-center gap-2.5">
              <span className="relative flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border-[1.5px] border-danfo">
                <span className="h-1 w-1 rounded-full bg-danfo" />
              </span>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-danfo">
                {kicker}
              </p>
            </div>
          )}
          <h1 className="max-w-160 font-display text-[44px] leading-[1.02] tracking-tight text-bone md:text-[66px]">
            {title}
          </h1>
          <p className="mt-6 max-w-120 font-sans text-[17px] leading-relaxed text-bone/75 md:text-[19px]">
            {lede}
          </p>
        </div>
        {device && <div className="relative mx-auto w-full max-w-105 lg:max-w-none">{device}</div>}
      </div>
    </header>
  );
}
