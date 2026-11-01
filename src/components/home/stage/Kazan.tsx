"use client";

import { useId } from "react";
import { motion, useTransform } from "motion/react";
import { ALMOND_PATH, PASTELS, PASTEL_EDGE, r2, rng, type Prog } from "./shared";
import { css } from "../hm";

const CX = 400;
const CY = 440;
const RX = 252;
const RY = 124;
const FLAT = 0.7;
const BROWN = "#B07842";
const GLAZE = "#E3A93C";

const ALMONDS = (() => {
  const rand = rng(23);
  return Array.from({ length: 72 }, (_, i) => ({
    r: r2(Math.sqrt(rand()) * 0.95),
    th: r2(rand() * Math.PI * 2),
    rot: r2(rand() * 360),
    s: r2(1.15 + rand() * 0.45),
    start: r2(0.08 + rand() * 0.3),
    tone: i % 3,
    spin: r2(0.8 + rand() * 0.5),
  }));
})();

function PanAlmond({ p, d, i }: { p: Prog; d: (typeof ALMONDS)[number]; i: number }) {
  // Kazan döndükçe bademler elips üzerinde süzülür.
  const x = useTransform(p, (v) => r2(CX + d.r * RX * Math.cos(d.th + v * 2.1 * d.spin)));
  const y = useTransform(p, (v) => r2(CY + d.r * RY * Math.sin(d.th + v * 2.1 * d.spin)));
  const rot = useTransform(p, (v) => r2(d.rot + v * 200 * d.spin));
  const fill = useTransform(p, [d.start, d.start + 0.2, d.start + 0.5], [BROWN, GLAZE, PASTELS[d.tone]]);
  const edge = useTransform(p, [d.start, d.start + 0.5], ["#6B4423", PASTEL_EDGE[d.tone]]);
  const grow = useTransform(p, [d.start, d.start + 0.5], [d.s, d.s * 1.1]);
  const shine = useTransform(p, [d.start + 0.28, d.start + 0.5], [0, 0.7]);
  return (
    <motion.g style={{ x, y }} className={i >= 44 ? css.hideSm : undefined}>
      <g transform={`scale(1 ${FLAT})`}>
        <motion.g style={{ rotate: rot, scale: grow }}>
          <motion.path d={ALMOND_PATH} style={{ fill, stroke: edge }} strokeWidth="1.3" />
          <motion.path
            d="M-6 -10C-9 -2 -9 6 -6 11"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.6"
            strokeLinecap="round"
            style={{ opacity: shine }}
          />
        </motion.g>
      </g>
    </motion.g>
  );
}

const STEAM: [number, number, number][] = [
  [290, 318, 0],
  [372, 300, 4],
  [462, 306, 8],
  [545, 322, 2.5],
];

