import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Clock, MapPin, Phone } from "lucide-react";
import { hasLocale, locales } from "@/lib/i18n";
import { KilimBand } from "@/components/ui/KilimBand";
import { Reveal } from "@/components/ui/Reveal";
import { DemoBadge } from "@/components/producers/DemoBadge";
import { ProducerImage } from "@/components/producers/ProducerImage";
import { getProducer, mapsUrl, producers, splitPhones, type ProducerSocials } from "@/data/producers";
import { producersPage } from "@/content/producers-page";

export function generateStaticParams() {
  return locales.flatMap((lang) => producers.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/ureticiler/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const producer = getProducer(slug);
  if (!hasLocale(lang) || !producer) return {};
  return { title: producer.name, description: producer.tagline[lang] };
}

const SOCIAL_ORDER: (keyof ProducerSocials)[] = [
  "website",
  "instagram",
  "facebook",
  "x",
  "youtube",
  "tiktok",
];

export default async function Page({ params }: PageProps<"/[lang]/ureticiler/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const producer = getProducer(slug);
  if (!producer) notFound();

  const t = producersPage[lang];
  const d = t.detail;

  // Eski düz alanlar (website, instagram) ile socials birleştirilir.
  const socials: ProducerSocials = {
    website: producer.website,
    instagram: producer.instagram,
    ...producer.socials,
  };
  const socialLinks = SOCIAL_ORDER.flatMap((key) => {
    const url = socials[key];
    return url ? [{ key, url, label: d.socials[key] }] : [];
  });
  const map = mapsUrl(producer);
  const hasContact = Boolean(
    producer.address ||
      producer.phone ||
      socialLinks.length ||
      producer.hours ||
      producer.branches?.length ||
      producer.extraLinks?.length,
  );

  return (
    <>
      <header className="bg-cream pt-32">
        <div className="container-x pb-14">
          <Link
            href={`/${lang}/ureticiler`}
            className="group inline-flex items-center gap-2 py-2 text-ink-2 transition-colors hover:text-kilim"
          >
            <ArrowLeft
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
            <span className="link-underline">{d.back}</span>
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-ink-2">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              {producer.city}
            </span>
            {producer.demo && <DemoBadge label={t.demoBadge} />}
          </div>
          {producer.role && (
            <p className="mt-3 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-almond">
              {producer.role[lang]}
            </p>
          )}
          <h1 className="mt-3 max-w-[20ch] text-[clamp(2.25rem,5.4vw,4.25rem)]">{producer.name}</h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-2 md:text-xl">{producer.tagline[lang]}</p>
        </div>
        <KilimBand height={16} />
      </header>

      <div className="container-x grid gap-14 py-16 md:py-24 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-7">
          <ProducerImage
            producer={producer}
            label={d.imageLabel}
            hint={t.slotHint}
            motif="tray"
            sizes="(min-width: 1024px) 56vw, 100vw"
          />
          {producer.image && <p className="mt-3 text-sm text-ink-2">{t.imageCredit}</p>}
          <h2 className="mt-14 text-[clamp(1.75rem,3vw,2.5rem)]">{d.story}</h2>
          <p className="mt-5 max-w-[65ch] text-lg leading-relaxed text-ink-2">
            {producer.story[lang]}
          </p>
          {producer.products && producer.products.length > 0 && (
            <>
              <h2 className="mt-14 text-[clamp(1.75rem,3vw,2.5rem)]">{d.products}</h2>
              <ul className="mt-5 max-w-[65ch] divide-y divide-line border-y border-line">
                {producer.products.map((item) => (
                  <li key={item.tr} className="py-3 text-lg text-ink-2">
                    {item[lang]}
                  </li>
                ))}
              </ul>
            </>
          )}
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-5">
          <aside
            aria-labelledby="producer-contact"
            className="rounded-[4px] border border-line bg-cream p-7 shadow-warm lg:sticky lg:top-28"
          >
            <h2 id="producer-contact" className="text-2xl">
              {d.contact}
            </h2>

            {!hasContact && <p className="mt-4 text-ink-2">{d.noContact}</p>}

            <dl className="mt-6 divide-y divide-line">
              {producer.address && (
                <div className="py-4 first:pt-0">
                  <dt className="flex items-center gap-2 text-sm font-semibold text-almond">
                    <MapPin className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                    {d.address}
                  </dt>
                  <dd className="mt-1.5 text-ink">{producer.address}</dd>
                  {map && (
                    <a
                      href={map}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-3 inline-flex items-center gap-1.5 font-semibold text-kilim"
                    >
                      <span className="link-underline">{d.openInMaps}</span>
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  )}
                </div>
              )}

              {!producer.address && map && (
                <div className="py-4 first:pt-0">
                  <a
                    href={map}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 font-semibold text-kilim"
                  >
                    <MapPin className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                    <span className="link-underline">{d.openInMaps}</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              )}

              {splitPhones(producer.phone).length > 0 && (
                <div className="py-4 first:pt-0">
                  <dt className="flex items-center gap-2 text-sm font-semibold text-almond">
                    <Phone className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                    {d.phone}
                  </dt>
                  <dd className="mt-1.5 flex flex-col gap-1.5">
                    {splitPhones(producer.phone).map((n) => (
                      <a
                        key={n}
                        href={`tel:${n.replace(/[^+\d]/g, "")}`}
                        className="text-ink tabular-nums link-underline"
                      >
                        {n}
                      </a>
                    ))}
                  </dd>
                </div>
              )}

              {producer.branches && producer.branches.length > 0 && (
                <div className="py-4 first:pt-0">
                  <dt className="text-sm font-semibold text-almond">{t.branches}</dt>
                  <dd className="mt-2">
                    <ul className="space-y-2 text-ink">
                      {producer.branches.map((b) => (
                        <li key={b.tr}>{b[lang]}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}

              {producer.hours && (
                <div className="py-4 first:pt-0">
                  <dt className="flex items-center gap-2 text-sm font-semibold text-almond">
                    <Clock className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                    {d.hours}
                  </dt>
                  <dd className="mt-1.5 text-ink">{producer.hours[lang]}</dd>
                </div>
              )}

              {(socialLinks.length > 0 || (producer.extraLinks && producer.extraLinks.length > 0)) && (
                <div className="py-4 first:pt-0">
                  <dt className="text-sm font-semibold text-almond">{d.links}</dt>
                  <dd className="mt-2">
                    <ul className="flex flex-wrap gap-x-5 gap-y-2">
                      {socialLinks.map((s) => (
                        <li key={s.key}>
                          <a
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-1 font-semibold text-kilim"
                          >
                            <span className="link-underline">{s.label}</span>
                            <ArrowUpRight
                              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                              aria-hidden="true"
                            />
                          </a>
                        </li>
                      ))}
                      {producer.extraLinks?.map((link) => (
                        <li key={link.url}>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-1 font-semibold text-kilim"
                          >
                            <span className="link-underline">{link.label[lang]}</span>
                            <ArrowUpRight
                              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                              aria-hidden="true"
                            />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}
            </dl>
          </aside>
        </Reveal>
      </div>
    </>
  );
}
