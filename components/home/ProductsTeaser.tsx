import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PRODUCTS } from "@/components/products/products-data";

/**
 * Real product photos, shown whole (object-contain, same rule as each
 * product's own page: never crop the thing we're trying to sell), on a
 * bigger two-up card so there's room for the full image at a real size.
 */
export function ProductsTeaser() {
  return (
    <section className="relative section-y overflow-hidden" style={{ background: "#FFFBF0" }}>
      <div className="relative page-frame">
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <span className="inline-block font-mono text-xs font-bold uppercase tracking-[0.14em] text-adire/70 sm:text-sm">
            Products
          </span>
          <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl">
            Buy the engine off the shelf.
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-sans text-lg font-semibold text-body">
            Four ready-made kits, built on the same engine as our commissioned work. Print, AR and VR
            bundles for schools, institutions and families, all on the same app, the same 3D library and
            the same offline runtime.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PRODUCTS.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="focus-ring-light group block overflow-hidden rounded-[1.8rem] bg-white shadow-[0_1px_0_rgba(23,19,15,0.06),0_16px_36px_-20px_rgba(23,19,15,0.3)] transition-transform duration-200 hover:-translate-y-2"
            >
              <div
                className="relative aspect-[4/3] w-full"
                style={{ background: `${product.accent}14` }}
              >
                <Image
                  src={product.image.src}
                  alt={product.image.alt}
                  fill
                  sizes="(min-width: 1024px) 620px, 92vw"
                  className="object-contain p-6 transition-transform duration-300 group-hover:scale-[1.03]"
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
                <span className="focus-ring-light shrink-0 rounded-full bg-ink px-5 py-2.5 font-sans text-sm font-bold text-bone">
                  View details
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center lg:mt-16">
          <Button href="/products" variant="dark">
            See all products
          </Button>
        </div>
      </div>
    </section>
  );
}
