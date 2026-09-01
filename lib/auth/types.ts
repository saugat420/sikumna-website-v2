export type NotificationPreferences = { replies: boolean; newMasterclasses: boolean };
export type AuthUser = { id: string; name: string; email: string; preferences: NotificationPreferences };
export interface AuthProvider {
  getCurrentUser(): AuthUser | null;
  register(input: { name: string; email: string; password: string; preferences: NotificationPreferences }): AuthUser;
  signIn(input: { email: string; password: string }): AuthUser;
  signOut(): void;
  updatePreferences(preferences: NotificationPreferences): AuthUser | null;
}
