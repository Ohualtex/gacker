import type { Bilingual, LegalDoc } from "./types";

/**
 * KVKK Aydınlatma Metni (6698 sayılı Kanun m.10 ve "Aydınlatma Yükümlülüğünün
 * Yerine Getirilmesinde Uyulacak Usul ve Esaslar Hakkında Tebliğ").
 * TASLAK ŞABLON: hukuk danışmanı onayı gerekir.
 */
const tr: LegalDoc = {
  title: "KVKK Aydınlatma Metni",
  lead: "6698 sayılı Kişisel Verilerin Korunması Kanunu'nun 10. maddesi uyarınca, bu sitede kişisel verilerinizin kim tarafından, hangi amaçla ve hangi hukuki sebeple işlendiğini açıklar.",
  sections: [
    {
      id: "veri-sorumlusu",
      title: "1. Veri sorumlusunun kimliği",
      blocks: [
        {
          type: "p",
          text: "6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) kapsamında veri sorumlusu aşağıda belirtilen kişi/kuruluştur. “Elazığ Badem Şekeri” sitesi, 1 Kasım 2026 tarihinde Elazığ'da düzenlenen GakCoding etkinliği kapsamında Gacker takımı tarafından hazırlanmış bir tanıtım ve hikâye sitesidir.",
        },
        {
          type: "table",
          caption: "Veri sorumlusu iletişim bilgileri",
          head: ["Bilgi", "Değer"],
          rows: [
            ["Unvan / ad soyad", "{{cfg:controllerName}}"],
            ["Adres", "{{cfg:controllerAddress}}"],
            ["E-posta", "{{cfg:email}}"],
            ["Telefon", "{{cfg:phone}}"],
            ["KEP adresi", "{{cfg:kep}}"],
            ["VERBİS", "{{cfg:verbis}}"],
          ],
        },
      ],
    },
    {
      id: "islenen-veriler",
      title: "2. İşlenen kişisel veriler, işleme amaçları ve hukuki sebepler",
      blocks: [
        {
          type: "p",
          text: "Sitede hesap, üyelik, form ve ödeme yoktur; analitik veya reklam amaçlı veri toplanmaz. İşlenen veriler aşağıda sıralanmıştır.",
        },
        {
          type: "table",
          caption: "Veri kategorileri, amaçlar ve hukuki sebepler",
          head: ["Veri", "İşleme amacı", "Hukuki sebep"],
          rows: [
            [
              "Erişim kayıtları: IP adresi, tarih-saat, istenen sayfa, tarayıcı/cihaz bilgisi",
              "Sitenin sunulması, bilgi güvenliği, kötüye kullanımın ve aşırı isteğin önlenmesi",
              "KVKK m.5/2-f (meşru menfaat); yer sağlayıcıya ilişkin yasal saklama yükümlülükleri bakımından m.5/2-a",
            ],
            [
              "Yapay zekâ asistanına yazdığınız mesajlar ve asistanın yanıtları",
              "Asistanın soruyu yanıtlaması",
              "KVKK m.5/1 (açık rıza; asistan ilk kullanımda sizden onay ister). Mesajlarda kişisel veri paylaşmamanız rica edilir.",
            ],
            [
              "E-posta ile bize yazarsanız: e-posta adresi, adınız, mesaj içeriği",
              "Talebinizi yanıtlamak ve kayıt altında tutmak",
              "KVKK m.5/2-f (meşru menfaat); hak taleplerinde m.5/2-ç (hukuki yükümlülük)",
            ],
            [
              "Üretici (işletme) bilgileri: unvan, adres, iletişim, web/sosyal medya bağlantıları",
              "Yöresel üreticilerin tanıtılması ve ziyaretçilerin onlara ulaşması",
              "Üreticinin yazılı onayı / açık rızası (KVKK m.5/1); tüzel kişilere ait bilgiler kişisel veri değildir",
            ],
          ],
        },
        {
          type: "p",
          text: "Tema, müzik ve bildirim tercihleriniz ile asistan sohbet geçmişiniz yalnızca kendi cihazınızdaki tarayıcı belleğinde tutulur ve tarafımıza iletilmez. Ayrıntılar için {{page:cerez-politikasi}} sayfasına bakın.",
        },
      ],
    },
    {
      id: "aktarim",
      title: "3. Kişisel verilerin aktarıldığı taraflar ve aktarım amaçları",
      blocks: [
        {
          type: "ul",
          items: [
            "Barındırma (hosting) sağlayıcısı: {{cfg:hostingProvider}} (sunucu konumu: {{cfg:hostingLocation}}). Amaç: sitenin yayınlanması ve erişim kayıtlarının tutulması. Sağlayıcı veri işleyen sıfatıyla hareket eder.",
            "Yapay zekâ (LLM) hizmet sağlayıcısı: {{cfg:llmProvider}} (işleme ülkesi: {{cfg:llmProviderCountry}}). Amaç: asistana yazdığınız mesajlara yanıt üretmek. Yalnızca asistanı onayladıktan sonra, yazdığınız mesajlar ve sohbet bağlamı bu sağlayıcıya gönderilir.",
            "Yetkili kamu kurum ve kuruluşları: yürürlükteki mevzuat gereği talep edilmesi hâlinde, KVKK m.8 kapsamında ve talebin kapsamıyla sınırlı olarak.",
          ],
        },
        {
          type: "p",
          text: "Verileriniz satılmaz, reklam amacıyla üçüncü kişilerle paylaşılmaz.",
        },
      ],
    },
    {
      id: "yurt-disi",
      title: "4. Yurt dışına aktarım (KVKK m.9)",
      blocks: [
        {
          type: "p",
          text: "Yapay zekâ hizmet sağlayıcısının sunucuları Türkiye dışında bulunabilir. Bu durumda asistana yazdığınız mesajlar, KVKK m.9 hükümlerine uygun olarak yurt dışına aktarılmış olur. Aktarım, KVKK m.9 uyarınca Kişisel Verileri Koruma Kurulu'nun yeterlilik kararına, bulunmuyorsa uygun güvencelere dayanır. Bu sitede kullanılan güvence: {{cfg:transferSafeguard}}.",
        },
        {
          type: "p",
          text: "Sağlayıcının mesajları saklama ve model eğitiminde kullanma politikası: {{cfg:llmProviderRetention}}. Yurt dışına aktarılmasını istemiyorsanız asistanı kullanmayın; sitenin diğer bölümleri asistan olmadan çalışır.",
        },
      ],
    },
    {
      id: "toplama-yontemi",
      title: "5. Kişisel verilerin toplanma yöntemi ve hukuki sebebi",
      blocks: [
        {
          type: "p",
          text: "Verileriniz tamamen veya kısmen otomatik yollarla, siteyi ziyaret ettiğinizde sunucu erişim kayıtları aracılığıyla, asistan arayüzüne mesaj yazdığınızda ve e-posta ile iletişime geçtiğinizde elektronik ortamda toplanır. Hukuki sebepler 2. bölümdeki tabloda gösterilmiştir. Açık rızaya dayanan işlemelerde onayınızı dilediğiniz zaman geri çekebilirsiniz; geri çekme, öncesindeki işlemelerin hukuka uygunluğunu etkilemez.",
        },
      ],
    },
    {
      id: "saklama",
      title: "6. Saklama süresi",
      blocks: [
        {
          type: "ul",
          items: [
            "Erişim kayıtları: barındırma sağlayıcısında en çok {{cfg:hostingLogRetention}}.",
            "Asistan mesajları: sitenin sunucusunda kalıcı olarak saklanmaz; sohbet geçmişi tarayıcınızın oturum belleğinde sekme kapanana kadar durur. Sağlayıcı tarafındaki saklama için 4. bölüme bakın.",
            "E-posta yazışmaları: talebin sonuçlanmasından sonra gerekli süre ve zamanaşımı süreleriyle sınırlı olarak; sonrasında silinir, yok edilir veya anonim hâle getirilir.",
          ],
        },
      ],
    },
    {
      id: "haklar",
      title: "7. İlgili kişi olarak haklarınız (KVKK m.11)",
      blocks: [
        { type: "p", text: "KVKK m.11 uyarınca veri sorumlusuna başvurarak şunları yapabilirsiniz:" },
        {
          type: "ul",
          items: [
            "Kişisel verilerinizin işlenip işlenmediğini öğrenme,",
            "İşlenmişse buna ilişkin bilgi talep etme,",
            "İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,",
            "Yurt içinde veya yurt dışında verilerin aktarıldığı üçüncü kişileri bilme,",
            "Eksik veya yanlış işlenmişse düzeltilmesini isteme,",
            "KVKK m.7'de öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme,",
            "Düzeltme ve silme/yok etme işlemlerinin verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,",
            "İşlenen verilerin münhasıran otomatik sistemlerle analiz edilmesi suretiyle aleyhinize bir sonuç doğmasına itiraz etme,",
            "Kanuna aykırı işleme nedeniyle zarara uğramanız hâlinde zararın giderilmesini talep etme.",
          ],
        },
      ],
    },
    {
      id: "basvuru",
      title: "8. Başvuru yöntemi",
      blocks: [
        {
          type: "p",
          text: "Taleplerinizi, “Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ”e uygun olarak yazılı biçimde, kimliğinizi tespit edici belgeyle birlikte veri sorumlusunun adresine elden veya noter aracılığıyla iletebilir; ayrıca KEP adresi ({{cfg:kep}}), güvenli elektronik imza ya da mobil imza ile veya veri sorumlusuna daha önce bildirdiğiniz e-posta adresiniz üzerinden {{cfg:email}} adresine gönderebilirsiniz.",
        },
        {
          type: "p",
          text: "Başvurunuz talebin niteliğine göre en kısa sürede ve en geç otuz gün içinde sonuçlandırılır. İşlemin ayrıca bir maliyet gerektirmesi hâlinde Kurul tarafından belirlenen tarife uygulanabilir. Cevabı yetersiz bulursanız veya süresinde cevap alamazsanız, [Kişisel Verileri Koruma Kurumu](https://www.kvkk.gov.tr) nezdinde mevzuatta belirtilen süreler içinde şikâyette bulunabilirsiniz.",
        },
        {
          type: "p",
          text: "Çocuklara ilişkin not: Bilerek 18 yaşından küçüklerden kişisel veri toplamıyoruz. Küçüklerin siteyi ve asistanı bir ebeveyn/vasi eşliğinde kullanmasını öneririz. Ayrıntı için {{page:gizlilik}}.",
        },
      ],
    },
  ],
};

