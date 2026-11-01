"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/actions/auth";

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, null);
  return (
    <form action={action} className="ad-grid">
      <label className="ad-field">
        <span>Kullanıcı</span>
        <input name="user" autoComplete="username" required />
      </label>
      <label className="ad-field">
        <span>Parola</span>
        <input name="password" type="password" autoComplete="current-password" required />
      </label>
      {state?.error ? <p className="ad-error">{state.error}</p> : null}
      <button type="submit" className="ad-btn" disabled={pending}>
        {pending ? "Kapı açılıyor…" : "Giriş yap"}
      </button>
    </form>
  );
}
