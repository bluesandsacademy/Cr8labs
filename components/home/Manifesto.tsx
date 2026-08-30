/**
 * The belief statement in bluesandsk12's "lead stat" card language (see
 * challenge.jsx): the whole thing sits inside one solid rounded card with a
 * flat offset shadow, not loose text over a ring decoration.
 */
export function Manifesto() {
  return (
    <section className="relative section-y overflow-hidden" style={{ background: "#F6F8FB" }}>
      <div className="relative page-frame">
        <div className="rounded-[2rem] bg-adire-dark p-8 shadow-[0_14px_0_rgba(23,19,15,0.12)] sm:p-12 lg:p-16">
          <p className="max-w-4xl font-display text-2xl leading-[1.2] text-bone sm:text-3xl lg:text-4xl">
            We build the layer between a story and <span className="text-danfo">an experience</span>
          </p>
          <p className="mt-8 max-w-2xl font-sans text-base font-semibold leading-relaxed text-bone/75 sm:text-lg">
            The world has incredible stories, knowledge, and culture. Most of it still lives on paper,
            flat screens and static displays. We bring them into three dimensions, using Augmented
            Reality (AR), Virtual Reality (VR), Artificial Intelligence and interactive storytelling.
            Because the future isn&apos;t just digital. It&apos;s immersive.
          </p>
        </div>
      </div>
    </section>
  );
}
