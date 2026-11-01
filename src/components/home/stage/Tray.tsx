"use client";

import { useId } from "react";
import { motion, useTransform } from "motion/react";
import { ALMOND_PATH, Blossom, PASTELS, PASTEL_EDGE, gravity, r2, settle, type Prog } from "./shared";
import { css } from "../hm";

const CX = 400;
const CY = 410;
const RX = 262;
const RY = 164;
const FLAT = 0.78;

type Candy = { x: number; y: number; rot: number; tone: number; k: number; ring: number };

/** Halkalar: merkez + 3 eş merkezli halka; uçlar dışa bakar. */
const CANDIES: Candy[] = (() => {
  const rings: [number, number][] = [
    [0, 1],
    [0.3, 7],
    [0.57, 14],
    [0.84, 21],
  ];
  const out: Candy[] = [];
  let k = 0;
  rings.forEach(([rf, n], ring) => {
    for (let j = 0; j < n; j++) {
      const th = (j / n) * Math.PI * 2 + (ring % 2) * (Math.PI / n) - Math.PI / 2;
      out.push({
        x: r2(CX + rf * RX * Math.cos(th)),
        y: r2(CY + rf * RY * Math.sin(th)),
        rot: r2((th * 180) / Math.PI + 90),
        tone: (j + ring) % 3,
        k: k++,
        ring,
      });
    }
  });
  return out;
})();

function TrayCandy({ c, d }: { c: Prog; d: Candy }) {
  const s = 0.05 + d.k * 0.0135;
  const y = useTransform(c, [s, s + 0.15, s + 0.19], [-280, 5, 0], { ease: [gravity, settle] });
  const o = useTransform(c, [s, s + 0.05], [0, 1]);
  const sh = useTransform(c, [s + 0.1, s + 0.19], [0, 0.3]);
  return (
    <g transform={`translate(${d.x} ${d.y})`} className={d.ring === 3 ? css.hideSm : undefined}>
      <g transform={`scale(1 ${FLAT})`}>
        <motion.ellipse cx="3" cy="13" rx="18" ry="10" fill="#2A140A" style={{ opacity: sh }} />
      </g>
      <motion.g style={{ y, opacity: o }}>
        <g transform={`scale(1 ${FLAT}) rotate(${d.rot}) scale(1.32)`}>
          <path d={ALMOND_PATH} fill={PASTELS[d.tone]} stroke={PASTEL_EDGE[d.tone]} strokeWidth="1.2" />
          <path d="M-6 -10C-9 -2 -9 6 -6 11" fill="none" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" opacity="0.7" />
        </g>
      </motion.g>
    </g>
  );
}

const RIM_DOTS = Array.from({ length: 56 }, (_, i) => {
  const th = (i / 56) * Math.PI * 2;
  return { x: r2(CX + (RX + 40) * Math.cos(th)), y: r2(CY + (RY + 25) * Math.sin(th)) };
});

/** Bölüm 3: bakır tepsi; şekerler eş merkezli halkalar hâlinde yerleşir. */
export function TrayScene({ p }: { p: Prog }) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 800 760" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id={`trim-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F2BC8C" />
          <stop offset="0.4" stopColor="#C9753F" />
          <stop offset="1" stopColor="#7A3A1A" />
        </linearGradient>
        <radialGradient id={`tface-${uid}`} cx="0.42" cy="0.38" r="0.8">
          <stop offset="0" stopColor="#D9925B" />
          <stop offset="0.55" stopColor="#B06A3C" />
          <stop offset="1" stopColor="#8A4B26" />
        </radialGradient>
        <filter id={`tblur-${uid}`} x="-20%" y="-20%" width="140%" height="160%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      {/* Masaya serpilmiş çiçek yaprakları */}
      <Blossom x={70} y={120} s={1.6} r={20} />
      <Blossom x={730} y={640} s={1.5} r={-30} />
      <Blossom x={700} y={90} s={1.2} r={50} />
      <Blossom x={96} y={640} s={1.1} r={-10} />

      <ellipse cx={CX} cy={CY + 56} rx={RX + 70} ry={RY + 40} fill="#2A140A" opacity="0.28" filter={`url(#tblur-${uid})`} />
      <ellipse cx={CX} cy={CY + 22} rx={RX + 62} ry={RY + 34} fill="#7A3A1A" />
      <ellipse cx={CX} cy={CY} rx={RX + 62} ry={RY + 34} fill={`url(#trim-${uid})`} />
      {RIM_DOTS.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="2.2" fill="#6E3318" opacity="0.55" />
      ))}
      <ellipse cx={CX} cy={CY} rx={RX + 22} ry={RY + 10} fill={`url(#tface-${uid})`} />
      <ellipse cx={CX} cy={CY} rx={RX + 18} ry={RY + 8} fill="none" stroke="#F4C79C" strokeWidth="2" opacity="0.6" />
      {[1, 0.7, 0.42].map((f, i) => (
        <ellipse
          key={i}
          cx={CX}
          cy={CY}
          rx={r2(RX * f + 6)}
          ry={r2(RY * f + 4)}
          fill="none"
          stroke="#C8952B"
          strokeWidth="1.6"
          opacity="0.5"
          strokeDasharray={i === 1 ? "2 7" : undefined}
        />
      ))}
      <path d="M130 330A290 180 0 0 1 380 232" fill="none" stroke="#FFE3C2" strokeWidth="4" strokeLinecap="round" opacity="0.5" />

      {CANDIES.map((d) => (
        <TrayCandy key={d.k} c={p} d={d} />
      ))}
    </svg>
  );
}
