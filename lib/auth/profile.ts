export type LearnerProfile = {
  id: string;
  full_name: string;
  learning_interest: string | null;
  signup_source: string | null;
  marketing_consent: boolean;
  marketing_consent_at: string | null;
  created_at: string;
  is_admin: boolean;
  welcome_email_status: "pending" | "sending" | "sent" | "failed";
  welcome_email_sent_at: string | null;
};

export type SessionLearner = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  learningInterest: string | null;
  marketingConsent: boolean;
};

export function safeNextPath(value: unknown, fallback = "/free-masterclasses") {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) return fallback;
  try {
    const url = new URL(value, "https://sikumna.local");
    return url.origin === "https://sikumna.local" ? `${url.pathname}${url.search}${url.hash}` : fallback;
  } catch { return fallback; }
}

export function signupSourceFromNext(next: string) {
  const match = next.match(/^\/free-masterclasses\/([^/?#]+)/);
  return match?.[1] ?? "website";
}
