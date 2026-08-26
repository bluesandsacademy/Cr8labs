import { StatChip } from "@/components/ui/StatChip";

/**
 * The flagship case study, in the copy deck's own structure. The header
 * carries the title and client; each beat is a two-column section with the
 * heading pinned on lg while the copy scrolls (the Home SectionTeaser
 * pattern), on whatever tone the page gives it.
 */
export function CaseStudyHeader() {
  return (
    <section className="px-8 pb-6 pt-20 md:px-16 md:pt-28">
      <div className="mb-4 flex items-center gap-2.5">
        <span className="relative flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border-[1.5px] border-adire">
          <span className="h-1 w-1 rounded-full bg-adire" />
        </span>
        <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-adire">
          Flagship case study
        </p>
      </div>
      <h2 className="max-w-200 font-display text-[36px] leading-[1.06] text-ink md:text-[54px]">
        Building practical science for classrooms with no laboratory
      </h2>
      <p className="mt-6 font-mono text-[12px] uppercase tracking-wide text-muted">
        Client: Blue Sands STEM Labs, the first platform built on CR8LAB technology
      </p>
    </section>
  );
}

const TONE_TEXT = {
  light: { heading: "text-ink", body: "text-body", note: "text-muted", ring: "border-adire", dot: "bg-adire" },
  adire: { heading: "text-bone", body: "text-bone/80", note: "text-adire-caption", ring: "border-danfo", dot: "bg-danfo" },
  ink: { heading: "text-bone", body: "text-bone/80", note: "text-bone/55", ring: "border-danfo", dot: "bg-danfo" },
} as const;

export function CaseBeat({
  heading,
  body,
  note,
  tone,
  media,
}: {
  heading: string;
  body: string;
  note?: string;
  tone: keyof typeof TONE_TEXT;
  /** An image for the beat, rendered beneath the copy; the deck's words stay the only words. */
  media?: React.ReactNode;
}) {
  const t = TONE_TEXT[tone];
  return (
    <section className="px-8 py-16 md:px-16 md:py-24">
      <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-[1fr_1.4fr]">
        <div className="self-start lg:sticky lg:top-28">
          <div className="mb-4 flex items-center gap-2.5">
            <span
              className={`relative flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border-[1.5px] ${t.ring}`}
            >
              <span className={`h-1 w-1 rounded-full ${t.dot}`} />
            </span>
            <div className="h-px w-12 bg-current opacity-20" />
          </div>
          <h3 className={`font-display text-[30px] leading-[1.08] md:text-[40px] ${t.heading}`}>{heading}</h3>
        </div>
        <div>
          <p className={`font-sans text-[17px] leading-relaxed md:text-[19px] ${t.body}`}>{body}</p>
          {note && <p className={`mt-6 font-mono text-[11px] tracking-wide ${t.note}`}>{note}</p>}
          {media && <div className="mt-10">{media}</div>}
        </div>
      </div>
    </section>
  );
}

const IMPACT: { value: string; label: string }[] = [
  { value: "[100]+", label: "schools onboarded across [6] countries" },
  { value: "[20,000]+", label: "students reached" },
  { value: "[250]+", label: "experiments live" },
  { value: "[X]", label: "teachers certified" },
  { value: "[X] percent", label: "higher reported engagement in participating classrooms" },
];

export function ImpactBeat() {
  return (
    <section className="px-8 py-16 md:px-16 md:py-24">
      <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-[1fr_1.4fr]">
        <div className="self-start lg:sticky lg:top-28">
          <div className="mb-4 flex items-center gap-2.5">
            <span className="relative flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border-[1.5px] border-danfo">
              <span className="h-1 w-1 rounded-full bg-danfo" />
            </span>
            <div className="h-px w-12 bg-bone/20" />
          </div>
          <h3 className="font-display text-[30px] leading-[1.08] text-bone md:text-[40px]">Impact</h3>
        </div>
        <div>
          <div className="grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {IMPACT.map((stat) => (
              <StatChip key={stat.label} value={stat.value} label={stat.label} tone="dark" />
            ))}
          </div>
          <p className="mt-10 border-t border-bone/15 pt-6 font-sans text-[15px] text-bone/75">
            Institutional work with [LASRIC, NITDA, NTI, CcHUB, ReLearn]
          </p>
        </div>
      </div>
    </section>
  );
}
