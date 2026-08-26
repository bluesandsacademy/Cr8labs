import type { Metadata } from "next";
import { InnerPage } from "@/components/layout/InnerPage";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { PlanetarySystem } from "@/components/ui/PlanetarySystem";
import { ProductSection } from "@/components/products/ProductSection";
import { HardwareStrip } from "@/components/products/HardwareStrip";
import { PRODUCTS } from "@/components/products/products";

export const metadata: Metadata = {
  title: "Products | Books, AR, VR, Labs, AI, Studio, Creator, Library",
  description:
    "Eight CR8LAB products sharing one content library. Interactive books, AR and VR experiences, virtual science labs, an AI companion and creation tools for teachers and students.",
};

/** Products in pairs on alternating worlds, so the page breathes. */
const TONES = ["light", "light", "adire", "adire", "light", "light", "ink", "ink"] as const;

export default function ProductsPage() {
  // Group consecutive same-tone products under one wrapper so there is one
  // tone edge per pair, not per product.
  const groups: { tone: (typeof TONES)[number]; items: number[] }[] = [];
  TONES.forEach((tone, i) => {
    const last = groups[groups.length - 1];
    if (last && last.tone === tone) last.items.push(i);
    else groups.push({ tone, items: [i] });
  });

  return (
    <InnerPage>
      <PageHero
        title="Eight products. One library. One account."
        lede="Start with a book or run the full stack. Everything draws on the same content library, so what you buy this term keeps getting better as the library grows."
        device={
          <PlanetarySystem
            idPrefix="products"
            className="hidden lg:block"
            image={{
              src: "/brand/platform-scan.png",
              alt: "Hands holding a phone over an open picture book while a small 3D forest scene rises off the page in warm golden light",
            }}
          />
        }
      />

      {groups.map((group) => (
        <div key={group.items[0]} data-tone={group.tone}>
          {group.items.map((i) => (
            <Reveal key={PRODUCTS[i].name}>
              <ProductSection product={PRODUCTS[i]} tone={group.tone} />
            </Reveal>
          ))}
          {group.items.includes(7) && (
            <Reveal>
              <HardwareStrip />
            </Reveal>
          )}
        </div>
      ))}
    </InnerPage>
  );
}
