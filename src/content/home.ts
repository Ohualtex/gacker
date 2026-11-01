import type { Locale } from "@/lib/i18n";

type L<T> = Record<Locale, T>;

/**
 * Ana sayfa metinleri (TR + EN birlikte).
 * Süreç anlatımı yalnızca basında (AA/NTV) doğrulanan adımlarla sınırlıdır:
 * iri yerel bademler kavrulur; şeker kazanda eritilip şerbet olur; badem dönen kazanda dönerken
 * şerbet dökülür, sıcak hava üflenir; ince katmanlar hâlinde sarılır ve bu birkaç kez tekrarlanır.
 */

export const marquee: L<string[]> = {
  tr: ["Elazığ", "Badem", "Şerbet", "Bakır", "Kilim", "Sofra"],
  en: ["Elazığ", "Almond", "Syrup", "Copper", "Kilim", "Table"],
};

export type Chapter = { title: string; body: string };

export const stage: {
  label: L<string>;
  chapters: L<[Chapter, Chapter, Chapter]>;
  final: L<string>;
} = {
  label: {
    tr: "Bir badem şekerinin yolculuğu: ağaçtan tepsiye üç adım",
    en: "The journey of an almond candy: three steps from tree to tray",
  },
  chapters: {
    tr: [
      {
        title: "Dalda başlar.",
        body: "Yeşil kabuğuyla dalda sallanan bademler toplanıp sepete bırakılır. Şekere dönüşecek olan, Elazığ’ın iri yerel bademleridir.",
      },
      {
        title: "Kazanda, kat kat.",
        body: "Bademler kavrulur. Şeker kazanda eritilip şerbet olur. Badem dönen kazanda dönerken şerbet dökülür, sıcak hava üflenir; ince katmanlar hâlinde sarılır ve bu birkaç kez tekrarlanır.",
      },
      {
        title: "Elazığ’dan sofranıza.",
        body: "Sarılan bademler bakır tepsiye dizilir. Geriye onu kimin için yaptığınız kalır.",
      },
    ],
    en: [
      {
        title: "It starts on the branch.",
        body: "Almonds swaying in their green skins are gathered and dropped into the basket. What turns into candy is Elazığ’s large local almond.",
      },
      {
        title: "In the kazan, layer by layer.",
        body: "The almonds are roasted. Sugar is melted in the kazan into a syrup. While the almonds turn in the rotating kazan, syrup is poured and warm air is blown; they are coated in thin layers, and this is repeated several times.",
      },
      {
        title: "From Elazığ to your table.",
        body: "The coated almonds are arranged on a copper tray. What is left is deciding who you made them for.",
      },
    ],
  },
  final: { tr: "Elazığ’dan sofranıza.", en: "From Elazığ to your table." },
};

export const producers = {
  title: { tr: "Şekeri yapan eller", en: "The hands behind the candy" } as L<string>,
  lead: {
    tr: "Kapalı Çarşı’dan kooperatife: sekiz üretici, kendi hikâyeleri, ürünleri ve adresleriyle.",
    en: "From the covered bazaar to the cooperative: eight makers, with their stories, products and addresses.",
  } as L<string>,
  cta: { tr: "Tüm üreticiler", en: "All producers" } as L<string>,
  open: { tr: "Tanışın", en: "Meet them" } as L<string>,
  demo: { tr: "Örnek içerik", en: "Sample content" } as L<string>,
  prev: { tr: "Önceki üreticiler", en: "Previous producers" } as L<string>,
  next: { tr: "Sonraki üreticiler", en: "Next producers" } as L<string>,
  emptyTitle: { tr: "Eller sofraya hazırlanıyor.", en: "The hands are getting ready." } as L<string>,
  emptyBody: {
    tr: "Üreticilerin doğrulanmış bilgileri eklendikçe burada belirecek.",
    en: "Producers will appear here as their verified details are added.",
  } as L<string>,
};

export const discover = {
  title: { tr: "Şeker yolundan Elazığ’a.", en: "From the candy trail to Elazığ." } as L<string>,
  body: {
    tr: "Harput’tan Hazar Gölü’ne, Keban’dan Palu’ya: şekeri aldığınız yerin çevresinde görülecek yerler, haritada tek bakışta.",
    en: "From Harput to Lake Hazar, from Keban to Palu: places worth seeing around where you buy the candy, on one map.",
  } as L<string>,
  cta: { tr: "Haritayı aç", en: "Open the map" } as L<string>,
  mapLabel: {
    tr: "Elazığ ilçelerini ve bazı gezilecek yerleri gösteren harita",
    en: "Map showing the districts of Elazığ and a few places to visit",
  } as L<string>,
};

/** Haritadaki işaretler: id → etiket yönü. Koordinatlar public/data/elazig-places.json'dan gelir. */
export const discoverMarkers: { id: string; side: "l" | "r"; dy?: number }[] = [
  { id: "harput-kalesi", side: "r", dy: -2 },
  { id: "buzluk-magarasi", side: "r", dy: -12 },
  { id: "elazig-merkez", side: "l", dy: 4 },
  { id: "hazar-golu", side: "r" },
  { id: "keban-baraji", side: "l" },
  { id: "baskil", side: "l" },
  { id: "agin", side: "l" },
  { id: "palu", side: "r" },
  { id: "sivrice", side: "l", dy: 6 },
];

export const gallery = {
  title: { tr: "Duvarda ne var?", en: "What hangs on the wall?" } as L<string>,
  body: {
    tr: "Çiçek açan dal, bakır kazan, tepsi ve kilim. Yapay zekâ ile üretilmiş illüstrasyonlardan küçük bir seçki.",
    en: "Blossoming branch, copper pan, tray and kilim. A small selection of AI-generated illustrations.",
  } as L<string>,
  cta: { tr: "Galeriye git", en: "Go to the gallery" } as L<string>,
  soon: { tr: "Görsel yakında", en: "Image coming soon" } as L<string>,
  captions: {
    tr: ["Dalda badem", "Kazan başında", "Bakır tepsi", "Harput’ta bir köşe", "Çiçek açan dal", "Kilim deseni"],
    en: ["Almonds on the branch", "By the kazan", "Copper tray", "A corner in Harput", "Blossoming branch", "Kilim pattern"],
  } as L<string[]>,
};

export const assistant = {
  title: { tr: "Gakkocan’a sor.", en: "Ask Gakkocan." } as L<string>,
  body: {
    tr: "Badem şekeri, Elazığ ya da bir hediye fikri. Aklınıza takılanı sorun, Gakkocan elindeki bilgiyle yanıtlasın.",
    en: "Almond candy, Elazığ, or a gift idea. Ask whatever is on your mind and Gakkocan will answer from what it knows.",
  } as L<string>,
  button: { tr: "Sohbeti başlat", en: "Start chatting" } as L<string>,
  examples: {
    tr: ["Badem şekeri nasıl yapılır?", "Elazığ’da nerelere gidilir?", "Hediye için hangisini seçmeli?"],
    en: ["How is almond candy made?", "Where to go in Elazığ?", "Which one to pick as a gift?"],
  } as L<string[]>,
};
