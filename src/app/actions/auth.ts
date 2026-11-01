"use server";

import { redirect } from "next/navigation";
import {
  clearLoginFailures,
  clientIp,
  loginAllowed,
  recordLoginFailure,
  verifyAdminCredentials,
} from "@/lib/admin/auth";
import { clearSession, writeSession } from "@/lib/admin/session";

export async function loginAction(_prev: { error?: string } | null, formData: FormData) {
  const ip = await clientIp();
  if (!loginAllowed(ip)) {
    return { error: "Çok fazla deneme. Birkaç dakika sonra tekrar deneyin." };
  }

  const user = String(formData.get("user") ?? "");
  const password = String(formData.get("password") ?? "");
  if (!verifyAdminCredentials(user, password)) {
    recordLoginFailure(ip);
    return { error: "Kullanıcı adı veya parola yanlış." };
  }

  clearLoginFailures(ip);
  await writeSession(user.trim());
  redirect("/admin");
}

export async function logoutAction() {
  await clearSession();
  redirect("/admin/login");
}