/** Bölüm 2: bakır kazan; bademler dönerken şerbetle kat kat sarılır. */
export function KazanScene({ p }: { p: Prog }) {
  const uid = useId().replace(/:/g, "");
  const stream = useTransform(p, [0.06, 0.2], [0, 1]);
  const streamEnd = useTransform(p, [0.62, 0.78], [0, 1]);
  const jugTilt = useTransform(p, [0, 0.08, 0.66, 0.82], [6, 28, 28, 4]);
  const pool = useTransform(p, [0.12, 0.3, 0.55, 0.9], [0, 0.4, 0.26, 0.04]);
  const sheen = useTransform(p, [0.5, 1], [0, 0.35]);

  return (
    <svg viewBox="0 0 800 760" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id={`rim-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F0B98A" />
          <stop offset="0.35" stopColor="#C9753F" />
          <stop offset="0.7" stopColor="#9C4F28" />
          <stop offset="1" stopColor="#6E3318" />
        </linearGradient>
        <linearGradient id={`wall-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#A8592E" />
          <stop offset="1" stopColor="#5E2B14" />
        </linearGradient>
        <radialGradient id={`inner-${uid}`} cx="0.45" cy="0.4" r="0.75">
          <stop offset="0" stopColor="#CC8148" />
          <stop offset="0.6" stopColor="#97502A" />
          <stop offset="1" stopColor="#5A2A14" />
        </radialGradient>
        <linearGradient id={`jug-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8A4524" />
          <stop offset="0.45" stopColor="#E0955F" />
          <stop offset="1" stopColor="#8F4A27" />
        </linearGradient>
        <filter id={`soft-${uid}`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>
        <clipPath id={`bowl-${uid}`}>
          <ellipse cx={CX} cy={CY + 4} rx="300" ry="158" />
        </clipPath>
      </defs>

      {/* Zemin gölgesi ve kazanın gövdesi */}
      <ellipse cx={CX} cy="640" rx="340" ry="46" fill="#1C100A" opacity="var(--st-floor)" />
      <ellipse cx={CX} cy="478" rx="326" ry="190" fill={`url(#wall-${uid})`} />
      <path d="M96 470Q110 560 400 640Q690 560 704 470" fill={`url(#wall-${uid})`} />
      {/* Kulplar */}
      <ellipse cx="58" cy="452" rx="26" ry="34" fill="none" stroke="#7A3B1E" strokeWidth="12" />
      <ellipse cx="742" cy="452" rx="26" ry="34" fill="none" stroke="#7A3B1E" strokeWidth="12" />
      {/* Ağız halkası */}
      <ellipse cx={CX} cy={CY} rx="334" ry="192" fill={`url(#rim-${uid})`} />
      <ellipse cx={CX} cy={CY + 4} rx="302" ry="160" fill={`url(#inner-${uid})`} />
      <path d="M92 400A330 190 0 0 1 400 248" fill="none" stroke="#FFE3C2" strokeWidth="5" strokeLinecap="round" opacity="0.5" />

      {/* İçerik */}
      <g clipPath={`url(#bowl-${uid})`}>
        <motion.ellipse cx={CX} cy={CY + 6} rx="292" ry="150" fill={GLAZE} style={{ opacity: pool }} />
        {ALMONDS.map((d, i) => (
          <PanAlmond key={i} p={p} d={d} i={i} />
        ))}
        <motion.ellipse cx={CX - 70} cy={CY - 30} rx="160" ry="60" fill="#FFF3DD" style={{ opacity: sheen }} filter={`url(#soft-${uid})`} />
      </g>
      <ellipse cx={CX} cy={CY + 4} rx="302" ry="160" fill="none" stroke="#4A2010" strokeWidth="5" opacity="0.7" />

      {/* Şerbet kabı ve akan şerbet */}
      <motion.path
        d="M284 104C316 112 332 140 334 190L336 442"
        fill="none"
        stroke="#E7A93F"
        strokeWidth="9"
        strokeLinecap="round"
        style={{ pathLength: stream, pathOffset: streamEnd }}
      />
      <motion.path
        d="M282 104C314 112 330 140 332 190L334 442"
        fill="none"
        stroke="#FFD98A"
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{ pathLength: stream, pathOffset: streamEnd }}
        opacity="0.8"
      />
      <g transform="translate(196 52)">
        <motion.g style={{ rotate: jugTilt, originX: "0px", originY: "0px" }}>
          <path d="M-56 0H76L64 104Q62 128 38 128H-30Q-54 128 -58 104Z" fill={`url(#jug-${uid})`} />
          <path d="M76 0L98 -10L70 14Z" fill="#C9753F" />
          <path d="M-56 0H76" stroke="#F4C79C" strokeWidth="4" strokeLinecap="round" />
          <path d="M-56 26Q-104 30 -96 84Q-92 108 -58 104" fill="none" stroke="#7A3B1E" strokeWidth="10" strokeLinecap="round" />
          <path d="M-36 30V110" stroke="#FFE3C2" strokeWidth="4" strokeLinecap="round" opacity="0.35" />
        </motion.g>
      </g>

      {/* Buhar: yavaş yükselip dağılır */}
      {STEAM.map(([x, y, delay], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <path
            className={css.steam}
            style={{ animationDelay: `${-delay}s` }}
            d="M0 0C16 -24 -16 -50 0 -78S16 -130 0 -156"
            fill="none"
            stroke="var(--st-steam)"
            strokeWidth="9"
            strokeLinecap="round"
            filter={`url(#soft-${uid})`}
          />
        </g>
      ))}
    </svg>
  );
}
