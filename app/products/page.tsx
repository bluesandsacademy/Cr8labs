import type { Metadata } from "next";
import Image from "next/image";
import { Download, RotateCw, Play } from "lucide-react";
import { InnerPage } from "@/components/layout/InnerPage";
import { SimpleHero } from "@/components/ui/SimpleHero";
import { RingList } from "@/components/ui/RingList";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Immersive Learning Products",
  description: "Explore CR8LABB's AR books, VR experiences and interactive learning products.",
};

const PRODUCTS = [
  {
    name: "Into the Community",
    format: "AR",
    price: "from $250",
    body: "Five vivid AR stories about the places we live in. Users scan the page, and the community stands up in front of them: the market, the clinic, the road, the people who keep it all running. Built for early years and lower primary, and also to keep the kids busy at home while parents are busy with other chores.",
    includes: "Printed book set, Spotty camera, smart tablet, AR app licence, offline content pack, markers.",
    image: { src: "/brand/ceo/into-the-community.png", alt: "A child wearing a VR headset beside a tablet on a carved stand with a fan of AR storybooks open in front of her" },
    accent: "#FFEB59",
  },
  {
    name: "Into the Curiosity Q",
    format: "AR",
    price: "from $350",
    body: "Vivid virtual experiences that make big ideas click. The questions children ask, and adults struggle to answer, rendered as things they can watch happen and take apart. Built for upper primary and lower secondary.",
    includes: "Printed book set, Spotty camera, smart tablet, AR app licence, offline content pack, markers.",
    image: { src: "/brand/ceo/into-the-curiosity-q.png", alt: "A child wearing a VR headset with a tablet on a carved stand showing an AR savanna storybook experience, surrounded by AR animal cards" },
    accent: "#2C276C",
  },
  {
    name: "AR Science Lab",
    format: "AR",
    price: "from $450",
    body: "An eight-book AR science series across four subjects. Full practical procedure, apparatus students assemble themselves, and experiments that fail properly when done wrong. This is the laboratory for schools that will never build one.",
    includes: "Printed book set, Spotty camera, smart tablet, AR app licence, offline content pack, markers.",
    image: { src: "/brand/ceo/ar-science-lab.png", alt: "A field guide, binoculars and lab test tubes beside two tablets showing wildlife AR and surgical simulation apps, with a child wearing a VR headset" },
    accent: "#B6502E",
  },
  {
    name: "Experience Africa",
    format: "VR",
    price: "from $500",
    body: "Headset-led virtual worlds, shipped as a ready-to-run VR kit. Walk through African heritage sites, ecosystems and reconstructions in full presence, with nothing else in view. Set it up in a classroom, a gallery, an exhibition stand or a training room and run a session without technical support.",
    includes: "Headsets, preloaded offline content library, charging and storage case, self-help training session.",
    image: { src: "/brand/ceo/experience-africa.png", alt: "A child wearing a VR headset beside a tablet on a carved stand showing an AR royal-kingdom storybook experience, surrounded by AR animal cards" },
    accent: "#6E67B8",
  },
];

const HOW_IT_WORKS = [
  { step: "1. Set up", body: "Download the ARpedia app, mount your charged tablet in the Spotty stand on a flat, well lit table, and plug in the built in cable.", icon: Download },
  { step: "2. Calibrate", body: "Open the app, allow camera and microphone access, and follow the prompts so Spotty can see the table clearly. Keep the space in front of it clear.", icon: RotateCw },
  { step: "3. Play", body: "Lay the book flat under the camera and open it. The app recognises the page and the story starts. Place the paper tokens where prompted and watch them trigger animations, games and 3D graphics on screen.", icon: Play },
];

