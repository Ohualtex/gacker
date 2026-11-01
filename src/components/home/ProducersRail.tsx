"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

/** Yatay editoryal kaydırıcı: scroll-snap + önceki/sonraki düğmeleri. */
export function ProducersRail({
  children,
  prevLabel,
  nextLabel,
  showControls,
}: {
  children: ReactNode;
  prevLabel: string;
  nextLabel: string;
  showControls: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () =>
      setEdge({
        start: el.scrollLeft < 8,
        end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8,
      });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const go = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const step = Math.min(el.clientWidth * 0.8, 520);
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const btn =
    "grid h-12 w-12 place-items-center rounded-full border border-line text-ink transition-[transform,background-color,opacity] duration-300 hover:-translate-y-0.5 hover:bg-cream active:scale-95 disabled:pointer-events-none disabled:opacity-30";

  return (
    <div>
      {showControls && (
        <div className="container-x mb-6 flex justify-end gap-3">
          <button type="button" aria-label={prevLabel} className={btn} disabled={edge.start} onClick={() => go(-1)}>
            <ArrowLeft className="h-5 w-5" strokeWidth={1.75} />
          </button>
          <button type="button" aria-label={nextLabel} className={btn} disabled={edge.end} onClick={() => go(1)}>
            <ArrowRight className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>
      )}
      <div
        ref={ref}
        tabIndex={0}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-10 pt-4 [scroll-padding-inline:max(1.25rem,calc((100vw-78rem)/2))] md:gap-8"
        style={{ paddingInline: "max(1.25rem, calc((100vw - 78rem) / 2))" }}
      >
        {children}
      </div>
    </div>
  );
}
