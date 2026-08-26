import type { Metadata } from "next";
import { InnerPage } from "@/components/layout/InnerPage";
import { PageHero } from "@/components/layout/PageHero";
import { PortalArch } from "@/components/ui/PortalArch";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { Reveal } from "@/components/ui/Reveal";
import { CaseStudyHeader, CaseBeat, ImpactBeat } from "@/components/work/CaseStudy";
import { FurtherWork } from "@/components/work/FurtherWork";
import { ClosingCta } from "@/components/home/ClosingCta";

export const metadata: Metadata = {
  title: "Work | Shipped Immersive Projects | CR8LAB",
  description:
    "Case studies from CR8LAB, including the science platform now running in [100]+ schools across [6] African countries.",
};

export default function WorkPage() {
  return (
    <InnerPage>
      <PageHero
        kicker="Work"
        title="Work"
        lede="Shipped, in daily use, and measured. Not concepts."
        device={
          <PortalArch
            src="/brand/proof-classroom.png"
            alt="Three students sharing a tablet at a wooden desk in a real classroom, laughing together, with a chalkboard and warm window light behind them"
            sizes="(min-width: 1024px) 420px, 90vw"
          />
        }
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
              <MediaSlot
                className="aspect-[16/10] w-full rounded-[4px]"
                caption="Placeholder: work-solution.png, a tablet running a virtual chemistry experiment on a school desk beside an open AR book"
              />
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
              <MediaSlot
                className="aspect-[16/10] w-full rounded-[4px]"
                caption="Placeholder: work-hard-part.png, a full classroom of thirty sharing a few tablets, one teacher, no network"
              />
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
