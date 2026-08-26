import type { Metadata } from "next";
import { InnerPage } from "@/components/layout/InnerPage";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ListBeat } from "@/components/ui/ListBeat";
import { CellGrid } from "@/components/ui/CellGrid";
import { ImageBand } from "@/components/ui/ImageBand";

export const metadata: Metadata = {
  title: "CR8LAB Labs | Original IP, Research and Public Interest Work",
  description:
    "Living books, digital heritage, African STEM worlds, AR storytelling and XR accessibility research, funded by us and by partners.",
};

/** The eight Labs projects, verbatim, each with the deck's own status line. */
const PROJECTS = [
  {
    title: "Living Books",
    body: "Research into printed titles whose digital layer keeps changing after publication. New scenes, new experiments and new endings pushed to a book already sitting on a shelf, so a title bought in [2026] is still current in [2030].",
    meta: "Status: [in development]",
  },
  {
    title: "Digital Heritage",
    body: "Photogrammetry and oral history in one archive. We scan objects, spaces and the people who can explain them, then build something a student anywhere can walk through on a phone. Cultural partners hold rights over how their material is used, agreed in writing before anything is scanned.",
    meta: "Status: [concept. Name the specific collection, site or community partner before publishing this, or leave it out. A vague heritage project reads as filler]",
  },
  {
    title: "AR Storytelling",
    body: "Narrative work built for a medium where the reader chooses where to look. Currently in development: The Borrowed Classroom, a short documentary series with an AR companion following one lesson from three angles, the child who takes it, the teacher who approved the free platform delivering it, and the data that leaves the room while it happens.",
    meta: "Status: [in development]",
  },
  {
    title: "African STEM Worlds",
    body: "Full environments where the science is taught through places, materials and problems from this continent. A refinery, a cassava processing plant, a solar microgrid, the Lagos lagoon. Built because a child should not have to learn thermodynamics through a snowfield they have never seen.",
    meta: "Status: [in development]",
  },
  {
    title: "Interactive Children's Literature",
    body: "Original picture books for ages 4 to 9 where the AR layer is part of the story rather than a bonus. Written and illustrated in-house, published under our own imprint and licensed to partners.",
    meta: "Status: [X titles published, X in production]",
  },
  {
    title: "Historical Reconstructions",
    body: "Places rebuilt as they were. [Name the specific sites you intend to reconstruct, with the historians or institutions advising. This project is only credible with named collaborators.]",
    meta: "Status: [concept]",
  },
  {
    title: "AI Learning Research",
    body: "Applied work on where an AI tutor actually helps and where it quietly harms. Retention against unassisted practice, the effect on teacher workload, and what happens to a student who learns to ask the machine before they try. We publish results including the ones that do not favour us.",
    meta: "Status: [ongoing]",
  },
  {
    title: "XR Accessibility",
    body: "Making AR and VR usable for learners with visual, hearing, motor and cognitive differences, and for classrooms where one device is shared by six children. Outputs are published as open specifications rather than kept in-house, because an accessibility standard nobody else can use is not a standard.",
    meta: "Status: [ongoing]",
  },
];

export default function LabsPage() {
  return (
    <InnerPage>
      <PageHero
        kicker="CR8LAB Labs"
        title="Not every idea starts with a client"
        lede="Labs is where we build original intellectual property. Some of it becomes product. Some of it stays a public good. All of it makes the commissioned work better."
        image={{
          src: "/brand/lab-world.png",
          alt: "A stylized 3D diorama of a West African lagoon community on a floating island of red earth: canoes, market stalls, a baobab tree and a solar microgrid under an indigo night sky",
        }}
      />

      <div data-tone="light">
        <Reveal>
          <ListBeat
            heading="Why Labs exists"
            items={[
              "It keeps the studio sharp on techniques nobody has commissioned yet.",
              "It builds IP we own rather than hand over at delivery.",
              "It lets us take positions on subjects we think matter, in the medium we actually work in.",
            ]}
          />
        </Reveal>
      </div>

      <div data-tone="adire">
        <Reveal>
          <CellGrid tone="dark" columns={2} heading="Projects" items={PROJECTS} />
        </Reveal>
        <Reveal>
          <ImageBand
            image={null}
            placeholder="labs-heritage.png, a photogrammetry rig scanning a carved object while an elder explains it"
          />
        </Reveal>
      </div>

      <div data-tone="ink">
        <Reveal>
          <ListBeat
            tone="dark"
            heading="Working with Labs"
            intro="We take commissions, co-productions and grant funded partnerships on Labs projects. If you fund public interest work, cultural work or applied research, we would like to hear from you: [hello@cr8lab.com]"
            items={[]}
            after={
              <Button href="/contact?route=fund" variant="primary">
                Fund innovation
              </Button>
            }
          />
        </Reveal>
      </div>
    </InnerPage>
  );
}
