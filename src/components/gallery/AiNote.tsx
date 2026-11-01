import Link from "next/link";
import { ArrowUpRight, Info } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { aiPageHref, galleryCopy } from "@/content/gallery";

/** Yapay zekâ görsellerinin dürüst bildirimi. Hukuki gereklilik: her galeri yüzeyinde görünür kalır. */
export function AiNote({ lang, className = "" }: { lang: Locale; className?: string }) {
  const c = galleryCopy[lang];
  return (
    <aside
      aria-label={c.aiNote}
      className={`flex items-start gap-3 border-t border-line pt-5 text-[0.95rem] leading-relaxed text-ink-2 ${className}`}
    >
      <Info className="mt-[0.2em] h-[1.1em] w-[1.1em] shrink-0 text-kilim" strokeWidth={1.75} aria-hidden="true" />
      <p>
        <strong className="font-semibold text-ink">{c.aiNote}</strong> {c.aiNoteDetail}{" "}
        <Link href={aiPageHref(lang)} className="link-underline inline-flex items-center gap-0.5 font-medium text-kilim">
          {c.aiLink}
          <ArrowUpRight className="h-[1em] w-[1em]" strokeWidth={1.75} aria-hidden="true" />
        </Link>
      </p>
    </aside>
  );
}
