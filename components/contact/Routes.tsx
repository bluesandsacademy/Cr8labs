const ACCENTS = ["#F5A623", "#2C276C", "#B6502E", "#F5A623", "#2C276C", "#B6502E", "#F5A623"];

/** The deck's seven routes, verbatim, each with its `?route=` key. */
export const ROUTES: { key: string; name: string; body: string }[] = [
  {
    key: "demo",
    name: "Book a demo",
    body: "Thirty minutes with the platform in your hands, run by someone who has deployed it in a school. For school leaders, ministries and institutional buyers.",
  },
  {
    key: "partner",
    name: "Partner with us",
    body: "For publishers, museums, brands, distributors and technology partners. Tell us what you have and what you want to reach, and we will tell you honestly whether we are the right build partner.",
  },
  {
    key: "fund",
    name: "Fund innovation",
    body: "For investors, funds and grant makers. We will send the deck, the metrics and access to a live deployment. We would rather you saw it running than read about it.",
  },
  {
    key: "join",
    name: "Join the team",
    body: "Roles across 3D, animation, engine development, platform engineering, writing, curriculum and production. Show us something you built and explain the decisions in it.",
  },
  {
    key: "publish",
    name: "Become a publisher",
    body: "Licence the AR engine and library for your titles, or co-publish new ones with our studio. Rights terms in plain language.",
  },
  {
    key: "research",
    name: "Research collaboration",
    body: "Universities, institutes and funders running studies inside live deployments, or seeking data for their own.",
  },
  {
    key: "press",
    name: "Media enquiries",
    body: "Interviews, comment, images and the media kit. We answer press within [one] working day.",
  },
];

/**
 * Seven routes on the contact-sheet grid. Each cell links to the form with
 * its route preselected, so choosing a route is one tap.
 */
export function Routes() {
  return (
    <section className="px-8 py-16 md:px-16 md:py-24">
      <ul className="grid grid-cols-1 border-l border-t border-border-light sm:grid-cols-2 lg:grid-cols-3">
        {ROUTES.map((route, i) => (
          <li key={route.key} className="group border-b border-r border-border-light">
            <a
              href={`?route=${route.key}#form`}
              className="focus-ring-light block h-full p-6 transition-colors duration-300 hover:bg-ink/[0.03] md:p-7"
            >
              <span
                className="relative mb-5 flex h-9 w-9 items-center justify-center rounded-full border-[1.5px]"
                style={{ borderColor: ACCENTS[i] }}
                aria-hidden="true"
              >
                <span
                  className="h-1.5 w-1.5 rounded-full transition-transform duration-300 group-hover:scale-[1.8]"
                  style={{ backgroundColor: ACCENTS[i] }}
                />
              </span>
              <h2 className="font-display text-[21px] leading-tight text-ink">{route.name}</h2>
              <p className="mt-2 font-sans text-[14px] leading-relaxed text-body">{route.body}</p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Hero device: one ring, the seven routes as points on it, a danfo centre. */
export function RoutesRing() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-90" aria-hidden="true">
      <div className="absolute inset-0 rounded-full border border-adire-light/40" />
      <div className="absolute inset-[18%] rounded-full border border-dashed border-adire-light/30 motion-safe:animate-[orbit-reverse_120s_linear_infinite]" />
      {ROUTES.map((route, i) => {
        const angle = (i / ROUTES.length) * 2 * Math.PI - Math.PI / 2;
        return (
          <span
            key={route.key}
            className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: `${50 + 50 * Math.cos(angle)}%`,
              top: `${50 + 50 * Math.sin(angle)}%`,
              backgroundColor: ["#F5A623", "#8F87CF", "#D97A50"][i % 3],
              boxShadow: `0 0 12px ${["#F5A623", "#8F87CF", "#D97A50"][i % 3]}66`,
            }}
          />
        );
      })}
      <span className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-danfo shadow-[0_0_30px_rgba(245,166,35,0.6)]" />
    </div>
  );
}
