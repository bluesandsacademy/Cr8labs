import type { Metadata } from "next";
import { InnerPage } from "@/components/layout/InnerPage";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { CellGrid } from "@/components/ui/CellGrid";
import { ImageBand } from "@/components/ui/ImageBand";
import { ClosingBeat } from "@/components/ui/ClosingBeat";

export const metadata: Metadata = {
  title: "Community | Hackathons, Creator Grants and Teacher Ambassadors",
  description:
    "Programmes for students, teachers, universities and independent creators building with AR and VR across Africa.",
};

/** The nine programmes, verbatim and in the deck's order. */
const PROGRAMMES = [
  {
    title: "Hackathons",
    body: "[Two] day builds where student teams ship a working AR or VR experience against a brief from a real institution. Hardware, mentors and food provided. Next edition: [date, city].",
  },
  {
    title: "Challenges",
    body: "Termly creative challenges open to any student on the platform. A theme, a deadline, and a public gallery of everything submitted. Winners are published in the CR8LAB Library with their names on them.",
  },
  {
    title: "Student Creators",
    body: "A programme for students who keep building after the challenge ends. Advanced tools, a mentor, and a portfolio that goes with them to university or work.",
  },
  {
    title: "Teacher Ambassadors",
    body: "Teachers who train other teachers, shape the roadmap and get early access to everything. [Stipend, certification and conference support]. Applications open [termly].",
  },
  {
    title: "University Partnerships",
    body: "Curriculum modules, final year project briefs, internships and joint research with [named departments]. We would rather train the people who will replace us than complain about the talent pipeline.",
  },
  {
    title: "Open Innovation",
    body: "Selected tools, asset specifications and accessibility standards published openly, so other African studios do not have to solve the same problems from scratch.",
  },
  {
    title: "Creator Grants",
    body: "Cash grants and studio time for independent African creators building original AR and VR work. [Amount], [number] per year, applications [dates]. Recipients keep their IP.",
  },
  {
    title: "Innovation Labs",
    body: "Physical spaces inside partner schools and science centres with the devices, the tools and someone who knows how to use them. [Number] running, in [locations].",
  },
  {
    title: "Youth Programmes",
    body: "Holiday programmes and after school clubs for ages [8 to 18], run with [partners]. Free places reserved for [X] percent of every cohort.",
  },
];

export default function CommunityPage() {
  return (
    <InnerPage>
      <PageHero
        kicker="Community"
        title="The next generation should be building this, not just using it"
        lede="Programmes for students, teachers, universities and independent creators. Free to join unless stated otherwise."
        image={{
          src: "/brand/community-creators.png",
          alt: "Three teenagers collaborating at a maker-space workbench under a warm pendant lamp, pointing at a phone on a small tripod beside a laptop, sketches and robot parts on the bench",
        }}
      />

      <div data-tone="adire">
        <Reveal>
          <CellGrid tone="dark" columns={3} heading="Programmes" items={PROGRAMMES} />
        </Reveal>
      </div>

      <div data-tone="light">
        <Reveal>
          <ImageBand
            image={null}
            placeholder="community-hackathon.png, a hall of student teams at long tables with headsets and laptops, mid-build"
          />
        </Reveal>
      </div>

      <div data-tone="ink">
        <Reveal>
          <ClosingBeat
            text="Join as a student, a teacher, a university or a creator: [community@cr8lab.com]"
            cta={{ label: "Join the community", href: "/contact" }}
          />
        </Reveal>
      </div>
    </InnerPage>
  );
}
