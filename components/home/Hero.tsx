import { Button } from "@/components/ui/Button";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-bone">
      <svg className={styles.grain} width="100%" height="100%" aria-hidden="true">
        <filter id="hero-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-noise)" />
      </svg>
      <div className={styles.watermark} aria-hidden="true" />

      <div className="relative grid grid-cols-1 items-stretch lg:grid-cols-[1.08fr_1fr]">
        <div className="flex flex-col justify-center px-8 py-10 md:px-16 lg:py-6">
          <h1 className="max-w-150 font-display text-[44px] font-bold leading-[1.02] tracking-tight text-ink md:text-[66px]">
            The future of learning lives <span className="text-adire">beyond the page</span>
          </h1>
          <p className="mt-6 max-w-110 font-sans text-[17px] leading-relaxed text-body md:text-[18px]">
            CR8LAB builds experiences that join books, augmented reality, virtual reality,
            artificial intelligence and interactive storytelling into one platform. Knowledge
            you can hold, walk into and take apart.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3.5">
            <Button href="/platform" variant="primary">
              Explore the platform
            </Button>
            <Button href="/contact" variant="ghost">
              Book a demo
            </Button>
          </div>
        </div>

        <div className={styles.portal}>
          <div className={styles.seam} aria-hidden="true" />
          <div className={styles.portalClip}>
            <div className={styles.glow} aria-hidden="true" />
            <svg
              width="280"
              height="280"
              viewBox="0 0 380 380"
              fill="none"
              aria-hidden="true"
              className="relative md:h-95 md:w-95"
            >
              <circle cx="190" cy="190" r="158" stroke="#4A4494" strokeWidth="2" />
              <circle cx="190" cy="190" r="118" stroke="#F3ECDE" strokeWidth="2.5" />
              <circle cx="190" cy="190" r="80" stroke="#4A4494" strokeWidth="2" />
              <circle cx="190" cy="190" r="44" stroke="#F5A623" strokeWidth="3" />
              <circle cx="190" cy="190" r="14" fill="#F5A623" />
            </svg>
          </div>
          <p className={styles.caption}>
            Placeholder: Envato-sourced AR render, a scene assembling in 3D off a scanned book
            page. Camera pushes through the lens as the visitor scrolls.
          </p>
        </div>
      </div>
    </section>
  );
}
