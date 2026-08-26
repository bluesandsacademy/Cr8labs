import { RingList } from "@/components/ui/RingList";

/**
 * The deck's "Further work" blocks are all bracketed placeholders, so this
 * section says exactly what the deck's holding copy says and names the five
 * sectors as labels. No case-study cards until there are case studies.
 */
const SECTORS = [
  "Museums and heritage",
  "Brands and retail",
  "Publishing",
  "Training",
  "Culture and festivals",
];

export function FurtherWork() {
  return (
    <section className="border-t border-border-light px-8 py-16 md:px-16 md:py-24">
      <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-[1fr_1.4fr]">
        <div className="self-start lg:sticky lg:top-28">
          <h2 className="font-display text-[30px] leading-[1.08] text-ink md:text-[40px]">Further work</h2>
        </div>
        <div>
          <p className="max-w-140 font-sans text-[17px] leading-relaxed text-body md:text-[19px]">
            Some of our work sits under client agreements we will not break to fill a portfolio
            page. Ask, and we will walk you through it on a call.
          </p>
          <div className="mt-10">
            <RingList items={SECTORS} />
          </div>
        </div>
      </div>
    </section>
  );
}
