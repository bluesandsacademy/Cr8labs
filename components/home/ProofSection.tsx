import Image from "next/image";
import { Button } from "@/components/ui/Button";

const STATS: { value: string; label: string }[] = [
  { value: "[100]+", label: "schools" },
  { value: "[20,000]+", label: "students" },
  { value: "[6]", label: "countries" },
];

/**
 * The proof section: real classrooms, so it gets the page's most grounded
 * treatment. The photograph sits in a portal arch (a ring opened into a
 * doorway: the motif as a threshold into an actual classroom), framed by the
 * system's standard double-ring border, with the deployment stats as mono
 * chips under the copy. Stats stay bracketed until real figures are supplied.
 */
export function ProofSection() {
  return (
    <section className="relative overflow-hidden border-t border-border-light px-8 py-16 md:px-16 md:py-24">
      <div className="grid grid-cols-1 items-center gap-x-20 gap-y-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-widest text-adire">
            Work
          </p>
          <h2 className="max-w-150 font-display text-[30px] leading-[1.12] text-ink md:text-[40px]">
            Most companies in this category show a demo. We can show you a product in daily use.
          </h2>
          <p className="mt-6 max-w-140 font-sans text-[16px] leading-relaxed text-body md:text-[17px]">
            Blue Sands is the first platform built on CR8LAB technology. It runs offline, on the
            devices those schools already own, in front of the least forgiving audience there is,
            which is a room of nine year olds. Everything we build afterwards is held to that
            standard.
          </p>

          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div className="font-mono text-[24px] font-bold text-ink">
                  <span className="text-laterite-text">{stat.value.replace(/\+$/, "")}</span>
                  {stat.value.endsWith("+") ? "+" : ""}
                </div>
                <div className="mt-0.5 font-sans text-[12px] tracking-wide text-muted">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-9">
            <Button href="/work" variant="dark">
              Read the case study
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-105">
          <div className="rounded-t-full border-2 border-adire p-3">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-full">
              <Image
                src="/brand/proof-classroom.png"
                alt="Three students sharing a tablet at a wooden desk in a real classroom, laughing together, with a chalkboard and warm window light behind them"
                fill
                sizes="(min-width: 1024px) 420px, 90vw"
                className="object-cover"
              />
            </div>
          </div>
          <span
            className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-danfo motion-safe:animate-[pulse-soft_3.5s_ease-in-out_infinite]"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
