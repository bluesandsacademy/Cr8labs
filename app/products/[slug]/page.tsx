import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InnerPage } from "@/components/layout/InnerPage";
import { Button } from "@/components/ui/Button";
import { PRODUCTS } from "@/components/products/products-data";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: `${product.name} | CR8LAB`,
    description: product.body,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  const includesList = product.includes.replace(/\.$/, "").split(", ");
  const otherProducts = PRODUCTS.filter((p) => p.slug !== product.slug);

  return (
    <InnerPage>
      <section className="relative overflow-hidden bg-white pt-8 sm:pt-10">
        <div className="page-frame">
          <Link
            href="/products"
            className="focus-ring-light mb-6 inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-muted hover:text-ink"
          >
            ← All products
          </Link>

          {/* The image is the point of this page: a large, uncropped view of
              the real product photo (object-contain, never object-cover), with
              the buy-box a compact sidebar rather than competing for space. */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.7fr_1fr] lg:items-start lg:gap-14">
            <div
              className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] sm:aspect-[16/11]"
              style={{ background: `${product.accent}14` }}
            >
              <Image
                src={product.image.src}
                alt={product.image.alt}
                fill
                sizes="(min-width: 1024px) 900px, 92vw"
                priority
                className="object-contain p-4 sm:p-8"
              />
            </div>

            <div className="lg:sticky lg:top-28">
              <span
                className="inline-block rounded-full px-3 py-1 font-mono text-xs font-bold uppercase tracking-wide"
                style={{ backgroundColor: `${product.accent}26`, color: product.accent }}
              >
                {product.format} kit
              </span>
              <h1 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl">
                {product.name}
              </h1>
              <p className="mt-2 font-mono text-lg font-bold text-laterite-text">{product.price}</p>
              <p className="mt-5 font-sans text-base font-semibold leading-relaxed text-body">
                {product.body}
              </p>

              <ul className="mt-6 flex flex-col gap-2">
                {includesList.map((item) => (
                  <li key={item} className="flex items-start gap-2 font-sans text-sm font-semibold text-body">
                    <span className="mt-0.5 text-success" aria-hidden="true">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3">
                <Button href="/contact?route=school#form" variant="primary" className="text-center">
                  Buy now
                </Button>
                <Button href="/contact" variant="ghost" theme="light" className="text-center">
                  Request organization pricing
                </Button>
              </div>

              <p className="mt-4 font-sans text-xs text-muted">
                Prices shown in USD. Naira pricing at checkout, inclusive of 7.5% VAT.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative section-y overflow-hidden" style={{ background: "#F6F8FB" }}>
        <div className="page-frame">
          <h2 className="font-display text-2xl leading-tight text-ink sm:text-3xl">More kits</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {otherProducts.map((other) => (
              <Link
                key={other.slug}
                href={`/products/${other.slug}`}
                className="focus-ring-light block overflow-hidden rounded-2xl bg-white shadow-[0_1px_0_rgba(23,19,15,0.06),0_12px_28px_-18px_rgba(23,19,15,0.25)] transition-transform duration-200 hover:-translate-y-1.5"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image src={other.image.src} alt={other.image.alt} fill sizes="(min-width: 1024px) 340px, 90vw" className="object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-base font-bold leading-tight text-ink">{other.name}</h3>
                  <p className="mt-1 font-mono text-sm font-bold text-laterite-text">{other.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </InnerPage>
  );
}
