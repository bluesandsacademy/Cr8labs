import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ImmersiveZone } from "@/components/home/ImmersiveZone";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="sticky top-0 z-50">
        <Nav theme="dark" />
      </div>
      <ImmersiveZone />
      <Footer />
    </div>
  );
}
