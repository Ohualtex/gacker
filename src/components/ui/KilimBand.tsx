import { useId } from "react";

/**
 * Kilim bordürü: baklava dizilimli ince SVG bandı.
 * Renkler CSS değişkenlerinden gelir; koyu temada otomatik uyum sağlar.
 */
export function KilimBand({
  height = 18,
  className = "",
}: {
  height?: number;
  className?: string;
}) {
  const id = useId();
  const patternId = `kilim-${id.replace(/:/g, "")}`;
  return (
    <svg
      aria-hidden="true"
      role="presentation"
      width="100%"
      height={height}
      className={className}
      preserveAspectRatio="none"
    >
      <defs>
        <pattern
          id={patternId}
          width="28"
          height="18"
          patternUnits="userSpaceOnUse"
          patternTransform={`scale(${height / 18})`}
        >
          <rect width="28" height="18" fill="var(--cream)" />
          <rect y="0" width="28" height="2" fill="var(--kilim-deep)" />
          <rect y="16" width="28" height="2" fill="var(--kilim-deep)" />
          <polygon points="14,2.5 24,9 14,15.5 4,9" fill="var(--kilim)" />
          <polygon points="14,5.5 19.5,9 14,12.5 8.5,9" fill="var(--saffron)" />
          <rect x="13" y="8" width="2" height="2" fill="var(--kilim-deep)" />
          <rect x="0" y="8" width="2" height="2" fill="var(--olive)" />
          <rect x="26" y="8" width="2" height="2" fill="var(--olive)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
