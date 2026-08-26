"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * The opening of every inner page, in the world's own language. Home dives
 * through the headset; every page after it opens on a portal: a great ring
 * off the right edge, holding the page's photograph (or its own device,
 * which brings its own rings), circled by a thin ring and a slow dashed
 * orbit. The headline is set very large and arrives word by word; the
 * kicker draws in; the portal breathes in. As you scroll out, the text
 * lifts away and the portal drifts slower, the same parallax logic as the
 * hero on Home. Everything is visible at rest and every motion is gated
 * behind reduced motion.
 */
export function PageHero({
  kicker,
  title,
  lede,
  image,
  device,
}: {
  kicker?: string;
  title: string;
  lede: string;
  /** A photograph shown through the portal. */
  image?: { src: string; alt: string };
  /** A page's own graphic (rings, planets, routes) in place of the portal. */
  device?: ReactNode;
}) {
  const rootRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const visualRef = useRef<HTMLDivElement | null>(null);
  const words = title.split(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const root = rootRef.current;
        if (!root) return;
        const entrance = gsap.timeline({ defaults: { ease: "power3.out" } });
        entrance
          .from(root.querySelectorAll("[data-hero-kicker]"), { opacity: 0, x: -16, duration: 0.6 }, 0)
          .from(root.querySelectorAll("[data-hero-word]"), { opacity: 0, y: 46, duration: 0.9, stagger: 0.045 }, 0.1)
          .from(root.querySelectorAll("[data-hero-lede]"), { opacity: 0, y: 18, duration: 0.7 }, 0.55)
          .from(visualRef.current, { opacity: 0, scale: 0.94, duration: 1.2, ease: "power2.out" }, 0.2)
          .from(root.querySelectorAll("[data-hero-cue]"), { opacity: 0, duration: 0.6 }, 1.1);

        // Scrolling out: the copy lifts and fades, the portal drifts slower.
        gsap.to(textRef.current, {
          y: -80,
          opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(visualRef.current, {
          y: 70,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={rootRef}
      className="relative flex min-h-dvh items-center overflow-hidden px-8 pb-20 pt-32 md:px-16 lg:pb-0 lg:pt-0"
    >
      <div className="grid w-full grid-cols-1 items-center gap-y-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-x-8">
        <div ref={textRef} className="relative z-10">
          {kicker && (
            <div data-hero-kicker className="mb-6 flex items-center gap-3">
              <span className="relative flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border-[1.5px] border-danfo">
                <span className="h-1 w-1 rounded-full bg-danfo" />
              </span>
              <span className="h-px w-10 bg-danfo/60" aria-hidden="true" />
              <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-danfo">{kicker}</p>
            </div>
          )}
          <h1 className="max-w-[12ch] font-display text-[clamp(46px,7.4vw,108px)] leading-[0.98] tracking-tight text-bone">
            {words.map((word, i) => (
              <span key={i} className="inline-block whitespace-pre">
                <span data-hero-word className="inline-block">
                  {word}
                </span>
                {i < words.length - 1 ? " " : ""}
              </span>
            ))}
          </h1>
          <p
            data-hero-lede
            className="mt-8 max-w-120 font-sans text-[17px] leading-relaxed text-bone/75 md:text-[19px]"
          >
            {lede}
          </p>
        </div>

        <div ref={visualRef} className="relative mx-auto w-full max-w-105 lg:max-w-none lg:translate-x-[6%]">
          {image ? (
            <div className="relative mx-auto aspect-square w-full max-w-[78vh]">
              {/* The portal: a thin ring and a slow dashed orbit around the photograph. */}
              <div className="pointer-events-none absolute -inset-[6%] rounded-full border border-adire-light/40" aria-hidden="true" />
              <div
                className="pointer-events-none absolute -inset-[13%] rounded-full border border-dashed border-adire-light/25 motion-safe:animate-[orbit_160s_linear_infinite]"
                aria-hidden="true"
              />
              <span
                className="absolute left-1/2 -top-[6%] z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-danfo motion-safe:animate-[pulse-soft_3.5s_ease-in-out_infinite]"
                aria-hidden="true"
              />
              <div className="relative h-full w-full overflow-hidden rounded-full shadow-[0_0_80px_-20px_rgba(245,166,35,0.45)]">
                <Image src={image.src} alt={image.alt} fill priority sizes="(min-width: 1024px) 78vh, 90vw" className="object-cover" />
                <div
                  className="pointer-events-none absolute inset-0 rounded-full"
                  style={{ boxShadow: "inset 0 0 120px 30px rgba(33,29,84,0.55)" }}
                  aria-hidden="true"
                />
              </div>
            </div>
          ) : (
            device
          )}
        </div>
      </div>

      <div data-hero-cue className="absolute bottom-8 left-8 hidden items-center gap-3 md:left-16 lg:flex" aria-hidden="true">
        <span className="relative flex h-7 w-4 items-start justify-center rounded-full border border-bone/35 pt-1.5">
          <span className="h-1 w-1 rounded-full bg-danfo motion-safe:animate-[float_2.2s_ease-in-out_infinite_reverse]" />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-bone/50">Scroll</span>
      </div>
    </header>
  );
}
