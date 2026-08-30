import type { ReactNode } from "react";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

/**
 * Every page's shell: the sticky nav, the page's own sections (each paints
 * its own background now, bluesandsk12-style), the footer. No fixed world
 * background any more; that was CR8LAB's old architecture.
 */
export function InnerPage({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1 flex-col">
      <Nav theme="light" />
      <main className="relative z-10 flex-1">{children}</main>
      <Footer />
    </div>
  );
}
