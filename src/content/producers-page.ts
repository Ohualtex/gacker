import type { Locale } from "@/lib/i18n";

export type ProducersPageContent = {
  demoBadge: string;
  slotHint: string;
  viewProducer: string;
  empty: { title: string; body: string; cta: string };
  demoNote: string;
  guideNote: string;
  branches: string;
  imageCredit: string;
  detail: {
    back: string;
    story: string;
    contact: string;
    address: string;
    openInMaps: string;
    phone: string;
    hours: string;
    products: string;
    links: string;
    noContact: string;
    socials: {
      website: string;
      instagram: string;
      facebook: string;
      x: string;
      youtube: string;
      tiktok: string;
    };
    imageLabel: string;
  };
};

export const producersPage: Record<Locale, ProducersPageContent> = {
  tr: {
    demoBadge: "Örnek içerik",
    slotHint: "Fotoğraf yakında",
    viewProducer: "Üreticiyi gör",
    empty: {
      title: "Üreticiler çok yakında burada",
      body: "Elazığ'da badem şekeri yapan ve satan işletmeleri doğrulanmış bilgileriyle ekliyoruz. Listede yer almak isterseniz bize yazın.",
      cta: "Listeye katılın",
    },
    demoNote:
      "Aşağıdaki kayıtlar yerleşimi göstermek için hazırlanmış örnek içeriktir; gerçek üreticiler eklendikçe yerini alacak.",
    guideNote:
      "Kayıtlar Gacker takımının Elazığ badem şekeri üretici rehberinden derlenmiştir. Patent, tescil ve çalışma iddiaları işletmenin kendi anlatımıdır; gitmeden önce teyit edin.",
    branches: "Şubeler",
    imageCredit: "Temsili görsel — yapay zekâ ile üretilmiştir; işletmenin kendi fotoğrafı değildir.",
    detail: {
      back: "Tüm üreticiler",
      story: "Hikâye",
      contact: "İletişim",
      address: "Adres",
      openInMaps: "Haritada aç",
      phone: "Telefon",
      hours: "Çalışma saatleri",
      products: "Ürünler",
      links: "Çevrim içi",
      noContact: "İletişim bilgileri yakında eklenecek.",
      socials: {
        website: "Web sitesi",
        instagram: "Instagram",
        facebook: "Facebook",
        x: "X",
        youtube: "YouTube",
        tiktok: "TikTok",
      },
      imageLabel: "Üretici fotoğrafı",
    },
  },
  en: {
    demoBadge: "Sample content",
    slotHint: "Photo coming soon",
    viewProducer: "View producer",
    empty: {
      title: "Producers are coming soon",
      body: "We are adding the businesses that make and sell almond candy in Elazığ, with verified details. If you would like to be listed, write to us.",
      cta: "Join the list",
    },
    demoNote:
      "The entries below are sample content prepared to show the layout; real producers will replace them as they are added.",
    guideNote:
      "Records are compiled from Team Gacker’s Elazığ almond-candy producer guide. Patent, registration and process claims are the firms’ own accounts; confirm before you visit.",
    branches: "Branches",
    imageCredit: "Editorial still — generated with AI; not a photograph of the business.",
    detail: {
      back: "All producers",
      story: "Story",
      contact: "Contact",
      address: "Address",
      openInMaps: "Open in maps",
      phone: "Phone",
      hours: "Opening hours",
      products: "Products",
      links: "Online",
      noContact: "Contact details will be added soon.",
      socials: {
        website: "Website",
        instagram: "Instagram",
        facebook: "Facebook",
        x: "X",
        youtube: "YouTube",
        tiktok: "TikTok",
      },
      imageLabel: "Producer photo",
    },
  },
};
