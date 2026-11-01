import type { Bilingual, LegalDoc } from "./types";

/**
 * Yapay Zekâ Kullanımı ve Telif/Atıf. TASLAK ŞABLON.
 * Müzik kredileri public/audio/ATTRIBUTION.md ile uyumlu tutulmalıdır.
 */
const tr: LegalDoc = {
  title: "Yapay Zekâ Kullanımı, Telif ve Atıf",
  lead: "Sitede nerede yapay zekâ kullanıldığını, müzik, harita verisi, yazı tipleri ve açık kaynak yazılımların kimlere ait olduğunu ve bir içeriğin kaldırılmasını nasıl isteyebileceğinizi açıklar.",
  sections: [
    {
      id: "yapay-zeka",
      title: "1. Yapay zekâ ile hazırlanan içerik",
      blocks: [
        {
          type: "ul",
          items: [
            "Hero videosu, üretici/ürün kartlarındaki temsili stiller, hikâye ve galeri görselleri ile site maskotu (Gakkocan) üretken yapay zekâ araçlarıyla üretilmiş veya yapay zekâ yardımıyla hazırlanmıştır. Bunlar belirli bir işletmenin, kişinin veya ürünün fotoğrafı değildir; temsilî görseldir.",
            "Sitedeki sohbet asistanı üretken bir yapay zekâ modeliyle çalışır ve yanıtları otomatik üretilir ({{page:kullanim-kosullari}}).",
            "Site tasarımı ve yazılımı geliştirilirken yapay zekâ destekli geliştirme araçlarından yararlanılmıştır; içerik ve çıktılar takım üyelerince gözden geçirilmiştir.",
            "Gerçek üretici adları, adresleri ve hikâyeleri takımın Elazığ badem şekeri üretici rehberinden derlenir; yapay zekâ ile uydurulmaz. Patent, tescil ve süreç iddiaları işletmenin kendi anlatımı olarak sunulur. Doğrulanmamış kayıtlar “örnek içerik” olarak etiketlenir.",
          ],
        },
        {
          type: "p",
          text: "Organizatör topluluğun görsel kimliği veya maskotu kopyalanmamıştır.",
        },
      ],
    },
    {
      id: "muzik",
      title: "2. Müzik",
      blocks: [
        {
          type: "p",
          text: "Fon müzikleri serbest lisanslı bağlama kayıtlarıdır; Elazığ'a özgü bir eser değildir.",
        },
        {
          type: "table",
          caption: "Müzik kredileri",
          head: ["Parça", "Hak sahibi", "Lisans", "Değişiklik"],
          rows: [
            [
              "“SAZ instrument ORIGINAL(Chen)record@130bpm”",
              "Hybridkin (Freesound); icracı: Chen. [Kaynak](https://freesound.org/people/Hybridkin/sounds/749332/)",
              "CC0 1.0 (kamu malı bağışı)",
              "MP3'e kodlandı, ses seviyesi normalleştirildi, giriş/çıkış yumuşatıldı",
            ],
            [
              "“turkish-baglama”",
              "xserra (CompMusic), Freesound. [Kaynak](https://freesound.org/people/xserra/sounds/115227/)",
              "[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)",
              "İlk 42 saniye kırpıldı, ses seviyesi normalleştirildi, giriş/çıkış yumuşatıldı",
            ],
            [
              "“Dawoola and Zurna Live”",
              "Assyrio, Wikimedia Commons (kendi çalışması). [Kaynak](https://commons.wikimedia.org/wiki/File:Dawoola_and_Zurna_Live.ogg)",
              "[CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)",
              "90 saniyelik bölüm kesildi, bas frekansları hafifçe kısıldı, ses seviyesi normalleştirildi, giriş/çıkış yumuşatıldı. Değiştirilmiş hâli de CC BY-SA 3.0 ile paylaşılır.",
            ],
          ],
        },
      ],
    },
    {
      id: "harita",
      title: "3. Harita ve coğrafi veri",
      blocks: [
        {
          type: "p",
          text: "İlçe sınırları geoBoundaries (gbOpen, kaynak: OpenStreetMap / OSM Boundaries) verisinden, yer ve su öğeleri OpenStreetMap'ten türetilmiş ve sadeleştirilmiştir. © [OpenStreetMap katkıcıları](https://www.openstreetmap.org/copyright), [Open Database License (ODbL) 1.0](https://opendatacommons.org/licenses/odbl/1-0/) kapsamında. Bu verilerden türetilen veri tabanı da ODbL kapsamındadır; siteye gömülü veri dosyaları sitenin /data/ yolundan alınabilir. Harita görüntülenirken üçüncü taraf harita sunucularına istek gönderilmez.",
        },
      ],
    },
    {
      id: "yazi-tipleri",
      title: "4. Yazı tipleri",
      blocks: [
        {
          type: "p",
          text: "Başlıklarda Gloock, metinlerde Hanken Grotesk kullanılır. Her ikisi de SIL Open Font License 1.1 kapsamında yayımlanmış, Google Fonts üzerinden alınmış yazı tipleridir ve site ile birlikte sunulur. Yazı tiplerinin telif hakları ilgili tasarımcılara aittir.",
        },
      ],
    },
    {
      id: "yazilim",
      title: "5. Açık kaynak yazılımlar",
      blocks: [
        {
          type: "p",
          text: "Site; Next.js, React, Three.js, React Three Fiber, drei, Motion, Tailwind CSS ve Lucide gibi açık kaynak kütüphanelerle geliştirilmiştir. Bu kütüphaneler kendi lisanslarına (çoğunlukla MIT/ISC) tabidir ve telif hakları ilgili geliştiricilere aittir.",
        },
      ],
    },
    {
      id: "kaynaklar",
      title: "6. Metin ve bilgi kaynakları",
      blocks: [
        {
          type: "p",
          text: "Keşfet ve hikâye bölümlerindeki bilgiler, ilgili kayıtlarda bağlantısı verilen kamuya açık kaynaklara (ör. Vikipedi, TÜRKPATENT coğrafi işaret kayıtları, haber ve kurum sayfaları) dayanır ve kendi ifademizle yazılmıştır. Üretici listesi takımın Elazığ badem şekeri üretici rehberinden derlenmiştir. Vikipedi'den alınan bilgiler CC BY-SA lisanslıdır.",
        },
      ],
    },
    {
      id: "uretici",
      title: "7. Üretici adları ve logoları",
      blocks: [
        {
          type: "p",
          text: "Üretici adları, adresleri ve hikâyeleri takımın Elazığ badem şekeri üretici rehberinden derlenmiştir. Markalar ilgili üreticilere aittir; listenin sitede yer alması ticari ortaklık anlamına gelmez. Temsili görseller işletmenin kendi fotoğrafı değildir. Kayıt kaldırma veya düzeltme için {{cfg:email}}.",
        },
      ],
    },
    {
      id: "kaldirma",
      title: "8. Kaldırma ve düzeltme talebi",
      blocks: [
        {
          type: "p",
          text: "Adınızın, logonuzun, bilgilerinizin veya eserinizin sitede yer almasını istemiyorsanız ya da bir atıf hatası görürseniz {{cfg:takedownEmail}} adresine; hak sahibi olduğunuzu ve ilgili içeriğin sayfa adresini belirterek yazın. Talebi makul sürede inceler, haklı bulunması hâlinde içeriği kaldırır veya düzeltiriz. Kişisel veri talepleri için {{page:kvkk}}.",
        },
      ],
    },
  ],
};

