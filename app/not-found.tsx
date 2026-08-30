import { Nav } from "@/components/layout/Nav";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col bg-adire-dark">
      <Nav theme="dark" />
      <div className="relative flex flex-1 items-center overflow-hidden">
        <div
          className="pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-danfo/15 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-adire-light/20 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative page-frame py-20">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-danfo">Error 404</p>
          <h1 className="mt-5 font-display text-5xl text-bone sm:text-6xl lg:text-7xl">
            Nothing here<span className="text-adire-tint">.</span>
          </h1>
          <p className="mt-5 font-sans text-lg font-semibold text-bone/75">Not even in three dimensions.</p>
          <p className="mt-2 max-w-md font-sans text-base font-semibold leading-relaxed text-bone/75">
            Try the work, or tell us what you were looking for.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/products" variant="primary">
              See the work
            </Button>
            <Button href="/contact" variant="light">
              Get in touch
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
