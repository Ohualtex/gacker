"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const KEY = "gk-music";
const SRC = "/audio/harput-zurna.mp3";

/**
 * Arka plan müziği. Tarayıcılar kullanıcı etkileşimi olmadan sesi engeller,
 * bu yüzden varsayılan kapalıdır; kullanıcı açarsa tercih hatırlanır.
 */
export function MusicToggle({
  labels,
  className = "",
}: {
  labels: { on: string; off: string };
  className?: string;
}) {
  const audio = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const el = new Audio(SRC);
    el.loop = true;
    el.volume = 0.35;
    el.preload = "none";
    el.addEventListener("error", () => setAvailable(false));
    audio.current = el;
    return () => {
      el.pause();
      audio.current = null;
    };
  }, []);

  const toggle = async () => {
    const el = audio.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
      localStorage.setItem(KEY, "off");
      return;
    }
    try {
      await el.play();
      setPlaying(true);
      localStorage.setItem(KEY, "on");
    } catch {
      setPlaying(false);
    }
  };

  if (!available) return null;
  const Icon = playing ? Volume2 : VolumeX;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? labels.off : labels.on}
      title={playing ? labels.off : labels.on}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-current/10 ${className}`}
    >
      <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
    </button>
  );
}
