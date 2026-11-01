"use client";

import dynamic from "next/dynamic";
import type { Locale } from "@/lib/i18n";

/** Sunucu layout'unda kullanılır: maskot yalnızca istemcide yüklenir (ssr:false). */
const MascotStage = dynamic(() => import("./MascotStage"), { ssr: false });

export function MascotMount({ lang }: { lang: Locale }) {
  return <MascotStage lang={lang} />;
}
