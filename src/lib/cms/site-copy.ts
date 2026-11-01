export type SiteCopyField = {
  key: string;
  label: string;
  rows?: number;
};

export type SiteCopyGroup = {
  title: string;
  fields: SiteCopyField[];
};

/** Admin’de düzenlenen cümleler. Menü, düğme ve hata metinleri burada yok. */
export const siteCopyGroups: SiteCopyGroup[] = [
  {
    title: "Giriş",
    fields: [
      { key: "hero.title", label: "Ana başlık", rows: 2 },
      { key: "hero.lead", label: "Alt cümle", rows: 3 },
      { key: "meta.title", label: "Sekme başlığı", rows: 2 },
      { key: "meta.description", label: "Kısa tanım", rows: 3 },
    ],
  },
  {
    title: "Sayfa başlıkları",
    fields: [
      { key: "pages.story.title", label: "Hikâye" },
      { key: "pages.story.lead", label: "Hikâye alt cümlesi", rows: 2 },
      { key: "pages.producers.title", label: "Üreticiler" },
      { key: "pages.producers.lead", label: "Üreticiler alt cümlesi", rows: 2 },
      { key: "pages.discover.title", label: "Keşfet" },
      { key: "pages.discover.lead", label: "Keşfet alt cümlesi", rows: 2 },
      { key: "pages.gallery.title", label: "Galeri" },
      { key: "pages.gallery.lead", label: "Galeri alt cümlesi", rows: 2 },
      { key: "pages.contact.title", label: "İletişim" },
      { key: "pages.contact.lead", label: "İletişim alt cümlesi", rows: 2 },
    ],
  },
  {
    title: "Alt bilgi",
    fields: [
      { key: "footer.builtBy", label: "Kim yaptı", rows: 2 },
      { key: "footer.event", label: "Etkinlik satırı", rows: 2 },
    ],
  },
];

export const siteCopyKeys = siteCopyGroups.flatMap((group) => group.fields.map((field) => field.key));
