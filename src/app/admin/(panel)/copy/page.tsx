import { saveSiteCopy } from "@/app/actions/admin";
import { siteCopyGroups } from "@/lib/cms/site-copy";
import { prisma } from "@/lib/db";

export const metadata = { title: "Giriş yazıları" };

export default async function CopyPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const rows = await prisma.copyEntry.findMany({
    where: { key: { in: siteCopyGroups.flatMap((group) => group.fields.map((field) => field.key)) } },
  });
  const byKey = new Map(rows.map((row) => [row.key, row]));

  return (
    <>
      <header className="ad-bar">
        <div>
          <h1 className="ad-title">Giriş yazıları</h1>
          <p className="ad-lead">Ana başlık, sayfa cümleleri ve alt bilgi. Menü ve düğme yazıları burada yok.</p>
        </div>
      </header>
      <section className="ad-page max-w-4xl">
        {saved ? <p className="ad-card mb-6">Kaydedildi. Sitede görünmesi için sayfayı yenilemen yeterli.</p> : null}
        <form action={saveSiteCopy} className="grid gap-8">
          {siteCopyGroups.map((group) => (
            <fieldset key={group.title} className="ad-card grid gap-5">
              <legend className="font-sans text-lg font-semibold">{group.title}</legend>
              {group.fields.map((field) => {
                const row = byKey.get(field.key);
                return (
                  <div key={field.key} className="ad-grid two">
                    <label className="ad-field">
                      <span>{field.label} · Türkçe</span>
                      <textarea name={`${field.key}__tr`} rows={field.rows ?? 2} defaultValue={row?.tr ?? ""} required />
                    </label>
                    <label className="ad-field">
                      <span>{field.label} · English</span>
                      <textarea name={`${field.key}__en`} rows={field.rows ?? 2} defaultValue={row?.en ?? ""} required />
                    </label>
                  </div>
                );
              })}
            </fieldset>
          ))}
          <button type="submit" className="ad-btn w-fit">
            Yazıları kaydet
          </button>
        </form>
      </section>
    </>
  );
}