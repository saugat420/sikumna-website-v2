"use client";
import Link from "./SafeLink";
import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export default function AuthForm({ mode }: { mode: "register" | "sign-in" }) {
  const search = useSearchParams();
  const [error, setError] = useState(search.get("error") || "");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState("");
  const next = search.get("next")?.startsWith("/") ? search.get("next")! : "/free-masterclasses";
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setMessage("");
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") || "").trim();
    const password = String(data.get("password") || "");
    const confirm = String(data.get("confirm") || "");
    if (mode === "register" && password !== confirm) { setError("Passwords do not match."); return; }
    setLoading(true);
    try {
      const payload = mode === "register"
        ? { fullName: String(data.get("fullName") || ""), email, password, learningInterest: String(data.get("learningInterest") || ""), marketingConsent: data.get("marketingConsent") === "on", acceptTerms: data.get("acceptTerms") === "on", next }
        : { email, password, next };
      const response = await fetch(`/api/auth/${mode === "register" ? "register" : "login"}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json() as { error?: string; needsVerification?: boolean; message?: string };
      if (!response.ok) { setError(result.error || "Please try again."); if (result.needsVerification) setVerificationEmail(email); return; }
      if (mode === "register" && result.needsVerification) { setVerificationEmail(email); setMessage(result.message || "Check your email to verify your account."); event.currentTarget.reset(); return; }
      window.location.assign(next);
    } catch { setError("We couldn’t connect to the account service. Please check your connection and try again."); }
    finally { setLoading(false); }
  }
  async function resend() {
    if (!verificationEmail) return;
    setLoading(true); setError("");
    try { const response = await fetch("/api/auth/resend", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: verificationEmail, next }) }); const result = await response.json() as { message?: string; error?: string }; if (response.ok) setMessage(result.message || "Verification email sent."); else setError(result.error || "Please try again."); }
    catch { setError("We couldn’t resend the email. Please try again."); }
    finally { setLoading(false); }
  }
  return <form className="auth-form" onSubmit={submit}>
    {mode === "register" && <><label>Full Name<input name="fullName" autoComplete="name" minLength={2} maxLength={100} required /></label><label>Learning Interest <span>(optional)</span><select name="learningInterest" defaultValue=""><option value="">Choose a topic</option>{["AI & Digital Marketing", "Freelancing", "English Communication", "SEO", "Ecommerce", "Personal Branding", "Other"].map((interest) => <option key={interest}>{interest}</option>)}</select></label></>}
    <label>Email Address<input name="email" type="email" autoComplete="email" required /></label>
    <label>Password<input name="password" type="password" autoComplete={mode === "register" ? "new-password" : "current-password"} minLength={8} required /></label>
    {mode === "register" && <><label>Confirm Password<input name="confirm" type="password" autoComplete="new-password" minLength={8} required /></label><label className="check-row required-consent"><input name="acceptTerms" type="checkbox" required /><span>I agree to the <Link href="/terms" target="_blank">Terms of Use</Link> and acknowledge the <Link href="/privacy-policy" target="_blank">Privacy Policy</Link>.</span></label><label className="check-row"><input name="marketingConsent" type="checkbox" /> <span>Send me learning tips and upcoming masterclasses.</span></label></>}
    {mode === "sign-in" && <div className="auth-options"><Link href="/forgot-password">Forgot your password?</Link></div>}
    <button className="ds-button ds-button-primary ds-button-lg" type="submit" disabled={loading}>{loading ? "Please wait…" : mode === "register" ? "Create Free Account" : "Sign In"}</button>
    <p className="form-error" role="alert">{error}</p><p className="form-success" aria-live="polite">{message}</p>
    {verificationEmail && <button className="text-button" type="button" onClick={resend} disabled={loading}>Resend verification email</button>}
    <p>{mode === "register" ? <>Already have an account? <Link href={`/sign-in?next=${encodeURIComponent(next)}`}>Sign In</Link></> : <>New to Sikumna? <Link href={`/register?next=${encodeURIComponent(next)}`}>Create Free Account</Link></>}</p>
  </form>;
}