const en: LegalDoc = {
  title: "AI Use, Copyright and Credits",
  lead: "Explains where AI is used on the site, who owns the music, map data, fonts and open-source software, and how to request removal of content.",
  sections: [
    {
      id: "yapay-zeka",
      title: "1. AI-assisted content",
      blocks: [
        {
          type: "ul",
          items: [
            "The hero video, editorial stills on producer and product cards, story and gallery images, and the site mascot (Gakkocan) were generated with generative AI tools or prepared with AI assistance. They are not photographs of a specific business, person or product; they are representative stills.",
            "The chat assistant runs on a generative AI model and its replies are produced automatically ({{page:kullanim-kosullari}}).",
            "AI-assisted development tools were used while building the site's design and software; content and outputs were reviewed by team members.",
            "Real producer names, addresses and stories are compiled from the team’s Elazığ almond-candy producer guide; they are not invented by AI. Patent, registration and process claims are presented as the firms’ own accounts. Unverified records are labelled “sample content”.",
          ],
        },
        {
          type: "p",
          text: "The visual identity or mascot of the organising community has not been copied.",
        },
      ],
    },
    {
      id: "muzik",
      title: "2. Music",
      blocks: [
        {
          type: "p",
          text: "The background tracks are freely licensed bağlama recordings; they are not works specific to Elazığ.",
        },
        {
          type: "table",
          caption: "Music credits",
          head: ["Track", "Rights holder", "Licence", "Changes"],
          rows: [
            [
              "“SAZ instrument ORIGINAL(Chen)record@130bpm”",
              "Hybridkin (Freesound); performer: Chen. [Source](https://freesound.org/people/Hybridkin/sounds/749332/)",
              "CC0 1.0 (public domain dedication)",
              "Encoded to MP3, loudness-normalised, faded in/out",
            ],
            [
              "“turkish-baglama”",
              "xserra (CompMusic), Freesound. [Source](https://freesound.org/people/xserra/sounds/115227/)",
              "[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)",
              "First 42 seconds trimmed, loudness-normalised, faded in/out",
            ],
            [
              "“Dawoola and Zurna Live”",
              "Assyrio, Wikimedia Commons (own work). [Source](https://commons.wikimedia.org/wiki/File:Dawoola_and_Zurna_Live.ogg)",
              "[CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)",
              "A 90-second section was cut, low frequencies slightly reduced, loudness-normalised, faded in/out. The modified version is also shared under CC BY-SA 3.0.",
            ],
          ],
        },
      ],
    },
    {
      id: "harita",
      title: "3. Map and geographic data",
      blocks: [
        {
          type: "p",
          text: "District boundaries come from geoBoundaries (gbOpen, source: OpenStreetMap / OSM Boundaries) and place and water features are derived from OpenStreetMap; both were simplified. © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright), under the [Open Database License (ODbL) 1.0](https://opendatacommons.org/licenses/odbl/1-0/). The database derived from this data is also under ODbL; the data files embedded in the site can be retrieved from the site's /data/ path. No requests are sent to third-party map servers to display the map.",
        },
      ],
    },
    {
      id: "yazi-tipleri",
      title: "4. Fonts",
      blocks: [
        {
          type: "p",
          text: "Headings use Gloock and body text uses Hanken Grotesk. Both are published under the SIL Open Font License 1.1, obtained via Google Fonts and served with the site. Copyright in the fonts belongs to their designers.",
        },
      ],
    },
    {
      id: "yazilim",
      title: "5. Open-source software",
      blocks: [
        {
          type: "p",
          text: "The site is built with open-source libraries such as Next.js, React, Three.js, React Three Fiber, drei, Motion, Tailwind CSS and Lucide. They are subject to their own licences (mostly MIT/ISC) and copyright belongs to their developers.",
        },
      ],
    },
    {
      id: "kaynaklar",
      title: "6. Text and information sources",
      blocks: [
        {
          type: "p",
          text: "Information in the Discover and story sections is based on the publicly available sources linked in the relevant records (e.g. Wikipedia, TÜRKPATENT geographical indication records, news and institution pages) and is written in our own words. The producer list is compiled from the team’s Elazığ almond-candy producer guide. Information taken from Wikipedia is licensed CC BY-SA.",
        },
      ],
    },
    {
      id: "uretici",
      title: "7. Producer names and logos",
      blocks: [
        {
          type: "p",
          text: "Producer names, addresses and stories are compiled from the team’s Elazığ almond-candy producer guide. The marks belong to the producers; a listing does not imply a commercial partnership. Editorial stills are not photographs of the businesses. For removal or correction write to {{cfg:email}}.",
        },
      ],
    },
    {
      id: "kaldirma",
      title: "8. Removal and correction requests",
      blocks: [
        {
          type: "p",
          text: "If you do not want your name, logo, information or work to appear on the site, or you spot a credit error, write to {{cfg:takedownEmail}} stating that you are the rights holder and giving the page address of the content. We review requests within a reasonable time and remove or correct content when the request is justified. For personal data requests see {{page:kvkk}}.",
        },
      ],
    },
  ],
};

export const aiContentDoc: Bilingual<LegalDoc> = { tr, en };
