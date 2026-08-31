import Image from "next/image";
import type { LucideIcon } from "lucide-react";

const ACCENTS = ["#FFEB59", "#2C276C", "#B6502E", "#6E67B8"];

/**
 * Ported from bluesandsk12's benefits.jsx: a centered eyebrow/heading, then
 * an equal-height grid of cards (border-4 matching an accent, flat offset
 * shadow, lift on hover). A card is either icon-led (solid colour icon
 * square) or photo-led (a real image, with the same icon as a corner chip)
 * when one is supplied. Same page-frame and section-y rhythm as every other
 * section on the site now uses.
 */
export function CardGrid({
  eyebrow,
  heading,
  intro,
  cards,
  closing,
  background = "#FFFBF0",
  columns = 2,
}: {
  eyebrow?: string;
  heading: string;
  intro?: string;
  cards: { name: string; body: string; icon: LucideIcon; image?: { src: string; alt: string } }[];
  closing?: string;
  /** A literal background colour or gradient, matching bluesandsk12's per-section washes. */
  background?: string;
  columns?: 2 | 4;
}) {
  const gridCols = columns === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2";

  return (
    <section className="relative section-y overflow-hidden" style={{ background }}>
      <div
        className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-adire-light/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-danfo/25 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative page-frame">
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          {eyebrow && (
            <span className="inline-block font-mono text-xs font-bold uppercase tracking-[0.14em] text-adire/70 sm:text-sm">
              {eyebrow}
            </span>
          )}
          <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl">
            {heading}
          </h2>
          {intro && (
            <p className="mx-auto mt-4 max-w-md font-sans text-lg font-semibold text-body">{intro}</p>
          )}
        </div>

        <div className={`grid grid-cols-1 gap-5 lg:gap-6 ${gridCols}`}>
          {cards.map((card, i) => {
            const accent = ACCENTS[i % ACCENTS.length];
            const iconChip = (
              <span
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-md"
                style={{ backgroundColor: accent }}
                aria-hidden="true"
              >
                <card.icon
                  className="h-7 w-7"
                  style={{ color: accent === "#FFEB59" ? "#17130F" : "#F3ECDE" }}
                  strokeWidth={2.2}
                />
              </span>
            );

            if (card.image) {
              return (
                <div
                  key={card.name}
                  className="group overflow-hidden rounded-[1.8rem] bg-white shadow-[0_1px_0_rgba(23,19,15,0.06),0_16px_36px_-20px_rgba(23,19,15,0.3)] transition-transform duration-200 hover:-translate-y-2"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={card.image.src}
                      alt={card.image.alt}
                      fill
                      sizes="(min-width: 1024px) 320px, 90vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <span
                      className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-xl shadow-md"
                      style={{ backgroundColor: accent }}
                      aria-hidden="true"
                    >
                      <card.icon
                        className="h-5.5 w-5.5"
                        style={{ color: accent === "#FFEB59" ? "#17130F" : "#F3ECDE" }}
                        strokeWidth={2.2}
                      />
                    </span>
                  </div>
                  <div className="p-6 lg:p-7">
                    <h3 className="font-display text-lg font-bold leading-tight text-ink">{card.name}</h3>
                    <p className="mt-1 font-sans text-sm font-semibold leading-relaxed text-body">
                      {card.body}
                    </p>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={card.name}
                className="flex items-start gap-4 rounded-[1.8rem] border-4 bg-white p-6 shadow-[0_8px_0_rgba(23,19,15,0.08)] transition-transform duration-200 hover:-translate-y-2 lg:p-7"
                style={{ borderColor: accent }}
              >
                {iconChip}
                <div>
                  <h3 className="font-display text-lg font-bold leading-tight text-ink">{card.name}</h3>
                  <p className="mt-1 font-sans text-sm font-semibold leading-relaxed text-body">
                    {card.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {closing && (
          <p className="relative mt-12 max-w-2xl font-display text-2xl leading-snug text-ink lg:mt-16 lg:text-3xl">
            {closing}
          </p>
        )}
      </div>
    </section>
  );
}
