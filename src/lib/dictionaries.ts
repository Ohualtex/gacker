import type { Locale } from "./i18n";
import tr from "@/dictionaries/tr.json";
import en from "@/dictionaries/en.json";

export type Dictionary = typeof tr;

const dictionaries: Record<Locale, Dictionary> = { tr, en };

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];
