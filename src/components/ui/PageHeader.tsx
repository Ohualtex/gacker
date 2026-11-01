import { KilimBand } from "./KilimBand";

/** Alt sayfaların üst başlığı: şeffaf navbar altında rahat nefes alır. */
export function PageHeader({ title, lead }: { title: string; lead: string }) {
  return (
    <header className="bg-cream pt-36">
      <div className="container-x pb-16">
        <h1 className="text-[clamp(2.5rem,6vw,4.75rem)]">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-ink-2">{lead}</p>
      </div>
      <KilimBand height={16} />
    </header>
  );
}
