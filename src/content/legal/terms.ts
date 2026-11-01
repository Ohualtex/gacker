import type { Bilingual, LegalDoc } from "./types";

/** Kullanım Koşulları. TASLAK ŞABLON: hukuk danışmanı onayı gerekir. */
const tr: LegalDoc = {
  title: "Kullanım Koşulları",
  lead: "“Elazığ Badem Şekeri” sitesini kullanırken geçerli olan kurallar: bilgilendirme amacı, içerik doğruluğu, yapay zekâ asistanının sınırları ve uygulanacak hukuk.",
  sections: [
    {
      id: "kapsam",
      title: "1. Kapsam ve kabul",
      blocks: [
        {
          type: "p",
          text: "Bu siteyi kullanarak bu koşulları kabul etmiş olursunuz. Kabul etmiyorsanız lütfen siteyi kullanmayın. Site, {{cfg:controllerName}} tarafından, 1 Kasım 2026 tarihinde Elazığ'da düzenlenen GakCoding etkinliği kapsamında Gacker takımının çalışması olarak yayımlanmaktadır.",
        },
      ],
    },
    {
      id: "amac",
      title: "2. Sitenin amacı",
      blocks: [
        {
          type: "p",
          text: "Site yalnızca bilgilendirme ve tanıtım amaçlıdır. Elazığ badem şekerinin hikâyesini ve yöresel üreticileri tanıtır. Sitede satış, sipariş, ödeme veya hesap açma yoktur; ürünleri doğrudan ilgili üreticiden temin edersiniz. Site, üreticiler adına sözleşme kurmaz.",
        },
      ],
    },
    {
      id: "dogruluk",
      title: "3. İçerik doğruluğu ve üretici bilgileri",
      blocks: [
        {
          type: "ul",
          items: [
            "İçeriği özenle hazırlarız; ancak doğruluk, güncellik ve eksiksizlik konusunda garanti vermeyiz.",
            "Üretici bilgileri (unvan, adres, iletişim, çalışma saatleri) zaman içinde değişebilir. Bu bilgiler üreticilerin onayıyla eklenir ve zamanla doğrulanır; ziyaret etmeden önce üreticiyle doğrudan teyit etmenizi öneririz.",
            "“Örnek içerik” olarak etiketlenen kayıtlar gösterim amaçlıdır; gerçek bir işletmeyi temsil etmez.",
            "Tarihî ve kültürel anlatımlar kamuya açık kaynaklara dayanır; hata fark ederseniz bildirmenizi rica ederiz.",
          ],
        },
      ],
    },
    {
      id: "yapay-zeka",
      title: "4. Yapay zekâ asistanı",
      blocks: [
        {
          type: "ul",
          items: [
            "Asistan üretken yapay zekâ ile çalışır; yanıtları hatalı, eksik, güncel olmayan veya uydurma olabilir.",
            "Asistan hukuki, tıbbi, gıda güvenliği, alerji, finansal veya başka bir mesleki tavsiye vermez; bu tür konularda uzmana ve resmî kaynaklara başvurun. Özellikle alerjenler (badem, fıstık vb.) için ürün etiketine ve üreticiye bakın.",
            "Asistana kişisel veri yazmayın. Mesajların işlenmesi için {{page:kvkk}} ve {{page:gizlilik}} sayfalarına bakın.",
            "Asistanı hukuka aykırı, hakaret içeren veya sistemi kötüye kullanan amaçlarla kullanmayın; aşırı istekler sınırlandırılabilir.",
          ],
        },
      ],
    },
    {
      id: "fikri-mulkiyet",
      title: "5. Fikri mülkiyet",
      blocks: [
        {
          type: "p",
          text: "Sitenin tasarımı, metinleri, görselleri, videosu ve yazılımı ilgili hak sahiplerine aittir veya lisanslıdır. Üçüncü taraf materyaller (müzik, harita verisi, yazı tipleri, açık kaynak kütüphaneler) kendi lisanslarına tabidir; ayrıntılar {{page:yapay-zeka-ve-icerik}} sayfasındadır. Üretici adları ve logoları ilgili üreticilere aittir ve onların izniyle kullanılır. Kişisel, ticari olmayan paylaşımlar dışında içerikleri izinsiz çoğaltamaz, dağıtamaz veya ticari amaçla kullanamazsınız. Bir hakkınızın ihlal edildiğini düşünüyorsanız {{cfg:takedownEmail}} adresine yazın.",
        },
      ],
    },
    {
      id: "baglantilar",
      title: "6. Üçüncü taraf bağlantıları",
      blocks: [
        {
          type: "p",
          text: "Site; üreticilerin web siteleri, sosyal medya hesapları ve harita/kaynak sayfaları gibi üçüncü taraflara bağlantı içerebilir. Bu sitelerin içeriğinden ve gizlilik uygulamalarından sorumlu değiliz; bağlantıya tıkladığınızda ilgili sitenin koşulları geçerli olur.",
        },
      ],
    },
    {
      id: "sorumluluk",
      title: "7. Sorumluluğun sınırı",
      blocks: [
        {
          type: "p",
          text: "Site “olduğu gibi” sunulur; kesintisiz veya hatasız çalışacağı garanti edilmez. Yürürlükteki mevzuatın izin verdiği ölçüde, sitenin kullanımından veya kullanılamamasından doğan dolaylı zararlardan sorumlu olmayız. Kanunen sınırlandırılamayacak sorumluluklarımız (ör. kast ve ağır kusur) saklıdır.",
        },
      ],
    },
    {
      id: "degisiklik",
      title: "8. Değişiklikler",
      blocks: [
        {
          type: "p",
          text: "Koşulları ve site içeriğini önceden bildirmeksizin güncelleyebiliriz. Güncel sürüm bu sayfadadır; güncelleme tarihi sayfanın başında gösterilir.",
        },
      ],
    },
    {
      id: "hukuk",
      title: "9. Uygulanacak hukuk ve yetki",
      blocks: [
        {
          type: "p",
          text: "Bu koşullara Türkiye Cumhuriyeti hukuku uygulanır. Uyuşmazlıklarda {{cfg:jurisdiction}} mahkemeleri ve icra daireleri yetkilidir; emredici mevzuattaki yetki ve tüketici başvuru yolları saklıdır. İletişim: {{cfg:email}}.",
        },
      ],
    },
  ],
};

