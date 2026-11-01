"use client";

import { useActionState } from "react";
import type { RequestState } from "@/app/actions/requests";
import type { FormTicket } from "@/lib/bot-guard";

export function GuardedForm({
  action,
  ticket,
  lang,
  children,
  submitLabel,
  success,
}: {
  action: (prev: RequestState, formData: FormData) => Promise<RequestState>;
  ticket: FormTicket;
  lang: "tr" | "en";
  children: React.ReactNode;
  submitLabel: string;
  success: string;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  if (state.ok) {
    return <p className="rounded-[3px] bg-cream p-5 text-ink shadow-warm">{success}</p>;
  }
  return (
    <form action={formAction} className="grid gap-4">
      <input type="hidden" name="lang" value={lang} />
      <input type="hidden" name="issued" value={ticket.issued} />
      <input type="hidden" name="nonce" value={ticket.nonce} />
      <input type="hidden" name="sig" value={ticket.sig} />
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="company_url" tabIndex={-1} autoComplete="off" />
        </label>
        <label>
          Fax
          <input name="fax" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {children}
      {state.error ? <p className="text-kilim">{state.error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="mt-2 inline-flex w-fit rounded-sm bg-kilim px-7 py-3.5 text-[0.95rem] font-semibold text-[var(--on-kilim)] shadow-warm disabled:opacity-60"
      >
        {pending ? (lang === "tr" ? "Gönderiliyor…" : "Sending…") : submitLabel}
      </button>
    </form>
  );
}
