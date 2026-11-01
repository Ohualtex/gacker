/**
 * Badem şekeri bilgi kartları.
 * SÖZLEŞME: UI bileşenleri yalnızca bu tipi ve `candyFacts` dizisini kullanır.
 *
 * İLKELER (1 Kasım 2026'da kaynaklar WebFetch/HTTP ile açılıp doğrulandı):
 *  - Tarif ve malzeme oranı verilmez; yapılış yalnızca genel ve kaynaklı anlatılır.
 *  - 'Osmanlı'dan beri', 'Harput'a özgü', 'Elazığ icadı' gibi doğrulanamayan iddialar YOKTUR.
 *    Badem şekeri Elazığ'a özgü değildir (ör. Mardin İmlebbes, dünyada şeker kaplı badem çeşitleri).
 *  - Sağlık kartlarında tıbbi iddia / şifa vaadi YOKTUR; yalnızca genel, kaynaklı beslenme bilgisi vardır.
 *  - Ustaların kendi beyanları ("usta beyanı") metinde belirtilmiştir; kesin bilgi gibi sunulmaz.
 *
 * TODO (takım kontrolü): Haber kaynaklı kartlar (making-elazig, culture-elazig-*) yıl/güncellik açısından
 * bir kez daha gözden geçirilsin; sayılar (ör. 5-6 kat satış artışı) kişisel beyandır.
 */
export type CandyFactCategory = "what" | "making" | "culture" | "health";

export type CandyFact = {
  id: string;
  category: CandyFactCategory;
  title: { tr: string; en: string };
  body: { tr: string; en: string };
  source: string;
  sourceUrl: string;
};

