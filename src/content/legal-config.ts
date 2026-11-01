/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  HUKUKİ METİNLER İÇİN TEK DOLDURULACAK DOSYA  /  SINGLE FILE TO FILL IN
 * ─────────────────────────────────────────────────────────────────────────────
 *  Tüm hukuki sayfalar (KVKK, Gizlilik, Çerez, Koşullar, Yapay Zekâ & Atıf) bu
 *  değerleri kullanır. Köşeli parantezli "[... — DOLDURUN]" değerleri GERÇEK
 *  bilgiyle değiştirin. Doldurulana kadar sayfada sarı işaretle görünürler;
 *  asla uydurma iletişim bilgisi yazmayın.
 *
 *  Gerçek kullanımdan önce: metinleri sorumlu kişi / hukuk danışmanı gözden
 *  geçirmeli ve `reviewed` alanı true yapılmalıdır (taslak uyarısı kalkar).
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type Localized = { tr: string; en: string };

/** Doldurulmamış alan üretir. Değeri gerçek bilgiyle değiştirin. */
const todo = (tr: string, en: string): Localized => ({
  tr: `[${tr} — DOLDURUN]`,
  en: `[${en} — FILL IN]`,
});

/** Değer hâlâ yer tutucuysa true (arayüz sarı işaretle gösterir). */
export const isPlaceholder = (value: string) => /^\[.*\]$/.test(value.trim());

export const legalConfig = {
  /**
   * Metinler gözden geçirilip onaylandığında true yapın.
   * false iken her hukuki sayfanın başında "TASLAK ŞABLON" uyarısı görünür.
   */
  reviewed: false,

  /** Son güncelleme tarihi (YYYY-AA-GG). Metni her değiştirdiğinizde güncelleyin. */
  lastUpdated: "2026-11-01",

  /**
   * Onay sürümü. Asistan veri işleme koşulları değişirse artırın ("2", "3"…);
   * kullanıcılardan yeniden onay istenir.
   */
  consentVersion: "1",

  // ── Veri sorumlusu (KVKK m.10) ───────────────────────────────────────────
  controllerName: todo("VERİ SORUMLUSU ÜNVANI / ADI", "DATA CONTROLLER NAME"),
  controllerAddress: todo("TEBLİGATA ELVERİŞLİ ADRES", "ADDRESS FOR SERVICE"),
  email: todo("İLETİŞİM E-POSTASI", "CONTACT E-MAIL"),
  phone: todo("TELEFON", "PHONE"),
  /** Kayıtlı Elektronik Posta adresi (varsa). Yoksa "Yoktur / None" yazın. */
  kep: todo("KEP ADRESİ", "KEP (REGISTERED E-MAIL) ADDRESS"),
  /** VERBİS kaydı: kayıt numarası ya da "Kayıt yükümlülüğü bulunmamaktadır". */
  verbis: todo("VERBİS KAYIT NO / MUAFİYET", "VERBIS REGISTRATION NO. / EXEMPTION"),

  // ── Aktarım yapılan taraflar ─────────────────────────────────────────────
  /** Barındırma (hosting) sağlayıcısı adı. */
  hostingProvider: todo("HOSTING SAĞLAYICISI ADI", "HOSTING PROVIDER NAME"),
  /** Sunucuların bulunduğu ülke/bölge. */
  hostingLocation: todo("SUNUCU KONUMU (ÜLKE)", "SERVER LOCATION (COUNTRY)"),
  /** Barındırma sağlayıcısındaki erişim kaydı (log) saklama süresi. */
  hostingLogRetention: todo("ERİŞİM KAYDI SAKLAMA SÜRESİ", "ACCESS LOG RETENTION PERIOD"),
  /** Yapay zekâ (LLM) hizmet sağlayıcısı adı. */
  llmProvider: todo("YAPAY ZEKÂ (LLM) SAĞLAYICISI ADI", "AI (LLM) PROVIDER NAME"),
  /** LLM sağlayıcısının işlem yaptığı ülke/bölge. */
  llmProviderCountry: todo("LLM İŞLEME ÜLKESİ", "LLM PROCESSING COUNTRY"),
  /** LLM sağlayıcısının gönderilen mesajları saklama/eğitimde kullanma politikası özeti. */
  llmProviderRetention: todo(
    "LLM SAĞLAYICISININ SAKLAMA / EĞİTİM POLİTİKASI",
    "LLM PROVIDER RETENTION / TRAINING POLICY",
  ),
  /** Yurt dışı aktarımda dayanılan güvence (m.9): yeterlilik kararı, standart sözleşme vb. */
  transferSafeguard: todo("YURT DIŞI AKTARIM GÜVENCESİ", "CROSS-BORDER TRANSFER SAFEGUARD"),

  // ── Kaldırma / telif talepleri ───────────────────────────────────────────
  /** Boşsa `email` kullanılır. */
  takedownEmail: todo("KALDIRMA / TELİF TALEBİ E-POSTASI", "REMOVAL / COPYRIGHT REQUEST E-MAIL"),

  // ── Yetkili mahkeme / icra dairesi (Kullanım Koşulları) ───────────────────
  jurisdiction: todo("YETKİLİ MAHKEME / İCRA DAİRELERİ (İL)", "COMPETENT COURTS (CITY)"),
} as const satisfies Record<string, boolean | string | Localized>;

export type LegalConfigKey = {
  [K in keyof typeof legalConfig]: (typeof legalConfig)[K] extends Localized ? K : never;
}[keyof typeof legalConfig];
