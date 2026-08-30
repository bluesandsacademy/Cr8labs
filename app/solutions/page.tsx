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

const SOLUTIONS = [
  { name: "Education", href: "/solutions/education", line: "Laboratories, field trips and practicals with no building required.", icon: GraduationCap, accent: "#FFEB59" },
  { name: "Culture and publishing", href: "/solutions/culture-and-publishing", line: "Collections people can enter, not just look at.", icon: Landmark, accent: "#2C276C" },
  { name: "Brands and enterprise", href: "/solutions/brands-and-enterprise", line: "Let customers hold the product before they own it.", icon: Briefcase, accent: "#B6502E" },
  { name: "Training and simulation", href: "/solutions/training-and-simulation", line: "Practice the thing that is too costly to practise.", icon: ShieldCheck, accent: "#6E67B8" },
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

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SOLUTIONS.map((solution) => (
              <Link
                key={solution.href}
                href={solution.href}
                className="focus-ring-light block rounded-[1.8rem] border-4 bg-bone p-6 shadow-[0_8px_0_rgba(23,19,15,0.08)] transition-transform duration-200 hover:-translate-y-2"
                style={{ borderColor: solution.accent }}
              >
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-md"
                  style={{ backgroundColor: solution.accent }}
                  aria-hidden="true"
                >
                  <solution.icon
                    className="h-7 w-7"
                    style={{ color: solution.accent === "#FFEB59" ? "#17130F" : "#F3ECDE" }}
                    strokeWidth={2.2}
                  />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold leading-tight text-ink">
                  {solution.name}
                </h3>
                <p className="mt-2 font-sans text-sm font-semibold leading-relaxed text-body">
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
