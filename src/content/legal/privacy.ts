import type { Bilingual, LegalDoc } from "./types";

/** Gizlilik Politikası. TASLAK ŞABLON: hukuk danışmanı onayı gerekir. */
const tr: LegalDoc = {
  title: "Gizlilik Politikası",
  lead: "Bu sitede hangi bilgilerin toplandığını, yapay zekâ asistanındaki mesajlarınızın nasıl işlendiğini, ne kadar süre tutulduğunu ve çocuklar için notumuzu açıklar.",
  sections: [
    {
      id: "kapsam",
      title: "1. Kapsam",
      blocks: [
        {
          type: "p",
          text: "“Elazığ Badem Şekeri” sitesi bir tanıtım ve hikâye sitesidir. Hesap açmaz, form veya ödeme almaz, analitik ve reklam araçları kullanmaz. Bu politika, {{cfg:controllerName}} tarafından işletilen site için geçerlidir. Kişisel verilerin hukuki çerçevesi {{page:kvkk}} sayfasında ayrıntılıdır.",
        },
      ],
    },
    {
      id: "toplananlar",
      title: "2. Hangi bilgiler toplanır?",
      blocks: [
        {
          type: "ul",
          items: [
            "Sunucu erişim kayıtları: Siteyi açtığınızda IP adresiniz, tarih-saat, istenen sayfa ve tarayıcı/cihaz türü barındırma sağlayıcısı ({{cfg:hostingProvider}}) tarafından teknik ve güvenlik amacıyla kaydedilir.",
            "Asistana yazdığınız mesajlar: Yalnızca asistanı kullanıp onay verdiğinizde işlenir (3. bölüm).",
            "Bize yazdığınız e-postalar: Adınız, e-posta adresiniz ve mesajınız, yalnızca talebinizi yanıtlamak için kullanılır.",
            "Cihazınızdaki tercihler: Tema, müzik ve bildirim tercihi tarayıcınızda saklanır; bize gönderilmez ({{page:cerez-politikasi}}).",
          ],
        },
        {
          type: "p",
          text: "Konum, kamera, mikrofon, kişi listesi gibi cihaz izinleri istenmez. Üçüncü taraf takip çerezi, reklam kimliği veya parmak izi toplama yoktur. Harita verisi site içine gömülüdür; harita görüntülemek için üçüncü taraf harita sunucularına istek gönderilmez. Yazı tipleri derleme sırasında site ile birlikte sunulur; ziyaretiniz sırasında Google'a istek gitmez.",
        },
      ],
    },
    {
      id: "asistan",
      title: "3. Yapay zekâ asistanındaki mesajlarınız",
      blocks: [
        {
          type: "ul",
          items: [
            "Asistanı ilk kullanımda onayınızı isteriz. Onay vermezseniz mesajınız gönderilmez.",
            "Onayınızdan sonra yazdığınız mesajlar ve kısa sohbet bağlamı, yanıt üretmesi için {{cfg:llmProvider}} adlı yapay zekâ sağlayıcısına iletilir. Sağlayıcı Türkiye dışında ({{cfg:llmProviderCountry}}) işlem yapıyor olabilir.",
            "Lütfen asistana ad, telefon, adres, kimlik numarası, sağlık veya benzeri kişisel bilgi yazmayın.",
            "Sitemiz mesajlarınızı veri tabanında saklamaz ve profil çıkarmaz. Sohbet geçmişi yalnızca tarayıcınızın oturum belleğinde, sekme kapanana kadar durur; asistandaki “temizle” düğmesiyle silebilirsiniz.",
            "Kötüye kullanımı önlemek için istek sayısı IP adresine göre geçici olarak (bellekte) sınırlanabilir; bu kayıt kalıcı değildir.",
            "Sağlayıcının mesajları saklama ve model eğitiminde kullanma politikası: {{cfg:llmProviderRetention}}.",
            "Onayınızı dilediğiniz zaman, sayfa altındaki “Çerez/bildirim tercihlerini yönet” düğmesinden geri çekebilirsiniz.",
          ],
        },
        {
          type: "p",
          text: "Asistan yapay zekâ ile yanıt verir; hatalı veya eksik olabilir, hukuki, tıbbi, finansal veya başka bir mesleki tavsiye yerine geçmez. Bkz. {{page:kullanim-kosullari}}.",
        },
      ],
    },
    {
      id: "saklama",
      title: "4. Saklama süreleri",
      blocks: [
        {
          type: "table",
          caption: "Saklama süreleri",
          head: ["Bilgi", "Nerede", "Süre"],
          rows: [
            ["Sunucu erişim kayıtları", "Barındırma sağlayıcısı", "En çok {{cfg:hostingLogRetention}}"],
            ["Asistan sohbet geçmişi", "Tarayıcı oturum belleği", "Sekme kapanana kadar veya “temizle”"],
            ["Asistan onayı, tema, müzik, bildirim tercihi", "Tarayıcı yerel belleği", "Siz silene kadar (onay sürümü değişirse yeniden istenir)"],
            ["E-posta yazışmaları", "E-posta hizmeti", "Talep sonuçlanana ve zamanaşımı süresi dolana kadar"],
          ],
        },
      ],
    },
    {
      id: "cocuklar",
      title: "5. Çocuklar",
      blocks: [
        {
          type: "p",
          text: "Site herkes tarafından, çocuklar dâhil görüntülenebilir ve sevimli bir maskot karakter içerir. Bilerek 18 yaşından küçüklerden kişisel veri toplamayız; bu sitede ad, yaş, okul gibi bilgi isteyen bir alan yoktur. Küçüklerin yapay zekâ asistanını bir ebeveyn/vasi eşliğinde kullanmasını öneririz. Bir çocuğa ait kişisel verinin bize ulaştığını düşünüyorsanız {{cfg:email}} adresine yazın; veriyi silelim.",
        },
      ],
    },
    {
      id: "haklar",
      title: "6. Haklarınız ve iletişim",
      blocks: [
        {
          type: "p",
          text: "KVKK m.11 kapsamındaki haklarınız ve başvuru yolları için {{page:kvkk}} sayfasına bakın. Gizlilikle ilgili sorular için: {{cfg:email}}.",
        },
      ],
    },
    {
      id: "degisiklik",
      title: "7. Değişiklikler",
      blocks: [
        {
          type: "p",
          text: "Bu politikayı güncelleyebiliriz. Güncel sürüm her zaman bu sayfadadır; sayfanın başındaki tarih son güncellemeyi gösterir. Asistanın veri işleme koşulları önemli ölçüde değişirse yeniden onayınız istenir.",
        },
      ],
    },
  ],
};

