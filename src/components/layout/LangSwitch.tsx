"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, switchLocalePath, type Locale } from "@/lib/i18n";

export function LangSwitch({
  current,
  label,
  className = "",
}: {
  current: Locale;
  label: string;
  className?: string;
}) {
  const pathname = usePathname();
  return (
    <div role="group" aria-label={label} className={`flex items-center text-sm font-medium ${className}`}>
      {locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span aria-hidden="true" className="px-1.5 opacity-40">/</span>}
          <Link
            href={switchLocalePath(pathname, l)}
            hrefLang={l}
            lang={l}
            aria-current={l === current ? "true" : undefined}
            className={`uppercase tracking-wider transition-opacity ${
              l === current ? "opacity-100" : "opacity-55 hover:opacity-100"
            }`}
          >
            {l}
          </Link>
        </span>
      ))}
    </div>
  );
}
