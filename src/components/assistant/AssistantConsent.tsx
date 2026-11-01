"use client";

import { useCallback, useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { legalConfig } from "@/content/legal-config";
import { legalUi } from "@/content/legal";
import { readStorage, subscribeStorage, writeStorage } from "@/components/legal/storage";

export const AI_CONSENT_KEY = "gk-ai-consent";

type StoredConsent = { version: string; ts: string };

function parse(raw: string | null): StoredConsent | null {
  if (!raw) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (
      value &&
      typeof value === "object" &&
      typeof (value as StoredConsent).version === "string" &&
      typeof (value as StoredConsent).ts === "string"
    ) {
      return value as StoredConsent;
    }
  } catch {
    /* bozuk kayıt: onay yok sayılır */
  }
  return null;
}

const noopSubscribe = () => () => {};

/**
 * Yapay zekâ asistanı onayı.
 * - `ready`: tarayıcıda okundu (SSR/hydration sırasında false; bu sırada panel gösterme).
 * - `granted`: geçerli sürümde onay var.
 * - `grant()` / `revoke()`: onayı kaydeder / geri çeker.
 */
export function useAiConsent() {
  const raw = useSyncExternalStore(
    subscribeStorage,
    () => readStorage(AI_CONSENT_KEY),
    () => null,
  );
  const ready = useSyncExternalStore(noopSubscribe, () => true, () => false);

  const granted = useMemo(() => parse(raw)?.version === legalConfig.consentVersion, [raw]);

  const grant = useCallback(() => {
    const record: StoredConsent = { version: legalConfig.consentVersion, ts: new Date().toISOString() };
    writeStorage(AI_CONSENT_KEY, JSON.stringify(record));
  }, []);
  const revoke = useCallback(() => writeStorage(AI_CONSENT_KEY, null), []);

  return { ready, granted, grant, revoke };
}

export type AssistantConsentProps = {
  lang: Locale;
  /** Onay kaydedildikten sonra çağrılır (ör. girdiye odaklanmak için). */
  onAccept?: () => void;
  /** “Vazgeç”: onay kaydedilmez; genellikle paneli kapatır. */
  onCancel?: () => void;
  className?: string;
};

const buttonBase =
  "inline-flex min-h-11 items-center justify-center rounded-[3px] px-4 py-2 text-[0.95rem] font-semibold transition-colors";

/** Asistanın ilk kullanımında gösterilen küçük onay paneli. */
export function AssistantConsent({ lang, onAccept, onCancel, className = "" }: AssistantConsentProps) {
  const { grant } = useAiConsent();
  const ui = legalUi[lang].aiConsent;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
  }, []);

  return (
    <section
      ref={ref}
      tabIndex={-1}
      aria-labelledby="ai-consent-title"
      className={`flex min-h-0 flex-1 flex-col bg-bone text-ink outline-none ${className}`}
    >
      <div className="min-h-0 flex-1 overflow-y-auto px-5 pt-4">
        <h2 id="ai-consent-title" className="text-[1.375rem] leading-tight">
          {ui.title}
        </h2>
        <p className="mt-3 text-[0.95rem] text-ink-2">{ui.body}</p>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[0.95rem] text-ink-2 marker:text-almond">
          {ui.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 pb-4 text-[0.95rem]">
          <Link href={`/${lang}/kvkk`} target="_blank" className="font-semibold text-kilim underline underline-offset-[0.22em]">
            {ui.links.kvkk}
          </Link>
          <Link href={`/${lang}/gizlilik`} target="_blank" className="font-semibold text-kilim underline underline-offset-[0.22em]">
            {ui.links.privacy}
          </Link>
        </p>
      </div>
      <div className="flex shrink-0 flex-wrap gap-3 border-t border-line bg-cream px-5 py-4">
        <button
          type="button"
          onClick={() => {
            grant();
            onAccept?.();
          }}
          className={`${buttonBase} bg-kilim text-[var(--on-kilim)] hover:bg-kilim-deep`}
        >
          {ui.accept}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className={`${buttonBase} border border-ink-2 text-ink hover:bg-bone`}
        >
          {ui.cancel}
        </button>
      </div>
    </section>
  );
}
