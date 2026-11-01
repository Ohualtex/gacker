import districtData from "../../../public/data/elazig-districts.svg.json";
import { discoverCopy } from "@/content/discover";
import type { Locale } from "@/lib/i18n";

/**
 * Footer için sade Elazığ silüeti: tüm ilçeler tek tonda, dış sınırda kilim kırmızısı çizgi.
 * Süs amaçlıdır (aria-hidden); sunucuda çizilir.
 */
export function FooterMap({ lang }: { lang: Locale }) {
  const t = discoverCopy[lang];
  return (
    <div className="max-w-[17rem]">
      <svg
        viewBox={districtData.viewBox}
        aria-hidden="true"
        focusable="false"
        className="block h-auto w-full overflow-visible"
      >
        {/* Alt katman: kalın kilim çizgisi; iç sınırları üstteki dolgu örter, yalnız dış kontur kalır */}
        <g
          fill="var(--kilim)"
          stroke="var(--kilim)"
          strokeWidth="9"
          strokeLinejoin="round"
        >
          {districtData.districts.map((d) => (
            <path key={d.id} d={d.path} />
          ))}
        </g>
        <g
          fill="color-mix(in oklab, var(--almond) 26%, var(--cream))"
          stroke="color-mix(in oklab, var(--almond) 26%, var(--cream))"
          strokeWidth="1.5"
          strokeLinejoin="round"
        >
          {districtData.districts.map((d) => (
            <path key={d.id} d={d.path} />
          ))}
        </g>
      </svg>
      <p className="mt-4 flex items-baseline gap-2">
        <span className="font-display text-xl">{t.footerLabel}</span>
        <span className="text-sm text-ink-2">· {t.footerCaption}</span>
      </p>
      <p className="mt-1 text-xs text-ink-2">{t.footerAttribution}</p>
    </div>
  );
}
