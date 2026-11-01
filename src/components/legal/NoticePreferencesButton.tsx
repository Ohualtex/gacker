"use client";

import { NOTICE_OPEN_EVENT } from "./storage";

/** Altbilgide: çerez/bildirim bildirimini yeniden açar. */
export function NoticePreferencesButton({ label, className = "" }: { label: string; className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(NOTICE_OPEN_EVENT))}
      className={className}
    >
      {label}
    </button>
  );
}
