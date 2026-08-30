import type { Metadata } from "next";
import { BookOpen, Wifi, Layers, Rocket } from "lucide-react";
import { InnerPage } from "@/components/layout/InnerPage";
import { SimpleHero } from "@/components/ui/SimpleHero";
import { CardGrid } from "@/components/ui/CardGrid";

export const metadata: Metadata = {
  title: "About CR8LABB",
  description:
    "Learn how CR8LABB is building Africa's leading immersive technology company using AR, VR and AI to transform storytelling and learning.",
};

const TEAM = [
  { name: "Nelly Essien", role: "Co-Founder and CEO", bio: "Leads strategy, partnerships and institutional relationships across the group.", accent: "#FFEB59" },
  { name: "Kingsley Jerome", role: "Co-Founder and CTO", bio: "Leads engineering, 3D production and the AR and VR runtime. With the company since 2018.", accent: "#2C276C" },
  { name: "Aduragbemi Shobowale", role: "Distribution and Sales Lead", bio: "Owns the sales pipeline, device distribution and the school and retail channel.", accent: "#B6502E" },
  { name: "Michael Shadrack Waltha", role: "Customer Success Lead", bio: "Supported by a production team of 3D artists, developers, instructional designers and field trainers.", accent: "#6E67B8" },
  { name: "Oyenike", role: "Operations & Finance Lead", bio: "Owns hiring, contracts and the operating structure as the team scales.", accent: "#F5A623" },
];

export default function AboutPage() {
  return (
    <InnerPage>
      <SimpleHero title="Building the Future of African Immersive Technology" />

      <section className="relative section-y overflow-hidden bg-white">
        <div className="relative page-frame">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block font-mono text-xs font-bold uppercase tracking-[0.14em] text-adire/70 sm:text-sm">
              Who we are
            </span>
            <p className="mt-4 font-display text-2xl leading-snug text-ink sm:text-3xl">
              CR8LAB is an immersive creative technology company developing AR, VR and AI-powered
              experiences for education, culture, publishing and enterprise.
            </p>
            <p className="mt-6 font-sans text-lg font-semibold leading-relaxed text-body">
              We&apos;re not simply producing projects. We&apos;re building reusable technology and digital
              assets that make immersive content faster, more affordable and accessible across Africa.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="rounded-[1.8rem] border-4 border-danfo bg-bone p-7 shadow-[0_8px_0_rgba(23,19,15,0.08)]">
              <h2 className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-adire/70">
                Our mission
              </h2>
              <p className="mt-3 font-display text-xl leading-snug text-ink">
                To help Africa create, own and commercialize immersive digital experiences.
              </p>
            </div>
            <div className="rounded-[1.8rem] border-4 border-adire bg-adire-dark p-7 shadow-[0_8px_0_rgba(23,19,15,0.15)]">
              <h2 className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-danfo">
                Our vision
              </h2>
              <p className="mt-3 font-display text-xl leading-snug text-bone">
                To become the infrastructure powering immersive storytelling across Africa.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CardGrid
        eyebrow="What we believe"
        heading="Four rules everything else follows."
        background="#F6F8FB"
        columns={4}
        cards={[
          { name: "The story belongs to its source", body: "We do rights and cultural review before we model anything. Ownership of the underlying material stays where it started.", icon: BookOpen },
          { name: "Build for the network that exists", body: "Offline first is not a limitation we work around. It is the constraint that made the product good.", icon: Wifi },
          { name: "Own the assets", body: "Every project adds to a library we keep. That is what makes the next one affordable.", icon: Layers },
          { name: "Ship it, do not demo it", body: "A pilot that does not survive the term is a failure regardless of how well it presented.", icon: Rocket },
        ]}
      />

      <section className="relative section-y overflow-hidden bg-adire-dark">
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-danfo/15 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative page-frame">
          <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
            <h2 className="font-display text-3xl leading-tight text-bone sm:text-4xl lg:text-5xl">
              The people building it.
            </h2>
            <p className="mx-auto mt-4 max-w-lg font-sans text-lg font-semibold text-bone/75">
              Founders who have shipped immersive technology into real classrooms since 2022, with
              commercial and operating leadership alongside them.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="rounded-[1.8rem] border-4 bg-adire-mid p-6 shadow-[0_8px_0_rgba(0,0,0,0.25)]"
                style={{ borderColor: member.accent }}
              >
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-2xl font-display text-xl font-bold shadow-md"
                  style={{ backgroundColor: member.accent, color: member.accent === "#FFEB59" ? "#17130F" : "#F3ECDE" }}
                  aria-hidden="true"
                >
                  {member.name[0]}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold leading-tight text-bone">{member.name}</h3>
                <p className="mt-0.5 font-mono text-xs uppercase tracking-wide text-danfo">{member.role}</p>
                <p className="mt-2 font-sans text-sm font-semibold leading-relaxed text-bone/70">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </InnerPage>
  );
}
