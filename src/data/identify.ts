import type { Locale } from "@/lib/i18n";

type Localized = Record<Locale, string>;

export type IdentifyItem = {
  id: string;
  title: Localized;
  body: Localized;
};

/**
 * Orijinal Elazığ badem şekerini ayırt etme ölçütleri.
 * Kaynak: takım rehberi `src/data/guides/elazig_badem_sekeri_rehberi.md`.
 */
export const identifyCopy: Record<
  Locale,
  { title: string; lead: string; source: string }
> = {
  tr: {
    title: "Hakiki Elazığ badem şekerini nasıl ayırt edersiniz?",
    lead: "Kalın drajeden ayıran üç işaret. Rehberin ölçütleri; her tezgâhın şekeri birbirinin aynısı değildir.",
    source: "Gacker takımı — Elazığ Badem Şekeri Üretici Rehberi",
  },
  en: {
    title: "How to tell genuine Elazığ almond candy",
    lead: "Three marks that set it apart from a thick dragée. These are the guide’s tests; no two stalls taste the same.",
    source: "Team Gacker — Elazığ almond candy producer guide",
  },
};

export const identifyItems: IdentifyItem[] = [
  {
    id: "zar",
    title: { tr: "Zar gibi ince kabuk", en: "A shell as thin as frost" },
    body: {
      tr: "Fabrikasyon drajede şeker tabakası sert ve kalın olup dişe batabilir. Hakiki Elazığ badem şekerinde kabuk, bademin üzerini kar örtüsü gibi saran incecik, çıtır bir zardır; ağızda kolayca erir.",
      en: "On factory dragées the sugar can be hard and thick enough to jar the tooth. On a true Elazığ candy the coat is a thin, crisp film — frost on the almond — and it melts in the mouth.",
    },
  },
  {
    id: "badem",
    title: { tr: "Yerli Fırat havzası bademi", en: "Local Fırat-basin almonds" },
    body: {
      tr: "İthal bademler dolgun görünse de kuru kalabilir. Elazığ badem şekerinde Elazığ, Tunceli ve Fırat vadisinde yetişen aromatik, yağlı yerli bademler tercih edilir.",
      en: "Imported almonds can look plump and still taste dry. Elazığ candy prefers aromatic, oily local nuts from Elazığ, Tunceli and the Fırat valley.",
    },
  },
  {
    id: "pancar",
    title: { tr: "Pancar şekeri, glikoz değil", en: "Beet sugar, not glucose" },
    body: {
      tr: "Kaliteli üreticiler glikoz şurubu kullanmaz; kaplama kristal pancar şekeri şerbetiyle yapılır. Bu, boğazı yakmayan ferah bir tatlılık verir.",
      en: "Careful makers skip glucose syrup and coat with crystal beet-sugar syrup. The sweetness is clean and does not burn the throat.",
    },
  },
];
