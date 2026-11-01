import type { Bilingual, LegalDoc } from "./types";

/**
 * Çerez ve Benzeri Teknolojiler Politikası. TASLAK ŞABLON.
 * Yeni bir yerel/oturum depolama anahtarı eklenirse aşağıdaki tabloya ve
 * CookieNotice.tsx'teki OPTIONAL_CATEGORIES listesine işleyin.
 */
const tr: LegalDoc = {
  title: "Çerez ve Benzeri Teknolojiler Politikası",
  lead: "Bu site çerez (HTTP cookie) ayarlamaz ve analitik/reklam aracı kullanmaz. Tarayıcınızın yerel ve oturum belleğinde tuttuğumuz kayıtlar aşağıda listelenmiştir.",
  sections: [
    {
      id: "ozet",
      title: "1. Özet",
      blocks: [
        {
          type: "ul",
          items: [
            "Site kendisi çerez (HTTP cookie) ayarlamaz.",
            "Analitik, reklam, yeniden hedefleme veya üçüncü taraf takip çerezi/teknolojisi kullanılmaz.",
            "Tercihlerinizi hatırlamak için yalnızca tarayıcınızın localStorage ve sessionStorage alanları kullanılır. Bu kayıtlar cihazınızda kalır ve sunucumuza gönderilmez.",
            "Bu kayıtlar sitenin istediğiniz özelliklerini sağlamak için gereklidir; bu nedenle onay gerektiren isteğe bağlı kategori yoktur ve ekranda bir bilgilendirme bildirimi gösteriyoruz.",
          ],
        },
      ],
    },
    {
      id: "liste",
      title: "2. Kullanılan kayıtlar",
      blocks: [
        {
          type: "table",
          caption: "localStorage ve sessionStorage anahtarları",
          head: ["Anahtar", "Depolama", "Amaç", "Süre", "Gereklilik"],
          rows: [
            ["gk-theme", "localStorage", "Seçtiğiniz tema (açık, koyu, sistem)", "Siz silene kadar", "İşlevsel tercih (sizin seçiminizle)"],
            ["gk-music", "localStorage", "Fon müziği açık/kapalı tercihi", "Siz silene kadar", "İşlevsel tercih (sizin seçiminizle)"],
            ["gk-notice", "localStorage", "Bu bilgilendirmeyi gördüğünüzü hatırlamak", "Siz silene kadar", "Zorunlu"],
            ["gk-ai-consent", "localStorage", "Yapay zekâ asistanı onayınız (sürüm ve zaman damgası)", "Geri çekene veya silene kadar", "Zorunlu (onayın kaydı)"],
            ["gk-assistant-v1", "sessionStorage", "Asistan sohbet geçmişi", "Sekme kapanana kadar", "İşlevsel (sohbetin sürmesi için)"],
            ["gk-quiz-invite", "sessionStorage", "Quiz davet penceresini bu oturumda kapattığınızı hatırlamak", "Sekme kapanana kadar", "İşlevsel tercih (sizin seçiminizle)"],
          ],
        },
      ],
    },
    {
      id: "yonetim",
      title: "3. Tercihlerinizi yönetme",
      blocks: [
        {
          type: "p",
          text: "Sayfa altındaki “Çerez/bildirim tercihlerini yönet” düğmesiyle bildirimi yeniden açabilir, asistan onayınızı geri çekebilirsiniz. Tarayıcınızın ayarlarından site verilerini silerek tüm kayıtları kaldırabilirsiniz; bu durumda tema ve müzik tercihiniz varsayılana döner.",
        },
      ],
    },
    {
      id: "ileride",
      title: "4. Gelecekte değişiklik olursa",
      blocks: [
        {
          type: "p",
          text: "İleride analitik gibi isteğe bağlı bir teknoloji eklenirse, bu yalnızca önceden açık onayınızla ve “Kabul et” ile “Reddet” seçeneklerinin eşit görünürlükte sunulduğu bir bildirimle yapılır; bu politika ve tablo da güncellenir.",
        },
        { type: "p", text: "Kişisel verilerin işlenmesi için {{page:kvkk}} ve {{page:gizlilik}} sayfalarına bakın." },
      ],
    },
  ],
};

const en: LegalDoc = {
  title: "Cookies and Similar Technologies Policy",
  lead: "This site sets no cookies (HTTP cookies) and uses no analytics or advertising tools. The records we keep in your browser's local and session storage are listed below.",
  sections: [
    {
      id: "ozet",
      title: "1. Summary",
      blocks: [
        {
          type: "ul",
          items: [
            "The site itself sets no cookies (HTTP cookies).",
            "No analytics, advertising, retargeting or third-party tracking cookies or technologies are used.",
            "Only your browser's localStorage and sessionStorage are used to remember your preferences. These records stay on your device and are not sent to our server.",
            "These records are needed to provide features you ask for; so there is no optional category requiring consent, and we show an information notice on screen.",
          ],
        },
      ],
    },
    {
      id: "liste",
      title: "2. Records used",
      blocks: [
        {
          type: "table",
          caption: "localStorage and sessionStorage keys",
          head: ["Key", "Storage", "Purpose", "Duration", "Necessity"],
          rows: [
            ["gk-theme", "localStorage", "Your chosen theme (light, dark, system)", "Until you delete it", "Functional preference (your choice)"],
            ["gk-music", "localStorage", "Background music on/off preference", "Until you delete it", "Functional preference (your choice)"],
            ["gk-notice", "localStorage", "Remembering that you saw this notice", "Until you delete it", "Strictly necessary"],
            ["gk-ai-consent", "localStorage", "Your AI assistant consent (version and timestamp)", "Until withdrawn or deleted", "Strictly necessary (record of consent)"],
            ["gk-assistant-v1", "sessionStorage", "Assistant conversation history", "Until the tab closes", "Functional (to continue the chat)"],
            ["gk-quiz-invite", "sessionStorage", "Remembering that you dismissed the quiz invite this session", "Until the tab closes", "Functional preference (your choice)"],
          ],
        },
      ],
    },
    {
      id: "yonetim",
      title: "3. Managing your preferences",
      blocks: [
        {
          type: "p",
          text: "With the “Manage cookie/notice preferences” button at the bottom of the page you can reopen the notice and withdraw your assistant consent. You can remove all records by clearing site data in your browser settings; your theme and music preferences then return to defaults.",
        },
      ],
    },
    {
      id: "ileride",
      title: "4. If this changes in the future",
      blocks: [
        {
          type: "p",
          text: "If an optional technology such as analytics is added later, it will be done only with your prior explicit consent and a notice offering “Accept” and “Reject” with equal prominence; this policy and table will be updated too.",
        },
        { type: "p", text: "For processing of personal data see {{page:kvkk}} and {{page:gizlilik}}." },
      ],
    },
  ],
};

export const cookiesDoc: Bilingual<LegalDoc> = { tr, en };
