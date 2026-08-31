import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Download, RotateCw, Play } from "lucide-react";
import { InnerPage } from "@/components/layout/InnerPage";
import { SimpleHero } from "@/components/ui/SimpleHero";
import { Button } from "@/components/ui/Button";
import { PRODUCTS } from "@/components/products/products-data";

export const metadata: Metadata = {
  title: "Immersive Learning Products",
  description: "Explore CR8LABB's AR books, VR experiences and interactive learning products.",
};

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

      <section className="relative overflow-hidden bg-white pt-10">
        <div className="page-frame">
          <div className="grid grid-cols-2 divide-x divide-border overflow-hidden rounded-2xl border border-border sm:grid-cols-4">
            {[
              { stat: "Runs fully offline", note: "No network needed" },
              { stat: "No subscription", note: "One kit, yours" },
              { stat: "10+ institutions", note: "Already deployed" },
              { stat: "Setup in ~5 min", note: "Three steps" },
            ].map((item) => (
              <div key={item.stat} className="px-4 py-4 text-center">
                <p className="font-display text-sm font-bold leading-tight text-ink">{item.stat}</p>
                <p className="mt-1 font-sans text-xs font-semibold text-muted">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image-led entry points: the real buying happens on each kit's own
          page, so this stays a clean, large-photo grid, not a wall of text. */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
        <div className="page-frame">
          <div className="mb-12 text-center lg:mb-16">
            <span className="inline-block font-mono text-xs font-bold uppercase tracking-[0.14em] text-adire/70 sm:text-sm">
              The product line
            </span>
            <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl leading-tight text-ink sm:text-4xl">
              Four kits. One immersive engine.
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-sans text-lg font-semibold text-body">
              Print, AR and VR bundles for schools, museums, institutions and families. Every kit runs on
              the same app, the same 3D library and the same offline runtime as our commissioned work.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {PRODUCTS.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="focus-ring-light group block overflow-hidden rounded-[1.8rem] bg-bone shadow-[0_1px_0_rgba(23,19,15,0.06),0_16px_36px_-20px_rgba(23,19,15,0.3)] transition-transform duration-200 hover:-translate-y-2"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={product.image.src}
                    alt={product.image.alt}
                    fill
                    sizes="(min-width: 1024px) 620px, 92vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between gap-4 p-6 lg:p-7">
                  <div>
                    <span
                      className="mb-2 inline-block rounded-full px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wide"
                      style={{
                        backgroundColor: `${product.accent}26`,
                        color: product.accent === "#FFEB59" ? "#17130F" : product.accent,
                      }}
                    >
                      {product.format} kit
                    </span>
                    <h3 className="font-display text-xl font-bold leading-tight text-ink">{product.name}</h3>
                    <p className="mt-1 font-mono text-sm font-bold text-laterite-text">{product.price}</p>
                  </div>
                  <span className="focus-ring-light inline-flex shrink-0 items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 font-sans text-sm font-bold text-bone transition-transform duration-200 group-hover:translate-x-1">
                    View details
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* See it in action: real product-demo footage from the CEO drop that
          nothing on the site was using yet, in the PayPal/Mailchimp-style
          rounded video card researched on Mobbin. */}
      <section className="relative overflow-hidden bg-white pb-16 sm:pb-20 lg:pb-24">
        <div
          className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-danfo/15 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-adire/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative page-frame">
          <span className="mx-auto block text-center font-mono text-xs font-bold uppercase tracking-[0.14em] text-adire/70 sm:text-sm">
            See it in action
          </span>
          <div className="relative mx-auto mt-8 aspect-video max-w-4xl overflow-hidden rounded-[1.8rem] bg-adire-dark shadow-[0_20px_48px_-16px_rgba(23,19,15,0.4)]">
            <video className="h-full w-full object-cover" autoPlay muted loop playsInline aria-hidden="true">
              <source src="/brand/ceo/product-demo-1.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-border bg-white">
        <div className="page-frame flex flex-col items-start justify-between gap-6 py-10 sm:flex-row sm:items-center sm:py-12">
          <div className="max-w-xl">
            <h3 className="font-display text-xl leading-snug text-ink sm:text-2xl">
              Buying for a school, a museum, a gallery, or a distribution network?
            </h3>
            <p className="mt-3 font-sans text-sm font-semibold leading-relaxed text-body">
              Bulk orders are quoted per organization and include device provisioning, staff training,
              and a named point of contact for the deployment. Tell us the number of users and we will
              come back with pricing and a rollout plan.
            </p>
          </div>
          <Button href="/contact" variant="primary" className="shrink-0">
            Request organization pricing
          </Button>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white">
        <div className="page-frame">
          <p className="max-w-2xl py-6 text-center font-sans text-xs text-muted sm:mx-auto">
            Prices shown in USD. Naira pricing at checkout, inclusive of 7.5% VAT. Payment by card or
            transfer through Paystack. Delivery across Nigeria, with export shipping quoted on request.
          </p>
        </div>
      </section>

      {/* How it works: a top-rule stepper instead of the border-4 boxed-icon
          card — the same lazy pattern flagged elsewhere on the site. */}
      <section className="relative section-y overflow-hidden bg-adire-dark">
        <div className="relative page-frame">
          <div className="mx-auto mb-12 max-w-xl text-center lg:mb-16">
            <h2 className="font-display text-3xl leading-tight text-bone sm:text-4xl">How it works</h2>
            <p className="mt-4 font-sans text-lg font-semibold text-bone/75">
              Every AR kit ships ready to run. Three steps, about five minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
            {HOW_IT_WORKS.map((item, i) => {
              const accent = ["#FFEB59", "#B6502E", "#6E67B8"][i];
              return (
                <div key={item.step} className="border-t-2 pt-6" style={{ borderColor: accent }}>
                  <item.icon className="h-6 w-6" style={{ color: accent }} strokeWidth={2.2} aria-hidden="true" />
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
