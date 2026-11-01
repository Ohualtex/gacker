"use client";

import { useId } from "react";
import { motion, useTransform } from "motion/react";
import { Blossom, HULL_PATH, Leaf, gravity, r2, rng, settle, type Prog } from "./shared";

/** Dal: ikinci derece Bézier. Badem ve yaprak konumları bu eğriden hesaplanır. */
const bez = (t: number) => ({
  x: r2(830 * (1 - t) ** 2 + 2 * 430 * t * (1 - t) - 20 * t * t),
  y: r2(30 * (1 - t) ** 2 + 2 * 230 * t * (1 - t) + 120 * t * t),
});

type Hang = { t: number; dx: number; stem: number; rot: number };

/** Sepete düşenler: sırayla bırakılır. tx/ty = sepetteki yerleri, fr = son dönüşleri. */
const DROPS: (Hang & { tx: number; ty: number; fr: number })[] = [
  { t: 0.37, dx: 6, stem: 44, rot: -8, tx: 452, ty: 622, fr: -24 },
  { t: 0.44, dx: -4, stem: 52, rot: 6, tx: 366, ty: 618, fr: 18 },
  { t: 0.51, dx: 4, stem: 40, rot: -4, tx: 410, ty: 608, fr: -8 },
  { t: 0.58, dx: -6, stem: 50, rot: 10, tx: 338, ty: 626, fr: 34 },
  { t: 0.65, dx: 2, stem: 42, rot: -6, tx: 478, ty: 616, fr: -38 },
];

/** Dalda kalanlar. */
const STAYS: Hang[] = [
  { t: 0.22, dx: 0, stem: 38, rot: 6 },
  { t: 0.285, dx: 4, stem: 56, rot: -5 },
  { t: 0.73, dx: 0, stem: 46, rot: 7 },
  { t: 0.8, dx: -4, stem: 36, rot: -8 },
  { t: 0.88, dx: 2, stem: 48, rot: 4 },
];

const LEAVES = (() => {
  const rand = rng(11);
  return Array.from({ length: 34 }, (_, i) => {
    const t = 0.06 + (i / 33) * 0.9;
    const b = bez(t);
    const side = i % 2 ? 1 : -1;
    return {
      x: r2(b.x + (rand() - 0.5) * 14),
      y: r2(b.y + side * (4 + rand() * 6)),
      r: r2(side < 0 ? -(20 + rand() * 60) + 180 * (i % 3 === 0 ? 1 : 0) : 20 + rand() * 60),
      s: r2(0.8 + rand() * 0.55),
      tone: i,
    };
  });
})();

const BLOSSOMS: [number, number, number][] = [
  [0.1, 1.05, 12],
  [0.18, 0.9, 40],
  [0.31, 1.1, -14],
  [0.47, 0.95, 28],
  [0.54, 1.1, -6],
  [0.69, 0.9, 52],
  [0.78, 1.05, 10],
  [0.86, 0.85, -30],
  [0.93, 1.0, 20],
];


const PETALS = (() => {
  const rand = rng(41);
  return Array.from({ length: 9 }, () => ({
    x: r2(120 + rand() * 600),
    y: r2(60 + rand() * 120),
    fall: r2(420 + rand() * 280),
    sway: r2(18 + rand() * 30),
    ph: r2(rand() * 6),
    rot: r2(rand() * 360),
    s: r2(0.8 + rand() * 0.7),
    a: r2(rand() * 0.25),
  }));
})();

function Petal({ p, d }: { p: Prog; d: (typeof PETALS)[number] }) {
  const y = useTransform(p, [d.a, 1], [0, d.fall]);
  const x = useTransform(p, (v) => r2(Math.sin(v * 7 + d.ph) * d.sway));
  const rot = useTransform(p, (v) => r2(d.rot + v * 260));
  const o = useTransform(p, [d.a, d.a + 0.08, 0.86, 1], [0, 0.9, 0.9, 0]);
  return (
    <g transform={`translate(${d.x} ${d.y})`}>
      <motion.g style={{ x, y, rotate: rot, opacity: o }}>
        <ellipse rx={r2(5 * d.s)} ry={r2(8 * d.s)} fill="#FBEEEA" stroke="#E3B8B0" strokeWidth="0.7" />
      </motion.g>
    </g>
  );
}

function HullAlmond({
  tone = 0,
}: {
  tone?: number;
}) {
  const fill = ["#9DAA5E", "#A7B468", "#93A056"][tone % 3];
  return (
    <g>
      <path d={HULL_PATH} fill={fill} stroke="#6E7B3C" strokeWidth="1.4" />
      <path d="M0 -21C-5 -8 -5 10 0 23" fill="none" stroke="#6E7B3C" strokeWidth="1.3" opacity="0.7" />
      <path d="M-10 -8C-14 2 -12 12 -8 17" fill="none" stroke="#D3DC9E" strokeWidth="2.4" strokeLinecap="round" opacity="0.7" />
    </g>
  );
}

function Dropper({ p, i, d }: { p: Prog; i: number; d: (typeof DROPS)[number] }) {
  const b = bez(d.t);
  const hx = r2(b.x + d.dx);
  const hy = r2(b.y + d.stem + 24);
  const s = 0.14 + i * 0.15;
  const e = s + 0.17;
  const y = useTransform(p, [s, e], [0, d.ty - hy], { ease: gravity });
  const x = useTransform(p, [s, e], [0, d.tx - hx], { ease: settle });
  const rot = useTransform(p, [s - 0.06, s, e], [d.rot, d.rot + 9, d.fr], { ease: [settle, gravity] });
  return (
    <g transform={`translate(${hx} ${hy})`}>
      <motion.g style={{ x, y, rotate: rot, scale: 1.25 }}>
        <HullAlmond tone={i} />
      </motion.g>
    </g>
  );
}

