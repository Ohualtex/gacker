import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { KilimBand } from "@/components/ui/KilimBand";
import { RevealWords } from "@/components/ui/RevealWords";
import { getGalleryItems } from "@/lib/cms/queries";
import { HeroBand } from "./HeroBand";
import { HeroVideo } from "./HeroVideo";

/**
 * Giriş: tam ekran sahne. Tanıtım videosu hazır olunca (`/media/hero.mp4`) sahnenin üstüne biner;
 * dosya yoksa tasarlanmış altın saat sahnesi görünür. Maskot `#hero-mascot` yuvasına bağlanır.
 */
/** Video dosyası yoksa hiç istek atılmaz (konsolda 404 kalmaz); dosya gelince otomatik devreye girer. */
function heroSources() {
  const dir = path.join(process.cwd(), "public", "media");
  return [
    { src: "/media/hero.webm", type: "video/webm" },
    { src: "/media/hero.mp4", type: "video/mp4" },
  ].filter((s) => fs.existsSync(path.join(dir, s.src.split("/").pop() as string)));
}

export async function Hero({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const sources = heroSources();
  const gallery = await getGalleryItems();
  return (
    <section
      data-video={sources.length > 0 ? "true" : "false"}
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-[var(--hero-bg)] text-[var(--hero-fg)]"
    >
      <HeroBand images={gallery.map((item) => ({ src: item.src, alt: item.alt[lang] }))} />
      {sources.length > 0 && <HeroVideo label={dict.hero.videoLabel} sources={sources} />}
      <div aria-hidden="true" className="hm-heroScrim absolute inset-0 -z-10" />

      <div className="container-x pb-24 pt-44 md:pb-32">
        <RevealWords
          text={dict.hero.title}
          className="hm-heroTitle max-w-[15ch] text-[clamp(2.9rem,8.4vw,6.4rem)]"
        />
        <p className="mt-7 max-w-xl text-lg text-[var(--hero-fg-2)] md:text-xl">{dict.hero.lead}</p>
        <div className="mt-10 flex flex-wrap items-center gap-5">
          <Link
            href={`/${lang}/hikaye`}
            className="rounded-sm bg-kilim px-7 py-3.5 text-[0.95rem] font-semibold text-[var(--on-kilim)] shadow-warm transition-transform duration-300 hover:-translate-y-0.5"
          >
            {dict.hero.ctaStory}
          </Link>
          <Link href={`/${lang}/ureticiler`} className="link-underline py-2 text-[0.95rem] font-semibold">
            {dict.hero.ctaProducers}
          </Link>
        </div>
      </div>

      <div id="hero-mascot" aria-hidden="true" />
      <KilimBand height={24} />
    </section>
  );
}
