"use client";

import { useState } from "react";

/** Tanıtım videosu: yüklenince sahnenin üstünde yumuşakça belirir; dosya yoksa sahne görünür kalır. */
export function HeroVideo({ label, sources }: { label: string; sources: { src: string; type: string }[] }) {
  const [ready, setReady] = useState(false);
  return (
    <video
      className="absolute inset-0 -z-20 h-full w-full object-cover"
      style={{ opacity: ready ? 1 : 0, transition: "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1)" }}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
      onLoadedData={() => setReady(true)}
      onError={() => setReady(false)}
    >
      {sources.map((s) => (
        <source key={s.src} src={s.src} type={s.type} />
      ))}
    </video>
  );
}
