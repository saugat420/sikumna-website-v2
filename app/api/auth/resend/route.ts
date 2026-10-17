import { NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase/server";
import { authRateLimit } from "../../../../lib/auth/http";
import { safeNextPath } from "../../../../lib/auth/profile";

export async function POST(request: Request) {
  const limited = authRateLimit(request, "resend"); if (limited) return limited;
  const body = await request.json().catch(() => ({})) as Record<string, unknown>;
  const email = String(body.email || "").trim().toLowerCase();
  const next = safeNextPath(body.next);
  if (!/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ error: "Enter the email address you registered with." }, { status: 400 });
  try {
    const supabase = await createClient();
    const origin = new URL(request.url).origin;
    const { error } = await supabase.auth.resend({ type: "signup", email, options: { emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}`, captchaToken: typeof body.captchaToken === "string" ? body.captchaToken : undefined } });
    if (error) return NextResponse.json({ error: "We couldn’t resend the email yet. Please wait a moment and try again." }, { status: 400 });
    return NextResponse.json({ ok: true, message: "A new verification email has been sent." });
  } catch { return NextResponse.json({ error: "Email verification is not configured yet." }, { status: 503 }); }
}
