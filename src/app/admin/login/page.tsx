import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { readSession } from "@/lib/admin/session";
import "../admin.css";

export const metadata = { title: "Sofra · Giriş" };

export default async function AdminLoginPage() {
  if (await readSession()) redirect("/admin");
  return (
    <div className="ad-login">
      <div>
        <p className="ad-brand text-[#2a1a12]">
          Sofra
          <span>Yönetim kapısı</span>
        </p>
        <h1 className="ad-title mt-8">Sadece sofrayı kuranlar.</h1>
        <p className="ad-lead mt-3 max-w-sm">
          Kullanıcı adı ve parola ortam değişkenlerinden okunur. Oturum çerezle imzalanır.
        </p>
        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
