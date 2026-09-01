import Image, { type ImageProps } from "next/image";
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

function classes(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={classes("ds-container", className)}>{children}</div>;
}

export function Section({ children, className, id }: { children: ReactNode; className?: string; id?: string }) {
  return <section className={classes("ds-section", className)} id={id}>{children}</section>;
}

export function PageTitle({ children, className, id }: { children: ReactNode; className?: string; id?: string }) {
  return <h1 className={classes("ds-page-title", className)} id={id}>{children}</h1>;
}

export function SectionTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={classes("ds-section-title", className)}>{children}</h2>;
}

export function SectionDescription({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={classes("ds-section-description", className)}>{children}</p>;
}

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={classes("ds-badge", className)}>{children}</span>;
}

export function Card({ children, className, ...props }: HTMLAttributes<HTMLElement> & { children: ReactNode }) {
  return <article className={classes("ds-card", className)} {...props}>{children}</article>;
}

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  ariaLabel?: string;
  onClick?: () => void;
} & Pick<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "disabled">;

export function Button({ children, href, variant = "primary", size = "md", className, ariaLabel, type = "button", onClick, disabled }: ButtonProps) {
  const buttonClass = classes("ds-button", `ds-button-${variant}`, `ds-button-${size}`, className);
  if (href) return <a className={buttonClass} href={href} aria-label={ariaLabel} onClick={onClick}>{children}</a>;
  return <button className={buttonClass} type={type} onClick={onClick} disabled={disabled} aria-label={ariaLabel}>{children}</button>;
}

type ResponsiveImageProps = Omit<ImageProps, "fill"> & {
  fit?: "contain" | "cover";
  fill?: boolean;
};

export function ResponsiveImage({ fit = "contain", className, fill = true, ...props }: ResponsiveImageProps) {
  return <Image {...props} fill={fill} className={classes("ds-responsive-image", `ds-image-${fit}`, className)} />;
}
