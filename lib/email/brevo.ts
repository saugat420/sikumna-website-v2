import type { User } from "@supabase/supabase-js";
import { createAdminClient } from "../supabase/admin";
import type { LearnerProfile } from "../auth/profile";

const BREVO_API = "https://api.brevo.com/v3";

async function brevoRequest(path: string, init: RequestInit) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) throw new Error("BREVO_API_KEY is not configured.");
  const response = await fetch(`${BREVO_API}${path}`, {
    ...init,
    headers: { "api-key": apiKey, "content-type": "application/json", accept: "application/json", ...init.headers },
  });
  if (!response.ok) throw new Error(`Brevo request failed with status ${response.status}.`);
  return response;
}

export async function syncMarketingContact(email: string, profile: Pick<LearnerProfile, "full_name" | "learning_interest" | "marketing_consent">) {
  if (!process.env.BREVO_API_KEY) return;
  await brevoRequest("/contacts", {
    method: "POST",
    body: JSON.stringify({
      email,
      attributes: { FIRSTNAME: profile.full_name.split(/\s+/)[0], FULL_NAME: profile.full_name, LEARNING_INTEREST: profile.learning_interest ?? "" },
      emailBlacklisted: !profile.marketing_consent,
      updateEnabled: true,
    }),
  });
}

export async function sendWelcomeEmailOnce(user: User, profile: LearnerProfile) {
  if (!user.email || !user.email_confirmed_at || !process.env.BREVO_API_KEY) return;
  const admin = createAdminClient();
  const { data: claimed, error: claimError } = await admin.rpc("claim_welcome_email", { target_user: user.id });
  if (claimError || !claimed || (Array.isArray(claimed) && claimed.length === 0)) return;

  const firstName = profile.full_name.trim().split(/\s+/)[0] || "Learner";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  try {
    await brevoRequest("/smtp/email", {
      method: "POST",
      headers: { idempotencyKey: user.id },
      body: JSON.stringify({
        sender: { name: process.env.BREVO_SENDER_NAME || "Sikumna Nepal", email: process.env.BREVO_SENDER_EMAIL },
        to: [{ email: user.email, name: profile.full_name }],
        subject: "Welcome to Sikumna — your free learning starts here",
        htmlContent: `<div style="font-family:Arial,sans-serif;line-height:1.7;color:#172033;max-width:600px;margin:auto"><h1 style="font-size:26px">Welcome to Sikumna!</h1><p>Hi ${escapeHtml(firstName)},</p><p>Your free learning account is ready.</p><p>Explore practical masterclasses in AI marketing, freelancing, English communication and more. Start with a topic you’re interested in and learn at your own pace.</p><p><a href="${siteUrl}/free-masterclasses" style="display:inline-block;padding:13px 20px;background:#0c66e4;color:#fff;text-decoration:none;border-radius:8px;font-weight:700">Start Learning</a></p><p>— Team Sikumna</p></div>`,
      }),
    });
    await admin.from("profiles").update({ welcome_email_status: "sent", welcome_email_sent_at: new Date().toISOString(), welcome_email_last_error: null }).eq("id", user.id);
  } catch (error) {
    await admin.from("profiles").update({ welcome_email_status: "failed", welcome_email_last_error: error instanceof Error ? error.message.slice(0, 500) : "Unknown provider error" }).eq("id", user.id);
    throw error;
  }

  if (profile.marketing_consent) {
    try { await syncMarketingContact(user.email, profile); }
    catch { /* A marketing-contact sync failure must not turn a delivered welcome email into a retry. */ }
  }
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]!);
}
