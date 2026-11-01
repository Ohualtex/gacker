import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { QUIZ_SLUG, quizCopy } from "@/content/quiz";
import "./quiz.css";

const ALMOND_D = "M16 2C9 10 4 19 4 27c0 7 5.4 11 12 11s12-4 12-11c0-8-5-17-12-25Z";
const SHINE_D = "M16 7c-4.8 6.4-8 13-8 19.5 0 2.2.7 3.9 1.8 5.1C9.2 24.6 11.6 15 16 7Z";

const CANDIES: { x: number; rotate: number; fill: string; rim: string }[] = [
  { x: 14, rotate: -14, fill: "#fbf6ea", rim: "#cdb892" },
  { x: 38, rotate: 6, fill: "#f2bdb6", rim: "#d28f87" },
  { x: 62, rotate: -4, fill: "#cbdcae", rim: "#9fb67c" },
  { x: 86, rotate: 14, fill: "#f4dc92", rim: "#d1b255" },
];

/**
 * Kompakt davet kartı: ana sayfa veya diğer sayfalara yerleştirilir.
 * Sunucu bileşeni; yalnızca `lang` alır.
 */
export function QuizTeaser({ lang, className = "" }: { lang: Locale; className?: string }) {
  const t = quizCopy[lang].teaser;
  return (
    <Link href={`/${lang}/${QUIZ_SLUG}`} className={`gk-quiz-teaser ${className}`.trim()}>
      <svg viewBox="0 0 100 46" className="gk-quiz-teaser-art" aria-hidden="true">
        {CANDIES.map((c) => (
          <g key={c.x} transform={`translate(${c.x} 28)`}>
            <g className="gk-quiz-teaser-candy">
              <g transform={`rotate(${c.rotate}) scale(0.62) translate(-16 -20)`}>
                <path d={ALMOND_D} fill={c.fill} stroke={c.rim} strokeWidth="1.6" strokeLinejoin="round" />
                <path d={SHINE_D} fill="#fff" opacity="0.5" />
              </g>
            </g>
          </g>
        ))}
      </svg>
      <span className="gk-quiz-teaser-body">
        <span className="gk-quiz-teaser-title block">{t.title}</span>
        <span className="gk-quiz-teaser-sub block">{t.body}</span>
      </span>
      <span className="gk-quiz-teaser-cta">
        {t.cta}
        <ArrowRight className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" />
      </span>
    </Link>
  );
}
