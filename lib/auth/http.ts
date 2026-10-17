import { NextResponse } from "next/server";
import { checkRateLimit, requestFingerprint } from "./rate-limit";

export function authRateLimit(request: Request, action: string) {
  const result = checkRateLimit(requestFingerprint(request, action));
  if (result.allowed) return null;
  return NextResponse.json({ error: "Too many attempts. Please wait a few minutes and try again." }, { status: 429, headers: { "retry-after": String(result.retryAfter) } });
}

export function friendlyAuthError(message: string) {
  const value = message.toLowerCase();
  if (value.includes("email not confirmed")) return "Please verify your email before signing in.";
  if (value.includes("invalid login credentials")) return "The email or password is incorrect.";
  if (value.includes("already registered") || value.includes("already exists")) return "An account with this email already exists. Try signing in instead.";
  if (value.includes("password")) return message;
  return "We couldn’t complete that request. Please try again.";
}
