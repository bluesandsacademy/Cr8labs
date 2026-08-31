"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/Button";
import { STATS } from "./TrustBar";

// Institutions and states: the two figures that read fastest at a glance.
// Same proof-bar data TrustBar renders in full further down the page.
const HERO_STATS = [STATS[3], STATS[4]];

const EYEBROW = "Africa's Immersive Creative Technology Company";

// Eyebrow, body and CTAs stay fixed while HEADLINES rotates: this is the one
// slot the copy deck hands us more than one option for. Currently a single
// confirmed headline, so the rotator degrades to a static line with no
// controls rendered (see hasMultipleHeadlines below) until more land here.
const HEADLINES: { id: string; text: string }[] = [
  { id: "stories-you-can-walk-into", text: "Stories you can walk into." },
];
const AUTOPLAY_MS = 6500;

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={direction === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * A self-contained panel, not part of the fixed PageBackground world: its own
 * indigo gradient, sized to the fold. Text sits in a narrower left column so
 * the video, the thing we actually want people looking at, keeps most of the
 * frame. The lemon seam between them is the one strong graphic anchor; the
 * ring accents and stat chip sit off the footage itself, never over it.
 *
 * The headline rotates through the docx's own alternate H1 options (see
 * HEADLINES above), the one piece of this hero modelled on bluesandsk12's
 * slider hero: autoplay, dot + arrow navigation, pause on hover/focus and an
 * explicit pause control, all ported and restyled rather than copied outright
 * (no framer-motion, no kid-coded decoration).
 */
