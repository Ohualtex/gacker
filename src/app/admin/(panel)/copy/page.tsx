import { saveCopy } from "@/app/actions/admin";
import { prisma } from "@/lib/db";

export const metadata = { title: "Metinler" };

export default async function CopyPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; group?: string }>;
}) {
  const { q = "", group = "" } = await searchParams;
  const rows = await prisma.copyEntry.findMany({
    where: {
      AND: [
        group ? { group } : {},
        q
          ? {
              OR: [
                { key: { contains: q, mode: "insensitive" } },
                { tr: { contains: q, mode: "insensitive" } },
                { en: { contains: q, mode: "insensitive" } },
              ],
            }
          : {},
      ],
    },
    orderBy: { key: "asc" },
  });
  const groups = await prisma.copyEntry.findMany({
    distinct: ["group"],
    select: { group: true },
    orderBy: { group: "asc" },
  });

  return (
    <>
      <header className="ad-bar">
        <div>
          <h1 className="ad-title">Metinler</h1>
          <p className="ad-lead">Hero başlığı dahil sitedeki her cümle. TR ve EN birlikte.</p>
        </div>
      </header>
      <section className="ad-page">
        <form className="mb-8 flex flex-wrap gap-3">
          <input name="q" defaultValue={q} placeholder="Ara" className="min-w-56 rounded-[3px] border border-line bg-bone px-3 py-2" />
          <select name="group" defaultValue={group} className="rounded-[3px] border border-line bg-bone px-3 py-2">
            <option value="">Tüm gruplar</option>
            {groups.map((g) => (
              <option key={g.group} value={g.group}>
                {g.group}
              </option>
            ))}
          </select>
          <button className="ad-btn" type="submit">
            Filtrele
          </button>
        </form>
        <div className="grid gap-4">
          {rows.map((row) => (
            <form key={row.key} action={saveCopy} className="ad-card ad-grid">
              <input type="hidden" name="key" value={row.key} />
              <p className="text-[0.78rem] uppercase tracking-[0.12em] text-ink-2">{row.key}</p>
              <div className="ad-grid two">
                <label className="ad-field">
                  <span>Türkçe</span>
                  <textarea name="tr" defaultValue={row.tr} rows={row.tr.length > 80 ? 5 : 2} />
                </label>
                <label className="ad-field">
                  <span>English</span>
                  <textarea name="en" defaultValue={row.en} rows={row.en.length > 80 ? 5 : 2} />
                </label>
              </div>
              <button type="submit" className="ad-btn w-fit">
                Bu metni kaydet
              </button>
            </form>
          ))}
        </div>
      </section>
    </>
  );
}
