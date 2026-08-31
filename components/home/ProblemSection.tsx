// No numerals anywhere on this section (standing instruction, repeated
// several times) — not even the oversized ghost-numeral version this held
// before. The headline itself carries the weight a number used to: a wide
// two-column row per problem, bold name on the left, body on the right,
// nothing else marking the item.
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

        <div className="mx-auto max-w-4xl divide-y divide-bone/10 border-t border-bone/10">
          {PROBLEMS.map((problem) => (
            <div
              key={problem.name}
              className="grid grid-cols-1 gap-3 py-8 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] sm:gap-10 lg:py-10"
            >
              <h3 className="font-display text-xl font-bold leading-snug text-bone sm:text-2xl">
                {problem.name}
              </h3>
              <p className="max-w-md font-sans text-base font-semibold leading-relaxed text-bone/70">
                {problem.body}
              </p>
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
