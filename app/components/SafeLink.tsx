import type { AnchorHTMLAttributes, ReactNode } from "react";

type SafeLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children: ReactNode;
};

/**
 * Production-safe internal navigation.
 *
 * The current hosted vinext link runtime throws during client navigation.
 * Native anchors preserve accessibility and work without client JavaScript.
 */
export default function SafeLink({ href, children, ...props }: SafeLinkProps) {
  return <a href={href} {...props}>{children}</a>;
}
