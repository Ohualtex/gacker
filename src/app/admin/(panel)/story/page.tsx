import { deleteStory, saveStory } from "@/app/actions/admin";
import { Actions, Check, Field, Pair } from "@/components/admin/Fields";
import { prisma } from "@/lib/db";

export const metadata = { title: "Hikâye" };

export default async function StoryAdminPage() {
  const rows = await prisma.storyChapter.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <>
      <header className="ad-bar">
        <div>
          <h1 className="ad-title">Hikâye bölümleri</h1>
          <p className="ad-lead">Hikâye sayfasındaki bölümler.</p>
        </div>
      </header>
      <section className="ad-page grid gap-8">
        <form action={saveStory} className="ad-card ad-grid">
          <h2 className="font-display text-3xl">Yeni bölüm</h2>
          <Field name="slug" label="Kimlik" />
          <Pair nameTr="titleTr" nameEn="titleEn" label="Başlık" rows={2} />
          <Pair nameTr="bodyTr" nameEn="bodyEn" label="Metin" rows={5} />
          <Check name="published" label="Yayında" defaultChecked />
          <Actions />
        </form>
        {rows.map((row) => (
          <form key={row.id} action={saveStory} className="ad-card ad-grid">
            <input type="hidden" name="id" value={row.id} />
            <div className="ad-grid two">
              <Field name="slug" label="Kimlik" defaultValue={row.slug} />
              <Field name="sortOrder" label="Sıra" type="number" defaultValue={row.sortOrder} />
            </div>
            <Field name="image" label="Görsel" defaultValue={row.image} />
            <Field name="motif" label="Motif" defaultValue={row.motif} />
            <Pair nameTr="titleTr" nameEn="titleEn" label="Başlık" defaultTr={row.titleTr} defaultEn={row.titleEn} rows={2} />
            <Pair nameTr="bodyTr" nameEn="bodyEn" label="Metin" defaultTr={row.bodyTr} defaultEn={row.bodyEn} rows={5} />
            <Pair nameTr="slotTr" nameEn="slotEn" label="Görsel etiketi" defaultTr={row.slotTr} defaultEn={row.slotEn} rows={2} />
            <Check name="published" label="Yayında" defaultChecked={row.published} />
            <div className="flex gap-3">
              <Actions />
              <button formAction={deleteStory} className="ad-btn ghost">
                Sil
              </button>
            </div>
          </form>
        ))}
      </section>
    </>
  );
}
