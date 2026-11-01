"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { usePathname } from "next/navigation";
import { BookA, MessageCircle, RotateCcw, SendHorizontal, X } from "lucide-react";
import { GlossaryBrowser } from "@/components/glossary/GlossaryBrowser";
import { glossaryUi } from "@/content/glossary-ui";
import { assistantContent } from "@/content/assistant";
import { defaultLocale, hasLocale, type Locale } from "@/lib/i18n";
import { KilimBand } from "@/components/ui/KilimBand";
import { AssistantConsent, useAiConsent } from "./AssistantConsent";
import "./assistant-widget.css";

/** Maskot (veya başka bir bileşen) paneli şu olaylarla açıp kapatabilir. */
export const ASSISTANT_OPEN_EVENT = "gk-assistant:open";
export const ASSISTANT_TOGGLE_EVENT = "gk-assistant:toggle";

const STORAGE_KEY = "gk-assistant-v3";
const MAX_INPUT = 1000;
const MAX_HISTORY = 20;

type Message = { id: string; role: "user" | "assistant"; content: string };
type ErrorKind = keyof (typeof assistantContent)["tr"]["errors"];
type Status = "idle" | "waiting" | "streaming";

export type AssistantWidgetProps = {
  /** Verilmezse URL'deki /tr | /en önekinden okunur. */
  lang?: Locale;
  /** Denetimli kullanım: maskot açık/kapalı durumunu yönetebilir. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** true ise yerleşik başlatıcı çizilmez (maskot kendi düğmesini kullanır). */
  hideLauncher?: boolean;
  className?: string;
};

const noopSubscribe = () => () => {};
let counter = 0;
const newId = () => `m${Date.now().toString(36)}${(counter++).toString(36)}`;

function loadMessages(): Message[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed: unknown = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) ?? "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (m): m is Message =>
          m &&
          (m.role === "user" || m.role === "assistant") &&
          typeof m.content === "string" &&
          m.content.trim().length > 0,
      )
      .slice(-MAX_HISTORY)
      .map((m) => ({ id: typeof m.id === "string" ? m.id : newId(), role: m.role, content: m.content }));
  } catch {
    return [];
  }
}

