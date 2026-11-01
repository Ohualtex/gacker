"use client";

import type { Locale } from "@/lib/i18n";
import { marquee } from "@/content/home";
import { css } from "./hm";

function Diamond() {
  return (
    <svg viewBox="0 0 40 40" className={css.marqueeDiamond} aria-hidden="true">
      <path d="M20 1 39 20 20 39 1 20Z" fill="var(--kilim)" />
      <path d="M20 9 31 20 20 31 9 20Z" fill="var(--saffron)" />
      <path d="M20 16 24 20 20 24 16 20Z" fill="var(--kilim-deep)" />
    </svg>
  );
}

function Group({ words, hidden }: { words: string[]; hidden?: boolean }) {
  return (
    <div className={`${css.marqueeGroup} ${hidden ? css.marqueeDup : ""}`} aria-hidden={hidden || undefined}>
      {words.map((w) => (
        <span key={w} className="contents">
          <span className={css.marqueeWord}>{w}</span>
          <Diamond />
        </span>
      ))}
    </div>
  );
}

/** Sakin, sonsuz kayan bant: dev Gloock + kilim baklavaları. Üzerine gelince durur. */
export function Marquee({ lang }: { lang: Locale }) {
  const words = marquee[lang];
  return (
    <section className={css.marquee} aria-label={words.join(", ")}>
      <span className={`${css.marqueeFade} ${css.l}`} aria-hidden="true" />
      <span className={`${css.marqueeFade} ${css.r}`} aria-hidden="true" />
      <div className={css.marqueeTrack}>
        <Group words={words} />
        <Group words={words} hidden />
      </div>
    </section>
  );
}
