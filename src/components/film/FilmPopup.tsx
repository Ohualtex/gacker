"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { KilimBand } from "@/components/ui/KilimBand";
import "./film-popup.css";

export const FILM_CLOSE_EVENT = "gk-film:close";
export const FILM_HANDOFF_EVENT = "gk-film:handoff";
export const FILM_ARRIVED_EVENT = "gk-film:arrived";
const STORAGE_KEY = "gk-film";
const SRC = "/media/gakkooo-web.mp4";

const copy = {
  tr: {
    title: "Gakkocan",
    lead: "Tezgâhtan kısa bir selam.",
    close: "Filmi kapat",
    play: "Sesle izle",
  },
  en: {
    title: "Gakkocan",
    lead: "A short hello from the stand.",
    close: "Close the film",
    play: "Watch with sound",
  },
} as const;

export function FilmPopup({ lang }: { lang: Locale }) {
  const t = copy[lang];
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  const playWithSound = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.volume = 1;
    try {
      await video.play();
      setPlaying(true);
      setFailed(false);
    } catch {
      setPlaying(false);
    }
  }, []);

  const close = useCallback(() => {
    const video = videoRef.current;
    const box = video?.getBoundingClientRect();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce && box && box.width > 40) {
      window.dispatchEvent(
        new CustomEvent(FILM_HANDOFF_EVENT, {
          detail: {
            x: box.left + box.width * 0.58,
            y: box.top + box.height * 0.28,
            w: box.width * 0.34,
            h: box.height * 0.78,
          },
        }),
      );
    } else {
      window.dispatchEvent(new Event(FILM_ARRIVED_EVENT));
    }
    if (video) video.pause();
    setOpen(false);
    setPlaying(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* yoksay */
    }
    window.dispatchEvent(new Event(FILM_CLOSE_EVENT));
  }, []);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") {
        window.dispatchEvent(new Event(FILM_CLOSE_EVENT));
        return;
      }
    } catch {
      /* depolama kapalıysa yine göster */
    }
    const timer = window.setTimeout(() => setOpen(true), 400);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus({ preventScroll: true });
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) void playWithSound();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, close, playWithSound]);

  if (!open) return null;

  return (
    <div className="gk-film" role="presentation">
      <button type="button" className="gk-film__scrim" aria-label={t.close} onClick={close} />
      <div className="gk-film__card" role="dialog" aria-modal="true" aria-labelledby="gk-film-title">
        <KilimBand height={12} />
        <header className="gk-film__head">
          <div>
            <h2 id="gk-film-title">{t.title}</h2>
            <p>{t.lead}</p>
          </div>
          <button ref={closeRef} type="button" className="gk-film__close" onClick={close} aria-label={t.close}>
            <X size={18} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </header>
        <div className="gk-film__stage">
          <video
            ref={videoRef}
            className="gk-film__video"
            src={SRC}
            poster="/media/gakkooo-poster.jpg"
            playsInline
            preload="auto"
            controls={playing}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={close}
            onError={() => setFailed(true)}
          />
          {!playing ? (
            <button type="button" className="gk-film__play" onClick={() => void playWithSound()}>
              <Play size={18} strokeWidth={2} aria-hidden="true" />
              {failed ? t.play : t.play}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

type HandoffBox = { x: number; y: number; w: number; h: number };

export function FilmHandoff() {
  const [box, setBox] = useState<HandoffBox | null>(null);
  const [gone, setGone] = useState(true);

  useEffect(() => {
    const onHandoff = (event: Event) => {
      const from = (event as CustomEvent<HandoffBox>).detail;
      const slot = document.querySelector(".gk-mascot__slot")?.getBoundingClientRect();
      if (!from || !slot) {
        window.dispatchEvent(new Event(FILM_ARRIVED_EVENT));
        return;
      }
      setGone(false);
      setBox(from);
      window.setTimeout(() => {
        setBox({ x: slot.left, y: slot.top, w: slot.width, h: slot.height });
      }, 40);
      window.setTimeout(() => {
        setGone(true);
        window.dispatchEvent(new Event(FILM_ARRIVED_EVENT));
      }, 980);
    };
    window.addEventListener(FILM_HANDOFF_EVENT, onHandoff);
    return () => window.removeEventListener(FILM_HANDOFF_EVENT, onHandoff);
  }, []);

  if (gone || !box) return null;
  return (
    <img
      className="gk-film-handoff"
      src="/media/gakkocan/mascot.png"
      alt=""
      style={{ left: box.x, top: box.y, width: box.w, height: box.h }}
    />
  );
}
