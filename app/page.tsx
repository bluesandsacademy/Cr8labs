import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { ImmersiveZone } from "@/components/home/ImmersiveZone";
import { Manifesto } from "@/components/home/Manifesto";
import { SectionTeaser } from "@/components/home/SectionTeaser";
import { PlatformModules } from "@/components/home/PlatformModules";
import { Industries } from "@/components/home/Industries";
import { ProofSection } from "@/components/home/ProofSection";
import { LabsSection } from "@/components/home/LabsSection";
import { WhyCr8lab } from "@/components/home/WhyCr8lab";
import { CommunitySection } from "@/components/home/CommunitySection";
import { ClosingCta } from "@/components/home/ClosingCta";

/**
 * Section rhythm is deliberate: loud sections (dark bands, imagery, the dial)
 * alternate with quiet text-led ones so the page breathes instead of droning.
 * Each loud section carries a distinct device derived from the ring mark:
 * manifesto ring fragment, platform dial, adire band, portal arch, dashed
 * orbit, satellite cluster, closing glow.
 */
export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Fixed, not sticky: sticky still occupies its own space in normal flow,
          which pushed the immersive zone down and left the nav sitting on the
          page's plain body background instead of floating over the dark hero
          from the very first frame - fixed removes it from flow entirely, so
          the zone starts at the true top of the page and the nav overlays it. */}
      <div className="fixed inset-x-0 top-0 z-50">
        <Nav theme="dark" />
      </div>

      {/* The immersive zone is its own continuous scroll-driven sequence and
          isn't wrapped in Reveal - everything after it gets a considered
          fade-and-rise into view instead of appearing flat and static. */}
      <ImmersiveZone />

      <Reveal>
        <Manifesto />
      </Reveal>

      <Reveal>
        <PlatformModules />
      </Reveal>

      <Reveal>
        <SectionTeaser
          heading="Eight products, one library"
          body="Buy one, or run the whole stack. Everything shares the same content library, so a scene built for a book works in the lab, the headset and the classroom display without being made twice."
          cta={{ label: "Browse products", href: "/products" }}
        />
      </Reveal>

      <Reveal>
        <Industries />
      </Reveal>

      <Reveal>
        <ProofSection />
      </Reveal>

      <Reveal>
        <LabsSection />
      </Reveal>

      <Reveal>
        <WhyCr8lab />
      </Reveal>

      <Reveal>
        <SectionTeaser
          heading="We publish what we learn"
          body="Very few creative technology companies show their working. We publish research on learning science, spatial computing, digital publishing and AI in the classroom, including the results that did not go our way."
          cta={{ label: "Read the research", href: "/research" }}
        />
      </Reveal>

      <Reveal>
        <CommunitySection />
      </Reveal>

      <Reveal>
        <ClosingCta />
      </Reveal>

      <Footer />
    </div>
  );
}
