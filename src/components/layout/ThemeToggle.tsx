"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

type Theme = "light" | "dark" | "system";
const ORDER: Theme[] = ["light", "dark", "system"];
const KEY = "gk-theme";

function apply(theme: Theme) {
  const dark =
    theme === "dark" ||
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.dataset.theme = dark ? "dark" : "light";
}

export function ThemeToggle({
  labels,
  className = "",
}: {
  labels: { theme: string; light: string; dark: string; system: string };
  className?: string;
}) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const stored = (localStorage.getItem(KEY) as Theme | null) ?? "light";
    // eslint-disable-next-line react-hooks/set-state-in-effect -- yalnızca ilk yüklemede kayıtlı tercihi okur
    setTheme(stored);
  }, []);

  // "Sistem" seçiliyken işletim sistemi değişirse takip et
  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => apply("system");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [theme]);

  const cycle = () => {
    const next = ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length];
    setTheme(next);
    localStorage.setItem(KEY, next);
    apply(next);
  };

  const Icon = theme === "light" ? Sun : theme === "dark" ? Moon : Monitor;
  const current = theme === "light" ? labels.light : theme === "dark" ? labels.dark : labels.system;

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`${labels.theme}: ${current}`}
      title={`${labels.theme}: ${current}`}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-current/10 ${className}`}
    >
      <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
    </button>
  );
}
