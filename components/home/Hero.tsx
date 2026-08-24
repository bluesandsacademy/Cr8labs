import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <div className="px-8 py-10 md:px-16 lg:py-6">
      <h1 className="max-w-150 font-display text-[44px] font-bold leading-[1.02] tracking-tight text-bone md:text-[66px]">
        The future of learning lives <span className="text-danfo">beyond the page</span>
      </h1>
      <p className="mt-6 max-w-110 font-sans text-[17px] leading-relaxed text-bone/75 md:text-[18px]">
        CR8LAB builds experiences that join books, augmented reality, virtual reality,
        artificial intelligence and interactive storytelling into one platform. Knowledge
        you can hold, walk into and take apart.
      </p>
      <div className="mt-9 flex flex-wrap items-center gap-3.5">
        <Button href="/platform" variant="primary">
          Explore the platform
        </Button>
        <Button href="/contact" variant="ghost" theme="dark">
          Book a demo
        </Button>
      </div>
    </div>
  );
}
