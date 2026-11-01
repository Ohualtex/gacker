import { notFound } from "next/navigation";
import { getLiveDictionary } from "@/lib/cms/queries";
import { hasLocale } from "@/lib/i18n";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { StoryStage } from "@/components/home/StoryStage";
import { Producers } from "@/components/home/Producers";
import { Discover } from "@/components/home/Discover";
import { Gallery } from "@/components/home/Gallery";
import { QuizTeaser } from "@/components/quiz/QuizTeaser";
import { AssistantCta } from "@/components/home/AssistantCta";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getLiveDictionary(lang);

  return (
    <>
      <Hero lang={lang} dict={dict} />
      <Marquee lang={lang} />
      <StoryStage lang={lang} />
      <Producers lang={lang} />
      <Discover lang={lang} />
      <Gallery lang={lang} />
      <section className="bg-bone pb-10 pt-2 md:pb-16">
        <div className="container-x">
          <QuizTeaser lang={lang} />
        </div>
      </section>
      <AssistantCta lang={lang} />
    </>
  );
}
