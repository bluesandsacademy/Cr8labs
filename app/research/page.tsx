import type { Metadata } from "next";
import { InnerPage } from "@/components/layout/InnerPage";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CellGrid } from "@/components/ui/CellGrid";
import { ListBeat } from "@/components/ui/ListBeat";

export const metadata: Metadata = {
  title: "Research | Learning Science, Spatial Computing and AI Ethics",
  description:
    "Applied research from CR8LAB on immersive learning, spatial computing, digital publishing and AI in the classroom, published openly.",
};

/** The deck's eight lines, each split at its first full stop into the lead and the rest. */
const TOPICS = [
  { title: "Future of learning", body: "What immersive media changes about understanding, and what it does not." },
  { title: "Spatial computing", body: "Interaction design for shared devices, small rooms and low end hardware." },
  { title: "Digital publishing", body: "Business models for print titles with a living digital layer." },
  { title: "AR in education", body: "Retention, engagement and transfer, measured against unassisted practice rather than against nothing." },
  { title: "VR for workforce development", body: "Skills transfer from simulation to plant, and what breaks in between." },
  { title: "AI ethics in the classroom", body: "Consent, teacher authority, data minimisation and automated decisions about children." },
  { title: "Learning science", body: "What the analytics actually show about misconceptions, and where the instrument is wrong." },
  { title: "Accessibility in XR", body: "Shared devices, sensory differences, and open specifications." },
];

/** Eight topics as points on a ring, orbiting a page that has yet to publish: the work is in motion. */
function TopicRing() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[64vh]">
      <div className="absolute inset-0 rounded-full border border-adire-light/40" aria-hidden="true" />
      <div className="absolute inset-[16%] rounded-full border border-dashed border-adire-light/25 motion-safe:animate-[orbit_150s_linear_infinite]" aria-hidden="true" />
      <div className="absolute inset-[32%] rounded-full border border-adire-light/20" aria-hidden="true" />
      <div className="absolute inset-0 motion-safe:animate-[orbit-reverse_220s_linear_infinite]" aria-hidden="true">
        {TOPICS.map((topic, i) => {
          const angle = (i / TOPICS.length) * Math.PI * 2;
          const accent = ["#F5A623", "#8F87CF", "#D97A50"][i % 3];
          return (
            <span
              key={topic.title}
              className="absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                left: `${50 + 50 * Math.cos(angle)}%`,
                top: `${50 + 50 * Math.sin(angle)}%`,
                background: `radial-gradient(circle at 32% 30%, color-mix(in oklab, ${accent}, white 58%) 0%, ${accent} 44%, color-mix(in oklab, ${accent}, black 42%) 100%)`,
                boxShadow: `0 0 12px ${accent}66`,
              }}
            />
          );
        })}
      </div>
      <div className="absolute inset-[44%] rounded-full border-2 border-danfo/80" aria-hidden="true" />
    </div>
  );
}

export default function ResearchPage() {
  return (
    <InnerPage>
      <PageHero
        kicker="Research"
        title="Research"
        lede="We publish what we learn, including the results that did not go our way. A company selling learning technology owes the field its evidence."
        device={<TopicRing />}
      />

      <div data-tone="light">
        <Reveal>
          <CellGrid heading="What we work on" columns={3} items={TOPICS} />
        </Reveal>
      </div>

      <div data-tone="adire">
        <Reveal>
          <ListBeat
            tone="dark"
            heading="Publications"
            intro="Our first publications are in preparation. If you would like to be told when they land, join the list."
            items={["[Title], [date]. [One line.]", "[Title], [date]. [One line.]"]}
          />
        </Reveal>
      </div>

      <div data-tone="ink">
        <Reveal>
          <ListBeat
            tone="dark"
            heading="Annual report"
            intro="Once a year we publish what we shipped, what we measured, what we got wrong and what it cost. [Link to the [2026] report when published.]"
            items={[]}
          />
        </Reveal>
        <Reveal>
          <ListBeat
            tone="dark"
            heading="Collaborate"
            intro="We work with universities, research institutes and funders on applied studies inside live deployments. If you want to run a study with us, or you want our data for one of yours, write to [research@cr8lab.com]."
            items={[]}
            after={
              <Button href="/contact?route=research" variant="primary">
                Research collaboration
              </Button>
            }
          />
        </Reveal>
      </div>
    </InnerPage>
  );
}
