"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Hero } from "./Hero";
import { TrustBar } from "./TrustBar";

gsap.registerPlugin(ScrollTrigger);

export function ImmersiveZone() {
  const zoneRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const heroSceneRef = useRef<HTMLDivElement | null>(null);
  const trustSceneRef = useRef<HTMLDivElement | null>(null);

  // The background pins via plain CSS `position: sticky`, not GSAP's `pin`. GSAP's
  // pin wraps its target in a synthetic spacer div; because the background was
  // previously absolutely positioned (for its own inset-x-0 sizing), that spacer's
  // measured size collapsed to zero width, and so did the background inside it -
  // verified with a real browser, not just reasoned about. Sticky has no such trap
  // and every browser already implements it correctly. GSAP stays in charge of the
  // scene fades below, which don't have this problem.
  //
  // A sticky element stays pinned for (containing block height - its own height).
  // We want it pinned for exactly as long as the two scenes take to scroll past, so
  // the zone's height is set to (measured content height + background height) from
  // the real DOM, not a guessed vh figure - and re-measured on resize.
  useEffect(() => {
    const updateZoneHeight = () => {
      if (!zoneRef.current || !contentRef.current || !bgRef.current) return;
      const contentHeight = contentRef.current.offsetHeight;
      const bgHeight = bgRef.current.offsetHeight;
      zoneRef.current.style.height = `${contentHeight + bgHeight}px`;
    };

    updateZoneHeight();

    const resizeObserver = new ResizeObserver(updateZoneHeight);
    if (contentRef.current) resizeObserver.observe(contentRef.current);
    window.addEventListener("resize", updateZoneHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateZoneHeight);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Only the scrubbed fade/rise is gated behind reduced-motion. The sticky
      // background itself never moves or animates - it just stays put - so it
      // isn't the kind of motion this preference is about, and keeping it avoids
      // an SSR/client mismatch we'd otherwise get from toggling layout mode on a
      // client-only media query.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        for (const sceneRef of [heroSceneRef, trustSceneRef]) {
          gsap.fromTo(
            sceneRef.current,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: sceneRef.current,
                start: "top 85%",
                end: "top 45%",
                scrub: true,
              },
            }
          );
        }
      });
    }, zoneRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={zoneRef} className="relative bg-adire-dark">
      <div ref={bgRef} className="sticky top-0 z-0 h-dvh w-full overflow-hidden">
        <svg className="absolute inset-0 z-20 opacity-[0.06] mix-blend-overlay" width="100%" height="100%" aria-hidden="true">
          <filter id="immersive-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#immersive-noise)" />
        </svg>
        <Image
          src="/brand/hero-immersive-bg.png"
          alt="A person from behind putting on a VR headset, concentric rings of warm golden light radiating from the lens into a dark, softly lit void"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div
          className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(10,8,20,0.8)_0%,rgba(10,8,20,0.4)_45%,rgba(10,8,20,0.05)_70%)]"
          aria-hidden="true"
        />
      </div>

      <div ref={contentRef} className="absolute inset-x-0 top-0 z-10">
        <div ref={heroSceneRef} className="flex min-h-dvh items-center">
          <Hero />
        </div>
        <div ref={trustSceneRef} className="flex min-h-dvh items-center">
          <div className="w-full">
            <TrustBar theme="dark" />
          </div>
        </div>
      </div>
    </section>
  );
}
