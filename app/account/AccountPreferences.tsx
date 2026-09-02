"use client";
import { useEffect, useState } from "react";
import Link from "../components/SafeLink";
import { mockAuthProvider } from "../../lib/auth/mock-auth-provider";
import type { AuthUser } from "../../lib/auth/types";

export default function AccountPreferences() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [saved, setSaved] = useState(false);
  useEffect(() => { queueMicrotask(() => setUser(mockAuthProvider.getCurrentUser())); }, []);
  if (!user) return <div className="empty-state"><p>Sign in to manage your account preferences.</p><Link className="ds-button ds-button-primary ds-button-md" href="/sign-in?next=/account">Sign In</Link></div>;
  return <form className="preferences-card" onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); const updated = mockAuthProvider.updatePreferences({ replies: data.get("replies") === "on", newMasterclasses: data.get("classes") === "on" }); setUser(updated); setSaved(true); }}><div className="account-identity"><span>{user.name.slice(0, 1).toUpperCase()}</span><div><h2>{user.name}</h2><p>{user.email}</p></div></div><h2>Notification Preferences</h2><label className="check-row"><input name="replies" type="checkbox" defaultChecked={user.preferences.replies} /> Reply notifications</label><label className="check-row"><input name="classes" type="checkbox" defaultChecked={user.preferences.newMasterclasses} /> New free masterclass notifications</label><button className="ds-button ds-button-primary ds-button-md" type="submit">Save Preferences</button><p aria-live="polite">{saved ? "Preferences saved on this device." : ""}</p></form>;
}
