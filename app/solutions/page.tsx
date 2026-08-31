import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, Landmark, Briefcase, ShieldCheck } from "lucide-react";
import { InnerPage } from "@/components/layout/InnerPage";
import { SimpleHero } from "@/components/ui/SimpleHero";

export const metadata: Metadata = {
  title: "AR, VR & AI Solutions",
  description:
    "Discover immersive technology solutions for schools, publishers, museums, governments and businesses.",
};

// Same Deel/Webflow gradient-swatch treatment as /industries: one real photo
// existing for three of the four sectors and not the fourth is not a reason
// to give them different card weight, so none of the four uses a photo here.
const SOLUTIONS = [
  {
    name: "Education",
    href: "/solutions/education",
    line: "Laboratories, field trips and practicals with no building required.",
    icon: GraduationCap,
    gradient: "linear-gradient(135deg, #FFEB59 0%, #F5A623 100%)",
  },
  {
    name: "Culture and publishing",
    href: "/solutions/culture-and-publishing",
    line: "Collections people can enter, not just look at.",
    icon: Landmark,
    gradient: "linear-gradient(135deg, #8F87CF 0%, #2C276C 100%)",
  },
  {
    name: "Brands and enterprise",
    href: "/solutions/brands-and-enterprise",
    line: "Let customers hold the product before they own it.",
    icon: Briefcase,
    gradient: "linear-gradient(135deg, #D97A50 0%, #B6502E 100%)",
  },
  {
    name: "Training and simulation",
    href: "/solutions/training-and-simulation",
    line: "Practice the thing that is too costly to practise.",
    icon: ShieldCheck,
    gradient: "linear-gradient(135deg, #6E67B8 0%, #211D54 100%)",
  },
];

export default function SolutionsPage() {
  return (
    <InnerPage>
      <SimpleHero
        eyebrow="Create. Experiment. Innovate."
        title="We build worlds people step into, not content they scroll past."
        lede="Schools, publishers, museums, governments and brands bring us the material. We turn it into immersive AR, VR and AI powered experiences on the devices their audience already holds."
        primaryCta={{ label: "Book a demo", href: "/contact" }}
        secondaryCta={{ label: "Partner with us", href: "/contact?route=partner#form" }}
      />

      <section className="relative section-y overflow-hidden bg-white">
        <div className="relative page-frame">
          <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
            <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl">
              Four industries. One engine.
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-sans text-lg font-semibold text-body">
              We started in education because that is where the need was loudest and the constraints
              were hardest. Everything that survives a Nigerian classroom survives anywhere. The same
              stack now serves museums, publishers, brands and employers.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {SOLUTIONS.map((solution) => (
              <Link key={solution.href} href={solution.href} className="focus-ring-light group block">
                <div
                  className="relative flex aspect-[5/4] items-center justify-center overflow-hidden rounded-2xl shadow-[0_10px_24px_-14px_rgba(23,19,15,0.4)] transition-transform duration-200 group-hover:-translate-y-1.5"
                  style={{ background: solution.gradient }}
                >
                  <span
                    className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/90 shadow-md"
                    aria-hidden="true"
                  >
                    <solution.icon className="h-7 w-7 text-ink" strokeWidth={2} />
                  </span>
                </div>
                <h3 className="mt-4 flex items-center gap-1.5 font-display text-lg font-bold leading-tight text-ink">
                  {solution.name}
                  <span
                    aria-hidden="true"
                    className="text-adire transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </h3>
                <p className="mt-1.5 font-sans text-sm font-semibold leading-relaxed text-body">
                  {solution.line}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </InnerPage>
  );
}
