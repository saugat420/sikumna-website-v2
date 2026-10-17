import { NextResponse } from "next/server";
import { safeNextPath } from "../../../lib/auth/profile";
import { createClient } from "../../../lib/supabase/server";
import { createAdminClient } from "../../../lib/supabase/admin";
import { sendWelcomeEmailOnce } from "../../../lib/email/brevo";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = safeNextPath(url.searchParams.get("next"));
  if (!code) return NextResponse.redirect(new URL(`/sign-in?error=${encodeURIComponent("This verification link is invalid or has expired.")}&next=${encodeURIComponent(next)}`, url.origin));

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) throw error;
    const { data: { user } } = await supabase.auth.getUser();
    if (user?.email_confirmed_at) {
      try {
        const admin = createAdminClient();
        const { data: profile } = await admin.from("profiles").select("*").eq("id", user.id).single();
        if (profile) await sendWelcomeEmailOnce(user, profile);
      } catch { /* Account verification succeeds even if welcome delivery needs a retry. */ }
    }
    return NextResponse.redirect(new URL(next, url.origin));
  } catch {
    return NextResponse.redirect(new URL(`/sign-in?error=${encodeURIComponent("This verification link is invalid or has expired. Request a new email below.")}&next=${encodeURIComponent(next)}`, url.origin));
  }
}
