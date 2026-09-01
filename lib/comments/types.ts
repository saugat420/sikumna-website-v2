export type CommentRecord = { id: string; masterclassSlug: string; authorId: string; authorName: string; body: string; createdAt: string; parentId?: string };
export interface CommentRepository { list(slug: string): CommentRecord[]; create(comment: Omit<CommentRecord, "id" | "createdAt">): CommentRecord; remove(id: string, authorId: string): void; }
export interface NotificationService { commentCreated(comment: CommentRecord): void; commentReplied(comment: CommentRecord, parent: CommentRecord): void; }
export interface EmailNotificationService { sendReplyNotification(input: { recipientUserId: string; masterclassSlug: string; replyId: string }): Promise<void>; }
