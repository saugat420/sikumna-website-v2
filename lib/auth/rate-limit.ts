const attempts = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(key: string, limit = 8, windowMs = 10 * 60_000) {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || entry.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfter: 0 };
  }
  if (entry.count >= limit) return { allowed: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  entry.count += 1;
  return { allowed: true, retryAfter: 0 };
}

export function requestFingerprint(request: Request, action: string) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return `${action}:${forwarded || request.headers.get("cf-connecting-ip") || "unknown"}`;
}
