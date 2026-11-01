import Link from "next/link";
import { prisma } from "@/lib/db";

export const metadata = { title: "Özet" };

export default async function AdminHomePage() {
  const [producers, requests, messages, gallery] = await Promise.all([
    prisma.producer.count(),
    prisma.producerRequest.count({ where: { status: "new" } }),
    prisma.contactMessage.count({ where: { read: false } }),
    prisma.galleryItem.count(),
  ]);

  const cards = [
    ["Üreticiler", producers, "/admin/producers", "Yeni marka ekle, hikâyeyi düzelt."],
    ["Yeni talepler", requests, "/admin/requests", "Siteden gelen üretici başvuruları."],
    ["Okunmamış mesaj", messages, "/admin/messages", "İletişim formundan gelenler."],
    ["Galeri", gallery, "/admin/gallery", "Kareler, altyazılar, sır."],
  ] as const;

  return (
    <>
      <header className="ad-bar">
        <div>
          <h1 className="ad-title">Sofra defteri</h1>
          <p className="ad-lead">Sitede görünen her şey buradan değişir.</p>
        </div>
        <Link href="/tr" className="ad-btn ghost" target="_blank">
          Siteyi aç
        </Link>
      </header>
      <section className="ad-page grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map(([title, count, href, body]) => (
          <Link key={href} href={href} className="ad-card block no-underline">
            <p className="text-[0.75rem] uppercase tracking-[0.14em] text-ink-2">{title}</p>
            <p className="mt-3 font-display text-5xl leading-none">{count}</p>
            <p className="mt-4 text-ink-2">{body}</p>
          </Link>
        ))}
      </section>
    </>
  );
}
