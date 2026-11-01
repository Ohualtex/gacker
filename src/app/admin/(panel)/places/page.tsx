import { deletePlace, savePlace } from "@/app/actions/admin";
import { Actions, Check, Field, Pair } from "@/components/admin/Fields";
import { prisma } from "@/lib/db";

export const metadata = { title: "Keşif" };

export default async function PlacesAdminPage() {
  const rows = await prisma.place.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <>
      <header className="ad-bar">
        <div>
          <h1 className="ad-title">Keşif noktaları</h1>
          <p className="ad-lead">Haritadaki yerler ve kısa notlar.</p>
        </div>
      </header>
      <section className="ad-page grid gap-8">
        <form action={savePlace} className="ad-card ad-grid">
          <h2 className="font-display text-3xl">Yeni nokta</h2>
          <div className="ad-grid two">
            <Field name="slug" label="Kimlik" />
            <Field name="category" label="Kategori" defaultValue="place" />
          </div>
          <Pair nameTr="nameTr" nameEn="nameEn" label="Ad" rows={2} />
          <Pair nameTr="bodyTr" nameEn="bodyEn" label="Metin" rows={4} />
          <div className="ad-grid two">
            <Field name="lat" label="Enlem" />
            <Field name="lng" label="Boylam" />
          </div>
          <Check name="published" label="Yayında" defaultChecked />
          <Actions />
        </form>
        {rows.map((row) => (
          <form key={row.id} action={savePlace} className="ad-card ad-grid">
            <input type="hidden" name="id" value={row.id} />
            <div className="ad-grid two">
              <Field name="slug" label="Kimlik" defaultValue={row.slug} />
              <Field name="sortOrder" label="Sıra" type="number" defaultValue={row.sortOrder} />
            </div>
            <Pair nameTr="nameTr" nameEn="nameEn" label="Ad" defaultTr={row.nameTr} defaultEn={row.nameEn} rows={2} />
            <Pair nameTr="bodyTr" nameEn="bodyEn" label="Metin" defaultTr={row.bodyTr} defaultEn={row.bodyEn} rows={4} />
            <div className="ad-grid two">
              <Field name="lat" label="Enlem" defaultValue={row.lat ?? ""} />
              <Field name="lng" label="Boylam" defaultValue={row.lng ?? ""} />
            </div>
            <div className="ad-grid two">
              <Field name="svgX" label="SVG X" defaultValue={row.svgX ?? ""} />
              <Field name="svgY" label="SVG Y" defaultValue={row.svgY ?? ""} />
            </div>
            <Field name="source" label="Kaynak" defaultValue={row.source} />
            <Check name="published" label="Yayında" defaultChecked={row.published} />
            <div className="flex gap-3">
              <Actions />
              <button formAction={deletePlace} className="ad-btn ghost">
                Sil
              </button>
            </div>
          </form>
        ))}
      </section>
    </>
  );
}
