"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { legalUi } from "@/content/legal";
import { useAiConsent } from "@/components/assistant/AssistantConsent";
import { NOTICE_OPEN_EVENT, readStorage, subscribeStorage, writeStorage } from "./storage";

/**
 * İsteğe bağlı (onay gerektiren) kategoriler. ŞU AN BOŞ: sitede yalnızca zorunlu/işlevsel
 * yerel kayıtlar var, bu yüzden bildirim yalnızca BİLGİLENDİRME amaçlıdır ("Anladım").
 *
 * Analitik gibi bir şey eklenecekse:
 *   1. Kategoriyi buraya ekleyin: ["analytics"]
 *   2. Bildirim otomatik olarak onay moduna geçer: eşit görünürlükte "Kabul et" / "Reddet".
 *   3. Aracı yalnızca `hasNoticeConsent("analytics")` true ise yükleyin.
 *   4. NOTICE_VERSION'ı artırın (herkesten yeniden seçim istenir) ve çerez politikasını güncelleyin.
 */
export type OptionalCategory = "analytics";
const OPTIONAL_CATEGORIES: readonly OptionalCategory[] = [];
const NOTICE_VERSION = 1;
const NOTICE_KEY = "gk-notice";

type StoredNotice = {
  v: number;
  ts: string;
  choices: Partial<Record<OptionalCategory, boolean>>;
};

function parseNotice(raw: string | null): StoredNotice | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as StoredNotice;
    if (typeof value?.v === "number" && typeof value.ts === "string") {
      return { v: value.v, ts: value.ts, choices: value.choices ?? {} };
    }
  } catch {
    /* bozuk kayıt: bildirim yeniden gösterilir */
  }
  return null;
}

/** Kullanıcı bu isteğe bağlı kategoriyi açıkça kabul ettiyse true. Varsayılan: false. */
export function hasNoticeConsent(category: OptionalCategory): boolean {
  if (typeof window === "undefined") return false;
  const stored = parseNotice(readStorage(NOTICE_KEY));
  return stored?.v === NOTICE_VERSION && stored.choices[category] === true;
}

const buttonBase =
  "inline-flex min-h-11 items-center justify-center rounded-[3px] px-4 py-2 text-[0.95rem] font-semibold transition-colors";

export function CookieNotice({ lang }: { lang: Locale }) {
  const ui = legalUi[lang].notice;
  const consentMode = OPTIONAL_CATEGORIES.length > 0;

  // Sunucuda "kayıtlı" varsayılır: ilk boyamada bildirim yanıp sönmez.
  const raw = useSyncExternalStore(
    subscribeStorage,
    () => readStorage(NOTICE_KEY) ?? "",
    () => "decided",
  );
  const needsDecision = useMemo(() => {
    if (raw === "decided") return false;
    const stored = parseNotice(raw || null);
    if (!stored || stored.v !== NOTICE_VERSION) return true;
    return OPTIONAL_CATEGORIES.some((c) => stored.choices[c] === undefined);
  }, [raw]);

  const [reopened, setReopened] = useState(false);
  const visible = needsDecision || reopened;
  const regionRef = useRef<HTMLElement>(null);
  const { granted: aiGranted, revoke } = useAiConsent();
  const [revokedMessage, setRevokedMessage] = useState(false);

  useEffect(() => {
    const open = () => {
      setRevokedMessage(false);
      setReopened(true);
    };
    window.addEventListener(NOTICE_OPEN_EVENT, open);
    return () => window.removeEventListener(NOTICE_OPEN_EVENT, open);
  }, []);

  // Altbilgiden yeniden açıldığında klavye/ekran okuyucu odağını bildirime taşı.
  useEffect(() => {
    if (reopened) regionRef.current?.focus();
  }, [reopened]);

  const decide = useCallback((value: boolean | null) => {
    const choices: StoredNotice["choices"] = {};
    if (value !== null) for (const c of OPTIONAL_CATEGORIES) choices[c] = value;
    writeStorage(NOTICE_KEY, JSON.stringify({ v: NOTICE_VERSION, ts: new Date().toISOString(), choices }));
    setReopened(false);
  }, []);

  if (!visible) return null;

  return (
    <section
      ref={regionRef}
      tabIndex={-1}
      aria-labelledby="notice-title"
      onKeyDown={(e) => {
        if (e.key === "Escape" && reopened && !needsDecision) setReopened(false);
      }}
      data-legal-hide-print
      className="fixed inset-x-3 bottom-3 z-[60] rounded-[4px] border border-line bg-bone p-5 text-ink shadow-warm outline-none sm:inset-x-auto sm:bottom-5 sm:left-5 sm:max-w-[31rem] print:hidden"
    >
      <h2 id="notice-title" className="text-[1.25rem] leading-tight">
        {ui.title}
      </h2>
      <p className="mt-2 text-[0.95rem] leading-snug text-ink-2">
        {consentMode ? ui.consentBody : ui.infoBody}
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        {consentMode ? (
          <>
            {/* Eşit görünürlük: aynı boyut, aynı ağırlık, aynı çerçeve */}
            <button
              type="button"
              onClick={() => decide(true)}
              className={`${buttonBase} border border-ink bg-bone text-ink hover:bg-cream`}
            >
              {ui.accept}
            </button>
            <button
              type="button"
              onClick={() => decide(false)}
              className={`${buttonBase} border border-ink bg-bone text-ink hover:bg-cream`}
            >
              {ui.reject}
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => decide(null)}
            className={`${buttonBase} bg-kilim text-bone hover:bg-kilim-deep`}
          >
            {ui.understood}
          </button>
        )}
        <Link
          href={`/${lang}/cerez-politikasi`}
          className={`${buttonBase} border border-ink-2 text-ink hover:bg-cream`}
        >
          {ui.readPolicy}
        </Link>
      </div>

      {reopened && aiGranted && (
        <button
          type="button"
          onClick={() => {
            revoke();
            setRevokedMessage(true);
          }}
          className="mt-4 text-[0.95rem] font-semibold text-kilim underline underline-offset-[0.22em] hover:text-kilim-deep"
        >
          {ui.revokeAi}
        </button>
      )}
      <p role="status" className="text-[0.95rem] text-ink-2">
        {revokedMessage ? ui.aiRevoked : ""}
      </p>
    </section>
  );
}
