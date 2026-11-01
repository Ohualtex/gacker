import type { Locale } from "@/lib/i18n";

type Localized = Record<Locale, string>;

export type ProducerSocials = {
  instagram?: string;
  facebook?: string;
  x?: string;
  youtube?: string;
  tiktok?: string;
  website?: string;
};

export type ProducerLink = {
  label: Localized;
  url: string;
};

/**
 * Üretici/satıcı veri şeması.
 * Kayıtlar `src/data/guides/elazig_badem_sekeri_rehberi.md` rehberinden derlenmiştir.
 * `demo: true` olan kayıtlar arayüzde "Örnek içerik" etiketi taşır.
 */
export type Producer = {
  slug: string;
  name: string;
  demo?: boolean;
  role?: Localized;
  tagline: Localized;
  story: Localized;
  city: string;
  address?: string;
  branches?: Localized[];
  coordinates?: { lat: number; lng: number };
  website?: string;
  instagram?: string;
  phone?: string;
  image?: string;
  socials?: ProducerSocials;
  extraLinks?: ProducerLink[];
  mapUrl?: string;
  products?: Localized[];
  hours?: Localized;
};

export const producers: Producer[] = [
  {
    slug: "gurbuzler",
    name: "Gürbüzler Kuruyemiş",
    role: {
      tr: "Entegre üretici · Fabrika satış · E-ticaret",
      en: "Integrated maker · Factory shop · E-commerce",
    },
    tagline: {
      tr: "1960 kökenli; 1985’te badem şekerini ticari kazanlara taşıyan çarşı ve fabrika markası.",
      en: "Roots in 1960; the shop that moved almond candy onto commercial copper pans in 1985.",
    },
    story: {
      tr: "Gürbüzler markasının kökleri 1960 yılına dayanır. Rehbere göre Elazığ’da badem şekeri üretiminin bugünkü yaygın hâline gelmesinde 1985 bir dönüm noktasıdır. İşletmeci Hakverdi İşlek’in anlatımına göre 1980’lerin ortalarına kadar badem şekeri ustalığı çarşıda açıkça yapılmayan, evlerde saklanan tariflerle sınırlı bir zanaattı. Gürbüzler, 1985’te döner bakır kazanları kurarak bu üretimi imalathane ve ticari mağaza ortamına taşımış; “1960’tan Günümüze Kalite” sloganıyla klasik beyaz badem şekerinin yanı sıra vişneli badem şekerini de geniş kitlelere ulaştıran öncülerden olmuştur.",
      en: "The Gürbüzler name goes back to 1960. According to the team guide, 1985 is the turning point in Elazığ’s modern almond-candy trade. Operator Hakverdi İşlek says that until the mid-1980s the craft was kept almost as a household secret, not practised openly in the bazaar. Gürbüzler set up rotating copper pans in 1985, moved the work into a workshop and shop, and — under the line “Quality since 1960” — helped carry both the classic white candy and the sour-cherry version to a wider public.",
    },
    city: "Elazığ",
    address:
      "Fabrika & Merkez Mağaza: Bingöl Yolu Üzeri 8. Km, Kekliktepe Mevkii, Akçakiraz, Merkez / Elazığ",
    branches: [
      {
        tr: "Çarşı Şubesi — Çarşı Mah., Aksaray Cad. No:9 (ve No:19), Merkez / Elazığ",
        en: "Bazaar shop — Çarşı Mah., Aksaray Cad. No:9 (and No:19), Merkez / Elazığ",
      },
      {
        tr: "Cumhuriyet Şubesi — Cumhuriyet Mah., Beyzade Efendi Bulvarı, Osman Bey Çarşısı No:2, Merkez / Elazığ",
        en: "Cumhuriyet shop — Cumhuriyet Mah., Beyzade Efendi Blvd, Osman Bey Çarşısı No:2, Merkez / Elazığ",
      },
    ],
    website: "https://gurbuzlerkuruyemis.com.tr",
    instagram: "https://www.instagram.com/gurbuzlerkuruyemis",
    phone: "0424 275 26 97 / 0424 238 29 19",
    image: "/producers/prod-white-candy.jpg",
    socials: {
      website: "https://gurbuzlerkuruyemis.com.tr",
      instagram: "https://www.instagram.com/gurbuzlerkuruyemis",
    },
    extraLinks: [
      { label: { tr: "Çerezciniz", en: "Çerezciniz" }, url: "https://cerezciniz.com" },
      {
        label: { tr: "Instagram (online)", en: "Instagram (online)" },
        url: "https://www.instagram.com/cerezciniz",
      },
    ],
    mapUrl: "https://www.google.com/maps/search/?api=1&query=G%C3%BCrb%C3%BCzler+Kuruyemi%C5%9F+Kekliktepe+Elaz%C4%B1%C4%9F",
    products: [
      { tr: "Geleneksel ince kabuklu Elazığ badem şekeri", en: "Classic thin-shelled Elazığ almond candy" },
      { tr: "Vişneli badem şekeri", en: "Sour-cherry almond candy" },
      { tr: "Ağın leblebisi", en: "Ağın roasted chickpeas" },
      { tr: "Elazığ orciği (cevizli sucuk)", en: "Elazığ orcik (walnut sausage)" },
    ],
  },
  {
    slug: "ece-cerez",
    name: "Ece Çerez",
    role: {
      tr: "Üretici · Perakende · E-ticaret",
      en: "Maker · Retail · E-commerce",
    },
    tagline: {
      tr: "Bağdere tesisi ve cadde şubeleriyle modern paketlemede badem ve ceviz şekeri.",
      en: "Almond and walnut candy from the Bağdere plant and city-centre shops.",
    },
    story: {
      tr: "Ece Çerez, rehbere göre Elazığ’ın kuruyemiş ve badem şekeri geleneğini endüstriyel hijyen ve modern paketlemeyle buluşturan markalardandır. Merkez Bağdere Köyü’ndeki üretim tesisi ve şehir merkezindeki cadde mağazalarıyla çalışır. Klasik badem şekerinin yanında, zanaattan esinlenen “Ceviz Şekeri” ve “Vişneli Ceviz Şekeri” gibi ürünleri de öne çıkarır; tescil iddiası işletmenin kendi anlatımıdır.",
      en: "According to the guide, Ece Çerez is one of the names that pair Elazığ’s nut-and-candy craft with industrial hygiene and modern packing. It runs a plant in Bağdere village and street-front shops in the city centre. Beside the classic almond candy it highlights walnut candy and sour-cherry walnut candy; any registration claim is the firm’s own account.",
    },
    city: "Elazığ",
    address: "Merkez Mağaza: İcadiye Mah., Hürriyet Cad. No:67 (Kuyulu Sok. No:14), Merkez / Elazığ",
    branches: [
      {
        tr: "Çarşı Şubesi — Çarşı Mah., Kışla Cad. No:8/A, Merkez / Elazığ",
        en: "Bazaar shop — Çarşı Mah., Kışla Cad. No:8/A, Merkez / Elazığ",
      },
      {
        tr: "Üretim tesisi — Bağdere Köyü, Merkez / Elazığ",
        en: "Plant — Bağdere Village, Merkez / Elazığ",
      },
    ],
    website: "https://ececerez.com",
    instagram: "https://www.instagram.com/ececerezcom",
    phone: "0545 774 23 23 / 0424 238 79 96",
    image: "/producers/prod-walnut-candy.jpg",
    socials: {
      website: "https://ececerez.com",
      instagram: "https://www.instagram.com/ececerezcom",
      facebook: "https://www.facebook.com/ececerez",
    },
    extraLinks: [
      { label: { tr: "WhatsApp", en: "WhatsApp" }, url: "https://wa.me/905457742323" },
    ],
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Ece+%C3%87erez+H%C3%BCrriyet+Caddesi+Elaz%C4%B1%C4%9F",
    products: [
      { tr: "İnce kabuklu beyaz badem şekeri", en: "Thin-shelled white almond candy" },
      { tr: "Vişneli badem şekeri", en: "Sour-cherry almond candy" },
      { tr: "Ceviz şekeri", en: "Walnut candy" },
      { tr: "Ağın leblebisi", en: "Ağın roasted chickpeas" },
      { tr: "Köpük orcik", en: "Foam orcik" },
    ],
  },
  {
    slug: "gundogdu-coskun-usta",
    name: "Gündoğdu Gıda & Coşkun Usta",
    role: {
      tr: "Butik imalat · Kapalı Çarşı esnafı",
      en: "Boutique workshop · Covered bazaar",
    },
    tagline: {
      tr: "İmam Gündoğdu ve Coşkun Ceylan; vişneli, kahveli ve limonlu badem şekeri.",
      en: "İmam Gündoğdu and Coşkun Ceylan: cherry, coffee and lemon almond candy.",
    },
    story: {
      tr: "Tarihi Elazığ Kapalı Çarşısı’nda çalışan İmam Gündoğdu ve usta Coşkun Ceylan, rehbere göre yıllarca yalnızca klasik beyaz üretilen badem şekerine kentin vişne suyunu katmışlardır. Pembe, mayhoş “Vişneli Badem Şekeri”nin patenti işletmenin kendi anlatımıdır. Aynı anlatıya göre yaz aylarına özel limonlu ve kısa bir deneme sürecinin ardından Türk kahveli badem şekeri de üretilmiş; bu çeşitler yerel basında ve ulusal televizyonlarda yer almıştır.",
      en: "In the historic covered bazaar, İmam Gündoğdu and master Coşkun Ceylan — according to the guide — folded Elazığ sour-cherry juice into a candy that had long been made only in white. The pink, tart “sour-cherry almond candy” patent is the shop’s own account. The same account says a lemon version for summer and a Turkish-coffee version followed a short trial, and that the range appeared in local press and on national television.",
    },
    city: "Elazığ",
    address: "Çarşı Mah., Tarihi Kapalı Çarşı, Belediye Sokak No:8, Merkez / Elazığ",
    image: "/producers/prod-cherry-candy.jpg",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=G%C3%BCndo%C4%9Fdu+G%C4%B1da+Kapal%C4%B1+%C3%87ar%C5%9F%C4%B1+Elaz%C4%B1%C4%9F",
    products: [
      { tr: "Vişneli badem şekeri", en: "Sour-cherry almond candy" },
      { tr: "Türk kahveli badem şekeri", en: "Turkish-coffee almond candy" },
      { tr: "Limonlu badem şekeri", en: "Lemon almond candy" },
      { tr: "Geleneksel beyaz badem şekeri", en: "Classic white almond candy" },
    ],
  },
  {
    slug: "tarihi-leblebici",
    name: "Tarihi Elazığ Leblebicisi",
    role: {
      tr: "Tarihi çarşı imalatçısı · Perakende ve online",
      en: "Historic-bazaar workshop · Shop and online",
    },
    tagline: {
      tr: "İşçiler Sokak’ta günlük taze badem şekeri ve Ağın leblebisi.",
      en: "Daily-fresh almond candy and Ağın leblebi on İşçiler Street.",
    },
    story: {
      tr: "Kapalı Çarşı’nın hemen bitişiğindeki İşçiler Sokak’ta çalışan işletme, rehbere göre Harput ve Elazığ’ın kuruyemiş-şekerleme mirasını korumayı misyon edinmiştir. Meşe külü suyuyla haşlanıp kumda kavrulan Ağın leblebisinin yanı sıra dükkân içinde döner bakır kazanlarda pancar şekeri şerbetiyle günlük taze badem şekeri çeker. Yerel halkın bayramlarda ve ramazan iftarlarından sonra uğradığı çarşı duraklarından biri olarak anlatılır.",
      en: "Just off the covered bazaar on İşçiler Street, the shop — according to the guide — sets out to keep Harput and Elazığ’s nut-and-candy craft. Beside Ağın leblebi (boiled with oak-ash water, roasted in sand) it pulls daily-fresh almond candy in rotating copper pans with beet-sugar syrup. It is described as a stop locals make at holidays and after Ramadan iftars.",
    },
    city: "Elazığ",
    address: "Çarşı Mah., İşçiler Sok. No:31 (veya No:53), Merkez / Elazığ",
    website: "https://tarihielazigleblebicisi.com.tr",
    instagram: "https://www.instagram.com/tarihielazigleblebicisi",
    phone: "0424 233 59 63",
    image: "/producers/prod-leblebi.jpg",
    socials: {
      website: "https://tarihielazigleblebicisi.com.tr",
      instagram: "https://www.instagram.com/tarihielazigleblebicisi",
    },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Tarihi+Elaz%C4%B1%C4%9F+Leblebicisi+%C4%B0%C5%9F%C3%A7iler+Sokak+Elaz%C4%B1%C4%9F",
    products: [
      { tr: "Günlük taze Elazığ badem şekeri", en: "Daily-fresh Elazığ almond candy" },
      { tr: "Ağın leblebisi", en: "Ağın roasted chickpeas" },
      { tr: "Çedene kahvesi", en: "Çedene coffee" },
      { tr: "Harput dut pestili ve orciği", en: "Harput mulberry fruit leather and orcik" },
    ],
  },
  {
    slug: "saray-kuruyemis",
    name: "Saray Kuruyemiş",
    role: {
      tr: "Çarşı mağazası · Yöresel ürün · E-ticaret",
      en: "Bazaar shop · Regional goods · E-commerce",
    },
    tagline: {
      tr: "2. Harput Sokak’ta yaklaşık üç saatlik kazan işiyle butik üretim.",
      en: "Boutique work on 2. Harput Street, about three hours at the pan.",
    },
    story: {
      tr: "Çarşı Mahallesi 2. Harput Sokak’taki Saray Kuruyemiş, rehbere göre badem şekerini geleneksel kazanda üreten çarşı işletmelerindendir. Anlatılan süreç: yerli bademler yaklaşık bir saat kavrulur, ardından özel kazanlarda iki saat kadar pancar şerbetiyle sıvanır; toplamda üç saate yaklaşan bir iş. Taze kuruyemiş ve drajeler hem çarşı mağazasından hem Shopier üzerinden gönderilir.",
      en: "On 2. Harput Street in the bazaar quarter, Saray Kuruyemiş is — according to the guide — one of the shops that still coats almonds in the traditional pan. The account: local almonds roast for about an hour, then take around two hours in beet-sugar syrup; roughly three hours of work. Fresh nuts and dragées go out from the shop and through Shopier.",
    },
    city: "Elazığ",
    address: "Çarşı Mah., 2. Harput Sok. No:16, Merkez / Elazığ",
    website: "https://saraykuruyemis.com.tr",
    instagram: "https://www.instagram.com/saraykuruyemis23",
    phone: "0539 263 23 52",
    image: "/producers/prod-kazan.jpg",
    socials: {
      website: "https://saraykuruyemis.com.tr",
      instagram: "https://www.instagram.com/saraykuruyemis23",
    },
    extraLinks: [
      { label: { tr: "Shopier", en: "Shopier" }, url: "https://www.shopier.com/saraykuruyemis" },
    ],
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Saray+Kuruyemi%C5%9F+2.+Harput+Sokak+Elaz%C4%B1%C4%9F",
    products: [
      { tr: "Klasik ince kabuklu badem şekeri", en: "Classic thin-shelled almond candy" },
      { tr: "Antep fıstıklı şekerleme", en: "Pistachio confectionery" },
      { tr: "Yöresel menengiç ve dibek kahvesi", en: "Regional menengiç and stone-ground coffee" },
    ],
  },
  {
    slug: "etak",
    name: "ETAK",
    role: {
      tr: "Kooperatif üretimi · Sosyal girişim",
      en: "Cooperative production · Social enterprise",
    },
    tagline: {
      tr: "Yerli Fırat bademi ve pancar şekeriyle standart denetimli üretim.",
      en: "Standard-watched production with local Fırat almonds and beet sugar.",
    },
    story: {
      tr: "Elazığ Tarımsal Kalkınma Kooperatifi (ETAK), rehbere göre coğrafi işaretli ve köklü yöresel lezzetleri aslına uygun korumak, çiftçiyi ve yerel üreticiyi desteklemek için kurulmuştur. Endüstriyel glikoz şurubu veya ithal sert bademlere karşı, badem şekerini yalnızca yerli Fırat havzası bademleri ve pancar şekeri şerbetiyle geleneksel reçeteye göre ürettiğini söyler. Coğrafi işaret statüsü işletmenin/kooperatifin kendi standardı olarak aktarılır; resmi tescil için TÜRKPATENT kaydına bakılmalıdır.",
      en: "The Elazığ Agricultural Development Cooperative (ETAK), according to the guide, was set up to keep regional foods close to their original form and to support farmers. Against industrial glucose syrup or imported hard almonds, it says it coats candy only with local Fırat-basin almonds and beet-sugar syrup. Any geographical-indication status is the cooperative’s own standard as told here; check TÜRKPATENT for a formal registration.",
    },
    city: "Elazığ",
    address: "Elazığ Merkez / Elazığ",
    website: "https://etak.com.tr",
    instagram: "https://www.instagram.com/etakkooperatif",
    image: "/producers/prod-orcik.jpg",
    socials: {
      website: "https://etak.com.tr",
      instagram: "https://www.instagram.com/etakkooperatif",
    },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Elaz%C4%B1%C4%9F+Tarımsal+Kalkınma+Kooperatifi+Elaz%C4%B1%C4%9F",
    products: [
      { tr: "Geleneksel Elazığ badem şekeri", en: "Traditional Elazığ almond candy" },
      { tr: "Katkısız orcik", en: "Unadulterated orcik" },
      { tr: "Ağın leblebisi", en: "Ağın roasted chickpeas" },
      { tr: "Yöresel dut mamulleri", en: "Regional mulberry goods" },
    ],
  },
  {
    slug: "elazig-yoresel",
    name: "Elazığ Yöresel",
    role: {
      tr: "Yöresel e-ticaret · Kadın girişimi",
      en: "Regional e-commerce · Family venture",
    },
    tagline: {
      tr: "Kapalı Çarşı şekeri; vakumlu ambalajla gurbete.",
      en: "Covered-bazaar candy, sealed and sent to the diaspora.",
    },
    story: {
      tr: "Songül Sarı ve ailesinin kurduğu Elazığ Yöresel, rehbere göre ev yapımı tadında butik Elazığ ürünlerini doğrudan tüketiciye ulaştırma fikrinden doğmuştur. Kapalı Çarşı’nın taze çekilmiş badem şekerlerini vakumlu ve kilitli ambalajlarda paketleyerek gurbetçi Elazığlılara ve gastronomi meraklılarına gönderir.",
      en: "Started by Songül Sarı and her family, Elazığ Yöresel — according to the guide — grew from the idea of sending homemade-style Elazığ goods straight to the buyer. It packs freshly pulled covered-bazaar almond candy in vacuum and zip bags for Elazığlıs abroad and for anyone who wants the taste.",
    },
    city: "Elazığ",
    address: "Merkez / Elazığ",
    website: "https://www.elazigyoresel.com",
    instagram: "https://www.instagram.com/elazigyoresel",
    phone: "0539 483 29 18",
    image: "/producers/prod-gift.jpg",
    socials: {
      website: "https://www.elazigyoresel.com",
      instagram: "https://www.instagram.com/elazigyoresel",
    },
    extraLinks: [
      { label: { tr: "elazigyoresel.com.tr", en: "elazigyoresel.com.tr" }, url: "https://www.elazigyoresel.com.tr" },
      { label: { tr: "WhatsApp sipariş", en: "WhatsApp order" }, url: "https://wa.me/905394832918" },
    ],
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Elaz%C4%B1%C4%9F+Y%C3%B6resel+%C3%9Cr%C3%BCnler+Merkez+Elaz%C4%B1%C4%9F",
    products: [
      { tr: "Taze beyaz badem şekeri", en: "Fresh white almond candy" },
      { tr: "Vişneli badem şekeri", en: "Sour-cherry almond candy" },
      { tr: "Ev yapımı dut orciği", en: "Homemade mulberry orcik" },
      { tr: "Yöresel baharatlar", en: "Regional spices" },
    ],
  },
  {
    slug: "kapali-carsi-esnaf",
    name: "Kapalı Çarşı Esnafı",
    role: {
      tr: "Canlı imalat · Yaşayan miras",
      en: "Live making · Living craft",
    },
    tagline: {
      tr: "Bakırcılar koridorunda dumanı üstünde çekilen badem şekeri.",
      en: "Candy pulled while you watch in the coppersmiths’ corridor.",
    },
    story: {
      tr: "Elazığ’da badem şekeri kültürünün kalbi, rehbere göre Çarşı Mahallesi’ndeki Tarihi Kapalı Çarşı ve Bakırcılar koridorlarında atar. Fatih Korucu, Sadıklar Gıda ve kıdemli ustalar; dükkân önüne kurdukları döner bakır kazanlarda, alttan verilen hafif ısı ve üflenen sıcak havayla bademleri saatlerce döndürüp şeker şerbetiyle kaplar. Burası alışveriş noktası olduğu kadar canlı bir üretim atölyesidir. Ramazan’da çarşıdan yükselen kavrulmuş badem ve vanilyalı pancar şekeri kokusu kentin simgesi olarak anlatılır.",
      en: "According to the guide, the heart of Elazığ’s almond-candy culture beats in the historic covered bazaar and the coppersmiths’ corridor. Fatih Korucu, Sadıklar Gıda and senior masters set rotating copper pans at the shop front, turn the almonds for hours over a low heat with blown warm air, and coat them in sugar syrup. It is a workshop as much as a market. In Ramadan the smell of roasted almonds and vanilla beet sugar is told as a city emblem.",
    },
    city: "Elazığ",
    address: "Çarşı Mah., Tarihi Kapalı Çarşı & Bakırcılar İçi, Merkez / Elazığ",
    image: "/producers/prod-bazaar.jpg",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Tarihi+Kapal%C4%B1+%C3%87ar%C5%9F%C4%B1+Elaz%C4%B1%C4%9F",
    products: [
      { tr: "Günlük çekilmiş badem şekeri", en: "Candy pulled the same day" },
      { tr: "Canlı kazan gösterisi", en: "Live copper-pan making" },
    ],
  },
];

export const getProducer = (slug: string): Producer | undefined =>
  producers.find((p) => p.slug === slug);

export const mapsUrl = (p: Producer): string | undefined => {
  if (p.mapUrl) return p.mapUrl;
  const query = p.coordinates
    ? `${p.coordinates.lat},${p.coordinates.lng}`
    : [p.address, p.city].filter(Boolean).join(", ");
  if (!query) return undefined;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
};

export function splitPhones(phone?: string): string[] {
  if (!phone) return [];
  return phone.split(/\s*\/\s*/).map((p) => p.trim()).filter(Boolean);
}
