import { ExternalLink } from "lucide-react";

export type DiscoverEntry = {
  slug: string;
  title: string;
  description: string;
  source: string;
  sourceHost: string;
  pending: boolean;
};

export type DiscoverListLabels = {
  title: string;
  lead: string;
  foodTitle: string;
  placeTitle: string;
  sourceOpen: string;
  pending: string;
};

function Group({
  title,
  entries,
  labels,
}: {
  title: string;
  entries: DiscoverEntry[];
  labels: DiscoverListLabels;
}) {
  return (
    <section aria-labelledby={`grp-${title}`}>
      <h3 id={`grp-${title}`} className="font-display text-2xl">
        {title}
      </h3>
      <ul className="mt-5 border-t border-line">
        {entries.map((e) => (
          <li key={e.slug} className="border-b border-line py-6">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h4 className="font-display text-xl">{e.title}</h4>
              {e.pending && (
                <span className="text-xs font-semibold text-almond">{labels.pending}</span>
              )}
            </div>
            <p className="mt-2 max-w-[62ch] text-[0.9875rem] text-ink-2">{e.description}</p>
            <a
              href={e.source}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline mt-3 inline-flex items-center gap-1.5 text-sm text-ink-2 hover:text-ink"
            >
              {labels.sourceOpen}: {e.sourceHost}
              <ExternalLink size={14} strokeWidth={1.75} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function DiscoverList({
  food,
  places,
  labels,
}: {
  food: DiscoverEntry[];
  places: DiscoverEntry[];
  labels: DiscoverListLabels;
}) {
  return (
    <div>
      <h2 className="text-[clamp(2rem,4vw,3.25rem)]">{labels.title}</h2>
      <p className="mt-4 max-w-2xl text-lg text-ink-2">{labels.lead}</p>
      <div className="mt-12 grid gap-14 lg:grid-cols-2 lg:gap-16">
        <Group title={labels.foodTitle} entries={food} labels={labels} />
        <Group title={labels.placeTitle} entries={places} labels={labels} />
      </div>
    </div>
  );
}
