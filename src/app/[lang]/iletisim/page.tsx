import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Mail } from "lucide-react";
import { getDictionary } from "@/lib/dictionaries";
import { hasLocale } from "@/lib/i18n";
import { PageHeader } from "@/components/ui/PageHeader";
import { AlmondMark } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";
import { CONTACT_EMAIL, contact } from "@/content/contact";

export async function generateMetadata({ params }: PageProps<"/[lang]/iletisim">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);
  return { title: dict.pages.contact.title, description: dict.pages.contact.lead };
}

export default async function Page({ params }: PageProps<"/[lang]/iletisim">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = contact[lang];

  return (
    <>
      <PageHeader title={dict.pages.contact.title} lead={dict.pages.contact.lead} />

      <section className="container-x grid gap-16 py-16 md:py-24 lg:grid-cols-12 lg:gap-24">
        <Reveal className="lg:col-span-6">
          <div className="flex items-center gap-4">
            <AlmondMark className="h-14 w-11" />
            <p className="font-display text-[clamp(3rem,7vw,5.5rem)] leading-none">{t.credit.team}</p>
          </div>
          <h2 className="mt-8 text-[clamp(1.5rem,2.6vw,2.125rem)]">{t.credit.title}</h2>
          <p className="mt-4 max-w-[34rem] text-lg text-ink-2">{t.credit.body}</p>

          <div className="mt-12 border-t border-line pt-8">
            <h2 className="text-2xl">{t.reach.title}</h2>
            <p className="mt-3 text-ink-2">{t.reach.body}</p>
            {CONTACT_EMAIL ? (
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="group mt-5 inline-flex items-center gap-2 font-semibold text-kilim"
              >
                <Mail className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                <span className="link-underline">{t.reach.emailLabel}</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : (
              <p className="mt-5 inline-flex items-center gap-2 text-ink-2">
                <Mail className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                {t.reach.emailPending}
              </p>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-6">
          <div className="rounded-[4px] bg-cream p-8 shadow-warm md:p-10">
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)]">{t.producers.title}</h2>
            <p className="mt-4 text-lg text-ink-2">{t.producers.body}</p>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {t.producers.items.map((item) => (
                <li key={item} className="py-3 text-ink">
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href={`/${lang}/ureticiler`}
              className="group mt-8 inline-flex items-center gap-2 font-semibold text-kilim"
            >
              <span className="link-underline">{t.producers.cta}</span>
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
