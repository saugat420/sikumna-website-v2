import { createAdminClient } from "../supabase/admin";
import { createClient } from "../supabase/server";

export async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) return null;
  const admin = createAdminClient();
  const { data: profile } = await admin.from("profiles").select("is_admin").eq("id", user.id).single();
  return profile?.is_admin ? { user, admin } : null;
}
