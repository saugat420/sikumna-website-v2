"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { mockAuthProvider } from "../../lib/auth/mock-auth-provider";

export default function MasterclassLink({ slug, className, ariaLabel, children }: { slug: string; className?: string; ariaLabel?: string; children: ReactNode }) {
  const router = useRouter(); const href = `/free-masterclasses/${slug}`;
  return <Link href={href} className={className} aria-label={ariaLabel} onClick={(event) => { if (!mockAuthProvider.getCurrentUser()) { event.preventDefault(); router.push(`/register?next=${encodeURIComponent(href)}`); } }}>{children}</Link>;
}
