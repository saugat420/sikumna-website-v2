import type { Metadata } from "next";
import Link from "../components/SafeLink";
import AuthForm from "../components/AuthForm";
import BrandLogo from "../components/BrandLogo";
import ThemeToggle from "../components/ThemeToggle";
export const metadata: Metadata = { title: "Create a Free Account | Sikumna Nepal", description: "Create a free account for Sikumna masterclasses and discussions.", robots: { index: false, follow: false } };
export default function RegisterPage() { return <main className="auth-page"><header><Link href="/" aria-label="Sikumna Nepal home"><BrandLogo /></Link><ThemeToggle /></header><section className="auth-card"><span className="ds-badge">Free learning account</span><h1>Create Your Sikumna Account</h1><p>Create one free account to watch all free masterclasses and join learner discussions.</p><AuthForm mode="register" /><small>Development account: stored only on this device until secure production authentication is selected.</small></section></main>; }
