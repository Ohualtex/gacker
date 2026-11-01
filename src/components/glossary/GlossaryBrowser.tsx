"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { motion } from "motion/react";
import { ExternalLink, Search, X } from "lucide-react";
import { glossary, type GlossaryEntry } from "@/data/glossary";
import { glossaryUi } from "@/content/glossary-ui";
import type { Locale } from "@/lib/i18n";
import "./glossary.css";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** Türkçe karakter ve vurgu duyarsız karşılaştırma anahtarı: "Ağın" → "agin", "I" → "i". */
export function foldTr(value: string): string {
  return value
    .toLocaleLowerCase("tr")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const collator = new Intl.Collator("tr");

type Indexed = { entry: GlossaryEntry; letter: string; haystack: string };

const index: Indexed[] = [...glossary]
  .sort((a, b) => collator.compare(a.term, b.term))
  .map((entry) => {
    return {
      entry,
      // Harf süzgeci Türkçe alfabeyi korur: I ile İ, C ile Ç ayrı harflerdir
      letter: (entry.term.match(/\p{L}/u)?.[0] ?? "#").toLocaleUpperCase("tr"),
      haystack: foldTr(
        [entry.term, entry.meaning.tr, entry.meaning.en, entry.example?.tr, entry.example?.en].filter(Boolean).join(" "),
      ),
    };
  });

const letters = Array.from(new Set(index.map((i) => i.letter))).sort(collator.compare);

const host = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

export type GlossaryBrowserProps = {
  lang: Locale;
  /** Asistan paneli gibi dar alanlar için tek sütun, küçük kart. */
  compact?: boolean;
  className?: string;
};

export function GlossaryBrowser({ lang, compact = false, className = "" }: GlossaryBrowserProps) {
  const t = glossaryUi[lang];
  const pageSize = compact ? 8 : 12;
  const [query, setQuery] = useState("");
  const [letter, setLetter] = useState<string | null>(null);
  const [limit, setLimit] = useState(pageSize);
  const deferredQuery = useDeferredValue(query);

  const results = useMemo(() => {
    const q = foldTr(deferredQuery);
    return index.filter((i) => (!letter || i.letter === letter) && (!q || i.haystack.includes(q)));
  }, [deferredQuery, letter]);

  const visible = results.slice(0, limit);
  const remaining = results.length - visible.length;
  const inputId = compact ? "gk-glossary-q-compact" : "gk-glossary-q";

  const chip = (label: string, value: string | null) => {
    const on = letter === value;
    return (
      <li key={label}>
        <button
          type="button"
          aria-pressed={on}
          onClick={() => {
            setLetter(value);
            setLimit(pageSize);
          }}
          className={`gk-glossary-chip ${on ? "gk-glossary-chip-on" : ""}`}
        >
          {label}
        </button>
      </li>
    );
  };

  return (
    <div className={`gk-glossary ${compact ? "gk-glossary-compact" : ""} ${className}`}>
      <div className="gk-glossary-controls">
        <div className="gk-glossary-search">
          <label htmlFor={inputId} className="sr-only">
            {t.searchLabel}
          </label>
          <Search size={18} strokeWidth={1.75} aria-hidden="true" className="gk-glossary-search-icon" />
          <input
            id={inputId}
            type="search"
            value={query}
            placeholder={t.searchPlaceholder}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            enterKeyHint="search"
            onChange={(e) => {
              setQuery(e.target.value);
              setLimit(pageSize);
            }}
            className="gk-glossary-input"
          />
          {query && (
            <button
              type="button"
              aria-label={t.clear}
              title={t.clear}
              onClick={() => {
                setQuery("");
                setLimit(pageSize);
              }}
              className="gk-glossary-clear"
            >
              <X size={16} strokeWidth={1.75} aria-hidden="true" />
            </button>
          )}
        </div>

        <nav aria-label={t.letters}>
          <ul className="gk-glossary-letters">
            {chip(t.all, null)}
            {letters.map((l) => chip(l, l))}
          </ul>
        </nav>

        <p className="gk-glossary-count" role="status" aria-live="polite">
          {results.length} {t.words}
        </p>
      </div>

      <div className="gk-glossary-scroll">
        {results.length === 0 ? (
          <p className="gk-glossary-empty">{t.empty}</p>
        ) : (
          <ul className="gk-glossary-grid">
            {visible.map(({ entry }, i) => {
              const example =
                lang === "en" ? (entry.example?.en ?? entry.example?.tr) : entry.example?.tr;
              const exampleIsTurkishOnly = lang === "en" && entry.example && !entry.example.en;
              return (
                <motion.li
                  key={entry.id}
                  className="gk-glossary-card"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: Math.min(i % pageSize, 8) * 0.035, ease: EASE_OUT_EXPO }}
                >
                  <h3 className="gk-glossary-term">{entry.term}</h3>
                  <p className="gk-glossary-meaning">{entry.meaning[lang]}</p>
                  {example && (
                    <p className="gk-glossary-example">
                      <span className="gk-glossary-example-label">
                        {t.example}
                        {exampleIsTurkishOnly ? ` (${t.exampleEnNote})` : ""}
                      </span>
                      <q lang={exampleIsTurkishOnly || lang === "tr" ? "tr" : "en"}>{example}</q>
                    </p>
                  )}
                  <a
                    href={entry.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gk-glossary-source"
                  >
                    {t.source}: {entry.source.length > 48 ? host(entry.sourceUrl) : entry.source}
                    <ExternalLink size={12} strokeWidth={1.75} aria-hidden="true" />
                  </a>
                </motion.li>
              );
            })}
          </ul>
        )}

        {remaining > 0 && (
          <div className="gk-glossary-more">
            <button type="button" onClick={() => setLimit((n) => n + pageSize)} className="gk-glossary-more-btn">
              {t.showMore} ({remaining})
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
