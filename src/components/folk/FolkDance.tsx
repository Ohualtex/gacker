"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import type { Locale } from "@/lib/i18n";
import { folkCopy } from "@/content/folk";
import "./folk.css";

/**
 * Halay şeridi: Elazığ (Harput) yöresel kıyafetli sekiz stilize figür, el ele.
 * Tek tip çizgi dili: düz dolgu + ortak ince kontur (kontur üst <g>'den miras alınır).
 * Hareket yalnız CSS transform; ekran dışında/sekme gizliyken durur; reduced-motion'da statik poz.
 *
 * Kıyafet kaynakları (sadeleştirilmiş): erkekte fes/keçe külah + oyalı yazma ya da sekiz köşe şapka,
 * beyaz gömlek, şalvar kumaşından avcı yeleği, beyaz şal kuşak, şalvar, beyaz çorap, poçikli yemeni;
 * kadında tepelik (fes), oyalı yazma, alınlık, beyaz içlik, üçetek (önü açık, üç parça etek),
 * şalvar, gümüş kemer, beyaz çorap, yemeni. Kilim motifi süslemeleri sanatsal tercihtir.
 */

type Skin = "a" | "b";
type Woman = { kind: "f"; skin: Skin; coat: "a" | "b" | "c"; salvar: "a" | "b" };
type Man = { kind: "m"; skin: Skin; hat: "fes" | "cap"; wool: "grey" | "slate" };
type Fig = Woman | Man;

const FIGURES: Fig[] = [
  { kind: "f", skin: "a", coat: "a", salvar: "a" },
  { kind: "m", skin: "b", hat: "fes", wool: "grey" },
  { kind: "f", skin: "b", coat: "b", salvar: "b" },
  { kind: "m", skin: "a", hat: "cap", wool: "slate" },
  { kind: "f", skin: "a", coat: "c", salvar: "a" },
  { kind: "m", skin: "b", hat: "fes", wool: "grey" },
  { kind: "f", skin: "b", coat: "a", salvar: "b" },
  { kind: "m", skin: "a", hat: "cap", wool: "grey" },
];

const PITCH = 130; // figür aralığı (SVG birimi)
const FIRST_X = 65;
const HAND_X = 63; // el ele tutuşma noktası, figür merkezinden uzaklık
const OYA = ["var(--kilim)", "var(--saffron)", "var(--olive)"];

/** Tek kol: gövdenin ARKASINDA başlar (omuz gizlenir), konturlu kılıf + el. */
function Arm({ sleeve, cuff }: { sleeve: string; cuff?: boolean }) {
  const d = `M-12,-193 Q-47,-172 -${HAND_X},-136`;
  return (
    <g>
      <path d={d} fill="none" stroke="var(--gk-ln)" strokeWidth="11.2" strokeLinecap="round" />
      <path d={d} fill="none" stroke={sleeve} strokeWidth="8.6" strokeLinecap="round" />
      {cuff && (
        <path
          d={d}
          pathLength="100"
          fill="none"
          stroke="var(--saffron)"
          strokeWidth="8.8"
          strokeLinecap="butt"
          strokeDasharray="0 78 10 12"
        />
      )}
      <circle cx={-HAND_X} cy="-134" r="5.2" fill="var(--gk-skin)" />
    </g>
  );
}

function Arms({ sleeve, cuff }: { sleeve: string; cuff?: boolean }) {
  return (
    <g className="gk-folk-arms">
      <Arm sleeve={sleeve} cuff={cuff} />
      <g transform="scale(-1 1)">
        <Arm sleeve={sleeve} cuff={cuff} />
      </g>
    </g>
  );
}

function ManLeg({ side }: { side: "a" | "b" }) {
  return (
    <g className={side === "a" ? "gk-folk-leg-a" : "gk-folk-leg-b"}>
      <g transform={side === "a" ? undefined : "scale(-1 1)"}>
        <path
          d="M-22,-142 C-31,-104 -24,-66 -12,-38 L-9.5,-17 L-1.5,-17 C-1,-50 1,-90 1,-142 Z"
          fill="var(--gk-wool)"
        />
        <path d="M-9.6,-18 L-1.6,-18 L-1.6,-7 L-9.6,-7 Z" fill="var(--gk-white)" />
        <path
          d="M-10.8,-7 L-1,-7 L0,-2.2 Q0,0 -2,0 L-13,0 Q-15.4,0 -14.8,-3 Z"
          fill="var(--gk-shoe)"
        />
      </g>
    </g>
  );
}

