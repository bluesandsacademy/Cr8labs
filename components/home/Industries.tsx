import Image from "next/image";
import { Briefcase } from "lucide-react";

// Ported exactly from bluesandsk12's own audiences.jsx: tall poster cards
// (not a squat aspect-[4/3] box), title pinned to the top, tagline and body
// pinned to the bottom, one scrim that's darkest at both ends and lightest
// through the middle so the photo's own subject still reads. No icon badge —
// their reference doesn't use one either.
const SCRIM =
  "linear-gradient(180deg, rgba(23,19,15,0.7) 0%, rgba(23,19,15,0.12) 26%, rgba(23,19,15,0.36) 54%, rgba(23,19,15,0.94) 100%)";

const SECTORS = [
  {
    name: "Education",
    // Each tagline is the exact H1 from that sector's own Solutions page —
    // not a shortened paraphrase, which is what this line held before.
    tagline: "Laboratories, field trips and practicals with no building required.",
    line: "Schools, universities and ministries. Laboratories, field trips and practicals that no budget or building could otherwise deliver.",
    image: {
      src: "/brand/ceo/into-the-community.png",
      alt: "A girl wearing a VR headset beside a tablet on a carved stand, exploring an AR book experience",
    },
  },
  {
    name: "Culture and publishing",
    tagline: "Collections people can enter, not just look at.",
    line: "Museums, publishers, archives and tourism boards. Collections and titles that visitors can enter instead of observe.",
    image: {
      src: "/brand/ceo/kemet-heritage-family.png",
      alt: "A family wearing VR headsets in front of a heritage site, viewing a 3D reconstruction of an ancient temple on a tablet",
    },
  },
  {
    name: "Brands and enterprise",
    tagline: "Let customers hold the product before they own it.",
    line: "Agencies, retailers and consumer brands. Products, activations and stores that customers can hold, configure and walk through.",
    image: null,
  },
  {
    name: "Training and simulation",
    tagline: "Practice the thing that is too costly to practise.",
    line: "Employers, health services and technical operators. Repeatable practice on the tasks that carry real cost when they go wrong.",
    image: {
      src: "/brand/ceo/training-simulation.png",
      alt: "Medical staff wearing VR headsets practising a surgical simulation, with a trainee reviewing a scored training dashboard on a tablet",
    },
  },
];

export function Industries() {
  return (
    <section className="relative section-y overflow-hidden bg-adire-dark">
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-danfo/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-adire-light/25 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative page-frame">
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <span className="inline-block font-mono text-xs font-bold uppercase tracking-[0.14em] text-danfo sm:text-sm">
            Who we build for
          </span>
          <h2 className="mt-3 font-display text-3xl leading-tight text-bone sm:text-4xl lg:text-5xl">
            Built for anyone with something worth stepping into.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SECTORS.map((sector) =>
            sector.image ? (
              <div
                key={sector.name}
                className="group relative aspect-[9/16] overflow-hidden rounded-[1.6rem] shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)] ring-1 ring-white/5 transition-transform duration-300 hover:-translate-y-2 sm:aspect-[10/17] lg:aspect-[8/19]"
              >
                <Image
                  src={sector.image.src}
                  alt={sector.image.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0" style={{ background: SCRIM }} />

                <h3 className="absolute inset-x-0 top-0 p-6 font-display text-xl font-bold leading-tight text-bone drop-shadow">
                  {sector.name}
                </h3>

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="font-display text-lg font-bold leading-snug text-bone drop-shadow">
                    {sector.tagline}
                  </p>
                  <p className="mt-2.5 font-sans text-sm font-semibold leading-relaxed text-bone/85">
                    {sector.line}
                  </p>
                </div>
              </div>
            ) : (
              // No real photo depicts this one honestly; same card shape and
              // rhythm, a solid brand panel standing in for a photo instead.
              <div
                key={sector.name}
                className="group relative flex aspect-[9/16] flex-col justify-between overflow-hidden rounded-[1.6rem] p-6 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)] ring-1 ring-white/5 transition-transform duration-300 hover:-translate-y-2 sm:aspect-[10/17] lg:aspect-[8/19]"
                style={{ background: "linear-gradient(160deg, #332D7C 0%, #211D54 60%, #1A1748 100%)" }}
              >
                <h3 className="font-display text-xl font-bold leading-tight text-bone">{sector.name}</h3>
                <Briefcase className="h-10 w-10 self-center text-danfo/70" strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <p className="font-display text-lg font-bold leading-snug text-bone">{sector.tagline}</p>
                  <p className="mt-2.5 font-sans text-sm font-semibold leading-relaxed text-bone/85">
                    {sector.line}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