export default function ProductsPage() {
  return (
    <InnerPage>
      <SimpleHero
        title="Built in Lagos. Running in classrooms, on tablets, with the network off."
        lede="$20K+ in revenue, 150+ interactive simulations and 10+ institutional deployments. Education proved the engine. It now serves culture, publishing, brands and training."
        primaryCta={{ label: "Book a demo", href: "/contact?route=demo#form" }}
        secondaryCta={{ label: "See our work", href: "/about" }}
      />

      <section className="relative section-y overflow-hidden bg-white">
        <div className="relative page-frame">
          <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
            <span className="inline-block font-mono text-xs font-bold uppercase tracking-[0.14em] text-adire/70 sm:text-sm">
              The product line
            </span>
            <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl">
              Four kits. One immersive engine.
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-sans text-lg font-semibold text-body">
              Print, AR and VR bundles for schools, museums, institutions and families. Every kit runs
              on the same app, the same 3D library and the same offline runtime as our commissioned work.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {PRODUCTS.map((product) => (
              <div
                key={product.name}
                className="overflow-hidden rounded-[1.8rem] border-4 bg-bone shadow-[0_8px_0_rgba(23,19,15,0.08)]"
                style={{ borderColor: product.accent }}
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image src={product.image.src} alt={product.image.alt} fill sizes="(min-width: 1024px) 560px, 90vw" className="object-cover" />
                </div>
                <div className="p-6 lg:p-7">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-xl font-bold leading-tight text-ink">{product.name}</h3>
                    <span
                      className="shrink-0 rounded-full px-3 py-1 font-mono text-xs font-bold uppercase tracking-wide"
                      style={{ backgroundColor: product.accent, color: product.accent === "#FFEB59" ? "#17130F" : "#F3ECDE" }}
                    >
                      {product.format}
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-sm font-bold text-laterite-text">{product.price}</p>
                  <p className="mt-3 font-sans text-sm font-semibold leading-relaxed text-body">
                    {product.body}
                  </p>
                  <p className="mt-4 font-sans text-xs font-semibold uppercase tracking-wide text-muted">
                    Includes: {product.includes}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative section-y overflow-hidden" style={{ background: "#F6F8FB" }}>
        <div className="relative page-frame">
          <h2 className="mx-auto max-w-xl text-center font-display text-2xl leading-snug text-ink sm:text-3xl">
            Every kit ships complete.
          </h2>
          <div className="mx-auto mt-8 max-w-xl">
            <RingList
              items={[
                "Print, device licence and offline content in one box",
                "Runs with no network for the full term",
                "Teacher guide and setup session included",
                "Volume pricing for schools, museums, art galleries, and distributors",
              ]}
            />
          </div>

          <div className="mx-auto mt-14 max-w-2xl rounded-[1.8rem] border-4 border-adire bg-white p-7 text-center shadow-[0_8px_0_rgba(23,19,15,0.08)] lg:p-9">
            <h3 className="font-display text-xl leading-snug text-ink">
              Buying for a school, a museum, a gallery, or a distribution network?
            </h3>
            <p className="mt-3 font-sans text-sm font-semibold leading-relaxed text-body">
              Bulk orders are quoted per organization and include device provisioning, staff training,
              and a named point of contact for the deployment. Tell us the number of users and we will
              come back with pricing and a rollout plan.
            </p>
            <div className="mt-6">
              <Button href="/contact" variant="primary">
                Request organization pricing
              </Button>
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-center font-sans text-xs text-muted">
            Prices shown in USD. Naira pricing at checkout, inclusive of 7.5% VAT. Payment by card or
            transfer through Paystack. Delivery across Nigeria, with export shipping quoted on request.
          </p>
        </div>
      </section>

      <section className="relative section-y overflow-hidden bg-adire-dark">
        <div className="relative page-frame">
          <div className="mx-auto mb-12 max-w-xl text-center lg:mb-16">
            <h2 className="font-display text-3xl leading-tight text-bone sm:text-4xl">How it works</h2>
            <p className="mt-4 font-sans text-lg font-semibold text-bone/75">
              Every AR kit ships ready to run. Three steps, about five minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {HOW_IT_WORKS.map((item, i) => {
              const accent = ["#FFEB59", "#B6502E", "#6E67B8"][i];
              return (
                <div
                  key={item.step}
                  className="rounded-[1.6rem] border-4 bg-adire-mid p-6 text-center shadow-[0_8px_0_rgba(0,0,0,0.25)]"
                  style={{ borderColor: accent }}
                >
                  <span
                    className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl shadow-md"
                    style={{ backgroundColor: accent }}
                    aria-hidden="true"
                  >
                    <item.icon className="h-6 w-6" style={{ color: accent === "#FFEB59" ? "#17130F" : "#F3ECDE" }} strokeWidth={2.2} />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-bone">{item.step}</h3>
                  <p className="mt-2 font-sans text-sm font-semibold leading-relaxed text-bone/70">
                    {item.body}
                  </p>
                </div>
              );
            })}
          </div>

          <p className="mx-auto mt-10 max-w-lg text-center font-mono text-xs uppercase tracking-widest text-bone/50">
            Works fully offline once installed. No account, no subscription, no setup fee.
          </p>
        </div>
      </section>
    </InnerPage>
  );
}
