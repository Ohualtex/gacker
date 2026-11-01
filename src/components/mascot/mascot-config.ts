/**
 * Maskot yerleşimi — "mantıksal birimler" (stand 320 × 344 birimlik bir sahne olarak çizilir ve
 * genişliğe göre ölçeklenir). Karakter görselini değiştirince sadece buradaki SLOT / HAND
 * değerlerini ayarlamak yeterlidir.
 */

export const STAGE = { w: 320, h: 344 } as const;

/** Karakterin durduğu kutu (tezgâhın arkası, saçağın altı). Sprite/GLB bu kutuya `contain` ile sığar. */
export const SLOT = { x: 52, y: 92, w: 216, h: 146 } as const;

/** Tezgâh üstü (şekerlerin düştüğü yüzey) ve zemin çizgisi. */
export const COUNTER = { x0: 38, x1: 292, y0: 234, y1: 244 } as const;
export const GROUND = { y0: 326, y1: 338 } as const;

/** Uzatılan elin (avucun) sahne koordinatındaki konumu — şekerler buradan dökülür. */
export const HAND = { x: 112, y: 202 } as const;

/** Dosya yolları — kullanıcı bu dosyalardan birini bırakır, sistem otomatik algılar. */
export const ASSETS = {
  glb: "/models/gakkocan.glb",
  sprites: ["/media/gakkocan/mascot.webp", "/media/gakkocan/mascot.png"],
} as const;

/** GLB klip adı eşleştirmesi (küçük/büyük harf duyarsız, içerir eşleşmesi). */
export const CLIP_ALIASES = {
  idle: ["idle", "stand", "breath"],
  offer: ["offer", "give", "hand", "present"],
  run: ["run", "sprint", "walk"],
  spill: ["spill", "drop", "surprise", "startle", "angry"],
} as const;

export const PASTEL = ["#EDB9C0", "#BEDCCB", "#EFDA95", "#F4EDE0", "#CDC1DF", "#BAD2E6"] as const;
