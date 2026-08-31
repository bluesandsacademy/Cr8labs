// A second, deliberately different attempt at this section: not a card grid
// (that's Industries' language, not this one's), not a plain numbered list
// either (too quiet to match the rest of the page). Oversized ghost numerals
// carry the editorial weight instead — no icon, no photo, no box, just scale
// contrast — on adire-dark so the lemon numeral reads at full strength
// rather than the near-invisible lemon-on-white the first draft shipped with.
const PROBLEMS = [
  {
    name: "Locked in static formats",
    body: "Books, archives, museum collections and curricula stay two dimensional. The experience ends at the page or the display case.",
  },
  {
    name: "Immersive tech is out of reach",
    body: "AR, VR and 3D production demand studios, engines and specialists that most institutions and creators cannot staff.",
  },
  {
    name: "Culture is under digitised",
    body: "African heritage, language and history are barely represented in 3D, so the global immersive canon is being written without us.",
  },
  {
    name: "Audiences moved first",
    body: "Younger audiences already expect to interact, not observe. Flat content loses them before the story lands.",
  },
];

export function ProblemSection() {
  return (
    <section className="relative section-y overflow-hidden bg-adire-dark">
      <div
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-danfo/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-adire-light/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative page-frame">
        <div className="mx-auto mb-16 max-w-2xl text-center lg:mb-20">
          <span className="inline-block font-mono text-xs font-bold uppercase tracking-[0.14em] text-danfo sm:text-sm">
            The problem
          </span>
          <h2 className="mt-3 font-display text-3xl leading-tight text-bone sm:text-4xl lg:text-5xl">
            Africa has the stories. They are stuck flat.
          </h2>
          <p className="mx-auto mt-4 max-w-md font-sans text-lg font-semibold text-bone/70">
            The continent holds enormous narrative, cultural and scientific capital. Almost all of it
            sits in formats that can only be read or watched, never entered.
          </p>
        </div>

        <div className="mx-auto max-w-4xl divide-y divide-bone/10">
          {PROBLEMS.map((problem, i) => (
            <div key={problem.name} className="relative flex items-center gap-2 py-8 sm:gap-8 sm:py-10">
              <span
                className="pointer-events-none select-none font-display text-[64px] leading-none text-danfo/[0.14] sm:text-[96px] lg:text-[120px]"
                aria-hidden="true"
              >
                0{i + 1}
              </span>
              <div className="relative -ml-6 sm:-ml-10 lg:-ml-14">
                <h3 className="font-display text-xl font-bold leading-snug text-bone sm:text-2xl">
                  {problem.name}
                </h3>
                <p className="mt-2 max-w-md font-sans text-base font-semibold leading-relaxed text-bone/70">
                  {problem.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-16 max-w-3xl font-display text-2xl leading-snug text-bone lg:mt-20 lg:text-3xl">
          The gap is not content. The gap is dimension.
        </p>
      </div>
    </section>
  );
}
