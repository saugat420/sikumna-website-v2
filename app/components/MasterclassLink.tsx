import Link from "next/link";
import type { ReactNode } from "react";

export default function MasterclassLink({ slug, className, ariaLabel, children }: { slug: string; className?: string; ariaLabel?: string; children: ReactNode }) {
  return <Link href={`/free-masterclasses/${slug}`} className={className} aria-label={ariaLabel}>{children}</Link>;
}
