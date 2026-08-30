import { Users, HelpCircle, FlaskConical, Glasses } from "lucide-react";
import { Button } from "@/components/ui/Button";

// Names from the Home teaser, one-liners are each product's own opening
// sentence from the Products page section further down the same brief.
const PRODUCTS = [
  { name: "Into the Community", line: "Five vivid AR stories about the places we live in.", accent: "#FFEB59", icon: Users },
  { name: "Into the Curiosity Q", line: "Vivid virtual experiences that make big ideas click.", accent: "#2C276C", icon: HelpCircle },
  { name: "AR Science Lab", line: "An eight-book AR science series across four subjects.", accent: "#B6502E", icon: FlaskConical },
  { name: "Experience Africa", line: "Headset-led virtual worlds, shipped as a ready-to-run VR kit.", accent: "#6E67B8", icon: Glasses },
];

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

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {PRODUCTS.map((product) => (
            <div
              key={product.name}
              className="rounded-[1.8rem] border-4 bg-white p-6 shadow-[0_8px_0_rgba(23,19,15,0.08)] transition-transform duration-200 hover:-translate-y-2"
              style={{ borderColor: product.accent }}
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-2xl shadow-md"
                style={{ backgroundColor: product.accent }}
                aria-hidden="true"
              >
                <product.icon
                  className="h-6 w-6"
                  style={{ color: product.accent === "#FFEB59" ? "#17130F" : "#F3ECDE" }}
                  strokeWidth={2.2}
                />
              </span>
              <h3 className="mt-4 font-display text-base font-bold leading-tight text-ink">
                {product.name}
              </h3>
              <p className="mt-2 font-sans text-sm font-semibold leading-relaxed text-body">
                {product.line}
              </p>
            </div>
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
