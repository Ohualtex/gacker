import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLiveDictionary } from "@/lib/cms/queries";
import { hasLocale, locales } from "@/lib/i18n";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AssistantWidget } from "@/components/assistant/AssistantWidget";
import { MascotMount } from "@/components/mascot/MascotMount";
import { CookieNotice } from "@/components/legal/CookieNotice";
import { FilmHandoff, FilmPopup } from "@/components/film/FilmPopup";
import { QuizInvite } from "@/components/quiz/QuizInvite";
import { getSiteUrl } from "@/lib/site-url";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getLiveDictionary(lang);
  return {
    metadataBase: new URL(getSiteUrl()),
    title: { default: dict.meta.title, template: `%s | ${dict.brand.name}` },
    description: dict.meta.description,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getLiveDictionary(lang);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-kilim focus:px-4 focus:py-2 focus:text-bone"
      >
        {dict.nav.skip}
      </a>
      <Navbar lang={lang} dict={dict} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer lang={lang} dict={dict} />
      <AssistantWidget lang={lang} hideLauncher />
      <MascotMount lang={lang} />
      <CookieNotice lang={lang} />
      <FilmPopup lang={lang} />
      <FilmHandoff />
      <QuizInvite lang={lang} />
    </>
  );
}
