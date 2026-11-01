"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

const KEY = "gk-trip-v1";
const EVENT = "gk-trip:change";

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(EVENT, onChange);
  };
}

const getSnapshot = () => {
  try {
    return window.localStorage.getItem(KEY) ?? "[]";
  } catch {
    return "[]";
  }
};
const getServerSnapshot = () => "[]";

function write(ids: string[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(ids));
  } catch {
    /* depolama kapalıysa sessizce geç */
  }
  window.dispatchEvent(new Event(EVENT));
}

/**
 * "Gezi listem": seçilen durak kimlikleri yalnızca bu tarayıcıda (localStorage) tutulur.
 * `valid` listesi dışındaki kimlikler yok sayılır; sıra `valid` sırasını izler.
 */
export function useTripList(valid: string[]) {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const validKey = valid.join("|");

  const ids = useMemo(() => {
    let parsed: unknown = [];
    try {
      parsed = JSON.parse(raw);
    } catch {
      /* bozuk kayıt */
    }
    const set = new Set(Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : []);
    return validKey.split("|").filter((id) => set.has(id));
  }, [raw, validKey]);

  const toggle = useCallback(
    (id: string) => write(ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]),
    [ids],
  );
  const remove = useCallback((id: string) => write(ids.filter((x) => x !== id)), [ids]);
  const clear = useCallback(() => write([]), []);

  return { ids, toggle, remove, clear };
}
