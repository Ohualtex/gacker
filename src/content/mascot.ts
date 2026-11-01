import type { Locale } from "@/lib/i18n";

export type MascotBubbleKey = "offer" | "angry" | "return";

export type MascotStrings = {
  /** Standın ortasındaki görünür etiket (aynı zamanda düğmenin görünen metni). */
  standLabel: string;
  /** Düğmenin erişilebilir adı: görünen etiketi içerir. */
  ariaOpen: string;
  /** Asılı küçük tabela (dekoratif). */
  sign: string;
  /** Küçültülmüş modda asistanı açan hap düğmesi */
  pill: string;
  minimize: string;
  restore: string;
  bubbles: Record<MascotBubbleKey, string>;
};

export const mascotContent: Record<Locale, MascotStrings> = {
  tr: {
    standLabel: "Gakkocan ile konuşmak için dokun",
    ariaOpen: "Gakkocan ile konuşmak için dokun: asistanı aç",
    sign: "BADEM ŞEKERİ",
    pill: "Gakkocan'a sor",
    minimize: "Seyyar standı küçült",
    restore: "Seyyar standı göster",
    bubbles: {
      offer: "Badem şekeri ister misiniz?",
      angry: "Yavaş ol Gakkom!",
      return: "Geldim, taze şekerlerle!",
    },
  },
  en: {
    standLabel: "Tap to talk with Gakkocan",
    ariaOpen: "Tap to talk with Gakkocan: open the assistant",
    sign: "ALMOND CANDY",
    pill: "Ask Gakkocan",
    minimize: "Minimise the candy stand",
    restore: "Show the candy stand",
    bubbles: {
      offer: "Would you like some almond candy?",
      angry: "Easy there, Gakkom!",
      return: "Back with fresh candy!",
    },
  },
};
