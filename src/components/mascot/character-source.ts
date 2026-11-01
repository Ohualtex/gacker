"use client";

import { useEffect, useState } from "react";
/**
 * KARAKTER YER TUTUCUSU — hangi dosya varsa o kullanılır (öncelik sırası):
 *   1) public/models/gakkocan.glb          → 3D (drei useGLTF; klipler idle/offer/run/spill)
 *   2) public/media/gakkocan/mascot.webp   → şeffaf 2D sprite (veya mascot.png)
 *   3) hiçbiri                              → nötr siluet ("karakter gelecek")
 * Dosyayı bırakınca sayfayı yenilemek yeterli (geliştirmede sekmeye geri dönünce de yeniden aranır).
 */
export type CharacterSource =
  | { kind: "checking" }
  | { kind: "glb"; url: string }
  | { kind: "sprite"; url: string }
  | { kind: "placeholder" };

export async function probeCharacter(): Promise<CharacterSource> {
  try {
    // Tek istek, 404 gürültüsü yok (bkz. app/api/mascot-assets/route.ts)
    const res = await fetch("/api/mascot-assets", { cache: "no-store" });
    if (!res.ok) return { kind: "placeholder" };
    const data = (await res.json()) as { glb?: string | null; sprite?: string | null };
    if (data.glb) return { kind: "glb", url: data.glb };
    if (data.sprite) return { kind: "sprite", url: data.sprite };
  } catch {
    /* ağ yok: yer tutucu */
  }
  return { kind: "placeholder" };
}

export function useCharacterSource(): [CharacterSource, () => void] {
  const [src, setSrc] = useState<CharacterSource>({ kind: "checking" });
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    let alive = true;
    probeCharacter().then((r) => {
      if (alive) setSrc((prev) => (prev.kind === r.kind && "url" in prev && "url" in r && prev.url === r.url ? prev : r));
    });
    return () => {
      alive = false;
    };
  }, [nonce]);

  // Sekmeye dönünce yeniden ara (dosya bırakıldıysa otomatik değişsin)
  useEffect(() => {
    let last = 0;
    const on = () => {
      if (document.visibilityState !== "visible" || Date.now() - last < 4000) return;
      last = Date.now();
      setNonce((n) => n + 1);
    };
    document.addEventListener("visibilitychange", on);
    window.addEventListener("focus", on);
    return () => {
      document.removeEventListener("visibilitychange", on);
      window.removeEventListener("focus", on);
    };
  }, []);

  return [src, () => setSrc({ kind: "placeholder" })];
}