const HEAD_FIT = "translate(0 30.4) scale(1.1)";

function ManHead({ hat }: { hat: "fes" | "cap" }) {
  return (
    <g transform={HEAD_FIT}>
      <path d="M-4.6,-214 L4.6,-214 L5,-207 L-5,-207 Z" fill="var(--gk-skin)" />
      <ellipse cx="0" cy="-226" rx="10" ry="11.6" fill="var(--gk-skin)" />
      {hat === "fes" ? (
        <g>
          <path d="M-9.4,-233 L-7.4,-251 Q0,-254.5 7.4,-251 L9.4,-233 Z" fill="var(--gk-fes)" />
          {/* fese sarılı oyalı yazma */}
          <path
            d="M-10.6,-232.5 Q0,-237.6 10.6,-232.5 L10.9,-227.4 Q0,-232.5 -10.9,-227.4 Z"
            fill="var(--gk-white)"
          />
          <path
            d="M-10.7,-229 Q0,-234 10.7,-229"
            fill="none"
            stroke="var(--saffron)"
            strokeWidth="1.3"
          />
        </g>
      ) : (
        <g>
          {/* sekiz köşe şapka */}
          <path
            d="M-11,-232.5 C-12,-244 -6,-250.5 0,-250.5 C6,-250.5 12,-244 11,-232.5 Z"
            fill="var(--gk-wool)"
          />
          <path
            d="M-4,-249.5 Q-5.5,-241 -4,-233 M4,-249.5 Q5.5,-241 4,-233"
            fill="none"
            strokeWidth="0.9"
            opacity="0.7"
          />
          <path d="M-11,-232.5 Q0,-228.2 11,-232.5 Q0,-235 -11,-232.5 Z" fill="var(--gk-wool)" />
        </g>
      )}
    </g>
  );
}

function MaleFigure({ f }: { f: Man }) {
  return (
    <g
      style={
        {
          "--gk-skin": f.skin === "a" ? "var(--gk-skin-a)" : "var(--gk-skin-b)",
          "--gk-wool": f.wool === "grey" ? "var(--gk-wool-grey)" : "var(--gk-wool-slate)",
        } as CSSProperties
      }
    >
      <Arms sleeve="var(--gk-white)" />
      <ManLeg side="a" />
      <ManLeg side="b" />
      {/* gövde: beyaz gömlek + açık yelek */}
      <path d="M-19,-199 Q0,-206 19,-199 L16.5,-140 L-16.5,-140 Z" fill="var(--gk-white)" />
      <path d="M-19,-199 L-7,-203 L-3.4,-172 L-5,-140 L-16.5,-140 Z" fill="var(--gk-wool)" />
      <path d="M19,-199 L7,-203 L3.4,-172 L5,-140 L16.5,-140 Z" fill="var(--gk-wool)" />
      {/* beyaz şal kuşak */}
      <path d="M-17.5,-149 L17.5,-149 L18.4,-133 L-18.4,-133 Z" fill="var(--gk-kusak)" />
      <path d="M-17.5,-142.5 L18,-139.6" fill="none" strokeWidth="0.9" opacity="0.5" />
      <path d="M7,-134 L15.5,-134 L16.6,-115 L8.6,-113 Z" fill="var(--gk-kusak)" />
      <ManHead hat={f.hat} />
    </g>
  );
}

function WomanFoot({ side }: { side: "a" | "b" }) {
  return (
    <g className={side === "a" ? "gk-folk-leg-a" : "gk-folk-leg-b"}>
      <g transform={side === "a" ? undefined : "scale(-1 1)"}>
        <path d="M-17,-22 L-8.4,-22 L-8.4,-7 L-17,-7 Z" fill="var(--gk-white)" />
        <path
          d="M-18.2,-7 L-7.4,-7 L-6.4,-2.2 Q-6.4,0 -8.4,0 L-20,0 Q-22.6,0 -22,-3 Z"
          fill="var(--gk-shoe)"
        />
      </g>
    </g>
  );
}

