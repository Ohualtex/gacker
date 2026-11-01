import Link from "next/link";
import { deleteProducer } from "@/app/actions/admin";
import { prisma } from "@/lib/db";

export const metadata = { title: "Üreticiler" };

export default async function AdminProducersPage() {
  const rows = await prisma.producer.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <>
      <header className="ad-bar">
        <div>
          <h1 className="ad-title">Üreticiler</h1>
          <p className="ad-lead">{rows.length} kayıt. Yeni ekleyebilir, yayından çekebilirsiniz.</p>
        </div>
        <Link href="/admin/producers/new" className="ad-btn">
          Üretici ekle
        </Link>
      </header>
      <section className="ad-page">
        <table className="ad-table">
          <thead>
            <tr>
              <th>Ad</th>
              <th>Durum</th>
              <th>Şehir</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>
                  <Link href={`/admin/producers/${row.id}`}>{row.name}</Link>
                  <div className="text-sm text-ink-2">{row.slug}</div>
                </td>
                <td>
                  {row.published ? "Yayında" : "Taslak"}
                  {row.demo ? " · örnek" : ""}
                </td>
                <td>{row.city}</td>
                <td>
                  <form action={deleteProducer}>
                    <input type="hidden" name="id" value={row.id} />
                    <button type="submit" className="ad-btn ghost">
                      Sil
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
