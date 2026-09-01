import type { Metadata } from "next";
import { headers } from "next/headers";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const base = new URL(`${protocol}://${host}`);
  const title = "Sikumna Nepal | Learn Skills That Matter";
  const description = "Live mentorship, workshops and expert-led programs for practical, real-life growth.";
  const socialImage = new URL("/og.png", base).toString();
  return {
    metadataBase: base,
    title,
    description,
    alternates: { canonical: base },
    icons: { icon: "/sikumna-logo.png", shortcut: "/sikumna-logo.png" },
    openGraph: { title, description, type: "website", images: [{ url: socialImage, width: 1200, height: 630, alt: "Sikumna Nepal — Learn skills that matter in real life." }] },
    twitter: { card: "summary_large_image", title, description, images: [socialImage] },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: `(function(){try{var saved=localStorage.getItem('sikumna-theme');var theme=saved==='light'?'light':'dark';var root=document.documentElement;root.classList.toggle('dark',theme==='dark');root.style.colorScheme=theme;root.dataset.theme=theme;}catch(e){document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark';}})();` }} /></head>
      <body className={`${manrope.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
