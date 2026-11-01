import { deleteQuiz, saveQuiz } from "@/app/actions/admin";
import { Actions, Field, Pair } from "@/components/admin/Fields";
import { prisma } from "@/lib/db";

export const metadata = { title: "Quiz" };

export default async function QuizAdminPage() {
  const rows = await prisma.quizQuestion.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <>
      <header className="ad-bar">
        <div>
          <h1 className="ad-title">Quiz soruları</h1>
          <p className="ad-lead">Şıklar JSON: text.tr / text.en / weights.</p>
        </div>
      </header>
      <section className="ad-page grid gap-8">
        <form action={saveQuiz} className="ad-card ad-grid">
          <h2 className="font-display text-3xl">Yeni soru</h2>
          <Pair nameTr="promptTr" nameEn="promptEn" label="Soru" rows={3} />
          <Field name="options" label="Şıklar (JSON)" rows={10} defaultValue="[]" />
          <Actions />
        </form>
        {rows.map((row) => (
          <form key={row.id} action={saveQuiz} className="ad-card ad-grid">
            <input type="hidden" name="id" value={row.id} />
            <Field name="sortOrder" label="Sıra" type="number" defaultValue={row.sortOrder} />
            <Pair nameTr="promptTr" nameEn="promptEn" label="Soru" defaultTr={row.promptTr} defaultEn={row.promptEn} rows={3} />
            <Field name="options" label="Şıklar (JSON)" rows={12} defaultValue={JSON.stringify(row.options, null, 2)} />
            <div className="flex gap-3">
              <Actions />
              <button formAction={deleteQuiz} className="ad-btn ghost">
                Sil
              </button>
            </div>
          </form>
        ))}
      </section>
    </>
  );
}
