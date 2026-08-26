import type { ReactNode } from "react";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { PageBackground } from "@/components/home/PageBackground";

/**
 * Every page after Home lives in the same fixed world, minus the opening
 * dive: the glow at rest, the tone masks, the fixed nav that follows the tone
 * beneath it, the footer. Pages compose their sections inside, each wrapped
 * in a `data-tone` div exactly as on Home.
 */
export function InnerPage({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1 flex-col">
      <PageBackground variant="inner" />
      <div className="fixed inset-x-0 top-0 z-50">
        <Nav theme="dark" />
      </div>
      <main className="relative z-10">
        {children}
        <Footer />
      </main>
    </div>
  );
}
