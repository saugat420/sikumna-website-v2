import { NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase/server";
import { authRateLimit, friendlyAuthError } from "../../../../lib/auth/http";
import { safeNextPath, signupSourceFromNext } from "../../../../lib/auth/profile";

const interests = new Set(["AI & Digital Marketing", "Freelancing", "English Communication", "SEO", "Ecommerce", "Personal Branding", "Other", ""]);

export async function POST(request: Request) {
  const limited = authRateLimit(request, "register"); if (limited) return limited;
  const body = await request.json().catch(() => ({})) as Record<string, unknown>;
  const fullName = String(body.fullName || "").trim().replace(/\s+/g, " ");
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");
  const interest = String(body.learningInterest || "");
  const next = safeNextPath(body.next);
  if (fullName.length < 2 || fullName.length > 100) return NextResponse.json({ error: "Please enter your full name." }, { status: 400 });
  if (!/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  if (password.length < 8) return NextResponse.json({ error: "Use at least 8 characters for your password." }, { status: 400 });
  if (!body.acceptTerms) return NextResponse.json({ error: "You must agree to the Terms of Use and acknowledge the Privacy Policy." }, { status: 400 });
  if (!interests.has(interest)) return NextResponse.json({ error: "Please choose a valid learning interest." }, { status: 400 });

  try {
    const supabase = await createClient();
    const origin = new URL(request.url).origin;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}`,
        captchaToken: typeof body.captchaToken === "string" ? body.captchaToken : undefined,
        data: { full_name: fullName, learning_interest: interest || null, signup_source: signupSourceFromNext(next), marketing_consent: body.marketingConsent === true },
      },
    });
    if (error) return NextResponse.json({ error: friendlyAuthError(error.message) }, { status: 400 });
    return NextResponse.json({ ok: true, needsVerification: !data.session, message: "Check your email to verify your account, then return to your masterclass." });
  } catch {
    return NextResponse.json({ error: "Account registration is not configured yet. Please try again after the site administrator completes setup." }, { status: 503 });
  }
}
