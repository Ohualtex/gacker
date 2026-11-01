import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import { KilimBand } from "@/components/ui/KilimBand";
import { QuizApp } from "@/components/quiz/QuizApp";
import { quizCopy } from "@/content/quiz";
import "@/components/quiz/quiz.css";

export async function generateMetadata({ params }: PageProps<"/[lang]/hangi-badem-sekeri">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = quizCopy[lang];
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function Page({ params }: PageProps<"/[lang]/hangi-badem-sekeri">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = quizCopy[lang];

  return (
    <>
      <header className="gk-quiz-head">
        <div className="container-x gk-quiz-head-inner">
          <h1 className="gk-quiz-title">{t.title}</h1>
          <p className="gk-quiz-lead">{t.lead}</p>
        </div>
        <KilimBand height={16} />
      </header>

      <section className="gk-quiz-stage" aria-label={t.title}>
        <div>
          <Suspense fallback={<div className="gk-quiz-card gk-quiz-skeleton" aria-hidden="true" />}>
            <QuizApp lang={lang} />
          </Suspense>
        </div>
        <p className="gk-quiz-note">{t.disclaimer}</p>
      </section>
    </>
  );
}
