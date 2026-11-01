"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Camera, Maximize2, Sparkles } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import {
  frameLayout,
  galleryCopy,
  galleryItems,
  type GalleryCategory,
  type GalleryCopy,
  type GalleryItem,
} from "@/content/gallery";
import { KilimBand } from "@/components/ui/KilimBand";
import { AiNote } from "./AiNote";
import { Lightbox } from "./Lightbox";

const EASE = [0.16, 1, 0.3, 1] as const;
const EASE_CSS = "ease-[cubic-bezier(0.16,1,0.3,1)]";

type Filter = "all" | GalleryCategory;
type Cell = { kind: "plate"; item: GalleryItem; index: number } | { kind: "slot" };
type Segment = { kind: "columns"; cols: Cell[][] } | { kind: "slot" } | { kind: "feature"; item: GalleryItem; index: number };

const isWide = (i: GalleryItem) => i.w / i.h > 1.6;

/** Çerçeve yüksekliğine göre iki sütuna dağıtır; ikinci sütun aşağıdan başlar (dağınık duvar hissi). */
function distribute(items: { item: GalleryItem; index: number }[], withSlot: boolean): Cell[][] {
  const cols: Cell[][] = [[], []];
  const heights = [0, 0.2];
  items.forEach(({ item, index }) => {
    const narrow = (frameLayout[item.id]?.size ?? "full") === "narrow";
    const h = (narrow ? 0.84 : 1) * (item.h / item.w) + 0.3;
    const c = heights[0] <= heights[1] ? 0 : 1;
    cols[c].push({ kind: "plate", item, index });
    heights[c] += h;
  });
  if (withSlot) cols[heights[0] <= heights[1] ? 0 : 1].push({ kind: "slot" });
  return cols;
}

/** Panoramik kareler iki sütunu böler ve duvarın tam genişliğine yayılır: sergi salonunda ana eser gibi. */
function compose(visible: GalleryItem[]): Segment[] {
  const out: Segment[] = [];
  let buffer: { item: GalleryItem; index: number }[] = [];
  const pending: { item: GalleryItem; index: number }[] = [];
  const flushColumns = () => {
    if (buffer.length) out.push({ kind: "columns", cols: distribute(buffer, false) });
    buffer = [];
  };
  const emitFeature = (f: { item: GalleryItem; index: number }) => out.push({ kind: "feature", ...f });
  visible.forEach((item, index) => {
    if (isWide(item)) {
      if (buffer.length >= 2) {
        flushColumns();
        emitFeature({ item, index });
      } else pending.push({ item, index });
    } else {
      buffer.push({ item, index });
      if (pending.length && buffer.length >= 3) {
        flushColumns();
        emitFeature(pending.shift()!);
      }
    }
  });
  flushColumns();
  pending.forEach(emitFeature);
  out.push({ kind: "slot" });
  return out;
}

