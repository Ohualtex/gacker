"use client";

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import type { QuizTypeId } from "@/content/quiz";

const ALMOND_D = "M16 2C9 10 4 19 4 27c0 7 5.4 11 12 11s12-4 12-11c0-8-5-17-12-25Z";
const SHINE_D = "M16 7c-4.8 6.4-8 13-8 19.5 0 2.2.7 3.9 1.8 5.1C9.2 24.6 11.6 15 16 7Z";

type CandyProps = {
  x: number;
  y: number;
  rotate?: number;
  scale?: number;
  fill: string;
  rim: string;
  /** Üst yüzeydeki parlaklık tonu. */
  shine?: string;
  speckle?: boolean;
  delay?: number;
  from?: "above" | "side";
};

/** Şekerli badem: oval gövde, ince kenar çizgisi, yumuşak parlaklık. Tek parçalık çizim. */
function Candy({ x, y, rotate = 0, scale = 1, fill, rim, shine = "#ffffff", speckle = false, delay = 0, from = "above" }: CandyProps) {
  const reduce = usePrefersReducedMotion();
  return (
    <motion.g
      initial={reduce ? false : { opacity: 0, y: from === "above" ? -26 : 0, x: from === "side" ? 30 : 0 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale}) translate(-16 -20)`}>
        <path d={ALMOND_D} fill={fill} stroke={rim} strokeWidth="1.4" strokeLinejoin="round" />
        <path d={SHINE_D} fill={shine} opacity="0.5" />
        {speckle && (
          <g fill={rim} opacity="0.7">
            <circle cx="19" cy="20" r="1" />
            <circle cx="14" cy="27" r="0.9" />
            <circle cx="20" cy="31" r="0.9" />
            <circle cx="12" cy="18" r="0.8" />
          </g>
        )}
      </g>
    </motion.g>
  );
}

function Plate({ cx = 160, cy = 168, rx = 116, ry = 32 }: { cx?: number; cy?: number; rx?: number; ry?: number }) {
  return (
    <g>
      <ellipse cx={cx} cy={cy + 8} rx={rx} ry={ry} fill="#2a1a12" opacity="0.16" />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#d8b98f" />
      <ellipse cx={cx} cy={cy - 2} rx={rx - 8} ry={ry - 6} fill="#ecd9b8" />
      <ellipse cx={cx} cy={cy - 2} rx={rx - 26} ry={ry - 14} fill="none" stroke="#b5873f" strokeWidth="1.2" opacity="0.6" strokeDasharray="2 5" />
    </g>
  );
}

const IVORY = { fill: "#fbf6ea", rim: "#cdb892", shine: "#ffffff" };

function Klasik() {
  return (
    <>
      <Plate />
      <Candy x={120} y={142} rotate={-14} scale={1.6} {...IVORY} delay={0.05} />
      <Candy x={200} y={142} rotate={14} scale={1.6} {...IVORY} delay={0.15} />
      <Candy x={160} y={116} rotate={0} scale={1.9} {...IVORY} delay={0.28} />
      <path d="M118 176h84" stroke="#b5873f" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
    </>
  );
}

const PASTELS: { fill: string; rim: string }[] = [
  { fill: "#f2bdb6", rim: "#d28f87" },
  { fill: "#cbdcae", rim: "#9fb67c" },
  { fill: "#f4dc92", rim: "#d1b255" },
  { fill: "#f6cdae", rim: "#d7a37c" },
  { fill: "#e3c4de", rim: "#bd94b7" },
];

function Pastel() {
  const spots: [number, number, number, number][] = [
    [74, 150, -62, 1.1],
    [108, 126, -36, 1.2],
    [148, 112, -10, 1.3],
    [190, 118, 16, 1.2],
    [228, 138, 42, 1.15],
    [250, 160, 66, 1.0],
    [160, 150, 6, 1.0],
  ];
  return (
    <>
      <Plate />
      {spots.map(([x, y, r, s], i) => (
        <Candy key={i} x={x} y={y} rotate={r} scale={s} {...PASTELS[i % PASTELS.length]} delay={0.05 + i * 0.07} />
      ))}
    </>
  );
}

function Citir() {
  return (
    <>
      <Plate />
      {/* kırıntılar */}
      <g fill="#8a5a34" opacity="0.8">
        <path d="M70 168l7-4 3 7Z" />
        <path d="M244 172l6-5 4 6Z" />
        <path d="M214 160l5-3 2 5Z" />
        <circle cx="92" cy="174" r="2" />
        <circle cx="230" cy="176" r="1.6" />
      </g>
      <Candy x={110} y={136} rotate={-48} scale={1.7} fill="#c58a52" rim="#7a4a24" shine="#f1c48a" speckle delay={0.05} />
      <Candy x={188} y={130} rotate={34} scale={1.7} fill="#b9453b" rim="#6e1d17" shine="#f0a79c" speckle delay={0.17} from="side" />
      <Candy x={150} y={152} rotate={-84} scale={1.4} fill="#e6c27a" rim="#a07a2b" shine="#fff3cf" speckle delay={0.3} />
      {/* kıvrak hareket çizgileri */}
      <g stroke="#9b2b22" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.7">
        <path d="M232 92l14-12" />
        <path d="M244 106l18-8" />
        <path d="M70 100l-14-10" />
      </g>
    </>
  );
}

function Cayli() {
  return (
    <>
      <Plate cx={160} cy={170} rx={108} ry={30} />
      {/* buhar */}
      <g stroke="#8a5a34" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.5">
        <path d="M146 62c-8 8 8 14 0 24s8 12 2 20" />
        <path d="M168 56c-8 8 8 14 0 24s8 12 2 20" />
      </g>
      {/* ince belli bardak */}
      <g>
        <path d="M128 106H192C192 128 186 146 178 156Q176 158.5 170 158.5H150Q144 158.5 142 156C134 146 128 128 128 106Z" fill="#b5532b" opacity="0.92" />
        <path d="M128 106H192C192 109 191.800 111.500 191.500 114H128.500C128.200 111.500 128 109 128 106Z" fill="#fbf6ea" opacity="0.9" />
        <path d="M132 118c4 14 8 24 14 32" stroke="#ffd9a8" strokeWidth="2.4" strokeLinecap="round" fill="none" opacity="0.55" />
        <path d="M120 106h80" stroke="#d8c3a0" strokeWidth="2" strokeLinecap="round" />
      </g>
      {/* tabak ve şekerler */}
      <ellipse cx="160" cy="162" rx="46" ry="9" fill="#fbf6ea" stroke="#cdb892" strokeWidth="1.4" />
      <Candy x={222} y={152} rotate={58} scale={1.15} {...IVORY} delay={0.1} from="side" />
      <Candy x={248} y={160} rotate={-70} scale={1.05} fill="#f4dc92" rim="#d1b255" delay={0.22} from="side" />
    </>
  );
}

const ART: Record<QuizTypeId, () => React.JSX.Element> = {
  klasik: Klasik,
  pastel: Pastel,
  citir: Citir,
  cayli: Cayli,
};

/** "Şekerden payına düşen": tipe göre şekil ve renk değiştiren inline SVG illüstrasyon. */
export function CandyArt({ type, label, className = "" }: { type: QuizTypeId; label: string; className?: string }) {
  const Art = ART[type];
  return (
    <svg viewBox="36 50 248 150" role="img" aria-label={label} className={className}>
      <Art />
    </svg>
  );
}
