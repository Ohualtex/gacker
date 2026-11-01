"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, Check, MessageCircle, RotateCcw, Share2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { KilimBand } from "@/components/ui/KilimBand";
import { CandyArt } from "./CandyArt";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import {
  QUIZ_SLUG,
  isQuizTypeId,
  quizCopy,
  quizQuestions,
  quizResults,
  scoreQuiz,
  type QuizTypeId,
} from "@/content/quiz";
import "./quiz.css";

const EASE = [0.16, 1, 0.3, 1] as const;
const TOTAL = quizQuestions.length;
const ADVANCE_DELAY_MS = 280;
const LETTERS = ["A", "B", "C", "D"];

type ShareState = "idle" | "copied" | "failed";

function Progress({ step, label }: { step: number; label: string }) {
  const reduce = usePrefersReducedMotion();
  const pct = ((step + 1) / TOTAL) * 100;
  return (
    <div className="gk-quiz-progress">
      <div className="gk-quiz-progress-label">
        <span>{label}</span>
      </div>
      <div
        className="gk-quiz-bar"
        role="progressbar"
        aria-label={label}
        aria-valuemin={1}
        aria-valuemax={TOTAL}
        aria-valuenow={step + 1}
      >
        <div className="gk-quiz-bar-ghost" aria-hidden="true">
          <KilimBand height={10} />
        </div>
        <motion.div
          className="gk-quiz-bar-fill"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={reduce ? { duration: 0 } : { duration: 0.7, ease: EASE }}
        >
          <KilimBand height={10} />
        </motion.div>
      </div>
    </div>
  );
}

