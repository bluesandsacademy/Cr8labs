import Image from "next/image";
import { Button } from "@/components/ui/Button";

/**
 * Community = ecosystem, so the image cluster is literally that: one large
 * circle (the platform) with small satellite circles in accent colors (the
 * people building on it) overlapping its edge.
 */
export function CommunitySection() {
  return (
    <section className="relative overflow-hidden border-t border-border-light px-8 py-16 md:px-16 md:py-24">
      <div className="grid grid-cols-1 items-center gap-x-20 gap-y-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="max-w-150 font-display text-[30px] leading-[1.12] text-ink md:text-[40px]">
            The next generation should be building this, not just using it
          </h2>
          <p className="mt-6 max-w-140 font-sans text-[16px] leading-relaxed text-body md:text-[17px]">
            Hackathons, creator grants, teacher ambassadors, university partnerships and youth
            programmes. An ecosystem is the only version of this that outlives us.
          </p>
          <div className="mt-9">
            <Button href="/community" variant="dark">
              Join the community
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-95">
          <div className="relative aspect-square w-full overflow-hidden rounded-full">
            <Image
              src="/brand/community-creators.png"
              alt="Three teenagers collaborating at a maker-space workbench under a warm pendant lamp, pointing at a phone on a small tripod beside a laptop, sketches and robot parts on the bench"
              fill
              sizes="(min-width: 1024px) 380px, 90vw"
              className="object-cover"
            />
          </div>
          <span
            className="absolute -left-4 top-[12%] h-10 w-10 rounded-full bg-danfo"
            aria-hidden="true"
          />
          <span
            className="absolute -right-2 bottom-[16%] flex h-14 w-14 items-center justify-center rounded-full border-2 border-laterite"
            aria-hidden="true"
          >
            <span className="h-2 w-2 rounded-full bg-laterite" />
          </span>
          <span
            className="absolute -bottom-3 left-[22%] h-6 w-6 rounded-full border-2 border-adire"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
