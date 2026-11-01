import type { Locale } from "@/lib/i18n";

type Pair = { tr: string; en: string };

/**
 * Keşfet sayfası "Gezi rehberi" metinleri ve rota tanımları.
 * Yalnızca public/data/elazig-places.json içindeki kaynaklı yerler kullanılır;
 * not metinleri src/content/discover.ts ve elazig-discover.json'daki kaynaklı cümlelerden türetilmiştir.
 * Saat yerine yalnızca günün bölümü (sabah, öğle…) verilir; çalışma saati iddiası yoktur.
 */
export const guideCopy = {
  tr: {
    id: "gezi-rehberi",
    title: "Gezi rehberi: kaydırarak gezin",
    lead: "Haritadaki kaynaklı yerlerden, birbirine yakın sırayla dizilmiş iki rota önerisi. Kaydırdıkça çizgi ilerler, harita sizinle birlikte yer değiştirir.",
    tabsLabel: "Rota seçimi",
    mapLabel: "Önerilen rotanın haritası",
    mapCaption: "Çizgi durakların sırasını gösterir, karayolunu değil.",
    showOnMap: "Haritada göster",
    openMaps: "Google Haritalar",
    source: "Kaynak",
    addToList: "Listeme ekle",
    inList: "Listemde",
    fromPrev: "Önceki duraktan kuş uçuşu",
    fromCenter: "Şehir merkezinden kuş uçuşu",
    day: "Gün",
    disclaimer:
      "Bu bir rota önerisidir; günün bölümleri yalnızca sıralamayı anlatır, ziyaret saati değildir. Mesafeler koordinatlardan hesaplanan kuş uçuşu değerlerdir; yol mesafesi ve süre farklıdır. Gezi öncesi yol, hava durumu ve ziyaret saatlerini kontrol edin.",
    sideTitle: "Yan rota",
    sideLead: "Şehir merkezinin kuzeybatısında kalır; diğer duraklardan ayrı bir yönde olduğu için ayrı bir gün olarak düşünmek daha rahat olur.",
    tripTitle: "Gezi listem",
    tripLead: "Beğendiğiniz durakları ekleyin; liste yalnızca bu tarayıcıda saklanır ve yazdırılabilir.",
    tripEmpty: "Henüz durak eklemediniz. Duraklardaki “Listeme ekle” düğmesini kullanın.",
    tripPrint: "Yazdır",
    tripClear: "Listeyi temizle",
    tripRemove: "Listeden çıkar",
    tripPrintTitle: "Elazığ gezi listem",
    tripCount: "durak",
    km: "km",
  },
  en: {
    id: "gezi-rehberi",
    title: "Travel guide: scroll your way through",
    lead: "Two suggested routes through the sourced places on the map, ordered by proximity. As you scroll, the line advances and the map follows along.",
    tabsLabel: "Choose a route",
    mapLabel: "Map of the suggested route",
    mapCaption: "The line shows the order of the stops, not the road.",
    showOnMap: "Show on map",
    openMaps: "Google Maps",
    source: "Source",
    addToList: "Add to my list",
    inList: "In my list",
    fromPrev: "As the crow flies from the previous stop",
    fromCenter: "As the crow flies from the city center",
    day: "Day",
    disclaimer:
      "This is a suggested route; the parts of the day only describe the order, not visiting hours. Distances are straight-line values computed from coordinates; road distance and travel time differ. Check roads, weather and opening hours before you go.",
    sideTitle: "Side trip",
    sideLead: "It lies northwest of the city center, in a different direction from the other stops, so it is easier to treat it as a separate day.",
    tripTitle: "My trip list",
    tripLead: "Add the stops you like; the list is stored only in this browser and can be printed.",
    tripEmpty: "No stops yet. Use “Add to my list” on any stop.",
    tripPrint: "Print",
    tripClear: "Clear list",
    tripRemove: "Remove from list",
    tripPrintTitle: "My Elazığ trip list",
    tripCount: "stops",
    km: "km",
  },
} as const satisfies Record<Locale, Record<string, string>>;

export const dayParts = {
  morning: { tr: "Sabah", en: "Morning" },
  noon: { tr: "Öğle", en: "Midday" },
  afternoon: { tr: "Öğleden sonra", en: "Afternoon" },
  evening: { tr: "Akşamüstü", en: "Late afternoon" },
} as const satisfies Record<string, Pair>;
export type DayPart = keyof typeof dayParts;

export type GuideStopDef = { placeId: string; part: DayPart; note: Pair };
export type GuideDayDef = { title: Pair; stops: GuideStopDef[] };
export type GuideRouteDef = { id: string; label: Pair; days: GuideDayDef[] };

