"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { css } from "./hm";

/**
 * Hero sahnesi. Renkler `home.css` içindeki tema değişkenlerinden gelir:
 * açık tema = sıcak gündüz (krem-şeftali gökyüzü, kum/badem/zeytin tepeler, pembe-beyaz çiçekler),
 * koyu tema = altın saat (sıcak espresso). Video gelince bu sahnenin üstüne biner.
 */

function Blossom({ x, y, s = 1, r = 0 }: { x: number; y: number; s?: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse
          key={a}
          cx="0"
          cy="-9"
          rx="6.4"
          ry="10.4"
          transform={`rotate(${a})`}
          fill="var(--h-petal)"
          stroke="var(--h-petal-edge)"
          strokeWidth="0.7"
        />
      ))}
      <circle r="3.4" fill="#C8952B" />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <circle
          key={a}
          cx={+(Math.cos((a * Math.PI) / 180) * 5.2).toFixed(2)}
          cy={+(Math.sin((a * Math.PI) / 180) * 5.2).toFixed(2)}
          r="0.95"
          fill="#9B2B22"
        />
      ))}
    </g>
  );
}

function Branch({ mirror = false }: { mirror?: boolean }) {
  const bark = "var(--h-bark)";
  return (
    <svg
      viewBox="0 0 520 360"
      className="h-full w-full"
      style={mirror ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden="true"
    >
      <path d="M-10 40 C 90 70, 150 60, 230 120 S 360 190, 470 170" fill="none" stroke={bark} strokeWidth="9" strokeLinecap="round" />
      <path d="M150 62 C 190 20, 240 10, 290 30" fill="none" stroke={bark} strokeWidth="5" strokeLinecap="round" />
      <path d="M270 135 C 300 190, 330 230, 340 285" fill="none" stroke={bark} strokeWidth="5" strokeLinecap="round" />
      <path d="M390 180 C 430 215, 470 225, 505 262" fill="none" stroke={bark} strokeWidth="4" strokeLinecap="round" />
      <path d="M60 52 C 40 90, 30 120, 36 156" fill="none" stroke={bark} strokeWidth="3.5" strokeLinecap="round" />
      {/* yapraklar */}
      {[
        [120, 78, 40],
        [190, 98, -30],
        [262, 124, 50],
        [330, 168, -20],
        [420, 188, 36],
        [250, 22, -40],
      ].map(([x, y, r], i) => (
        <ellipse key={i} cx={x} cy={y} rx="15" ry="5.6" transform={`rotate(${r} ${x} ${y})`} fill="var(--olive)" opacity="0.8" />
      ))}
      <Blossom x={75} y={62} s={1.25} r={10} />
      <Blossom x={150} y={64} s={1.05} r={40} />
      <Blossom x={228} y={118} s={1.35} r={-12} />
      <Blossom x={292} y={32} s={1.1} r={25} />
      <Blossom x={205} y={30} s={0.95} r={55} />
      <Blossom x={338} y={160} s={1.3} r={8} />
      <Blossom x={342} y={286} s={1.05} r={-30} />
      <Blossom x={425} y={196} s={1} r={32} />
      <Blossom x={474} y={170} s={1.2} r={-18} />
      <Blossom x={506} y={263} s={0.95} r={14} />
      <Blossom x={36} y={156} s={1.1} r={-24} />
      <Blossom x={110} y={86} s={0.85} r={70} />
      <Blossom x={380} y={176} s={0.8} r={-50} />
    </svg>
  );
}

const PETALS = [
  { left: "12%", delay: 0, dur: 17, size: 12 },
  { left: "27%", delay: 5, dur: 21, size: 9 },
  { left: "41%", delay: 11, dur: 19, size: 11 },
  { left: "63%", delay: 3, dur: 23, size: 10 },
  { left: "78%", delay: 8, dur: 18, size: 13 },
  { left: "90%", delay: 14, dur: 22, size: 9 },
];

export function HeroScene() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const hillsBack = useTransform(scrollY, [0, 700], [0, 40]);
  const hillsMid = useTransform(scrollY, [0, 700], [0, 90]);
  const hillsFront = useTransform(scrollY, [0, 700], [0, 150]);
  const sky = useTransform(scrollY, [0, 700], [0, 20]);

  const sway = reduce
    ? undefined
    : { rotate: [-1.4, 1.4, -1.4], transition: { duration: 9, repeat: Infinity, ease: "easeInOut" as const } };

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-30 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "var(--h-sky)" }} />

      {/* Güneş: sabit, yumuşak; iki katmanlı hale */}
      <motion.div
        style={{ y: sky }}
        className="absolute left-[70%] top-[28%] h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 md:left-[79%] md:top-[36%] md:h-[64rem] md:w-[64rem]"
        initial={false}
      >
        <div className="h-full w-full rounded-full" style={{ background: "var(--h-halo)" }} />
        <div
          className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full md:h-32 md:w-32"
          style={{ background: "var(--h-disc)", boxShadow: "var(--h-disc-glow)" }}
        />
      </motion.div>
      {/* Güneş ışığı: ince, durağan huzmeler */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-screen"
        style={{
          opacity: "var(--h-rays-op)",
          background:
            "conic-gradient(from 188deg at 79% 36%, transparent 0deg, rgba(255,240,200,0.95) 4deg, transparent 10deg, transparent 22deg, rgba(255,240,200,0.75) 27deg, transparent 33deg, transparent 48deg, rgba(255,240,200,0.85) 53deg, transparent 60deg, transparent 360deg)",
          maskImage: "linear-gradient(to bottom, #000 0%, transparent 78%)",
          WebkitMaskImage: "linear-gradient(to bottom, #000 0%, transparent 78%)",
        }}
      />

      {/* Yamaçlar: üç katman, farklı hızda kayar */}
      <motion.svg
        style={{ y: hillsBack }}
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-[10%] h-[42%] w-full"
      >
        <path
          d="M0 220 C 140 150, 260 190, 380 140 S 600 80, 740 150 S 1000 230, 1130 150 S 1340 110, 1440 170 L1440 400 L0 400Z"
          fill="var(--h-hill-1)"
          opacity="var(--h-hill-op)"
        />
        {/* Harput Kalesi'ni andıran sade taş siluet: sembolik, belgesel iddiası yok */}
        <path
          d="M930 152 l0 -26 l10 0 l0 -8 l10 0 l0 8 l12 0 l0 -14 l10 0 l0 14 l12 0 l0 -8 l10 0 l0 8 l10 0 l0 34Z"
          fill="var(--h-castle)"
        />
      </motion.svg>
      <motion.svg
        style={{ y: hillsMid }}
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-[2%] h-[38%] w-full"
      >
        <path d="M0 200 C 180 120, 330 230, 520 170 S 820 90, 990 170 S 1260 230, 1440 140 L1440 400 L0 400Z" fill="var(--h-hill-2)" />
      </motion.svg>

      {/* Sis: ufukta çok yavaş kayar */}
      <div
        className={`${css.mist} pointer-events-none absolute -inset-x-[10%] bottom-[22%] h-[26%]`}
        style={{
          background:
            "radial-gradient(ellipse 45% 60% at 30% 55%, var(--h-mist), transparent 70%), radial-gradient(ellipse 40% 55% at 72% 45%, var(--h-mist), transparent 70%)",
        }}
      />
      {/* Ufuk sisi: uzak yamaçları aydınlatır, derinlik verir */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%]"
        style={{
          background:
            "linear-gradient(to top, transparent 0%, var(--h-haze) 40%, transparent 100%)",
        }}
      />

      <motion.svg
        style={{ y: hillsFront }}
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        className="absolute inset-x-0 -bottom-[2%] h-[30%] w-full"
      >
        <path d="M0 180 C 220 110, 420 220, 640 160 S 1020 90, 1220 170 S 1380 190, 1440 150 L1440 400 L0 400Z" fill="var(--h-hill-3)" />
      </motion.svg>

      {/* Film greni: bantlanmayı önler */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ opacity: "var(--h-grain-op)", mixBlendMode: "var(--h-grain-blend)" as never }}
      >
        <filter id="hero-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 1  0 0 0 0 0.9  0 0 0 0 0.75  0 0 0 0.9 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-grain)" />
      </svg>

      {/* Badem çiçeği dalları */}
      <motion.div
        animate={sway}
        style={{ transformOrigin: "0% 0%" }}
        className="absolute -left-10 top-16 h-[22rem] w-[32rem] max-w-[70vw] md:top-14 md:h-[26rem] md:w-[37.5rem]"
      >
        <Branch />
      </motion.div>
      <motion.div
        animate={sway ? { ...sway, rotate: [1.2, -1.2, 1.2] } : undefined}
        style={{ transformOrigin: "100% 0%" }}
        className="absolute -right-10 top-20 hidden h-[22rem] w-[30rem] md:block"
      >
        <Branch mirror />
      </motion.div>

      {/* Yavaş süzülen çiçek yaprakları */}
      {!reduce &&
        PETALS.map((p, i) => (
          <motion.span
            key={i}
            className="absolute top-[-6%] block rounded-[60%_40%_60%_40%]"
            style={{ left: p.left, width: p.size, height: p.size * 1.5, opacity: 0.9, background: "var(--h-fall)" }}
            animate={{ y: ["0vh", "112vh"], x: [0, 40, -20, 30], rotate: [0, 160, 300] }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "linear" }}
          />
        ))}
    </div>
  );
}
