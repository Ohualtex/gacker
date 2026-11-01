"use client";

import { Printer } from "lucide-react";

export function PrintButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-[3px] border border-line px-3 py-1.5 text-sm font-semibold text-ink-2 transition-colors hover:border-ink-2 hover:text-ink print:hidden"
    >
      <Printer className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
      {label}
    </button>
  );
}
