"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { ProductPicture } from "./ProductSection";
import { PRODUCTS } from "./products";

gsap.registerPlugin(ScrollTrigger);

/**
 * The shop window as a rail. On large screens with motion allowed, the
 * section pins for one viewport and the eight tiles slide sideways as you
 * scroll down, scrubbed to the scrollbar, so browsing the range is the
 * scroll itself. Everywhere else (phones, reduced motion) it is an ordinary
 * swipeable rail with snap points: the same tiles, no pin, no scrub.
 *
 * Rendered outside Reveal on purpose: a pinned element cannot sit inside a
 * transformed ancestor, and Reveal leaves one behind.
 */
export function ProductRail() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLUListElement | null>(null);
  const progressRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;
        const distance = () => Math.max(0, track.scrollWidth - section.clientWidth + 128);
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressRef.current) progressRef.current.style.transform = `scaleX(${self.progress})`;
            },
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-16 md:py-20 lg:flex lg:h-dvh lg:flex-col lg:justify-center lg:py-0"
      aria-label="The eight products"
    >
      <div className="mb-8 flex items-center gap-4 px-8 md:px-16">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-adire">Eight products</p>
        <span className="relative hidden h-px flex-1 bg-border lg:block" aria-hidden="true">
          <span
            ref={progressRef}
            className="absolute inset-0 origin-left bg-danfo"
            style={{ transform: "scaleX(0)" }}
          />
        </span>
        <span className="relative hidden h-3.5 w-3.5 items-center justify-center rounded-full border-[1.5px] border-adire lg:flex" aria-hidden="true">
          <span className="h-1 w-1 rounded-full bg-adire" />
        </span>
      </div>

      {/* Phones and reduced motion: a native, snapping, swipeable rail. Large
          screens with motion: overflow visible so GSAP can slide the whole
          track while the section clips it. */}
      <div className="overflow-x-auto px-8 pb-2 [scrollbar-width:none] md:px-16 lg:motion-safe:overflow-visible lg:motion-safe:pb-0">
        <ul ref={trackRef} className="flex w-max snap-x snap-mandatory gap-5 md:gap-6">
          {PRODUCTS.map((product) => (
            <li key={product.slug} className="w-[68vw] shrink-0 snap-start sm:w-[46vw] lg:w-[26vw] lg:max-w-105">
              <a href={`#${product.slug}`} className="group focus-ring-light block rounded-[6px]">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[6px]">
                  {product.image ? (
                    <ProductPicture
                      image={product.image}
                      sizes="(min-width: 1024px) 26vw, 68vw"
                      className="transition-transform duration-500 group-hover:scale-[1.04]"
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
                <h2 className="mt-4 font-display text-[19px] leading-tight text-ink md:text-[22px]">
                  {product.name.replace("CR8LAB ", "")}
                </h2>
                <p className="mt-1 font-sans text-[13px] leading-snug text-muted md:text-[14px]">{product.oneLine}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
