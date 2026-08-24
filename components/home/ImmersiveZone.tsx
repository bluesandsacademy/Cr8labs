import { Hero } from "./Hero";
import { TrustBar } from "./TrustBar";

/**
 * The opening two beats, in normal document flow over the page's fixed
 * background (see PageBackground, which owns every scroll-driven effect and
 * reads the data attributes here). The arrival beat holds: "Built for Africa"
 * is sticky inside a two-viewport wrapper so it lingers for a full viewport
 * of scroll instead of sliding straight through, and the next section then
 * pushes it away as the world lightens around it.
 */
export function ImmersiveZone() {
  return (
    <section data-immersive-zone className="relative">
      <div data-scene="hero" className="flex min-h-dvh items-center">
        <Hero />
      </div>

      <div className="h-[200dvh]">
        <div data-scene="trust" className="sticky top-0 flex h-dvh items-center">
          <div className="w-full">
            <TrustBar theme="dark" />
          </div>
        </div>
      </div>
    </section>
  );
}
