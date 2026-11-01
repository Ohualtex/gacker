import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { hasLocale } from "@/lib/i18n";
import { PageHeader } from "@/components/ui/PageHeader";
import { KilimBand } from "@/components/ui/KilimBand";
import { DiscoverMap, type MapPlace } from "@/components/discover/DiscoverMap";
import { DiscoverList, type DiscoverEntry } from "@/components/discover/DiscoverList";
import { DiscoverGuide, type GuideRoute, type GuideSide, type GuideStop } from "@/components/discover/DiscoverGuide";
import { GlossaryBrowser } from "@/components/glossary/GlossaryBrowser";
import { discoverCopy, extraPlaceText, labelOffsets, markerOffsets, softenedText } from "@/content/discover";
import { dayParts, discoverJump, guideCopy, guideMarkerOffsets, guideRoutes, guideSideStop } from "@/content/guide";
import { glossaryUi } from "@/content/glossary-ui";
import districtData from "../../../../public/data/elazig-districts.svg.json";
import placesData from "../../../../public/data/elazig-places.json";
import discoverData from "../../../../public/data/elazig-discover.json";

const host = (url: string) => new URL(url).hostname.replace(/^www\./, "");

/** İki koordinat arasındaki kuş uçuşu mesafe (km, haversine). */
function haversineKm(a: { lat: number; lon: number }, b: { lat: number; lon: number }) {
  const rad = Math.PI / 180;
  const dLat = (b.lat - a.lat) * rad;
  const dLon = (b.lon - a.lon) * rad;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(h));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/kesfet">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);
  return { title: dict.pages.discover.title, description: dict.pages.discover.lead };
}