export function QuizApp({ lang }: { lang: Locale }) {
  const t = quizCopy[lang];
  const reduce = usePrefersReducedMotion();
  const searchParams = useSearchParams();

  // Geçersiz ?r= değeri güvenle yok sayılır.
  const [result, setResult] = useState<QuizTypeId | null>(() => {
    const r = searchParams.get("r");
    return isQuizTypeId(r) ? r : null;
  });
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [shareState, setShareState] = useState<ShareState>("idle");

  const lockRef = useRef(false);
  const timerRef = useRef<number | null>(null);
  const shareTimerRef = useRef<number | null>(null);
  const interactedRef = useRef(false);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      if (shareTimerRef.current) window.clearTimeout(shareTimerRef.current);
    },
    [],
  );

  // Kullanıcı etkileşiminden sonra ekran değişince odağı yeni başlığa taşı (ekran okuyucu duyurusu).
  useEffect(() => {
    if (!interactedRef.current) return;
    headingRef.current?.focus({ preventScroll: true });
  }, [result]);

  // Soru değişince odak, geçiş bittiğinde yeni başlığa taşınır (çıkan öğeye değil).
  const focusHeading = () => {
    if (interactedRef.current) headingRef.current?.focus({ preventScroll: true });
  };

  const writeUrl = useCallback(
    (type: QuizTypeId | null) => {
      const url = `/${lang}/${QUIZ_SLUG}${type ? `?r=${type}` : ""}`;
      window.history.replaceState(null, "", url);
    },
    [lang],
  );

  const choose = (index: number) => {
    if (lockRef.current) return;
    lockRef.current = true;
    interactedRef.current = true;
    const next = [...answers.slice(0, step), index];
    setAnswers(next);
    timerRef.current = window.setTimeout(() => {
      setDirection(1);
      if (step < TOTAL - 1) {
        setStep(step + 1);
      } else {
        const type = scoreQuiz(next);
        setResult(type);
        writeUrl(type);
      }
      lockRef.current = false;
    }, ADVANCE_DELAY_MS);
  };

  const goBack = () => {
    if (lockRef.current || step === 0) return;
    interactedRef.current = true;
    setDirection(-1);
    setStep(step - 1);
  };

  const retry = () => {
    interactedRef.current = true;
    lockRef.current = false;
    setDirection(-1);
    setAnswers([]);
    setStep(0);
    setResult(null);
    setShareState("idle");
    writeUrl(null);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const keys = ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"];
    if (!keys.includes(e.key)) return;
    const items = optionRefs.current.filter((el): el is HTMLButtonElement => el !== null);
    const current = items.findIndex((el) => el === document.activeElement);
    let nextIndex = current;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") nextIndex = (current + 1) % items.length;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") nextIndex = (current - 1 + items.length) % items.length;
    else if (e.key === "Home") nextIndex = 0;
    else nextIndex = items.length - 1;
    e.preventDefault();
    items[nextIndex]?.focus();
  };

  const flashShare = (state: ShareState) => {
    setShareState(state);
    if (shareTimerRef.current) window.clearTimeout(shareTimerRef.current);
    shareTimerRef.current = window.setTimeout(() => setShareState("idle"), 2600);
  };

  const share = async () => {
    if (!result) return;
    const name = quizResults[result][lang].name;
    const text = t.shareText.replace("{name}", name);
    const url = `${window.location.origin}/${lang}/${QUIZ_SLUG}?r=${result}`;
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: t.shareTitle, text, url });
        return;
      } catch (err) {
        // Kullanıcı paylaşım penceresini kapattıysa sessizce çık; başka hatada panoya düş.
        if (err instanceof DOMException && err.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(`${text} ${url}`);
      flashShare("copied");
    } catch {
      flashShare("failed");
    }
  };

  const askAssistant = () => window.dispatchEvent(new CustomEvent("gk-assistant:open"));

  const slide = reduce
    ? { initial: false as const, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.12 } }
    : {
        initial: { opacity: 0, x: 28 * direction },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -28 * direction },
        transition: { duration: 0.42, ease: EASE },
      };

  if (result) {
    const r = quizResults[result][lang];
    return (
      <div className="gk-quiz-card">
        <motion.div
          className="gk-quiz-result"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <figure className="gk-quiz-art">
            <div className="gk-quiz-art-frame">
              <CandyArt type={result} label={r.share} />
            </div>
            <figcaption className="gk-quiz-art-cap">{r.share}</figcaption>
          </figure>

          <div>
            <h2 ref={headingRef} tabIndex={-1} className="gk-quiz-result-name">
              {r.name}
            </h2>
            <p className="gk-quiz-result-tag">{r.tagline}</p>
            <p className="gk-quiz-result-desc">{r.description}</p>

            <div className="gk-quiz-actions">
              <button type="button" className="gk-quiz-btn" data-variant="primary" onClick={share}>
                {shareState === "copied" ? (
                  <Check className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                ) : (
                  <Share2 className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" />
                )}
                {shareState === "copied" ? t.shareCopied : t.share}
              </button>
              <button type="button" className="gk-quiz-btn" onClick={retry}>
                <RotateCcw className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" />
                {t.retry}
              </button>
              <button type="button" className="gk-quiz-btn" data-variant="quiet" onClick={askAssistant}>
                <MessageCircle className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" />
                {t.askAssistant}
              </button>
            </div>
            <p className="gk-quiz-status" role="status" aria-live="polite">
              {shareState === "copied" ? t.shareCopied : shareState === "failed" ? t.shareFailed : ""}
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  const q = quizQuestions[step];
  const selected = answers[step];
  const progressLabel = t.progressLabel.replace("{n}", String(step + 1)).replace("{total}", String(TOTAL));

  return (
    <div className="gk-quiz-card">
      <Progress step={step} label={progressLabel} />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={step} {...slide} onAnimationComplete={focusHeading}>
          <h2 ref={headingRef} tabIndex={-1} id={`gk-quiz-q-${step}`} className="gk-quiz-question">
            {q.prompt[lang]}
          </h2>
          <div
            role="radiogroup"
            aria-labelledby={`gk-quiz-q-${step}`}
            className="gk-quiz-options"
            onKeyDown={onKeyDown}
          >
            {q.options.map((opt, i) => (
              <button
                key={i}
                ref={(el) => {
                  optionRefs.current[i] = el;
                }}
                type="button"
                role="radio"
                aria-checked={selected === i}
                tabIndex={i === (selected ?? 0) ? 0 : -1}
                className="gk-quiz-option"
                onClick={() => choose(i)}
              >
                <span className="gk-quiz-option-mark" aria-hidden="true">
                  {LETTERS[i]}
                </span>
                <span className="gk-quiz-option-text">{opt.text[lang]}</span>
              </button>
            ))}
          </div>
          <div className="gk-quiz-foot">
            <button
              type="button"
              className="gk-quiz-btn"
              data-variant="quiet"
              onClick={goBack}
              hidden={step === 0}
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" />
              {t.back}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
