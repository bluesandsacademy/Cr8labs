import type { Metadata } from "next";
import { InnerPage } from "@/components/layout/InnerPage";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ClosingBeat } from "@/components/ui/ClosingBeat";
import { ImageBand } from "@/components/ui/ImageBand";
import { SectorRow } from "@/components/solutions/SectorRow";
import { SECTORS } from "@/components/solutions/sectors";

export const metadata: Metadata = {
  title: "Solutions | Schools, Governments, Publishers, Museums, Training",
  description:
    "Immersive learning and spatial computing solutions for schools, ministries, publishers, museums, NGOs, universities and enterprise training across Africa.",
};

const ACCENTS = ["#F5A623", "#8F87CF", "#D97A50"];

/** Ten sectors in groups of tone so the page breathes: three on bone, three on indigo, four on bone, the close on ink. */
const GROUPS: { tone: "light" | "adire" | "ink"; from: number; to: number }[] = [
  { tone: "light", from: 0, to: 3 },
  { tone: "adire", from: 3, to: 6 },
  { tone: "light", from: 6, to: 10 },
];

/** The ten sectors as a ring of points: find your own row before you read. */
function SectorRing() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[70vh]">
      <div className="absolute inset-0 rounded-full border border-adire-light/40" aria-hidden="true" />
      <div
        className="absolute inset-[10%] rounded-full border border-dashed border-adire-light/25 motion-safe:animate-[orbit_150s_linear_infinite]"
        aria-hidden="true"
      />
      <ul className="absolute inset-0">
        {SECTORS.map((sector, i) => {
          const angle = (i / SECTORS.length) * Math.PI * 2 - Math.PI / 2;
          const x = 50 + 50 * Math.cos(angle);
          const y = 50 + 50 * Math.sin(angle);
          const right = x > 50;
          return (
            <li key={sector.slug} className="absolute" style={{ left: `${x}%`, top: `${y}%` }}>
              <a
                href={`#${sector.slug}`}
                className={`group focus-ring-dark flex -translate-y-1/2 items-center gap-2.5 rounded-[3px] ${right ? "-translate-x-2" : "-translate-x-[calc(100%-8px)] flex-row-reverse"}`}
              >
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full transition-transform duration-300 group-hover:scale-150"
                  style={{ backgroundColor: ACCENTS[i % ACCENTS.length], boxShadow: `0 0 10px ${ACCENTS[i % ACCENTS.length]}88` }}
                  aria-hidden="true"
                />
                <span className="hidden whitespace-nowrap font-mono text-[10px] uppercase tracking-wide text-bone/80 transition-colors group-hover:text-bone md:inline">
                  {sector.name}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function SolutionsPage() {
  return (
    <InnerPage>
      <PageHero
        kicker="Solutions"
        title="Solutions"
        lede="The same platform, arranged around what you are actually accountable for. Every section below states the problem first, because if we have the problem wrong the rest does not matter."
        device={<SectorRing />}
      />

      {GROUPS.map((group) => (
        <div key={group.from} data-tone={group.tone}>
          {SECTORS.slice(group.from, group.to).map((sector, i) => (
            <Reveal key={sector.slug}>
              <SectorRow sector={sector} tone={group.tone} />
              {group.tone === "light" && group.from === 0 && i === 0 && (
                <ImageBand
                  image={null}
                  placeholder="solutions-schools.png, a science class mid-experiment on tablets, teacher moving between desks"
                />
              )}
            </Reveal>
          ))}
        </div>
      ))}

      <div data-tone="ink">
        <Reveal>
          <ClosingBeat
            text="Tell us what you want people to be able to do."
            cta={{ label: "Book a demo", href: "/contact" }}
          />
        </Reveal>
      </div>
    </InnerPage>
  );
}
