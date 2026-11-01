import type { Locale } from "@/lib/i18n";
import { identifyCopy, identifyItems as staticItems, type IdentifyItem } from "@/data/identify";
import { getIdentifyItems } from "@/lib/cms/queries";
import { Reveal } from "@/components/ui/Reveal";

export async function IdentifyCriteria({ lang, items }: { lang: Locale; items?: IdentifyItem[] }) {
  const copy = identifyCopy[lang];
  const identifyItems = items ?? (await getIdentifyItems()) ?? staticItems;

  return (
    <section className="bg-bone">
      <div className="container-x py-20 md:py-28">
        <Reveal className="max-w-2xl">
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-almond">
            {copy.source}
          </p>
          <h2 className="mt-4 text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.05]">{copy.title}</h2>
          <p className="mt-5 max-w-xl text-lg text-ink-2">{copy.lead}</p>
        </Reveal>
        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {identifyItems.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.08}>
              <li className="flex h-full flex-col rounded-[4px] border border-line bg-cream p-7 shadow-warm">
                <span className="block h-[3px] w-10 bg-kilim" aria-hidden="true" />
                <h3 className="mt-6 text-[1.55rem] leading-[1.15]">{item.title[lang]}</h3>
                <p className="mt-4 text-[1.02rem] leading-relaxed text-ink-2">{item.body[lang]}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
