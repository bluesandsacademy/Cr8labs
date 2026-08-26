import Image from "next/image";
import { MediaSlot } from "@/components/ui/MediaSlot";

/**
 * A wide photograph between two beats of copy: the page takes a breath and
 * shows rather than tells. Renders a captioned placeholder until the file
 * exists.
 */
export function ImageBand({
  image,
  placeholder,
  aspect = "aspect-[21/9]",
}: {
  image: { src: string; alt: string } | null;
  placeholder: string;
  aspect?: string;
}) {
  return (
    // Full section padding, not a sliver: a band often sits at a tone edge,
    // and the 60px feather there must never cross the picture's caption.
    <section className="px-8 py-16 md:px-16 md:py-20">
      <div className={`relative w-full overflow-hidden rounded-[6px] ${aspect}`}>
        {image ? (
          <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 90vw, 100vw" className="object-cover" />
        ) : (
          <MediaSlot className="h-full w-full" caption={`Placeholder: ${placeholder}`} />
        )}
      </div>
    </section>
  );
}
