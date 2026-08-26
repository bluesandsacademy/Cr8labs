import type { Metadata } from "next";
import { InnerPage } from "@/components/layout/InnerPage";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { CellGrid } from "@/components/ui/CellGrid";
import { FaqList } from "@/components/ui/FaqList";
import { ClosingBeat } from "@/components/ui/ClosingBeat";

export const metadata: Metadata = {
  title: "Resources | Documentation, Lesson Plans, Media Kit and FAQs",
  description:
    "Documentation, free curriculum mapped lesson plans, downloads, brand assets and answers to the questions buyers ask most.",
};

const SECTIONS = [
  { title: "Blog", body: "Product releases, studio notes, and what we learned building it." },
  { title: "Documentation", body: "Setup, deployment, device requirements, offline packs, roster import and troubleshooting." },
  { title: "Developer API", body: "[In development. Join the waiting list for early access and asset specifications.]" },
  { title: "Lesson plans", body: "Free, curriculum mapped, downloadable, one per title and one per experiment set." },
  { title: "Downloads", body: "Device specifications, procurement templates, pricing sheets and a sample deployment plan." },
  { title: "Media kit", body: "Logos, product photography, founder photographs, boilerplate and fact sheet." },
  { title: "Brand assets", body: "Logo files, colour values, typefaces and usage rules for partners and press." },
  { title: "FAQs", body: "Below." },
];

const FAQS = [
  {
    q: "Does it work without internet?",
    a: "Yes. Content packs download once and every lesson, experiment and assessment runs offline. Results sync when a connection returns.",
  },
  {
    q: "What devices do we need?",
    a: "Entry level Android phones or tablets are enough for books and AR. The virtual laboratory ships with a tablet included at [$150] per student per year. VR needs [specified headsets], though every headset build also runs in a browser.",
  },
  {
    q: "How is it priced?",
    a: "Schools from [₦80,000] per term. Individuals and families from [₦8,000] per term. Hardware and institutional deployments are quoted per school. Prices are charged in naira, VAT inclusive.",
  },
  {
    q: "Is it mapped to our curriculum?",
    a: "The library is mapped to [the Nigerian national curriculum and WAEC and NECO practicals], with [Kenyan CBC] [live or in progress]. Ministries and school groups can request additional mapping.",
  },
  {
    q: "What happens to our students' data?",
    a: "The school is the data controller. We do not advertise to children, and we do not sell, rent or broker student data. Data is handled under the Nigeria Data Protection Act 2023, and any record can be exported or deleted on request.",
  },
  {
    q: "Do teachers get training?",
    a: "Yes. Certification and onboarding are included with every school deployment, and Teacher Ambassadors provide ongoing peer support.",
  },
  {
    q: "Can we bring our own content?",
    a: "Yes, through Studio for lessons today, and through the content pipeline for publishers. A public API is [on the roadmap].",
  },
  {
    q: "Can we license your assets or engine?",
    a: "Yes. Publishers, studios and institutions license from the CR8LAB Library and the AR engine. Write to [partnerships@cr8lab.com].",
  },
];

/** The eight sections as a ring of points around the page's own mark. */
function ResourceRing() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[60vh]">
      <div className="absolute inset-0 rounded-full border border-adire-light/40" aria-hidden="true" />
      <div className="absolute inset-[18%] rounded-full border border-dashed border-adire-light/25 motion-safe:animate-[orbit-reverse_140s_linear_infinite]" aria-hidden="true" />
      <div className="absolute inset-[36%] rounded-full border-2 border-danfo/70" aria-hidden="true" />
      <div className="absolute inset-[46%] rounded-full bg-danfo" aria-hidden="true" />
      {SECTIONS.map((section, i) => {
        const angle = (i / SECTIONS.length) * Math.PI * 2 - Math.PI / 2;
        return (
          <span
            key={section.title}
            className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bone/90"
            style={{ left: `${50 + 50 * Math.cos(angle)}%`, top: `${50 + 50 * Math.sin(angle)}%` }}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
}

export default function ResourcesPage() {
  return (
    <InnerPage>
      <PageHero
        kicker="Resources"
        title="Resources"
        lede="Everything you need to evaluate us, teach with us, build on us or write about us."
        device={<ResourceRing />}
      />

      <div data-tone="light">
        <Reveal>
          <CellGrid items={SECTIONS} columns={3} />
        </Reveal>
        <Reveal>
          <FaqList heading="Frequently asked questions" items={FAQS} />
        </Reveal>
      </div>

      <div data-tone="ink">
        <Reveal>
          <ClosingBeat
            text="The fastest way to understand the platform is thirty minutes with it in your hands."
            cta={{ label: "Book a demo", href: "/contact" }}
          />
        </Reveal>
      </div>
    </InnerPage>
  );
}
