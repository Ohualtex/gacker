"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { defaultLocale, hasLocale, type Locale } from "@/lib/i18n";
import { QUIZ_SLUG, quizCopy } from "@/content/quiz";
import { readStorage } from "@/components/legal/storage";
import { ASSISTANT_OPEN_EVENT } from "@/components/assistant/AssistantWidget";
import { KilimBand } from "@/components/ui/KilimBand";
import "./quiz.css";

export const QUIZ_INVITE_KEY = "gk-quiz-invite";
const DELAY_MS = 8000;

const LEGAL = new Set([
  "kvkk",
  "gizlilik",
  "cerez-politikasi",
  "kullanim-kosullari",
  "yapay-zeka-ve-icerik",
]);

function shouldOffer(pathname: string | null): boolean {
  if (!pathname) return false;
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return false;
  const lang = parts[0];
  if (!hasLocale(lang)) return false;
  const rest = parts.slice(1).join("/");
  if (rest === QUIZ_SLUG) return false;
  if (LEGAL.has(rest)) return false;
  return rest === "";
}

export function QuizInvite({ lang }: { lang?: Locale }) {
  const pathname = usePathname();
  const first = pathname?.split("/")[1] ?? "";
  const locale: Locale = lang ?? (hasLocale(first) ? first : defaultLocale);
  const t = quizCopy[locale];
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  const dismiss = useCallback(() => {
    setOpen(false);
    try {
      sessionStorage.setItem(QUIZ_INVITE_KEY, "1");
    } catch {
      /* yoksay */
    }
  }, []);

  useEffect(() => {
    if (!shouldOffer(pathname)) return;
    try {
      if (sessionStorage.getItem(QUIZ_INVITE_KEY) === "1") return;
    } catch {
      /* depolama kapalıysa yine göster */
    }
    if (!readStorage("gk-notice")) return;

    let shown = false;
    const show = () => {
      if (shown) return;
      shown = true;
      setOpen(true);
    };

    const onScroll = () => {
      if (window.scrollY > 80) show();
    };
    const timer = window.setTimeout(show, DELAY_MS);
    window.addEventListener("scroll", onScroll, { passive: true });
    const hideForChat = () => {
      shown = true;
      setOpen(false);
    };
    window.addEventListener(ASSISTANT_OPEN_EVENT, hideForChat);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener(ASSISTANT_OPEN_EVENT, hideForChat);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, dismiss]);

  if (!open) return null;

  return (
    <div className="gk-quiz-invite" role="presentation">
      <button
        type="button"
        className="gk-quiz-invite-scrim"
        aria-label={locale === "tr" ? "Daveti kapat" : "Dismiss invite"}
        onClick={dismiss}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="gk-quiz-invite-title"
        className="gk-quiz-invite-card"
      >
        <KilimBand height={8} />
        <button
          ref={closeRef}
          type="button"
          className="gk-quiz-invite-close"
          onClick={dismiss}
          aria-label={locale === "tr" ? "Daveti kapat" : "Dismiss invite"}
        >
          <X size={18} strokeWidth={1.75} aria-hidden="true" />
        </button>
        <p id="gk-quiz-invite-title" className="gk-quiz-invite-title">
          {t.teaser.title}
        </p>
        <p className="gk-quiz-invite-body">{t.teaser.body}</p>
        <p className="gk-quiz-invite-note">{t.disclaimer}</p>
        <div className="gk-quiz-invite-actions">
          <Link
            href={`/${locale}/${QUIZ_SLUG}`}
            className="gk-quiz-invite-cta"
            onClick={dismiss}
          >
            {t.teaser.cta}
          </Link>
          <button type="button" className="gk-quiz-invite-later" onClick={dismiss}>
            {locale === "tr" ? "Sonra" : "Later"}
          </button>
        </div>
      </div>
    </div>
  );
}
