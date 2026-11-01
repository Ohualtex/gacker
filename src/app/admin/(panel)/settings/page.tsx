import { saveSetting } from "@/app/actions/admin";
import { prisma } from "@/lib/db";

export const metadata = { title: "Ayarlar" };

export default async function SettingsPage() {
  const rows = await prisma.setting.findMany({ orderBy: { key: "asc" } });
  return (
    <>
      <header className="ad-bar">
        <div>
          <h1 className="ad-title">Ayarlar</h1>
          <p className="ad-lead">İletişim e-postası ve formun açık olup olmadığı.</p>
        </div>
      </header>
      <section className="ad-page grid gap-4">
        {rows.map((row) => (
          <form key={row.key} action={saveSetting} className="ad-card ad-grid">
            <input type="hidden" name="key" value={row.key} />
            <label className="ad-field">
              <span>{row.key}</span>
              <input name="value" defaultValue={row.value} />
            </label>
            <button className="ad-btn w-fit" type="submit">
              Kaydet
            </button>
          </form>
        ))}
        <form action={saveSetting} className="ad-card ad-grid">
          <h2 className="font-display text-3xl">Yeni anahtar</h2>
          <div className="ad-grid two">
            <label className="ad-field">
              <span>Anahtar</span>
              <input name="key" />
            </label>
            <label className="ad-field">
              <span>Değer</span>
              <input name="value" />
            </label>
          </div>
          <button className="ad-btn w-fit" type="submit">
            Ekle
          </button>
        </form>
      </section>
    </>
  );
}
