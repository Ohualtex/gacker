import { useId } from "react";
import { ImageIcon } from "lucide-react";
import { KilimBand } from "./KilimBand";

export type Motif = "almond" | "pan" | "candy" | "tray" | "city" | "lattice";

const ALMOND_D = "M16 2C9 10 4 19 4 27c0 7 5.4 11 12 11s12-4 12-11c0-8-5-17-12-25Z";

function Almond({
  x,
  y,
  rotate = 0,
  scale = 1,
  fill = "var(--almond)",
  shine = "var(--saffron)",
}: {
  x: number;
  y: number;
  rotate?: number;
  scale?: number;
  fill?: string;
  shine?: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale}) translate(-16 -20)`}>
      <path d={ALMOND_D} fill={fill} />
      <path
        d="M16 7c-4.8 6.4-8 13-8 19.5 0 2.2.7 3.9 1.8 5.1C9.2 24.6 11.6 15 16 7Z"
        fill={shine}
        opacity="0.55"
      />
    </g>
  );
}

/** Fotoğraf/video gelene kadar duran, kasıtlı görünen tipografik-desen kompozisyonlar. */
function MotifArt({ motif }: { motif: Motif }) {
  switch (motif) {
    case "almond":
      return (
        <>
          <path
            d="M30 262C110 214 190 204 372 92"
            stroke="var(--almond)"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          {[
            [88, 232, -28],
            [150, 207, 24],
            [214, 180, -36],
            [278, 146, 28],
            [334, 112, -30],
          ].map(([x, y, r], i) => (
            <ellipse
              key={i}
              cx={x}
              cy={y}
              rx="26"
              ry="9"
              transform={`rotate(${r} ${x} ${y})`}
              fill="var(--olive)"
              opacity="0.85"
            />
          ))}
          <Almond x={122} y={256} rotate={8} scale={1.5} />
          <Almond x={246} y={212} rotate={-10} scale={1.7} fill="var(--kilim)" />
          <Almond x={318} y={170} rotate={14} scale={1.3} />
        </>
      );
    case "pan":
      return (
        <>
          <rect x="296" y="142" width="86" height="14" rx="3" fill="var(--almond)" />
          <circle cx="190" cy="150" r="112" fill="var(--almond)" />
          <circle cx="190" cy="150" r="98" fill="var(--kilim-deep)" opacity="0.55" />
          <circle cx="190" cy="150" r="72" fill="none" stroke="var(--saffron)" strokeWidth="2" opacity="0.7" />
          <circle cx="190" cy="150" r="44" fill="none" stroke="var(--saffron)" strokeWidth="2" opacity="0.5" />
          <Almond x={168} y={140} rotate={-40} scale={1.1} fill="var(--cream)" shine="var(--saffron)" />
          <Almond x={208} y={158} rotate={30} scale={1.1} fill="var(--cream)" shine="var(--saffron)" />
          <Almond x={186} y={176} rotate={80} scale={1.1} fill="var(--cream)" shine="var(--saffron)" />
        </>
      );
    case "candy":
      return (
        <>
          {Array.from({ length: 15 }).map((_, i) => {
            const col = i % 5;
            const row = Math.floor(i / 5);
            const x = 70 + col * 65 + (row % 2) * 24;
            const y = 80 + row * 72;
            const tone = (col + row) % 4 === 0;
            return (
              <Almond
                key={i}
                x={x}
                y={y}
                rotate={(i * 37) % 60 - 30}
                scale={1.25}
                fill={tone ? "var(--kilim)" : "var(--bone)"}
                shine={tone ? "var(--saffron)" : "var(--almond)"}
              />
            );
          })}
        </>
      );
    case "tray":
      return (
        <>
          <ellipse cx="200" cy="196" rx="170" ry="58" fill="var(--almond)" />
          <ellipse cx="200" cy="186" rx="150" ry="46" fill="var(--kilim-deep)" opacity="0.55" />
          <ellipse cx="200" cy="186" rx="118" ry="34" fill="none" stroke="var(--saffron)" strokeWidth="2" opacity="0.7" />
          <Almond x={140} y={176} rotate={-60} scale={1.1} fill="var(--bone)" shine="var(--almond)" />
          <Almond x={178} y={190} rotate={60} scale={1.1} fill="var(--kilim)" />
          <Almond x={220} y={176} rotate={-80} scale={1.1} fill="var(--bone)" shine="var(--almond)" />
          <Almond x={258} y={190} rotate={70} scale={1.1} fill="var(--bone)" shine="var(--almond)" />
          <Almond x={200} y={160} rotate={10} scale={1.1} fill="var(--saffron)" shine="var(--bone)" />
        </>
      );
    case "city":
      return (
        <>
          <circle cx="300" cy="82" r="30" fill="var(--saffron)" opacity="0.85" />
          {[0, 1, 2].map((i) => {
            const x = 56 + i * 104;
            return (
              <g key={i}>
                <path
                  d={`M${x} 262V148a42 42 0 0 1 84 0V262Z`}
                  fill="var(--ink-2)"
                  opacity="0.32"
                />
                <path
                  d={`M${x + 18} 262V152a24 24 0 0 1 48 0V262Z`}
                  fill="var(--bone)"
                />
              </g>
            );
          })}
          <rect x="30" y="262" width="340" height="12" fill="var(--almond)" opacity="0.7" />
        </>
      );
    default:
      return null;
  }
}

/**
 * Görsel/video yer tutucusu: kilim bandı ve motifle çerçevelenmiş krem blok.
 * Gerçek görsel gelince `src` verilir; yoksa bu kompozisyon görünür.
 */
export function ImageSlot({
  label,
  hint,
  motif = "lattice",
  showLabel = true,
  className = "",
}: {
  /** Erişilebilir ad ve altyazı: neyin yerleşeceği. */
  label: string;
  /** Küçük alt etiket (ör. "Görsel yakında"). */
  hint?: string;
  motif?: Motif;
  /** false ise altyazıda yalnızca `hint` görünür (etiket zaten sayfada yazıyorsa). */
  showLabel?: boolean;
  className?: string;
}) {
  const patternId = `slot-${useId().replace(/:/g, "")}`;
  return (
    <figure
      role="img"
      aria-label={label}
      className={`relative isolate flex aspect-[4/3] flex-col overflow-hidden rounded-[4px] bg-cream ${className}`}
    >
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full text-line"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id={patternId} width="36" height="36" patternUnits="userSpaceOnUse">
            <path d="M18 0 36 18 18 36 0 18Z" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>

      <div className="relative flex min-h-0 flex-1 items-center justify-center p-6">
        {motif !== "lattice" && (
          <svg viewBox="0 0 400 300" className="h-full max-h-full w-full" aria-hidden="true">
            <MotifArt motif={motif} />
          </svg>
        )}
      </div>

      <figcaption className="flex items-center gap-2 px-5 pb-4 text-sm text-ink-2">
        <ImageIcon className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
        <span className="truncate">{hint && !showLabel ? hint : hint ? `${label} · ${hint}` : label}</span>
      </figcaption>
      <KilimBand height={10} />
    </figure>
  );
}
