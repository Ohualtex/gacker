import { deleteRequest, updateRequestStatus } from "@/app/actions/admin";
import { prisma } from "@/lib/db";

export const metadata = { title: "Üretici talepleri" };

export default async function RequestsPage() {
  const rows = await prisma.producerRequest.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <>
      <header className="ad-bar">
        <div>
          <h1 className="ad-title">Üretici talepleri</h1>
          <p className="ad-lead">Siteden gelen başvurular. Bot gönderimleri süzülmüş olarak burada durur.</p>
        </div>
      </header>
      <section className="ad-page grid gap-4">
        {rows.length === 0 ? <p className="ad-lead">Henüz talep yok.</p> : null}
        {rows.map((row) => (
          <article key={row.id} className="ad-card">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-3xl">{row.name}</h2>
                <p className="mt-1 text-ink-2">
                  {row.email} · {row.createdAt.toLocaleString("tr-TR")} · {row.status}
                </p>
              </div>
              <span className="ad-badge">{row.lang}</span>
            </div>
            <p className="mt-4">{row.intro}</p>
            <dl className="mt-4 grid gap-2 text-sm text-ink-2">
              <div>Adres: {row.address}</div>
              {row.phone ? <div>Telefon: {row.phone}</div> : null}
              {row.website ? <div>Web: {row.website}</div> : null}
              {row.socials ? <div>Sosyal: {row.socials}</div> : null}
              {row.hours ? <div>Saat: {row.hours}</div> : null}
              {row.notes ? <div>Not: {row.notes}</div> : null}
            </dl>
            <div className="mt-5 flex flex-wrap gap-2">
              {["new", "reviewed", "approved", "rejected"].map((status) => (
                <form key={status} action={updateRequestStatus}>
                  <input type="hidden" name="id" value={row.id} />
                  <input type="hidden" name="status" value={status} />
                  <button type="submit" className="ad-btn ghost">
                    {status}
                  </button>
                </form>
              ))}
              <form action={deleteRequest}>
                <input type="hidden" name="id" value={row.id} />
                <button type="submit" className="ad-btn quiet">
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
