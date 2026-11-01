"use client";

import { useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ExternalLink, Info, TriangleAlert } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { CandyFact, CandyFactCategory } from "@/data/candy-info";
import type { CandyInfoContent } from "@/content/candy-info";
import "./candy-info.css";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const CATEGORY_ORDER: CandyFactCategory[] = ["what", "making", "culture", "health"];

/**
 * Başlık bir sayıyla + birimle başlıyorsa ("21 g protein") sayıyı büyük yazarız.
 * Yalnızca başlığın başındaki, zaten yazılı değeri öne çıkarır; hiçbir sayı türetmez veya değiştirmez.
 */
const STAT_RE =
  /^\s*((?:~|≈)?\s*\d+(?:[.,]\d+)?)\s?(mg|µg|mcg|kcal|kj|g|%|ml|°c|dk|dakika|saat|yıl|min|minutes?|hours?|years?)(?![\p{L}])\s*(.*)$/iu;

function splitStat(title: string) {
  const m = STAT_RE.exec(title);
  if (!m) return null;
  return { value: m[1].replace(/\s+/g, ""), unit: m[2], label: m[3].trim() };
}

export function CandyInfo({
  lang,
  facts,
  content,
}: {
  lang: Locale;
  facts: CandyFact[];
  content: CandyInfoContent;
}) {
  const uid = useId();
  const reduce = useReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const groups = useMemo(
    () =>
      CATEGORY_ORDER.map((cat) => ({ cat, items: facts.filter((f) => f.category === cat) })).filter(
        (g) => g.items.length > 0,
      ),
    [facts],
  );

  const [selected, setSelected] = useState<CandyFactCategory>("what");
  const active = groups.find((g) => g.cat === selected) ?? groups[0];

  if (!active) return null;

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (index + 1) % groups.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (index - 1 + groups.length) % groups.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = groups.length - 1;
    else return;
    e.preventDefault();
    setSelected(groups[next].cat);
    tabRefs.current[next]?.focus();
  };

  const isHealth = active.cat === "health";
  const panelId = `${uid}-panel`;

  return (
    <section aria-labelledby={`${uid}-title`} className="gk-info">
      <div className="container-x gk-info-inner">
        <motion.header
          className="gk-info-head"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -8% 0px" }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
        >
          <h2 id={`${uid}-title`} className="gk-info-title">
            {content.title}
          </h2>
          <p className="gk-info-lead">{content.lead}</p>
        </motion.header>

        <div role="tablist" aria-label={content.tabsLabel} className="gk-info-tabs">
          {groups.map((g, i) => {
            const isActive = g.cat === active.cat;
            return (
              <button
                key={g.cat}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${uid}-tab-${g.cat}`}
                aria-selected={isActive}
                aria-controls={panelId}
                tabIndex={isActive ? 0 : -1}
                className="gk-info-tab"
                data-active={isActive}
                onClick={() => setSelected(g.cat)}
                onKeyDown={(e) => onKeyDown(e, i)}
              >
                <span>{content.tabs[g.cat]}</span>
                <span className="gk-info-tab-count" aria-hidden="true">
                  {g.items.length}
                </span>
                {isActive && (
                  <motion.span
                    layoutId={`${uid}-ink`}
                    className="gk-info-tab-ink"
                    transition={reduce ? { duration: 0 } : { duration: 0.5, ease: EASE_OUT_EXPO }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div role="tabpanel" id={panelId} aria-labelledby={`${uid}-tab-${active.cat}`} tabIndex={0} className="gk-info-panel">
          {isHealth && (
            <p role="note" className="gk-info-note">
              <Info aria-hidden="true" className="gk-info-note-icon" />
              <span>{content.healthNote}</span>
            </p>
          )}

          <ul key={active.cat} className="gk-info-grid">
            {active.items.map((f, i) => {
              const title = f.title[lang];
              const stat = splitStat(title);
              return (
                <motion.li
                  key={f.id}
                  className="gk-info-card"
                  data-stat={stat ? "true" : undefined}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -6% 0px" }}
                  transition={{ duration: 0.7, delay: reduce ? 0 : (i % 3) * 0.07, ease: EASE_OUT_EXPO }}
                >
                  {stat ? (
                    <>
                      <p className="gk-info-stat" aria-label={`${stat.value} ${stat.unit}`}>
                        <span className="gk-info-stat-value" aria-hidden="true">
                          {stat.value}
                        </span>
                        <span className="gk-info-stat-unit" aria-hidden="true">
                          {stat.unit}
                        </span>
                      </p>
                      {stat.label && <h3 className="gk-info-card-title gk-info-card-title--stat">{stat.label}</h3>}
                    </>
                  ) : (
                    <h3 className="gk-info-card-title">{title}</h3>
                  )}
                  <p className="gk-info-card-body">{f.body[lang]}</p>
                  {isHealth && (
                    <p className="gk-info-allergy">
                      <TriangleAlert aria-hidden="true" className="gk-info-allergy-icon" />
                      <span>{content.allergyBadge}</span>
                    </p>
                  )}
                  <a
                    href={f.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gk-info-source"
                    aria-label={`${content.sourceLabel}: ${f.source} (${content.sourceOpen})`}
                  >
                    <span className="gk-info-source-label">{content.sourceLabel}</span>
                    <span className="gk-info-source-name">{f.source}</span>
                    <ExternalLink aria-hidden="true" className="gk-info-source-icon" />
                  </a>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
