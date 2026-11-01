"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

/** Sahne ilerlemesi: 0 (bölüm başı) → 1 (bölüm sonu). */
export type Prog = MotionValue<number>;

export const r2 = (n: number) => Math.round(n * 100) / 100;

/** Sunucu/istemci aynı sayıyı üretsin diye tohumlu rastgele. */
export function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** Yerçekimi hissi: yavaş başlar, hızlanır. */
export const gravity = (t: number) => t * t * t;
/** Yumuşak duruş. */
export const settle = (t: number) => 1 - Math.pow(1 - t, 3);

/** Kavrulmuş / şekerli badem gövdesi, merkezi (0,0), ~28×40. */
export const ALMOND_PATH =
  "M0 -20C9 -11 14 -1 14 8C14 16 8 20 0 20C-8 20 -14 16 -14 8C-14 -1 -9 -11 0 -20Z";
/** Yeşil kabuklu (dalda) badem: daha yuvarlak, hafif basık. */
export const HULL_PATH =
  "M0 -23C13 -15 20 -2 18 10C16 20 8 25 0 25C-8 25 -16 20 -18 10C-20 -2 -13 -15 0 -23Z";

export const PASTELS = ["#F5ECDD", "#F1CFC6", "#CBD6B0"] as const;
export const PASTEL_EDGE = ["#D9C7AA", "#D9A89C", "#A3B283"] as const;

export function Blossom({ x, y, s = 1, r = 0 }: { x: number; y: number; s?: number; r?: number }) {
  return (
    <g transform={`translate(${r2(x)} ${r2(y)}) rotate(${r2(r)}) scale(${r2(s)})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse
          key={a}
          cx="0"
          cy="-9"
          rx="6.4"
          ry="10.4"
          transform={`rotate(${a})`}
          fill="#FBEEEA"
          stroke="#E3B8B0"
          strokeWidth="0.7"
        />
      ))}
      <circle r="3.4" fill="#C8952B" />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <circle
          key={a}
          cx={r2(Math.cos((a * Math.PI) / 180) * 5.4)}
          cy={r2(Math.sin((a * Math.PI) / 180) * 5.4)}
          r="0.95"
          fill="#8A5A34"
        />
      ))}
    </g>
  );
}

export function Leaf({ x, y, r, s = 1, tone = 0 }: { x: number; y: number; r: number; s?: number; tone?: number }) {
  const fills = ["#6F8A3B", "#7E9A47", "#5E7A33", "#8AA652"];
  return (
    <g transform={`translate(${r2(x)} ${r2(y)}) rotate(${r2(r)}) scale(${r2(s)})`}>
      <path d="M0 0C12 -11 36 -11 50 0C36 11 12 11 0 0Z" fill={fills[tone % fills.length]} />
      <path d="M3 0H44" stroke="#4E6A2A" strokeWidth="1" opacity="0.55" />
    </g>
  );
}

/** Kaydırmayla kelime kelime çözülen başlık (bulanıklıktan netliğe). */
export function ScrubWords({
  text,
  p,
  from,
  to,
  className,
}: {
  text: string;
  p: Prog;
  from: number;
  to: number;
  className?: string;
}) {
  const words = text.split(" ");
  const span = (to - from) / (words.length + 1);
  return (
    <h2 className={className} aria-label={text}>
      {words.map((w, i) => (
        <ScrubWord key={i} p={p} a={from + span * i * 0.8} b={from + span * (i * 0.8 + 2)} gap={i < words.length - 1}>
          {w}
        </ScrubWord>
      ))}
    </h2>
  );
}

function ScrubWord({
  p,
  a,
  b,
  gap,
  children,
}: {
  p: Prog;
  a: number;
  b: number;
  gap: boolean;
  children: string;
}) {
  const o = useTransform(p, [a, b], [0, 1]);
  const y = useTransform(o, [0, 1], ["0.35em", "0em"]);
  const blur = useTransform(o, [0, 1], ["blur(10px)", "blur(0px)"]);
  return (
    <>
      <motion.span aria-hidden="true" className="inline-block" style={{ opacity: o, y, filter: blur }}>
        {children}
      </motion.span>
      {gap ? " " : null}
    </>
  );
}
