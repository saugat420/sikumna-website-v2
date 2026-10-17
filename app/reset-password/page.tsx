import type { Metadata } from "next";
import Link from "../components/SafeLink";
import BrandLogo from "../components/BrandLogo";
import PasswordForm from "../components/PasswordForm";
import ThemeToggle from "../components/ThemeToggle";

export const metadata: Metadata = { title: "Choose a New Password | Sikumna Nepal", robots: { index: false, follow: false } };
export default function ResetPasswordPage() { return <main className="auth-page"><header><Link href="/" aria-label="Sikumna Nepal home"><BrandLogo /></Link><ThemeToggle /></header><section className="auth-card"><span className="ds-badge">Secure recovery</span><h1>Choose a New Password</h1><p>Use at least eight characters for your new password.</p><PasswordForm mode="reset" /></section></main>; }
