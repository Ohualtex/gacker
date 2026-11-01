"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { COUNTER, GROUND, PASTEL, STAGE } from "./mascot-config";

/**
 * Şeker dökülme katmanı: ~12 DOM öğesi + küçük el yazımı fizik (yerçekimi, sekme, sürtünme, yuvarlanma).
 * Tek rAF döngüsü, yalnızca hareket varken çalışır; sekme gizlenince tarayıcı rAF'ı zaten durdurur.
 * Konumlar mantıksal sahne birimidir (STAGE); piksel = birim × --s (üst öğede ayarlanır).
 */
export type CandyLayerHandle = {
  spill: (origin: { x: number; y: number }, count?: number, instant?: boolean) => void;
  clear: () => void;
};

type Candy = {
  el: HTMLSpanElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  landY: number;
  settled: boolean;
  fade: number; // 0..1 (1 = kayboluyor)
  dying: boolean;
};

const G = 1250; // birim/sn²
const MAX = 26;

export const CandyLayer = forwardRef<CandyLayerHandle>(function CandyLayer(_props, ref) {
  const host = useRef<HTMLDivElement>(null);
  const candies = useRef<Candy[]>([]);
  const raf = useRef(0);
  const last = useRef(0);
  const scale = useRef(1);

  const place = (c: Candy) => {
    const s = scale.current;
    c.el.style.transform = `translate3d(${(c.x * s).toFixed(1)}px, ${(c.y * s).toFixed(1)}px, 0) translate(-50%, -50%) rotate(${c.rot.toFixed(1)}deg)`;
  };

  const loop = (now: number) => {
    const dt = Math.min((now - last.current) / 1000, 0.04);
    last.current = now;
    let moving = false;
    for (const c of candies.current) {
      if (c.dying) {
        c.fade = Math.min(1, c.fade + dt / 0.5);
        c.el.style.opacity = String(1 - c.fade);
        if (c.fade >= 1) {
          c.el.remove();
          c.settled = true;
        } else moving = true;
        continue;
      }
      if (c.settled) continue;
      moving = true;
      c.vy += G * dt;
      c.x += c.vx * dt;
      c.y += c.vy * dt;
      c.rot += c.vr * dt;
      if (c.y >= c.landY) {
        c.y = c.landY;
        if (c.vy > 70) {
          c.vy = -c.vy * 0.42;
          c.vx *= 0.78;
          c.vr = c.vx * 2.2;
        } else {
          c.vy = 0;
          c.vx *= Math.exp(-5 * dt);
          c.vr *= Math.exp(-5 * dt);
          if (Math.abs(c.vx) < 6) {
            c.vx = 0;
            c.vr = 0;
            c.settled = true;
          }
        }
      }
      place(c);
    }
    candies.current = candies.current.filter((c) => !(c.dying && c.fade >= 1));
    raf.current = moving ? requestAnimationFrame(loop) : 0;
  };

  const kick = () => {
    if (raf.current) return;
    last.current = performance.now();
    raf.current = requestAnimationFrame(loop);
  };

  useImperativeHandle(
    ref,
    () => ({
      spill: (origin, count = 10, instant = false) => {
        const el = host.current;
        if (!el) return;
        scale.current = el.clientWidth / STAGE.w;
        // tavan: eskileri soldur
        const alive = candies.current.filter((c) => !c.dying);
        for (let i = 0; i < alive.length + count - MAX; i++) {
          alive[i].dying = true;
          alive[i].settled = false;
        }
        for (let i = 0; i < count; i++) {
          const span = document.createElement("span");
          span.className = "gk-candy";
          span.style.setProperty("--c", PASTEL[(Math.random() * PASTEL.length) | 0]);
          el.appendChild(span);
          const onCounter = Math.random() < 0.6;
          const landY = onCounter
            ? COUNTER.y0 + Math.random() * (COUNTER.y1 - COUNTER.y0)
            : GROUND.y0 + Math.random() * (GROUND.y1 - GROUND.y0);
          const c: Candy = {
            el: span,
            x: origin.x + (Math.random() - 0.5) * 8,
            y: origin.y + (Math.random() - 0.5) * 6,
            vx: -90 + Math.random() * 300,
            vy: -(300 + Math.random() * 260),
            rot: Math.random() * 360,
            vr: -240 + Math.random() * 480,
            landY,
            settled: false,
            fade: 0,
            dying: false,
          };
          if (instant) {
            c.x = Math.min(COUNTER.x1 - 6, Math.max(COUNTER.x0 + 6, origin.x + 20 + Math.random() * 110));
            c.y = c.landY;
            c.settled = true;
            c.rot = Math.random() * 90 - 45;
          }
          candies.current.push(c);
          place(c);
        }
        kick();
      },
      clear: () => {
        for (const c of candies.current) {
          c.dying = true;
          c.settled = false;
        }
        kick();
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    const el = host.current;
    const list = candies.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      scale.current = el.clientWidth / STAGE.w;
      for (const c of candies.current) place(c);
    });
    ro.observe(el);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf.current);
      raf.current = 0;
      list.forEach((c) => c.el.remove());
      candies.current = [];
    };
  }, []);

  return <div ref={host} className="gk-candies" aria-hidden="true" />;
});
