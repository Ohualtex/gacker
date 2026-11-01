import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { discover as copy, discoverMarkers } from "@/content/home";
import { KilimBand } from "@/components/ui/KilimBand";
import { Rise } from "./motion";
import { DiscoverMapDraw, type MapDistrict, type MapMarker } from "./DiscoverMapDraw";

type DistrictsFile = {
  viewBox: string;
  districts: { id: string; name_tr: string; name_en: string; path: string }[];
};
type PlacesFile = {
  places: { id: string; name_tr: string; name_en: string; svg: [number, number] }[];
};

function readJson<T>(rel: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), "public", "data", rel), "utf8")) as T;
}

/** İlçe haritası: SVG yolları build sırasında JSON'dan okunur ve sunucuda çizilir. */
export function Discover({ lang }: { lang: Locale }) {
  const d = readJson<DistrictsFile>("elazig-districts.svg.json");
  const pl = readJson<PlacesFile>("elazig-places.json");

  const districts: MapDistrict[] = d.districts.map((x) => ({
    id: x.id,
    name: lang === "tr" ? x.name_tr : x.name_en,
    d: x.path,
  }));
  const markers: MapMarker[] = discoverMarkers.flatMap((m) => {
    const p = pl.places.find((q) => q.id === m.id);
    if (!p) return [];
    return [
      {
        id: p.id,
        name: lang === "tr" ? p.name_tr : p.name_en,
        x: Math.round(p.svg[0] * 10) / 10,
        y: Math.round(p.svg[1] * 10) / 10,
        side: m.side,
        dy: m.dy ?? 0,
      },
    ];
  });

  return (
    <section className="relative isolate overflow-hidden bg-[var(--dc-bg)] text-[var(--dc-fg)]">
      <KilimBand height={16} />
      <svg aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full"
        style={{ opacity: "var(--dc-weave-op)" }}>
        <defs>
          <pattern id="disc-weave" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M32 4 60 32 32 60 4 32Z" fill="none" stroke="var(--dc-weave)" strokeWidth="1" />
            <path d="M32 20 44 32 32 44 20 32Z" fill="none" stroke="var(--dc-weave)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#disc-weave)" />
      </svg>

      <div className="container-x grid items-center gap-10 py-24 md:grid-cols-12 md:py-36">
        <div className="md:col-span-4">
          <Rise x={-60} y={0} duration={1.5}>
            <h2 className="text-[clamp(2.6rem,5.4vw,4.8rem)]">{copy.title[lang]}</h2>
          </Rise>
          <Rise delay={0.3}>
            <p className="mt-7 max-w-[34ch] text-[var(--dc-fg-2)]">{copy.body[lang]}</p>
            <Link
              href={`/${lang}/kesfet`}
              className="mt-9 inline-flex items-center gap-2 rounded-[3px] bg-[var(--dc-btn-bg)] px-7 py-3.5 text-[0.95rem] font-semibold text-[var(--dc-btn-fg)] shadow-warm transition-transform duration-300 hover:-translate-y-0.5"
            >
              {copy.cta[lang]}
              <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
            </Link>
          </Rise>
        </div>
        <div className="md:col-span-8">
          <DiscoverMapDraw viewBox={d.viewBox} districts={districts} markers={markers} label={copy.mapLabel[lang]} />
        </div>
      </div>
      <KilimBand height={16} />
    </section>
  );
}
