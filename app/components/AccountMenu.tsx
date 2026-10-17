"use client";
import Link from "./SafeLink";
import { UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { authChangeEvent, notifyAuthChange } from "../../lib/auth/client-events";
import type { SessionLearner } from "../../lib/auth/profile";

export default function AccountMenu() {
  const [user, setUser] = useState<SessionLearner | null>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => { const sync = async () => { try { const response = await fetch("/api/auth/me", { cache: "no-store" }); const result = await response.json() as { user: SessionLearner | null }; setUser(result.user); } catch { setUser(null); } }; void sync(); window.addEventListener(authChangeEvent, sync); return () => window.removeEventListener(authChangeEvent, sync); }, []);
  async function signOut() { await fetch("/api/auth/logout", { method: "POST" }); setUser(null); setOpen(false); notifyAuthChange(); window.location.assign("/"); }
  return <div className="account-menu"><button className="profile-button" type="button" aria-label={user ? "Open account menu" : "Sign in or create an account"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>{user ? <span>{user.name.slice(0, 1).toUpperCase()}</span> : <UserRound size={18} />}</button>{open && <div className="account-popover">{user ? <><strong>{user.name}</strong><small>{user.emailVerified ? "Verified learner" : "Email verification pending"}</small><Link href="/account" onClick={() => setOpen(false)}>My Account</Link><Link href="/free-masterclasses" onClick={() => setOpen(false)}>Free Masterclasses</Link><button type="button" onClick={signOut}>Sign Out</button></> : <><Link href="/sign-in" onClick={() => setOpen(false)}>Sign In</Link><Link href="/register" onClick={() => setOpen(false)}>Create Account</Link></>}</div>}</div>;
}
