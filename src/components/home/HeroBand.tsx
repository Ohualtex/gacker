"use client";

import { TiltedGridHero } from "@/components/ui/tilted-grid-hero";

export function HeroBand({ images }: { images: { src: string; alt: string }[] }) {
  return (
    <TiltedGridHero
      images={images}
      speed={3.6}
      tileHeight={34}
      aspectRatio={4 / 3}
      gap={8}
      axis={58}
      curve={72}
      fade={10}
      className="pointer-events-none absolute inset-0 -z-20"
      aria-hidden
    />
  );
}
