import type { SessionLearner } from "./profile";

export const demoAuthCookie = "sikumna-demo-user-v1";

export function encodeDemoLearner(learner: SessionLearner) {
  const bytes = new TextEncoder().encode(JSON.stringify(learner));
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary);
}

export function decodeDemoLearner(value?: string): SessionLearner | null {
  if (!value) return null;
  try {
    const bytes = Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
    const learner = JSON.parse(new TextDecoder().decode(bytes)) as Partial<SessionLearner>;
    if (!learner.id || !learner.name || !learner.email) return null;
    return {
      id: learner.id,
      name: learner.name,
      email: learner.email,
      emailVerified: true,
      learningInterest: learner.learningInterest ?? null,
      marketingConsent: learner.marketingConsent ?? false,
    };
  } catch { return null; }
}
