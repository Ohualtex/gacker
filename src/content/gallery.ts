import manifest from "../../public/gallery/manifest.json";
import type { Locale } from "@/lib/i18n";

/**
 * Galeri veri modeli.
 * Kaynak: public/gallery/manifest.json. Gerçek fotoğraf/video karesi eklemek için manifest'e
 * { ..., "ai": false, "credit": "Ad Soyad" } kaydı eklemek ve dosyayı public/gallery/ altına koymak yeter.
 */
export type GalleryCategory = "nature" | "craft" | "table";

type ManifestEntry = {
  file: string;
  w: number;
  h: number;
  category: string;
  alt_tr: string;
  alt_en: string;
  caption_tr: string;
  caption_en: string;
  ai: boolean;
  /** Gerçek fotoğraflar için isteğe bağlı fotoğrafçı/üretici adı. */
  credit?: string;
};

export type GalleryItem = {
  id: string;
  src: string;
  w: number;
  h: number;
  category: GalleryCategory;
  alt: { tr: string; en: string };
  caption: { tr: string; en: string };
  /** true: yapay zekâ ile üretilmiş illüstrasyon. false: gerçek fotoğraf/video karesi. */
  ai: boolean;
  credit?: string;
};

const CATEGORIES: readonly GalleryCategory[] = ["nature", "craft", "table"];
const asCategory = (v: string): GalleryCategory =>
  (CATEGORIES as readonly string[]).includes(v) ? (v as GalleryCategory) : "nature";

export const galleryItems: GalleryItem[] = (manifest as ManifestEntry[]).map((m) => ({
  id: m.file.replace(/\.[a-z0-9]+$/i, ""),
  src: `/gallery/${m.file}`,
  w: m.w,
  h: m.h,
  category: asCategory(m.category),
  alt: { tr: m.alt_tr, en: m.alt_en },
  caption: { tr: m.caption_tr, en: m.caption_en },
  ai: m.ai !== false,
  credit: m.credit,
}));

/** Duvardaki çerçeve karakteri: dar çerçeveler sütunda sola/sağa yaslanır, geniş olan tam genişlik alır. */
export type FrameSize = "full" | "narrow";
export const frameLayout: Record<string, { size: FrameSize; mat: boolean }> = {
  "almond-blossom-branch": { size: "full", mat: false },
  "copper-kazan-steam": { size: "narrow", mat: true },
  "tea-table-candy-tray": { size: "full", mat: true },
  "hands-pouring-candies": { size: "narrow", mat: false },
  "almond-orchard-hillside": { size: "full", mat: false },
  "pastel-almonds-copper-tray": { size: "narrow", mat: true },
  "stone-workshop-interior": { size: "full", mat: false },
  "ripe-almonds-basket": { size: "full", mat: true },
  "tea-glass-almonds-closeup": { size: "narrow", mat: false },
  "kilim-textile-detail": { size: "narrow", mat: true },
  "green-almonds-on-branch": { size: "narrow", mat: false },
  "candy-gift-box-linen": { size: "full", mat: false },
};

export const galleryHref = (lang: Locale) => `/${lang}/galeri`;
export const aiPageHref = (lang: Locale) => `/${lang}/yapay-zeka-ve-icerik`;

export const galleryCopy = {
  tr: {
    curator:
      "Harput sofrasının havasını anlatan kareler: çiçek açan dal, bakır kazan, kilim, bir bardak çay. Gerçek üreticilerden fotoğraflar geldikçe bu duvara asılacak.",
    filterLabel: "Duvarı süz",
    filters: { all: "Tümü", nature: "Doğa", craft: "Zanaat", table: "Sofra" },
    count: (n: number) => `${n} görsel`,
    aiNote: "Görseller yapay zekâ ile üretilmiş illüstratif görsellerdir.",
    aiNoteDetail: "Gerçek ürün, kişi ya da yer fotoğrafı değildir.",
    aiLink: "Yapay zekâ ve içerik",
    aiBadge: "Yapay zekâ",
    realBadge: "Fotoğraf",
    slotTitle: "Bu duvar gerçek fotoğraflara açık",
    slotText: "Üreticilerden gelen fotoğraf ve video kareleri buraya asılacak.",
    open: "Büyüt",
    close: "Kapat",
    prev: "Önceki görsel",
    next: "Sonraki görsel",
    viewer: "Görsel görüntüleyici",
    of: "/",
    aiLightbox: "Yapay zekâ ile üretilmiş illüstrasyon",
    teaserTitle: "Sofradan kareler",
    teaserLead: "Çiçekten kazana, kazandan tepsiye. Yapay zekâ ile üretilmiş illüstrasyonlar.",
    teaserCta: "Galeriyi gez",
    wallLabel: "Galeri görselleri",
  },
  en: {
    curator:
      "Scenes from a Harput table: a blossoming branch, a copper pan, a kilim, a glass of tea. Photographs from real producers will be hung on this wall as they arrive.",
    filterLabel: "Filter the wall",
    filters: { all: "All", nature: "Nature", craft: "Craft", table: "Table" },
    count: (n: number) => `${n} ${n === 1 ? "image" : "images"}`,
    aiNote: "Images are AI-generated illustrations.",
    aiNoteDetail: "They are not photographs of real products, people or places.",
    aiLink: "AI and content",
    aiBadge: "AI-generated",
    realBadge: "Photograph",
    slotTitle: "This wall is open to real photographs",
    slotText: "Photographs and video stills from producers will be hung here.",
    open: "Enlarge",
    close: "Close",
    prev: "Previous image",
    next: "Next image",
    viewer: "Image viewer",
    of: "/",
    aiLightbox: "AI-generated illustration",
    teaserTitle: "Scenes from the table",
    teaserLead: "From blossom to copper pan to tray. AI-generated illustrations.",
    teaserCta: "Walk the gallery",
    wallLabel: "Gallery images",
  },
} as const;

export type GalleryCopy = (typeof galleryCopy)[Locale];
