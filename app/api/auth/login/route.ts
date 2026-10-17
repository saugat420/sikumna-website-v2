import { NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase/server";
import { createAdminClient } from "../../../../lib/supabase/admin";
import { authRateLimit, friendlyAuthError } from "../../../../lib/auth/http";
import { safeNextPath } from "../../../../lib/auth/profile";
import { sendWelcomeEmailOnce } from "../../../../lib/email/brevo";

export async function POST(request: Request) {
  const limited = authRateLimit(request, "login"); if (limited) return limited;
  const body = await request.json().catch(() => ({})) as Record<string, unknown>;
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");
  const next = safeNextPath(body.next);
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password, options: { captchaToken: typeof body.captchaToken === "string" ? body.captchaToken : undefined } });
    if (error) return NextResponse.json({ error: friendlyAuthError(error.message), needsVerification: error.message.toLowerCase().includes("confirm") }, { status: 401 });
    if (!data.user.email_confirmed_at) {
      await supabase.auth.signOut();
      return NextResponse.json({ error: "Please verify your email before signing in.", needsVerification: true }, { status: 403 });
    }
    try {
      const admin = createAdminClient();
      const { data: profile } = await admin.from("profiles").select("*").eq("id", data.user.id).single();
      if (profile) await sendWelcomeEmailOnce(data.user, profile);
    } catch { /* Welcome email retries must never block account access. */ }
    return NextResponse.json({ ok: true, next });
  } catch {
    return NextResponse.json({ error: "Login is not configured yet. Please try again after the site administrator completes setup." }, { status: 503 });
  }
}
