import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { getDictionary } from "@/lib/dictionaries";
import { hasLocale } from "@/lib/i18n";
import { PageHeader } from "@/components/ui/PageHeader";
import { KilimBand } from "@/components/ui/KilimBand";
import { Reveal } from "@/components/ui/Reveal";
import { StoryChapters } from "@/components/story/StoryChapters";
import { CandyInfo } from "@/components/story/CandyInfo";
import { IdentifyCriteria } from "@/components/story/IdentifyCriteria";
import { story } from "@/content/story";
import { candyInfo } from "@/content/candy-info";
import { candyFacts } from "@/data/candy-info";

export async function generateMetadata({ params }: PageProps<"/[lang]/hikaye">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);
  return { title: dict.pages.story.title, description: dict.pages.story.lead };
}

export default async function Page({ params }: PageProps<"/[lang]/hikaye">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const content = story[lang];

  return (
    <>
      <PageHeader title={dict.pages.story.title} lead={dict.pages.story.lead} />
      <StoryChapters content={content} />
      <KilimBand height={16} />
      <CandyInfo lang={lang} facts={candyFacts} content={candyInfo[lang]} />
      <KilimBand height={16} />
      <IdentifyCriteria lang={lang} />
      <KilimBand height={16} />
      <section className="bg-cream">
        <div className="container-x flex flex-col items-start gap-8 py-20 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-2xl">
            <h2 className="text-[clamp(2rem,4vw,3.25rem)]">{content.closing.title}</h2>
            <p className="mt-5 max-w-xl text-lg text-ink-2">{content.closing.body}</p>
          </Reveal>
          <Link
            href={`/${lang}/ureticiler`}
            className="group inline-flex items-center gap-2 rounded-sm bg-kilim px-7 py-3.5 text-[0.95rem] font-semibold text-[var(--on-kilim)] shadow-warm transition-transform duration-300 hover:-translate-y-0.5"
          >
            {content.closing.cta}
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </section>
    </>
  );
}
