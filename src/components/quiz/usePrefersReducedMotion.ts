"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/**
 * Hidrasyon-güvenli hareket azaltma tercihi: sunucu ve ilk istemci boyaması aynı (false),
 * ardından gerçek tercihe geçer; böylece SSR çıktısıyla uyuşmazlık oluşmaz.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
