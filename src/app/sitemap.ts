import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { legalSlugs } from "@/content/legal";
import { legalConfig } from "@/content/legal-config";
import { getProducers } from "@/lib/cms/queries";
import { getSiteUrl } from "@/lib/site-url";

/** Ana sayfa + alt sayfalar + hukuki sayfalar + üretici detayları; her biri için tüm diller. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const now = new Date();
  const producers = await getProducers();

  const paths: { path: string; priority: number; lastModified?: Date }[] = [
    { path: "", priority: 1 },
    ...["hikaye", "ureticiler", "kesfet", "galeri", "hangi-badem-sekeri", "iletisim"].map((p) => ({ path: `/${p}`, priority: 0.8 })),
    ...producers.map((p) => ({ path: `/ureticiler/${p.slug}`, priority: 0.7 })),
    ...legalSlugs.map((slug) => ({
      path: `/${slug}`,
      priority: 0.3,
      lastModified: new Date(legalConfig.lastUpdated),
    })),
  ];

  return paths.flatMap(({ path, priority, lastModified }) =>
    locales.map((lang) => ({
      url: `${base}/${lang}${path}`,
      lastModified: lastModified ?? now,
      priority,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${base}/${l}${path}`])),
      },
    })),
  );
}
