"use client";

import { useEffect, useState } from "react";
import { ExternalLink, MapPin } from "lucide-react";
import "./discover-map.css";

export type MapDistrict = {
  id: string;
  name: string;
  path: string;
  labelX: number;
  labelY: number;
};

export type MapPlace = {
  id: string;
  name: string;
  description: string;
  source: string;
  sourceHost: string;
  lat: number;
  lon: number;
  /** Gerçek konum (SVG birimi) */
  x: number;
  y: number;
  /** İşaretin çizildiği konum (yakın noktalar için kaydırılmış olabilir) */
  mx: number;
  my: number;
  softened: boolean;
};

export type MapLabels = {
  mapLabel: string;
  mapHint: string;
  placesTitle: string;
  openInMaps: string;
  source: string;
  verifyNote: string;
  approx: string;
  attribution: string;
};

const TAG_SIDE: Record<string, "r" | "l"> = {
  "harput-kalesi": "r",
  "harput-ulu-cami": "l",
  "elazig-merkez": "l",
  sivrice: "l",
};

function tagClass(p: MapPlace) {
  const side = TAG_SIDE[p.id];
  if (side) return `dm-tag-${side}`;
  if (p.mx < 200) return "dm-tag-edge-l";
  if (p.mx > 800) return "dm-tag-edge-r";
  return "";
}

const W = 1000;
const H = 616;

export function DiscoverMap({
  viewBox,
  districts,
  places,
  labels,
  initialId,
}: {
  viewBox: string;
  districts: MapDistrict[];
  places: MapPlace[];
  labels: MapLabels;
  initialId: string;
}) {
  const [activeId, setActiveId] = useState(initialId);
  const active = places.find((p) => p.id === activeId) ?? places[0];

  // Gezi rehberindeki "Haritada göster" düğmesi haritayı o noktaya odaklar
  useEffect(() => {
    const onFocusPlace = (e: Event) => {
      const id = (e as CustomEvent<{ id?: string }>).detail?.id;
      if (id && places.some((p) => p.id === id)) setActiveId(id);
    };
    window.addEventListener("gk-discover:focus", onFocusPlace);
    return () => window.removeEventListener("gk-discover:focus", onFocusPlace);
  }, [places]);

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-14">
      <div>
        <div className={"dm-stage"}>
          <svg
            viewBox={viewBox}
            className={"dm-svg"}
            role="img"
            aria-label={labels.mapLabel}
          >
            <g>
              {districts.map((d) => (
                <path key={d.id} d={d.path} className={"dm-district"} />
              ))}
            </g>
            <g className={"dm-district-name-wrap"}>
              {districts.map((d) => (
                <text key={d.id} x={d.labelX} y={d.labelY} className={"dm-district-name"}>
                  {d.name}
                </text>
              ))}
            </g>
            <g>
              {places
                .filter((p) => p.mx !== p.x || p.my !== p.y)
                .map((p) => (
                  <g key={p.id}>
                    <line x1={p.x} y1={p.y} x2={p.mx} y2={p.my} className={"dm-leader"} />
                    <circle cx={p.x} cy={p.y} r={2.8} className={"dm-true-point"} />
                  </g>
                ))}
            </g>
          </svg>

          {places.map((p) => {
            const on = p.id === active.id;
            return (
              <button
                key={p.id}
                type="button"
                aria-label={p.name}
                aria-pressed={on}
                className={`dm-marker ${on ? "dm-marker-on" : ""}`}
                style={{ left: `${(p.mx / W) * 100}%`, top: `${(p.my / H) * 100}%` }}
                onClick={() => setActiveId(p.id)}
                onFocus={() => setActiveId(p.id)}
                onPointerEnter={(e) => {
                  if (e.pointerType === "mouse") setActiveId(p.id);
                }}
              >
                <svg viewBox="0 0 18 24" className={"dm-almond"} aria-hidden="true">
                  <path
                    className={"dm-almond-body"}
                    d="M9 1.2C13.4 6 16.6 10.6 16.6 15.2 16.6 19.6 13.2 22.8 9 22.8 4.8 22.8 1.4 19.6 1.4 15.2 1.4 10.6 4.6 6 9 1.2Z"
                  />
                  <path className={"dm-almond-vein"} d="M9 7.5V17" />
                </svg>
              </button>
            );
          })}

          <span
            key={active.id}
            className={`dm-tag ${tagClass(active)}`}
            style={{ left: `${(active.mx / W) * 100}%`, top: `${(active.my / H) * 100}%` }}
            aria-hidden="true"
          >
            {active.name}
          </span>
        </div>

        <p className="mt-4 text-sm text-ink-2">{labels.mapHint}</p>
        <p className="mt-1 text-xs text-ink-2">
          {labels.approx} {labels.attribution}
        </p>
      </div>

      <aside className="lg:sticky lg:top-28" aria-live="polite">
        <div key={active.id} className={"dm-panel-body"}>
          <h2 className="text-[clamp(1.75rem,3vw,2.5rem)]">{active.name}</h2>
          <p className="mt-4 max-w-[62ch] text-ink-2">{active.description}</p>
          {active.softened && (
            <p className="mt-3 max-w-[62ch] text-sm text-almond">{labels.verifyNote}</p>
          )}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${active.lat},${active.lon}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-[3px] bg-kilim px-4 text-[0.9375rem] font-semibold text-on-kilim transition-[background-color,transform] duration-200 hover:bg-kilim-deep active:scale-[0.98]"
            >
              <MapPin size={18} strokeWidth={1.75} aria-hidden="true" />
              {labels.openInMaps}
            </a>
            <a
              href={active.source}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline inline-flex items-center gap-1.5 text-sm text-ink-2 hover:text-ink"
            >
              {labels.source}: {active.sourceHost}
              <ExternalLink size={14} strokeWidth={1.75} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-line pt-6">
          <h3 className="font-display text-xl">{labels.placesTitle}</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {places.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  aria-pressed={p.id === active.id}
                  className={`dm-chip ${p.id === active.id ? "dm-chip-on" : ""}`}
                  onClick={() => setActiveId(p.id)}
                >
                  {p.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
