"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin/session";
import { siteCopyKeys } from "@/lib/cms/site-copy";

async function guard() {
  const session = await requireAdmin();
  if (!session) throw new Error("Yetkisiz");
  return session;
}

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function bool(formData: FormData, key: string) {
  return formData.get(key) === "on" || formData.get(key) === "true";
}

function num(formData: FormData, key: string, fallback = 0) {
  const n = Number(formData.get(key));
  return Number.isFinite(n) ? n : fallback;
}

function pairs(raw: string) {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [tr, en] = line.split("||").map((part) => part.trim());
      return { tr, en: en || tr };
    });
}

function links(raw: string) {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [labelTr, labelEn, url] = line.split("||").map((part) => part.trim());
      return { label: { tr: labelTr ?? "", en: labelEn || labelTr || "" }, url: url ?? "" };
    });
}

async function log(action: string, entity: string, entityId?: string, detail?: string) {
  await prisma.auditLog.create({ data: { action, entity, entityId, detail } });
}

function refreshPublic() {
  revalidatePath("/", "layout");
  revalidatePath("/admin", "layout");
}

export async function saveProducer(formData: FormData) {
  await guard();
  const id = text(formData, "id");
  const slug = text(formData, "slug");
  const data = {
    slug,
    name: text(formData, "name"),
    demo: bool(formData, "demo"),
    published: bool(formData, "published"),
    sortOrder: num(formData, "sortOrder"),
    city: text(formData, "city") || "Elazığ",
    address: text(formData, "address") || null,
    phone: text(formData, "phone") || null,
    website: text(formData, "website") || null,
    instagram: text(formData, "instagram") || null,
    image: text(formData, "image") || null,
    mapUrl: text(formData, "mapUrl") || null,
    roleTr: text(formData, "roleTr"),
    roleEn: text(formData, "roleEn"),
    taglineTr: text(formData, "taglineTr"),
    taglineEn: text(formData, "taglineEn"),
    storyTr: text(formData, "storyTr"),
    storyEn: text(formData, "storyEn"),
    hoursTr: text(formData, "hoursTr"),
    hoursEn: text(formData, "hoursEn"),
    branches: pairs(text(formData, "branches")),
    products: pairs(text(formData, "products")),
    socials: {
      website: text(formData, "website") || undefined,
      instagram: text(formData, "instagram") || undefined,
      facebook: text(formData, "facebook") || undefined,
    },
    extraLinks: links(text(formData, "extraLinks")),
  };
  if (id) {
    await prisma.producer.update({ where: { id }, data });
    await log("update", "producer", id, slug);
  } else {
    const created = await prisma.producer.create({ data });
    await log("create", "producer", created.id, slug);
  }
  refreshPublic();
  redirect("/admin/producers");
}

export async function deleteProducer(formData: FormData) {
  await guard();
  const id = text(formData, "id");
  await prisma.producer.delete({ where: { id } });
  await log("delete", "producer", id);
  refreshPublic();
}

export async function saveSiteCopy(formData: FormData) {
  await guard();
  for (const key of siteCopyKeys) {
    const tr = String(formData.get(`${key}__tr`) ?? "").trim();
    const en = String(formData.get(`${key}__en`) ?? "").trim();
    if (!tr || !en) continue;
    await prisma.copyEntry.upsert({
      where: { key },
      update: { tr, en },
      create: { key, group: key.split(".")[0] ?? "site", tr, en },
    });
  }
  await log("update", "copy", "site");
  refreshPublic();
  redirect("/admin/copy?saved=1");
}

export async function saveGallery(formData: FormData) {
  await guard();
  const id = text(formData, "id");
  const slug = text(formData, "slug");
  const data = {
    slug,
    src: text(formData, "src"),
    w: num(formData, "w", 1200),
    h: num(formData, "h", 800),
    category: text(formData, "category") || "nature",
    altTr: text(formData, "altTr"),
    altEn: text(formData, "altEn"),
    captionTr: text(formData, "captionTr"),
    captionEn: text(formData, "captionEn"),
    ai: bool(formData, "ai"),
    credit: text(formData, "credit") || null,
    published: bool(formData, "published"),
    sortOrder: num(formData, "sortOrder"),
  };
  if (id) await prisma.galleryItem.update({ where: { id }, data });
  else await prisma.galleryItem.create({ data });
  await log("save", "gallery", slug);
  refreshPublic();
  redirect("/admin/gallery");
}

export async function deleteGallery(formData: FormData) {
  await guard();
  await prisma.galleryItem.delete({ where: { id: text(formData, "id") } });
  refreshPublic();
}

