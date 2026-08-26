import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { RingList } from "@/components/ui/RingList";

export type Product = {
  slug: string;
  name: string;
  oneLine: string;
  whatItIs: string;
  audiences: string[];
  keyPoints: string[];
  cta: { label: string; href: string };
  accent: string;
  /** `contain` for a packshot with a transparent background (floats on a glow); `cover` for a photograph. */
  image: { src: string; alt: string; fit: "contain" | "cover" } | null;
};

/** The glow behind a packshot: the product lit from within the world, on any tone. */
const PACKSHOT_BACKDROP =
  "radial-gradient(circle at 50% 55%, rgba(245,166,35,0.30) 0%, rgba(44,39,108,0.55) 45%, rgba(23,19,15,0.92) 100%)";

export function ProductPicture({
  image,
  sizes,
  className = "",
}: {
  image: NonNullable<Product["image"]>;
  sizes: string;
  className?: string;
}) {
  if (image.fit === "cover") {
    return <Image src={image.src} alt={image.alt} fill sizes={sizes} className={`object-cover ${className}`} />;
  }
  return (
    <div className="absolute inset-0" style={{ background: PACKSHOT_BACKDROP }}>
      <Image src={image.src} alt={image.alt} fill sizes={sizes} className={`object-contain p-[9%] ${className}`} />
    </div>
  );
}

const TONE = {
  light: { name: "text-ink", line: "text-adire", body: "text-muted", chip: "border-border text-body", list: "light" as const, cta: "dark" as const },
  adire: { name: "text-bone", line: "text-danfo", body: "text-bone/60", chip: "border-adire-light/40 text-bone/85", list: "dark" as const, cta: "light" as const },
  ink: { name: "text-bone", line: "text-danfo", body: "text-bone/60", chip: "border-bone/20 text-bone/85", list: "dark" as const, cta: "light" as const },
} as const;

/** The product photograph in its frame, with the monogram badge on its corner. */
export function ProductImage({ product, sizes }: { product: Product; sizes: string }) {
  return (
    <div className="relative">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[6px]">
        {product.image ? (
          <ProductPicture image={product.image} sizes={sizes} />
        ) : (
          <MediaSlot className="h-full w-full" caption={`Placeholder: product-${product.slug}.png`} />
        )}
      </div>
      <span
        className="absolute -left-4 -top-4 flex h-14 w-14 items-center justify-center rounded-full border-2 bg-bone"
        style={{ borderColor: product.accent }}
        aria-hidden="true"
      >
        <span className="absolute inset-2 rounded-full border opacity-40" style={{ borderColor: product.accent }} />
        <span className="font-display text-[20px]" style={{ color: product.accent }}>
          {product.name.replace("CR8LAB ", "")[0]}
        </span>
      </span>
    </div>
  );
}

/**
 * One product, built to be scanned: the photograph carries half the width,
 * then name, one line, who it is for as chips, three points, the action.
 * The deck's full paragraph is there for whoever reads on, set small and
 * last. Image side alternates down the page.
 */
export function ProductSection({
  product,
  tone,
  imageSide,
}: {
  product: Product;
  tone: keyof typeof TONE;
  imageSide: "left" | "right";
}) {
  const t = TONE[tone];
  return (
    // py-20 on phones: the monogram badge overhangs the image by 16px, and the
    // image comes first there, so 80px keeps the badge clear of the 60px
    // tone-edge band at the section's top.
    <section id={product.slug} className="scroll-mt-24 px-8 py-20 md:px-16 md:py-24">
      <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
        <div className={imageSide === "right" ? "lg:order-last" : ""}>
          <ProductImage product={product} sizes="(min-width: 1024px) 45vw, 90vw" />
        </div>

        <div>
          <h2 className={`font-display text-[34px] leading-[1.04] md:text-[48px] ${t.name}`}>{product.name}</h2>
          <p className={`mt-4 max-w-120 font-display text-[21px] leading-snug md:text-[26px] ${t.line}`}>
            {product.oneLine}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Who it is for">
            {product.audiences.map((audience) => (
              <li
                key={audience}
                className={`rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wide ${t.chip}`}
              >
                {audience}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <RingList items={product.keyPoints} tone={t.list} />
          </div>

          <div className="mt-9">
            <Button href={product.cta.href} variant={t.cta} theme={tone === "light" ? "light" : "dark"}>
              {product.cta.label}
            </Button>
          </div>

          <p className={`mt-9 max-w-130 font-sans text-[14px] leading-relaxed ${t.body}`}>{product.whatItIs}</p>
        </div>
      </div>
    </section>
  );
}
