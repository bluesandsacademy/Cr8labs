"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/Button";
import { STATS } from "./TrustBar";

// Schools and countries: the two figures that read fastest at a glance.
// Same bracketed data TrustBar renders in full further down the page.
const HERO_STATS = [STATS[0], STATS[2]];

/**
 * A self-contained panel, not part of the fixed PageBackground world: its own
 * indigo gradient, sized to the fold. Text sits in a narrower left column so
 * the video, the thing we actually want people looking at, keeps most of the
 * frame. The lemon seam between them is the one strong graphic anchor; the
 * ring accents and stat chip sit off the footage itself, never over it.
 */
export function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(true);

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const root = rootRef.current;
        if (!root) return;
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(root.querySelectorAll("[data-hero-kicker]"), { opacity: 0, x: -16, duration: 0.6 }, 0)
          .from(
            root.querySelectorAll("[data-hero-line]"),
            { opacity: 0, y: 36, duration: 0.8, stagger: 0.08 },
            0.1
          )
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
      <div className="relative z-10 flex flex-col justify-center gap-6 px-8 pb-10 pt-32 md:px-16 lg:basis-[37%] lg:py-10">
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

        <h1 className="relative max-w-[13ch] font-display text-[36px] leading-[1.08] text-bone md:text-[44px]">
          <span data-hero-line className="block">
            The future of learning lives{" "}
          </span>
          <span data-hero-line className="block text-danfo">
            beyond the page
          </span>
        </h1>

        <p
          data-hero-lede
          className="relative max-w-90 font-sans text-[14.5px] leading-relaxed text-bone/75 md:text-[15.5px]"
        >
          CR8LAB builds experiences that join books, augmented reality, virtual reality, artificial
          intelligence and interactive storytelling into one platform. Knowledge you can hold, walk into and
          take apart.
        </p>

        <div className="relative flex flex-wrap items-center gap-5">
          <span data-hero-cta>
            <Button href="/platform" variant="primary">
              Explore the platform
            </Button>
          </span>
          <span data-hero-cta>
            <Button
              href="/contact"
              variant="ghost"
              theme="dark"
              className="rounded-none border-0 border-b border-bone/40 px-0 py-1 hover:bg-transparent hover:text-danfo"
            >
              Book a demo
            </Button>
          </span>
        </div>
      </div>

      <div className="h-1.75 w-full bg-danfo lg:h-auto lg:w-1.75" aria-hidden="true" />

      <div data-hero-video className="relative flex-1 overflow-hidden lg:min-h-dvh">
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

        <div
          data-hero-stat
          className="absolute inset-x-5 bottom-5 flex items-center gap-4 rounded-[12px] border border-bone/15 bg-ink/45 px-5 py-3.5 backdrop-blur-md lg:inset-x-auto lg:bottom-9 lg:left-0 lg:-translate-x-1/2"
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
