import type { Locale } from "@/lib/i18n";

/**
 * TODO: Gerçek iletişim e-postası belirlenince buraya yazın (ör. "ad@alanadi.com").
 * `null` iken sayfada mailto bağlantısı yerine "yakında" notu görünür; sahte adres gösterilmez.
 */
export const CONTACT_EMAIL: string | null = null;

export type ContactContent = {
  credit: { title: string; body: string; team: string };
  reach: { title: string; body: string; emailLabel: string; emailPending: string };
  producers: { title: string; body: string; items: string[]; cta: string };
};

export const contact: Record<Locale, ContactContent> = {
  tr: {
    credit: {
      title: "Bu siteyi Gacker yaptı",
      team: "Gacker",
      body: "GakCoding etkinliği için, 1 Kasım 2026'da Elazığ'da hazırlandı. Elazığ badem şekerini dijitalde anlatmak ve yerel üreticilere yol açmak için.",
    },
    reach: {
      title: "Bize yazın",
      body: "Görüş, düzeltme ve önerileriniz için.",
      emailLabel: "E-posta gönder",
      emailPending: "İletişim adresi yakında burada paylaşılacak.",
    },
    producers: {
      title: "Üretici misiniz? Listede yer alın",
      body: "Badem şekeri yapıyor veya satıyorsanız sizi de ekleyelim. Bize şu bilgileri iletmeniz yeterli:",
      items: [
        "İşletme adı ve kısa bir tanıtım",
        "Açık adres ve harita konumu",
        "Telefon, web sitesi ve sosyal medya hesapları",
        "Birkaç fotoğraf ve çalışma saatleri",
      ],
      cta: "Üreticileri gör",
    },
  },
  en: {
    credit: {
      title: "This site was made by Gacker",
      team: "Gacker",
      body: "Built for the GakCoding event on 1 November 2026 in Elazığ, to tell the story of Elazığ almond candy online and to point visitors toward local producers.",
    },
    reach: {
      title: "Write to us",
      body: "For feedback, corrections and suggestions.",
      emailLabel: "Send an email",
      emailPending: "The contact address will be shared here soon.",
    },
    producers: {
      title: "A producer? Get listed",
      body: "If you make or sell almond candy, we would like to add you. Just send us the following:",
      items: [
        "Business name and a short introduction",
        "Full address and map location",
        "Phone, website and social media accounts",
        "A few photos and opening hours",
      ],
      cta: "See the producers",
    },
  },
};