function Plate({
  item,
  index,
  align,
  priority,
  feature = false,
  lang,
  copy,
  onOpen,
}: {
  item: GalleryItem;
  index: number;
  align: "left" | "right";
  priority: boolean;
  feature?: boolean;
  lang: Locale;
  copy: GalleryCopy;
  onOpen: (i: number) => void;
}) {
  const reduce = useReducedMotion();
  const layout = frameLayout[item.id] ?? { size: "full", mat: false };
  const narrow = !feature && layout.size === "narrow";
  const category = copy.filters[item.category];
  const caption = item.caption[lang];

  return (
    <figure
      className={`group ${narrow ? `w-[84%] ${align === "right" ? "ml-auto" : "mr-auto"}` : "w-full"}`}
    >
      <motion.div
        initial={reduce ? false : { clipPath: "inset(0 0 100% 0)", opacity: 0.4 }}
        whileInView={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -6% 0px" }}
        transition={{ duration: 1.1, ease: EASE }}
      >
        <button
          type="button"
          onClick={() => onOpen(index)}
          aria-label={`${copy.open}: ${caption}`}
          className={`relative block w-full cursor-zoom-in text-left shadow-warm transition-shadow duration-500 ${EASE_CSS} ${
            layout.mat || feature ? "border border-line bg-cream p-2 md:p-3.5" : ""
          }`}
        >
          <span className="relative block overflow-hidden rounded-[2px]">
            <motion.span
              className="block"
              initial={reduce ? false : { scale: 1.14 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "0px 0px -6% 0px" }}
              transition={{ duration: 1.6, ease: EASE }}
            >
              <Image
                src={item.src}
                alt={item.alt[lang]}
                width={item.w}
                height={item.h}
                sizes={feature ? "(min-width: 1024px) 900px, 100vw" : "(min-width: 1024px) 440px, (min-width: 640px) 45vw, 46vw"}
                priority={priority}
                className={`h-auto w-full transition-transform duration-[900ms] ${EASE_CSS} group-hover:scale-[1.045]`}
              />
            </motion.span>
            <span
              className={`pointer-events-none absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-[3px] bg-bone/90 text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:hidden`}
              aria-hidden="true"
            >
              <Maximize2 className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <span className="pointer-events-none absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-[3px] bg-bone/90 px-1.5 py-0.5 text-[0.68rem] font-medium leading-tight text-ink-2">
              {item.ai && <Sparkles className="h-3 w-3 text-kilim" strokeWidth={1.75} aria-hidden="true" />}
              {item.ai ? copy.aiBadge : copy.realBadge}
            </span>
          </span>
        </button>
      </motion.div>

      <motion.figcaption
        initial={reduce ? false : { opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -6% 0px" }}
        transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
        className="mt-3 flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3"
      >
        <span
          className={`font-display text-[1.05rem] leading-snug transition-colors duration-300 group-hover:text-kilim md:text-lg`}
        >
          {caption}
        </span>
        <span className="shrink-0 text-xs text-ink-2">{category}</span>
      </motion.figcaption>
    </figure>
  );
}

function ReservedSlot({ copy }: { copy: GalleryCopy }) {
  return (
    <div className="relative flex min-h-[15rem] w-full flex-col justify-between gap-8 overflow-hidden rounded-[3px] border border-dashed border-almond/60 bg-cream/60 p-5 pb-9 md:min-h-[18rem] md:p-9 md:pb-12">
      <Camera className="h-7 w-7 text-almond" strokeWidth={1.25} aria-hidden="true" />
      <div>
        <p className="font-display text-2xl leading-tight text-ink md:text-4xl">{copy.slotTitle}</p>
        <p className="mt-3 max-w-[44ch] text-[0.95rem] text-ink-2 md:text-base">{copy.slotText}</p>
      </div>
      <KilimBand height={10} className="absolute inset-x-0 bottom-0 w-full" />
    </div>
  );
}

function ColumnsBlock({
  cols,
  filter,
  lang,
  copy,
  onOpen,
}: {
  cols: Cell[][];
  filter: Filter;
  lang: Locale;
  copy: GalleryCopy;
  onOpen: (i: number) => void;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yLeft = useTransform(scrollYProgress, [0, 1], [36, -64]);
  const yRight = useTransform(scrollYProgress, [0, 1], [-28, 56]);
  return (
    <div ref={ref} className="grid grid-cols-2 items-start gap-x-3 sm:gap-x-6 md:gap-x-8">
      {cols.map((col, ci) => (
        <motion.div
          key={`${filter}-${ci}`}
          style={reduce ? undefined : { y: ci === 0 ? yLeft : yRight }}
          className={`flex flex-col gap-8 md:gap-14 ${ci === 1 ? "pt-10 md:pt-24" : ""}`}
        >
          {col.map((cell, i) =>
            cell.kind === "plate" ? (
              <Plate
                key={cell.item.id}
                item={cell.item}
                index={cell.index}
                align={(ci + i) % 2 === 0 ? "right" : "left"}
                priority={cell.index === 0}
                lang={lang}
                copy={copy}
                onOpen={onOpen}
              />
            ) : null,
          )}
        </motion.div>
      ))}
    </div>
  );
}

export function GalleryExhibit({ lang }: { lang: Locale }) {
  const copy = galleryCopy[lang];
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<number | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? galleryItems : galleryItems.filter((i) => i.category === filter)),
    [filter],
  );
  const segments = useMemo(() => compose(visible), [visible]);

  const counts = useMemo(() => {
    const m: Record<Filter, number> = { all: galleryItems.length, nature: 0, craft: 0, table: 0 };
    galleryItems.forEach((i) => (m[i.category] += 1));
    return m;
  }, []);

  const filterKeys = ["all", "nature", "craft", "table"] as const;

  return (
    <section aria-label={copy.wallLabel} className="bg-bone">
      <div className="container-x grid gap-x-14 gap-y-10 py-14 md:py-20 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] xl:gap-x-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-display text-[1.35rem] leading-snug text-ink md:text-2xl">{copy.curator}</p>

          <div className="mt-8" role="group" aria-label={copy.filterLabel}>
            <div className="flex flex-wrap gap-2">
              {filterKeys.map((k) => {
                const active = filter === k;
                return (
                  <button
                    key={k}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFilter(k)}
                    className={`inline-flex min-h-11 items-center gap-2 rounded-[4px] border px-4 text-[0.95rem] font-medium transition-colors duration-300 ${
                      active
                        ? "border-kilim bg-kilim text-on-kilim"
                        : "border-line text-ink hover:border-almond hover:bg-cream"
                    }`}
                  >
                    {copy.filters[k]}
                    <span className={`text-xs tabular-nums ${active ? "text-on-kilim/80" : "text-ink-2"}`}>
                      {counts[k]}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-sm text-ink-2" role="status" aria-live="polite">
              {copy.count(visible.length)}
            </p>
          </div>

          <AiNote lang={lang} className="mt-8" />
        </div>

        <div className="flex flex-col gap-10 pb-16 md:gap-20 md:pb-24">
          {segments.map((seg, si) =>
            seg.kind === "slot" ? (
              <ReservedSlot key="slot" copy={copy} />
            ) : seg.kind === "columns" ? (
              <ColumnsBlock key={`${filter}-c${si}`} cols={seg.cols} filter={filter} lang={lang} copy={copy} onOpen={setOpen} />
            ) : (
              <Plate
                key={`${filter}-${seg.item.id}`}
                item={seg.item}
                index={seg.index}
                align="left"
                priority={seg.index === 0}
                feature
                lang={lang}
                copy={copy}
                onOpen={setOpen}
              />
            ),
          )}
        </div>
      </div>

      <Lightbox items={visible} index={open} lang={lang} onIndex={setOpen} onClose={() => setOpen(null)} />
    </section>
  );
}
