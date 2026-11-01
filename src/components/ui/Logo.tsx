export function AlmondMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 40" className={className} aria-hidden="true">
      <path
        d="M16 2C9 10 4 19 4 27c0 7 5.4 11 12 11s12-4 12-11c0-8-5-17-12-25Z"
        fill="var(--kilim)"
      />
      <path
        d="M16 7c-4.8 6.4-8 13-8 19.5 0 2.2.7 3.9 1.8 5.1C9.2 24.6 11.6 15 16 7Z"
        fill="var(--saffron)"
        opacity="0.9"
      />
      <path d="M16 14v21" stroke="var(--on-kilim)" strokeWidth="1.2" opacity="0.5" />
    </svg>
  );
}
