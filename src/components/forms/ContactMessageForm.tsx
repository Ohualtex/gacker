import { submitContactMessage } from "@/app/actions/requests";
import { issueFormTicket } from "@/lib/bot-guard";
import type { Dictionary } from "@/lib/dictionaries";
import { GuardedForm } from "./GuardedForm";

export function ContactMessageForm({ lang, dict }: { lang: "tr" | "en"; dict: Dictionary }) {
  const t = dict.pages.request;
  const ticket = issueFormTicket();
  return (
    <GuardedForm
      action={submitContactMessage}
      ticket={ticket}
      lang={lang}
      submitLabel={t.messageSubmit}
      success={t.messageSuccess}
    >
      <label className="block">
        <span className="mb-1.5 block text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-almond">
          {t.senderName}
        </span>
        <input name="name" required className="w-full rounded-[3px] border border-line bg-bone px-3 py-2.5" />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-almond">
          {t.email}
        </span>
        <input name="email" type="email" required className="w-full rounded-[3px] border border-line bg-bone px-3 py-2.5" />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-almond">
          {t.message}
        </span>
        <textarea name="message" required rows={5} className="w-full rounded-[3px] border border-line bg-bone px-3 py-2.5" />
      </label>
    </GuardedForm>
  );
}
