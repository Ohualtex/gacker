import { notFound } from "next/navigation";
import { ProducerForm } from "@/components/admin/ProducerForm";
import { prisma } from "@/lib/db";

export const metadata = { title: "Üretici" };

export default async function EditProducerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const row = await prisma.producer.findUnique({ where: { id } });
  if (!row) notFound();
  return (
    <>
      <header className="ad-bar">
        <div>
          <h1 className="ad-title">{row.name}</h1>
          <p className="ad-lead">/{row.slug}</p>
        </div>
      </header>
      <section className="ad-page max-w-5xl">
        <ProducerForm row={row} />
      </section>
    </>
  );
}
