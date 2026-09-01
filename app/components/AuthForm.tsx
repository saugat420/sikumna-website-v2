"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { mockAuthProvider } from "../../lib/auth/mock-auth-provider";

export default function AuthForm({ mode }: { mode: "register" | "sign-in" }) {
  const router = useRouter(); const search = useSearchParams(); const [error, setError] = useState("");
  const next = search.get("next")?.startsWith("/") ? search.get("next")! : "/free-masterclasses";
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); const data = new FormData(event.currentTarget);
    const email = String(data.get("email") || ""); const password = String(data.get("password") || "");
    if (mode === "register") { const name = String(data.get("name") || ""); const confirm = String(data.get("confirm") || ""); if (password !== confirm) { setError("Passwords do not match."); return; } mockAuthProvider.register({ name, email, password, preferences: { replies: data.get("replies") === "on", newMasterclasses: data.get("updates") === "on" } }); }
    else mockAuthProvider.signIn({ email, password });
    router.push(next);
  }
  return <form className="auth-form" onSubmit={submit}>{mode === "register" && <label>Full Name<input name="name" autoComplete="name" required /></label>}<label>Email Address<input name="email" type="email" autoComplete="email" required /></label><label>Password<input name="password" type="password" autoComplete={mode === "register" ? "new-password" : "current-password"} minLength={8} required /></label>{mode === "register" && <><label>Confirm Password<input name="confirm" type="password" autoComplete="new-password" minLength={8} required /></label><label className="check-row"><input name="updates" type="checkbox" defaultChecked /> Notify me about new free masterclasses.</label><label className="check-row"><input name="replies" type="checkbox" defaultChecked /> Email me when someone replies to my comment.</label></>}{mode === "sign-in" && <div className="auth-options"><label className="check-row"><input name="remember" type="checkbox" defaultChecked /> Remember me</label><span>Forgot password support is coming soon.</span></div>}<button className="ds-button ds-button-primary ds-button-lg" type="submit">{mode === "register" ? "Create Free Account" : "Sign In"}</button><p className="form-error" role="alert">{error}</p><p>{mode === "register" ? <>Already have an account? <Link href={`/sign-in?next=${encodeURIComponent(next)}`}>Sign In</Link></> : <>New to Sikumna? <Link href={`/register?next=${encodeURIComponent(next)}`}>Create Free Account</Link></>}</p></form>;
}
