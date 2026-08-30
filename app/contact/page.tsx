import type { Metadata } from "next";
import { InnerPage } from "@/components/layout/InnerPage";
import { SimpleHero } from "@/components/ui/SimpleHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { ROUTE_PARAM_TO_OPTION } from "@/components/contact/route-options";

export const metadata: Metadata = {
  title: "Contact CR8LABB",
  description:
    "Get in touch to discuss partnerships, demos, investment opportunities or immersive technology projects.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ route?: string | string[] }>;
}) {
  const params = await searchParams;
  const raw = Array.isArray(params.route) ? params.route[0] : params.route;
  const initialRoute = raw ? ROUTE_PARAM_TO_OPTION[raw] : undefined;

  return (
    <InnerPage>
      <SimpleHero
        eyebrow="Get in touch"
        title="Let us build it together."
        lede="Pilots, partnerships, licensing or investment. Tell us what you have and what you want people to do with it."
      />

      <section id="form" className="relative scroll-mt-28 section-y overflow-hidden bg-white">
        <div className="relative page-frame">
          <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-[1fr_1.4fr]">
            <div className="self-start lg:sticky lg:top-28">
              <h2 className="font-display text-[28px] leading-[1.1] text-ink md:text-[36px]">
                CREATE. EXPERIMENT. INNOVATE.
              </h2>
              <div className="mt-6 flex flex-col gap-2 font-sans text-[15px] leading-relaxed text-body">
                <a href="mailto:cr8labtech@gmail.com" className="focus-ring-light w-fit rounded-[3px] hover:text-adire">
                  cr8labtech@gmail.com
                </a>
                <span>07034194669</span>
                <span>Sangotedo, Lagos, Nigeria</span>
                <span className="text-muted">cr8labb</span>
              </div>
            </div>
            <div className="relative">
              <ContactForm initialRoute={initialRoute} />
            </div>
          </div>
        </div>
      </section>
    </InnerPage>
  );
}
