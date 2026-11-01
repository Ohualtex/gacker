"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Sparkles, X } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { aiPageHref, galleryCopy, type GalleryItem } from "@/content/gallery";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Erişilebilir ışık kutusu. Yerel <dialog> kullanır: odak tuzağı, Esc ve arka plan inertliği tarayıcıdan gelir.
 * Oklar: önceki/sonraki. Mobilde yatay kaydırma. Kapanınca odak tetikleyen düğmeye döner.
 */
export function Lightbox({
  items,
  index,
  lang,
  onIndex,
  onClose,
}: {
  items: GalleryItem[];
  index: number | null;
  lang: Locale;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const c = galleryCopy[lang];
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const start = useRef<{ x: number; y: number } | null>(null);
  const open = index !== null;
  const count = items.length;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      trigger.current = document.activeElement as HTMLElement | null;
      d.showModal();
      document.body.style.overflow = "hidden";
    } else if (!open && d.open) {
      d.close();
    }
    if (!open) {
      document.body.style.overflow = "";
      trigger.current?.focus({ preventScroll: true });
      trigger.current = null;
    }
  }, [open]);

  useEffect(
    () => () => {
      document.body.style.overflow = "";
    },
    [],
  );

  const go = (delta: number) => {
    if (index === null || count < 2) return;
    onIndex((index + delta + count) % count);
  };

  const item = index !== null ? items[index] : null;

  return (
    <dialog
      ref={ref}
      aria-label={c.viewer}
      onClose={onClose}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          go(1);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          go(-1);
        }
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="m-0 h-dvh max-h-none w-dvw max-w-none overflow-hidden bg-[#150d09] p-0 text-[#f3e8d8] backdrop:bg-[#150d09]"
    >
      {item && (
        <div className="flex h-full flex-col px-4 pb-4 pt-3 md:px-10 md:pb-6 md:pt-5">
          <div className="flex items-center justify-between">
            <p className="text-sm tabular-nums text-[#c9b59e]" aria-live="polite">
              {(index ?? 0) + 1} {c.of} {count}
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label={c.close}
              className="grid h-11 w-11 place-items-center rounded-[4px] text-[#f3e8d8] transition-colors hover:bg-white/10"
            >
              <X className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>

          <div className="flex min-h-0 flex-1 items-stretch gap-2 md:gap-6">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={c.prev}
              className="hidden w-12 shrink-0 place-items-center self-center rounded-[4px] py-6 text-[#f3e8d8] transition-colors hover:bg-white/10 md:grid"
            >
              <ChevronLeft className="h-8 w-8" strokeWidth={1.25} aria-hidden="true" />
            </button>

            <motion.figure
              key={item.id}
              initial={reduce ? false : { opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="flex min-h-0 min-w-0 flex-1 flex-col items-center justify-center gap-4"
              style={{ touchAction: "pan-y" }}
              onPointerDown={(e) => {
                start.current = { x: e.clientX, y: e.clientY };
              }}
              onPointerUp={(e) => {
                const s = start.current;
                start.current = null;
                if (!s) return;
                const dx = e.clientX - s.x;
                const dy = e.clientY - s.y;
                if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) go(dx < 0 ? 1 : -1);
              }}
              onPointerCancel={() => {
                start.current = null;
              }}
            >
              <div className="relative flex min-h-0 w-full flex-1 items-center justify-center">
                <Image
                  src={item.src}
                  alt={item.alt[lang]}
                  width={item.w}
                  height={item.h}
                  sizes="100vw"
                  draggable={false}
                  className="h-auto max-h-full w-auto max-w-full select-none rounded-[3px] object-contain shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)]"
                />
              </div>
              <figcaption className="flex max-w-2xl flex-col items-center gap-1.5 text-center">
                <span className="font-display text-xl leading-tight md:text-2xl">{item.caption[lang]}</span>
                <span className="flex flex-wrap items-center justify-center gap-x-2 text-sm text-[#c9b59e]">
                  {item.ai ? (
                    <>
                      <Sparkles className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
                      {c.aiLightbox}
                      <span aria-hidden="true">·</span>
                      <Link
                        href={aiPageHref(lang)}
                        className="underline decoration-[#c9b59e]/50 underline-offset-4 hover:text-[#f3e8d8]"
                      >
                        {c.aiLink}
                      </Link>
                    </>
                  ) : (
                    <>
                      {c.realBadge}
                      {item.credit ? ` · ${item.credit}` : ""}
                    </>
                  )}
                </span>
              </figcaption>
            </motion.figure>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label={c.next}
              className="hidden w-12 shrink-0 place-items-center self-center rounded-[4px] py-6 text-[#f3e8d8] transition-colors hover:bg-white/10 md:grid"
            >
              <ChevronRight className="h-8 w-8" strokeWidth={1.25} aria-hidden="true" />
            </button>
          </div>

          <div className="mt-3 flex justify-center gap-3 md:hidden">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={c.prev}
              className="grid h-12 w-14 place-items-center rounded-[4px] border border-white/15 text-[#f3e8d8] active:bg-white/10"
            >
              <ChevronLeft className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={c.next}
              className="grid h-12 w-14 place-items-center rounded-[4px] border border-white/15 text-[#f3e8d8] active:bg-white/10"
            >
              <ChevronRight className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}
