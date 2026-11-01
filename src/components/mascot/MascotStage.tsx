"use client";

/**
 * MascotStage — sağ altta duran, hareketli seyyar satıcı standı.
 *
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │ KARAKTERİ DEĞİŞTİRMEK İÇİN (hiçbir koda dokunmadan):                     │
 * │   1) public/models/gakkocan.glb        → 3D karakter (öncelik 1)         │
 * │      Klip adları (içerir eşleşmesi): idle · offer · run · spill          │
 * │      Klip yoksa kod animasyonu uygulanır. Boyut/konum otomatik oturur.   │
 * │   2) public/media/gakkocan/mascot.webp (veya mascot.png) → 2D sprite     │
 * │      Şeffaf zeminli, karşıdan bakan, ayakları görselin altında, en az    │
 * │      ~600 px yükseklik. Tezgâh karakterin belden aşağısını örter.        │
 * │   3) İkisi de yoksa nötr siluet gösterilir ("karakter gelecek").         │
 * │ Dosyayı bırakıp sayfayı yenile; otomatik algılanır.                      │
 * │ El konumu/kutu ayarı: ./mascot-config.ts (SLOT, HAND).                   │
 * └──────────────────────────────────────────────────────────────────────────┘
 *
 * Mimari: durum makinesi (mascot-machine.ts, saf TS) → faz data-phase olarak köke yazılır;
 * hareketler CSS (mascot.css), şeker fiziği CandyLayer.tsx. Three yalnız GLB varsa yüklenir.
 */
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { ChevronDown, ChevronUp, MessageCircle } from "lucide-react";
import { mascotContent } from "@/content/mascot";
import type { Locale } from "@/lib/i18n";
import { ASSISTANT_OPEN_EVENT } from "@/components/assistant/AssistantWidget";
import { FILM_ARRIVED_EVENT } from "@/components/film/FilmPopup";
import { MascotMachine, type MascotSnapshot } from "./mascot-machine";
import { HAND, SLOT, STAGE } from "./mascot-config";
import { useCharacterSource } from "./character-source";
import { CandyLayer, type CandyLayerHandle } from "./CandyLayer";
import { StandBack, StandFront } from "./StandArt";
import { Handful, PlaceholderCharacter } from "./CharacterArt";
import "./mascot.css";

const GlbCharacter = dynamic(() => import("./GlbCharacter"), { ssr: false });

const BUBBLE_MS = 3600;
const MIN_KEY = "gk-mascot-min";

