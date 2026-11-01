import type { Locale } from "@/lib/i18n";
import type { Motif } from "@/components/ui/ImageSlot";

export type Chapter = {
  id: string;
  motif: Motif;
  title: string;
  body: string;
  /** Yer tutucunun altyazısı: ileride hangi görsel/video karesi gelecek. */
  slotLabel: string;
  image?: string;
};

export type StoryContent = {
  slotHint: string;
  chaptersLabel: string;
  closing: { title: string; body: string; cta: string };
  chapters: Chapter[];
};

/**
 * Doğrulanmamış iddialar buraya yazılır, görünür metne GİRMEZ.
 * Kaynak bulununca ilgili bölüm metnine bilinçli olarak eklenir.
 */
export const TODO_VERIFY = {
  originYearOrHistory: null as string | null, // TODO_VERIFY: badem şekerinin tarihçesi
  almondVarietyAndHarvestMonth: null as string | null, // TODO_VERIFY: yöredeki badem çeşidi, hasat zamanı
  traditionalRecipeDetails: null as string | null, // TODO_VERIFY: geleneksel tarif/teknik ayrıntıları
  geographicalIndication: null as string | null, // TODO_VERIFY: coğrafi işaret / tescil bilgisi
};

export const story: Record<Locale, StoryContent> = {
  tr: {
    slotHint: "Görsel yakında",
    chaptersLabel: "Hikâye bölümleri",
    chapters: [
      {
        id: "agac",
        motif: "almond",
        title: "Badem ağacı",
        body: "Hikâye bir ağaçta başlar. Dallar çiçeğe durur, badem kabuğunun içinde olgunlaşır. Hasat gelince iç, şekerin en sade ve en özenle seçilen malzemesine dönüşür.",
        slotLabel: "Badem ağacı ve hasat",
        image: "/gallery/almond-orchard-hillside.webp",
      },
      {
        id: "atolye",
        motif: "pan",
        title: "Atölye ve bakır kazan",
        body: "Atölyede iş sabırla yürür. Bakır kazanın başında şeker kaynar, badem el hareketiyle kaplanır. Bu işte acele olmaz; göz, kulak ve el birlikte çalışır.",
        slotLabel: "Atölye ve bakır kazan",
        image: "/gallery/copper-kazan-steam.webp",
      },
      {
        id: "seker",
        motif: "candy",
        title: "Şekerin kendisi",
        body: "Badem şekeri, bütün bir bademin şekerle kaplanmasıyla yapılır. Dışı incecik, içi bademin kendi tadı. Basit görünür; ustalığı kaplamanın inceliğinde saklıdır.",
        slotLabel: "Badem şekeri, yakın plan",
        image: "/producers/prod-white-candy.jpg",
      },
      {
        id: "ikram",
        motif: "tray",
        title: "Sofraya, hediyeye",
        body: "Badem şekeri tatlıdan öte bir ikram biçimidir. Gelen misafirin önüne konur, sevinçlerde paylaşılır, bir kutuya girip yola çıkar.",
        slotLabel: "İkram tepsisi ve hediye kutusu",
        image: "/gallery/candy-gift-box-linen.webp",
      },
      {
        id: "harput",
        motif: "city",
        title: "Harput, Elazığ",
        body: "Şeker bu şehrin adıyla anılır. Harput'un taş duvarları, kilim desenleri, bakır işi ve badem ağaçları aynı hafızanın parçaları. Bir avuç şeker bu hafızanın tadını taşır.",
        slotLabel: "Harput ve Elazığ manzarası",
        image: "/story/harput.jpg",
      },
    ],
    closing: {
      title: "Şekeri yapan ellere bakın",
      body: "Elazığ'da badem şekeri yapan ve satan işletmeleri tanıyın, adreslerine ulaşın.",
      cta: "Üreticileri gör",
    },
  },
  en: {
    slotHint: "Image coming soon",
    chaptersLabel: "Story chapters",
    chapters: [
      {
        id: "agac",
        motif: "almond",
        title: "The almond tree",
        body: "The story begins on a tree. The branches blossom and the almond ripens inside its shell. At harvest, the kernel becomes the plainest and most carefully chosen ingredient of the candy.",
        slotLabel: "Almond tree and harvest",
        image: "/gallery/almond-orchard-hillside.webp",
      },
      {
        id: "atolye",
        motif: "pan",
        title: "The workshop and the copper pan",
        body: "In the workshop, work moves with patience. Sugar simmers over the copper pan and the almonds are coated by hand. There is no hurrying here; eye, ear and hand work together.",
        slotLabel: "Workshop and copper pan",
        image: "/gallery/copper-kazan-steam.webp",
      },
      {
        id: "seker",
        motif: "candy",
        title: "The candy itself",
        body: "Almond candy is a whole almond coated in sugar. A thin shell outside, the almond's own flavor within. It looks simple; the craft lives in how fine the coating is.",
        slotLabel: "Almond candy, close-up",
        image: "/producers/prod-white-candy.jpg",
      },
      {
        id: "ikram",
        motif: "tray",
        title: "To the table, as a gift",
        body: "Almond candy is more than a sweet; it is a way of offering hospitality. It is set before a guest, shared at celebrations, and packed into a box to travel.",
        slotLabel: "Serving tray and gift box",
        image: "/gallery/candy-gift-box-linen.webp",
      },
      {
        id: "harput",
        motif: "city",
        title: "Harput, Elazığ",
        body: "The candy carries the name of this city. Harput's stone walls, kilim patterns, copperwork and almond trees are parts of the same memory. A handful of candy carries the taste of it.",
        slotLabel: "Harput and Elazığ landscape",
        image: "/story/harput.jpg",
      },
    ],
    closing: {
      title: "Meet the hands behind the candy",
      body: "Get to know the businesses that make and sell almond candy in Elazığ, and find their addresses.",
      cta: "See the producers",
    },
  },
};
