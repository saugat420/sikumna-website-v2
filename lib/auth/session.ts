import { createAdminClient } from "../supabase/admin";
import { createClient } from "../supabase/server";
import type { SessionLearner } from "./profile";

export async function getSessionLearner(): Promise<SessionLearner | null> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.email) return null;
    const admin = createAdminClient();
    const { data: profile } = await admin.from("profiles").select("full_name,learning_interest,marketing_consent").eq("id", user.id).single();
    return { id: user.id, name: profile?.full_name || user.user_metadata?.full_name || user.email.split("@")[0], email: user.email, emailVerified: Boolean(user.email_confirmed_at), learningInterest: profile?.learning_interest ?? null, marketingConsent: profile?.marketing_consent ?? false };
  } catch { return null; }
}
