import type { Locale } from "@/lib/i18n";

/**
 * Asistanın dayanak bilgisi. Yalnızca güvenli, genel doğrular burada yer alır.
 * Üretici, fiyat, tarih ve tarihçe iddiaları doğrulanmadan BURAYA yazılmaz:
 * önce `todoVerify` listesinde bekler, takım kaynağı doğrulayınca `knowledge`a taşınır.
 */
export type KnowledgeEntry = {
  topic: string;
  tr: string;
  en: string;
};

export const knowledge: KnowledgeEntry[] = [
  {
    topic: "Badem şekeri nedir",
    tr: "Badem şekeri, bademin şeker kaplanarak hazırlandığı geleneksel bir ikram ve tatlıdır. Dışı sert ve şekerli, içi çıtır bademdir.",
    en: "Almond candy (badem şekeri) is a traditional treat of almonds coated in sugar: a hard, sweet shell around a crunchy almond.",
  },
  {
    topic: "İkram ve hediye kültürü",
    tr: "Türkiye'de badem şekeri; bayramlarda ve nikâh, nişan, sünnet gibi özel günlerde özel paketlerde ikram edilir. Düğünlerde konuklara verilen \"gelin/nikâh şekeri\"nin ana malzemesi de badem şekeridir. Mardin'de bayram ziyaretine gelen misafirlere ikram edildiği de haberlerde anlatılır. (Kaynak: Türk Tarım Orman Dergisi, Vikipedi, AA)",
    en: "In Türkiye, badem şekeri is offered in special packages at holidays and on occasions such as weddings, engagements and circumcision celebrations. The \"bride's/wedding candy\" given to guests is mainly badem şekeri. News reports also describe it being served to visiting guests at holidays in Mardin. (Sources: Turkish Agriculture & Forestry magazine, Wikipedia, AA)",
  },
  // — candyFacts'tan türeyen, kaynağı doğrulanmış kısa girdiler (ayrıntı: src/data/candy-info.ts) —
  {
    topic: "Badem şekeri tek bir yöreye özgü değil",
    tr: "Şeker kaplı badem dünyada yaygın bir şekerleme ailesidir (Fransızca \"dragée\", İngilizce \"Jordan almonds\", İtalya'da Sulmona confetti'leri, Portekiz'de Paskalya bademleri). Türkiye'de de Mardin'in mavi renkli İmlebbes'i (23.12.2009'da coğrafi işaretle tescilli) başka bir yöresel örnektir. Elazığ'da da çok sevilen bir lezzettir; \"yalnızca Elazığ'a özgü\" denemez.",
    en: "Sugar-coated almonds are a confection family found worldwide (French \"dragée\", English \"Jordan almonds\", Italy's Sulmona confetti, Portugal's Easter almonds). In Türkiye, Mardin's blue İmlebbes (registered as a geographical indication on 23 Dec 2009) is another regional example. It is much loved in Elazığ too, but it cannot be called unique to Elazığ.",
  },
  {
    topic: "Elazığ'da badem şekeri ve ramazan",
    tr: "Anadolu Ajansı'nın 2021 haberine göre Elazığ'da badem şekeri, özellikle ramazanda iftardan sonraki çay saatlerinde çerez ya da tatlı niyetine tüketilir. Bir ustanın beyanına göre ramazanda satışlar 5-6 kat artar (kişisel beyan).",
    en: "According to a 2021 Anadolu Agency report, in Elazığ badem şekeri is enjoyed as a snack or sweet at tea time after iftar, especially in Ramadan. One master says sales rise 5-6 times in Ramadan (personal claim).",
  },
  {
    topic: "Yapılışı (genel, tarifsiz)",
    tr: "Badem şekeri, bademin dönen bir kazanda şerbetle katman katman şekerle kaplanmasıyla yapılır. Elazığ'daki ustalar kavrulmuş iri yerli bademi, pancar şekerinden yapılan şerbet ve sıcak hava eşliğinde kaplayıp işlemi birkaç kez tekrarladıklarını, işin yaklaşık 3 saat sürdüğünü anlatıyor (usta beyanı). Tarif ve malzeme oranı verilmez.",
    en: "Badem şekeri is made by coating almonds with sugar layer by layer in a rotating pan using syrup. Elazığ masters describe roasting large local almonds and coating them with syrup made from beet sugar and hot air, repeating the process several times, taking about 3 hours (master's account). No recipe or ratios are given.",
  },
  {
    topic: "Bademin besin değerleri (USDA)",
    tr: "USDA FoodData Central'a göre 100 g sade badem: 579 kcal, 21,15 g protein, 49,93 g yağ, 21,55 g karbonhidrat, 12,5 g lif. 28,35 g (1 ons, yaklaşık 23 badem): yaklaşık 164 kcal, 6,0 g protein, 14,2 g yağ, 6,1 g karbonhidrat, 3,5 g lif. Bunlar SADE bademin değerleridir; şeker kaplı badem şekerinde değerler farklıdır.",
    en: "According to USDA FoodData Central, 100 g of PLAIN almonds: 579 kcal, 21.15 g protein, 49.93 g fat, 21.55 g carbohydrate, 12.5 g fibre. 28.35 g (1 oz, about 23 almonds): about 164 kcal, 6.0 g protein, 14.2 g fat, 6.1 g carbohydrate, 3.5 g fibre. These are values for plain almonds; sugar-coated badem şekeri differs.",
  },
  {
    topic: "Alerji uyarısı",
    tr: "Badem bir ağaç yemişidir (sert kabuklu meyve); Türkiye'de gıda etiketinde alerjen olarak bildirilmesi gereken gruptadır. Ağaç yemişi alerjisi olanlar badem şekerini tüketmemeli, ambalajdaki alerjen bilgisini okumalı, şüphede hekime danışmalıdır.",
    en: "Almond is a tree nut and belongs to the group that must be declared as an allergen on food labels in Türkiye. People with a tree-nut allergy should not eat badem şekeri, should read the package's allergen information, and should ask a doctor if unsure.",
  },
  {
    topic: "Şeker tüketimi için DSÖ önerisi",
    tr: "Dünya Sağlık Örgütü, serbest şeker alımının toplam enerjinin %10'undan az olmasını önerir; %5'in altı (yaklaşık 25 g, 6 çay kaşığı) ek fayda sağlayabilir. Badem şekerinin kaplaması eklenmiş şekerdir; bu yüzden ölçülü tüketim önerilir.",
    en: "The World Health Organization recommends keeping free-sugars intake below 10% of total energy; below 5% (about 25 g, 6 teaspoons) may give extra benefits. The coating of badem şekeri is added sugar, so moderation is advised.",
  },
  {
    topic: "Diş sağlığı notu",
    tr: "DSÖ'ye göre diş çürüğü, plağın serbest şekerleri aside çevirmesiyle oluşur; sık şeker tüketimi, yetersiz flor ve yetersiz fırçalama riski artırır. Flor içeren macunla günde iki kez fırçalama önerilir. Bu bir tıbbi tavsiye değildir; sağlık için hekime ya da diş hekimine danışılmalıdır.",
    en: "According to WHO, tooth decay occurs when plaque turns free sugars into acids; frequent sugar, too little fluoride and too little brushing raise the risk. Brushing twice a day with fluoride toothpaste is encouraged. This is not medical advice; ask a doctor or dentist for health matters.",
  },
  {
    topic: "Elazığ ve Harput",
    tr: "Elazığ, Doğu Anadolu Bölgesi'nde, Fırat Havzası'nda yer alan bir şehirdir. Harput ise Elazığ'ın tarihi yerleşimidir ve şehrin kültür kimliğinin önemli bir parçasıdır.",
    en: "Elazığ is a city in Eastern Anatolia, in the Euphrates basin. Harput is Elazığ's historic settlement and an important part of the city's cultural identity.",
  },
  {
    topic: "Site hakkında",
    tr: "Bu site, 1 Kasım 2026'da Elazığ'daki GakCoding etkinliğinde Gacker takımı tarafından yapılmış bir tanıtım ve hikâye sitesidir. Siteyi gezerken Hikâye, Üreticiler, Keşfet ve İletişim sayfalarına bakılabilir.",
    en: "This site is an introduction and storytelling site built by the Gacker team at the GakCoding event in Elazığ on 1 November 2026. Visitors can explore the Story, Producers, Discover and Contact pages.",
  },
  {
    topic: "Elazığ üreticileri (takım rehberi)",
    tr: "Sitede şu üreticiler yer alır: Gürbüzler Kuruyemiş, Ece Çerez, Gündoğdu Gıda & Coşkun Usta, Tarihi Elazığ Leblebicisi, Saray Kuruyemiş, ETAK (Elazığ Tarımsal Kalkınma Kooperatifi), Elazığ Yöresel ve Tarihi Kapalı Çarşı kazan esnafı. Adres, telefon ve ürünler Üreticiler sayfasındadır. Patent, tescil ve süreç iddiaları işletmenin kendi anlatımıdır.",
    en: "The site lists these makers: Gürbüzler Kuruyemiş, Ece Çerez, Gündoğdu Gıda & Coşkun Usta, Tarihi Elazığ Leblebicisi, Saray Kuruyemiş, ETAK (Elazığ Agricultural Development Cooperative), Elazığ Yöresel, and the historic covered-bazaar pan craftsmen. Addresses, phones and products are on the Producers page. Patent, registration and process claims are the firms’ own accounts.",
  },
  {
    topic: "Hakiki Elazığ badem şekeri (takım rehberi)",
    tr: "Takım rehberine göre hakiki Elazığ badem şekerinde kabuk zar gibi incedir, yerli Fırat havzası bademi kullanılır ve kaplama pancar şekeri şerbetiyle yapılır; kalın drajeden ve glikoz şurubundan ayrılır.",
    en: "According to the team guide, genuine Elazığ almond candy has a frost-thin shell, uses local Fırat-basin almonds, and is coated with beet-sugar syrup — unlike a thick dragée or glucose-syrup coat.",
  },
  {
    topic: "Yapay zekâ asistanı",
    tr: "Bu asistan bir yapay zekâ modelidir ve yanılabilir. Doğrulanmış üretici bilgilerini sitenin Üreticiler sayfasında bulabilirsiniz.",
    en: "This assistant is an AI model and can be wrong. Verified producer information can be found on the site's Producers page.",
  },
];

