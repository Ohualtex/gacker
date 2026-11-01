"use client";

import { TiltedGridHero } from "@/components/ui/tilted-grid-hero";
import { galleryItems } from "@/content/gallery";
import type { Locale } from "@/lib/i18n";

const IMAGES = galleryItems.map((item) => ({
  src: item.src,
  alt: "",
}));

export function HeroBand(_props: { lang: Locale }) {
  return (
    <TiltedGridHero
      images={IMAGES}
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
