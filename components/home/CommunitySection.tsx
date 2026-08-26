import { Button } from "@/components/ui/Button";
import { SatelliteCluster } from "@/components/ui/SatelliteCluster";

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

        <SatelliteCluster
          src="/brand/community-creators.png"
          alt="Three teenagers collaborating at a maker-space workbench under a warm pendant lamp, pointing at a phone on a small tripod beside a laptop, sketches and robot parts on the bench"
          sizes="(min-width: 1024px) 380px, 90vw"
        />
      </div>
    </section>
  );
}
