"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Check, ExternalLink, MapPin, Plus, Printer, Route, X } from "lucide-react";
import { useTripList } from "./useTripList";
import type { guideCopy } from "@/content/guide";
import "./discover-guide.css";

export const DISCOVER_FOCUS_EVENT = "gk-discover:focus";
export const DISCOVER_MAP_ID = "harita";

export type GuideLabels = { [K in keyof (typeof guideCopy)["tr"]]: string };

export type GuideStop = {
  placeId: string;
  name: string;
  partLabel: string;
  note: string;
  /** Kuş uçuşu mesafe (km, koordinatlardan hesaplanır); yoksa null. */
  distanceKm: number | null;
  distanceFrom: "prev" | "center";
  lat: number;
  lon: number;
  /** Gerçek konum ve işaretin çizildiği konum (SVG birimi, 1000x616). */
  x: number;
  y: number;
  mx: number;
  my: number;
  source: string;
  sourceHost: string;
};

export type GuideDay = { heading: string; title: string; stops: GuideStop[] };
export type GuideRoute = { id: string; label: string; days: GuideDay[] };
export type GuideSide = GuideStop & { title: string };

type Row =
  | { kind: "day"; key: string; heading: string; title: string; dayNo: number }
  | { kind: "stop"; key: string; stop: GuideStop; idx: number; dayNo: number; dayIdx: number };

const W = 1000;
const H = 616;
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const mapsUrl = (s: { lat: number; lon: number }) =>
  `https://www.google.com/maps/search/?api=1&query=${s.lat},${s.lon}`;

function tagSide(mx: number) {
  if (mx < 200) return "gk-guide-tag-l";
  if (mx > 800) return "gk-guide-tag-r";
  return "";
}

/* ───────── Satır: düğüm + kaydırmayla dolan dikiş çizgisi + kart ───────── */
function StopRow({
  stop,
  idx,
  dayNo,
  state,
  isLast,
  labels,
  inList,
  onToggle,
  setRef,
  onShowOnMap,
}: {
  stop: GuideStop;
  idx: number;
  dayNo: number;
  state: "ahead" | "active" | "passed";
  isLast: boolean;
  labels: GuideLabels;
  inList: boolean;
  onToggle: () => void;
  setRef: (el: HTMLLIElement | null) => void;
  onShowOnMap: () => void;
}) {
  const ref = useRef<HTMLLIElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 72%", "end 52%"] });
  const clip = useTransform(scrollYProgress, (v) => `inset(0 0 ${(1 - Math.min(Math.max(v, 0), 1)) * 100}% 0)`);

  return (
    <motion.li
      ref={(el) => {
        ref.current = el;
        setRef(el);
      }}
      data-idx={idx}
      aria-current={state === "active" ? "step" : undefined}
      className={`gk-guide-row gk-guide-day-${dayNo} gk-guide-row-${state} ${isLast ? "gk-guide-row-last" : ""}`}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.75, ease: EASE_OUT_EXPO }}
    >
      {!isLast && (
        <span className="gk-guide-seg" aria-hidden="true">
          <span className="gk-guide-seg-base" />
          <motion.span className="gk-guide-seg-fill" style={{ clipPath: clip }} />
        </span>
      )}
      <span className="gk-guide-node" aria-hidden="true">
        <span className="gk-guide-node-num">{idx + 1}</span>
      </span>

      <div className="gk-guide-card">
        <p className="gk-guide-meta">
          <span className="gk-guide-part">{stop.partLabel}</span>
          {stop.distanceKm !== null && (
            <span className="gk-guide-dist">
              <Route size={13} strokeWidth={1.75} aria-hidden="true" />
              {stop.distanceFrom === "prev" ? labels.fromPrev : labels.fromCenter} ≈ {stop.distanceKm} {labels.km}
            </span>
          )}
        </p>
        <h4 className="gk-guide-name">{stop.name}</h4>
        <p className="gk-guide-note">{stop.note}</p>
        <div className="gk-guide-actions">
          <button type="button" onClick={onShowOnMap} className="gk-guide-btn gk-guide-btn-solid">
            <MapPin size={16} strokeWidth={1.75} aria-hidden="true" />
            {labels.showOnMap}
          </button>
          <button
            type="button"
            onClick={onToggle}
            aria-pressed={inList}
            className={`gk-guide-btn ${inList ? "gk-guide-btn-on" : ""}`}
          >
            {inList ? (
              <Check size={16} strokeWidth={2} aria-hidden="true" />
            ) : (
              <Plus size={16} strokeWidth={1.75} aria-hidden="true" />
            )}
            {inList ? labels.inList : labels.addToList}
          </button>
          <a href={mapsUrl(stop)} target="_blank" rel="noopener noreferrer" className="gk-guide-link link-underline">
            {labels.openMaps}
            <ExternalLink size={13} strokeWidth={1.75} aria-hidden="true" />
          </a>
          <a href={stop.source} target="_blank" rel="noopener noreferrer" className="gk-guide-link link-underline">
            {labels.source}: {stop.sourceHost}
            <ExternalLink size={13} strokeWidth={1.75} aria-hidden="true" />
          </a>
        </div>
      </div>
    </motion.li>
  );
}

