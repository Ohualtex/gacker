import type { Bilingual } from "./types";

export type LegalSlug = "kvkk" | "gizlilik" | "cerez-politikasi" | "kullanim-kosullari" | "yapay-zeka-ve-icerik";

export const legalSlugs: readonly LegalSlug[] = [
  "kvkk",
  "gizlilik",
  "cerez-politikasi",
  "kullanim-kosullari",
  "yapay-zeka-ve-icerik",
];

/** Altbilgi ve gezinme etiketleri. */
export const legalNavLabels: Bilingual<Record<LegalSlug, string>> = {
  tr: {
    kvkk: "KVKK",
    gizlilik: "Gizlilik",
    "cerez-politikasi": "Çerez",
    "kullanim-kosullari": "Koşullar",
    "yapay-zeka-ve-icerik": "Yapay Zekâ & Atıf",
  },
  en: {
    kvkk: "KVKK (Data Protection)",
    gizlilik: "Privacy",
    "cerez-politikasi": "Cookies",
    "kullanim-kosullari": "Terms",
    "yapay-zeka-ve-icerik": "AI & Credits",
  },
};

export type LegalUiStrings = {
  footerLegalLabel: string;
  manageNotice: string;
  draftTitle: string;
  draftBody: string;
  placeholderNote: string;
  lastUpdated: string;
  contents: string;
  print: string;
  tableScrollHint: string;
  notice: {
    region: string;
    title: string;
    infoBody: string;
    consentBody: string;
    understood: string;
    readPolicy: string;
    accept: string;
    reject: string;
    revokeAi: string;
    aiRevoked: string;
  };
  aiConsent: {
    title: string;
    body: string;
    bullets: string[];
    links: { kvkk: string; privacy: string };
    accept: string;
    cancel: string;
    version: string;
  };
};

export const legalUi: Bilingual<LegalUiStrings> = {
  tr: {
    footerLegalLabel: "Hukuki bilgiler",
    manageNotice: "Çerez/bildirim tercihlerini yönet",
    draftTitle: "TASLAK ŞABLON",
    draftBody:
      "Bu metin bir şablon taslağıdır. Gerçek kullanımdan önce sorumlu kişi ve hukuk danışmanı tarafından gözden geçirilmeli, sarı işaretli alanlar doldurulmalıdır. Hukuki tavsiye değildir.",
    placeholderNote: "Sarı işaretli alanlar henüz doldurulmamıştır.",
    lastUpdated: "Son güncelleme",
    contents: "İçindekiler",
    print: "Yazdır",
    tableScrollHint: "Tabloyu yatay kaydırabilirsiniz",
    notice: {
      region: "Çerez ve saklama bildirimi",
      title: "Bu sitede çerez ve takip yok",
      infoBody:
        "Analitik, reklam ya da üçüncü taraf takip çerezi kullanmıyoruz. Yalnızca tarayıcınızda tema, müzik ve asistan sohbeti gibi tercihlerinizi hatırlayan zorunlu kayıtlar tutulur.",
      consentBody:
        "Zorunlu kayıtların dışındaki isteğe bağlı kategorileri yalnızca sizin seçiminizle kullanırız. İki seçenek de aynı kolaylıkta.",
      understood: "Anladım",
      readPolicy: "Politikayı oku",
      accept: "Kabul et",
      reject: "Reddet",
      revokeAi: "Yapay zekâ asistanı onayımı geri çek",
      aiRevoked: "Asistan onayınız geri çekildi.",
    },
    aiConsent: {
      title: "Asistan, yapay zekâ ile çalışır",
      body: "Yazdığınız mesajlar yanıt üretmek için bir yapay zekâ hizmet sağlayıcısına gönderilir ve sağlayıcı Türkiye dışında olabilir.",
      bullets: [
        "Kişisel bilgi (ad, telefon, adres, kimlik, sağlık bilgisi) yazmayın.",
        "Yanıtlar hatalı olabilir; önemli bilgileri üreticiyle doğrulayın.",
        "18 yaşından küçüklerin bir yetişkin eşliğinde kullanmasını öneririz.",
        "Onayınızı dilediğiniz zaman altbilgideki tercih düğmesinden geri çekebilirsiniz.",
      ],
      links: { kvkk: "KVKK Aydınlatma Metni", privacy: "Gizlilik Politikası" },
      accept: "Kabul edip devam et",
      cancel: "Vazgeç",
      version: "Onay sürümü",
    },
  },
  en: {
    footerLegalLabel: "Legal information",
    manageNotice: "Manage cookie/notice preferences",
    draftTitle: "TEMPLATE DRAFT",
    draftBody:
      "This text is a template draft. Before real use it must be reviewed by the responsible person and legal counsel, and the highlighted fields must be filled in. It is not legal advice.",
    placeholderNote: "Highlighted fields have not been filled in yet.",
    lastUpdated: "Last updated",
    contents: "Contents",
    print: "Print",
    tableScrollHint: "You can scroll the table sideways",
    notice: {
      region: "Cookie and storage notice",
      title: "No cookies or tracking on this site",
      infoBody:
        "We use no analytics, advertising or third-party tracking cookies. Only strictly necessary records stay in your browser to remember preferences such as theme, music and the assistant conversation.",
      consentBody:
        "Optional categories beyond the strictly necessary records are only used with your choice. Both options are equally easy.",
      understood: "Understood",
      readPolicy: "Read policy",
      accept: "Accept",
      reject: "Reject",
      revokeAi: "Withdraw my AI assistant consent",
      aiRevoked: "Your assistant consent has been withdrawn.",
    },
    aiConsent: {
      title: "The assistant runs on AI",
      body: "The messages you type are sent to an AI service provider to generate replies, and the provider may be located outside Türkiye.",
      bullets: [
        "Do not type personal information (name, phone, address, ID, health data).",
        "Answers can be wrong; confirm important details with the producer.",
        "We recommend that people under 18 use it together with an adult.",
        "You can withdraw consent any time using the preferences button in the footer.",
      ],
      links: { kvkk: "KVKK Privacy Notice", privacy: "Privacy Policy" },
      accept: "Accept & continue",
      cancel: "Cancel",
      version: "Consent version",
    },
  },
};
