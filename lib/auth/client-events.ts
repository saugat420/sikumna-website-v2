export const authChangeEvent = "sikumna-auth-change";
export function notifyAuthChange() { if (typeof window !== "undefined") window.dispatchEvent(new Event(authChangeEvent)); }
