import type { Metadata } from "next";
import { BookOpen, Landmark, Smartphone, Shapes, ShieldCheck, FileSearch, Hammer, Settings2, TrendingUp } from "lucide-react";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { CardGrid } from "@/components/ui/CardGrid";
import { NumberedSteps } from "@/components/ui/NumberedSteps";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { BackedBy } from "@/components/home/BackedBy";
import { Manifesto } from "@/components/home/Manifesto";
import { ProblemSection } from "@/components/home/ProblemSection";
import { SolutionSection } from "@/components/home/SolutionSection";
import { ArVrSection } from "@/components/home/ArVrSection";
import { Industries } from "@/components/home/Industries";
import { ProductsTeaser } from "@/components/home/ProductsTeaser";
import { ProofSection } from "@/components/home/ProofSection";
import { WhyCr8lab } from "@/components/home/WhyCr8lab";
import { ClosingCta } from "@/components/home/ClosingCta";

export const metadata: Metadata = {
  title: "CR8LABB",
  description: "Africa's Immersive Technology Company",
};

/**
 * Every section below the hero paints its own literal background (solid
 * wash or gradient, `page-frame`/`section-y`) the way bluesandsk12's own
 * sections do. Nav is the sticky bar in normal flow, not a fixed overlay.
 *
 * Section order and copy follow the site's current brief exactly (Home,
 * updated). Platform/Work/Labs/Studio/Research/Community/Resources aren't
 * part of that brief, so nothing here links out to them yet; their fate is
 * a still-open question, not a decision made here.
 */
export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Nav theme="dark" />

      <main className="relative z-10 flex-1">
        <Hero />

        <Reveal>
          <TrustBar theme="light" />
        </Reveal>

        <Reveal>
          <BackedBy />
        </Reveal>

        <Reveal>
          <Manifesto />
        </Reveal>

        <Reveal>
          <ProblemSection />
        </Reveal>

        <Reveal>
          <SolutionSection />
        </Reveal>

        <Reveal>
          <ArVrSection />
        </Reveal>

        <Reveal>
          <CardGrid
            eyebrow="What we build"
            heading="Four formats. One production line."
            background="#F6F8FB"
            columns={4}
            cards={[
              {
                name: "Living books and publications",
                body: "Print that opens into 3D. Scan the page and the content stands up, moves and answers.",
                icon: BookOpen,
                image: {
                  src: "/brand/ceo/into-the-community.png",
                  alt: "A child in traditional dress wearing a VR headset beside a tablet on a carved stand, with a fan of AR storybooks open in front of her",
                },
              },
              {
                name: "Virtual tours and museum experiences",
                body: "Sites, collections and heritage rebuilt in 3D and visitable from anywhere, or deepened on site.",
                icon: Landmark,
                image: {
                  src: "/brand/ceo/kemet-heritage-family.png",
                  alt: "A family wearing VR headsets in front of a heritage site entrance, viewing a 3D holographic reconstruction of an ancient temple on a tablet",
                },
              },
              {
                name: "3D characters and worlds",
                body: "Original characters, environments and IP, built to be reused across formats and licensed on.",
                icon: Shapes,
                image: {
                  src: "/brand/ceo/3d-characters-worlds.png",
                  alt: "A family using tablets and a VR headset to interact with original 3D African characters and floating fantasy worlds rendered in front of them",
                },
              },
              {
                name: "Training and simulation",
                body: "Procedures, equipment and scenarios that are expensive, dangerous or impossible to rehearse for real.",
                icon: ShieldCheck,
                image: {
                  src: "/brand/ceo/training-simulation.png",
                  alt: "Medical staff wearing VR headsets practising chemistry, biology and surgical simulations, with a trainee reviewing a scored training dashboard on a tablet",
                },
              },
            ]}
          />
        </Reveal>

        <Reveal>
          <Industries />
        </Reveal>

        <Reveal>
          <NumberedSteps
            eyebrow="How it works"
            heading="Story in. Experience out. IP kept."
            background="#FFFBF0"
            steps={[
              {
                number: "01",
                name: "Story",
                body: "Research, rights, narrative design and cultural review with the source community or institution.",
                icon: FileSearch,
              },
              {
                number: "02",
                name: "Build",
                body: "Modelling, rigging, animation, voice and environment production in 3D.",
                icon: Hammer,
              },
              {
                number: "03",
                name: "Stage",
                body: "Interaction design, spatial audio and AI behaviour. The world learns how to respond.",
                icon: Settings2,
              },
              {
                number: "04",
                name: "Experience",
                body: "Shipped to AR on phones, VR on headsets and the web, online or offline.",
                icon: Smartphone,
              },
              {
                number: "05",
                name: "Scale",
                body: "License, localise, reuse the assets and monetise the IP across new formats.",
                icon: TrendingUp,
              },
            ]}
            closing="We do not just digitise a story. We keep the 3D assets, the characters and the runtime, so every project makes the next one cheaper."
          />
        </Reveal>

        <Reveal>
          <ProductsTeaser />
        </Reveal>

        <Reveal>
          <ProofSection />
        </Reveal>

        <Reveal>
          <WhyCr8lab />
        </Reveal>

        <Reveal>
          <ClosingCta />
        </Reveal>

        <Footer />
      </main>
    </div>
  );
}
