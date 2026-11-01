"use client";

import { motion, useReducedMotion } from "motion/react";
import { MessageCircle } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { assistant as copy } from "@/content/home";
import { KilimBand } from "@/components/ui/KilimBand";
import { EXPO } from "./motion";

/** Sohbeti açan tek şey global bir olaydır; pencere başka bir bileşende yaşar. */
export function AssistantCta({ lang }: { lang: Locale }) {
  const reduce = useReducedMotion();
  const open = () => window.dispatchEvent(new CustomEvent("gk-assistant:open"));
  return (
    <section className="bg-bone pb-44 pt-6 md:pb-52">
      <div className="container-x">
        <motion.div
          className="relative overflow-hidden rounded-[4px] bg-cream shadow-warm"
          initial={reduce ? false : { opacity: 0, scale: 0.96, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: EXPO }}
        >
          <motion.div
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.6, delay: 0.3, ease: EXPO }}
          >
            <KilimBand height={20} />
          </motion.div>
          <svg
            aria-hidden="true"
            viewBox="0 0 400 400"
            className="pointer-events-none absolute -right-24 top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 opacity-[0.16]"
            fill="none"
            stroke="var(--kilim)"
            strokeWidth="1.5"
          >
            {[190, 150, 110, 70].map((r) => (
              <path key={r} d={`M200 ${200 - r}L${200 + r} 200L200 ${200 + r}L${200 - r} 200Z`} />
            ))}
            <path d="M200 176 224 200 200 224 176 200Z" fill="var(--saffron)" stroke="none" />
          </svg>
          <div className="relative grid items-center gap-8 px-7 py-14 md:grid-cols-12 md:px-14 md:py-20">
            <h2 className="text-[clamp(3rem,8.4vw,7.2rem)] leading-[0.96] md:col-span-7">{copy.title[lang]}</h2>
            <div className="md:col-span-5">
              <p className="max-w-[38ch] text-[1.1rem] text-ink-2">{copy.body[lang]}</p>
              <ul className="mt-6 max-w-[34rem] divide-y divide-line border-y border-line">
                {copy.examples[lang].map((q) => (
                  <li key={q} className="flex items-center gap-3 py-3 font-display text-[1.08rem] leading-snug text-ink">
                    <span aria-hidden="true" className="inline-block h-2 w-2 shrink-0 rotate-45 bg-saffron" />
                    {q}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={open}
                className="mt-8 inline-flex items-center gap-3 rounded-[3px] bg-kilim px-7 py-4 text-[0.98rem] font-semibold text-[var(--on-kilim)] shadow-warm transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.97]"
              >
                <MessageCircle className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                {copy.button[lang]}
              </button>
            </div>
          </div>
          <motion.div
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.6, delay: 0.45, ease: EXPO }}
          >
            <KilimBand height={20} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
