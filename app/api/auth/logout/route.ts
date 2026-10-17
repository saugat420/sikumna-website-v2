import { NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase/server";
import { demoAuthCookie } from "../../../../lib/auth/demo";

export async function POST() {
  try { const supabase = await createClient(); await supabase.auth.signOut(); }
  catch { /* Clearing an absent/unconfigured session is safe. */ }
  const response = NextResponse.json({ ok: true });
  response.cookies.set(demoAuthCookie, "", { path: "/", maxAge: 0, sameSite: "lax" });
  return response;
}
