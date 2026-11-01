"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BookOpen, Home, Images, Mail, Menu, Store, X } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { AlmondMark } from "@/components/ui/Logo";
import { LiquidNavbar, NimbusIcons, type LiquidNavItem } from "@/components/ui/liquid-glass-navbar";
import { LangSwitch } from "./LangSwitch";
import { ThemeToggle } from "./ThemeToggle";
import { MusicToggle } from "./MusicToggle";

const LINKS = [
  { key: "home", path: "", icon: <Home size={18} strokeWidth={1.8} />, fx: "glow" as const },
  { key: "story", path: "/hikaye", icon: <BookOpen size={18} strokeWidth={1.8} />, fx: "drop" as const },
  { key: "producers", path: "/ureticiler", icon: <Store size={18} strokeWidth={1.8} />, fx: "pop" as const },
  { key: "discover", path: "/kesfet", icon: NimbusIcons.globe, fx: "spin" as const },
  { key: "gallery", path: "/galeri", icon: <Images size={18} strokeWidth={1.8} />, fx: "wave" as const },
  { key: "contact", path: "/iletisim", icon: <Mail size={18} strokeWidth={1.8} />, fx: "none" as const },
] as const;

export function Navbar({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Pick<Dictionary, "nav" | "controls" | "brand">;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [tone, setTone] = useState<"light" | "dark">("light");

  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`;
  const overHero = isHome && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const apply = () =>
      setTone(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
    apply();
    const mo = new MutationObserver(apply);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, []);

  const href = (path: string) => `/${lang}${path}`;
  const isActive = (path: string) => (path === "" ? isHome : pathname.startsWith(href(path)));
  const active = Math.max(
    0,
    LINKS.findIndex(({ path }) => isActive(path)),
  );

  const items: LiquidNavItem[] = useMemo(
    () =>
      LINKS.map(({ key, path, icon, fx }) => ({
        label: dict.nav[key],
        href: href(path),
        icon,
        fx,
      })),
    // href depends on lang; dict.nav labels change with locale
    [dict.nav, lang],
  );

  const ink = overHero && tone === "light" ? "text-ink" : overHero ? "text-bone" : "text-ink";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className={`container-x flex h-[5.25rem] items-center justify-between ${ink}`}>
        <Link
          href={href("")}
          className="pointer-events-auto flex items-center gap-2.5"
          aria-label={dict.brand.name}
        >
          <AlmondMark className="h-8 w-6" />
          <span className="font-display text-xl leading-none tracking-tight">{dict.brand.short}</span>
        </Link>

        <div className="pointer-events-auto hidden lg:block">
          <LiquidNavbar items={items} active={active} tone={tone} sound={false} />
        </div>

        <div className="pointer-events-auto flex items-center gap-1">
          <LangSwitch current={lang} label={dict.controls.language} className="mr-2 hidden sm:flex" />
          <MusicToggle labels={{ on: dict.controls.musicOn, off: dict.controls.musicOff }} />
          <ThemeToggle
            labels={{
              theme: dict.controls.theme,
              light: dict.controls.themeLight,
              dark: dict.controls.themeDark,
              system: dict.controls.themeSystem,
            }}
          />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-current/10 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? dict.nav.close : dict.nav.menu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" strokeWidth={1.6} /> : <Menu className="h-5 w-5" strokeWidth={1.6} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto overflow-hidden border-t border-line bg-bone lg:hidden"
          >
            <nav aria-label="Mobile" className="container-x flex flex-col py-4 text-ink">
              {LINKS.map(({ key, path }) => (
                <Link
                  key={key}
                  href={href(path)}
                  aria-current={isActive(path) ? "page" : undefined}
                  className="border-b border-line py-4 font-display text-3xl"
                >
                  {dict.nav[key]}
                </Link>
              ))}
              <LangSwitch current={lang} label={dict.controls.language} className="pt-5 text-ink sm:hidden" />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
