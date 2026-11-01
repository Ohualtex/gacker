import { deleteMessage, markMessageRead } from "@/app/actions/admin";
import { prisma } from "@/lib/db";

export const metadata = { title: "Mesajlar" };

export default async function MessagesPage() {
  const rows = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <>
      <header className="ad-bar">
        <div>
          <h1 className="ad-title">Mesajlar</h1>
          <p className="ad-lead">İletişim formundan gelenler.</p>
        </div>
      </header>
      <section className="ad-page grid gap-4">
        {rows.length === 0 ? <p className="ad-lead">Henüz mesaj yok.</p> : null}
        {rows.map((row) => (
          <article key={row.id} className="ad-card">
            <div className="flex justify-between gap-3">
              <div>
                <h2 className="font-display text-3xl">{row.name}</h2>
                <p className="text-ink-2">
                  {row.email} · {row.createdAt.toLocaleString("tr-TR")}
                </p>
              </div>
              {row.read ? <span className="ad-badge">okundu</span> : <span className="ad-badge">yeni</span>}
            </div>
            <p className="mt-4 whitespace-pre-wrap">{row.message}</p>
            <div className="mt-5 flex gap-2">
              {!row.read ? (
                <form action={markMessageRead}>
                  <input type="hidden" name="id" value={row.id} />
                  <button className="ad-btn" type="submit">
                    Okundu
                  </button>
                </form>
              ) : null}
              <form action={deleteMessage}>
                <input type="hidden" name="id" value={row.id} />
                <button className="ad-btn ghost" type="submit">
                  Sil
                </button>
              </form>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
