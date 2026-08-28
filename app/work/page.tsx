import type { Metadata } from "next";
import { InnerPage } from "@/components/layout/InnerPage";
import { PageHero } from "@/components/layout/PageHero";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { CaseStudyHeader, CaseBeat, ImpactBeat } from "@/components/work/CaseStudy";
import { FurtherWork } from "@/components/work/FurtherWork";
import { ClosingCta } from "@/components/home/ClosingCta";

export const metadata: Metadata = {
  title: "Work | Shipped Immersive Projects | CR8LAB",
  description:
    "Case studies from CR8LAB, including the science platform now running in 100+ schools across 6 African countries.",
};

export default function WorkPage() {
  return (
    <InnerPage>
      <PageHero
        kicker="Work"
        title="Work"
        lede="Shipped, in daily use, and measured. Not concepts."
        image={{
          src: "/brand/proof-classroom.png",
          alt: "Three students sharing a tablet at a wooden desk in a real classroom, laughing together, with a chalkboard and warm window light behind them",
        }}
      />

      <div data-tone="light">
        <Reveal>
          <CaseStudyHeader />
        </Reveal>
        <Reveal>
          <CaseBeat
            tone="light"
            heading="Challenge"
            body="Across six African markets, between 45 and 75 percent of secondary schools have no adequate science laboratory. In Nigeria the figure is 65 percent, and 91 percent of schools surveyed report insufficient equipment for hands-on training. Students sit practical examinations for experiments they have never performed. Building physical laboratories at that scale will not happen this decade."
            note="[Source line for the laboratory gap figures]"
          />
        </Reveal>
        <Reveal>
          <CaseBeat
            tone="light"
            heading="Solution"
            body="CR8LAB developed an AR book series and a tablet based virtual science laboratory, designed for classrooms with unreliable connectivity and entry level devices. Original illustrated titles for ages 4 to 13 with a full 3D layer, [250]+ curriculum mapped experiments, teacher certification and onboarding, and a dashboard giving teachers class level evidence within the term."
            media={
              // The product itself, not a picture of a tablet: the AR Science
              // Lab series with the tablet on its stand, as a packshot.
              <div
                className="relative aspect-[16/10] w-full overflow-hidden rounded-[4px]"
                style={{
                  background:
                    "radial-gradient(circle at 50% 55%, rgba(245,166,35,0.30) 0%, rgba(44,39,108,0.55) 45%, rgba(23,19,15,0.92) 100%)",
                }}
              >
                <Image
                  src="/brand/products/ar-science-lab-kit.png"
                  alt="The AR Science Lab kit: a fan of science titles, an open book, and a tablet on the Spotty stand showing water and carbon dioxide molecules rising off the page"
                  fill
                  sizes="(min-width: 1024px) 760px, 90vw"
                  className="object-contain p-[6%]"
                />
              </div>
            }
          />
        </Reveal>
      </div>

      {/* The deck: "This is the section buyers actually read." It gets the indigo world to itself. */}
      <div data-tone="adire">
        <Reveal>
          <CaseBeat
            tone="adire"
            heading="The hard part"
            body="Every design decision was set by the worst case classroom rather than the best. Thirty children, one teacher, one shared connection that drops, tablets that must last a full school day, and content that has to run with the network off entirely. That constraint dictated asset budgets, texture sizes, download pack structure and every interaction we built."
            media={
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[4px]">
                <Image
                  src="/brand/work-hard-part.jpg"
                  alt="A crowded secondary school classroom, students at wooden desks sharing tablets in small groups, a teacher standing by the chalkboard at the front"
                  fill
                  sizes="(min-width: 1024px) 760px, 90vw"
                  className="object-cover"
                />
              </div>
            }
          />
        </Reveal>
      </div>

      <div data-tone="ink">
        <Reveal>
          <ImpactBeat />
        </Reveal>
      </div>

      <div data-tone="light">
        <Reveal>
          <FurtherWork />
        </Reveal>
      </div>

      <div data-tone="ink">
        <Reveal>
          <ClosingCta />
        </Reveal>
      </div>
    </InnerPage>
  );
}
