import "./home.css";

/**
 * Ana sayfa sınıfları `hm-` önekli düz (global) CSS'tir: projedeki Turbopack kuralı *.css dosyalarını
 * Tailwind yükleyicisinden geçirdiği için CSS Modules karma adları üretmiyor.
 */
export const css: Record<string, string> = new Proxy({} as Record<string, string>, {
  get: (_t, k) => `hm-${String(k)}`,
});
