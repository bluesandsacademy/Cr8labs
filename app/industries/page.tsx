import type { Metadata } from "next";
import {
  GraduationCap,
  BookOpen,
  Landmark,
  Building2,
  MapPin,
  ShoppingBag,
  HeartHandshake,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { InnerPage } from "@/components/layout/InnerPage";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "Discover how immersive technology transforms education, publishing, museums, enterprise and government.",
};

// Ported from Deel and Webflow's own category grids: a compact gradient
// swatch carries the colour and the icon; the name and body sit outside it
// in plain dark-on-light type, never overlaid on the gradient. Same shape
// and weight for all eight — no tier, no number, no photo standing in for
// the five we don't have real photography for.
const INDUSTRIES: { name: string; body: string; icon: LucideIcon; gradient: string }[] = [
  {
    name: "Education",
    body: "Practical learning is the first thing a tight budget cuts. Virtual laboratories, AR textbooks and field trips to places your students will never reach. Runs offline, on the devices already in the school.",
    icon: GraduationCap,
    gradient: "linear-gradient(135deg, #FFEB59 0%, #F5A623 100%)",
  },
  {
    name: "Publishers",
    body: "Your reader is holding a phone that is more interesting than your book. We turn your titles into living editions. The page stays a page, then opens into a scene when a camera goes over it. Your catalogue, your rights, a new format.",
    icon: BookOpen,
    gradient: "linear-gradient(135deg, #D97A50 0%, #B6502E 100%)",
  },
  {
    name: "Museums",
    body: "Your collection only reaches people who can travel to it. Virtual tours, artefact reconstruction and on-site AR layers. Visitors enter from anywhere, or go deeper standing in front of the real thing.",
    icon: Landmark,
    gradient: "linear-gradient(135deg, #8F87CF 0%, #2C276C 100%)",
  },
  {
    name: "Government",
    body: "Programmes reach the people who can get to the building. Immersive training, public education and heritage preservation that ships to a state, not a venue. Fully offline, in local languages, deployable where the network is not.",
    icon: Building2,
    gradient: "linear-gradient(135deg, #6E67B8 0%, #211D54 100%)",
  },
  {
    name: "Tourism",
    body: "People decide where to go before they ever see it. Virtual visits to sites, parks and cities that let travellers walk through before they book, and give the people who never travel a way in.",
    icon: MapPin,
    gradient: "linear-gradient(135deg, #F5A623 0%, #B6502E 100%)",
  },
  {
    name: "Brands",
    body: "Flat creative has two seconds and it loses them. 3D product experiences customers rotate, configure and place in their own room. Virtual showrooms with no app install. Built in Lagos, priced for this market.",
    icon: ShoppingBag,
    gradient: "linear-gradient(135deg, #D97A50 0%, #6E4A9E 100%)",
  },
  {
    name: "NGOs",
    body: "Your funder has read the report. They have not stood in the place. Immersive field documentation that puts donors, boards and policymakers inside the community you work in. The strongest fundraising asset most organisations are not using.",
    icon: HeartHandshake,
    gradient: "linear-gradient(135deg, #6E67B8 0%, #332D7C 100%)",
  },
  {
    name: "Corporate Training",
    body: "The procedures that most need rehearsal are the ones nobody can afford to rehearse. Simulation of equipment, technique and emergency scenarios. Run to failure with no consequence, scored on sequence and decision, deployable to any site.",
    icon: ShieldCheck,
    gradient: "linear-gradient(135deg, #A39CC9 0%, #1A1748 100%)",
  },
];

export default function IndustriesPage() {
  return (
    <InnerPage>
      <section className="relative section-y overflow-hidden bg-white">
        <div className="relative page-frame">
          <div className="mx-auto mb-14 max-w-2xl text-center lg:mb-16">
            <span className="inline-block font-mono text-xs font-bold uppercase tracking-[0.14em] text-adire/70 sm:text-sm">
              Who we build for
            </span>
            <h1 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl">
              Built for anyone with something worth stepping into.
            </h1>
            <p className="mx-auto mt-4 max-w-md font-sans text-lg font-semibold text-body">
              Eight industries, one engine. Whatever you already own, a curriculum, a collection, a
              site, a product or a procedure, the work is the same. We turn it into something people
              can enter.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-10">
            {INDUSTRIES.map((industry) => (
              <div key={industry.name} className="group">
                <div
                  className="relative flex aspect-[5/4] items-center justify-center overflow-hidden rounded-2xl shadow-[0_10px_24px_-14px_rgba(23,19,15,0.4)] transition-transform duration-200 group-hover:-translate-y-1.5"
                  style={{ background: industry.gradient }}
                >
                  <span
                    className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/90 shadow-md"
                    aria-hidden="true"
                  >
                    <industry.icon className="h-7 w-7 text-ink" strokeWidth={2} />
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold leading-tight text-ink">
                  {industry.name}
                </h3>
                <p className="mt-1.5 font-sans text-sm font-semibold leading-relaxed text-body">
                  {industry.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </InnerPage>
  );
}
