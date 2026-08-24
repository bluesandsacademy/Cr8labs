import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { ImmersiveZone } from "@/components/home/ImmersiveZone";
import { SectionTeaser } from "@/components/home/SectionTeaser";
import { PlatformModules } from "@/components/home/PlatformModules";
import { Industries } from "@/components/home/Industries";
import { WhyCr8lab } from "@/components/home/WhyCr8lab";
import { ClosingCta } from "@/components/home/ClosingCta";

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

      {/* The immersive zone is its own continuous scroll-driven sequence and
          isn't wrapped in Reveal - everything after it gets a considered
          fade-and-rise into view instead of appearing flat and static. */}
      <ImmersiveZone />

      <Reveal>
        <SectionTeaser
          heading="Learning should never be limited to words on a page"
          body="Every child deserves to see an idea move. To run an experiment without a laboratory that costs more than the school. To stand inside a place they will never fly to, and a century they will never live in. To finish the lesson believing they could build something themselves. That belief is the whole reason CR8LAB exists, and it is the test every product here has to pass."
        />
      </Reveal>

      <Reveal>
        <PlatformModules />
      </Reveal>

      <Reveal>
        <SectionTeaser
          heading="Eight products, one library"
          body="Buy one, or run the whole stack. Everything shares the same content library, so a scene built for a book works in the lab, the headset and the classroom display without being made twice."
          cta={{ label: "Browse products", href: "/products" }}
        />
      </Reveal>

      <Reveal>
        <Industries />
      </Reveal>

      <Reveal>
        <SectionTeaser
          eyebrow="Work"
          heading="Most companies in this category show a demo. We can show you a product in daily use."
          body="Blue Sands is the first platform built on CR8LAB technology. It runs in [100]+ schools across [6] African countries, offline, on the devices those schools already own, in front of the least forgiving audience there is, which is a room of nine year olds. Everything we build afterwards is held to that standard."
          cta={{ label: "Read the case study", href: "/work" }}
        />
      </Reveal>

      <Reveal>
        <SectionTeaser
          eyebrow="CR8LAB Labs"
          heading="Not every idea starts with a client"
          body="Labs is where we build our own intellectual property. Living books, digital heritage, African STEM worlds, historical reconstructions and accessibility research. Some of it becomes product. All of it makes the commissioned work better."
          cta={{ label: "Go into the Labs", href: "/labs" }}
        />
      </Reveal>

      <Reveal>
        <WhyCr8lab />
      </Reveal>

      <Reveal>
        <SectionTeaser
          heading="We publish what we learn"
          body="Very few creative technology companies show their working. We publish research on learning science, spatial computing, digital publishing and AI in the classroom, including the results that did not go our way."
          cta={{ label: "Read the research", href: "/research" }}
        />
      </Reveal>

      <Reveal>
        <SectionTeaser
          heading="The next generation should be building this, not just using it"
          body="Hackathons, creator grants, teacher ambassadors, university partnerships and youth programmes. An ecosystem is the only version of this that outlives us."
          cta={{ label: "Join the community", href: "/community" }}
        />
      </Reveal>

      <Reveal>
        <ClosingCta />
      </Reveal>

      <Footer />
    </div>
  );
}
