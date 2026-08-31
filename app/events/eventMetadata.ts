import type { Metadata } from "next";
import { headers } from "next/headers";

export async function buildEventMetadata(title: string, description: string, imagePath: string): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const image = new URL(imagePath, `${protocol}://${host}`).toString();
  const pageTitle = `${title} | Sikumna Nepal`;

  return {
    title: pageTitle,
    description,
    openGraph: { title: pageTitle, description, type: "website", images: [{ url: image, width: 1536, height: 1024, alt: title }] },
    twitter: { card: "summary_large_image", title: pageTitle, description, images: [image] },
  };
}