/** Bölüm 1: dal, sarkan yeşil kabuklu bademler ve onları alan hasır sepet. */
export function TreeScene({ p }: { p: Prog }) {
  const uid = useId().replace(/:/g, "");
  const sway = useTransform(p, [0, 1], [0, -8]);

  return (
    <svg viewBox="0 0 800 760" className="h-full w-full" aria-hidden="true">
      <defs>
        <pattern id={`weave-${uid}`} width="22" height="16" patternUnits="userSpaceOnUse">
          <rect width="22" height="16" fill="#C79A4E" />
          <path d="M0 8H22" stroke="#8A5A34" strokeWidth="2" />
          <path d="M0 0H22M0 16H22" stroke="#E2BE7C" strokeWidth="1.5" />
          <path d="M5 0V8M16 8V16" stroke="#8A5A34" strokeWidth="2" />
          <path d="M16 0V8M5 8V16" stroke="#A9783F" strokeWidth="1" opacity="0.6" />
        </pattern>
        <clipPath id={`inside-${uid}`}>
          <path d="M-100 -100H900V604H550Q400 664 250 604H-100Z" />
        </clipPath>
        <linearGradient id={`bshade-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3A2314" stopOpacity="0.35" />
          <stop offset="0.35" stopColor="#3A2314" stopOpacity="0" />
          <stop offset="1" stopColor="#3A2314" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* Dal */}
      <motion.g style={{ y: sway }}>
        <path d="M830 30Q430 230 -20 120" fill="none" stroke="#3E2619" strokeWidth="17" strokeLinecap="round" />
        <path d="M830 24Q430 224 -20 113" fill="none" stroke="#6B4630" strokeWidth="3.5" strokeLinecap="round" opacity="0.8" />
        {/* küçük dallar */}
        <path d="M640 120Q610 70 560 52" fill="none" stroke="#3E2619" strokeWidth="6" strokeLinecap="round" />
        <path d="M330 150Q300 98 240 86" fill="none" stroke="#3E2619" strokeWidth="5" strokeLinecap="round" />
        <path d="M120 128Q92 176 60 196" fill="none" stroke="#3E2619" strokeWidth="5" strokeLinecap="round" />
        {LEAVES.map((l, i) => (
          <Leaf key={i} {...l} />
        ))}
        {BLOSSOMS.map(([t, s, r], i) => {
          const b = bez(t);
          return <Blossom key={i} x={b.x} y={b.y - 16 - (i % 3) * 5} s={s} r={r} />;
        })}
        <Blossom x={560} y={52} s={1} r={20} />
        <Blossom x={240} y={86} s={0.95} r={-20} />
        <Blossom x={60} y={196} s={0.9} r={40} />
        {STAYS.map((d, i) => {
          const b = bez(d.t);
          const hx = r2(b.x + d.dx);
          const hy = r2(b.y + d.stem + 24);
          return (
            <g key={i}>
              <path d={`M${b.x} ${b.y}Q${r2(b.x + d.dx * 0.4)} ${r2(b.y + d.stem * 0.6)} ${hx} ${r2(hy - 22)}`} fill="none" stroke="#6B5A2E" strokeWidth="2.6" strokeLinecap="round" />
              <g transform={`translate(${hx} ${hy}) rotate(${d.rot}) scale(1.25)`}>
                <HullAlmond tone={i + 1} />
              </g>
            </g>
          );
        })}
        {DROPS.map((d, i) => {
          const b = bez(d.t);
          const hx = r2(b.x + d.dx);
          const hy = r2(b.y + d.stem + 24);
          return (
            <path key={i} d={`M${b.x} ${b.y}Q${r2(b.x + d.dx * 0.4)} ${r2(b.y + d.stem * 0.6)} ${hx} ${r2(hy - 22)}`} fill="none" stroke="#6B5A2E" strokeWidth="2.6" strokeLinecap="round" />
          );
        })}
      </motion.g>

      {PETALS.map((d, i) => (
        <Petal key={i} p={p} d={d} />
      ))}

      {/* Sepet */}
      <ellipse cx="400" cy="738" rx="190" ry="14" fill="#3A2314" opacity="0.22" />
      <path d="M250 604Q400 544 550 604Q400 664 250 604Z" fill="#3A2314" />
      <path d="M250 604Q400 544 550 604" fill="none" stroke="#8A5A34" strokeWidth="9" strokeLinecap="round" />
      <path d="M250 604Q400 664 550 604Q545 700 500 728Q400 748 300 728Q255 700 250 604Z" fill={`url(#weave-${uid})`} />
      <path d="M250 604Q400 664 550 604Q545 700 500 728Q400 748 300 728Q255 700 250 604Z" fill={`url(#bshade-${uid})`} />
      {/* Düşen bademler: ön kenar eğrisinin üstünde kalır, böylece sepetin içine giriyormuş gibi görünür */}
      <g clipPath={`url(#inside-${uid})`}>
        {DROPS.map((d, i) => (
          <Dropper key={i} p={p} i={i} d={d} />
        ))}
      </g>
      <path d="M250 604Q400 664 550 604" fill="none" stroke="#9A6B3A" strokeWidth="10" strokeLinecap="round" />
      <path d="M252 606Q400 662 548 606" fill="none" stroke="#E2BE7C" strokeWidth="2" strokeLinecap="round" opacity="0.65" />
    </svg>
  );
}
