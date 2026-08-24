import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { PageBackground } from "@/components/home/PageBackground";
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
 * One fixed background for the whole page (PageBackground); everything else
 * is transparent and arrives over it. Each section wrapper declares the world
 * tone it wants beneath it, and the background crossfades to that tone as the
 * section comes in, so the page never cuts from one color to another. Loud
 * sections (dial, arch, orbit, cluster) alternate with quiet text-led ones.
 */
export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <PageBackground />

      {/* Fixed, not sticky: sticky would occupy its own space in normal flow
          and push the opening scene down; fixed removes it from flow so the
          nav floats over the world from the very first frame. */}
      <div className="fixed inset-x-0 top-0 z-50">
        <Nav theme="dark" />
      </div>

      <main className="relative z-10">
        {/* The opening dive is its own scroll-driven sequence and isn't
            wrapped in Reveal; everything after it fades and rises in. */}
        <ImmersiveZone />

        <div data-tone="light">
          <Reveal>
            <Manifesto />
          </Reveal>
        </div>

        <div data-tone="light">
          <Reveal>
            <PlatformModules />
          </Reveal>
        </div>

        <div data-tone="light">
          <Reveal>
            <SectionTeaser
              heading="Eight products, one library"
              body="Buy one, or run the whole stack. Everything shares the same content library, so a scene built for a book works in the lab, the headset and the classroom display without being made twice."
              cta={{ label: "Browse products", href: "/products" }}
            />
          </Reveal>
        </div>

        <div data-tone="adire">
          <Reveal>
            <Industries />
          </Reveal>
        </div>

        <div data-tone="light">
          <Reveal>
            <ProofSection />
          </Reveal>
        </div>

        <div data-tone="ink">
          <Reveal>
            <LabsSection />
          </Reveal>
        </div>

        <div data-tone="light">
          <Reveal>
            <WhyCr8lab />
          </Reveal>
        </div>

        <div data-tone="light">
          <Reveal>
            <SectionTeaser
              heading="We publish what we learn"
              body="Very few creative technology companies show their working. We publish research on learning science, spatial computing, digital publishing and AI in the classroom, including the results that did not go our way."
              cta={{ label: "Read the research", href: "/research" }}
            />
          </Reveal>
        </div>

        <div data-tone="light">
          <Reveal>
            <CommunitySection />
          </Reveal>
        </div>

        <div data-tone="ink">
          <Reveal>
            <ClosingCta />
          </Reveal>
        </div>

        <Footer />
      </main>
    </div>
  );
}
