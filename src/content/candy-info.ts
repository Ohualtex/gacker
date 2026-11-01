import type { Locale } from "@/lib/i18n";
import type { CandyFactCategory } from "@/data/candy-info";

export type CandyInfoContent = {
  title: string;
  lead: string;
  tabsLabel: string;
  tabs: Record<CandyFactCategory, string>;
  sourceLabel: string;
  sourceOpen: string;
  healthNote: string;
  allergyBadge: string;
  empty: string;
};

/** Hikâye sayfasındaki "Badem Şekeri Bilgi Köşesi" arayüz metinleri (kartların kendisi `src/data/candy-info.ts`). */
export const candyInfo: Record<Locale, CandyInfoContent> = {
  tr: {
    title: "Badem Şekeri Bilgi Köşesi",
    lead: "Badem şekeri nedir, nasıl yapılır, kültürdeki yeri ne, sağlık açısından neler bilinir? Her kartın altında bilginin geldiği kaynak var; merak edersen tıkla, aslına bak.",
    tabsLabel: "Bilgi kategorileri",
    tabs: {
      what: "Nedir?",
      making: "Nasıl yapılır?",
      culture: "Kültür",
      health: "Sağlık ve bilgi",
    },
    sourceLabel: "Kaynak",
    sourceOpen: "kaynağı yeni sekmede aç",
    healthNote:
      "Genel bilgi amaçlıdır, tıbbi tavsiye değildir; sağlıkla ilgili sorularınız için hekiminize danışın.",
    allergyBadge: "Alerji uyarısı: badem bir ağaç yemişi alerjenidir",
    empty: "Bu başlıkta henüz kart yok.",
  },
  en: {
    title: "Almond Candy Know-How",
    lead: "What is almond candy, how is it made, where does it sit in the culture, and what is known about it from a health point of view? Every card links to its source, so you can read the original.",
    tabsLabel: "Information categories",
    tabs: {
      what: "What is it?",
      making: "How is it made?",
      culture: "Culture",
      health: "Health & facts",
    },
    sourceLabel: "Source",
    sourceOpen: "open source in a new tab",
    healthNote:
      "For general information only, not medical advice; please consult your physician with any health-related questions.",
    allergyBadge: "Allergy notice: almond is a tree nut allergen",
    empty: "No cards in this section yet.",
  },
};
