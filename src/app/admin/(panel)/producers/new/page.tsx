import { ProducerForm } from "@/components/admin/ProducerForm";

export const metadata = { title: "Üretici ekle" };

export default function NewProducerPage() {
  return (
    <>
      <header className="ad-bar">
        <div>
          <h1 className="ad-title">Yeni üretici</h1>
          <p className="ad-lead">Kayıt doğrulanmadan “örnek içerik” işaretli kalsın.</p>
        </div>
      </header>
      <section className="ad-page max-w-5xl">
        <ProducerForm />
      </section>
    </>
  );
}
