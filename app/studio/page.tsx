import type { Metadata } from "next";
import { InnerPage } from "@/components/layout/InnerPage";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ListBeat } from "@/components/ui/ListBeat";
import { ImageBand } from "@/components/ui/ImageBand";
import { Story } from "@/components/studio/Story";
import { Team } from "@/components/studio/Team";
import { Facts } from "@/components/studio/Facts";
import { PressCareers } from "@/components/studio/PressCareers";

export const metadata: Metadata = {
  title: "The Studio | CR8LAB, Lagos",
  description:
    "The Lagos team building CR8LAB. Artists, engineers, writers and teachers producing original 3D, AR, VR and platform technology in-house.",
};

export default function StudioPage() {
  return (
    <InnerPage>
      <PageHero
        kicker="Studio"
        title="The studio"
        lede="A Lagos team of artists, engineers, writers and teachers building in three dimensions."
        image={{
          src: "/brand/studio-team.jpg",
          alt: "Three people at desks in a small studio under a warm pendant lamp, a pegboard of sketches behind them and a 3D-printed model on the desk",
        }}
      />

      <div data-tone="light">
        <Reveal>
          <Story />
        </Reveal>
        <Reveal>
          <ImageBand
            image={null}
            placeholder="studio-floor.png, the studio from the doorway, the whole team at work"
          />
        </Reveal>
      </div>

      <div data-tone="adire">
        <Reveal>
          <ListBeat
            tone="dark"
            heading="What we value"
            items={[
              "Build it, do not licence it. Nothing we ship is a store model with a logo on it.",
              "Design for the low end first. Everything else is downhill from there.",
              "The script matters more than the shader. Most immersive work fails on writing.",
              "Say the number or say nothing. No claim we cannot evidence in a due diligence call.",
              "The people in the work have a say in the work. Especially children, communities and cultural custodians.",
            ]}
          />
        </Reveal>
      </div>

      <div data-tone="light">
        <Reveal>
          <Team />
        </Reveal>
        <Reveal>
          <Facts />
        </Reveal>
      </div>

      <div data-tone="ink">
        <Reveal>
          <PressCareers />
        </Reveal>
      </div>
    </InnerPage>
  );
}
