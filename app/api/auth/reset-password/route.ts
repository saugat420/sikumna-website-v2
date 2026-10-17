import { NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase/server";
import { authRateLimit, friendlyAuthError } from "../../../../lib/auth/http";

export async function POST(request: Request) {
  const limited = authRateLimit(request, "reset-password"); if (limited) return limited;
  const body = await request.json().catch(() => ({})) as Record<string, unknown>;
  const password = String(body.password || "");
  if (password.length < 8) return NextResponse.json({ error: "Use at least 8 characters for your new password." }, { status: 400 });
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) return NextResponse.json({ error: friendlyAuthError(error.message) }, { status: 400 });
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: "Password reset is not configured yet." }, { status: 503 }); }
}
