import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, MapPin } from "lucide-react";
import { getDictionary } from "@/lib/dictionaries";
import { hasLocale } from "@/lib/i18n";
import { PageHeader } from "@/components/ui/PageHeader";
import { ImageSlot, type Motif } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";
import { DemoBadge } from "@/components/producers/DemoBadge";
import { ProducerImage } from "@/components/producers/ProducerImage";
import { producers } from "@/data/producers";
import { producersPage } from "@/content/producers-page";
import { IdentifyCriteria } from "@/components/story/IdentifyCriteria";
import { KilimBand } from "@/components/ui/KilimBand";

const MOTIFS: Motif[] = ["tray", "candy", "pan"];

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/ureticiler">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);
  return { title: dict.pages.producers.title, description: dict.pages.producers.lead };
}

export default async function Page({ params }: PageProps<"/[lang]/ureticiler">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = producersPage[lang];
  const hasDemo = producers.some((p) => p.demo);

  return (
    <>
      <PageHeader title={dict.pages.producers.title} lead={dict.pages.producers.lead} />

      {producers.length === 0 ? (
        <section className="container-x grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
          <Reveal>
            <h2 className="text-[clamp(2rem,4vw,3.25rem)]">{t.empty.title}</h2>
            <p className="mt-5 max-w-xl text-lg text-ink-2">{t.empty.body}</p>
            <Link
              href={`/${lang}/iletisim`}
              className="group mt-8 inline-flex items-center gap-2 rounded-sm bg-kilim px-7 py-3.5 text-[0.95rem] font-semibold text-[var(--on-kilim)] shadow-warm transition-transform duration-300 hover:-translate-y-0.5"
            >
              {t.empty.cta}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
          <ImageSlot label={t.detail.imageLabel} hint={t.slotHint} motif="tray" />
        </section>
      ) : (
        <section className="container-x py-14 md:py-20">
          {hasDemo ? (
            <p className="max-w-2xl text-ink-2">{t.demoNote}</p>
          ) : (
            <p className="max-w-2xl text-ink-2">{t.guideNote}</p>
          )}
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {producers.map((p, i) => (
              <li key={p.slug}>
                <Reveal>
                  <Link
                    href={`/${lang}/ureticiler/${p.slug}`}
                    className="group grid items-center gap-6 py-10 md:grid-cols-12 md:gap-12 md:py-14"
                  >
                    <div
                      className={`overflow-hidden rounded-[4px] md:col-span-5 ${
                        i % 2 === 1 ? "md:col-start-8 md:row-start-1" : ""
                      }`}
                    >
                      <ProducerImage
                        producer={p}
                        label={p.name}
                        hint={t.slotHint}
                        showLabel={false}
                        motif={MOTIFS[i % MOTIFS.length]}
                        sizes="(min-width: 768px) 40vw, 100vw"
                        className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                      />
                    </div>
                    <div
                      className={`md:col-span-7 ${i % 2 === 1 ? "md:col-start-1 md:row-start-1" : ""}`}
                    >
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-ink-2">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                          {p.city}
                        </span>
                        {p.demo && <DemoBadge label={t.demoBadge} />}
                      </div>
                      {p.role && (
                        <p className="mt-3 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-almond">
                          {p.role[lang]}
                        </p>
                      )}
                      <h2 className="mt-3 text-[clamp(1.75rem,3.4vw,2.75rem)] transition-colors duration-300 group-hover:text-kilim">
                        {p.name}
                      </h2>
                      <p className="mt-4 max-w-xl text-lg text-ink-2">{p.tagline[lang]}</p>
                      <span className="mt-6 inline-flex items-center gap-2 font-semibold text-kilim">
                        <span className="link-underline">{t.viewProducer}</span>
                        <ArrowUpRight
                          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>
      )}
      <KilimBand height={16} />
      <IdentifyCriteria lang={lang} />
    </>
  );
}
