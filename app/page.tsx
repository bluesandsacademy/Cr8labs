import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ImmersiveZone } from "@/components/home/ImmersiveZone";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Fixed, not sticky: sticky still occupies its own space in normal flow,
          which pushed the immersive zone down and left the nav sitting on the
          page's plain body background instead of floating over the dark hero
          from the very first frame - fixed removes it from flow entirely, so
          the zone starts at the true top of the page and the nav overlays it. */}
      <div className="fixed inset-x-0 top-0 z-50">
        <Nav theme="dark" />
      </div>
      <ImmersiveZone />
      <Footer />
    </div>
  );
}
