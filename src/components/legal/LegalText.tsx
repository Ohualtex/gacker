import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { isPlaceholder, legalConfig, type Localized } from "@/content/legal-config";
import { getLegalDoc, legalSlugs, type LegalSlug } from "@/content/legal";

const TOKEN = /(\{\{(?:cfg|page):[^}]+\}\}|\[[^\]]+\]\([^)]+\))/g;

function isLocalized(value: unknown): value is Localized {
  return typeof value === "object" && value !== null && "tr" in value && "en" in value;
}

/** Yer tutucu doldurulmamışsa sarı işaretle, doluysa düz metin olarak gösterir. */
export function ConfigValue({ name, lang }: { name: string; lang: Locale }) {
  const raw = (legalConfig as Record<string, unknown>)[name];
  if (!isLocalized(raw)) return <>{`{{cfg:${name}}}`}</>;
  const value = raw[lang];
  if (isPlaceholder(value)) {
    return <mark className="rounded-[2px] bg-saffron/30 px-1 text-ink">{value}</mark>;
  }
  return <>{value}</>;
}

const linkClass = "text-kilim underline decoration-1 underline-offset-[0.22em] hover:text-kilim-deep";

/** {{cfg:..}}, {{page:..}} ve [metin](url) işaretlerini çözer. */
export function LegalText({ text, lang }: { text: string; lang: Locale }): ReactNode {
  return text.split(TOKEN).map((part, i) => {
    if (part.startsWith("{{cfg:")) {
      return <ConfigValue key={i} name={part.slice(6, -2)} lang={lang} />;
    }
    if (part.startsWith("{{page:")) {
      const slug = part.slice(7, -2) as LegalSlug;
      if (!legalSlugs.includes(slug)) return <Fragment key={i}>{part}</Fragment>;
      return (
        <Link key={i} href={`/${lang}/${slug}`} className={linkClass}>
          {getLegalDoc(slug, lang).title}
        </Link>
      );
    }
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (link) {
      return (
        <a key={i} href={link[2]} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {link[1]}
        </a>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}
