import { TriangleAlert } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { legalConfig } from "@/content/legal-config";
import { legalUi, type LegalDoc } from "@/content/legal";
import type { LegalBlock } from "@/content/legal/types";
import { PageHeader } from "@/components/ui/PageHeader";
import { KilimBand } from "@/components/ui/KilimBand";
import { LegalText } from "./LegalText";
import { PrintButton } from "./PrintButton";

/** Yazdırırken menü, altbilgi ve bildirimleri gizler; koyu temada bile açık zemin kullanır. */
const PRINT_CSS = `@media print{
:root{--bone:#fff;--cream:#fff;--ink:#000;--ink-2:#222;--line:#999;--kilim:#000;--kilim-deep:#000}
body>header,body>footer,footer,[data-legal-hide-print]{display:none!important}
main>header{padding-top:0!important}
main>header svg{display:none}
body{background:#fff;font-size:11pt}
a{text-decoration:underline}
h2{break-after:avoid}
table,li,dl>div{break-inside:avoid}
}`;

function formatDate(iso: string, lang: Locale) {
  return new Intl.DateTimeFormat(lang === "tr" ? "tr-TR" : "en-GB", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(iso));
}

function Table({ block, lang }: { block: Extract<LegalBlock, { type: "table" }>; lang: Locale }) {
  const { head, rows, caption } = block;
  return (
    <div className="mt-5">
      {/* Geniş ekran: gerçek tablo */}
      <table className="hidden w-full border-collapse text-left text-[0.95rem] leading-snug md:table">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-ink-2/60">
            {head.map((h) => (
              <th key={h} scope="col" className="py-2 pr-4 align-bottom font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} className="border-b border-line align-top">
              {row.map((cell, c) =>
                c === 0 ? (
                  <th key={c} scope="row" className="py-3 pr-4 text-left font-semibold">
                    <LegalText text={cell} lang={lang} />
                  </th>
                ) : (
                  <td key={c} className="py-3 pr-4 text-ink-2">
                    <LegalText text={cell} lang={lang} />
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Dar ekran: satır başına tanım listesi */}
      <div role="group" aria-label={caption} className="divide-y divide-line border-y border-line md:hidden">
        {rows.map((row, r) => (
          <dl key={r} className="space-y-1.5 py-4 text-[0.95rem] leading-snug">
            {row.map((cell, c) => (
              <div key={c} className={c === 0 ? "" : "text-ink-2"}>
                {c === 0 ? (
                  <dt className="sr-only">{head[0]}</dt>
                ) : (
                  <dt className="text-sm font-semibold text-ink">{head[c]}</dt>
                )}
                <dd className={c === 0 ? "font-semibold text-ink" : ""}>
                  <LegalText text={cell} lang={lang} />
                </dd>
              </div>
            ))}
          </dl>
        ))}
      </div>
    </div>
  );
}

function Block({ block, lang }: { block: LegalBlock; lang: Locale }) {
  switch (block.type) {
    case "p":
      return (
        <p className="mt-4">
          <LegalText text={block.text} lang={lang} />
        </p>
      );
    case "h3":
      return (
        <h3 className="mt-8 text-xl">
          <LegalText text={block.text} lang={lang} />
        </h3>
      );
    case "ul":
      return (
        <ul className="mt-4 list-disc space-y-2.5 pl-5 marker:text-almond">
          {block.items.map((item) => (
            <li key={item} className="pl-1">
              <LegalText text={item} lang={lang} />
            </li>
          ))}
        </ul>
      );
    case "note":
      return (
        <p className="mt-5 rounded-[3px] border border-line bg-cream p-4 text-ink-2">
          <LegalText text={block.text} lang={lang} />
        </p>
      );
    case "table":
      return <Table block={block} lang={lang} />;
  }
}

export function LegalPage({ doc, lang }: { doc: LegalDoc; lang: Locale }) {
  const ui = legalUi[lang];
  return (
    <>
      <style>{PRINT_CSS}</style>
      <PageHeader title={doc.title} lead={doc.lead} />

      <div className="container-x grid gap-10 py-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16 lg:py-16">
        {/* İçindekiler: mobilde açılır, masaüstünde yapışkan */}
        <div data-legal-hide-print className="lg:order-first">
          <details className="rounded-[3px] border border-line bg-cream px-4 py-3 lg:hidden">
            <summary className="cursor-pointer font-semibold">{ui.contents}</summary>
            <ol className="mt-3 space-y-2 text-[0.95rem]">
              {doc.sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-ink-2 hover:text-ink hover:underline">
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </details>
          <nav aria-label={ui.contents} className="sticky top-28 hidden lg:block">
            <p className="font-display text-xl">{ui.contents}</p>
            <ol className="mt-4 space-y-2.5 border-l border-line pl-4 text-[0.95rem] leading-snug">
              {doc.sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-ink-2 hover:text-ink hover:underline">
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <article className="max-w-[68ch] text-ink">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-ink-2">
              {ui.lastUpdated}:{" "}
              <time dateTime={legalConfig.lastUpdated}>{formatDate(legalConfig.lastUpdated, lang)}</time>
            </p>
            <PrintButton label={ui.print} />
          </div>

          {!legalConfig.reviewed && (
            <div
              role="note"
              className="mt-5 flex gap-3 rounded-[3px] border border-saffron bg-cream p-4 text-[0.95rem]"
            >
              <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-almond" strokeWidth={1.75} aria-hidden="true" />
              <div>
                <p className="font-semibold">{ui.draftTitle}</p>
                <p className="mt-1 text-ink-2">{ui.draftBody}</p>
                <p className="mt-1 text-ink-2">{ui.placeholderNote}</p>
              </div>
            </div>
          )}

          {doc.sections.map((section) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-h`} className="scroll-mt-28">
              <h2 id={`${section.id}-h`} className="mt-12 text-[clamp(1.5rem,2.4vw,1.875rem)]">
                {section.title}
              </h2>
              {section.blocks.map((block, i) => (
                <Block key={i} block={block} lang={lang} />
              ))}
            </section>
          ))}
        </article>
      </div>
      <KilimBand height={16} />
    </>
  );
}