const reducedSubscribe = (cb: () => void) => {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const reducedSnapshot = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

declare global {
  interface Window {
    /** Yalnızca geliştirmede: test/ekran görüntüsü için. */
    __gkMascot?: { machine: MascotMachine };
  }
}

export default function MascotStage({ lang }: { lang: Locale }) {
  const t = mascotContent[lang];
  const reduced = useSyncExternalStore(reducedSubscribe, reducedSnapshot, () => false);
  const machine = useMemo(() => new MascotMachine({ reducedMotion: reducedSnapshot() }), []);
  const [snap, setSnap] = useState<MascotSnapshot>(() => machine.snapshot);
  const [source, markBroken] = useCharacterSource();
  const [bubble, setBubble] = useState<{ id: number; text: string } | null>(null);
  const [minimized, setMinimized] = useState(() => {
    try {
      return window.localStorage.getItem(MIN_KEY) === "1"; // bileşen yalnızca istemcide (ssr:false) kurulur
    } catch {
      return false;
    }
  });
  const [paused, setPaused] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const candies = useRef<CandyLayerHandle>(null);
  const handled = useRef({ spill: 0, sweep: 0, bubble: 0 });

  useEffect(() => machine.setReducedMotion(reduced), [machine, reduced]);
  useEffect(() => machine.subscribe(setSnap), [machine]);

  // zaman: ~10 Hz tick; sekme gizli / ekran dışıyken durur
  useEffect(() => {
    let last = performance.now();
    let inView = true;
    const el = rootRef.current;
    const io = el ? new IntersectionObserver(([e]) => (inView = e.isIntersecting), { threshold: 0 }) : null;
    if (el) io?.observe(el);
    const sync = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", sync);
    sync();
    const id = window.setInterval(() => {
      const now = performance.now();
      const dt = now - last;
      last = now;
      if (document.hidden || !inView) return;
      machine.tick(Math.min(dt, 250));
    }, 100);
    return () => {
      window.clearInterval(id);
      io?.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [machine]);

  // şeker dökme / temizleme
  useEffect(() => {
    if (snap.spillId !== handled.current.spill) {
      handled.current.spill = snap.spillId;
      candies.current?.spill({ x: HAND.x, y: HAND.y }, 10, reduced);
    }
    if (snap.sweepId !== handled.current.sweep) {
      handled.current.sweep = snap.sweepId;
      candies.current?.clear();
    }
  }, [snap.spillId, snap.sweepId, reduced]);

  // konuşma balonu (dekoratif, aria-hidden)
  useEffect(() => {
    if (!snap.bubble || snap.bubble.id === handled.current.bubble) return;
    handled.current.bubble = snap.bubble.id;
    const key = snap.bubble.key;
    setBubble({ id: snap.bubble.id, text: t.bubbles[key] });
    const timer = window.setTimeout(() => setBubble((b) => (b && b.id === snap.bubble?.id ? null : b)), BUBBLE_MS);
    return () => window.clearTimeout(timer);
  }, [snap.bubble, t]);

  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    window.__gkMascot = { machine };
    return () => {
      delete window.__gkMascot;
    };
  }, [machine]);

  const standRef = useRef<HTMLButtonElement>(null);
  const openedByStand = useRef(false);

  const openAssistant = useCallback(() => {
    openedByStand.current = true;
    window.dispatchEvent(new CustomEvent(ASSISTANT_OPEN_EVENT));
  }, []);

  // Panel kapanınca odağı stand düğmesine geri ver (başlatıcı gizli olduğu için odak kaybolmasın)
  useEffect(() => {
    let was = false;
    const mo = new MutationObserver(() => {
      const open = !!document.querySelector(".gk-assistant-panel");
      if (was && !open && openedByStand.current) {
        openedByStand.current = false;
        standRef.current?.focus({ preventScroll: true });
      }
      was = open;
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, []);

  const touch = useCallback(() => {
    machine.send("touch");
  }, [machine]);

  const toggleMin = () => {
    setMinimized((m) => {
      const next = !m;
      try {
        window.localStorage.setItem(MIN_KEY, next ? "1" : "0");
      } catch {
        /* yok say */
      }
      return next;
    });
  };

  const slotStyle = {
    left: `${(SLOT.x / STAGE.w) * 100}%`,
    top: `${(SLOT.y / STAGE.h) * 100}%`,
    width: `${(SLOT.w / STAGE.w) * 100}%`,
    height: `${(SLOT.h / STAGE.h) * 100}%`,
  };
  const handStyle = {
    left: `${((HAND.x - SLOT.x - 20) / SLOT.w) * 100}%`,
    top: `${((HAND.y - SLOT.y - 12) / SLOT.h) * 100}%`,
  };
  const [arrived, setArrived] = useState(true);
  useEffect(() => {
    const onArrive = () => setArrived(true);
    window.addEventListener(FILM_ARRIVED_EVENT, onArrive);
    return () => window.removeEventListener(FILM_ARRIVED_EVENT, onArrive);
  }, []);

  const touchable = snap.phase === "offer" || snap.phase === "idle";

  return (
    <div
      ref={rootRef}
      className="gk-mascot"
      data-phase={snap.phase}
      data-source={source.kind}
      data-min={minimized}
      data-paused={paused}
      data-arrived={arrived}
      data-lang={lang}
    >
      <div className="gk-mascot__body">
        <StandBack />

        <div
          className="gk-mascot__slot"
          style={slotStyle}
          data-touchable={touchable}
          aria-hidden="true"
          onPointerDown={touchable ? touch : undefined}
        >
          <div className="gk-mascot__char">
            <div className="gk-mascot__bob">
              {source.kind === "sprite" && (
                // eslint-disable-next-line @next/next/no-img-element -- şeffaf sprite, boyutu CSS belirler
                <img className="gk-mascot__sprite" src={source.url} alt="" draggable={false} onError={markBroken} />
              )}
              {source.kind === "glb" && (
                <GlbCharacter url={source.url} phase={snap.phase} reduced={reduced} paused={paused} onError={markBroken} />
              )}
              {(source.kind === "placeholder" || source.kind === "checking") && <PlaceholderCharacter />}
            </div>
            <div className="gk-mascot__handful-wrap" style={handStyle}>
              <Handful />
            </div>
          </div>
        </div>

        <button
          ref={standRef}
          type="button"
          className="gk-mascot__stand"
          onClick={openAssistant}
          aria-label={t.ariaOpen}
          aria-haspopup="dialog"
        >
          <span className="gk-mascot__kilim" aria-hidden="true" />
          <span className="gk-mascot__label">{t.standLabel}</span>
        </button>

        <StandFront sign={t.sign} />
        <CandyLayer ref={candies} />
      </div>

      <div className="gk-mascot__bubble" data-show={bubble ? "true" : "false"} aria-hidden="true">
        <span key={bubble?.id}>{bubble?.text}</span>
      </div>

      {minimized ? (
        <div className="gk-mascot__dock">
          <button type="button" className="gk-mascot__min" onClick={toggleMin} aria-label={t.restore}>
            <ChevronUp size={16} aria-hidden="true" />
          </button>
          <button type="button" className="gk-mascot__pill" onClick={openAssistant} aria-haspopup="dialog" aria-label={t.ariaOpen}>
            <MessageCircle size={18} strokeWidth={1.75} aria-hidden="true" />
            <span>{t.pill}</span>
          </button>
        </div>
      ) : (
        <button type="button" className="gk-mascot__min gk-mascot__min--top" onClick={toggleMin} aria-label={t.minimize}>
          <ChevronDown size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
