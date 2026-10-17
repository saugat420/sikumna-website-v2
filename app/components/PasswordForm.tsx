"use client";

import { FormEvent, useState } from "react";
import Link from "./SafeLink";

export default function PasswordForm({ mode }: { mode: "forgot" | "reset" }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setMessage("");
    const data = new FormData(event.currentTarget);
    const password = String(data.get("password") || "");
    if (mode === "reset" && password !== String(data.get("confirm") || "")) { setError("Passwords do not match."); return; }
    setLoading(true);
    try {
      const response = await fetch(`/api/auth/${mode === "forgot" ? "forgot-password" : "reset-password"}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(mode === "forgot" ? { email: data.get("email") } : { password }) });
      const result = await response.json() as { error?: string; message?: string };
      if (!response.ok) setError(result.error || "Please try again.");
      else if (mode === "reset") window.location.assign("/sign-in?password=updated");
      else setMessage(result.message || "Check your email for reset instructions.");
    } catch { setError("We couldn’t connect to the account service. Please try again."); }
    finally { setLoading(false); }
  }
  return <form className="auth-form" onSubmit={submit}>{mode === "forgot" ? <label>Email Address<input name="email" type="email" autoComplete="email" required /></label> : <><label>New Password<input name="password" type="password" autoComplete="new-password" minLength={8} required /></label><label>Confirm New Password<input name="confirm" type="password" autoComplete="new-password" minLength={8} required /></label></>}<button className="ds-button ds-button-primary ds-button-lg" type="submit" disabled={loading}>{loading ? "Please wait…" : mode === "forgot" ? "Send Reset Instructions" : "Update Password"}</button><p className="form-error" role="alert">{error}</p><p className="form-success" aria-live="polite">{message}</p><p><Link href="/sign-in">Back to Sign In</Link></p></form>;
}
