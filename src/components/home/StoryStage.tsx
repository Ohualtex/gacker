"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import type { Locale } from "@/lib/i18n";
import { stage, type Chapter } from "@/content/home";
import { KilimBand } from "@/components/ui/KilimBand";
import { TreeScene } from "./stage/Tree";
import { KazanScene } from "./stage/Kazan";
import { TrayScene } from "./stage/Tray";
import { ScrubWords, type Prog } from "./stage/shared";
import { css } from "./hm";

/* ───────── Arka planlar: altın saatte dış mekân → taş atölye → krem sofra ───────── */

function PhotoWash({ src, wash }: { src: string; wash: string }) {
  return (
    <div className={css.layer}>
      <Image src={src} alt="" fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0" style={{ background: wash }} />
    </div>
  );
}

function BgGolden() {
  return (
    <PhotoWash
      src="/gallery/almond-orchard-hillside.webp"
      wash="linear-gradient(90deg, rgba(248,230,194,0.92) 0%, rgba(248,230,194,0.48) 46%, rgba(248,230,194,0.12) 100%)"
    />
  );
}

function BgStone() {
  return (
    <PhotoWash
      src="/gallery/stone-workshop-interior.webp"
      wash="linear-gradient(90deg, color-mix(in srgb, var(--sb-m) 82%, transparent) 0%, color-mix(in srgb, var(--sb-m) 40%, transparent) 48%, color-mix(in srgb, var(--sb-m) 18%, transparent) 100%)"
    />
  );
}

function BgTable() {
  return (
    <div className={css.layer}>
      <PhotoWash
        src="/gallery/tea-table-candy-tray.webp"
        wash="linear-gradient(90deg, color-mix(in srgb, var(--cream) 90%, transparent) 0%, color-mix(in srgb, var(--cream) 42%, transparent) 50%, transparent 100%)"
      />
      <div className="absolute inset-x-0 bottom-0">
        <KilimBand height={30} />
      </div>
    </div>
  );
}

/* ───────── Metin bloğu + ince ilerleme çizgisi ───────── */

function Block({
  c,
  fg,
  opacity,
  y,
  p,
  children,
  wide,
}: {
  c: Chapter;
  fg: string;
  opacity: Prog;
  y: Prog;
  p: Prog;
  children?: ReactNode;
  wide?: boolean;
}) {
  const fill = useTransform(p, [0, 1], [0, 1]);
  const t2 = useTransform(p, [0.32, 0.36], [0, 1]);
  const t3 = useTransform(p, [0.65, 0.69], [0, 1]);
  const on = [useTransform(p, [0, 0.01], [1, 1]), t2, t3];
  return (
    <motion.div className={css.block} style={{ color: fg, opacity, y, pointerEvents: "none" }}>
      <div className={css.rail} aria-hidden="true">
        <span className={css.railTrack} />
        <motion.span className={css.railFill} style={{ scaleY: fill }} />
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={css.tick}
            style={{ top: i === 0 ? "0" : i === 1 ? "calc(50% - 0.31rem)" : "calc(100% - 0.62rem)", background: "transparent", color: fg }}
          >
            <motion.span className={css.tickOn} style={{ opacity: on[i] }} />
          </span>
        ))}
      </div>
      <div>
        {children ?? <h2 className={css.title}>{c.title}</h2>}
        <p className={`${css.body} ${wide ? css.bodyWide : ""}`}>{c.body}</p>
      </div>
    </motion.div>
  );
}

/* ───────── Sabitlenmiş sahne ───────── */

