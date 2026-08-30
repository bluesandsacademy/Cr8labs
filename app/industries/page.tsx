import type { Metadata } from "next";
import { GraduationCap, BookOpen, Landmark, Building2, MapPin, ShoppingBag, HeartHandshake, ShieldCheck } from "lucide-react";
import { InnerPage } from "@/components/layout/InnerPage";
import { CardGrid } from "@/components/ui/CardGrid";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "Discover how immersive technology transforms education, publishing, museums, enterprise and government.",
};

export default function IndustriesPage() {
  return (
    <InnerPage>
      <CardGrid
        eyebrow="Who we build for"
        heading="Built for anyone with something worth stepping into."
        intro="Eight industries, one engine. Whatever you already own, a curriculum, a collection, a site, a product or a procedure, the work is the same. We turn it into something people can enter."
        columns={4}
        cards={[
          { name: "Education", body: "Practical learning is the first thing a tight budget cuts. Virtual laboratories, AR textbooks and field trips to places your students will never reach. Runs offline, on the devices already in the school.", icon: GraduationCap },
          { name: "Publishers", body: "Your reader is holding a phone that is more interesting than your book. We turn your titles into living editions: the page stays a page, then opens into a scene when a camera goes over it.", icon: BookOpen },
          { name: "Museums", body: "Your collection only reaches people who can travel to it. Virtual tours, artefact reconstruction and on-site AR layers let visitors enter from anywhere, or go deeper standing in front of the real thing.", icon: Landmark },
          { name: "Government", body: "Programmes reach the people who can get to the building. Immersive training, public education and heritage preservation that ships to a state, not a venue, fully offline and in local languages.", icon: Building2 },
          { name: "Tourism", body: "People decide where to go before they ever see it. Virtual visits to sites, parks and cities let travellers walk through before they book, and give the people who never travel a way in.", icon: MapPin },
          { name: "Brands", body: "Flat creative has two seconds and it loses them. 3D product experiences customers rotate, configure and place in their own room, plus virtual showrooms with no app install.", icon: ShoppingBag },
          { name: "NGOs", body: "Your funder has read the report. They have not stood in the place. Immersive field documentation puts donors, boards and policymakers inside the community you work in.", icon: HeartHandshake },
          { name: "Corporate Training", body: "The procedures that most need rehearsal are the ones nobody can afford to rehearse. Simulation of equipment, technique and emergency scenarios, run to failure with no consequence.", icon: ShieldCheck },
        ]}
      />
    </InnerPage>
  );
}