const en: LegalDoc = {
  title: "KVKK Privacy Notice",
  lead: "Under Article 10 of Türkiye's Personal Data Protection Law No. 6698 (KVKK), this notice explains who processes your personal data on this site, for what purpose and on what legal ground.",
  sections: [
    {
      id: "veri-sorumlusu",
      title: "1. Identity of the data controller",
      blocks: [
        {
          type: "p",
          text: "Under Personal Data Protection Law No. 6698 (“KVKK”), the data controller is the person/organisation below. “Elazığ Badem Şekeri” is an informational and storytelling site prepared by the Gacker team for the GakCoding event held in Elazığ on 1 November 2026.",
        },
        {
          type: "table",
          caption: "Data controller contact details",
          head: ["Item", "Value"],
          rows: [
            ["Name / title", "{{cfg:controllerName}}"],
            ["Address", "{{cfg:controllerAddress}}"],
            ["E-mail", "{{cfg:email}}"],
            ["Phone", "{{cfg:phone}}"],
            ["KEP (registered e-mail)", "{{cfg:kep}}"],
            ["VERBIS", "{{cfg:verbis}}"],
          ],
        },
      ],
    },
    {
      id: "islenen-veriler",
      title: "2. Personal data processed, purposes and legal grounds",
      blocks: [
        {
          type: "p",
          text: "The site has no accounts, membership, forms or payments, and collects no data for analytics or advertising. The data processed is listed below.",
        },
        {
          type: "table",
          caption: "Data categories, purposes and legal grounds",
          head: ["Data", "Purpose", "Legal ground"],
          rows: [
            [
              "Access logs: IP address, date-time, requested page, browser/device information",
              "Serving the site, information security, preventing abuse and excessive requests",
              "KVKK Art. 5/2-f (legitimate interest); Art. 5/2-a where statutory log-retention duties of hosting providers apply",
            ],
            [
              "Messages you type to the AI assistant and the assistant's replies",
              "Letting the assistant answer your question",
              "KVKK Art. 5/1 (explicit consent; the assistant asks for it on first use). Please do not include personal data in messages.",
            ],
            [
              "If you e-mail us: e-mail address, your name, message content",
              "Answering and keeping a record of your request",
              "KVKK Art. 5/2-f (legitimate interest); for rights requests Art. 5/2-ç (legal obligation)",
            ],
            [
              "Producer (business) details: name, address, contact, web/social links",
              "Presenting local producers and helping visitors reach them",
              "The producer's written approval / explicit consent (KVKK Art. 5/1); information about legal entities is not personal data",
            ],
          ],
        },
        {
          type: "p",
          text: "Your theme, music and notice preferences and your assistant conversation history are kept only in your own browser storage and are not sent to us. See {{page:cerez-politikasi}} for details.",
        },
      ],
    },
    {
      id: "aktarim",
      title: "3. Recipients of personal data and purposes of transfer",
      blocks: [
        {
          type: "ul",
          items: [
            "Hosting provider: {{cfg:hostingProvider}} (server location: {{cfg:hostingLocation}}). Purpose: publishing the site and keeping access logs. The provider acts as a data processor.",
            "AI (LLM) service provider: {{cfg:llmProvider}} (processing country: {{cfg:llmProviderCountry}}). Purpose: generating replies to the messages you type to the assistant. Only after you consent to the assistant are your messages and conversation context sent to this provider.",
            "Competent public authorities: where required by applicable law, under KVKK Art. 8 and limited to the scope of the request.",
          ],
        },
        { type: "p", text: "Your data is not sold and not shared with third parties for advertising." },
      ],
    },
    {
      id: "yurt-disi",
      title: "4. Transfer abroad (KVKK Art. 9)",
      blocks: [
        {
          type: "p",
          text: "The AI service provider's servers may be outside Türkiye. In that case the messages you type to the assistant are transferred abroad in line with KVKK Art. 9. The transfer relies on an adequacy decision of the Personal Data Protection Board or, if none exists, on appropriate safeguards. Safeguard used on this site: {{cfg:transferSafeguard}}.",
        },
        {
          type: "p",
          text: "The provider's policy on retaining messages and using them for model training: {{cfg:llmProviderRetention}}. If you do not want your messages transferred abroad, do not use the assistant; the rest of the site works without it.",
        },
      ],
    },
    {
      id: "toplama-yontemi",
      title: "5. Method of collection and legal ground",
      blocks: [
        {
          type: "p",
          text: "Your data is collected wholly or partly by automated means, electronically: through server access logs when you visit, when you type into the assistant, and when you contact us by e-mail. Legal grounds are shown in the table in section 2. Where processing relies on explicit consent you may withdraw it at any time; withdrawal does not affect the lawfulness of earlier processing.",
        },
      ],
    },
    {
      id: "saklama",
      title: "6. Retention",
      blocks: [
        {
          type: "ul",
          items: [
            "Access logs: at most {{cfg:hostingLogRetention}} at the hosting provider.",
            "Assistant messages: not stored permanently on the site's server; the conversation history stays in your browser's session storage until the tab is closed. For retention at the provider see section 4.",
            "E-mail correspondence: for the time needed to resolve the request and within limitation periods; afterwards deleted, destroyed or anonymised.",
          ],
        },
      ],
    },
    {
      id: "haklar",
      title: "7. Your rights as a data subject (KVKK Art. 11)",
      blocks: [
        { type: "p", text: "Under KVKK Art. 11 you may apply to the data controller to:" },
        {
          type: "ul",
          items: [
            "learn whether your personal data is processed,",
            "request information if it has been processed,",
            "learn the purpose of processing and whether it is used accordingly,",
            "know the third parties in Türkiye or abroad to whom data is transferred,",
            "request correction if data is incomplete or inaccurate,",
            "request deletion or destruction under the conditions in KVKK Art. 7,",
            "request that correction and deletion/destruction be notified to third parties to whom data was transferred,",
            "object to a result against you arising from analysis exclusively by automated systems,",
            "claim compensation if you suffer damage due to unlawful processing.",
          ],
        },
      ],
    },
    {
      id: "basvuru",
      title: "8. How to apply",
      blocks: [
        {
          type: "p",
          text: "You may send your requests in writing, in line with the “Communiqué on Procedures and Principles of Application to the Data Controller”, with a document identifying you, to the controller's address by hand or via notary; or to {{cfg:email}} via the KEP address ({{cfg:kep}}), a secure electronic signature or mobile signature, or from the e-mail address you previously gave the controller.",
        },
        {
          type: "p",
          text: "Your application is concluded as soon as possible and at the latest within thirty days, depending on the nature of the request. If the process requires an extra cost, the tariff set by the Board may apply. If you find the reply insufficient or receive none in time, you may complain to the [Personal Data Protection Authority](https://www.kvkk.gov.tr) within the periods stated in legislation.",
        },
        {
          type: "p",
          text: "Note on children: we do not knowingly collect personal data from people under 18. We recommend that minors use the site and assistant together with a parent/guardian. See {{page:gizlilik}}.",
        },
      ],
    },
  ],
};

export const kvkkDoc: Bilingual<LegalDoc> = { tr, en };
