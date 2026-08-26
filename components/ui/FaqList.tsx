/**
 * Questions on hairline rows, native details/summary so they work without
 * script and read to assistive tech as what they are. The ring marker
 * turns its dot when open.
 */
export function FaqList({ heading, items }: { heading: string; items: { q: string; a: string }[] }) {
  return (
    <section className="px-8 py-16 md:px-16 md:py-24">
      <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-[1fr_1.6fr]">
        <div className="self-start lg:sticky lg:top-28">
          <h2 className="font-display text-[30px] leading-[1.08] text-ink md:text-[40px]">{heading}</h2>
        </div>
        <div className="border-t border-border-light">
          {items.map((item) => (
            <details key={item.q} className="group border-b border-border-light">
              <summary className="focus-ring-light flex cursor-pointer list-none items-start gap-4 rounded-[3px] py-5 [&::-webkit-details-marker]:hidden">
                <span
                  className="relative mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-[1.5px] border-adire"
                  aria-hidden="true"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-adire transition-transform duration-300 group-open:scale-0" />
                  <span className="absolute h-[1.5px] w-2 bg-adire opacity-0 transition-opacity duration-300 group-open:opacity-100" />
                </span>
                <span className="font-display text-[19px] leading-snug text-ink md:text-[22px]">{item.q}</span>
              </summary>
              <p className="pb-6 pl-8 font-sans text-[16px] leading-relaxed text-body md:text-[17px]">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
