import { Hero } from "./Hero";
import { TrustBar } from "./TrustBar";

/**
 * The opening two beats, in normal document flow over the page's fixed
 * background (see PageBackground, which owns every scroll-driven effect and
 * reads the data attributes here). The arrival beat holds, briefly: "Built
 * for Africa" is sticky inside a 1.4-viewport wrapper, so it lingers for
 * about 40% of a viewport of scroll once the dive lands, then the next
 * section pushes it away as the world lightens around it. A full-viewport
 * hold was measured as too long: it read as the page being stuck.
 */
export function ImmersiveZone() {
  return (
    <section data-immersive-zone className="relative">
      <div data-scene="hero" className="flex min-h-dvh items-center">
        <Hero />
      </div>

      <div className="h-[140dvh]">
        <div data-scene="trust" className="sticky top-0 flex h-dvh items-center">
          <div className="w-full">
            <TrustBar theme="dark" />
          </div>
        </div>
      </div>
    </section>
  );
}
