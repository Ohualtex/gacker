import { useId } from "react";
import { PASTEL } from "./mascot-config";

/** Nötr siluet: tek renk, "karakter gelecek" hissi. Gerçek görsel gelince otomatik kaybolur. */
export function PlaceholderCharacter() {
  const id = useId();
  return (
    <svg className="gk-mascot__placeholder" viewBox="0 0 120 160" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={`${id}-c`}>
          <rect width="120" height="160" />
        </clipPath>
      </defs>
      <g fill="currentColor" clipPath={`url(#${id}-c)`}>
        {/* kasket */}
        <path d="M30 44 C30 24 90 24 90 44 L92 48 C78 46 42 46 28 48 Z" />
        <path d="M60 46 h40 c4 0 6 4 2 6 c-10 4 -28 3 -42 0 z" opacity="0.9" />
        {/* baş */}
        <ellipse cx="60" cy="68" rx="26" ry="27" />
        {/* gövde */}
        <path d="M18 160 C18 118 34 100 60 100 C86 100 102 118 102 160 Z" />
      </g>
      {/* önde uzatılmış kol (el uzatma jesti) */}
      <path d="M26 118 C16 126 10 128 6 124" fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
    </svg>
  );
}

/** Elde taşınan şeker avucu (karakterle birlikte hareket eder; sprite/GLB'den bağımsız). */
export function Handful() {
  return (
    <svg className="gk-mascot__handful" viewBox="0 0 40 24" aria-hidden="true" focusable="false">
      <ellipse cx="20" cy="21" rx="15" ry="2.6" fill="#2A1A12" opacity="0.18" />
      {[
        [11, 15, -18, 0],
        [22, 16, 12, 1],
        [31, 14, -6, 2],
        [17, 8, 24, 4],
        [27, 7.5, -22, 5],
      ].map(([x, y, r, c], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
          <ellipse rx="7.2" ry="4.6" fill={PASTEL[c]} />
          <ellipse rx="7.2" ry="4.6" fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="0.7" strokeDasharray="0.8 1.5" />
          <ellipse cx="-2.2" cy="-1.5" rx="2.4" ry="1.1" fill="#fff" opacity="0.4" />
        </g>
      ))}
    </svg>
  );
}
