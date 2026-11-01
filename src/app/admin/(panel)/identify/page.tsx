import { deleteIdentify, saveIdentify } from "@/app/actions/admin";
import { Actions, Field, Pair } from "@/components/admin/Fields";
import { prisma } from "@/lib/db";

export const metadata = { title: "Ölçütler" };

export default async function IdentifyAdminPage() {
  const rows = await prisma.identifyItem.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <>
      <header className="ad-bar">
        <div>
          <h1 className="ad-title">Ayırt etme ölçütleri</h1>
          <p className="ad-lead">Hakiki şekerin üç işareti — buradan çoğaltılabilir.</p>
        </div>
      </header>
      <section className="ad-page grid gap-8">
        <form action={saveIdentify} className="ad-card ad-grid">
          <h2 className="font-display text-3xl">Yeni ölçüt</h2>
          <Field name="slug" label="Kimlik" />
          <Pair nameTr="titleTr" nameEn="titleEn" label="Başlık" rows={2} />
          <Pair nameTr="bodyTr" nameEn="bodyEn" label="Metin" rows={4} />
          <Actions />
        </form>
        {rows.map((row) => (
          <form key={row.id} action={saveIdentify} className="ad-card ad-grid">
            <input type="hidden" name="id" value={row.id} />
            <div className="ad-grid two">
              <Field name="slug" label="Kimlik" defaultValue={row.slug} />
              <Field name="sortOrder" label="Sıra" type="number" defaultValue={row.sortOrder} />
            </div>
            <Pair nameTr="titleTr" nameEn="titleEn" label="Başlık" defaultTr={row.titleTr} defaultEn={row.titleEn} rows={2} />
            <Pair nameTr="bodyTr" nameEn="bodyEn" label="Metin" defaultTr={row.bodyTr} defaultEn={row.bodyEn} rows={4} />
            <div className="flex gap-3">
              <Actions />
              <button formAction={deleteIdentify} className="ad-btn ghost">
                Sil
              </button>
            </div>
          </form>
        ))}
      </section>
    </>
  );
}