const en: LegalDoc = {
  title: "Terms of Use",
  lead: "The rules that apply when you use the “Elazığ Badem Şekeri” site: informational purpose, content accuracy, limits of the AI assistant and governing law.",
  sections: [
    {
      id: "kapsam",
      title: "1. Scope and acceptance",
      blocks: [
        {
          type: "p",
          text: "By using this site you accept these terms. If you do not accept them, please do not use the site. The site is published by {{cfg:controllerName}} as the Gacker team's work for the GakCoding event held in Elazığ on 1 November 2026.",
        },
      ],
    },
    {
      id: "amac",
      title: "2. Purpose of the site",
      blocks: [
        {
          type: "p",
          text: "The site is for information and promotion only. It presents the story of Elazığ almond candy and local producers. There are no sales, orders, payments or accounts on the site; you obtain products directly from the producer. The site does not form contracts on behalf of producers.",
        },
      ],
    },
    {
      id: "dogruluk",
      title: "3. Content accuracy and producer information",
      blocks: [
        {
          type: "ul",
          items: [
            "We prepare content with care but give no guarantee of accuracy, currency or completeness.",
            "Producer details (name, address, contact, opening hours) may change over time. They are added with producers' approval and verified over time; we recommend confirming directly with the producer before visiting.",
            "Records labelled “sample content” are for demonstration and do not represent a real business.",
            "Historical and cultural narratives are based on publicly available sources; please tell us if you spot an error.",
          ],
        },
      ],
    },
    {
      id: "yapay-zeka",
      title: "4. AI assistant",
      blocks: [
        {
          type: "ul",
          items: [
            "The assistant runs on generative AI; its answers can be wrong, incomplete, out of date or made up.",
            "The assistant gives no legal, medical, food-safety, allergy, financial or other professional advice; consult an expert and official sources for such matters. For allergens in particular (almond, peanut, etc.) check the product label and the producer.",
            "Do not type personal data to the assistant. For how messages are processed see {{page:kvkk}} and {{page:gizlilik}}.",
            "Do not use the assistant for unlawful or abusive purposes or to abuse the system; excessive requests may be limited.",
          ],
        },
      ],
    },
    {
      id: "fikri-mulkiyet",
      title: "5. Intellectual property",
      blocks: [
        {
          type: "p",
          text: "The site's design, texts, images, video and software belong to, or are licensed by, their rights holders. Third-party materials (music, map data, fonts, open-source libraries) are subject to their own licences; details are in {{page:yapay-zeka-ve-icerik}}. Producer names and logos belong to the producers and are used with their permission. Except for personal, non-commercial sharing, you may not copy, distribute or commercially use the content without permission. If you believe your rights are infringed, write to {{cfg:takedownEmail}}.",
        },
      ],
    },
    {
      id: "baglantilar",
      title: "6. Third-party links",
      blocks: [
        {
          type: "p",
          text: "The site may link to third parties such as producers' websites, social media accounts and map/source pages. We are not responsible for their content or privacy practices; once you click a link, that site's terms apply.",
        },
      ],
    },
    {
      id: "sorumluluk",
      title: "7. Limitation of liability",
      blocks: [
        {
          type: "p",
          text: "The site is provided “as is”, with no guarantee that it will be uninterrupted or error-free. To the extent permitted by applicable law, we are not liable for indirect damages arising from using or being unable to use the site. Liabilities that cannot be limited by law (e.g. intent and gross negligence) are reserved.",
        },
      ],
    },
    {
      id: "degisiklik",
      title: "8. Changes",
      blocks: [
        {
          type: "p",
          text: "We may update the terms and site content without prior notice. The current version is on this page; the update date is shown at the top.",
        },
      ],
    },
    {
      id: "hukuk",
      title: "9. Governing law and jurisdiction",
      blocks: [
        {
          type: "p",
          text: "These terms are governed by the laws of the Republic of Türkiye. The courts and enforcement offices of {{cfg:jurisdiction}} are competent for disputes; mandatory jurisdiction rules and consumer remedies are reserved. Contact: {{cfg:email}}.",
        },
      ],
    },
  ],
};

export const termsDoc: Bilingual<LegalDoc> = { tr, en };
