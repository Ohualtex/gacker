import type { Locale } from "@/lib/i18n";

type Pair = { tr: string; en: string };

/** Keşfet sayfası ve footer haritası metinleri. Her metin TR + EN. */
export const discoverCopy = {
  tr: {
    mapLabel: "Elazığ ilçeleri ve gezilecek yerler haritası",
    mapHint: "Bir noktaya dokunun ya da klavye ile gezin; ayrıntılar yanda açılır.",
    placesTitle: "Haritadaki noktalar",
    openInMaps: "Haritalarda aç",
    source: "Kaynak",
    verifyNote: "Bu bilgi tek bir kaynağa dayanıyor; bağımsız olarak doğrulanmadı.",
    approx: "Konumlar yaklaşıktır (yaklaşık 100-500 m).",
    attribution: "Harita verisi: geoBoundaries (ODbL 1.0) · © OpenStreetMap contributors.",
    districtPrefix: "İlçe",
    listTitle: "Sofradan taşa, Elazığ'dan notlar",
    listLead:
      "Badem şekeriyle gelen biri için kısa bir rehber. Her not, altındaki bağlantıdaki kaynağa dayanır.",
    foodTitle: "Yöresel lezzetler",
    placeTitle: "Tarihî ve doğal yerler",
    sourceOpen: "Kaynağı aç",
    pending: "Doğrulama bekliyor",
    footerLabel: "Elazığ",
    footerCaption: "11 ilçe",
    footerAttribution: "© OpenStreetMap contributors",
  },
  en: {
    mapLabel: "Map of Elazığ districts and places to visit",
    mapHint: "Tap a marker or move through them with the keyboard; details open alongside.",
    placesTitle: "Points on the map",
    openInMaps: "Open in maps",
    source: "Source",
    verifyNote: "This rests on a single source and has not been independently verified.",
    approx: "Locations are approximate (about 100-500 m).",
    attribution: "Map data: geoBoundaries (ODbL 1.0) · © OpenStreetMap contributors.",
    districtPrefix: "District",
    listTitle: "From the table to the stone: notes from Elazığ",
    listLead:
      "A short guide for anyone who arrives through the candy. Each note rests on the source linked beneath it.",
    foodTitle: "Local flavours",
    placeTitle: "Historic and natural places",
    sourceOpen: "Open source",
    pending: "Verification pending",
    footerLabel: "Elazığ",
    footerCaption: "11 districts",
    footerAttribution: "© OpenStreetMap contributors",
  },
} as const satisfies Record<Locale, Record<string, string>>;

/**
 * elazig-discover.json'da karşılığı olmayan noktalar için yalnızca doğrulanmış,
 * konum verisinden çıkan çekingen cümleler. Uydurma bilgi yok.
 */
export const extraPlaceText: Record<string, { tr: string; en: string; source: string }> = {
  "elazig-merkez": {
    tr: "Elazığ şehir merkezi, ilin idari merkezidir. Tarihî Harput mahallesi de merkez ilçenin sınırları içinde yer alır.",
    en: "Elazığ city center is the administrative seat of the province. The historic Harput quarter also lies within the central district.",
    source: "https://tr.wikipedia.org/wiki/Elaz%C4%B1%C4%9F",
  },
  baskil: {
    tr: "Baskil, Elazığ'ın batısında yer alan ilçelerden biridir. Haritadaki nokta ilçe merkezini gösterir.",
    en: "Baskil is one of the districts in the west of Elazığ. The marker shows the district center.",
    source: "https://tr.wikipedia.org/wiki/Baskil",
  },
  agin: {
    tr: "Ağın, Elazığ'ın en küçük ilçesidir ve leblebisiyle tanınır. Haritadaki nokta ilçe merkezini gösterir.",
    en: "Ağın is Elazığ's smallest district and is known for its roasted chickpeas (leblebi). The marker shows the district center.",
    source: "https://tr.wikipedia.org/wiki/A%C4%9F%C4%B1n",
  },
  palu: {
    tr: "Palu, Elazığ'ın doğusunda yer alan bir ilçedir. Haritadaki nokta ilçe merkezini gösterir.",
    en: "Palu is a district in the east of Elazığ. The marker shows the district center.",
    source: "https://tr.wikipedia.org/wiki/Palu",
  },
  sivrice: {
    tr: "Sivrice, Hazar Gölü'nün kıyısında yer alan ilçedir. Haritadaki nokta ilçe merkezini gösterir.",
    en: "Sivrice is the district on the shore of Lake Hazar. The marker shows the district center.",
    source: "https://tr.wikipedia.org/wiki/Sivrice",
  },
};

/** Tek kaynaklı (verify:true) girdilerin yumuşatılmış metni. */
export const softenedText: Record<string, Pair> = {
  "buzluk-magarasi": {
    tr: "Buzluk Mağarası, Harput Platosu üzerindeki Buzluk Tepe'nin kuzey yamacında, Elazığ merkeze yaklaşık 12 km mesafededir. Vikipedi'ye göre buz yazın oluşur, kışın oluşmaz; bu bilgi bağımsız bir kaynakla doğrulanmadı.",
    en: "Buzluk Cave lies on the northern slope of Buzluk Hill on the Harput Plateau, about 12 km from Elazığ city center. According to Wikipedia, ice forms in summer but not in winter; this has not been verified independently.",
  },
};

/**
 * Harita üzerinde birbirine çok yakın noktaların işaretini ayırmak için
 * görsel kaydırma (SVG birimi). Gerçek konum ince bir çizgiyle gösterilir.
 */
export const markerOffsets: Record<string, [number, number]> = {
  "harput-kalesi": [35, 6],
  "harput-ulu-cami": [-30, -14],
  "buzluk-magarasi": [24, -19],
};

/** İlçe adlarının merkez noktasından kaydırılması (işaretlerle çakışmasın). */
export const labelOffsets: Record<string, [number, number]> = {
  merkez: [10, 46],
  keban: [0, 40],
  agin: [0, 40],
  palu: [30, 18],
};
