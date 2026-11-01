import type { Locale } from "@/lib/i18n";
import { aiContentDoc } from "./ai-content";
import { cookiesDoc } from "./cookies";
import { kvkkDoc } from "./kvkk";
import { privacyDoc } from "./privacy";
import { termsDoc } from "./terms";
import type { Bilingual, LegalDoc } from "./types";
import { legalNavLabels, legalSlugs, legalUi, type LegalSlug } from "./ui";

export { legalNavLabels, legalSlugs, legalUi };
export type { LegalDoc, LegalSlug };

const docs: Record<LegalSlug, Bilingual<LegalDoc>> = {
  kvkk: kvkkDoc,
  gizlilik: privacyDoc,
  "cerez-politikasi": cookiesDoc,
  "kullanim-kosullari": termsDoc,
  "yapay-zeka-ve-icerik": aiContentDoc,
};

export const getLegalDoc = (slug: LegalSlug, lang: Locale): LegalDoc => docs[slug][lang];
