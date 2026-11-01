"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/actions/auth";

const LINKS = [
  ["Özet", "/admin"],
  ["Metinler", "/admin/copy"],
  ["Üreticiler", "/admin/producers"],
  ["Talepler", "/admin/requests"],
  ["Mesajlar", "/admin/messages"],
  ["Galeri", "/admin/gallery"],
  ["Keşif", "/admin/places"],
  ["Hikâye", "/admin/story"],
  ["Ölçütler", "/admin/identify"],
  ["Quiz", "/admin/quiz"],
  ["Ayarlar", "/admin/settings"],
] as const;

export function AdminNav({
  counts,
}: {
  counts: { requests: number; messages: number };
}) {
  const path = usePathname();
  return (
    <aside className="ad-side">
      <p className="ad-brand">
        Sofra
        <span>Elazığ Badem Şekeri</span>
      </p>
      <nav className="ad-nav" aria-label="Yönetim">
        {LINKS.map(([label, href]) => {
          const count = href === "/admin/requests" ? counts.requests : href === "/admin/messages" ? counts.messages : 0;
          const active = href === "/admin" ? path === href : path.startsWith(href);
          return (
            <Link key={href} href={href} data-active={active}>
              {label}
              {count > 0 ? <b>{count}</b> : null}
            </Link>
          );
        })}
      </nav>
      <form action={logoutAction} className="mt-auto pt-8">
        <button type="submit" className="ad-btn ghost w-full">
          Çıkış
        </button>
      </form>
    </aside>
  );
}
