"use client";
import Link from "next/link";
import { UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { authChangeEvent, mockAuthProvider } from "../../lib/auth/mock-auth-provider";
import type { AuthUser } from "../../lib/auth/types";

export default function AccountMenu() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => { const sync = () => setUser(mockAuthProvider.getCurrentUser()); sync(); window.addEventListener(authChangeEvent, sync); return () => window.removeEventListener(authChangeEvent, sync); }, []);
  return <div className="account-menu"><button className="profile-button" type="button" aria-label={user ? "Open account menu" : "Sign in or create an account"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>{user ? <span>{user.name.slice(0, 1).toUpperCase()}</span> : <UserRound size={18} />}</button>{open && <div className="account-popover">{user ? <><strong>{user.name}</strong><Link href="/account" onClick={() => setOpen(false)}>My Account</Link><Link href="/free-masterclasses" onClick={() => setOpen(false)}>Free Masterclasses</Link><button type="button" onClick={() => { mockAuthProvider.signOut(); setOpen(false); }}>Sign Out</button></> : <><Link href="/sign-in" onClick={() => setOpen(false)}>Sign In</Link><Link href="/register" onClick={() => setOpen(false)}>Create Account</Link></>}</div>}</div>;
}
