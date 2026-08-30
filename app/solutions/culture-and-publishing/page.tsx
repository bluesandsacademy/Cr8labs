import type { Metadata } from "next";
import { SolutionPage } from "@/components/solutions/SolutionPage";

export const metadata: Metadata = {
  title: "Culture and Publishing Solutions | CR8LAB",
  description:
    "Virtual tours, artefact reconstruction and living editions for museums, publishers, archives and tourism boards.",
};

export default function CultureAndPublishingSolutionPage() {
  return (
    <SolutionPage
      title="Collections people can enter, not just look at."
      lede="For museums, publishers, archives, heritage bodies and tourism boards. We rebuild sites, artefacts and titles in 3D so the audience can walk in from anywhere, or go deeper while standing in front of the real thing."
      problemHeading="African heritage is barely represented in three dimensions."
      problemBody="The global immersive canon is being built right now, and Africa is almost absent from it. Meanwhile the collections that do exist reach only the people who can travel to them, and the titles that do exist compete with a phone the reader is already holding."
      whatWeDoHeading="We keep the artefact and add the dimension."
      whatWeDoItems={[
        "Virtual tours of sites, galleries and heritage locations, visitable from any phone or headset",
        "3D reconstruction of artefacts, architecture and lost or fragile sites",
        "Living editions of print titles, where the page opens into an interactive scene",
        "On-site AR layers that deepen a physical visit without replacing it",
        "Narration and dialogue in local languages, voiced and AI driven",
      ]}
      extraHeading="How we handle rights"
      extraBody="Cultural material is not raw input. We do rights and cultural review at the story stage, with the institution or the source community, before anything is modelled. You keep ownership of your material. We are clear in writing about what we retain and what you do."
      ctas={[
        { label: "Start a project", href: "/contact" },
        { label: "See our work", href: "/products" },
      ]}
    />
  );
}