export default async function Page({ params }: PageProps<"/[lang]/kesfet">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = discoverCopy[lang];
  const pick = (o: { tr: string; en: string }) => o[lang];

  const items = discoverData.items;
  const bySlug = new Map(items.map((i) => [i.slug, i]));

  const places: MapPlace[] = placesData.places.map((p) => {
    const entry = bySlug.get(p.id);
    const soft = softenedText[p.id];
    const extra = extraPlaceText[p.id];
    const description = soft
      ? soft[lang]
      : entry
        ? lang === "tr"
          ? entry.description_tr
          : entry.description_en
        : extra
          ? extra[lang]
          : "";
    const source = entry?.source_url ?? extra?.source ?? p.source;
    const [ox, oy] = markerOffsets[p.id] ?? [0, 0];
    return {
      id: p.id,
      name: lang === "tr" ? p.name_tr : p.name_en,
      description,
      source,
      sourceHost: host(source),
      lat: p.lat,
      lon: p.lon,
      x: p.svg[0],
      y: p.svg[1],
      mx: p.svg[0] + ox,
      my: p.svg[1] + oy,
      softened: Boolean(entry?.verify),
    };
  });

  const districts = districtData.districts.map((d) => {
    const [lx, ly] = labelOffsets[d.id] ?? [0, 0];
    return {
      id: d.id,
      name: d.id === "merkez" ? pick({ tr: "Merkez", en: "Central" }) : pick({ tr: d.name_tr, en: d.name_en }),
      path: d.path,
      labelX: d.centroid[0] + lx,
      labelY: d.centroid[1] + ly,
    };
  });

  const toEntry = (i: (typeof items)[number]): DiscoverEntry => ({
    slug: i.slug,
    title: lang === "tr" ? i.title_tr : i.title_en,
    description: softenedText[i.slug]?.[lang] ?? (lang === "tr" ? i.description_tr : i.description_en),
    source: i.source_url,
    sourceHost: host(i.source_url),
    pending: i.verify,
  });
  const food = items.filter((i) => i.category === "food").map(toEntry);
  const placeEntries = items.filter((i) => i.category === "place").map(toEntry);

  // ── Gezi rehberi: yalnızca elazig-places.json'daki kaynaklı yerler ──
  const g = guideCopy[lang];
  const placeById = new Map(placesData.places.map((p) => [p.id, p]));
  const center = placeById.get("elazig-merkez")!;
  const centerPoint = { lat: center.lat, lon: center.lon };

  const guideStop = (
    placeId: string,
    partLabel: string,
    note: string,
    from: { lat: number; lon: number } | null,
    distanceFrom: "prev" | "center",
  ): GuideStop => {
    const p = placeById.get(placeId)!;
    const km = from ? Math.round(haversineKm(from, p)) : null;
    const [ox, oy] = guideMarkerOffsets[placeId] ?? [0, 0];
    const entry = bySlug.get(placeId);
    const source = entry?.source_url ?? extraPlaceText[placeId]?.source ?? p.source;
    return {
      placeId,
      name: lang === "tr" ? p.name_tr : p.name_en,
      partLabel,
      note,
      // 1 km altındaki farklar anlamlı değil; gösterme
      distanceKm: km !== null && km >= 1 ? km : null,
      distanceFrom,
      lat: p.lat,
      lon: p.lon,
      x: p.svg[0],
      y: p.svg[1],
      mx: p.svg[0] + ox,
      my: p.svg[1] + oy,
      source,
      sourceHost: host(source),
    };
  };

  const routes: GuideRoute[] = guideRoutes.map((r) => ({
    id: r.id,
    label: pick(r.label),
    days: r.days.map((d, di) => {
      const stops: GuideStop[] = [];
      d.stops.forEach((s, si) => {
        const prevId = si > 0 ? d.stops[si - 1].placeId : null;
        const prev = prevId ? placeById.get(prevId)! : null;
        const isCenterStart = si === 0 && s.placeId === "elazig-merkez";
        // Günün ilk durağı merkez değilse, mesafe şehir merkezinden verilir
        const from = prev ?? (isCenterStart ? null : centerPoint);
        stops.push(guideStop(s.placeId, pick(dayParts[s.part]), pick(s.note), from, prev ? "prev" : "center"));
      });
      return {
        heading: lang === "tr" ? `${di + 1}. ${g.day}` : `${g.day} ${di + 1}`,
        title: pick(d.title),
        stops,
      };
    }),
  }));

  const side: GuideSide = {
    ...guideStop(guideSideStop.placeId, "", pick(guideSideStop.note), centerPoint, "center"),
    title: g.sideTitle,
  };

  // Gezi listesine eklenebilecek tüm duraklar (rota sırasıyla, tekrarsız)
  const tripPlaces: GuideStop[] = [];
  for (const r of routes) for (const d of r.days) for (const s of d.stops) {
    if (!tripPlaces.some((x) => x.placeId === s.placeId)) tripPlaces.push(s);
  }
  tripPlaces.push(side);

  const routeIdSet = new Set(tripPlaces.map((p) => p.placeId));
  const otherPlaces = placesData.places
    .filter((p) => !routeIdSet.has(p.id))
    .map((p) => ({ id: p.id, x: p.svg[0], y: p.svg[1] }));

  const gl = glossaryUi[lang];

  return (
    <>
      <PageHeader title={dict.pages.discover.title} lead={dict.pages.discover.lead} />
      <div className="container-x pt-10 sm:pt-12">
        <nav aria-label={pick({ tr: "Sayfa bölümleri", en: "Page sections" })}>
          <ul className="flex flex-wrap gap-2">
            {discoverJump.map((j) => (
              <li key={j.id}>
                <a
                  href={`#${j.id}`}
                  className="inline-flex min-h-10 items-center rounded-[3px] border border-line px-3.5 text-sm font-semibold text-ink-2 transition-colors hover:border-almond hover:text-ink"
                >
                  {pick(j.label)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="container-x pt-10 sm:pt-12">
        <div id="harita" className="scroll-mt-28">
          <DiscoverMap
            viewBox={districtData.viewBox}
            districts={districts}
            places={places}
            labels={t}
            initialId="harput-kalesi"
          />
        </div>
      </div>
      <div className="mt-24">
        <KilimBand height={12} />
      </div>
      <div id="notlar" className="container-x scroll-mt-24 pt-20">
        <DiscoverList food={food} places={placeEntries} labels={{ ...t, title: t.listTitle, lead: t.listLead }} />
      </div>

      <div className="mt-28">
        <KilimBand height={16} />
      </div>
      <section id={g.id} aria-labelledby="gk-guide-heading" className="container-x scroll-mt-24 pt-20">
        <h2 id="gk-guide-heading" className="text-[clamp(2rem,4vw,3.25rem)]">
          {g.title}
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-ink-2">{g.lead}</p>
        <div className="mt-10">
          <DiscoverGuide
            labels={g}
            routes={routes}
            side={side}
            viewBox={districtData.viewBox}
            districts={districtData.districts.map((d) => ({ id: d.id, path: d.path }))}
            otherPlaces={otherPlaces}
            tripPlaces={tripPlaces}
          />
        </div>
      </section>

      <div className="mt-28">
        <KilimBand height={12} />
      </div>
      <section id={gl.id} aria-labelledby="gk-glossary-heading" className="container-x scroll-mt-24 pt-20">
        <h2 id="gk-glossary-heading" className="text-[clamp(2rem,4vw,3.25rem)]">
          {gl.title}
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-ink-2">{gl.lead}</p>
        <div className="mt-10">
          <GlossaryBrowser lang={lang} />
        </div>
      </section>
    </>
  );
}
