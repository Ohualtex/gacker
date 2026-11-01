/**
 * Gakkoş Sözlüğü — Elazığ/Harput ağzına özgü sözcükler.
 * SÖZLEŞME: UI bileşenleri yalnızca bu tipi ve `glossary` dizisini kullanır.
 *
 * KAYNAKLAR (1 Kasım 2026'da web üzerinden okunup doğrulandı; her kayıt bunlardan en az birinde geçer):
 *  - KP: T.C. Kültür ve Turizm Bakanlığı, Kültür Portalı — "Elazığ Ağzı" (Elazığ–Harput kelimelerinden bazıları)
 *    https://www.kulturportali.gov.tr/turkiye/elazig/kulturatlasi/elazig-agzi
 *  - VP: Vikipedi — "Elazığ ağzı" ("Bazı Kelimelerin Elâzığ ağzı Karşılığı" tablosu)
 *    https://tr.wikipedia.org/wiki/Elaz%C4%B1%C4%9F_a%C4%9Fz%C4%B1
 *  - ÖGEL: Ercan Alkaya, "Bahaeddin Ögel'in 'Harput Ağzı Fonetik ve Morfoloji' Adlı Eseri Üzerine Bir
 *    Değerlendirme", Diyalektolog – Ağız Araştırmaları Dergisi, sayı 1 (2010) — Ögel'in 995 maddelik
 *    Harput ağzı sözlüğünden örnekler verir.
 *    https://dergipark.org.tr/tr/download/article-file/208506
 *
 * KAPSAM NOTLARI
 *  - Yazım, kaynaktaki söyleniş biçimine göre bırakıldı (ör. "gakgo" ~ "gakko"); yerel bir okuyucu
 *    yazımı normalleştirmek isterse kaynak adı ve anlamı korunmalı.
 *  - Örnek cümle (`example`) bilerek eklenmedi: kaynaklarda doğrulanabilir örnek bulunmayan sözcükler için
 *    cümle uydurmak istemedik. İsteğe bağlı alandır.
 *  - Küfür, beddua, aşağılayıcı veya karikatürize sözcükler bilerek alınmadı.
 *  - "gari", "hele" gibi çok bilinen edatlar yazılı bir sözlük kaynağında doğrulanamadığı için alınmadı.
 *
 * TODO (yerel kontrol): Elazığ'lı/Harput'lu biri son kontrolü yapsın — söyleniş yazımı, anlam
 * kayması (bazı sözcükler köyden köye değişir) ve günümüzde hâlâ kullanılıp kullanılmadığı gözden geçirilmeli.
 */
export type GlossaryEntry = {
  id: string;
  /** Ağızdaki söyleniş / sözcük */
  term: string;
  /** Standart Türkçe/İngilizce karşılık ve kısa açıklama */
  meaning: { tr: string; en: string };
  /** İsteğe bağlı örnek cümle */
  example?: { tr: string; en?: string };
  /** Kaynak adı (ör. makale, sözlük) */
  source: string;
  sourceUrl: string;
};

// Kaynak sabitleri (tekrarı azaltmak için)
const KP = {
  source: "T.C. Kültür ve Turizm Bakanlığı, Kültür Portalı — Elazığ Ağzı",
  sourceUrl: "https://www.kulturportali.gov.tr/turkiye/elazig/kulturatlasi/elazig-agzi",
} as const;

const VP = {
  source: "Vikipedi — Elazığ ağzı",
  sourceUrl: "https://tr.wikipedia.org/wiki/Elaz%C4%B1%C4%9F_a%C4%9Fz%C4%B1",
} as const;

const OGEL = {
  source: "Alkaya, E. (2010). Ögel'in \"Harput Ağzı Fonetik ve Morfoloji\" eseri üzerine bir değerlendirme. Diyalektolog, 1",
  sourceUrl: "https://dergipark.org.tr/tr/download/article-file/208506",
} as const;

