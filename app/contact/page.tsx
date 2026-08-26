import type { Metadata } from "next";
import { InnerPage } from "@/components/layout/InnerPage";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Routes, RoutesRing } from "@/components/contact/Routes";
import { ContactForm, ROUTE_PARAM_TO_OPTION } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact CR8LAB | Demos, Partnerships, Funding and Press",
  description:
    "Book a demo, propose a partnership, talk to us about funding, or reach the press desk. Lagos based, replying within two working days.",
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
      <PageHero
        kicker="Contact"
        title="Start here"
        lede="Pick the route that fits. Every one of them reaches a person, not a queue."
        device={<RoutesRing />}
      />

      <div data-tone="light">
        <Reveal>
          <Routes />
        </Reveal>
        <Reveal>
          <section id="form" className="scroll-mt-28 px-8 py-16 md:px-16 md:py-24">
            <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-[1fr_1.4fr]">
              <div className="self-start lg:sticky lg:top-28">
                <h2 className="font-display text-[30px] leading-[1.08] text-ink md:text-[40px]">
                  Tell us what you want people to be able to do
                </h2>
                <p className="mt-6 font-sans text-[15px] leading-relaxed text-muted">
                  [hello@cr8lab.com] · [phone] · [office address], Lagos, Nigeria · [LinkedIn, X,
                  Instagram, YouTube]
                </p>
              </div>
              <div className="relative">
                <ContactForm initialRoute={initialRoute} />
              </div>
            </div>
          </section>
        </Reveal>
      </div>
    </InnerPage>
  );
}
