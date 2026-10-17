import { NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase/server";
import { authRateLimit } from "../../../../lib/auth/http";

export async function POST(request: Request) {
  const limited = authRateLimit(request, "forgot-password"); if (limited) return limited;
  const body = await request.json().catch(() => ({})) as Record<string, unknown>;
  const email = String(body.email || "").trim().toLowerCase();
  if (!/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  try {
    const supabase = await createClient();
    const origin = new URL(request.url).origin;
    await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${origin}/auth/callback?next=/reset-password` });
    return NextResponse.json({ ok: true, message: "If an account exists for that email, password reset instructions are on the way." });
  } catch { return NextResponse.json({ error: "Password reset is not configured yet." }, { status: 503 }); }
}
