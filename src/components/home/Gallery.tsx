import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { gallery as copy } from "@/content/home";
import { galleryCopy } from "@/content/gallery";
import { getGalleryItems } from "@/lib/cms/queries";
import { Rise, ClipReveal } from "./motion";

type Motif = "branch" | "kazan" | "tray" | "tower" | "blossom" | "kilim";

function MotifArt({ motif }: { motif: Motif }) {
  const stroke = { fill: "none", stroke: "var(--almond)", strokeWidth: 2, strokeLinecap: "round" as const };
  switch (motif) {
    case "branch":
      return (
        <g>
          <path d="M20 40Q120 120 260 70" {...stroke} strokeWidth="5" />
          {[70, 130, 190].map((x, i) => (
            <g key={x} transform={`translate(${x} ${90 + (i % 2) * 6})`}>
              <path d="M0 0V16" {...stroke} />
              <path d="M0 18C9 24 11 38 0 46C-11 38 -9 24 0 18Z" fill="var(--olive)" opacity="0.85" />
            </g>
          ))}
          <circle cx="250" cy="64" r="9" fill="var(--kilim)" opacity="0.7" />
          <circle cx="100" cy="86" r="7" fill="var(--kilim)" opacity="0.55" />
        </g>
      );
    case "kazan":
      return (
        <g>
          <ellipse cx="150" cy="86" rx="112" ry="46" fill="var(--almond)" />
          <ellipse cx="150" cy="82" rx="96" ry="36" fill="var(--kilim-deep)" opacity="0.6" />
          {[110, 140, 172, 128, 160].map((x, i) => (
            <ellipse key={i} cx={x} cy={74 + (i % 3) * 8} rx="9" ry="6" fill="var(--bone)" />
          ))}
          <path d="M96 40Q110 14 100 0M150 34Q164 10 154 -6M200 40Q214 16 204 2" {...stroke} stroke="var(--ink-2)" opacity="0.35" />
        </g>
      );
    case "tray":
      return (
        <g>
          <ellipse cx="150" cy="86" rx="118" ry="52" fill="var(--almond)" />
          <ellipse cx="150" cy="84" rx="100" ry="40" fill="var(--kilim-deep)" opacity="0.5" />
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i / 12) * Math.PI * 2;
            return <ellipse key={i} cx={Math.round(150 + Math.cos(a) * 62)} cy={Math.round(84 + Math.sin(a) * 24)} rx="8" ry="5.5" fill="var(--bone)" />;
          })}
          <ellipse cx="150" cy="84" rx="9" ry="6" fill="var(--saffron)" />
        </g>
      );
    case "tower":
      return (
        <g>
          <circle cx="232" cy="38" r="20" fill="var(--saffron)" opacity="0.8" />
          <path d="M70 140V70h14v-12h14v12h16V50h14v20h16V58h14v12h14v70Z" fill="var(--almond)" opacity="0.85" />
          <path d="M120 140v-26a14 14 0 0 1 28 0v26Z" fill="var(--bone)" />
        </g>
      );
    case "blossom":
      return (
        <g transform="translate(150 80)">
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} cx="0" cy="-26" rx="17" ry="28" transform={`rotate(${a})`} fill="var(--bone)" stroke="var(--kilim)" strokeWidth="1.5" opacity="0.95" />
          ))}
          <circle r="9" fill="var(--saffron)" />
        </g>
      );
    case "kilim":
      return (
        <g>
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M150 ${14 + i * 14} ${230 - i * 26} 80 150 ${146 - i * 14} ${70 + i * 26} 80Z`} fill={i === 1 ? "var(--saffron)" : "none"} stroke="var(--kilim)" strokeWidth="2" opacity={i === 1 ? 0.8 : 1} />
          ))}
        </g>
      );
  }
}

/** Duvar: kare id'leri src/content/gallery.ts (manifest) ile eşleşir; dosya yoksa tasarlanmış yer tutucu görünür. */
const TILES: { id: string; motif: Motif; span: string; ratio: string; offset: string }[] = [
  { id: "almond-blossom-branch", motif: "branch", span: "col-span-2 md:col-span-5", ratio: "3 / 4", offset: "" },
  { id: "copper-kazan-steam", motif: "kazan", span: "col-span-1 md:col-span-4", ratio: "4 / 3", offset: "md:mt-20" },
  { id: "hands-pouring-candies", motif: "tray", span: "col-span-1 md:col-span-3", ratio: "3 / 4", offset: "md:mt-4" },
  { id: "stone-workshop-interior", motif: "tower", span: "col-span-1 md:col-span-3", ratio: "3 / 4", offset: "md:mt-14" },
  { id: "pastel-almonds-copper-tray", motif: "blossom", span: "col-span-1 md:col-span-4", ratio: "1 / 1", offset: "md:mt-8" },
  { id: "kilim-textile-detail", motif: "kilim", span: "col-span-2 md:col-span-5", ratio: "4 / 3", offset: "md:mt-2" },
];

export async function Gallery({ lang }: { lang: Locale }) {
  const captions = copy.captions[lang];
  const badge = galleryCopy[lang].aiBadge;
  const galleryItems = await getGalleryItems();
  return (
    <section className="relative overflow-hidden bg-bone pb-32 pt-24 md:pb-44 md:pt-36">
      <div className="container-x grid items-end gap-8 md:grid-cols-12">
        <Rise blur={14} y={24} duration={1.4} className="md:col-span-7">
          <h2 className="text-[clamp(2.8rem,7vw,5.8rem)]">{copy.title[lang]}</h2>
        </Rise>
        <Rise delay={0.25} className="md:col-span-5">
          <p className="max-w-md text-ink-2">{copy.body[lang]}</p>
          <Link href={`/${lang}/galeri`} className="mt-6 inline-flex items-center gap-2 font-semibold text-kilim">
            <span className="link-underline">{copy.cta[lang]}</span>
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </Rise>
      </div>

      <div className="container-x mt-14 grid grid-cols-2 items-start gap-x-4 gap-y-8 md:mt-20 md:grid-cols-12 md:gap-x-8 md:gap-y-16">
        {TILES.map((t, i) => {
          const item = galleryItems.find((g) => g.id === t.id);
          const src = item?.src;
          const caption = item ? item.caption[lang] : captions[i];
          const ratio = item ? `${item.w} / ${item.h}` : t.ratio;
          return (
            <div key={t.id} className={`${t.span} ${t.offset}`}>
              <ClipReveal delay={(i % 3) * 0.12}>
                <Link
                  href={`/${lang}/galeri`}
                  className="group block rounded-[3px] border border-line bg-cream p-2.5 shadow-warm transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 md:p-3.5"
                >
                  <div
                    className="relative overflow-hidden rounded-[2px]"
                    style={{
                      aspectRatio: ratio,
                      background: "color-mix(in srgb, var(--almond) 11%, var(--bone))",
                    }}
                  >
                    {src ? (
                      <Image
                        src={src}
                        alt={item ? item.alt[lang] : caption}
                        fill
                        sizes="(min-width: 768px) 40vw, 90vw"
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                      />
                    ) : (
                      <>
                        <svg aria-hidden="true" className="absolute inset-0 h-full w-full text-line">
                          <defs>
                            <pattern id={`gw-${t.motif}`} width="30" height="30" patternUnits="userSpaceOnUse">
                              <path d="M15 0 30 15 15 30 0 15Z" fill="none" stroke="currentColor" strokeWidth="1" />
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill={`url(#gw-${t.motif})`} />
                        </svg>
                        <svg viewBox="0 0 300 160" className="absolute inset-0 m-auto h-[70%] w-[88%]" aria-hidden="true">
                          <MotifArt motif={t.motif} />
                        </svg>
                      </>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 px-1 pb-1 pt-3 md:flex-row md:items-baseline md:justify-between md:gap-3">
                    <span className="font-display text-[1.05rem] leading-tight md:text-[1.25rem]">{caption}</span>
                    <span className="shrink-0 text-[0.75rem] text-ink-2">{src ? (item?.ai ? badge : "") : copy.soon[lang]}</span>
                  </div>
                </Link>
              </ClipReveal>
            </div>
          );
        })}
      </div>
    </section>
  );
}
