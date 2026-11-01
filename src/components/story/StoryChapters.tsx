"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ImageSlot } from "@/components/ui/ImageSlot";
import type { Chapter, StoryContent } from "@/content/story";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

function ChapterVisual({ chapter, className = "" }: { chapter: Chapter; className?: string }) {
  if (chapter.image) {
    return (
      <div className={`relative h-full w-full overflow-hidden bg-cream ${className}`}>
        <Image
          src={chapter.image}
          alt={chapter.slotLabel}
          fill
          sizes="(min-width: 1024px) 42vw, 100vw"
          className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
      </div>
    );
  }
  return (
    <ImageSlot
      label={chapter.slotLabel}
      hint=""
      motif={chapter.motif}
      className={`h-full !aspect-auto rounded-none ${className}`}
    />
  );
}

/**
 * Hikâyenin imza anı: kaydırdıkça solda sabit duran görsel alanı, bölüm değişince
 * alttan yukarı açılan bir perdeyle yeni sahneye geçer. Dar ekranda her bölüm kendi görseliyle akar.
 */
export function StoryChapters({ content }: { content: StoryContent }) {
  const { chapters } = content;
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);
  const reduce = useReducedMotion();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.index);
            if (!Number.isNaN(i)) setActive(i);
          }
        }
      },
      { rootMargin: "-42% 0px -42% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      aria-label={content.chaptersLabel}
      className="container-x grid grid-cols-[minmax(0,1fr)] gap-x-16 py-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:py-20"
    >
      <div className="relative hidden lg:block">
        <div className="sticky top-28">
          <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-[4px] shadow-warm">
            {chapters.map((c, i) => {
              const isActive = i === active;
              return (
                <motion.div
                  key={c.id}
                  className="absolute inset-0"
                  style={{ zIndex: isActive ? 2 : 1 }}
                  initial={false}
                  animate={{
                    clipPath: isActive ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
                    scale: isActive && !reduce ? 1 : 1.04,
                  }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : isActive
                        ? { duration: 1.05, ease: EASE_OUT_EXPO }
                        : { duration: 0, delay: 1.05 }
                  }
                  aria-hidden={!isActive}
                >
                  <ChapterVisual chapter={c} className="h-full !aspect-auto rounded-none" />
                </motion.div>
              );
            })}
          </div>
          <div className="mt-5 flex gap-2" aria-hidden="true">
            {chapters.map((c, i) => (
              <span
                key={c.id}
                className={`h-[3px] rounded-full transition-[flex-grow,background-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  i === active ? "flex-[3] bg-kilim" : "flex-1 bg-line"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div>
        {chapters.map((c, i) => (
          <article
            key={c.id}
            id={c.id}
            data-index={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className="flex flex-col justify-center gap-8 py-12 lg:min-h-[88svh] lg:py-24"
          >
            <div className="group overflow-hidden rounded-[4px] lg:hidden">
              <div className="relative aspect-[4/3]">
                <ChapterVisual chapter={c} />
              </div>
            </div>
            <motion.div
              animate={{ opacity: i === active ? 1 : 0.42 }}
              transition={{ duration: reduce ? 0 : 0.7, ease: EASE_OUT_EXPO }}
              className="max-lg:!opacity-100"
            >
              <h2 className="text-[clamp(2rem,4.2vw,3.5rem)]">{c.title}</h2>
              <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-ink-2 lg:text-xl">
                {c.body}
              </p>
            </motion.div>
          </article>
        ))}
      </div>
    </section>
  );
}
