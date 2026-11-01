/** "Örnek içerik" etiketi: düz, sıcak, dikkat çekmeyen ama kaçırılmayan bir işaret. */
export function DemoBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-sm border border-saffron/60 bg-saffron/15 px-2.5 py-1 text-[0.8rem] font-semibold leading-none text-almond">
      {label}
    </span>
  );
}
