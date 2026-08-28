import { Button } from "@/components/ui/Button";

/**
 * Press and media, with the boilerplate as a quotable block, then careers.
 * On ink, the page's last word.
 */
export function PressCareers() {
  return (
    <section className="px-8 py-16 md:px-16 md:py-24">
      <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-[1fr_1.4fr]">
        <div className="self-start lg:sticky lg:top-28">
          <h2 className="font-display text-[30px] leading-[1.08] text-bone md:text-[40px]">Press and media</h2>
        </div>
        <div>
          <p className="font-sans text-[17px] leading-relaxed text-bone/80 md:text-[19px]">
            Media enquiries: [press@cr8lab.com]. Logos, product images, founder photographs and our
            boilerplate are in the media kit.
          </p>
          <figure className="mt-10 border-l-2 border-danfo pl-6">
            <figcaption className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-widest text-danfo">
              Boilerplate
            </figcaption>
            <blockquote className="font-sans text-[16px] leading-relaxed text-bone/85 md:text-[17px]">
              CR8LAB is a creative technology company based in Lagos, Nigeria, building immersive
              learning platforms, spatial computing experiences and interactive storytelling. The
              company produces original 3D content, augmented and virtual reality experiences and
              platform technology in-house. Its technology powers Blue Sands, a science learning
              platform used by 100,000+ students across 6 African countries. CR8LAB works with
              schools, governments, publishers, museums and enterprise partners, and funds original
              research and IP through CR8LAB Labs.
            </blockquote>
          </figure>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-1 gap-x-16 gap-y-8 border-t border-bone/15 pt-16 lg:grid-cols-[1fr_1.4fr] md:mt-24 md:pt-20">
        <div className="self-start lg:sticky lg:top-28">
          <h2 className="font-display text-[30px] leading-[1.08] text-bone md:text-[40px]">Careers</h2>
        </div>
        <div>
          <p className="font-sans text-[17px] leading-relaxed text-bone/80 md:text-[19px]">
            We hire 3D artists, animators, engine developers, platform engineers, writers, curriculum
            specialists and producers. If you can point at something you built and explain the
            decisions in it, send that rather than a cover letter: [careers@cr8lab.com].
          </p>
          <div className="mt-9">
            <Button href="/contact?route=join" variant="primary">
              Join the team
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
