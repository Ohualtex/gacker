import { createHmac, randomBytes, timingSafeEqual, createHash } from "node:crypto";

const MIN_MS = 2800;
const MAX_MS = 40 * 60 * 1000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 4;
const hits = new Map<string, number[]>();

function secret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.DATABASE_URL || "gacker-form";
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

function equal(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export type FormTicket = {
  issued: string;
  nonce: string;
  sig: string;
};

export function issueFormTicket(): FormTicket {
  const issued = Date.now().toString();
  const nonce = randomBytes(16).toString("hex");
  return { issued, nonce, sig: sign(`${issued}.${nonce}`) };
}

export function verifyFormTicket(ticket: FormTicket, honeypot: string) {
  if (honeypot.trim()) return { ok: false as const, reason: "bot" };
  if (!ticket.issued || !ticket.nonce || !ticket.sig) return { ok: false as const, reason: "ticket" };
  if (!equal(sign(`${ticket.issued}.${ticket.nonce}`), ticket.sig)) {
    return { ok: false as const, reason: "ticket" };
  }
  const age = Date.now() - Number(ticket.issued);
  if (!Number.isFinite(age) || age < MIN_MS) return { ok: false as const, reason: "fast" };
  if (age > MAX_MS) return { ok: false as const, reason: "stale" };
  return { ok: true as const };
}

export function allowSubmission(ipHash: string) {
  const now = Date.now();
  const list = (hits.get(ipHash) ?? []).filter((t) => now - t < WINDOW_MS);
  if (list.length >= MAX_HITS) return false;
  list.push(now);
  hits.set(ipHash, list);
  return true;
}

export function hashVisitor(ip: string) {
  return createHash("sha256").update(`${secret()}:${ip}`).digest("hex").slice(0, 24);
}

export function looksSpam(text: string) {
  const links = text.match(/https?:\/\//gi)?.length ?? 0;
  return links > 4 || text.length > 4000;
}
