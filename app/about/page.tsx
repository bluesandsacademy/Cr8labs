import type { Metadata } from "next";
import { InnerPage } from "@/components/layout/InnerPage";
import { SimpleHero } from "@/components/ui/SimpleHero";

export const metadata: Metadata = {
  title: "About CR8LABB",
  description:
    "Learn how CR8LABB is building Africa's leading immersive technology company using AR, VR and AI to transform storytelling and learning.",
};

// Editorial numbered list, ported from Studio Freight's own principles
// section researched on Mobbin: no icon squares, no border-4 card chrome —
// just a rule, an index and text. Same weight for every belief.
const BELIEFS = [
  { name: "The story belongs to its source", body: "We do rights and cultural review before we model anything. Ownership of the underlying material stays where it started." },
  { name: "Build for the network that exists", body: "Offline first is not a limitation we work around. It is the constraint that made the product good." },
  { name: "Own the assets", body: "Every project adds to a library we keep. That is what makes the next one affordable." },
  { name: "Ship it, do not demo it", body: "A pilot that does not survive the term is a failure regardless of how well it presented." },
];

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

      {/* Who we are, paired with real studio footage instead of a wall of
          centered text — the product-demo footage the CEO dropped in but
          nothing on the site was using yet. */}
      <section className="relative section-y overflow-hidden bg-white">
        <div className="relative page-frame grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
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

            <div className="mt-10 divide-y divide-border border-y border-border">
              <div className="py-6">
                <h2 className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-adire/70">
                  Our mission
                </h2>
                <p className="mt-2 font-display text-lg leading-snug text-ink">
                  To help Africa create, own and commercialize immersive digital experiences.
                </p>
              </div>
              <div className="py-6">
                <h2 className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-laterite-text">
                  Our vision
                </h2>
                <p className="mt-2 font-display text-lg leading-snug text-ink">
                  To become the infrastructure powering immersive storytelling across Africa.
                </p>
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.8rem] bg-adire-dark shadow-[0_16px_40px_-12px_rgba(23,19,15,0.35)] lg:aspect-[3/4]">
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
            >
              <source src="/brand/ceo/product-demo-2.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* What we believe: no numerals anywhere (repeated, standing
          instruction), no icon squares, no border-4 boxes. A small solid
          colour mark carries the per-item accent instead of an index —
          never lemon here, this section sits on a light background. */}
      <section className="relative section-y overflow-hidden" style={{ background: "#F6F8FB" }}>
        <div className="relative page-frame">
          <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
            <span className="inline-block font-mono text-xs font-bold uppercase tracking-[0.14em] text-adire/70 sm:text-sm">
              What we believe
            </span>
            <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl">
              Four rules everything else follows.
            </h2>
          </div>

          <div className="mx-auto max-w-3xl divide-y divide-border border-t border-border">
            {BELIEFS.map((belief, i) => {
              const accent = ["#2C276C", "#B6502E", "#6E67B8", "#8F87CF"][i % 4];
              return (
                <div key={belief.name} className="flex gap-5 py-8 lg:py-10">
                  <span
                    className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: accent }}
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-xl font-bold leading-tight text-ink">
                      {belief.name}
                    </h3>
                    <p className="mt-2 max-w-xl font-sans text-base font-semibold leading-relaxed text-body">
                      {belief.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

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

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-x-10 sm:grid-cols-2">
            {TEAM.map((member) => (
              <div key={member.name} className="flex items-start gap-4 border-t border-white/10 py-6">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-display text-base font-bold"
                  style={{ backgroundColor: member.accent, color: member.accent === "#FFEB59" ? "#17130F" : "#F3ECDE" }}
                  aria-hidden="true"
                >
                  {member.name[0]}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold leading-tight text-bone">{member.name}</h3>
                  <p className="mt-0.5 font-mono text-xs uppercase tracking-wide text-danfo">{member.role}</p>
                  <p className="mt-2 font-sans text-sm font-semibold leading-relaxed text-bone/70">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </InnerPage>
  );
}