export const candyFacts: CandyFact[] = [
  // ───────────── NEDİR (what) ─────────────
  {
    id: "what-definition",
    category: "what",
    title: { tr: "Badem şekeri nedir?", en: "What is badem şekeri?" },
    body: {
      tr: "Badem şekeri, kuru bademin şekerle kaplanmasıyla yapılan geleneksel bir şekerlemedir. Türk kültüründe yaygındır; düğünlerde dağıtılan \"gelin şekeri\"nin de ana malzemesidir.",
      en: "Badem şekeri is a traditional confection made by coating dried almonds in sugar. It is common in Turkish culture and is the main ingredient of the \"bride's candy\" handed out at weddings.",
    },
    source: "Vikipedi — Badem şekeri",
    sourceUrl: "https://tr.wikipedia.org/wiki/Badem_%C5%9Fekeri",
  },
  {
    id: "what-dragee-family",
    category: "what",
    title: { tr: "Dünyada şeker kaplı badem", en: "Sugar-coated almonds around the world" },
    body: {
      tr: "Sert bir dış kabuğu olan küçük şekerlemelere Fransızca \"dragée\" denir. Şeker kaplı bademler de bu ailenin bir üyesidir: İngilizce \"Jordan almonds\", Portekiz'de Paskalya bademleri (amêndoas de Páscoa), İtalya'nın Sulmona kasabasında \"confetti\" gibi benzer örnekler vardır. Yani şeker kaplı badem yalnızca tek bir şehre ya da ülkeye özgü değildir.",
      en: "Small confections with a hard outer shell are called \"dragées\" in French. Sugar-coated almonds belong to this family: \"Jordan almonds\" in English, Easter almonds (amêndoas de Páscoa) in Portugal, and \"confetti di Sulmona\" in Italy. So sugared almonds are not unique to a single city or country.",
    },
    source: "Vikipedi (İngilizce) — Dragée",
    sourceUrl: "https://en.wikipedia.org/wiki/Drag%C3%A9e",
  },
  {
    id: "what-regional-imlebbes",
    category: "what",
    title: { tr: "Başka bir yöresel örnek: Mardin İmlebbes", en: "Another regional example: Mardin İmlebbes" },
    body: {
      tr: "Mardin yöresinde, Isatis tinctoria bitkisinden elde edilen boyayla renklendirilen mavi bir badem şekeri çeşidi yapılır: İmlebbes. Mardin İmlebbes, 23.12.2009'da Türk Patent ve Marka Kurumu tarafından tescillenmiş ve coğrafi işaret almıştır. Bu da badem şekerinin Türkiye'de birden fazla yörede yaşayan bir gelenek olduğunu gösterir.",
      en: "In the Mardin region a blue type of badem şekeri called İmlebbes is made, coloured with a dye from the plant Isatis tinctoria. Mardin İmlebbes was registered by the Turkish Patent and Trademark Office on 23 Dec 2009 and holds a geographical indication. It shows that badem şekeri is a tradition kept alive in more than one region of Türkiye.",
    },
    source: "Vikipedi — Badem şekeri (İmlebbes bölümü)",
    sourceUrl: "https://tr.wikipedia.org/wiki/Badem_%C5%9Fekeri",
  },

  // ───────────── YAPILIŞI (making) ─────────────
  {
    id: "making-coating",
    category: "making",
    title: { tr: "Şeker kaplama (drajeleme) nedir?", en: "What is sugar coating (panning)?" },
    body: {
      tr: "Şeker kaplı bademler, \"sugar panning\" denen bir teknikle, yani merkezdeki bademin şekerle katman katman kaplanmasıyla hazırlanır; kaplamayı uygulamak için dönen bir kazan ya da türbin kullanılır. Sonuçta içi bademli, dışı sert ve şekerli bir kabuk oluşur. Bu sitede tarif ya da malzeme oranı verilmez.",
      en: "Sugar-coated almonds are made by \"sugar panning\": the almond in the centre is coated with sugar layer by layer, using a rotating pan or turbine to apply the coating. The result is a hard, sugary shell around an almond. This site does not give a recipe or ingredient ratios.",
    },
    source: "Vikipedi (İngilizce) — Dragée",
    sourceUrl: "https://en.wikipedia.org/wiki/Drag%C3%A9e",
  },
  {
    id: "making-elazig-method",
    category: "making",
    title: { tr: "Elazığ'da anlatılan yapılış", en: "How it is described in Elazığ" },
    body: {
      tr: "Anadolu Ajansı'nın 2021 haberine göre Elazığ'da iri yerli badem kavrulur; pancar şekerinden elde edilen toz şeker kazanda eritilip şerbet yapılır. Kavrulmuş bademler döner kazana alınır, şerbet birkaç dakika arayla üzerine dökülür ve sıcak hava üflenerek bademler şekerle kaplanır. İşlem birkaç kez tekrarlanır ve bademler ince bir şeker tabakasıyla beyaza bürünür.",
      en: "According to a 2021 Anadolu Agency report, in Elazığ large local almonds are roasted and sugar made from sugar beet is melted into a syrup. The roasted almonds go into a rotating pan, the syrup is poured over them every few minutes while hot air is blown, and the process is repeated several times until a thin white sugar layer forms.",
    },
    source: "NTV / Anadolu Ajansı — Elazığ'ın yöresel lezzeti badem şekeri ramazanda damakları tatlandırıyor (25.04.2021)",
    sourceUrl: "https://www.ntv.com.tr/yasam/elazigin-yoresel-lezzeti-badem-sekeri-ramazanda-damaklari-tatlandiriyor,ejVt3w2upk2SoYWsLudOPQ",
  },
  {
    id: "making-craft-time",
    category: "making",
    title: { tr: "El emeği ve süre (usta beyanı)", en: "Craft and time (master's account)" },
    body: {
      tr: "Aynı haberde Elazığlı ustalar, badem şekerinin el emeğiyle yaklaşık 3 saatte hazırlandığını söylüyor. Usta Erkan Süslü'ye göre iyi bir badem şekerinde şeker tabakası ince ve gevrek olmalı ve bu gevreklik usta eliyle verilir. Bunlar ustaların kendi anlatımıdır; her ustanın şekeri birbirinin aynısı değildir.",
      en: "In the same report, Elazığ masters say badem şekeri takes about 3 hours of hand work. Master Erkan Süslü says a good one needs a thin, crisp sugar layer, which comes from the master's hand. These are the masters' own accounts, and no two masters' candy is exactly alike.",
    },
    source: "NTV / Anadolu Ajansı — Elazığ'ın yöresel lezzeti badem şekeri ramazanda damakları tatlandırıyor (25.04.2021)",
    sourceUrl: "https://www.ntv.com.tr/yasam/elazigin-yoresel-lezzeti-badem-sekeri-ramazanda-damaklari-tatlandiriyor,ejVt3w2upk2SoYWsLudOPQ",
  },

  // ───────────── KÜLTÜR (culture) ─────────────
  {
    id: "culture-special-days",
    category: "culture",
    title: { tr: "Bayram, nikâh, nişan, sünnet", en: "Holidays, weddings, engagements, circumcision feasts" },
    body: {
      tr: "Türk Tarım Orman Dergisi'ndeki bir yazıya göre badem şekeri, bayramlarda hazırlanan şekerliklerin en gözde üyelerindendir. Sadece bayramlarda değil, nikâh, nişan ve sünnet gibi özel günlerde de özel paketlerde ikram edilir.",
      en: "According to an article in the Turkish Agriculture and Forestry magazine, badem şekeri is one of the favourite items in holiday candy dishes. It is also offered in special packages on occasions such as weddings, engagements and circumcision celebrations.",
    },
    source: "Türk Tarım Orman Dergisi — Geleneksel şekerlemeler ve Ramazan Bayramı",
    sourceUrl: "https://www.turktarim.gov.tr/Haber/626/geleneksel-sekerlemeler-ve-ramazan-bayrami",
  },
  {
    id: "culture-wedding-favour",
    category: "culture",
    title: { tr: "Gelin şekeri / nikâh şekeri", en: "The wedding favour" },
    body: {
      tr: "Türk kültüründe \"gelin şekeri\", \"nikâh şekeri\" ya da \"düğün şekeri\", düğüne gelen konuklara armağan edilen küçük bir torbadır. Üzerinde gelin ile damadın adlarının yazılı olduğu küçük bir kâğıt bulunabilir; torbanın ana malzemesi badem şekeridir.",
      en: "In Turkish culture the \"gelin şekeri\", \"nikâh şekeri\" or \"düğün şekeri\" is a small bag given as a gift to wedding guests. It may carry a small note with the names of the bride and groom, and its main content is badem şekeri.",
    },
    source: "Vikipedi — Badem şekeri (Türk kültüründe)",
    sourceUrl: "https://tr.wikipedia.org/wiki/Badem_%C5%9Fekeri",
  },
  {
    id: "culture-elazig-tea-time",
    category: "culture",
    title: { tr: "Elazığ'da ramazan ve çay saati", en: "Ramadan and tea time in Elazığ" },
    body: {
      tr: "Anadolu Ajansı'nın aktardığına göre Elazığ'da yöre halkı badem şekerini geleneksel olarak, özellikle ramazan aylarında iftardan sonraki çay saatlerinde çerez ya da tatlı niyetine tüketir. Bir ustanın beyanına göre ramazanda satışlar 5-6 kat artar; bir tüketici ise \"çayımızı yudumlarken yanında badem şekeri olmazsa olmazımızdır\" diyor.",
      en: "As reported by Anadolu Agency, in Elazığ people traditionally enjoy badem şekeri as a snack or sweet at tea time after iftar, especially during Ramadan. One master says sales rise 5-6 times in Ramadan, and a customer says badem şekeri is a must alongside their tea.",
    },
    source: "NTV / Anadolu Ajansı — Elazığ'ın yöresel lezzeti badem şekeri ramazanda damakları tatlandırıyor (25.04.2021)",
    sourceUrl: "https://www.ntv.com.tr/yasam/elazigin-yoresel-lezzeti-badem-sekeri-ramazanda-damaklari-tatlandiriyor,ejVt3w2upk2SoYWsLudOPQ",
  },
  {
    id: "culture-elazig-geographical-indication",
    category: "culture",
    title: { tr: "Coğrafi işaret çalışması", en: "Geographical indication effort" },
    body: {
      tr: "Elazığ Hakimiyet Haber'deki bir yazıya göre Elazığ Ticaret ve Sanayi Odası'nın coğrafi ürünler komisyonu, \"Badem Şekeri\" için de çalışma başlatmıştır. Çalışma başlamış olması, ürünün tescilli olduğu anlamına gelmez; güncel durum için TÜRKPATENT kayıtlarına bakılmalıdır.",
      en: "According to a piece in the local paper Elazığ Hakimiyet Haber, the Elazığ Chamber of Commerce and Industry's geographical-products commission has started work on \"Badem Şekeri\" as well. Starting work does not mean it is registered; check TÜRKPATENT records for the current status.",
    },
    source: "Elazığ Hakimiyet Haber — Komisyon çalışıyor",
    sourceUrl: "https://www.elazighakimiyethaber.com/komisyon-calisiyor/51145/",
  },

  // ───────────── SAĞLIK (health) — yalnızca genel, kaynaklı beslenme bilgisi ─────────────
  {
    id: "health-almond-nutrition",
    category: "health",
    title: { tr: "Bademin besin değerleri", en: "Nutrition facts of almonds" },
    body: {
      tr: "USDA FoodData Central'a göre (SR Legacy, \"Nuts, almonds\") 100 g sade badem: 579 kcal, 21,15 g protein, 49,93 g yağ, 21,55 g karbonhidrat ve 12,5 g lif içerir. 1 ons (28,35 g; yaklaşık 23 badem) ise yaklaşık 164 kcal, 6,0 g protein, 14,2 g yağ, 6,1 g karbonhidrat ve 3,5 g lif eder. Bunlar sade bademin değerleridir; şeker kaplı badem şekerinde şeker nedeniyle değerler farklıdır.",
      en: "According to USDA FoodData Central (SR Legacy, \"Nuts, almonds\"), 100 g of plain almonds contain 579 kcal, 21.15 g protein, 49.93 g fat, 21.55 g carbohydrate and 12.5 g fibre. One ounce (28.35 g; about 23 almonds) is roughly 164 kcal, 6.0 g protein, 14.2 g fat, 6.1 g carbohydrate and 3.5 g fibre. These are values for plain almonds; sugar-coated badem şekeri differs because of the added sugar.",
    },
    source: "USDA FoodData Central — Nuts, almonds (SR Legacy, 170567)",
    sourceUrl: "https://fdc.nal.usda.gov/food-details/170567/nutrients",
  },
  {
    id: "health-allergen",
    category: "health",
    title: { tr: "Alerji uyarısı: badem bir ağaç yemişidir", en: "Allergy notice: almonds are a tree nut" },
    body: {
      tr: "Badem, Türkiye'de gıda etiketlemesinde alerjen olarak bildirilmesi gereken \"sert kabuklu meyveler\" grubunda yer alır (badem, fındık, ceviz vb.). Ağaç yemişi alerjisi olanlar badem şekerinden uzak durmalı ve ambalajdaki alerjen bilgisini okumalıdır. Şüphe halinde bir hekime danışılmalıdır.",
      en: "Almonds belong to the \"tree nuts\" group (almond, hazelnut, walnut, etc.) that must be declared as an allergen on food labels in Türkiye. People with a tree-nut allergy should avoid badem şekeri and read the allergen information on the package. If in doubt, ask a doctor.",
    },
    source: "T.C. Tarım ve Orman Bakanlığı, Güvenilir Gıda — Gıda etiketlemede alerjen bildirimi",
    sourceUrl: "https://guvenilirgida.tarimorman.gov.tr/Haber/Detay/15362",
  },
  {
    id: "health-free-sugars",
    category: "health",
    title: { tr: "Şeker tüketimi için DSÖ önerisi", en: "WHO guidance on sugar intake" },
    body: {
      tr: "Dünya Sağlık Örgütü (DSÖ), yetişkinlerin ve çocukların serbest şeker alımını toplam enerjinin %10'undan az tutmasını önerir; %5'in altına inmek ise yaklaşık 25 gram (6 çay kaşığı) günlük miktar anlamına gelir ve ek fayda sağlayabilir. Şeker kaplaması üreticinin eklediği bir şekerdir; DSÖ tanımına göre serbest şekerdir. Bu yüzden badem şekerini ölçülü tüketmek iyi bir fikirdir.",
      en: "The World Health Organization (WHO) recommends that adults and children keep free-sugars intake below 10% of total energy; going below 5%, roughly 25 grams (6 teaspoons) a day, may give additional benefits. The sugar coating is sugar added by the maker, which counts as free sugars under WHO's definition. So enjoying badem şekeri in moderation is a sensible idea.",
    },
    source: "Dünya Sağlık Örgütü (WHO) — Şeker alımının azaltılması çağrısı (2015)",
    sourceUrl: "https://www.who.int/news/item/04-03-2015-who-calls-on-countries-to-reduce-sugars-intake-among-adults-and-children",
  },
  {
    id: "health-dental-moderation",
    category: "health",
    title: { tr: "Diş sağlığı, ölçü ve hekim notu", en: "Dental health, moderation and a note on doctors" },
    body: {
      tr: "DSÖ'ye göre diş çürüğü, diş yüzeyindeki plağın gıdalardaki serbest şekerleri aside çevirmesiyle oluşur; sık şeker tüketimi, yetersiz flor ve yetersiz fırçalama bunu artırır. DSÖ, flor içeren macunla günde iki kez diş fırçalamayı önerir. Şekerli ürünleri ölçülü tüketin. Bu site genel bilgi verir, tıbbi tavsiye vermez; sağlık sorunlarınız için hekiminize ya da diş hekiminize danışın.",
      en: "According to WHO, tooth decay occurs when plaque on the tooth converts free sugars from food into acids; frequent sugar intake, too little fluoride and too little brushing raise the risk. WHO encourages brushing twice a day with fluoride toothpaste. Enjoy sweets in moderation. This site gives general information, not medical advice; for any health concern, please consult your doctor or dentist.",
    },
    source: "Dünya Sağlık Örgütü (WHO) — Oral health fact sheet",
    sourceUrl: "https://www.who.int/news-room/fact-sheets/detail/oral-health",
  },
];
