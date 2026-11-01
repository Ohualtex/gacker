import type { ReactNode } from "react";

export function Field({
  name,
  label,
  defaultValue,
  type = "text",
  rows,
  hint,
}: {
  name: string;
  label: string;
  defaultValue?: string | number | null;
  type?: string;
  rows?: number;
  hint?: string;
}) {
  return (
    <label className="ad-field">
      <span>{label}</span>
      {rows ? (
        <textarea name={name} rows={rows} defaultValue={defaultValue ?? ""} />
      ) : (
        <input name={name} type={type} defaultValue={defaultValue ?? ""} />
      )}
      {hint ? <small className="ad-lead">{hint}</small> : null}
    </label>
  );
}

export function Check({ name, label, defaultChecked }: { name: string; label: string; defaultChecked?: boolean }) {
  return (
    <label className="ad-check">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} />
      <span>{label}</span>
    </label>
  );
}

export function Pair({
  nameTr,
  nameEn,
  label,
  defaultTr,
  defaultEn,
  rows = 4,
}: {
  nameTr: string;
  nameEn: string;
  label: string;
  defaultTr?: string;
  defaultEn?: string;
  rows?: number;
}) {
  return (
    <div className="ad-grid two">
      <Field name={nameTr} label={`${label} · TR`} defaultValue={defaultTr} rows={rows} />
      <Field name={nameEn} label={`${label} · EN`} defaultValue={defaultEn} rows={rows} />
    </div>
  );
}

export function Actions({ children }: { children?: ReactNode }) {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <button type="submit" className="ad-btn">
        Kaydet
      </button>
      {children}
    </div>
  );
}
