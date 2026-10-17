"use client";
import { useEffect, useState } from "react";
import Link from "../components/SafeLink";

type Profile = { full_name: string; email: string; emailVerified: boolean; learning_interest: string | null; marketing_consent: boolean; signup_source: string | null; created_at: string };

export default function AccountPreferences() {
  const [profile, setProfile] = useState<Profile | null>();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => { fetch("/api/profile", { cache: "no-store" }).then(async (response) => response.ok ? setProfile(((await response.json()) as { profile: Profile }).profile) : setProfile(null)).catch(() => setProfile(null)); }, []);
  if (profile === undefined) return <div className="empty-state"><p>Loading your account…</p></div>;
  if (!profile) return <div className="empty-state"><p>Sign in to manage your account preferences.</p><Link className="ds-button ds-button-primary ds-button-md" href="/sign-in?next=/account">Sign In</Link></div>;
  return <form className="preferences-card" onSubmit={async (event) => { event.preventDefault(); setSaved(false); setError(""); const data = new FormData(event.currentTarget); const response = await fetch("/api/profile", { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ learningInterest: data.get("learningInterest"), marketingConsent: data.get("marketingConsent") === "on" }) }); const result = await response.json() as { error?: string; profile?: { learning_interest: string | null; marketing_consent: boolean } }; if (!response.ok || !result.profile) setError(result.error || "Your preferences could not be saved."); else { setProfile((current) => current ? { ...current, learning_interest: result.profile!.learning_interest, marketing_consent: result.profile!.marketing_consent } : current); setSaved(true); } }}><div className="account-identity"><span>{profile.full_name.slice(0, 1).toUpperCase()}</span><div><h2>{profile.full_name}</h2><p>{profile.email}</p><small>{profile.emailVerified ? "Verified learner account" : "Email verification pending"}</small></div></div><h2>Learning Preferences</h2><label>Learning Interest<input name="learningInterest" defaultValue={profile.learning_interest || ""} maxLength={100} /></label><label className="check-row"><input name="marketingConsent" type="checkbox" defaultChecked={profile.marketing_consent} /> <span>Send me learning tips and upcoming masterclasses. Uncheck to unsubscribe.</span></label><button className="ds-button ds-button-primary ds-button-md" type="submit">Save Preferences</button><p className="form-error" role="alert">{error}</p><p className="form-success" aria-live="polite">{saved ? "Preferences saved." : ""}</p></form>;
}
