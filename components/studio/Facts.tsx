/**
 * How we work, technology, partners, recognition: the deck's four short
 * sections as a spec sheet of hairline rows. Bracketed lists stay bracketed.
 */
const ROWS: { heading: string; body: string; accent: string }[] = [
  {
    heading: "How we work",
    body: "Small teams, one producer per project, and a weekly build that anyone in the company can open. Everything is tested on the cheapest device in the deployment before it is tested on the newest. Nothing ships without a teacher, a curator or an end user in the room.",
    accent: "#F5A623",
  },
  {
    heading: "Technology",
    body: "[Unity, Unreal Engine, Blender, Maya, Substance, 8th Wall, ARKit, ARCore, WebXR, .NET and C# for platform services, Meta Quest hardware, photogrammetry rig.]",
    accent: "#2C276C",
  },
  {
    heading: "Partners",
    body: "[LASRIC, NITDA, NTI, CcHUB, ReLearn.]",
    accent: "#B6502E",
  },
  {
    heading: "Recognition",
    body: "[List only awards, selections and fellowships you can evidence, with the year. If the list is short, a short true list is better than a padded one.]",
    accent: "#8F87CF",
  },
];

export function Facts() {
  return (
    <section className="px-8 py-16 md:px-16 md:py-24">
      <ol className="border-t border-border-light">
        {ROWS.map((row) => (
          <li
            key={row.heading}
            className="grid grid-cols-1 gap-x-16 gap-y-3 border-b border-border-light py-8 lg:grid-cols-[1fr_1.6fr]"
          >
            <div className="flex items-start gap-4">
              <span
                className="relative mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-[1.5px]"
                style={{ borderColor: row.accent }}
                aria-hidden="true"
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: row.accent }} />
              </span>
              <h2 className="font-display text-[22px] leading-tight text-ink md:text-[26px]">{row.heading}</h2>
            </div>
            <p className="font-sans text-[16px] leading-relaxed text-body md:text-[17px]">{row.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
