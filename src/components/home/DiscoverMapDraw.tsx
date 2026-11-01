"use client";

import { motion, useReducedMotion } from "motion/react";
import { EXPO } from "./motion";

export type MapDistrict = { id: string; name: string; d: string };
export type MapMarker = {
  id: string;
  name: string;
  x: number;
  y: number;
  side: "l" | "r";
  dy: number;
};


/** Kendini çizen ilçe silueti; işaretler sırayla yerine oturur. Sakin, sabit noktalar. */
export function DiscoverMapDraw({
  viewBox,
  districts,
  markers,
  label,
}: {
  viewBox: string;
  districts: MapDistrict[];
  markers: MapMarker[];
  label: string;
}) {
  const reduce = useReducedMotion();
  const drawEnd = 0.25 + districts.length * 0.11 + 1.6;

  return (
    <div>
      <motion.svg
        viewBox={viewBox}
        role="img"
        aria-label={label}
        className="h-auto w-full overflow-visible"
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, amount: 0.25 }}
      >
        <g strokeLinejoin="round" strokeLinecap="round">
          {districts.map((x, i) => (
            <motion.path
              key={x.id}
              d={x.d}
              stroke="var(--dc-stroke)"
              strokeWidth={1.4}
              variants={{
                hidden: reduce ? { pathLength: 1, fillOpacity: 1, opacity: 1 } : { pathLength: 0, opacity: 0, fillOpacity: 0 },
                shown: {
                  pathLength: 1,
                  opacity: 1,
                  fillOpacity: 1,
                  transition: {
                    pathLength: { duration: 1.6, delay: 0.25 + i * 0.11, ease: EXPO },
                    opacity: { duration: 0.2, delay: 0.25 + i * 0.11 },
                    fillOpacity: { duration: 1.2, delay: 0.9 + i * 0.11, ease: EXPO },
                  },
                },
              }}
              fill={x.id === "merkez" ? "var(--dc-fill-hi)" : "var(--dc-fill)"}
            />
          ))}
        </g>

        {markers.map((m, i) => {
          const lx = m.side === "r" ? 13 : -13;
          return (
            <motion.g
              key={m.id}
              transform={`translate(${m.x} ${m.y})`}
              variants={{
                hidden: reduce ? { opacity: 1 } : { opacity: 0 },
                shown: { opacity: 1, transition: { duration: 0.5, delay: drawEnd + i * 0.14, ease: EXPO } },
              }}
            >
              <motion.g
                variants={{
                  hidden: reduce ? { scale: 1 } : { scale: 0 },
                  shown: { scale: 1, transition: { duration: 0.9, delay: drawEnd + i * 0.14, ease: EXPO } },
                }}
              >
                <path d="M0 -8 8 0 0 8 -8 0Z" fill="var(--dc-marker-bg)" stroke="var(--dc-marker)" strokeWidth="2.2" />
                <path d="M0 -3.4 3.4 0 0 3.4 -3.4 0Z" fill="var(--dc-marker)" />
              </motion.g>
              <text
                x={lx}
                y={m.dy + 5}
                textAnchor={m.side === "r" ? "start" : "end"}
                fontSize="17"
                fontWeight="600"
                fill="var(--dc-label)"
                stroke="var(--dc-label-stroke)"
                strokeWidth="4"
                paintOrder="stroke"
                className="max-md:hidden"
                style={{ fontFamily: "var(--font-hanken), sans-serif", letterSpacing: "0.01em" }}
              >
                {m.name}
              </text>
            </motion.g>
          );
        })}
      </motion.svg>

      <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--dc-fg-2)] md:hidden">
        {markers.map((m) => (
          <li key={m.id} className="flex items-center gap-2">
            <span aria-hidden="true" className="inline-block h-2 w-2 rotate-45 bg-[var(--dc-marker)]" />
            {m.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