export async function savePlace(formData: FormData) {
  await guard();
  const id = text(formData, "id");
  const slug = text(formData, "slug");
  const data = {
    slug,
    nameTr: text(formData, "nameTr"),
    nameEn: text(formData, "nameEn"),
    bodyTr: text(formData, "bodyTr"),
    bodyEn: text(formData, "bodyEn"),
    category: text(formData, "category") || "place",
    lat: text(formData, "lat") ? Number(formData.get("lat")) : null,
    lng: text(formData, "lng") ? Number(formData.get("lng")) : null,
    svgX: text(formData, "svgX") ? Number(formData.get("svgX")) : null,
    svgY: text(formData, "svgY") ? Number(formData.get("svgY")) : null,
    source: text(formData, "source") || null,
    image: text(formData, "image") || null,
    published: bool(formData, "published"),
    sortOrder: num(formData, "sortOrder"),
  };
  if (id) await prisma.place.update({ where: { id }, data });
  else await prisma.place.create({ data });
  refreshPublic();
  redirect("/admin/places");
}

export async function deletePlace(formData: FormData) {
  await guard();
  await prisma.place.delete({ where: { id: text(formData, "id") } });
  refreshPublic();
}

export async function saveStory(formData: FormData) {
  await guard();
  const id = text(formData, "id");
  const slug = text(formData, "slug");
  const data = {
    slug,
    titleTr: text(formData, "titleTr"),
    titleEn: text(formData, "titleEn"),
    bodyTr: text(formData, "bodyTr"),
    bodyEn: text(formData, "bodyEn"),
    image: text(formData, "image") || null,
    motif: text(formData, "motif") || "almond",
    slotTr: text(formData, "slotTr"),
    slotEn: text(formData, "slotEn"),
    published: bool(formData, "published"),
    sortOrder: num(formData, "sortOrder"),
  };
  if (id) await prisma.storyChapter.update({ where: { id }, data });
  else await prisma.storyChapter.create({ data });
  refreshPublic();
  redirect("/admin/story");
}

export async function deleteStory(formData: FormData) {
  await guard();
  await prisma.storyChapter.delete({ where: { id: text(formData, "id") } });
  refreshPublic();
}

export async function saveIdentify(formData: FormData) {
  await guard();
  const id = text(formData, "id");
  const slug = text(formData, "slug");
  const data = {
    slug,
    titleTr: text(formData, "titleTr"),
    titleEn: text(formData, "titleEn"),
    bodyTr: text(formData, "bodyTr"),
    bodyEn: text(formData, "bodyEn"),
    sortOrder: num(formData, "sortOrder"),
  };
  if (id) await prisma.identifyItem.update({ where: { id }, data });
  else await prisma.identifyItem.create({ data });
  refreshPublic();
  redirect("/admin/identify");
}

export async function deleteIdentify(formData: FormData) {
  await guard();
  await prisma.identifyItem.delete({ where: { id: text(formData, "id") } });
  refreshPublic();
}

export async function saveQuiz(formData: FormData) {
  await guard();
  const id = text(formData, "id");
  let options: unknown = [];
  try {
    options = JSON.parse(text(formData, "options") || "[]");
  } catch {
    options = [];
  }
  const data = {
    promptTr: text(formData, "promptTr"),
    promptEn: text(formData, "promptEn"),
    options,
    sortOrder: num(formData, "sortOrder"),
  };
  if (id) await prisma.quizQuestion.update({ where: { id }, data });
  else await prisma.quizQuestion.create({ data });
  refreshPublic();
  redirect("/admin/quiz");
}

export async function deleteQuiz(formData: FormData) {
  await guard();
  await prisma.quizQuestion.delete({ where: { id: text(formData, "id") } });
  refreshPublic();
}

export async function saveSetting(formData: FormData) {
  await guard();
  const key = text(formData, "key");
  await prisma.setting.upsert({
    where: { key },
    update: { value: String(formData.get("value") ?? "") },
    create: { key, value: String(formData.get("value") ?? "") },
  });
  refreshPublic();
}

export async function updateRequestStatus(formData: FormData) {
  await guard();
  const id = text(formData, "id");
  const status = text(formData, "status");
  await prisma.producerRequest.update({ where: { id }, data: { status } });
  revalidatePath("/admin/requests");
}

export async function markMessageRead(formData: FormData) {
  await guard();
  await prisma.contactMessage.update({
    where: { id: text(formData, "id") },
    data: { read: true },
  });
  revalidatePath("/admin/messages");
}

export async function deleteMessage(formData: FormData) {
  await guard();
  await prisma.contactMessage.delete({ where: { id: text(formData, "id") } });
  revalidatePath("/admin/messages");
}

export async function deleteRequest(formData: FormData) {
  await guard();
  await prisma.producerRequest.delete({ where: { id: text(formData, "id") } });
  revalidatePath("/admin/requests");
}
