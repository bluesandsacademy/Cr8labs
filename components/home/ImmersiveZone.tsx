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
  const headsetWrapRef = useRef<HTMLDivElement | null>(null);
  const insideGlowRef = useRef<HTMLDivElement | null>(null);
  const vignetteRef = useRef<HTMLDivElement | null>(null);
  const heroSceneRef = useRef<HTMLDivElement | null>(null);
  const trustSceneRef = useRef<HTMLDivElement | null>(null);

  // The background pins via plain CSS `position: sticky`, not GSAP's `pin` (see the
  // git history on this file for why - GSAP's pin wraps its target in a synthetic
  // spacer that collapsed to zero width for an absolutely-positioned element,
  // verified with a real browser). A sticky element stays pinned for exactly
  // (containing block height - its own height), so the zone's height is set to
  // (measured content height + background height) from the real DOM, re-measured
  // on resize, rather than a guessed vh figure.
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

  // One master timeline, scrubbed to how far the visitor has scrolled through the
  // zone (not per-element triggers): the headset zooms in as if the camera is
  // diving toward its lens, the headline recedes early, the photo crossfades into
  // an abstract "inside the lens" glow partway through, then the trust bar arrives
  // once we're through. Choreographing it as fractions of one timeline keeps the
  // sequence's relative timing intact regardless of how tall the zone ends up
  // being on a given screen. No `pin` is used here either - just tweening opacity/
  // scale on plain elements, the same low-risk pattern the scene fades already used
  // successfully.
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // The sticky background itself is never gated behind reduced motion (it
      // doesn't move on its own, so it isn't "motion" in the sense this preference
      // targets), but the whole dive sequence - zoom, crossfade, fades - very much
      // is, so it's skipped entirely: reduced-motion visitors see the headset at
      // rest, the inside glow never appears, and both scenes are simply visible.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: zoneRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });

        // Every tween gets an explicit duration so the position labels below are
        // real fractions of the full 0-to-1 scrubbed range, not GSAP's default
        // 0.5-duration guess - which, left unset, compressed the whole sequence
        // into the first ~95% of the scroll and finished the headline fade earlier
        // than intended (caught by re-measuring in a real browser, not by reasoning
        // about it). The last tween now ends at exactly 1, using the whole range.
        tl.to(headsetWrapRef.current, { scale: 2.2, duration: 0.55, ease: "none" }, 0)
          .to(heroSceneRef.current, { opacity: 0, y: -40, duration: 0.28, ease: "none" }, 0)
          .to(insideGlowRef.current, { opacity: 1, duration: 0.3, ease: "none" }, 0.15)
          .to(vignetteRef.current, { opacity: 0, duration: 0.25, ease: "none" }, 0.18)
          .to(headsetWrapRef.current, { opacity: 0, duration: 0.3, ease: "none" }, 0.32)
          .fromTo(
            trustSceneRef.current,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.45, ease: "none" },
            0.55
          );
      });
    }, zoneRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={zoneRef} className="relative bg-adire-dark">
      <div ref={bgRef} className="sticky top-0 z-0 h-dvh w-full overflow-hidden">
        <svg className="absolute inset-0 z-30 opacity-[0.06] mix-blend-overlay" width="100%" height="100%" aria-hidden="true">
          <filter id="immersive-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#immersive-noise)" />
        </svg>

        {/* What you're diving toward: the headset photo, scaling up as you scroll.
            transform-origin is set to where the ring-light actually sits in this
            source image (right-of-center), matching the radial gradient center
            below, so the zoom pushes toward the lens instead of the frame's dead
            center - the current asset is composed off-center; a centered
            replacement would make this closer to 50% 50%. */}
        <div
          ref={headsetWrapRef}
          className="absolute inset-0 z-10"
          style={{ transformOrigin: "55% 45%" }}
        >
          <Image
            src="/brand/hero-immersive-bg.png"
            alt="A person from behind putting on a VR headset, concentric rings of warm golden light radiating from the lens into a dark, softly lit void"
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        </div>

        {/* What you arrive in: an abstract continuation of the same ring-light,
            crossfaded in once the dive is underway, so there's never a hard cut
            from "photo" to "abstract glow". */}
        <div
          ref={insideGlowRef}
          className="absolute inset-0 z-20 opacity-0"
          style={{
            background:
              "radial-gradient(circle at 55% 45%, rgba(245,166,35,0.32) 0%, rgba(44,39,108,0.6) 40%, rgba(23,19,15,0.98) 78%)",
          }}
          aria-hidden="true"
        />

        <div
          ref={vignetteRef}
          className="absolute inset-0 z-20 bg-[linear-gradient(90deg,rgba(10,8,20,0.8)_0%,rgba(10,8,20,0.4)_45%,rgba(10,8,20,0.05)_70%)]"
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