function Pinned({ lang }: { lang: Locale }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.35, restDelta: 0.0002 });
  const [A, B, C] = stage.chapters[lang];

  const a = useTransform(p, [0.0, 0.3], [0, 1]);
  const b = useTransform(p, [0.36, 0.64], [0, 1]);
  const c = useTransform(p, [0.7, 0.96], [0, 1]);

  const bgA = useTransform(p, [0.3, 0.37], [1, 0]);
  const bgB = useTransform(p, [0.63, 0.7], [1, 0]);

  const sA = useTransform(p, [0.28, 0.34], [1, 0]);
  const sB = useTransform(p, [0.3, 0.37, 0.62, 0.68], [0, 1, 1, 0]);
  const sC = useTransform(p, [0.64, 0.71], [0, 1]);
  const sAy = useTransform(p, [0.28, 0.34], [0, -30]);
  const sBy = useTransform(p, [0.3, 0.37, 0.62, 0.68], [30, 0, 0, -30]);
  const sCy = useTransform(p, [0.64, 0.71], [30, 0]);

  const tA = useTransform(p, [0.26, 0.31], [1, 0]);
  const tB = useTransform(p, [0.31, 0.37, 0.59, 0.64], [0, 1, 1, 0]);
  const tC = useTransform(p, [0.65, 0.71], [0, 1]);
  const tAy = useTransform(p, [0.26, 0.31], [0, -26]);
  const tBy = useTransform(p, [0.31, 0.37, 0.59, 0.64], [26, 0, 0, -26]);
  const tCy = useTransform(p, [0.65, 0.71], [26, 0]);

  return (
    <section ref={ref} className={css.runway} aria-label={stage.label[lang]}>
      <div className={css.stage}>
        <BgTable />
        <motion.div className={css.layer} style={{ opacity: bgB }}>
          <BgStone />
        </motion.div>
        <motion.div className={css.layer} style={{ opacity: bgA }}>
          <BgGolden />
        </motion.div>

        <motion.div className={css.scene} style={{ opacity: sC, y: sCy }}>
          <div className={css.sceneInner}>
            <TrayScene p={c} />
          </div>
        </motion.div>
        <motion.div className={css.scene} style={{ opacity: sB, y: sBy }}>
          <div className={css.sceneInner}>
            <KazanScene p={b} />
          </div>
        </motion.div>
        <motion.div className={css.scene} style={{ opacity: sA, y: sAy }}>
          <div className={css.sceneInner}>
            <TreeScene p={a} />
          </div>
        </motion.div>

        <motion.div className={css.scrimA} style={{ opacity: tA }} aria-hidden="true" />
        <Block c={A} fg="#2A1A12" opacity={tA} y={tAy} p={p} />
        <Block c={B} fg="var(--st-fg)" opacity={tB} y={tBy} p={p} wide />
        <Block c={C} fg="var(--ink)" opacity={tC} y={tCy} p={p} wide>
          <ScrubWords text={C.title} p={c} from={0.72} to={0.96} className={css.title} />
        </Block>
      </div>
    </section>
  );
}

/* ───────── Hareket azaltma: her bölüm son hâliyle, alt alta ───────── */

function StaticChapter({
  c,
  bg,
  fg,
  children,
}: {
  c: Chapter;
  bg: ReactNode;
  fg: string;
  children: ReactNode;
}) {
  const style: CSSProperties = { color: fg };
  return (
    <section className={css.staticChapter} style={style}>
      {bg}
      <div className={css.staticText}>
        <h2 className={css.title}>{c.title}</h2>
        <p className={css.body}>{c.body}</p>
      </div>
      <div className={css.staticScene} aria-hidden="true">
        {children}
      </div>
    </section>
  );
}

function Static({ lang }: { lang: Locale }) {
  const done = useMotionValue(1);
  const [A, B, C] = stage.chapters[lang];
  return (
    <div className={css.staticWrap} aria-label={stage.label[lang]} role="group">
      <StaticChapter c={A} bg={<BgGolden />} fg="#2A1A12">
        <TreeScene p={done} />
      </StaticChapter>
      <StaticChapter c={B} bg={<BgStone />} fg="var(--st-fg)">
        <KazanScene p={done} />
      </StaticChapter>
      <StaticChapter c={C} bg={<BgTable />} fg="var(--ink)">
        <TrayScene p={done} />
      </StaticChapter>
    </div>
  );
}

export function StoryStage({ lang }: { lang: Locale }) {
  const reduce = useReducedMotion();
  return reduce ? <Static lang={lang} /> : <Pinned lang={lang} />;
}
