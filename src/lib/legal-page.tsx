import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, locales } from "@/lib/i18n";
import { getLegalDoc, type LegalSlug } from "@/content/legal";
import { LegalPage } from "@/components/legal/LegalPage";

/** Hukuki sayfalar için ortak metadata (canonical + hreflang dahil). */
export async function legalMetadata(slug: LegalSlug, params: Promise<{ lang: string }>): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const doc = getLegalDoc(slug, lang);
  return {
    title: doc.title,
    description: doc.lead,
    alternates: {
      canonical: `/${lang}/${slug}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}/${slug}`])),
    },
  };
}

export async function renderLegalPage(slug: LegalSlug, params: Promise<{ lang: string }>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <LegalPage doc={getLegalDoc(slug, lang)} lang={lang} />;
}