/** Model düz metin üretmeli; yine de sızan markdown vurgularını temizle. */
const plain = (text: string) => text.replace(/\*\*|__|^#{1,6}\s+/gm, "");

function errorKindFor(status: number, code?: string): ErrorKind {
  if (code === "not_configured") return "not_configured";
  if (status === 429) return "rate_limited";
  if (status === 504 || code === "timeout") return "timeout";
  if (status === 400 || status === 413) return "invalid";
  return "upstream";
}

export function AssistantWidget({
  lang,
  open,
  onOpenChange,
  hideLauncher = false,
  className = "",
}: AssistantWidgetProps) {
  const pathname = usePathname();
  const first = pathname?.split("/")[1] ?? "";
  const locale: Locale = lang ?? (hasLocale(first) ? first : defaultLocale);
  const t = assistantContent[locale];
  const { ready: consentReady, granted: consentGranted } = useAiConsent();

  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const [innerOpen, setInnerOpen] = useState(false);
  const isOpen = open ?? innerOpen;
  const [messages, setMessages] = useState<Message[]>(loadMessages);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<ErrorKind | null>(null);
  const [draft, setDraft] = useState("");
  const [glossaryOpen, setGlossaryOpen] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const wasOpen = useRef(false);

  const setOpen = useCallback(
    (next: boolean) => {
      onOpenChange?.(next);
      if (open === undefined) setInnerOpen(next);
    },
    [onOpenChange, open],
  );

  // Dışarıdan aç/kapat olayları (maskot için)
  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onToggle = () => setOpen(!isOpen);
    window.addEventListener(ASSISTANT_OPEN_EVENT, onOpen);
    window.addEventListener(ASSISTANT_TOGGLE_EVENT, onToggle);
    return () => {
      window.removeEventListener(ASSISTANT_OPEN_EVENT, onOpen);
      window.removeEventListener(ASSISTANT_TOGGLE_EVENT, onToggle);
    };
  }, [isOpen, setOpen]);

  // Geçmişi sessionStorage'a yaz (akış sürerken kısmi cevabı yazma)
  useEffect(() => {
    if (status !== "idle") return;
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_HISTORY)));
    } catch {
      /* depolama kapalıysa sessizce geç */
    }
  }, [messages, status]);

  // Açılınca girdiye odaklan, kapanınca başlatıcıya dön
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus({ preventScroll: true });
    } else if (wasOpen.current) {
      launcherRef.current?.focus({ preventScroll: true });
    }
    wasOpen.current = isOpen;
  }, [isOpen, mounted]);

  // Sona kaydır
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, status, error, isOpen]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const run = useCallback(
    async (history: Message[]) => {
      setError(null);
      setStatus("waiting");
      const controller = new AbortController();
      abortRef.current = controller;
      const assistantId = newId();
      let acc = "";

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            lang: locale,
            messages: history
              .slice(-MAX_HISTORY)
              .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_INPUT) })),
          }),
        });

        if (!res.ok || !res.body) {
          const body = (await res.json().catch(() => ({}))) as { error?: string };
          setError(errorKindFor(res.status, body.error));
          setStatus("idle");
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let streamError: ErrorKind | null = null;

        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const events = buffer.split("\n\n");
          buffer = events.pop() ?? "";
          for (const evt of events) {
            const data = evt.replace(/^data:\s?/, "").trim();
            if (!data || data === "[DONE]") continue;
            try {
              const payload = JSON.parse(data) as { delta?: string; error?: string };
              if (payload.error) {
                streamError = errorKindFor(0, payload.error);
              } else if (payload.delta) {
                const isFirst = acc === "";
                acc += payload.delta;
                const text = plain(acc);
                setStatus("streaming");
                setMessages((prev) =>
                  isFirst
                    ? [...prev, { id: assistantId, role: "assistant", content: text }]
                    : prev.map((m) => (m.id === assistantId ? { ...m, content: text } : m)),
                );
              }
            } catch {
              /* bozuk olayı atla */
            }
          }
        }
        if (streamError) setError(streamError);
        else if (acc === "") setError("upstream");
      } catch (err) {
        if ((err as { name?: string }).name !== "AbortError") setError("network");
      } finally {
        setStatus("idle");
      }
    },
    [locale],
  );

  const send = useCallback(
    (text: string) => {
      const content = text.trim().slice(0, MAX_INPUT);
      if (!content || status !== "idle" || !consentGranted) return;
      const next = [...messages, { id: newId(), role: "user" as const, content }];
      setMessages(next);
      setDraft("");
      if (inputRef.current) inputRef.current.style.height = "";
      void run(next);
    },
    [messages, run, status, consentGranted],
  );

  const clearChat = () => {
    abortRef.current?.abort();
    setMessages([]);
    setError(null);
    setStatus("idle");
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* yoksay */
    }
    inputRef.current?.focus();
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(draft);
  };

  const onInputKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      send(draft);
    }
  };

  // Esc kapatır; Tab panel içinde döner
  const onPanelKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      setOpen(false);
      return;
    }
    if (e.key !== "Tab") return;
    const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), textarea:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable || focusable.length === 0) return;
    const firstEl = focusable[0];
    const lastEl = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === firstEl) {
      e.preventDefault();
      lastEl.focus();
    } else if (!e.shiftKey && document.activeElement === lastEl) {
      e.preventDefault();
      firstEl.focus();
    }
  };

  const busy = status !== "idle";
  const lastIsUser = messages.length > 0 && messages[messages.length - 1].role === "user";
  const canRetry = error !== null && error !== "not_configured" && error !== "rate_limited" && lastIsUser && !busy;
  const nearLimit = draft.length > MAX_INPUT - 100;

  if (!mounted) return null;

  return (
    <div className={className} data-assistant-root>
      {isOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-labelledby="gk-assistant-title"
          onKeyDown={onPanelKeyDown}
          className={`gk-assistant-panel flex flex-col overflow-hidden rounded-[6px] border border-line bg-bone font-sans text-ink shadow-warm`}
        >
          <KilimBand height={8} />
          <header className="flex items-start justify-between gap-3 px-4 pb-3 pt-3">
            <div>
              <h2 id="gk-assistant-title" className="font-sans text-xl font-semibold leading-tight tracking-tight">
                {t.title}
              </h2>
              <p className="mt-0.5 text-xs text-ink-2">{t.disclaimer}</p>
            </div>
            <div className="-mr-2 flex items-center">
              <button
                type="button"
                onClick={() => setGlossaryOpen((v) => !v)}
                aria-pressed={glossaryOpen}
                className="mr-1 inline-flex h-11 items-center gap-1.5 rounded-[4px] px-2 text-sm font-medium text-ink-2 transition-colors hover:text-kilim aria-pressed:text-kilim sm:h-9"
              >
                {glossaryOpen ? (
                  <MessageCircle size={17} strokeWidth={1.75} aria-hidden="true" />
                ) : (
                  <BookA size={17} strokeWidth={1.75} aria-hidden="true" />
                )}
                {glossaryOpen ? glossaryUi[locale].back : glossaryUi[locale].tab}
              </button>
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={clearChat}
                  aria-label={t.clear}
                  title={t.clear}
                  className="grid h-11 w-11 place-items-center rounded-[4px] text-ink-2 transition-colors hover:text-kilim sm:h-9 sm:w-9"
                >
                  <RotateCcw size={18} strokeWidth={1.75} aria-hidden="true" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t.close}
                title={t.close}
                className="grid h-11 w-11 place-items-center rounded-[4px] text-ink-2 transition-colors hover:text-kilim sm:h-9 sm:w-9"
              >
                <X size={20} strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>
          </header>

          {glossaryOpen ? (
            <GlossaryBrowser lang={locale} compact />
          ) : consentGranted ? (
            <>
          <div
            ref={logRef}
            role="log"
            aria-live="polite"
            aria-relevant="additions text"
            aria-busy={status === "streaming"}
            className="flex-1 space-y-3 overflow-y-auto border-t border-line px-4 py-4 text-[0.95rem] leading-relaxed"
          >
            <p className="max-w-[88%] rounded-[4px] border border-line bg-cream px-3 py-2 text-ink">
              {t.greeting}
            </p>

            {messages.map((m) =>
              m.role === "user" ? (
                <p
                  key={m.id}
                  className="ml-auto w-fit max-w-[88%] whitespace-pre-wrap break-words rounded-[4px] bg-kilim px-3 py-2 text-[var(--on-kilim)]"
                >
                  <span className="sr-only">{t.you}: </span>
                  {m.content}
                </p>
              ) : (
                <p
                  key={m.id}
                  className="max-w-[88%] whitespace-pre-wrap break-words rounded-[4px] border border-line bg-cream px-3 py-2 text-ink"
                >
                  <span className="sr-only">{t.assistant}: </span>
                  {m.content}
                </p>
              ),
            )}

            {messages.length === 0 && (
              <ul className="flex flex-col items-start gap-2 pt-1">
                {t.starters.map((q) => (
                  <li key={q} className="max-w-full">
                    <button
                      type="button"
                      onClick={() => send(q)}
                      className="min-h-11 rounded-[4px] border border-line bg-bone px-3 py-2 text-left text-sm text-ink transition-colors hover:border-kilim hover:text-kilim sm:min-h-0"
                    >
                      {q}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {status === "waiting" && (
              <div className="max-w-[88%]">
                <p className="text-sm italic text-ink-2">{t.typing}</p>
                <div className={`gk-assistant-bar mt-2 w-28`} aria-hidden="true" />
              </div>
            )}

            {error && (
              <div
                role="alert"
                className="max-w-[92%] rounded-[4px] border border-kilim bg-bone px-3 py-2 text-sm text-ink"
              >
                <p>{t.errors[error]}</p>
                {canRetry && (
                  <button
                    type="button"
                    onClick={() => void run(messages)}
                    className="mt-2 min-h-11 text-sm font-medium text-kilim underline underline-offset-4 sm:min-h-0"
                  >
                    {t.retry}
                  </button>
                )}
              </div>
            )}
          </div>

          <form onSubmit={onSubmit} className="border-t border-line bg-cream px-3 py-3">
            <div className="flex items-end gap-2">
              <label htmlFor="gk-assistant-input" className="sr-only">
                {t.inputLabel}
              </label>
              <textarea
                id="gk-assistant-input"
                ref={inputRef}
                rows={1}
                value={draft}
                maxLength={MAX_INPUT}
                placeholder={t.placeholder}
                onChange={(e) => {
                  setDraft(e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = `${Math.min(e.target.scrollHeight, 112)}px`;
                }}
                onKeyDown={onInputKeyDown}
                className="max-h-28 min-h-11 flex-1 resize-none rounded-[4px] border border-line bg-bone px-3 py-2.5 text-base leading-snug text-ink placeholder:text-ink-2 caret-kilim sm:text-[0.95rem]"
              />
              <button
                type="submit"
                disabled={busy || draft.trim().length === 0}
                aria-label={t.send}
                title={t.send}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-[4px] bg-kilim text-[var(--on-kilim)] transition-colors hover:bg-kilim-deep disabled:cursor-not-allowed disabled:opacity-45"
              >
                <SendHorizontal size={19} strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>
            {nearLimit && (
              <p className="mt-1 text-right text-xs tabular-nums text-ink-2">
                {draft.length}/{MAX_INPUT}
              </p>
            )}
          </form>
            </>
          ) : consentReady ? (
            <AssistantConsent
              lang={locale}
              onAccept={() => inputRef.current?.focus()}
              onCancel={() => setOpen(false)}
              className="min-h-0 border-t border-line"
            />
          ) : null}
        </div>
      )}

      {!hideLauncher && (
        <button
          ref={launcherRef}
          type="button"
          onClick={() => setOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          className={`gk-assistant-launcher ${isOpen ? "gk-assistant-launcher-hidden" : ""} inline-flex items-center gap-2 rounded-[6px] bg-kilim px-4 text-base font-medium text-[var(--on-kilim)] shadow-warm transition-colors hover:bg-kilim-deep`}
        >
          <MessageCircle size={20} strokeWidth={1.75} aria-hidden="true" />
          {t.launcher}
        </button>
      )}
    </div>
  );
}
