import type { Metadata } from "next";
import Link from "../components/SafeLink";
import BrandLogo from "../components/BrandLogo";
import PasswordForm from "../components/PasswordForm";
import ThemeToggle from "../components/ThemeToggle";

export const metadata: Metadata = { title: "Reset Your Password | Sikumna Nepal", robots: { index: false, follow: false } };
export default function ForgotPasswordPage() { return <main className="auth-page"><header><Link href="/" aria-label="Sikumna Nepal home"><BrandLogo /></Link><ThemeToggle /></header><section className="auth-card"><span className="ds-badge">Account help</span><h1>Reset Your Password</h1><p>Enter your email and we’ll send secure reset instructions if an account exists.</p><PasswordForm mode="forgot" /></section></main>; }
