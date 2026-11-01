"use client";

/** localStorage için useSyncExternalStore uyumlu küçük yardımcılar (aynı sekme + diğer sekmeler). */
const CHANGE_EVENT = "gk-legal:change";

/** Altbilgideki düğme bu olayı gönderir; CookieNotice yeniden açılır. */
export const NOTICE_OPEN_EVENT = "gk-notice:open";

export function subscribeStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

export function readStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStorage(key: string, value: string | null) {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
  } catch {
    /* depolama kapalıysa sessizce geç; seçim yalnızca bu oturumda geçerli olmaz */
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}
