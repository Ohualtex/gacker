"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { clientIp } from "@/lib/admin/auth";
import { allowSubmission, hashVisitor, looksSpam, verifyFormTicket } from "@/lib/bot-guard";

export type RequestState = { ok?: boolean; error?: string };

const copy = {
  tr: {
    missing: "Ad, e-posta, tanıtım ve adres gerekli.",
    missingMessage: "Ad, e-posta ve mesaj gerekli.",
    bot: "Gönderim doğrulanamadı. Sayfayı yenileyip tekrar deneyin.",
    rate: "Çok hızlı gönderim. Biraz sonra tekrar deneyin.",
    spam: "Metin çok uzun veya çok fazla bağlantı içeriyor.",
    ok: "Talebiniz alındı. En kısa sürede bakacağız.",
  },
  en: {
    missing: "Name, email, introduction and address are required.",
    missingMessage: "Name, email and a message are required.",
    bot: "The submission could not be verified. Refresh and try again.",
    rate: "Too many submissions. Please wait a little.",
    spam: "The text is too long or has too many links.",
    ok: "We received your request and will look at it soon.",
  },
};

function langOf(formData: FormData) {
  return formData.get("lang") === "en" ? "en" : "tr";
}

async function guard(formData: FormData) {
  const ip = await clientIp();
  const ipHash = hashVisitor(ip);
  const ticket = {
    issued: String(formData.get("issued") ?? ""),
    nonce: String(formData.get("nonce") ?? ""),
    sig: String(formData.get("sig") ?? ""),
  };
  const honeypot = `${formData.get("company_url") ?? ""}${formData.get("fax") ?? ""}`;
  const check = verifyFormTicket(ticket, honeypot);
  if (!check.ok) return { ok: false as const, ipHash, reason: "bot" };
  if (!allowSubmission(ipHash)) return { ok: false as const, ipHash, reason: "rate" };
  return { ok: true as const, ipHash };
}

export async function submitProducerRequest(_prev: RequestState, formData: FormData): Promise<RequestState> {
  const lang = langOf(formData);
  const t = copy[lang];
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const intro = String(formData.get("intro") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();
  if (!name || !email || !intro || !address || !email.includes("@")) return { error: t.missing };

  const gate = await guard(formData);
  if (!gate.ok) return { error: gate.reason === "rate" ? t.rate : t.bot };

  const notes = [
    String(formData.get("phone") ?? ""),
    String(formData.get("website") ?? ""),
    String(formData.get("socials") ?? ""),
    String(formData.get("hours") ?? ""),
    String(formData.get("notes") ?? ""),
    intro,
    address,
  ].join("\n");
  if (looksSpam(notes)) return { error: t.spam };

  await prisma.producerRequest.create({
    data: {
      name,
      email,
      intro,
      address,
      phone: String(formData.get("phone") ?? "").trim(),
      website: String(formData.get("website") ?? "").trim(),
      socials: String(formData.get("socials") ?? "").trim(),
      hours: String(formData.get("hours") ?? "").trim(),
      notes: String(formData.get("notes") ?? "").trim(),
      lang,
      ipHash: gate.ipHash,
    },
  });
  revalidatePath("/admin/requests");
  return { ok: true };
}

export async function submitContactMessage(_prev: RequestState, formData: FormData): Promise<RequestState> {
  const lang = langOf(formData);
  const t = copy[lang];
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  if (!name || !email || !message || !email.includes("@")) return { error: t.missingMessage };

  const gate = await guard(formData);
  if (!gate.ok) return { error: gate.reason === "rate" ? t.rate : t.bot };
  if (looksSpam(message)) return { error: t.spam };

  await prisma.contactMessage.create({
    data: { name, email, message, lang, ipHash: gate.ipHash },
  });
  revalidatePath("/admin/messages");
  return { ok: true };
}
