import { PrismaClient } from "../src/generated/prisma";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { producers } from "../src/data/producers";
import { galleryItems } from "../src/content/gallery";
import { story } from "../src/content/story";
import { identifyItems } from "../src/data/identify";
import { quizQuestions } from "../src/content/quiz";
import { extraPlaceText } from "../src/content/discover";
import { flattenStrings, groupOf } from "../src/lib/cms/flatten";
import tr from "../src/dictionaries/tr.json";
import en from "../src/dictionaries/en.json";

const prisma = new PrismaClient();

type PlaceFile = {
  places: {
    id: string;
    name_tr: string;
    name_en: string;
    lat?: number;
    lon?: number;
    svg?: [number, number];
    source?: string;
  }[];
};

function pairLines(items?: { tr: string; en: string }[]) {
  return items ?? [];
}

async function seedCopy() {
  const trFlat = flattenStrings(tr);
  const enMap = new Map(flattenStrings(en).map((row) => [row.key, row.value]));
  const rows = trFlat.map((row) => ({
    key: row.key,
    group: groupOf(row.key),
    tr: row.value,
    en: enMap.get(row.key) ?? row.value,
  }));

  const unique = new Map(rows.map((row) => [row.key, row]));
  for (const row of unique.values()) {
    await prisma.copyEntry.upsert({
      where: { key: row.key },
      update: {},
      create: row,
    });
  }
}

async function main() {
  await seedCopy();
  const homeCopy = [
    { key: "home.producers.title", group: "home", tr: "Şekeri yapan eller", en: "The hands behind the candy" },
    { key: "home.producers.lead", group: "home", tr: "Kapalı Çarşı’dan kooperatife: sekiz üretici, kendi hikâyeleri, ürünleri ve adresleriyle.", en: "From the covered bazaar to the cooperative: eight makers, with their stories, products and addresses." },
    { key: "home.discover.title", group: "home", tr: "Şeker yolundan Elazığ’a.", en: "From the candy trail to Elazığ." },
    { key: "home.gallery.title", group: "home", tr: "Duvarda ne var?", en: "What hangs on the wall?" },
    { key: "home.assistant.title", group: "home", tr: "Gakkocan’a sor.", en: "Ask Gakkocan." },
  ];
  for (const row of homeCopy) {
    await prisma.copyEntry.upsert({ where: { key: row.key }, update: {}, create: row });
  }

  await Promise.all(
    producers.map((p, i) =>
      prisma.producer.upsert({
        where: { slug: p.slug },
        update: {},
        create: {
          slug: p.slug,
          name: p.name,
          demo: Boolean(p.demo),
          published: true,
          sortOrder: i,
          city: p.city,
          address: p.address,
          phone: p.phone,
          website: p.website,
          instagram: p.instagram,
          image: p.image,
          mapUrl: p.mapUrl,
          roleTr: p.role?.tr ?? "",
          roleEn: p.role?.en ?? "",
          taglineTr: p.tagline.tr,
          taglineEn: p.tagline.en,
          storyTr: p.story.tr,
          storyEn: p.story.en,
          hoursTr: p.hours?.tr ?? "",
          hoursEn: p.hours?.en ?? "",
          branches: pairLines(p.branches),
          products: pairLines(p.products),
          socials: p.socials ?? {},
          extraLinks: p.extraLinks ?? [],
        },
      }),
    ),
  );

  await Promise.all(
    galleryItems.map((item, i) =>
      prisma.galleryItem.upsert({
        where: { slug: item.id },
        update: {},
        create: {
          slug: item.id,
          src: item.src,
          w: item.w,
          h: item.h,
          category: item.category,
          altTr: item.alt.tr,
          altEn: item.alt.en,
          captionTr: item.caption.tr,
          captionEn: item.caption.en,
          ai: item.ai,
          credit: item.credit,
          sortOrder: i,
        },
      }),
    ),
  );

  await Promise.all(
    story.tr.chapters.map((chapter, i) => {
      const enChapter = story.en.chapters[i];
      return prisma.storyChapter.upsert({
        where: { slug: chapter.id },
        update: {},
        create: {
          slug: chapter.id,
          titleTr: chapter.title,
          titleEn: enChapter?.title ?? chapter.title,
          bodyTr: chapter.body,
          bodyEn: enChapter?.body ?? chapter.body,
          image: chapter.image,
          motif: chapter.motif,
          slotTr: chapter.slotLabel,
          slotEn: enChapter?.slotLabel ?? chapter.slotLabel,
          sortOrder: i,
        },
      });
    }),
  );

  await Promise.all(
    identifyItems.map((item, i) =>
      prisma.identifyItem.upsert({
        where: { slug: item.id },
        update: {},
        create: {
          slug: item.id,
          titleTr: item.title.tr,
          titleEn: item.title.en,
          bodyTr: item.body.tr,
          bodyEn: item.body.en,
          sortOrder: i,
        },
      }),
    ),
  );

  const existingQuiz = await prisma.quizQuestion.count();
  if (existingQuiz === 0) {
    await prisma.quizQuestion.createMany({
      data: quizQuestions.map((q, i) => ({
        promptTr: q.prompt.tr,
        promptEn: q.prompt.en,
        options: q.options,
        sortOrder: i,
      })),
    });
  }

  const places = JSON.parse(
    readFileSync(join(process.cwd(), "public/data/elazig-places.json"), "utf8"),
  ) as PlaceFile;
  await Promise.all(
    places.places.map((place, i) => {
      const extra = extraPlaceText[place.id];
      return prisma.place.upsert({
        where: { slug: place.id },
        update: {},
        create: {
          slug: place.id,
          nameTr: place.name_tr,
          nameEn: place.name_en,
          bodyTr: extra?.tr ?? "",
          bodyEn: extra?.en ?? "",
          lat: place.lat,
          lng: place.lon,
          svgX: place.svg?.[0],
          svgY: place.svg?.[1],
          source: extra?.source ?? place.source,
          sortOrder: i,
        },
      });
    }),
  );

  await prisma.setting.upsert({
    where: { key: "contactEmail" },
    update: {},
    create: { key: "contactEmail", value: "" },
  });
  await prisma.setting.upsert({
    where: { key: "requestOpen" },
    update: {},
    create: { key: "requestOpen", value: "1" },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
