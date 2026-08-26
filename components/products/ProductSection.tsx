import { Button } from "@/components/ui/Button";
import { RingList } from "@/components/ui/RingList";

export type Product = {
  name: string;
  oneLine: string;
  whatItIs: string;
  whoFor: string;
  keyPoints: string[];
  cta: { label: string; href: string };
  accent: string;
};

const TONE = {
  light: { name: "text-ink", line: "text-adire", body: "text-body", label: "text-muted", who: "text-ink", list: "light" as const, cta: "dark" as const },
  adire: { name: "text-bone", line: "text-danfo", body: "text-bone/80", label: "text-adire-caption", who: "text-bone", list: "dark" as const, cta: "light" as const },
  ink: { name: "text-bone", line: "text-danfo", body: "text-bone/80", label: "text-bone/55", who: "text-bone", list: "dark" as const, cta: "light" as const },
} as const;

/**
 * One product, in the deck's own structure: the name and one-line pinned on
 * lg beside what it is, who it is for, the key points as a ring list, and
 * the deck's call to action. The monogram is the product's initial in the
 * system's ring frame, as on Home.
 */
export function ProductSection({ product, tone }: { product: Product; tone: keyof typeof TONE }) {
  const t = TONE[tone];
  return (
    <section className="px-8 py-16 md:px-16 md:py-24">
      <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-[1fr_1.4fr]">
        <div className="self-start lg:sticky lg:top-28">
          <div
            className="relative mb-6 flex h-12 w-12 items-center justify-center rounded-full border-2"
            style={{ borderColor: product.accent }}
            aria-hidden="true"
          >
            <div className="absolute inset-1.5 rounded-full border opacity-40" style={{ borderColor: product.accent }} />
            <span className="font-display text-[18px]" style={{ color: product.accent }}>
              {product.name.replace("CR8LAB ", "")[0]}
            </span>
          </div>
          <h2 className={`font-display text-[32px] leading-[1.06] md:text-[44px] ${t.name}`}>{product.name}</h2>
          <p className={`mt-4 max-w-100 font-display text-[19px] leading-snug md:text-[22px] ${t.line}`}>
            {product.oneLine}
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <p className={`font-sans text-[17px] leading-relaxed md:text-[19px] ${t.body}`}>{product.whatItIs}</p>
          <div>
            <p className={`mb-2 font-mono text-[11px] font-semibold uppercase tracking-widest ${t.label}`}>
              Who it is for
            </p>
            <p className={`font-sans text-[16px] leading-relaxed md:text-[17px] ${t.who}`}>{product.whoFor}</p>
          </div>
          <RingList items={product.keyPoints} tone={t.list} />
          <div>
            <Button href={product.cta.href} variant={t.cta} theme={tone === "light" ? "light" : "dark"}>
              {product.cta.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
