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
  const heroSceneRef = useRef<HTMLDivElement | null>(null);
  const trustSceneRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // The fixed background only pins/scrubs for visitors who haven't asked for
      // reduced motion. Under reduced motion (or when the query can't be evaluated,
      // e.g. very old browsers) everything just renders in normal document flow.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Background stays pinned for exactly as long as the two scenes take to
        // scroll past, measured from the real DOM (not a guessed vh number) - pin
        // duration = zone's rendered height, since the background is absolutely
        // positioned and contributes nothing to that height itself.
        ScrollTrigger.create({
          trigger: zoneRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: bgRef.current,
          pinSpacing: false,
        });

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
      <div ref={bgRef} className="absolute inset-x-0 top-0 z-0 h-dvh overflow-hidden">
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

      <div className="relative z-10">
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