export const glossary: GlossaryEntry[] = [
  // — Hitap ve akrabalık —
  {
    id: "gakkos",
    term: "gakkoş",
    meaning: {
      tr: "Abi, kardeş anlamında samimi hitap. ('gakgo/gakko': ağabey, büyük kardeş; kardeş)",
      en: "A friendly way to address someone, like 'bro'. ('gakgo/gakko' means older brother or brother.)",
    },
    source: `${VP.source}; ${KP.source}`,
    sourceUrl: VP.sourceUrl,
  },
  {
    id: "bibi",
    term: "bibi",
    meaning: { tr: "Hala (babanın kız kardeşi).", en: "Paternal aunt (father's sister)." },
    ...KP,
  },
  {
    id: "diyeze",
    term: "diyeze / eze",
    meaning: { tr: "Teyze.", en: "Maternal aunt (mother's sister)." },
    ...KP,
  },
  {
    id: "ano",
    term: "ano / anuko",
    meaning: { tr: "Anne.", en: "Mother." },
    ...KP,
  },
  {
    id: "caga",
    term: "çağa",
    meaning: { tr: "Çocuk.", en: "Child." },
    ...KP,
  },
  {
    id: "cagam",
    term: "çağam",
    meaning: { tr: "Yavrum, çocuğum; sevgiyle seslenme.", en: "My dear child; an affectionate way to address a youngster." },
    ...VP,
  },
  {
    id: "babos",
    term: "baboş",
    meaning: {
      tr: "Yiğit, delikanlı; çocuk ve gençlere sevgi ifade eden hitap.",
      en: "A fond way to address a boy or young person; also 'brave lad'.",
    },
    ...VP,
  },
  {
    id: "gisi",
    term: "gişi",
    meaning: { tr: "Koca, eş.", en: "Husband, spouse." },
    ...VP,
  },
  {
    id: "guvegi",
    term: "güvegi",
    meaning: { tr: "Damat.", en: "Bridegroom; son-in-law." },
    ...VP,
  },
  {
    id: "gaynata",
    term: "gaynata",
    meaning: { tr: "Kayınbaba, kayınpeder.", en: "Father-in-law." },
    ...VP,
  },
  {
    id: "evermek",
    term: "evermek",
    meaning: { tr: "Evlendirmek.", en: "To marry off; to arrange someone's marriage." },
    ...VP,
  },
  {
    id: "govullenmek",
    term: "gövüllenmek",
    meaning: { tr: "Sevdalanmak.", en: "To fall in love." },
    ...VP,
  },

  // — Sohbet ve duygu —
  {
    id: "osgemek",
    term: "ösgemek",
    meaning: { tr: "Özlemek, anımsamak.", en: "To miss someone; to long for." },
    ...KP,
  },
  {
    id: "horata",
    term: "horata",
    meaning: {
      tr: "Laf, söz; sohbet. ('horata etmek': sohbet etmek, laflamak)",
      en: "Talk, chat. ('horata etmek' means to chat.)",
    },
    ...KP,
  },
  {
    id: "yarennik",
    term: "yarennik",
    meaning: {
      tr: "Şaka. ('yarennik etmek': şakalaşmak)",
      en: "A joke, banter. ('yarennik etmek' means to joke around.)",
    },
    ...VP,
  },
  {
    id: "usulcanah",
    term: "usulcanah",
    meaning: { tr: "Yavaşça, sessizce.", en: "Slowly, quietly; gently." },
    ...VP,
  },
  {
    id: "mikayyet-olmak",
    term: "mıkayyet olmak",
    meaning: { tr: "Sahip çıkmak, sahip olmak.", en: "To take ownership of something; to look after it." },
    ...VP,
  },
  {
    id: "yalavuz",
    term: "yalavuz",
    meaning: { tr: "Yalnız.", en: "Alone." },
    ...VP,
  },
  {
    id: "cincih",
    term: "cıncıh",
    meaning: { tr: "Temiz, tertemiz.", en: "Clean, spotless." },
    ...VP,
  },
  {
    id: "gurabiye-cocugu",
    term: "gurabiye çocuğu",
    meaning: {
      tr: "Kibar, nazik kimse. ('gurabiye' kuru pasta/bisküvi demektir.)",
      en: "A refined, gentle person. ('Gurabiye' is a crumbly shortbread-style cookie.)",
    },
    ...VP,
  },

  // — Zaman ve yer —
  {
    id: "bildir",
    term: "bıldır",
    meaning: { tr: "Geçen yıl.", en: "Last year." },
    source: `${VP.source}; ${OGEL.source}`,
    sourceUrl: VP.sourceUrl,
  },
  {
    id: "bayal",
    term: "bayal",
    meaning: { tr: "Demin, az önce.", en: "A moment ago, just now." },
    ...OGEL,
  },
  {
    id: "devresu",
    term: "devresü",
    meaning: { tr: "Ertesi (gün).", en: "The next (day)." },
    ...VP,
  },
  {
    id: "zuvag",
    term: "zuvağ / zokah",
    meaning: { tr: "Sokak.", en: "Street." },
    source: `${KP.source}; ${VP.source}`,
    sourceUrl: KP.sourceUrl,
  },
  {
    id: "ayancah",
    term: "ayancah",
    meaning: { tr: "Merdiven.", en: "Staircase, ladder." },
    ...VP,
  },
  {
    id: "gog",
    term: "gög",
    meaning: { tr: "Mavi.", en: "Blue." },
    ...OGEL,
  },
  {
    id: "casut",
    term: "çaşut",
    meaning: { tr: "Becerikli.", en: "Skilful, resourceful." },
    ...OGEL,
  },

  // — Ev, mutfak, sofra —
  {
    id: "isot",
    term: "isot",
    meaning: { tr: "Biber.", en: "Pepper." },
    ...KP,
  },
  {
    id: "orcik",
    term: "orcik (orçik)",
    meaning: {
      tr: "Cevizli sucuk: ipe dizilmiş ceviz (badem) içlerinin üzüm şırasından yapılan bulamaca birkaç kez batırılıp kurutulmasıyla hazırlanan yöresel yiyecek.",
      en: "'Walnut sausage': strings of walnut (almond) kernels dipped several times in a thickened grape-must mixture and dried; a local specialty.",
    },
    ...VP,
  },
  {
    id: "basduh",
    term: "basduh",
    meaning: {
      tr: "Pestil; üzüm ya da dut şırasından, bazen erik ezmesinden yapılır.",
      en: "Fruit leather (pestil), made from grape or mulberry must, sometimes plum purée.",
    },
    ...VP,
  },
  {
    id: "gurut",
    term: "gurut",
    meaning: {
      tr: "Kurut: suyu süzülmüş yoğurdun kurutulmasıyla yapılan yemek malzemesi.",
      en: "Kurut: strained yogurt that has been dried, used as a cooking ingredient.",
    },
    ...VP,
  },
  {
    id: "usgure",
    term: "üsgüre / üsküre",
    meaning: { tr: "Derin çorba kasesi; kase.", en: "A deep soup bowl; bowl." },
    source: `${VP.source}; ${KP.source}`,
    sourceUrl: VP.sourceUrl,
  },
  {
    id: "sitil",
    term: "sitil",
    meaning: { tr: "Bakraç, kova.", en: "Pail, bucket." },
    ...VP,
  },
  {
    id: "taka",
    term: "taka",
    meaning: { tr: "Duvarda yapılmış kapaksız küçük dolap (niş).", en: "A small door-less cupboard built into a wall (a niche)." },
    ...VP,
  },
  {
    id: "donbek",
    term: "dönbek",
    meaning: { tr: "Darbuka.", en: "Goblet drum (darbuka)." },
    ...VP,
  },

  // — Hayvanlar, oyun ve günlük sözler —
  {
    id: "pisik",
    term: "pisik",
    meaning: { tr: "Kedi.", en: "Cat." },
    ...KP,
  },
  {
    id: "gidik",
    term: "gıdik",
    meaning: { tr: "Oğlak, keçi yavrusu.", en: "Kid goat." },
    source: `${KP.source}; ${OGEL.source}`,
    sourceUrl: KP.sourceUrl,
  },
  {
    id: "mozik",
    term: "mozik",
    meaning: { tr: "Topaç.", en: "Spinning top." },
    source: `${VP.source}; ${OGEL.source}`,
    sourceUrl: VP.sourceUrl,
  },
  {
    id: "birezim",
    term: "birezim",
    meaning: { tr: "Birazcık.", en: "A tiny bit." },
    ...KP,
  },
  {
    id: "cimmek",
    term: "çimmek",
    meaning: { tr: "Yıkanmak, banyo yapmak.", en: "To wash oneself; to bathe." },
    ...KP,
  },
];
