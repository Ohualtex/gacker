"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";

export const EXPO = [0.16, 1, 0.3, 1] as const;

/** Görünüme girince bir kez, üstel ease-out ile yükselen/kayan sarmalayıcı. */
export function Rise({
  children,
  delay = 0,
  x = 0,
  y = 28,
  duration = 1,
  className,
  once = true,
  amount = 0.2,
  blur = 0,
}: {
  children: ReactNode;
  delay?: number;
  x?: number;
  y?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
  /** px cinsinden başlangıç bulanıklığı; 0 ise bulanıklık yok. */
  blur?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, x, y, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount, margin: "0px 0px -6% 0px" }}
      transition={{ duration, delay, ease: EXPO }}
    >
      {children}
    </motion.div>
  );
}

/** Başlık: kelimeler maske içinden yükselir; görünüme girince tetiklenir. */
export function InViewWords({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  step = 0.07,
}: {
  text: string;
  as?: "h2" | "h3";
  className?: string;
  delay?: number;
  step?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const MotionTag = motion[Tag];
  return (
    <MotionTag
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.6 }}
      transition={{ staggerChildren: step, delayChildren: delay }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.14em] align-bottom" aria-hidden="true">
          <motion.span
            className="inline-block"
            variants={{
              hidden: reduce ? { y: 0, opacity: 1 } : { y: "108%", opacity: 0 },
              shown: { y: 0, opacity: 1 },
            }}
            transition={{ duration: 1, ease: EXPO }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/** Çerçeve açılışı: alttan yukarı maske, içerik hafifçe küçülerek oturur. */
export function ClipReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  // Gözlem maskesiz dış kutuda yapılır: clip-path'li öğe IntersectionObserver'a görünmez sayılır.
  const seen = useInView(ref, { once: true, amount: 0.12 });
  const open = reduce || seen;
  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
        animate={open ? { clipPath: "inset(-20% -20% -20% -20%)" } : undefined}
        transition={{ duration: 1.3, delay, ease: EXPO }}
      >
        <motion.div
          initial={reduce ? false : { scale: 1.12 }}
          animate={open ? { scale: 1 } : undefined}
          transition={{ duration: 1.6, delay, ease: EXPO }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
