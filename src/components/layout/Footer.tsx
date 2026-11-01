import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { KilimBand } from "@/components/ui/KilimBand";
import { AlmondMark } from "@/components/ui/Logo";
import { FooterMap } from "@/components/layout/FooterMap";
import { FolkDance } from "@/components/folk/FolkDance";
import { legalNavLabels, legalSlugs, legalUi } from "@/content/legal";
import { NoticePreferencesButton } from "@/components/legal/NoticePreferencesButton";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const links = [
    { href: `/${lang}/hikaye`, label: dict.nav.story },
    { href: `/${lang}/ureticiler`, label: dict.nav.producers },
    { href: `/${lang}/kesfet`, label: dict.nav.discover },
    { href: `/${lang}/iletisim`, label: dict.nav.contact },
  ];
  return (
    <footer className="mt-32 bg-cream">
      <KilimBand height={22} />
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <AlmondMark className="h-10 w-8" />
            <span className="font-display text-3xl">{dict.brand.name}</span>
          </div>
          <p className="mt-5 text-sm text-ink-2">{dict.footer.event}</p>
        </div>
        <nav aria-label={dict.footer.explore}>
          <h2 className="font-display text-xl">{dict.footer.explore}</h2>
          <ul className="mt-4 space-y-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-underline text-ink-2 hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div id="footer-map">
          <FooterMap lang={lang} />
        </div>
      </div>
      <FolkDance lang={lang} />
      <div className="border-t border-line">
        <p className="container-x pt-6 text-ink-2">{dict.footer.builtBy}</p>
        <nav
          aria-label={legalUi[lang].footerLegalLabel}
          className="container-x flex flex-wrap items-center gap-x-6 gap-y-1 pt-2 text-sm"
        >
          {legalSlugs.map((slug) => (
            <Link
              key={slug}
              href={`/${lang}/${slug}`}
              className="link-underline inline-flex min-h-8 items-center text-ink-2 hover:text-ink"
            >
              {legalNavLabels[lang][slug]}
            </Link>
          ))}
          <NoticePreferencesButton
            label={legalUi[lang].manageNotice}
            className="link-underline inline-flex min-h-8 items-center text-ink-2 hover:text-ink"
          />
        </nav>
        <p className="container-x py-4 text-sm text-ink-2">{dict.footer.rights}</p>
      </div>
    </footer>
  );
}
