import type { Locale } from "@/lib/i18n";

/**
 * Footer'daki halay şeridi metinleri. Her metin TR + EN.
 * Kıyafet unsurları: Kültür Portalı (Elazığ giyim-kuşam), harput.web.tr ve Elazığ Valiliği
 * Kültür-Folklor sayfalarındaki tariflerden sadeleştirilmiştir; belgesel bir çizim değildir.
 */
export const folkCopy: Record<
  Locale,
  { title: string; text: string; note: string; label: string }
> = {
  tr: {
    title: "Halaya buyurun.",
    text: "Halay, Anadolu'da el ele oynanan bir topluluk dansıdır.",
    note: "Figürler, Elazığ (Harput) yöresel giyiminden esinlenilerek sadeleştirildi.",
    label:
      "Elazığ yöresel kıyafetleriyle el ele halay çeken sekiz stilize figür: dört kadın, dört erkek.",
  },
  en: {
    title: "Join the halay.",
    text: "Halay is a communal dance performed hand in hand across Anatolia.",
    note: "The figures are simplified from traditional Elazığ (Harput) dress.",
    label:
      "Eight stylized figures in traditional Elazığ dress dancing the halay hand in hand: four women, four men.",
  },
};