export function DiscoverGuide({
  labels,
  routes,
  side,
  viewBox,
  districts,
  otherPlaces,
  tripPlaces,
}: {
  labels: GuideLabels;
  routes: GuideRoute[];
  side: GuideSide;
  viewBox: string;
  districts: { id: string; path: string }[];
  otherPlaces: { id: string; x: number; y: number }[];
  /** Gezi listesine eklenebilecek tüm durakların (sıralı) özeti. */
  tripPlaces: GuideStop[];
}) {
  const reduce = Boolean(useReducedMotion());
  const [routeId, setRouteId] = useState(routes[0].id);
  const route = routes.find((r) => r.id === routeId) ?? routes[0];
  const [activeIdx, setActiveIdx] = useState(0);
  const rowEls = useRef(new Map<number, HTMLLIElement>());
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const trip = useTripList(useMemo(() => tripPlaces.map((p) => p.placeId), [tripPlaces]));

  const { rows, flat } = useMemo(() => {
    const rows: Row[] = [];
    const flat: { stop: GuideStop; dayNo: number; dayIdx: number }[] = [];
    route.days.forEach((d, di) => {
      rows.push({ kind: "day", key: `${route.id}-d${di}`, heading: d.heading, title: d.title, dayNo: di + 1 });
      d.stops.forEach((stop, si) => {
        const idx = flat.length;
        flat.push({ stop, dayNo: di + 1, dayIdx: si });
        rows.push({ kind: "stop", key: `${route.id}-${di}-${stop.placeId}`, stop, idx, dayNo: di + 1, dayIdx: si });
      });
    });
    return { rows, flat };
  }, [route]);

  const sideIdx = flat.length; // yan rota, numaralı rotanın dışında
  const lastStopIdx = flat.length - 1;

  // Kaydırırken ekranın ortasındaki durağı etkin yap
  useEffect(() => {
    const els = Array.from(rowEls.current.entries());
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActiveIdx(Number((e.target as HTMLElement).dataset.idx));
        }
      },
      { rootMargin: "-36% 0px -54% 0px" },
    );
    els.forEach(([, el]) => io.observe(el));
    return () => io.disconnect();
  }, [route]);

  const selectRoute = (id: string) => {
    setRouteId(id);
    setActiveIdx(0);
  };

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % routes.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + routes.length) % routes.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = routes.length - 1;
    if (next < 0) return;
    e.preventDefault();
    selectRoute(routes[next].id);
    tabRefs.current[next]?.focus();
  };

  const showOnMap = (placeId: string) => {
    window.dispatchEvent(new CustomEvent(DISCOVER_FOCUS_EVENT, { detail: { id: placeId } }));
    document
      .getElementById(DISCOVER_MAP_ID)
      ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  const scrollToIdx = (idx: number) => {
    rowEls.current.get(idx)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  };

  const stateOf = (idx: number): "ahead" | "active" | "passed" =>
    idx === activeIdx ? "active" : idx < activeIdx ? "passed" : "ahead";

  const routeIds = new Set(flat.map((f) => f.stop.placeId));
  const sideActive = activeIdx === sideIdx;

  // Mini harita: durak işaretleri (gerçek konum → işaret çizgisi dahil)
  const markers = flat.map((f, idx) => ({ ...f, idx }));
  const segments = route.days.flatMap((_, di) => {
    const dayStops = markers.filter((m) => m.dayNo === di + 1);
    return dayStops.slice(1).map((m, i) => ({ from: dayStops[i], to: m }));
  });

  return (
    <div className="gk-guide">
      <div role="tablist" aria-label={labels.tabsLabel} className="gk-guide-tabs">
        {routes.map((r, i) => {
          const on = r.id === routeId;
          return (
            <button
              key={r.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`gk-guide-tab-${r.id}`}
              aria-selected={on}
              aria-controls="gk-guide-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => selectRoute(r.id)}
              onKeyDown={(e) => onTabKey(e, i)}
              className={`gk-guide-tab ${on ? "gk-guide-tab-on" : ""}`}
            >
              {r.label}
            </button>
          );
        })}
      </div>

      <div className="gk-guide-grid">
        <aside className="gk-guide-aside">
          <figure className="gk-guide-figure">
            <div className="gk-guide-stage" role="group" aria-label={labels.mapLabel}>
              <svg viewBox={viewBox} className="gk-guide-svg" aria-hidden="true">
                <g>
                  {districts.map((d) => (
                    <path key={d.id} d={d.path} className="gk-guide-district" />
                  ))}
                </g>
                <g>
                  {otherPlaces
                    .filter((p) => !routeIds.has(p.id) && p.id !== side.placeId)
                    .map((p) => (
                      <circle key={p.id} cx={p.x} cy={p.y} r={3.2} className="gk-guide-dot" />
                    ))}
                </g>
                {/* Planlanan rota: ince kesikli; kat edilen kısım kaydırdıkça çizilir */}
                <g>
                  {segments.map(({ from, to }) => (
                    <line
                      key={`p-${from.stop.placeId}-${to.stop.placeId}`}
                      x1={from.stop.mx}
                      y1={from.stop.my}
                      x2={to.stop.mx}
                      y2={to.stop.my}
                      className="gk-guide-line-plan"
                    />
                  ))}
                  {segments.map(({ from, to }) => (
                    <line
                      key={`d-${from.stop.placeId}-${to.stop.placeId}`}
                      x1={from.stop.mx}
                      y1={from.stop.my}
                      x2={to.stop.mx}
                      y2={to.stop.my}
                      pathLength={1}
                      className={`gk-guide-line-done gk-guide-day-${to.dayNo}`}
                      style={{ strokeDashoffset: activeIdx >= to.idx ? 0 : 1 }}
                    />
                  ))}
                </g>
                <g>
                  {[...flat.map((f) => f.stop), side]
                    .filter((s) => s.mx !== s.x || s.my !== s.y)
                    .map((s) => (
                      <g key={`l-${s.placeId}`}>
                        <line x1={s.x} y1={s.y} x2={s.mx} y2={s.my} className="gk-guide-leader" />
                        <circle cx={s.x} cy={s.y} r={3} className="gk-guide-true" />
                      </g>
                    ))}
                </g>
              </svg>

              {markers.map((m) => (
                <button
                  key={m.stop.placeId}
                  type="button"
                  aria-label={`${m.idx + 1}. ${m.stop.name}`}
                  onClick={() => scrollToIdx(m.idx)}
                  className={`gk-guide-marker gk-guide-day-${m.dayNo} gk-guide-marker-${stateOf(m.idx)}`}
                  style={{ left: `${(m.stop.mx / W) * 100}%`, top: `${(m.stop.my / H) * 100}%` }}
                >
                  <span>{m.idx + 1}</span>
                </button>
              ))}
              <button
                type="button"
                aria-label={`${labels.sideTitle}: ${side.name}`}
                onClick={() => scrollToIdx(sideIdx)}
                className={`gk-guide-marker gk-guide-marker-side ${sideActive ? "gk-guide-marker-active" : ""}`}
                style={{ left: `${(side.mx / W) * 100}%`, top: `${(side.my / H) * 100}%` }}
              >
                <span>+</span>
              </button>

              {(() => {
                const cur = activeIdx <= lastStopIdx ? flat[activeIdx]?.stop : side;
                if (!cur) return null;
                return (
                  <span
                    key={`${route.id}-${cur.placeId}`}
                    className={`gk-guide-tag ${tagSide(cur.mx)}`}
                    style={{ left: `${(cur.mx / W) * 100}%`, top: `${(cur.my / H) * 100}%` }}
                    aria-hidden="true"
                  >
                    {cur.name}
                  </span>
                );
              })()}
            </div>
            <figcaption className="gk-guide-caption">{labels.mapCaption}</figcaption>
          </figure>
        </aside>

        <div id="gk-guide-panel" role="tabpanel" aria-labelledby={`gk-guide-tab-${route.id}`} className="gk-guide-main">
          <ol key={route.id} className="gk-guide-list">
            {rows.map((row) => {
              if (row.kind === "day") {
                return (
                  <motion.li
                    key={row.key}
                    className="gk-guide-dayrow"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                  >
                    <h3 className="gk-guide-dayhead">
                      <span className={`gk-guide-daytag gk-guide-day-${row.dayNo}`}>{row.heading}</span>
                      <span className="gk-guide-daytitle">{row.title}</span>
                    </h3>
                    <span className={`gk-guide-dayline gk-guide-day-${row.dayNo}`} aria-hidden="true" />
                  </motion.li>
                );
              }
              const isLast = row.dayIdx === route.days[row.dayNo - 1].stops.length - 1;
              return (
                <StopRow
                  key={row.key}
                  stop={row.stop}
                  idx={row.idx}
                  dayNo={row.dayNo}
                  state={stateOf(row.idx)}
                  isLast={isLast}
                  labels={labels}
                  inList={trip.ids.includes(row.stop.placeId)}
                  onToggle={() => trip.toggle(row.stop.placeId)}
                  setRef={(el) => {
                    if (el) rowEls.current.set(row.idx, el);
                    else rowEls.current.delete(row.idx);
                  }}
                  onShowOnMap={() => showOnMap(row.stop.placeId)}
                />
              );
            })}
          </ol>

          <motion.section
            ref={(el: HTMLElement | null) => {
              if (el) rowEls.current.set(sideIdx, el as unknown as HTMLLIElement);
              else rowEls.current.delete(sideIdx);
            }}
            data-idx={sideIdx}
            className={`gk-guide-side ${sideActive ? "gk-guide-side-active" : ""}`}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.75, ease: EASE_OUT_EXPO }}
          >
            <p className="gk-guide-meta">
              <span className="gk-guide-part">{labels.sideTitle}</span>
              {side.distanceKm !== null && (
                <span className="gk-guide-dist">
                  <Route size={13} strokeWidth={1.75} aria-hidden="true" />
                  {labels.fromCenter} ≈ {side.distanceKm} {labels.km}
                </span>
              )}
            </p>
            <h3 className="gk-guide-name">{side.name}</h3>
            <p className="gk-guide-note">{labels.sideLead}</p>
            <p className="gk-guide-note">{side.note}</p>
            <div className="gk-guide-actions">
              <button type="button" onClick={() => showOnMap(side.placeId)} className="gk-guide-btn gk-guide-btn-solid">
                <MapPin size={16} strokeWidth={1.75} aria-hidden="true" />
                {labels.showOnMap}
              </button>
              <button
                type="button"
                onClick={() => trip.toggle(side.placeId)}
                aria-pressed={trip.ids.includes(side.placeId)}
                className={`gk-guide-btn ${trip.ids.includes(side.placeId) ? "gk-guide-btn-on" : ""}`}
              >
                {trip.ids.includes(side.placeId) ? (
                  <Check size={16} strokeWidth={2} aria-hidden="true" />
                ) : (
                  <Plus size={16} strokeWidth={1.75} aria-hidden="true" />
                )}
                {trip.ids.includes(side.placeId) ? labels.inList : labels.addToList}
              </button>
              <a href={mapsUrl(side)} target="_blank" rel="noopener noreferrer" className="gk-guide-link link-underline">
                {labels.openMaps}
                <ExternalLink size={13} strokeWidth={1.75} aria-hidden="true" />
              </a>
              <a href={side.source} target="_blank" rel="noopener noreferrer" className="gk-guide-link link-underline">
                {labels.source}: {side.sourceHost}
                <ExternalLink size={13} strokeWidth={1.75} aria-hidden="true" />
              </a>
            </div>
          </motion.section>

          <p className="gk-guide-disclaimer">{labels.disclaimer}</p>
        </div>
      </div>

      <section className="gk-guide-trip" aria-labelledby="gk-guide-trip-title">
        <div className="gk-guide-trip-head">
          <div>
            <h3 id="gk-guide-trip-title" className="gk-guide-trip-title">
              <span className="gk-guide-print-only">{labels.tripPrintTitle}</span>
              <span className="gk-guide-noprint">{labels.tripTitle}</span>
              {trip.ids.length > 0 && (
                <span className="gk-guide-trip-count">
                  {trip.ids.length} {labels.tripCount}
                </span>
              )}
            </h3>
            <p className="gk-guide-trip-lead gk-guide-noprint">{labels.tripLead}</p>
          </div>
          {trip.ids.length > 0 && (
            <div className="gk-guide-trip-actions gk-guide-noprint">
              <button type="button" onClick={() => window.print()} className="gk-guide-btn gk-guide-btn-solid">
                <Printer size={16} strokeWidth={1.75} aria-hidden="true" />
                {labels.tripPrint}
              </button>
              <button type="button" onClick={trip.clear} className="gk-guide-btn">
                {labels.tripClear}
              </button>
            </div>
          )}
        </div>

        {trip.ids.length === 0 ? (
          <p className="gk-guide-trip-empty gk-guide-noprint">{labels.tripEmpty}</p>
        ) : (
          <ol className="gk-guide-trip-list">
            {trip.ids.map((id, i) => {
              const p = tripPlaces.find((x) => x.placeId === id);
              if (!p) return null;
              return (
                <li key={id} className="gk-guide-trip-item">
                  <span className="gk-guide-trip-num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div className="gk-guide-trip-body">
                    <p className="gk-guide-trip-name">{p.name}</p>
                    <a
                      href={mapsUrl(p)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gk-guide-link link-underline gk-guide-noprint"
                    >
                      {labels.openMaps}
                      <ExternalLink size={13} strokeWidth={1.75} aria-hidden="true" />
                    </a>
                    <span className="gk-guide-trip-url">{mapsUrl(p)}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => trip.remove(id)}
                    aria-label={`${labels.tripRemove}: ${p.name}`}
                    title={labels.tripRemove}
                    className="gk-guide-trip-remove gk-guide-noprint"
                  >
                    <X size={16} strokeWidth={1.75} aria-hidden="true" />
                  </button>
                </li>
              );
            })}
          </ol>
        )}
      </section>
    </div>
  );
}
