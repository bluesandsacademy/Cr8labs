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
 * A crossfade completes when the incoming section's top reaches mid-viewport,
 * and runs over at most 35% of a viewport of scroll before that, shortened
 * further if the sections at tone boundaries are short. Measured: with a
 * longer lead (90% to 35%), a 440px indigo band started fading out before it
 * had finished fading in and never got a settled moment.
 */
const FADE_END = 0.5;
const FADE_WINDOW = 0.35;
/** The trust beat fades in over the last 45% of the opening dive. */
const TRUST_FADE_START = 0.55;
const TRUST_FADE_END = 1.0;
/** Per-frame easing toward the target: ~0.35s to settle, the "gentle" in gentle. */
const SMOOTHING = 0.16;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

type Boundary = {
  from: World;
  to: Tone;
  outgoing: HTMLElement | null;
  start: number;
  end: number;
};

/**
 * The one background for the whole landing page. It is position: fixed and
 * never scrolls: after the opening dive into the headset the visitor is
 * "inside" and stays there, with content arriving over a world that holds
 * still. Where the world changes tone (dark glow to bone to indigo to ink)
 * it crossfades gently as the incoming section arrives, and the outgoing
 * section's content dissolves in the same range so text never sits on a
 * background that has stopped suiting it.
 *
 * The tone engine is deliberately NOT a set of scroll-scrubbed GSAP tweens.
 * Several tweens targeting the same layers recorded their start values
 * lazily (all layers were still at 0 on first render), so every "fade the old
 * tone out" step silently became a 0-to-0 no-op and tones stacked up instead
 * of trading places; measured in a real browser, not guessed. Instead, every
 * layer's opacity is a pure function of scrollY, computed on each scroll and
 * eased toward per frame. Any scroll position, reached by any route, yields
 * the same state.
 *
 * Sections opt in with `data-tone="light" | "adire" | "ink"` on a wrapper
 * inside <main>. The opening dive reads `[data-immersive-zone]` and its two
 * `[data-scene]` children and stays a scrubbed GSAP timeline (a single owner
 * per property, no conflicts). No GSAP `pin` anywhere.
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
    const zone = document.querySelector<HTMLElement>("[data-immersive-zone]");
    const heroScene = document.querySelector<HTMLElement>('[data-scene="hero"]');
    const trustScene = document.querySelector<HTMLElement>('[data-scene="trust"]');
    // Scoped to <main>: the html element carries data-tone too (for the nav).
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main [data-tone]"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const layerEls: Record<Tone, HTMLDivElement | null> = {
      light: lightRef.current,
      adire: adireRef.current,
      ink: inkRef.current,
    };
    // gsap.quickSetter is typed as a bare Function; give it a real signature.
    const opacitySetter = (el: HTMLElement | null): ((v: number) => void) => {
      if (!el) return () => {};
      const q = gsap.quickSetter(el, "opacity");
      return (v: number) => q(v);
    };
    const setLayer: Record<Tone, (v: number) => void> = {
      light: opacitySetter(layerEls.light),
      adire: opacitySetter(layerEls.adire),
      ink: opacitySetter(layerEls.ink),
    };

    // ---- tone engine ----------------------------------------------------
    let boundaries: Boundary[] = [];

    const measure = () => {
      const vh = window.innerHeight;
      const found: { el: HTMLElement; from: World; to: Tone; outgoing: HTMLElement | null }[] = [];
      let prev: World = "glow";
      let prevEl: HTMLElement | null = trustScene;
      for (const el of sections) {
        const tone = el.dataset.tone as Tone;
        if (!TONES.includes(tone)) continue;
        if (tone !== prev) found.push({ el, from: prev, to: tone, outgoing: prevEl });
        prev = tone;
        prevEl = el;
      }
      // Two consecutive crossfades must never overlap: each one has to finish
      // before the next section can start pulling the world its own way. The
      // shortest section that sits at a boundary bounds the window.
      const minHeight = found.reduce((m, b) => Math.min(m, b.el.offsetHeight), Infinity);
      const window_ = Math.max(80, Math.min(FADE_WINDOW * vh, 0.8 * minHeight));
      boundaries = found.map((b) => {
        const top = b.el.getBoundingClientRect().top + window.scrollY;
        const end = top - FADE_END * vh;
        return { from: b.from, to: b.to, outgoing: b.outgoing, start: end - window_, end };
      });
    };

    const targetLayer: Record<Tone, number> = { light: 0, adire: 0, ink: 0 };
    const currentLayer: Record<Tone, number> = { light: 0, adire: 0, ink: 0 };
    const targetOut = new Map<HTMLElement, number>();
    const currentOut = new Map<HTMLElement, number>();
    const outSetters = new Map<HTMLElement, (v: number) => void>();
    const setOut = (el: HTMLElement, v: number) => {
      const existing = outSetters.get(el);
      if (existing) {
        existing(v);
        return;
      }
      const created = opacitySetter(el);
      outSetters.set(el, created);
      created(v);
    };

    const setNavTone = (world: World) => {
      const value = world === "light" ? "light" : "dark";
      if (root.dataset.tone !== value) root.dataset.tone = value;
    };

    const computeTargets = () => {
      const y = window.scrollY;
      targetLayer.light = 0;
      targetLayer.adire = 0;
      targetLayer.ink = 0;
      let nav: World = "glow";

      // Every outgoing element we have ever touched defaults back to fully
      // visible; boundaries below then override for the ones mid-dissolve or
      // already dissolved. Elements never touched are never written to, which
      // keeps the dive timeline as the sole owner of the trust scene's opacity
      // until the first boundary genuinely starts.
      for (const el of currentOut.keys()) targetOut.set(el, 1);

      for (const b of boundaries) {
        if (y <= b.start) break;
        const p = clamp01((y - b.start) / (b.end - b.start));
        targetLayer[b.to] = p;
        if (b.from !== "glow") targetLayer[b.from] = 1 - p;
        if (b.outgoing) targetOut.set(b.outgoing, 1 - p);
        nav = p > 0.5 ? b.to : b.from;
      }

      // The trust beat's opacity has exactly one owner: this engine. It fades
      // in over the tail of the dive (a function of scroll, like everything
      // else here) and then dissolves as the first boundary takes it out.
      // Splitting ownership with the dive's scrubbed timeline let the two
      // fight during their overlap and the beat snapped back to full opacity
      // whenever scrolling paused mid-dissolve.
      if (trustScene) {
        const vh = window.innerHeight;
        const fadeIn = reduceMotion
          ? 1
          : clamp01((y / vh - TRUST_FADE_START) / (TRUST_FADE_END - TRUST_FADE_START));
        targetOut.set(trustScene, fadeIn * (targetOut.get(trustScene) ?? 1));
      }
      setNavTone(nav);
    };

    let ticking = false;
    const k = reduceMotion ? 1 : SMOOTHING;
    const tick = () => {
      let busy = false;
      for (const tone of TONES) {
        const t = targetLayer[tone];
        let c = currentLayer[tone];
        c += (t - c) * k;
        if (Math.abs(t - c) < 0.002) c = t;
        else busy = true;
        currentLayer[tone] = c;
        setLayer[tone](c);
      }
      for (const [el, t] of targetOut) {
        let c = currentOut.get(el) ?? 1;
        c += (t - c) * k;
        if (Math.abs(t - c) < 0.002) c = t;
        else busy = true;
        currentOut.set(el, c);
        setOut(el, c);
      }
      if (!busy) {
        gsap.ticker.remove(tick);
        ticking = false;
      }
    };

    const update = () => {
      computeTargets();
      if (!ticking) {
        ticking = true;
        gsap.ticker.add(tick);
      }
    };
    const remeasure = () => {
      measure();
      update();
    };

    // Start the trust beat where the engine will put it, not at CSS's 1, so
    // there is nothing to ease down from on first paint.
    if (trustScene) {
      const initial = reduceMotion ? 1 : 0;
      currentOut.set(trustScene, initial);
      setOut(trustScene, initial);
    }
    measure();
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", remeasure);
    window.addEventListener("load", remeasure);
    // Layout shifts as images and fonts land; keep the boundaries honest.
    const resizeObserver = new ResizeObserver(remeasure);
    resizeObserver.observe(document.body);

    // ---- the dive -------------------------------------------------------
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (!zone || !heroScene) return;
        // Explicit durations keep the position labels honest fractions of the
        // scrubbed range (see git history for the measured bug behind this).
        // The trust beat is deliberately absent here; the tone engine owns it.
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
      // the tone engine above still runs, switching instantly (k = 1).
    });

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", remeasure);
      window.removeEventListener("load", remeasure);
      resizeObserver.disconnect();
      gsap.ticker.remove(tick);
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
