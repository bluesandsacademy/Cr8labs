import { Nav } from "@/components/layout/Nav";
import { Button } from "@/components/ui/Button";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.root}>
      <svg className={styles.grain} width="100%" height="100%" aria-hidden="true">
        <filter id="notfound-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#notfound-noise)" />
      </svg>

      <Nav theme="dark" />

      <div className={styles.main}>
        <div className={styles.glow} aria-hidden="true" />

        <div className={styles.debris} aria-hidden="true">
          <svg className={styles.d1} viewBox="0 0 620 620" fill="none">
            <circle cx="310" cy="310" r="290" stroke="#4A4494" strokeWidth="2" strokeDasharray="22 16" transform="rotate(-12 310 310)" />
          </svg>
          <svg className={styles.d2} viewBox="0 0 320 320" fill="none">
            <circle cx="160" cy="160" r="145" stroke="#8F87CF" strokeWidth="2.5" strokeDasharray="14 12" transform="rotate(30 160 160)" />
          </svg>
          <svg className={styles.d3} viewBox="0 0 180 180" fill="none">
            <circle cx="90" cy="90" r="78" stroke="#F5A623" strokeWidth="3" strokeDasharray="8 9" transform="rotate(60 90 90)" />
          </svg>
          <svg className={styles.d4} viewBox="0 0 70 70" fill="none">
            <circle cx="35" cy="35" r="28" stroke="#F3ECDE" strokeWidth="2.5" strokeDasharray="5 6" />
          </svg>
          <svg className={styles.d5} viewBox="0 0 34 34" fill="none">
            <circle cx="17" cy="17" r="13" stroke="#A39CC9" strokeWidth="2" strokeDasharray="3 5" />
          </svg>
        </div>

        <div className={styles.content}>
          <p className="font-mono text-[11px] font-medium uppercase tracking-widest text-adire-caption">
            Error 404
          </p>
          {/* Deliberately one line of JSX text (no <br /> + adjacent text across lines):
              JSX's whitespace collapsing around line breaks is easy to get subtly wrong,
              and this keeps the rendered text an unambiguous "Nothing here." */}
          <h1 className={`${styles.h1} mt-5 text-bone`}>
            Nothing here<span className="text-adire-tint">.</span>
          </h1>
          <p className="mt-5 font-sans text-[19px] text-bone/75">Not even in three dimensions.</p>
          <p className="mt-2 max-w-105 font-sans text-[16px] leading-relaxed text-bone/75">
            Try the work, or tell us what you were looking for.
          </p>
          <div className="mt-6 flex gap-3.5">
            <Button href="/work" variant="primary" theme="dark">
              See the work
            </Button>
            <Button href="/contact" variant="ghost" theme="dark">
              Get in touch
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
