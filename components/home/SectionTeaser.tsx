import { Button } from "@/components/ui/Button";

export function SectionTeaser({
  eyebrow,
  heading,
  body,
  cta,
}: {
  eyebrow?: string;
  heading: string;
  body: string;
  cta?: { label: string; href: string };
}) {
  return (
    <section className="px-8 py-20 md:px-16 md:py-28">
      <div className="mx-auto max-w-160">
        {eyebrow && (
          <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-widest text-adire">
            {eyebrow}
          </p>
        )}
        <h2 className="font-display text-[32px] font-semibold leading-tight text-ink md:text-[40px]">
          {heading}
        </h2>
        <p className="mt-5 max-w-140 font-sans text-[17px] leading-relaxed text-body">{body}</p>
        {cta && (
          <div className="mt-8">
            <Button href={cta.href} variant="dark">
              {cta.label}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
