import Image from "next/image";
import { ImageSlot, type Motif } from "@/components/ui/ImageSlot";
import type { Producer } from "@/data/producers";

/** Üreticinin fotoğrafı varsa onu, yoksa kasıtlı görünen yer tutucuyu gösterir. */
export function ProducerImage({
  producer,
  label,
  hint,
  motif = "tray",
  sizes,
  showLabel = true,
  className = "",
}: {
  producer: Producer;
  label: string;
  hint: string;
  motif?: Motif;
  sizes: string;
  showLabel?: boolean;
  className?: string;
}) {
  if (producer.image) {
    return (
      <div className={`relative aspect-[4/3] overflow-hidden rounded-[4px] bg-cream ${className}`}>
        <Image
          src={producer.image}
          alt={label}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
      </div>
    );
  }
  return <ImageSlot label={label} hint={hint} motif={motif} showLabel={showLabel} className={className} />;
}
