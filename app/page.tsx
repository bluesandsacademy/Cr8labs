import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { RingDivider } from "@/components/ui/RingDivider";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-bone">
      <Nav theme="light" />
      <Hero />
      <div className="py-8">
        <RingDivider />
      </div>
      <TrustBar />
      <Footer />
    </div>
  );
}
