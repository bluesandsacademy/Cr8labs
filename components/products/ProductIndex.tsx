import Image from "next/image";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { PRODUCTS } from "./products";

/**
 * The shop window: eight tiles, image first, name and one line, each a
 * link down to its product. Scanned in seconds, before any paragraph.
 */
export function ProductIndex() {
  return (
    <section className="px-8 py-16 md:px-16 md:py-20">
      <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:gap-x-6 lg:grid-cols-4">
        {PRODUCTS.map((product) => (
          <li key={product.slug}>
            <a href={`#${product.slug}`} className="group focus-ring-light block rounded-[6px]">
              <div className="relative aspect-square w-full overflow-hidden rounded-[6px]">
                {product.image ? (
                  <Image
                    src={product.image.src}
                    alt={product.image.alt}
                    fill
                    sizes="(min-width: 1024px) 22vw, 45vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                ) : (
                  <MediaSlot className="h-full w-full" caption={`product-${product.slug}.png`} />
                )}
                <span
                  className="absolute left-3 top-3 h-3 w-3 rounded-full"
                  style={{ backgroundColor: product.accent, boxShadow: `0 0 10px ${product.accent}88` }}
                  aria-hidden="true"
                />
              </div>
              <h2 className="mt-4 font-display text-[17px] leading-tight text-ink md:text-[19px]">
                {product.name.replace("CR8LAB ", "")}
              </h2>
              <p className="mt-1 font-sans text-[13px] leading-snug text-muted">{product.oneLine}</p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
