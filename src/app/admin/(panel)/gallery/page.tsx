import { deleteGallery, saveGallery } from "@/app/actions/admin";
import { Actions, Check, Field, Pair } from "@/components/admin/Fields";
import { prisma } from "@/lib/db";

export const metadata = { title: "Galeri" };

export default async function GalleryAdminPage() {
  const rows = await prisma.galleryItem.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <>
      <header className="ad-bar">
        <div>
          <h1 className="ad-title">Galeri</h1>
          <p className="ad-lead">Yeni kare ekleyin veya altyazıyı düzeltin.</p>
        </div>
      </header>
      <section className="ad-page grid gap-8">
        <form action={saveGallery} className="ad-card ad-grid">
          <h2 className="font-display text-3xl">Yeni görsel</h2>
          <div className="ad-grid two">
            <Field name="slug" label="Kimlik" />
            <Field name="src" label="Yol (/gallery/...)" />
          </div>
          <div className="ad-grid two">
            <Field name="w" label="Genişlik" type="number" defaultValue={1200} />
            <Field name="h" label="Yükseklik" type="number" defaultValue={800} />
          </div>
          <Field name="category" label="Kategori (nature/craft/table)" defaultValue="nature" />
          <Pair nameTr="altTr" nameEn="altEn" label="Alt metin" rows={2} />
          <Pair nameTr="captionTr" nameEn="captionEn" label="Altyazı" rows={2} />
          <div className="flex gap-6">
            <Check name="published" label="Yayında" defaultChecked />
            <Check name="ai" label="Yapay zekâ görseli" defaultChecked />
          </div>
          <Actions />
        </form>
        {rows.map((row) => (
          <form key={row.id} action={saveGallery} className="ad-card ad-grid">
            <input type="hidden" name="id" value={row.id} />
            <div className="ad-grid two">
              <Field name="slug" label="Kimlik" defaultValue={row.slug} />
              <Field name="src" label="Yol" defaultValue={row.src} />
            </div>
            <div className="ad-grid two">
              <Field name="w" label="Genişlik" type="number" defaultValue={row.w} />
              <Field name="h" label="Yükseklik" type="number" defaultValue={row.h} />
            </div>
            <Field name="category" label="Kategori" defaultValue={row.category} />
            <Field name="credit" label="Kredi" defaultValue={row.credit} />
            <Field name="sortOrder" label="Sıra" type="number" defaultValue={row.sortOrder} />
            <Pair nameTr="altTr" nameEn="altEn" label="Alt metin" defaultTr={row.altTr} defaultEn={row.altEn} rows={2} />
            <Pair nameTr="captionTr" nameEn="captionEn" label="Altyazı" defaultTr={row.captionTr} defaultEn={row.captionEn} rows={2} />
            <div className="flex gap-6">
              <Check name="published" label="Yayında" defaultChecked={row.published} />
              <Check name="ai" label="Yapay zekâ görseli" defaultChecked={row.ai} />
            </div>
            <div className="flex gap-3">
              <Actions />
              <button formAction={deleteGallery} className="ad-btn ghost">
                Sil
              </button>
            </div>
          </form>
        ))}
      </section>
    </>
  );
}
