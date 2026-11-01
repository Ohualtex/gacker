import { cache } from "react";
import { prisma } from "@/lib/db";
import { producers as staticProducers, type Producer } from "@/data/producers";
import { galleryItems as staticGallery, type GalleryItem } from "@/content/gallery";
import { story as staticStory, type StoryContent } from "@/content/story";
import { identifyItems as staticIdentify, identifyCopy, type IdentifyItem } from "@/data/identify";
import { quizQuestions as staticQuiz, type QuizQuestion } from "@/content/quiz";
import { getDictionary, type Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { setPath } from "./flatten";
import { toGalleryItem, toIdentifyItem, toProducer, toQuizQuestion, toStoryChapter } from "./mappers";

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

export const getProducers = cache(async (): Promise<Producer[]> =>
  safe(async () => {
    const rows = await prisma.producer.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    });
    return rows.length ? rows.map(toProducer) : staticProducers;
  }, staticProducers),
);

export const getAllProducersAdmin = cache(async () =>
  prisma.producer.findMany({ orderBy: { sortOrder: "asc" } }),
);

export const getProducerBySlug = cache(async (slug: string) => {
  const list = await getProducers();
  return list.find((p) => p.slug === slug);
});

export const getGalleryItems = cache(async (): Promise<GalleryItem[]> =>
  safe(async () => {
    const rows = await prisma.galleryItem.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    });
    return rows.length ? rows.map(toGalleryItem) : staticGallery;
  }, staticGallery),
);

export const getStory = cache(async (lang: Locale): Promise<StoryContent> =>
  safe(async () => {
    const rows = await prisma.storyChapter.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    });
    if (!rows.length) return staticStory[lang];
    const base = structuredClone(staticStory[lang]);
    base.chapters = rows.map((row) => {
      const mapped = toStoryChapter(row);
      return {
        ...mapped,
        title: lang === "tr" ? row.titleTr : row.titleEn,
        body: lang === "tr" ? row.bodyTr : row.bodyEn,
        slotLabel: lang === "tr" ? row.slotTr : row.slotEn,
      };
    });
    return base;
  }, staticStory[lang]),
);

export const getIdentifyItems = cache(async (): Promise<IdentifyItem[]> =>
  safe(async () => {
    const rows = await prisma.identifyItem.findMany({ orderBy: { sortOrder: "asc" } });
    return rows.length ? rows.map(toIdentifyItem) : staticIdentify;
  }, staticIdentify),
);

export const getIdentifyCopy = cache(async (lang: Locale) => identifyCopy[lang]);

export const getQuizQuestions = cache(async (): Promise<QuizQuestion[]> =>
  safe(async () => {
    const rows = await prisma.quizQuestion.findMany({ orderBy: { sortOrder: "asc" } });
    return rows.length ? rows.map(toQuizQuestion) : staticQuiz;
  }, staticQuiz),
);

export const getLiveDictionary = cache(async (lang: Locale): Promise<Dictionary> => {
  const base = structuredClone(getDictionary(lang));
  const rows = await safe(() => prisma.copyEntry.findMany(), []);
  for (const row of rows) {
    setPath(base as unknown as Record<string, unknown>, row.key, lang === "tr" ? row.tr : row.en);
  }
  return base;
});

export const getCopyValue = cache(async (key: string, lang: Locale, fallback: string) => {
  const row = await safe(() => prisma.copyEntry.findUnique({ where: { key } }), null);
  if (!row) return fallback;
  return lang === "tr" ? row.tr : row.en;
});

export const getSetting = cache(async (key: string, fallback = "") => {
  const row = await safe(() => prisma.setting.findUnique({ where: { key } }), null);
  return row?.value ?? fallback;
});

export const getPlaces = cache(async () =>
  prisma.place.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } }),
);

export const getProducerRequests = cache(async () =>
  prisma.producerRequest.findMany({ orderBy: { createdAt: "desc" } }),
);

export const getContactMessages = cache(async () =>
  prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } }),
);
