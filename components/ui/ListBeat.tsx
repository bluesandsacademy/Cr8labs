import type { ReactNode } from "react";
import { RingList } from "@/components/ui/RingList";

/**
 * A heading pinned on lg (the Home SectionTeaser pattern) beside a
 * ring-marked list, with an optional line and action beneath. The page
 * decides the tone; text colours follow it.
 */
export function ListBeat({
  heading,
  items,
  intro,
  tone = "light",
  after,
}: {
  heading: string;
  items: string[];
  intro?: string;
  tone?: "light" | "dark";
  after?: ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <section className="px-8 py-16 md:px-16 md:py-24">
      <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-[1fr_1.4fr]">
        <div className="self-start lg:sticky lg:top-28">
          <h2 className={`font-display text-[30px] leading-[1.08] md:text-[40px] ${dark ? "text-bone" : "text-ink"}`}>
            {heading}
          </h2>
        </div>
        <div>
          {intro && (
            <p className={`mb-8 max-w-140 font-sans text-[17px] leading-relaxed md:text-[19px] ${dark ? "text-bone/80" : "text-body"}`}>
              {intro}
            </p>
          )}
          <RingList items={items} tone={tone} />
          {after && <div className="mt-9">{after}</div>}
        </div>
      </div>
    </section>
  );
}
