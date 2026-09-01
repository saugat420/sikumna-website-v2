import type { Metadata } from "next";
import InnerPageHero from "../components/InnerPageHero";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { Container } from "../components/DesignSystem";
import AccountPreferences from "./AccountPreferences";
export const metadata: Metadata = { title: "My Account | Sikumna Nepal", robots: { index: false, follow: false } };
export default function AccountPage() { return <><SiteHeader /><main><InnerPageHero eyebrow="My Account" title="Your Learning Preferences" description="Manage the updates you want to receive from Sikumna Nepal." /><Container><AccountPreferences /></Container></main><SiteFooter /></>; }
