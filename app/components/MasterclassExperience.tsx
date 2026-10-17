"use client";

import Link from "./SafeLink";
import { LockKeyhole, MessageCircle, Play, Send, Trash2 } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import type { Masterclass } from "../../data/masterclasses";
import { authChangeEvent } from "../../lib/auth/client-events";
import type { SessionLearner } from "../../lib/auth/profile";
import { mockCommentRepository, mockNotificationService } from "../../lib/comments/mock-services";
import type { CommentRecord } from "../../lib/comments/types";

type Playback = { state: "idle" | "loading" | "coming-soon" | "ready" | "error"; embedUrl?: string; message?: string };

export default function MasterclassExperience({ masterclass, initialUser }: { masterclass: Pick<Masterclass, "slug" | "title">; initialUser: SessionLearner | null }) {
  const [user, setUser] = useState<SessionLearner | null>(initialUser);
  const [playback, setPlayback] = useState<Playback>({ state: "idle" });
  const [comments, setComments] = useState<CommentRecord[]>([]);
  const [replyTo, setReplyTo] = useState<string>();
  const [verificationMessage, setVerificationMessage] = useState("");

  useEffect(() => {
    const sync = async () => { try { const response = await fetch("/api/auth/me", { cache: "no-store" }); setUser(((await response.json()) as { user: SessionLearner | null }).user); } catch { setUser(null); } };
    queueMicrotask(() => { void sync(); setComments(mockCommentRepository.list(masterclass.slug)); });
    window.addEventListener(authChangeEvent, sync);
    return () => window.removeEventListener(authChangeEvent, sync);
  }, [masterclass.slug]);

  async function loadVideo() {
    setPlayback({ state: "loading" });
    try {
      const response = await fetch(`/api/masterclasses/${masterclass.slug}/playback`, { cache: "no-store" });
      const result = await response.json() as { code?: string; error?: string; status?: "coming_soon" | "ready"; embedUrl?: string };
      if (!response.ok) { if (result.code === "AUTH_REQUIRED") setUser(null); setPlayback({ state: "error", message: result.error }); return; }
      if (result.status === "coming_soon") setPlayback({ state: "coming-soon" });
      else setPlayback({ state: "ready", embedUrl: result.embedUrl });
    } catch { setPlayback({ state: "error", message: "We couldn’t load the video. Please try again." }); }
  }

  async function resendVerification() {
    if (!user?.email) return;
    const next = `/free-masterclasses/${masterclass.slug}`;
    const response = await fetch("/api/auth/resend", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: user.email, next }) });
    const result = await response.json() as { message?: string; error?: string }; setVerificationMessage(result.message || result.error || "Please try again.");
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) return;
    const data = new FormData(event.currentTarget);
    const body = String(data.get("comment") || "").trim();
    if (!body) return;
    const comment = mockCommentRepository.create({ masterclassSlug: masterclass.slug, authorId: user.id, authorName: user.name, body, parentId: replyTo });
    const parent = comments.find((item) => item.id === replyTo);
    if (parent) mockNotificationService.commentReplied(comment, parent);
    else mockNotificationService.commentCreated(comment);
    setComments(mockCommentRepository.list(masterclass.slug));
    setReplyTo(undefined);
    event.currentTarget.reset();
  }

  const next = `/free-masterclasses/${masterclass.slug}`;
  return <>
    <section className="video-shell">
      {!user ? <div className="video-gate">
        <LockKeyhole size={34} /><h2>Create your free account to watch this masterclass.</h2>
        <p>One free Sikumna account unlocks every free masterclass.</p>
        <div><Link className="ds-button ds-button-primary ds-button-lg" href={`/register?next=${encodeURIComponent(next)}`}>Create Free Account</Link><Link className="ds-button ds-button-secondary ds-button-lg" href={`/sign-in?next=${encodeURIComponent(next)}`}>Sign In</Link></div>
      </div> : !user.emailVerified ? <div className="video-gate"><LockKeyhole size={34} /><h2>Verify your email to start learning</h2><p>Open the verification link sent to {user.email}. Verified email is required before videos unlock.</p><div><button className="ds-button ds-button-primary ds-button-lg" type="button" onClick={resendVerification}>Resend Verification Email</button></div><small aria-live="polite">{verificationMessage}</small></div>
      : playback.state === "ready" && playback.embedUrl ? <iframe src={`${playback.embedUrl}?autoplay=1`} title={masterclass.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
      : playback.state === "coming-soon" ? <div className="video-facade video-coming-soon" role="status"><span><Play size={34} aria-hidden="true" /></span><strong>Video coming soon</strong><small>A verified video URL has not been supplied yet. Registered learners will be notified when the recording is available.</small></div>
      : playback.state === "error" ? <div className="video-facade video-coming-soon" role="alert"><LockKeyhole size={30} /><strong>Video unavailable</strong><small>{playback.message}</small><button className="text-button" type="button" onClick={loadVideo}>Try again</button></div>
      : <button className="video-facade" type="button" onClick={loadVideo} disabled={playback.state === "loading"} aria-label={`Play ${masterclass.title}`}><span><Play size={34} fill="currentColor" /></span><strong>{playback.state === "loading" ? "Loading secure playback…" : "Play Masterclass"}</strong><small>Playback information is requested securely after your account is verified.</small></button>}
    </section>
    <section className="discussion">
      <div className="content-heading"><MessageCircle size={24} /><div><h2>Discussion</h2><p>Share what you learned or ask a practical question.</p></div></div>
      {!user ? <div className="discussion-signin"><p>Sign in to join the discussion.</p><Link className="text-link" href={`/sign-in?next=${encodeURIComponent(next)}`}>Sign In</Link></div> : <form className="comment-form" onSubmit={submit}>
        <label htmlFor="comment">{replyTo ? "Write a reply" : "Share your thoughts or ask a question"}</label><textarea id="comment" name="comment" rows={4} required />
        <div>{replyTo && <button type="button" onClick={() => setReplyTo(undefined)}>Cancel reply</button>}<button className="ds-button ds-button-primary ds-button-sm" type="submit">Post Comment <Send size={15} /></button></div>
      </form>}
      <div className="comment-list">{comments.length === 0 ? <p className="empty-state">Be the first to start the discussion.</p> : comments.filter((item) => !item.parentId).map((comment) => <Comment key={comment.id} comment={comment} replies={comments.filter((item) => item.parentId === comment.id)} user={user} onReply={setReplyTo} onDelete={(id) => { if (user) { mockCommentRepository.remove(id, user.id); setComments(mockCommentRepository.list(masterclass.slug)); } }} />)}</div>
    </section>
  </>;
}

function Comment({ comment, replies, user, onReply, onDelete }: { comment: CommentRecord; replies: CommentRecord[]; user: SessionLearner | null; onReply: (id: string) => void; onDelete: (id: string) => void }) {
  return <article className="comment"><span className="comment-avatar">{comment.authorName.slice(0, 1).toUpperCase()}</span><div><div className="comment-meta"><strong>{comment.authorName}</strong><time>{new Date(comment.createdAt).toLocaleDateString()}</time></div><p>{comment.body}</p><div className="comment-actions">{user && <button type="button" onClick={() => onReply(comment.id)}>Reply</button>}{user?.id === comment.authorId && <button type="button" onClick={() => onDelete(comment.id)}><Trash2 size={14} /> Delete</button>}</div>{replies.map((reply) => <article className="comment comment-reply" key={reply.id}><span className="comment-avatar">{reply.authorName.slice(0, 1).toUpperCase()}</span><div><div className="comment-meta"><strong>{reply.authorName}</strong><time>{new Date(reply.createdAt).toLocaleDateString()}</time></div><p>{reply.body}</p></div></article>)}</div></article>;
}
