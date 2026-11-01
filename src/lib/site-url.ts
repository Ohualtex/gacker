/** Mutlak site adresi: NEXT_PUBLIC_SITE_URL (sonda / olmadan) veya yerel geliştirme. */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  return (raw || "http://localhost:3000").replace(/\/+$/, "");
}
