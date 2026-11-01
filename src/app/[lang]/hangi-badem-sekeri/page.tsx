import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, X } from "lucide-react";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import { KilimBand } from "@/components/ui/KilimBand";
import { QuizApp } from "@/components/quiz/QuizApp";
import { quizCopy } from "@/content/quiz";
import { getQuizQuestions } from "@/lib/cms/queries";
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
  const questions = await getQuizQuestions();

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
        <div className="gk-quiz-shell">
          <Link className="gk-quiz-close" href={`/${lang}`} aria-label={t.home} title={t.home}>
            <X size={18} aria-hidden="true" />
          </Link>
          <Suspense fallback={<div className="gk-quiz-card gk-quiz-skeleton" aria-hidden="true" />}>
            <QuizApp lang={lang} questions={questions} />
          </Suspense>
        </div>
        <Link className="gk-quiz-home" href={`/${lang}`}>
          <ArrowLeft size={17} aria-hidden="true" />
          {t.home}
        </Link>
        <p className="gk-quiz-note">{t.disclaimer}</p>
      </section>
    </>
  );
}
