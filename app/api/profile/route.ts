import { NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase/server";
import { createAdminClient } from "../../../lib/supabase/admin";
import { syncMarketingContact } from "../../../lib/email/brevo";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.email) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
    const admin = createAdminClient();
    const { data, error } = await admin.from("profiles").select("full_name,learning_interest,marketing_consent,marketing_consent_at,created_at,signup_source").eq("id", user.id).single();
    if (error) return NextResponse.json({ error: "Your profile could not be loaded." }, { status: 500 });
    return NextResponse.json({ profile: { ...data, email: user.email, emailVerified: Boolean(user.email_confirmed_at) } });
  } catch { return NextResponse.json({ error: "Profile access is not configured yet." }, { status: 503 }); }
}

export async function PATCH(request: Request) {
  const body = await request.json().catch(() => ({})) as Record<string, unknown>;
  const learningInterest = String(body.learningInterest || "").trim().slice(0, 100) || null;
  const marketingConsent = body.marketingConsent === true;
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.email) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
    const admin = createAdminClient();
    const update = { learning_interest: learningInterest, marketing_consent: marketingConsent, marketing_consent_at: marketingConsent ? new Date().toISOString() : null };
    const { data: profile, error } = await admin.from("profiles").update(update).eq("id", user.id).select("full_name,learning_interest,marketing_consent").single();
    if (error || !profile) return NextResponse.json({ error: "Your preferences could not be saved." }, { status: 500 });
    try { await syncMarketingContact(user.email, profile); } catch { /* Consent is saved even if provider sync retries later. */ }
    return NextResponse.json({ ok: true, profile });
  } catch { return NextResponse.json({ error: "Profile updates are not configured yet." }, { status: 503 }); }
}
