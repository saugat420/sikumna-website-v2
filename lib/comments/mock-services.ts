import type { CommentRecord, CommentRepository, NotificationService } from "./types";
const KEY = "sikumna-development-comments";
function read(): CommentRecord[] { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; } }
export const mockCommentRepository: CommentRepository = {
  list: (slug) => read().filter((item) => item.masterclassSlug === slug),
  create: (input) => { const comment = { ...input, id: crypto.randomUUID(), createdAt: new Date().toISOString() }; localStorage.setItem(KEY, JSON.stringify([...read(), comment])); return comment; },
  remove: (id, authorId) => localStorage.setItem(KEY, JSON.stringify(read().filter((item) => item.id !== id || item.authorId !== authorId))),
};
// Development event boundary. Replace with server-side persistence and email delivery.
export const mockNotificationService: NotificationService = { commentCreated: () => undefined, commentReplied: () => undefined };
