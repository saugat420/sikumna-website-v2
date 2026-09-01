import type { AuthProvider, AuthUser, NotificationPreferences } from "./types";

// DEVELOPMENT AUTH PROVIDER. Device-local only; not secure production authentication.
const STORAGE_KEY = "sikumna-development-user";
const EVENT_NAME = "sikumna-auth-change";

function notify() { window.dispatchEvent(new Event(EVENT_NAME)); }
function save(user: AuthUser | null) {
  if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  else localStorage.removeItem(STORAGE_KEY);
  notify();
}

export const mockAuthProvider: AuthProvider = {
  getCurrentUser() {
    if (typeof window === "undefined") return null;
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") as AuthUser | null; } catch { return null; }
  },
  register({ name, email, preferences }) {
    const user = { id: `dev-${email.toLowerCase()}`, name, email, preferences };
    save(user); return user;
  },
  signIn({ email }) {
    const existing = this.getCurrentUser();
    const user = existing?.email === email ? existing : { id: `dev-${email.toLowerCase()}`, name: email.split("@")[0], email, preferences: { replies: true, newMasterclasses: true } };
    save(user); return user;
  },
  signOut() { save(null); },
  updatePreferences(preferences: NotificationPreferences) {
    const user = this.getCurrentUser(); if (!user) return null;
    const updated = { ...user, preferences }; save(updated); return updated;
  },
};

export const authChangeEvent = EVENT_NAME;
