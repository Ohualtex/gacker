import { submitProducerRequest } from "@/app/actions/requests";
import { issueFormTicket } from "@/lib/bot-guard";
import type { Dictionary } from "@/lib/dictionaries";
import { GuardedForm } from "./GuardedForm";

export function ProducerRequestForm({ lang, dict }: { lang: "tr" | "en"; dict: Dictionary }) {
  const t = dict.pages.request;
  const ticket = issueFormTicket();
  const field = (name: string, label: string, required = false, rows?: number) => (
    <label className="block">
      <span className="mb-1.5 block text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-almond">
        {label}
      </span>
      {rows ? (
        <textarea
          name={name}
          required={required}
          rows={rows}
          className="w-full rounded-[3px] border border-line bg-bone px-3 py-2.5"
        />
      ) : (
        <input
          name={name}
          required={required}
          type={name === "email" ? "email" : "text"}
          className="w-full rounded-[3px] border border-line bg-bone px-3 py-2.5"
        />
      )}
    </label>
  );

  return (
    <GuardedForm
      action={submitProducerRequest}
      ticket={ticket}
      lang={lang}
      submitLabel={t.submit}
      success={t.success}
    >
      {field("name", t.name, true)}
      {field("email", t.email, true)}
      {field("intro", t.intro, true, 4)}
      {field("address", t.address, true, 3)}
      {field("phone", t.phone)}
      {field("website", t.website)}
      {field("socials", t.socials)}
      {field("hours", t.hours)}
      {field("notes", t.notes, false, 3)}
    </GuardedForm>
  );
}
