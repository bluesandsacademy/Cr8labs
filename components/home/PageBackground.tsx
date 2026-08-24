"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Tone = "light" | "adire" | "ink";
const TONES: readonly Tone[] = ["light", "adire", "ink"];

/**
 * The one background for the whole landing page. It is position: fixed and
 * never scrolls: after the opening dive into the headset, the visitor is
 * "inside" and stays there, with content arriving over a world that holds
 * still. Where the world needs to change tone (dark glow to bone to indigo to
 * ink), it crossfades gently, scrubbed to the incoming section's arrival, and
 * the outgoing section's content dissolves in the same range so text never
 * sits on a background that has stopped suiting it.
 *
 * Sections opt in by carrying `data-tone="light" | "adire" | "ink"` on a
 * wrapper; the opening dive reads `[data-immersive-zone]` and its two
 * `[data-scene]` children. No GSAP `pin` anywhere (see git history: pin's
 * spacer collapsed an absolutely-positioned background to zero width); the
 * fixed layer needs none.
 */
export function PageBackground() {
  const headsetRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const vignetteRef = useRef<HTMLDivElement | null>(null);
  const lightRef = useRef<HTMLDivElement | null>(null);
  const adireRef = useRef<HTMLDivElement | null>(null);
  const inkRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const layers: Record<Tone, HTMLDivElement | null> = {
      light: lightRef.current,
      adire: adireRef.current,
      ink: inkRef.current,
    };
    const zone = document.querySelector<HTMLElement>("[data-immersive-zone]");
    const heroScene = document.querySelector<HTMLElement>('[data-scene="hero"]');
    const trustScene = document.querySelector<HTMLElement>('[data-scene="trust"]');
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-tone]"));

    // The fixed nav reads this to flip between its dark and light treatments.
    const setNavTone = (tone: Tone | "glow") => {
      root.dataset.tone = tone === "light" ? "light" : "dark";
    };
    setNavTone("glow");

    // Walk the sections in document order and put a crossfade at every point
    // the tone changes. Same-tone neighbours get no trigger at all, so nothing
    // can fight over a layer's opacity.
    const buildBoundaries = (animate: boolean) => {
      let prevTone: Tone | "glow" = "glow";
      let prevEl: HTMLElement | null = trustScene;

      for (const el of sections) {
        const tone = el.dataset.tone as Tone;
        if (!TONES.includes(tone)) continue;

        if (tone !== prevTone) {
          const from = prevTone;
          const outgoing = prevEl;

          if (animate) {
            const tl = gsap.timeline({
              scrollTrigger: { trigger: el, start: "top 90%", end: "top 35%", scrub: 1 },
            });
            tl.to(layers[tone], { opacity: 1, ease: "none" }, 0);
            if (from !== "glow") tl.to(layers[from], { opacity: 0, ease: "none" }, 0);
            if (outgoing) tl.to(outgoing, { opacity: 0, ease: "none" }, 0);
          } else {
            ScrollTrigger.create({
              trigger: el,
              start: "top 60%",
              onEnter: () => {
                gsap.set(layers[tone], { opacity: 1 });
                if (from !== "glow") gsap.set(layers[from], { opacity: 0 });
              },
              onLeaveBack: () => {
                gsap.set(layers[tone], { opacity: 0 });
                if (from !== "glow") gsap.set(layers[from], { opacity: 1 });
              },
            });
          }

          ScrollTrigger.create({
            trigger: el,
            start: "top 60%",
            onEnter: () => setNavTone(tone),
            onLeaveBack: () => setNavTone(from),
          });
        }

        prevTone = tone;
        prevEl = el;
      }
    };

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // The dive: one timeline scrubbed over the first viewport of scroll.
        // Explicit durations keep the position labels honest fractions of the
        // range (see git history for the measured bug that motivated this).
        if (zone && heroScene && trustScene) {
          const tl = gsap.timeline({
            scrollTrigger: { trigger: zone, start: "top top", end: "+=100%", scrub: 1 },
          });
          tl.to(headsetRef.current, { scale: 2.2, duration: 0.55, ease: "none" }, 0)
            .to(heroScene, { opacity: 0, y: -40, duration: 0.28, ease: "none" }, 0)
            .to(glowRef.current, { opacity: 1, duration: 0.3, ease: "none" }, 0.15)
            .to(vignetteRef.current, { opacity: 0, duration: 0.25, ease: "none" }, 0.18)
            .to(headsetRef.current, { opacity: 0, duration: 0.3, ease: "none" }, 0.32)
            .fromTo(
              trustScene,
              { opacity: 0, y: 40 },
              { opacity: 1, y: 0, duration: 0.45, ease: "none" },
              0.55
            );
        }
        buildBoundaries(true);
      });

      // Reduced motion: no dive (headset at rest, both scenes simply visible)
      // and tone changes switch instantly instead of crossfading. The fixed
      // background itself isn't motion, so it stays.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        buildBoundaries(false);
      });
    });

    return () => {
      ctx.revert();
      delete root.dataset.tone;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-adire-dark" aria-hidden="true">
      {/* What you dive toward. transform-origin sits on the ring-light's center. */}
      <div ref={headsetRef} className="absolute inset-0" style={{ transformOrigin: "50% 48%" }}>
        <Image
          src="/brand/hero-headset.png"
          alt="An unworn VR headset resting in darkness, concentric rings of warm golden light radiating outward from it into a dark, softly lit void"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
      </div>

      {/* What you arrive in: the same ring-light continued as an abstract glow. */}
      <div
        ref={glowRef}
        className="absolute inset-0 opacity-0"
        style={{
          background:
            "radial-gradient(circle at 50% 48%, rgba(245,166,35,0.32) 0%, rgba(44,39,108,0.6) 40%, rgba(23,19,15,0.98) 78%)",
        }}
      />
      <div
        ref={vignetteRef}
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,8,20,0.8)_0%,rgba(10,8,20,0.4)_45%,rgba(10,8,20,0.05)_70%)]"
      />

      {/* Tone layers, crossfaded in over the glow as sections arrive. Each
          carries a fixed ring so the world visibly holds still while content
          moves across it. */}
      <div ref={lightRef} className="absolute inset-0 bg-bone opacity-0">
        <div className="absolute -right-[18vw] top-1/2 h-[92vh] w-[92vh] -translate-y-1/2 rounded-full border-[30px] border-adire/[0.045]" />
        <div className="absolute -right-[18vw] top-1/2 h-[92vh] w-[92vh] -translate-y-1/2 scale-[0.72] rounded-full border-[3px] border-adire/[0.07]" />
      </div>
      <div ref={adireRef} className="absolute inset-0 bg-adire-dark opacity-0">
        <div className="absolute -left-[14vw] -top-[30vh] h-[110vh] w-[110vh] rounded-full border-[3px] border-adire-light/15" />
        <div className="absolute -left-[6vw] -top-[18vh] h-[80vh] w-[80vh] rounded-full border border-dashed border-adire-light/20" />
      </div>
      <div ref={inkRef} className="absolute inset-0 bg-ink opacity-0">
        <div
          className="absolute left-1/2 top-1/2 h-[120vh] w-[120vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(245,166,35,0.14) 0%, rgba(245,166,35,0) 60%)",
          }}
        />
        <div className="absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-danfo/10" />
      </div>

      <svg className="absolute inset-0 opacity-[0.06] mix-blend-overlay" width="100%" height="100%">
        <filter id="page-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#page-noise)" />
      </svg>
    </div>
  );
}
