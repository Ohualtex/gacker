/**
 * Hukuki belge veri modeli. Metinlerde şu işaretler kullanılabilir:
 *   {{cfg:anahtar}}        -> src/content/legal-config.ts değeri (yer tutucuysa sarı işaretli)
 *   {{page:slug}}          -> ilgili hukuki sayfaya bağlantı (sayfa başlığıyla)
 *   [metin](https://...)   -> dış bağlantı (yeni sekmede açılır)
 */
export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "note"; text: string }
  | { type: "table"; caption: string; head: string[]; rows: string[][] };

export type LegalSection = {
  id: string;
  title: string;
  blocks: LegalBlock[];
};

export type LegalDoc = {
  title: string;
  /** Sayfa başlığı altındaki kısa açıklama (meta description olarak da kullanılır). */
  lead: string;
  sections: LegalSection[];
};

export type Bilingual<T> = { tr: T; en: T };
