import Image from "next/image";
import { Button } from "@/components/ui/Button";

/**
 * Labs is the experimental arm, so it borrows the 404 page's language of
 * unassembled work: an ink band where the image sits in a circle orbited by
 * dashed, off-rotation rings (ideas still in motion, not yet locked into the
 * solid ring the products get).
 */
export function LabsSection() {
  return (
    <section className="relative overflow-hidden bg-ink px-8 py-16 md:px-16 md:py-24">
      <div className="grid grid-cols-1 items-center gap-x-20 gap-y-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="relative order-last mx-auto w-full max-w-100 lg:order-first">
          <div
            className="pointer-events-none absolute -inset-6 rounded-full border-2 border-dashed border-adire-light/40"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -inset-12 rounded-full border border-dashed border-adire-light/20"
            aria-hidden="true"
          />
          <div className="relative aspect-square w-full overflow-hidden rounded-full">
            <Image
              src="/brand/lab-world.png"
              alt="A stylized 3D diorama of a West African lagoon community on a floating island of red earth: canoes, market stalls, a baobab tree and a solar microgrid under an indigo night sky"
              fill
              sizes="(min-width: 1024px) 400px, 90vw"
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-widest text-danfo">
            CR8LAB Labs
          </p>
          <h2 className="max-w-140 font-display text-[32px] leading-[1.1] text-bone md:text-[44px]">
            Not every idea starts with a client
          </h2>
          <p className="mt-6 max-w-140 font-sans text-[16px] leading-relaxed text-bone/75 md:text-[17px]">
            Labs is where we build our own intellectual property. Living books, digital heritage,
            African STEM worlds, historical reconstructions and accessibility research. Some of it
            becomes product. All of it makes the commissioned work better.
          </p>
          <div className="mt-9">
            <Button href="/labs" variant="primary">
              Go into the Labs
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
