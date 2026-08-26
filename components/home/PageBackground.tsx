"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Tone = "light" | "adire" | "ink";
type World = Tone | "glow";
const TONES: readonly Tone[] = ["light", "adire", "ink"];

/**
 * Height of the soft edge between two tones, centred on the boundary line
 * between two sections. It has to fit inside the two sections' padding so no
 * text ever sits on the blend: every section pads at least 64px top and
 * bottom, so a 120px band (60px either side of the line) stays text-free.
 */
const FEATHER = 120;
/** The trust beat fades in over the last 45% of the opening dive. */
const TRUST_FADE_START = 0.55;
const TRUST_FADE_END = 1.0;
/** ...and fades out over this many px once the next section starts pushing it up. */
const TRUST_EXIT_PX = 240;
/** Where the nav's text sits, in viewport px; the tone under it drives the nav's colours. */
const NAV_PROBE_Y = 48;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/**
 * The one background for the whole landing page. It is position: fixed and
 * never scrolls: after the opening dive into the headset the visitor is
 * "inside" and stays there, with content arriving over a world that holds
 * still. The rings, glow and grain never move.
 *
 * Tone (bone, indigo, ink) is the one thing that does travel with the
 * content, and deliberately so. A uniform full-viewport crossfade was tried
 * first and measured: at its midpoint the whole screen is a mid-tone that no
 * text colour reads against, and any text on screen at that moment (there is
 * always some) went illegible. So each tone layer is instead masked to the
 * exact vertical span of its own sections, with a feathered edge centred on
 * every section boundary. Above the edge you are on the old tone, below it on
 * the new, and the only blend is a narrow band that lives inside the sections'
 * padding where there is nothing to read. The masks are a pure function of
 * scroll position: any point reached by any route renders the same.
 *
 * Sections opt in with `data-tone="light" | "adire" | "ink"` on a wrapper
 * inside <main>. The opening dive reads `[data-immersive-zone]` and its two
 * `[data-scene]` children and stays a scrubbed GSAP timeline (single owner
 * per property). No GSAP `pin` anywhere.
 */