/** Kilim baklavası (küçük süs) */
function Diamond({ x, y, r, fill }: { x: number; y: number; r: number; fill: string }) {
  return (
    <polygon
      points={`${x},${y - r} ${x + r},${y} ${x},${y + r} ${x - r},${y}`}
      fill={fill}
      strokeWidth="0.7"
    />
  );
}

function WomanHead() {
  return (
    <g transform={HEAD_FIT}>
      {/* oyalı yazma: başın arkasından omuzlara düşer */}
      <path
        d="M-12,-241 C-20,-236 -21.4,-214 -19.6,-194 Q0,-188 19.6,-194 C21.4,-214 20,-236 12,-241 Z"
        fill="var(--gk-white)"
      />
      {[-16, -10.5, -5, 0.5, 6, 11.5, 17].map((x, i) => (
        <circle
          key={x}
          cx={x}
          cy={-192.4 + (Math.abs(x) > 14 ? -1.2 : 0)}
          r="2.3"
          fill={OYA[i % 3]}
          strokeWidth="0.7"
        />
      ))}
      <path d="M-4.4,-214 L4.4,-214 L4.8,-206.5 L-4.8,-206.5 Z" fill="var(--gk-skin)" />
      <ellipse cx="0" cy="-226" rx="9.6" ry="11.6" fill="var(--gk-skin)" />
      {/* tepelik (fes) + gümüş tepelik */}
      <path d="M-9.4,-236 L-8,-250 Q0,-253.4 8,-250 L9.4,-236 Z" fill="var(--gk-fes)" />
      <ellipse cx="0" cy="-250.8" rx="6.4" ry="2.2" fill="var(--gk-silver)" />
      {/* alınlık */}
      <path
        d="M-9.6,-232.2 Q0,-239 9.6,-232.2 L9.8,-229.4 Q0,-236 -9.8,-229.4 Z"
        fill="var(--gk-silver)"
      />
    </g>
  );
}

function FemaleFigure({ f }: { f: Woman }) {
  const coat = `var(--gk-coat-${f.coat})`;
  return (
    <g
      style={
        {
          "--gk-skin": f.skin === "a" ? "var(--gk-skin-a)" : "var(--gk-skin-b)",
          "--gk-uc": coat,
          "--gk-sv": f.salvar === "a" ? "var(--gk-salvar-a)" : "var(--gk-salvar-b)",
        } as CSSProperties
      }
    >
      <Arms sleeve="var(--gk-uc)" cuff />
      <WomanFoot side="a" />
      <WomanFoot side="b" />
      <g className="gk-folk-skirt">
        {/* üçetek: arka etek (daha koyu) */}
        <path
          d="M-17,-141 L17,-141 C30,-104 38,-68 40.5,-37 L-40.5,-37 C-38,-68 -30,-104 -17,-141 Z"
          fill="color-mix(in oklab, var(--gk-uc) 74%, #000)"
        />
        {/* şalvar: bileğe kadar dökümlü */}
        <path
          d="M-19,-141 L19,-141 C24,-100 27,-60 25,-17 L-25,-17 C-27,-60 -24,-100 -19,-141 Z"
          fill="var(--gk-sv)"
        />
        <path d="M-25,-23 L25,-23" fill="none" stroke="var(--saffron)" strokeWidth="1.5" />
        <path d="M0,-130 L0,-30" fill="none" strokeWidth="0.8" opacity="0.28" />
        {/* üçetek ön etekleri: uçları yukarı toplanmış, şalvar görünür */}
        <path
          d="M-17.5,-141 L-2.4,-141 L-3.4,-114 C-12,-86 -26,-60 -39,-38 C-35,-80 -27,-112 -17.5,-141 Z"
          fill="var(--gk-uc)"
        />
        <path
          d="M17.5,-141 L2.4,-141 L3.4,-114 C12,-86 26,-60 39,-38 C35,-80 27,-112 17.5,-141 Z"
          fill="var(--gk-uc)"
        />
        <path
          d="M-3.4,-114 C-12,-86 -26,-60 -39,-38 M3.4,-114 C12,-86 26,-60 39,-38"
          fill="none"
          stroke="var(--saffron)"
          strokeWidth="2"
        />
        {/* kilim baklavaları: arka etek eteği */}
        {[-34, -25.5, -17, -8.5, 0, 8.5, 17, 25.5, 34].map((x, i) => (
          <Diamond
            key={x}
            x={x}
            y={-31}
            r={3.2}
            fill={i % 2 === 0 ? "var(--saffron)" : "var(--gk-white)"}
          />
        ))}
      </g>
      {/* gövde: beyaz içlik + V yakalı üçetek */}
      <path d="M-18.5,-198 Q0,-205 18.5,-198 L15.5,-140 L-15.5,-140 Z" fill="var(--gk-white)" />
      <path d="M-18.5,-198 L-6.5,-202 L-2.2,-172 L-1.2,-141 L-15.5,-141 Z" fill="var(--gk-uc)" />
      <path d="M18.5,-198 L6.5,-202 L2.2,-172 L1.2,-141 L15.5,-141 Z" fill="var(--gk-uc)" />
      <path
        d="M-6.5,-202 L-2.2,-172 L-1.2,-141 M6.5,-202 L2.2,-172 L1.2,-141"
        fill="none"
        stroke="var(--saffron)"
        strokeWidth="1.5"
      />
      {/* gümüş kemer */}
      <path d="M-17,-148 L17,-148 L17.8,-136 L-17.8,-136 Z" fill="var(--gk-silver)" />
      <Diamond x={0} y={-142} r={7} fill="var(--saffron)" />
      <Diamond x={0} y={-142} r={3} fill="var(--kilim)" />
      <WomanHead />
    </g>
  );
}

