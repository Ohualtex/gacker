import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { galleryCopy, galleryHref, galleryItems } from "@/content/gallery";

/**
 * Ana sayfa için galeri tanıtımı: manifest'teki ilk `count` (en çok 6) görsel, dağınık duvar kompozisyonunda.
 * Görsellere tıklayınca /[lang]/galeri açılır. Yapay zekâ bildirimi her zaman görünür.
 *
 * Props:
 * - lang: "tr" | "en" (zorunlu)
 * - count?: 1-6, varsayılan 6
 * - showHeading?: başlık + ilk cümle + "Galeriyi gez" bağlantısı (varsayılan true)
 * - className?: dış <section> için ek sınıf (arka plan/boşluk ana sayfadan verilir)
 */
const SLOTS = [
  "col-span-1 aspect-[3/4] md:col-span-4",
  "col-span-1 mt-10 aspect-[3/4] md:col-span-5 md:mt-16 md:aspect-[4/3]",
  "col-span-2 aspect-[16/9] md:col-span-3 md:mt-4 md:aspect-square",
  "col-span-1 aspect-[3/4] md:col-span-3",
  "col-span-1 mt-10 aspect-[3/4] md:col-span-5 md:mt-12 md:aspect-[16/10]",
  "col-span-2 aspect-[16/9] md:col-span-4 md:-mt-6 md:aspect-[4/3]",
] as const;

export function GalleryWall({
  lang,
  count = 6,
  showHeading = true,
  className = "",
}: {
  lang: Locale;
  count?: number;
  showHeading?: boolean;
  className?: string;
}) {
  const c = galleryCopy[lang];
  const items = galleryItems.slice(0, Math.min(Math.max(count, 1), SLOTS.length));
  const href = galleryHref(lang);

  return (
    <section className={className} aria-label={c.teaserTitle}>
      {showHeading && (
        <div className="mb-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-4 md:mb-14">
          <div className="max-w-xl">
            <h2 className="text-[clamp(2rem,4.5vw,3.5rem)]">{c.teaserTitle}</h2>
            <p className="mt-4 text-lg text-ink-2">{c.teaserLead}</p>
          </div>
          <Link
            href={href}
            className="group inline-flex min-h-11 items-center gap-2 font-medium text-kilim"
          >
            <span className="link-underline">{c.teaserCta}</span>
            <ArrowRight
              className="h-5 w-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
              strokeWidth={1.75}
              aria-hidden="true"
            />
          </Link>
        </div>
      )}

      <div className="grid grid-cols-2 items-start gap-3 sm:gap-5 md:grid-cols-12 md:gap-6">
        {items.map((item, i) => (
          <Reveal key={item.id} delay={(i % 3) * 0.08} className={SLOTS[i]}>
            <Link
              href={href}
              aria-label={item.caption[lang]}
              className="group relative block h-full w-full overflow-hidden rounded-[3px] shadow-warm"
            >
              <Image
                src={item.src}
                alt={item.alt[lang]}
                fill
                sizes="(min-width: 768px) 30vw, 50vw"
                className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
              />
            </Link>
          </Reveal>
        ))}
      </div>

      <p className="mt-6 flex items-center gap-2 text-sm text-ink-2">
        <Sparkles className="h-4 w-4 shrink-0 text-kilim" strokeWidth={1.75} aria-hidden="true" />
        {c.aiNote}
      </p>
    </section>
  );
}