/**
 * TODO_VERIFY: Aşağıdakiler doğrulanmadığı için asistana GERÇEK bilgi olarak verilmez.
 * Asistana yalnızca "bu konuda doğrulanmış bilgim yok" demesi talimatı olarak iletilir.
 * Kaynak bulununca `knowledge` dizisine taşıyın.
 */
export const todoVerify: string[] = [
  "Badem şekerinin Türkiye'de / Elazığ'da ne zaman ve nasıl ortaya çıktığı (\"Osmanlı'dan beri\", \"Harput'a özgü\", \"Elazığ icadı\" gibi iddialar belgelenmedi)",
  "Elazığ badem şekerinin coğrafi işaret / tescil durumu (yerel basında tescil çalışması başladığı yazıldı; tescil teyit edilmedi)",
  "Fiyatlar, gramaj ve sipariş / kargo koşulları",
  "Üretim tarifi ve malzeme oranları",
  "Güncel çalışma saatleri (rehberde saat yok)",
  "Elazığ'daki badem üretim miktarı ve \"yerli badem\" iddiaları",
  "Belirli bir badem şekeri ürününün şeker, kalori ve alerjen içeriği (ürün etiketine bakılmalı; USDA değerleri yalnız sade badem içindir)",
  "Sağlık yararı, tedavi edici etki veya kan şekeri gibi tıbbi iddialar (doğrulanmadı; tıbbi tavsiye verilmez)",
  "Ağız sözlüğünde olmayan Elazığ/Harput sözcük ve deyimlerinin anlamı",
];

export const getKnowledge = (lang: Locale): { topic: string; text: string }[] =>
  knowledge.map((entry) => ({ topic: entry.topic, text: entry[lang] }));