export function FolkDance({ lang }: { lang: Locale }) {
  const t = folkCopy[lang];
  const rootRef = useRef<HTMLElement>(null);

  // Ekran dışındayken / sekme gizliyken animasyonları durdur; ilk görünüşte giriş.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let inView = false;
    const sync = () => {
      el.dataset.paused = !inView || document.hidden ? "true" : "false";
    };
    el.dataset.ready = "true";
    sync();
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) el.dataset.seen = "true";
        sync();
      },
      { rootMargin: "80px 0px" },
    );
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  const width = PITCH * FIGURES.length;

  return (
    <section ref={rootRef} className="gk-folk-root" aria-labelledby="gk-folk-title">
      <div className="gk-folk-stage">
        <svg
          className="gk-folk-svg"
          viewBox={`-60 -272 ${width + 120} 292`}
          role="img"
          aria-label={t.label}
          focusable="false"
        >
          <g stroke="var(--gk-ln)" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round">
            {FIGURES.map((f, i) => {
              const x = FIRST_X + PITCH * i;
              const scale = f.kind === "f" ? 0.965 : 1;
              const restX = (Math.sin((i * Math.PI) / 3.2) * 5).toFixed(2);
              return (
                <g key={i} transform={`translate(${x} 0) scale(${scale})`}>
                  <g
                    className="gk-folk-in"
                    style={
                      {
                        "--i": i,
                        "--gk-rx": `${restX}px`,
                        "--gk-lift-a": i % 2 === 0 ? "-4px" : "0px",
                        "--gk-lift-b": i % 2 === 0 ? "0px" : "-4px",
                      } as CSSProperties
                    }
                  >
                    <g className="gk-folk-sway">
                      <ellipse
                        className="gk-folk-shade"
                        cx="0"
                        cy="1"
                        rx="32"
                        ry="4.2"
                        fill="var(--gk-shade)"
                        stroke="none"
                      />
                      <g className="gk-folk-bob">
                        {f.kind === "f" ? <FemaleFigure f={f} /> : <MaleFigure f={f} />}
                      </g>
                    </g>
                  </g>
                </g>
              );
            })}
          </g>
        </svg>
      </div>
      <div className="container-x gk-folk-text">
        <h2 id="gk-folk-title" className="gk-folk-title">
          {t.title}
        </h2>
        <p className="gk-folk-lead">{t.text}</p>
        <p className="gk-folk-note">{t.note}</p>
      </div>
    </section>
  );
}
