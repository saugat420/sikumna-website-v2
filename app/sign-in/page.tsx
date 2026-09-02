import type { Metadata } from "next";
import Link from "../components/SafeLink";
import AuthForm from "../components/AuthForm";
import BrandLogo from "../components/BrandLogo";
import ThemeToggle from "../components/ThemeToggle";
export const metadata: Metadata = { title: "Sign In | Sikumna Nepal", description: "Sign in to continue learning with Sikumna Nepal.", robots: { index: false, follow: false } };
export default function SignInPage() { return <main className="auth-page"><header><Link href="/" aria-label="Sikumna Nepal home"><BrandLogo /></Link><ThemeToggle /></header><section className="auth-card"><span className="ds-badge">Welcome back</span><h1>Welcome Back</h1><p>Sign in to continue learning.</p><AuthForm mode="sign-in" /><small>Development sign-in: device-local prototype only.</small></section></main>; }