const stops: Record<string, GuideStopDef> = {
  center: {
    placeId: "elazig-merkez",
    part: "morning",
    note: {
      tr: "Güne şehir merkezinden başlayın. Tarihî Harput mahallesi de merkez ilçenin sınırları içinde yer alır; bir sonraki durak Harput.",
      en: "Start in the city center. The historic Harput quarter also lies within the central district; the next stop is Harput.",
    },
  },
  castle: {
    placeId: "harput-kalesi",
    part: "morning",
    note: {
      tr: "İç ve dış kale olmak üzere iki bölümlü bir yapı. Rivayete göre harcına su yerine süt katıldığı için “Süt Kalesi” de denir.",
      en: "A fortress in two parts, inner and outer. According to legend, milk was used instead of water in its mortar, hence the nickname “Milk Castle”.",
    },
  },
  mosque: {
    placeId: "harput-ulu-cami",
    part: "noon",
    note: {
      tr: "Artuklu hükümdarı Fahrettin Karaaslan tarafından 1156-1157'de yaptırılmış; Anadolu'nun en eski camilerinden biri sayılır. Hâlen ibadete açık olduğundan ibadet düzenine saygı gösterin.",
      en: "Commissioned by the Artuqid ruler Fakhr al-Din Qara Arslan in 1156-1157 and regarded as one of Anatolia's oldest mosques. It is still used for worship, so please respect prayer times.",
    },
  },
  cave: {
    placeId: "buzluk-magarasi",
    part: "afternoon",
    note: {
      tr: "Harput Platosu'ndaki Buzluk Tepe'nin kuzey yamacında. Vikipedi'ye göre Harput'a yaklaşık 6 km, Elazığ merkeze yaklaşık 12 km mesafede; buz oluşumuna dair anlatı tek kaynaklıdır.",
      en: "On the northern slope of Buzluk Hill on the Harput Plateau. According to Wikipedia it is about 6 km from Harput and about 12 km from Elazığ city center; the ice-formation account rests on a single source.",
    },
  },
  lake: {
    placeId: "hazar-golu",
    part: "evening",
    note: {
      tr: "Güneybatı-kuzeydoğu doğrultusunda uzanan tektonik bir göl; Sivrice ilçesi kıyısında yer alır.",
      en: "A tectonic lake stretching southwest to northeast; the district of Sivrice lies on its shore.",
    },
  },
  lakeMorning: {
    placeId: "hazar-golu",
    part: "morning",
    note: {
      tr: "Güneybatı-kuzeydoğu doğrultusunda uzanan tektonik bir göl; Sivrice ilçesi kıyısında yer alır. İkinci güne gölle başlayın.",
      en: "A tectonic lake stretching southwest to northeast; the district of Sivrice lies on its shore. Start the second day at the lake.",
    },
  },
  sivrice: {
    placeId: "sivrice",
    part: "afternoon",
    note: {
      tr: "Hazar Gölü'nün kıyısında yer alan ilçe; haritadaki nokta ilçe merkezini gösterir.",
      en: "The district on the shore of Lake Hazar; the marker shows the district center.",
    },
  },
};

export const guideRoutes: GuideRouteDef[] = [
  {
    id: "day1",
    label: { tr: "1 günlük rota", en: "One-day route" },
    days: [
      {
        title: { tr: "Harput'tan Hazar'a", en: "From Harput to Lake Hazar" },
        stops: [stops.center, stops.castle, stops.mosque, stops.cave, stops.lake],
      },
    ],
  },
  {
    id: "day2",
    label: { tr: "2 günlük rota", en: "Two-day route" },
    days: [
      {
        title: { tr: "Harput ve çevresi", en: "Harput and around" },
        stops: [stops.center, stops.castle, stops.mosque, stops.cave],
      },
      {
        title: { tr: "Hazar Gölü ve Sivrice", en: "Lake Hazar and Sivrice" },
        stops: [stops.lakeMorning, stops.sivrice],
      },
    ],
  },
];

export const guideSideStop = {
  placeId: "keban-baraji",
  note: {
    tr: "Fırat Nehri üzerinde 1965-1975 yılları arasında enerji üretimi için inşa edilmiş baraj; oluşan baraj gölü normal su kotunda 675 km² alana sahiptir.",
    en: "Built on the Euphrates between 1965 and 1975 for hydroelectric power; the reservoir it created covers 675 km² at normal water level.",
  },
} as const;

/** Gezi rehberi mini haritasında yakın noktaları ayırmak için görsel kaydırma (SVG birimi). */
export const guideMarkerOffsets: Record<string, [number, number]> = {
  "elazig-merkez": [-34, 34],
  "harput-kalesi": [52, 14],
  "harput-ulu-cami": [-30, -52],
  "buzluk-magarasi": [52, -40],
  "hazar-golu": [24, -4],
  sivrice: [-16, 14],
};

/** Keşfet sayfası içi bağlantı çubuğu. */
export const discoverJump: { id: string; label: Pair }[] = [
  { id: "harita", label: { tr: "Harita", en: "Map" } },
  { id: "notlar", label: { tr: "Notlar", en: "Notes" } },
  { id: "gezi-rehberi", label: { tr: "Gezi rehberi", en: "Travel guide" } },
  { id: "sozluk", label: { tr: "Gakkoş Sözlüğü", en: "Gakkoş Glossary" } },
];
