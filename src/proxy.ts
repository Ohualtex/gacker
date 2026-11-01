import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, locales, type Locale } from "@/lib/i18n";

/** Accept-Language başlığından desteklenen ilk dili seçer. */
function pickLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language") ?? "";
  const requested = header
    .split(",")
    .map((part) => part.trim().split(";")[0].toLowerCase().split("-")[0])
    .filter(Boolean);
  for (const code of requested) if (hasLocale(code)) return code;
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return;
  const hasPrefix = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasPrefix) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${pickLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // _next, api ve uzantılı dosyalar (public varlıkları) hariç
  matcher: ["/((?!_next|api|admin|.*\\..*).*)"],
};