export function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(true);
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  // Computed once: whether the rotation should run at all. A lazy initial
  // value (rather than an effect calling setState) keeps this off the
  // set-state-in-effect lint rule the video's own reduced-motion check
  // already had to work around once this session.
  const [motionOk] = useState(
    () => typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  // The video's own play/pause events are the source of truth for `playing`,
  // not our toggle handler: that way a reduced-motion pause (below) and a
  // user click both flow through the same path and never fall out of sync.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) video.pause();
    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  // The one property owner for the headline's opacity/y outside the mount
  // entrance: fades the current text out, swaps it, fades the next one in.
  // Skips the tween entirely under reduced motion or once the deck's own
  // alternates have all been shown a class doesn't need to re-render for.
  const goTo = useCallback(
    (rawNext: number) => {
      const total = HEADLINES.length;
      const next = ((rawNext % total) + total) % total;
      if (next === index) return;
      const el = headlineRef.current;
      if (!el || !motionOk) {
        setIndex(next);
        return;
      }
      gsap.to(el, {
        opacity: 0,
        y: -14,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => {
          setIndex(next);
          requestAnimationFrame(() => {
            gsap.fromTo(el, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
          });
        },
      });
    },
    [index, motionOk]
  );

  const hasMultipleHeadlines = HEADLINES.length > 1;

  useEffect(() => {
    if (!motionOk || !hasMultipleHeadlines || hovered || userPaused) return;
    const id = setInterval(() => goTo(index + 1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [motionOk, hasMultipleHeadlines, hovered, userPaused, index, goTo]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const root = rootRef.current;
        if (!root) return;
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(root.querySelectorAll("[data-hero-kicker]"), { opacity: 0, x: -16, duration: 0.6, stagger: 0.06 }, 0)
          .from(root.querySelectorAll("[data-hero-line]"), { opacity: 0, y: 36, duration: 0.8 }, 0.1)
          .from(root.querySelectorAll("[data-hero-lede]"), { opacity: 0, y: 16, duration: 0.6 }, 0.42)
          .from(
            root.querySelectorAll("[data-hero-cta]"),
            { opacity: 0, y: 12, duration: 0.5, stagger: 0.06 },
            0.55
          )
          .from(
            root.querySelectorAll("[data-hero-video]"),
            { opacity: 0, scale: 0.96, duration: 1, ease: "power2.out" },
            0.25
          )
          .from(root.querySelectorAll("[data-hero-stat]"), { opacity: 0, y: 16, duration: 0.6 }, 0.95);
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play();
    else video.pause();
  };

  return (
    <section
      ref={rootRef}
      className="relative flex flex-col overflow-hidden lg:min-h-dvh lg:flex-row"
      style={{
        background: "linear-gradient(135deg, var(--color-adire-deep) 0%, var(--color-adire-dark) 55%, var(--color-adire-mid) 100%)",
      }}
    >
      <div className="relative z-10 flex flex-col justify-center gap-6 px-8 py-10 md:px-16 lg:basis-[37%] lg:py-10">
        <div
          className="pointer-events-none absolute -left-40 top-6 hidden h-105 w-105 rounded-full border-10 border-bone/[0.045] lg:block"
          aria-hidden="true"
        />

        <div data-hero-kicker className="relative flex items-center gap-3">
          <span className="relative flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-full border-[1.5px] border-danfo">
            <span className="h-1.75 w-1.75 rounded-full bg-danfo" />
          </span>
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-bone/85">
            by ARPedia
          </span>
        </div>

        <p data-hero-kicker className="relative font-mono text-[10px] uppercase tracking-[0.14em] text-bone/50">
          {EYEBROW}
        </p>

        <div
          className="relative"
          {...(hasMultipleHeadlines
            ? { role: "group", "aria-roledescription": "carousel", "aria-label": "Rotating headline" }
            : {})}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
        >
          <h1
            ref={headlineRef}
            data-hero-line
            className="max-w-[25ch] font-display text-[36px] leading-[1.1] text-bone md:text-[44px]"
          >
            {HEADLINES[index].text}
          </h1>

          {hasMultipleHeadlines && (
          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Previous headline"
              className="focus-ring-dark flex h-8 w-8 items-center justify-center rounded-full border border-bone/25 text-bone/70 transition-colors hover:border-bone/50 hover:text-bone"
            >
              <Chevron direction="left" />
            </button>

            <div className="flex items-center gap-2">
              {HEADLINES.map((headline, i) => (
                <button
                  key={headline.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to headline ${i + 1} of ${HEADLINES.length}`}
                  aria-current={i === index}
                  className={`focus-ring-dark h-1.5 rounded-full transition-all ${
                    i === index ? "w-6 bg-danfo" : "w-1.5 bg-bone/25 hover:bg-bone/45"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Next headline"
              className="focus-ring-dark flex h-8 w-8 items-center justify-center rounded-full border border-bone/25 text-bone/70 transition-colors hover:border-bone/50 hover:text-bone"
            >
              <Chevron direction="right" />
            </button>

            {motionOk && (
              <button
                type="button"
                onClick={() => setUserPaused((p) => !p)}
                aria-pressed={userPaused}
                aria-label={userPaused ? "Resume headline rotation" : "Pause headline rotation"}
                className="focus-ring-dark ml-1 flex h-8 w-8 items-center justify-center rounded-full border border-bone/25 text-bone/70 transition-colors hover:border-bone/50 hover:text-bone"
              >
                {userPaused ? (
                  <span
                    className="ml-0.5 h-0 w-0 border-y-[5px] border-l-[7px] border-y-transparent border-l-current"
                    aria-hidden="true"
                  />
                ) : (
                  <span className="flex gap-[3px]" aria-hidden="true">
                    <span className="h-2.5 w-[3px] bg-current" />
                    <span className="h-2.5 w-[3px] bg-current" />
                  </span>
                )}
              </button>
            )}
          </div>
          )}
        </div>

        <p
          data-hero-lede
          className="relative max-w-90 font-sans text-[14.5px] leading-relaxed text-bone/75 md:text-[15.5px]"
        >
          CR8LAB is a creative technology company. We build AR, VR, and 3D experiences for the institutions,
          publishers, and brands who own Africa&apos;s stories, knowledge, and culture.
        </p>

        <div className="relative flex flex-wrap items-center gap-5">
          <span data-hero-cta>
            <Button href="/contact" variant="primary">
              Book a demo
            </Button>
          </span>
          <span data-hero-cta>
            <Button
              href="/contact?route=partner#form"
              variant="ghost"
              theme="dark"
              className="rounded-none border-0 border-b border-bone/40 px-0 py-1 hover:bg-transparent hover:text-danfo"
            >
              Partner with us
            </Button>
          </span>
        </div>
      </div>

      <div className="h-1.75 w-full bg-danfo lg:h-auto lg:w-1.75" aria-hidden="true" />

      {/* flex-1 alone only sizes a flex item against a bounded container; the
          section is auto-height below lg, so without an explicit ratio here
          the video collapsed to near-nothing on phones. aspect-video gives it
          real height there; lg:aspect-auto hands sizing back to flex-1/min-h-dvh. */}
      <div data-hero-video className="relative aspect-video flex-1 overflow-hidden lg:aspect-auto lg:min-h-dvh">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          poster="/brand/hero-video-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        >
          <source src="/hero-vid.mp4" type="video/mp4" />
        </video>
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-2/5"
          style={{ background: "linear-gradient(to bottom, rgba(23,19,15,0.55), transparent)" }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
          style={{ background: "linear-gradient(to top, rgba(23,19,15,0.5), transparent)" }}
        />

        <button
          type="button"
          onClick={toggle}
          aria-pressed={playing}
          aria-label={playing ? "Pause the background video" : "Play the background video"}
          className="focus-ring-dark absolute bottom-6 right-6 flex h-11 w-11 items-center justify-center rounded-full"
        >
          {playing &&
            [0, 1, 2].map((i) => (
              <span
                key={i}
                className="absolute inset-0 rounded-full border border-bone/50 motion-safe:animate-[ring-pulse_2.4s_ease-out_infinite]"
                style={{ animationDelay: `${i * 0.7}s` }}
                aria-hidden="true"
              />
            ))}
          <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-ink/40 backdrop-blur-sm">
            {playing ? (
              <span className="flex gap-1" aria-hidden="true">
                <span className="h-3.5 w-1 bg-bone" />
                <span className="h-3.5 w-1 bg-bone" />
              </span>
            ) : (
              <span
                className="ml-0.5 h-0 w-0 border-y-6 border-l-9 border-y-transparent border-l-bone"
                aria-hidden="true"
              />
            )}
          </span>
        </button>

        {/* Desktop only: on mobile this duplicated TrustBar's own stats one
            scroll further down and sat on top of the video, the one thing
            this section exists to show clearly. */}
        <div
          data-hero-stat
          className="absolute inset-x-auto bottom-9 left-0 hidden -translate-x-1/2 items-center gap-4 rounded-[12px] border border-bone/15 bg-ink/45 px-5 py-3.5 backdrop-blur-md lg:flex"
        >
          {HERO_STATS.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-4">
              {i > 0 && <span className="h-6.5 w-px bg-bone/20" aria-hidden="true" />}
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[17px] text-bone">{stat.value}</span>
                <span className="font-mono text-[10px] uppercase tracking-wide text-bone/55">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