export function PageBackground({ variant = "home" }: { variant?: "home" | "inner" }) {
  // "inner": the same world without the opening dive. No headset photo, no
  // dive timeline; the inside-the-lens glow is simply there from the start
  // and the tone masks behave exactly as on Home.
  const isHome = variant === "home";
  const headsetRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const vignetteRef = useRef<HTMLDivElement | null>(null);
  const lightRef = useRef<HTMLDivElement | null>(null);
  const adireRef = useRef<HTMLDivElement | null>(null);
  const inkRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const zone = document.querySelector<HTMLElement>("[data-immersive-zone]");
    const heroScene = document.querySelector<HTMLElement>('[data-scene="hero"]');
    const trustScene = document.querySelector<HTMLElement>('[data-scene="trust"]');
    // Scoped to <main>: the html element carries data-tone too (for the nav).
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main [data-tone]")).filter(
      (el) => TONES.includes(el.dataset.tone as Tone)
    );
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const layerEls: Record<Tone, HTMLDivElement | null> = {
      light: lightRef.current,
      adire: adireRef.current,
      ink: inkRef.current,
    };

    const setNavTone = (world: World) => {
      const value = world === "light" ? "light" : "dark";
      if (root.dataset.tone !== value) root.dataset.tone = value;
    };

    // ---- tone masks -----------------------------------------------------
    const apply = () => {
      const vh = window.innerHeight;
      const half = FEATHER / 2;

      // Viewport-space spans per tone; consecutive same-tone sections merge
      // into one span so there is no seam between them.
      const spans: Record<Tone, [number, number][]> = { light: [], adire: [], ink: [] };
      let navWorld: World = "glow";
      for (const el of sections) {
        const tone = el.dataset.tone as Tone;
        const r = el.getBoundingClientRect();
        const list = spans[tone];
        const last = list[list.length - 1];
        if (last && Math.abs(last[1] - r.top) < 1) last[1] = r.bottom;
        else list.push([r.top, r.bottom]);
        if (r.top <= NAV_PROBE_Y && NAV_PROBE_Y < r.bottom) navWorld = tone;
      }
      setNavTone(navWorld);

      for (const tone of TONES) {
        const el = layerEls[tone];
        if (!el) continue;
        const visible = spans[tone].filter(([a, b]) => b > -FEATHER && a < vh + FEATHER);
        if (visible.length === 0) {
          el.style.opacity = "0";
          continue;
        }
        const stops: string[] = [];
        for (const [a, b] of visible) {
          stops.push(
            `transparent ${a - half}px`,
            `black ${a + half}px`,
            `black ${b - half}px`,
            `transparent ${b + half}px`
          );
        }
        const mask = `linear-gradient(to bottom, ${stops.join(", ")})`;
        el.style.maskImage = mask;
        el.style.webkitMaskImage = mask;
        el.style.opacity = "1";
      }

      // The trust beat: fades in over the tail of the dive, then out as the
      // next section pushes it up. Both are functions of scroll, and this is
      // the property's only owner.
      if (trustScene) {
        const fadeIn = reduceMotion
          ? 1
          : clamp01((window.scrollY / vh - TRUST_FADE_START) / (TRUST_FADE_END - TRUST_FADE_START));
        const top = trustScene.getBoundingClientRect().top;
        const fadeOut = 1 - clamp01(-top / TRUST_EXIT_PX);
        trustScene.style.opacity = String(fadeIn * fadeOut);
      }
    };

    let scheduled = false;
    const update = () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        apply();
      });
    };

    apply();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("load", update);
    // Layout shifts as images and fonts land; keep the spans honest.
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(document.body);

    // ---- the dive -------------------------------------------------------
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (!zone || !heroScene) return;
        // Explicit durations keep the position labels honest fractions of the
        // scrubbed range (see git history for the measured bug behind this).
        // The trust beat is deliberately absent here; the mask engine owns it.
        const tl = gsap.timeline({
          scrollTrigger: { trigger: zone, start: "top top", end: "+=100%", scrub: 1 },
        });
        tl.to(headsetRef.current, { scale: 2.2, duration: 0.55, ease: "none" }, 0)
          .to(heroScene, { opacity: 0, y: -40, duration: 0.28, ease: "none" }, 0)
          .to(glowRef.current, { opacity: 1, duration: 0.3, ease: "none" }, 0.15)
          .to(vignetteRef.current, { opacity: 0, duration: 0.25, ease: "none" }, 0.18)
          .to(headsetRef.current, { opacity: 0, duration: 0.3, ease: "none" }, 0.32);
      });
      // Reduced motion: no dive. Headset at rest, both scenes simply visible;
      // the tone masks still track the content (they are placement, not motion).
    });

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("load", update);
      resizeObserver.disconnect();
      ctx.revert();
      delete root.dataset.tone;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-adire-dark" aria-hidden="true">
      {/* What you dive toward. transform-origin sits on the ring-light's center. */}
      {isHome && (
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
      )}

      {/* What you arrive in: the same ring-light continued as an abstract glow. */}
      <div
        ref={glowRef}
        className={`absolute inset-0 ${isHome ? "opacity-0" : "opacity-100"}`}
        style={{
          background:
            "radial-gradient(circle at 50% 48%, rgba(245,166,35,0.32) 0%, rgba(44,39,108,0.6) 40%, rgba(23,19,15,0.98) 78%)",
        }}
      />
      {isHome && (
        <div
          ref={vignetteRef}
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,8,20,0.8)_0%,rgba(10,8,20,0.4)_45%,rgba(10,8,20,0.05)_70%)]"
        />
      )}

      {/* Tone layers, each masked to its own sections' extent with a feathered
          edge. Each carries a fixed ring so the world visibly holds still while
          content moves across it. */}
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
