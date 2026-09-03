import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const siteUrl = "https://sikumna-nepal.digitalsaugatb.chatgpt.site";
const title = "Sikumna Nepal | Learn Skills That Matter";
const description = "Live mentorship, workshops and expert-led programs for practical, real-life growth.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/sikumna-favicon-v2.png", type: "image/png", sizes: "256x256" }],
    shortcut: "/sikumna-favicon-v2.png",
    apple: [{ url: "/sikumna-apple-touch-icon-v2.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: { title, description, type: "website", images: [{ url: `${siteUrl}/og.png`, width: 1200, height: 630, alt: "Sikumna Nepal — Learn skills that matter in real life." }] },
  twitter: { card: "summary_large_image", title, description, images: [`${siteUrl}/og.png`] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var saved=localStorage.getItem('sikumna-theme-v2');var theme=saved==='light'?'light':'dark';var root=document.documentElement;root.classList.toggle('dark',theme==='dark');root.style.colorScheme=theme;root.dataset.theme=theme;}catch(e){document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark';document.documentElement.dataset.theme='dark';}})();` }} />
        <script type="speculationrules" dangerouslySetInnerHTML={{ __html: JSON.stringify({ prefetch: [{ source: "document", where: { href_matches: "/*" }, eagerness: "moderate" }] }) }} />
      </head>
      <body className={`${manrope.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
