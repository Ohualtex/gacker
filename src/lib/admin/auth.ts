import { createHash, timingSafeEqual } from "node:crypto";
import { headers } from "next/headers";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_TRIES = 8;
const attempts = new Map<string, number[]>();

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) {
    timingSafeEqual(left, left);
    return false;
  }
  return timingSafeEqual(left, right);
}

export function hashIp(ip: string) {
  const salt = process.env.ADMIN_SESSION_SECRET ?? "gacker";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 24);
}

export async function clientIp() {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || h.get("x-real-ip") || "0.0.0.0";
}

function prune(ip: string) {
  const now = Date.now();
  const list = (attempts.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  attempts.set(ip, list);
  return list;
}

export function loginAllowed(ip: string) {
  return prune(ip).length < MAX_TRIES;
}

export function recordLoginFailure(ip: string) {
  const list = prune(ip);
  list.push(Date.now());
  attempts.set(ip, list);
}

export function clearLoginFailures(ip: string) {
  attempts.delete(ip);
}

export function verifyAdminCredentials(user: string, password: string) {
  const expectedUser = process.env.ADMIN_USER ?? "";
  const expectedPass = process.env.ADMIN_PASSWORD ?? "";
  if (!expectedUser || !expectedPass) return false;
  return safeEqual(user.trim(), expectedUser) && safeEqual(password, expectedPass);
}
