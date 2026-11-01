import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { producers as copy } from "@/content/home";
import { producers } from "@/data/producers";
import { KilimBand } from "@/components/ui/KilimBand";
import { InViewWords, Rise } from "./motion";
import { ProducersRail } from "./ProducersRail";

function Motif({ i, color }: { i: number; color: string }) {
  const v = i % 4;
  return (
    <svg viewBox="0 0 240 36" className="h-9 w-full" preserveAspectRatio="xMinYMid slice" aria-hidden="true" fill="none" stroke={color} strokeWidth="1.5">
      {v === 0 &&
        Array.from({ length: 9 }, (_, k) => <path key={k} d={`M${14 + k * 26} 4 ${26 + k * 26} 18 ${14 + k * 26} 32 ${2 + k * 26} 18Z`} />)}
      {v === 1 &&
        Array.from({ length: 12 }, (_, k) => <path key={k} d={`M${k * 20} 30 ${10 + k * 20} 6 ${20 + k * 20} 30`} />)}
      {v === 2 &&
        Array.from({ length: 9 }, (_, k) => (
          <g key={k}>
            <path d={`M${14 + k * 26} 8 ${22 + k * 26} 18 ${14 + k * 26} 28 ${6 + k * 26} 18Z`} fill={color} stroke="none" opacity="0.8" />
          </g>
        ))}
      {v === 3 &&
        Array.from({ length: 10 }, (_, k) => <path key={k} d={`M${k * 24} 18H${k * 24 + 12}M${k * 24 + 18} 8V28`} />)}
    </svg>
  );
}

export function Producers({ lang }: { lang: Locale }) {
  const list = producers;
  return (
    <section className="relative bg-bone pb-24 pt-28 md:pt-40">
      <div className="container-x grid items-end gap-8 md:grid-cols-12">
        <InViewWords
          text={copy.title[lang]}
          className="text-[clamp(2.8rem,7.2vw,6rem)] md:col-span-7"
        />
        <Rise delay={0.25} className="md:col-span-5">
          <p className="max-w-md text-ink-2">{copy.lead[lang]}</p>
          <Link href={`/${lang}/ureticiler`} className="mt-6 inline-flex items-center gap-2 font-semibold text-kilim">
            <span className="link-underline">{copy.cta[lang]}</span>
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </Rise>
      </div>

      <div className="mt-12 md:mt-16">
        <ProducersRail prevLabel={copy.prev[lang]} nextLabel={copy.next[lang]} showControls={list.length > 1}>
          {list.length === 0 ? (
            <Rise className="snap-start" y={36}>
              <div className="relative flex min-h-[22rem] w-[min(86vw,44rem)] flex-col justify-between overflow-hidden rounded-[4px] bg-cream p-8 md:p-12">
                <Motif i={0} color="var(--kilim)" />
                <div>
                  <p className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.05]">{copy.emptyTitle[lang]}</p>
                  <p className="mt-4 max-w-md text-ink-2">{copy.emptyBody[lang]}</p>
                </div>
                <Motif i={2} color="var(--saffron)" />
              </div>
            </Rise>
          ) : (
            list.map((p, i) => (
              <Rise key={p.slug} x={90} y={0} delay={Math.min(i, 4) * 0.08} className="snap-start shrink-0" duration={1.05}>
                <Link
                  href={`/${lang}/ureticiler/${p.slug}`}
                  className="group relative flex h-[clamp(26rem,62vh,33rem)] w-[min(82vw,25rem)] flex-col justify-end overflow-hidden rounded-[4px] shadow-warm transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2"
                  style={{ marginTop: i % 2 === 0 ? "0rem" : "2.25rem" }}
                >
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(min-width: 768px) 25rem, 82vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-cream" />
                  )}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#1C0F0C]/88 via-[#1C0F0C]/28 to-transparent"
                  />
                  <div className="relative z-10 p-7 md:p-8">
                    {p.role && (
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#F4D9A8]">
                        {p.role[lang]}
                      </p>
                    )}
                    <h3 className="mt-3 text-[clamp(1.85rem,3vw,2.45rem)] leading-[1.05] text-[#FBF6EE]">
                      {p.name}
                    </h3>
                    <p className="mt-3 max-w-[28ch] text-[0.95rem] leading-snug text-[#FBF6EE]/82">
                      {p.tagline[lang]}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-[0.95rem] font-semibold text-[#FBF6EE]">
                      <span className="link-underline">{copy.open[lang]}</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
                    </span>
                  </div>
                </Link>
              </Rise>
            ))
          )}
        </ProducersRail>
      </div>
      <KilimBand height={16} />
    </section>
  );
}
