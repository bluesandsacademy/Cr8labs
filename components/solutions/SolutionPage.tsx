import Image from "next/image";
import { InnerPage } from "@/components/layout/InnerPage";
import { SimpleHero } from "@/components/ui/SimpleHero";
import { RingList } from "@/components/ui/RingList";
import { Button } from "@/components/ui/Button";

/**
 * The shared shape all four Solutions sub-pages follow: hero, an optional
 * large photo, the problem, what we do, one extra proof/rights/reasoning
 * block, then CTAs.
 */
export function SolutionPage({
  title,
  lede,
  image,
  problemHeading,
  problemBody,
  whatWeDoHeading,
  whatWeDoItems,
  extraHeading,
  extraBody,
  ctas,
}: {
  title: string;
  lede: string;
  image?: { src: string; alt: string };
  problemHeading: string;
  problemBody: string;
  whatWeDoHeading: string;
  whatWeDoItems: string[];
  extraHeading?: string;
  extraBody?: string;
  ctas: { label: string; href: string }[];
}) {
  return (
    <InnerPage>
      <SimpleHero title={title} lede={lede} />

      {image && (
        <section className="relative overflow-hidden bg-white pb-4 pt-2 sm:pb-6">
          <div className="page-frame">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[2rem] shadow-[0_24px_48px_-20px_rgba(23,19,15,0.3)]">
              <Image src={image.src} alt={image.alt} fill sizes="100vw" className="object-cover" priority />
            </div>
          </div>
        </section>
      )}

      <section className="relative section-y overflow-hidden bg-white">
        <div className="relative page-frame">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl leading-snug text-ink sm:text-3xl">{problemHeading}</h2>
            <p className="mt-5 font-sans text-base font-semibold leading-relaxed text-body">
              {problemBody}
            </p>
          </div>
        </div>
      </section>

      <section className="relative section-y overflow-hidden" style={{ background: "#F6F8FB" }}>
        <div className="relative page-frame">
          <h2 className="mx-auto max-w-xl text-center font-display text-2xl leading-snug text-ink sm:text-3xl">
            {whatWeDoHeading}
          </h2>
          <div className="mx-auto mt-8 max-w-xl">
            <RingList items={whatWeDoItems} />
          </div>
        </div>
      </section>

      <section className="relative section-y overflow-hidden bg-adire-dark">
        <div className="relative page-frame">
          <div className="mx-auto max-w-2xl text-center">
            {extraHeading && (
              <h2 className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-danfo">
                {extraHeading}
              </h2>
            )}
            {extraBody && (
              <p className="mt-4 font-display text-xl leading-snug text-bone sm:text-2xl">{extraBody}</p>
            )}
            <div className={`flex flex-col items-center justify-center gap-4 sm:flex-row ${extraBody ? "mt-9" : ""}`}>
              {ctas.map((cta, i) => (
                <Button key={cta.href} href={cta.href} variant={i === 0 ? "primary" : "light"}>
                  {cta.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </InnerPage>
  );
}
