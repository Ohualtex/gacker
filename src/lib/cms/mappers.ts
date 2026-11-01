import type { Producer, ProducerLink, ProducerSocials } from "@/data/producers";
import type { GalleryItem, GalleryCategory } from "@/content/gallery";
import type { Chapter as StoryChapter } from "@/content/story";
import type { IdentifyItem } from "@/data/identify";
import type { QuizQuestion } from "@/content/quiz";
import type {
  Producer as DbProducer,
  GalleryItem as DbGallery,
  StoryChapter as DbStory,
  IdentifyItem as DbIdentify,
  QuizQuestion as DbQuiz,
  Place as DbPlace,
} from "@/generated/prisma";

function asLocalizedList(value: unknown): { tr: string; en: string }[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (typeof item === "string") return { tr: item, en: item };
      if (item && typeof item === "object" && "tr" in item) {
        const row = item as { tr?: unknown; en?: unknown };
        return { tr: String(row.tr ?? ""), en: String(row.en ?? row.tr ?? "") };
      }
      return null;
    })
    .filter((item): item is { tr: string; en: string } => Boolean(item));
}

function asSocials(value: unknown): ProducerSocials | undefined {
  if (!value || typeof value !== "object") return undefined;
  return value as ProducerSocials;
}

function asLinks(value: unknown): ProducerLink[] | undefined {
  if (!Array.isArray(value) || value.length === 0) return undefined;
  return value as ProducerLink[];
}

export function toProducer(row: DbProducer): Producer {
  return {
    slug: row.slug,
    name: row.name,
    demo: row.demo || undefined,
    role: row.roleTr || row.roleEn ? { tr: row.roleTr, en: row.roleEn } : undefined,
    tagline: { tr: row.taglineTr, en: row.taglineEn },
    story: { tr: row.storyTr, en: row.storyEn },
    city: row.city,
    address: row.address ?? undefined,
    branches: asLocalizedList(row.branches),
    website: row.website ?? undefined,
    instagram: row.instagram ?? undefined,
    phone: row.phone ?? undefined,
    image: row.image ?? undefined,
    socials: asSocials(row.socials),
    extraLinks: asLinks(row.extraLinks),
    mapUrl: row.mapUrl ?? undefined,
    products: asLocalizedList(row.products),
    hours: row.hoursTr || row.hoursEn ? { tr: row.hoursTr, en: row.hoursEn } : undefined,
  };
}

const CATEGORIES = ["nature", "craft", "table"] as const;

export function toGalleryItem(row: DbGallery): GalleryItem {
  const category = CATEGORIES.includes(row.category as GalleryCategory)
    ? (row.category as GalleryCategory)
    : "nature";
  return {
    id: row.slug,
    src: row.src,
    w: row.w,
    h: row.h,
    category,
    alt: { tr: row.altTr, en: row.altEn },
    caption: { tr: row.captionTr, en: row.captionEn },
    ai: row.ai,
    credit: row.credit ?? undefined,
  };
}

export function toStoryChapter(row: DbStory): StoryChapter {
  return {
    id: row.slug,
    motif: (row.motif as StoryChapter["motif"]) ?? "almond",
    title: row.titleTr,
    body: row.bodyTr,
    slotLabel: row.slotTr,
    image: row.image ?? undefined,
  };
}

export function toIdentifyItem(row: DbIdentify): IdentifyItem {
  return {
    id: row.slug,
    title: { tr: row.titleTr, en: row.titleEn },
    body: { tr: row.bodyTr, en: row.bodyEn },
  };
}

export function toQuizQuestion(row: DbQuiz): QuizQuestion {
  return {
    prompt: { tr: row.promptTr, en: row.promptEn },
    options: (Array.isArray(row.options) ? row.options : []) as QuizQuestion["options"],
  };
}

export function toPlace(row: DbPlace) {
  return {
    id: row.slug,
    name_tr: row.nameTr,
    name_en: row.nameEn,
    bodyTr: row.bodyTr,
    bodyEn: row.bodyEn,
    lat: row.lat,
    lon: row.lng,
    svg: [row.svgX ?? 0, row.svgY ?? 0] as [number, number],
    source: row.source ?? "",
    image: row.image ?? undefined,
    published: row.published,
  };
}