const en: LegalDoc = {
  title: "Privacy Policy",
  lead: "Explains what information is collected on this site, how your messages to the AI assistant are handled, how long data is kept, and our note on children.",
  sections: [
    {
      id: "kapsam",
      title: "1. Scope",
      blocks: [
        {
          type: "p",
          text: "“Elazığ Badem Şekeri” is an informational and storytelling site. It opens no accounts, takes no forms or payments, and uses no analytics or advertising tools. This policy applies to the site operated by {{cfg:controllerName}}. The legal framework for personal data is detailed in {{page:kvkk}}.",
        },
      ],
    },
    {
      id: "toplananlar",
      title: "2. What information is collected?",
      blocks: [
        {
          type: "ul",
          items: [
            "Server access logs: when you open the site, your IP address, date-time, requested page and browser/device type are recorded by the hosting provider ({{cfg:hostingProvider}}) for technical and security purposes.",
            "Messages you type to the assistant: processed only if you use the assistant and consent (section 3).",
            "E-mails you send us: your name, e-mail address and message, used only to answer your request.",
            "Preferences on your device: theme, music and notice preferences are stored in your browser and not sent to us ({{page:cerez-politikasi}}).",
          ],
        },
        {
          type: "p",
          text: "No device permissions such as location, camera, microphone or contacts are requested. There are no third-party tracking cookies, advertising IDs or fingerprinting. Map data is embedded in the site; no requests are sent to third-party map servers to display the map. Fonts are served with the site at build time; no request goes to Google during your visit.",
        },
      ],
    },
    {
      id: "asistan",
      title: "3. Your messages to the AI assistant",
      blocks: [
        {
          type: "ul",
          items: [
            "We ask for your consent the first time you use the assistant. If you do not consent, your message is not sent.",
            "After consent, the messages you type and a short conversation context are sent to the AI provider {{cfg:llmProvider}} to generate a reply. The provider may process data outside Türkiye ({{cfg:llmProviderCountry}}).",
            "Please do not type your name, phone, address, ID number, health or similar personal information to the assistant.",
            "The site does not store your messages in a database and does not build profiles. The conversation history stays only in your browser's session storage until the tab is closed; you can delete it with the assistant's “clear” button.",
            "To prevent abuse, the number of requests may be limited temporarily (in memory) by IP address; this record is not permanent.",
            "The provider's policy on retaining messages and using them for model training: {{cfg:llmProviderRetention}}.",
            "You can withdraw your consent at any time with the “Manage cookie/notice preferences” button at the bottom of the page.",
          ],
        },
        {
          type: "p",
          text: "The assistant answers using AI; it can be wrong or incomplete and is not a substitute for legal, medical, financial or other professional advice. See {{page:kullanim-kosullari}}.",
        },
      ],
    },
    {
      id: "saklama",
      title: "4. Retention periods",
      blocks: [
        {
          type: "table",
          caption: "Retention periods",
          head: ["Information", "Where", "Period"],
          rows: [
            ["Server access logs", "Hosting provider", "At most {{cfg:hostingLogRetention}}"],
            ["Assistant conversation history", "Browser session storage", "Until the tab closes or “clear”"],
            ["Assistant consent, theme, music, notice preference", "Browser local storage", "Until you delete it (re-asked if the consent version changes)"],
            ["E-mail correspondence", "E-mail service", "Until the request is resolved and limitation periods have passed"],
          ],
        },
      ],
    },
    {
      id: "cocuklar",
      title: "5. Children",
      blocks: [
        {
          type: "p",
          text: "The site can be viewed by everyone, including children, and features a friendly mascot character. We do not knowingly collect personal data from people under 18; there is no field on this site asking for name, age or school. We recommend that minors use the AI assistant together with a parent/guardian. If you believe a child's personal data has reached us, write to {{cfg:email}} and we will delete it.",
        },
      ],
    },
    {
      id: "haklar",
      title: "6. Your rights and contact",
      blocks: [
        {
          type: "p",
          text: "For your rights under KVKK Art. 11 and how to apply, see {{page:kvkk}}. For privacy questions: {{cfg:email}}.",
        },
      ],
    },
    {
      id: "degisiklik",
      title: "7. Changes",
      blocks: [
        {
          type: "p",
          text: "We may update this policy. The current version is always on this page; the date at the top shows the last update. If the assistant's data processing terms change materially, we will ask for your consent again.",
        },
      ],
    },
  ],
};

export const privacyDoc: Bilingual<LegalDoc> = { tr, en };
