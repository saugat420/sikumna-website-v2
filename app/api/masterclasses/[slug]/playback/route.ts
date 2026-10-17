import { NextResponse } from "next/server";
import { getMasterclass } from "../../../../../data/masterclasses";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const item = getMasterclass((await params).slug);
  if (!item) return NextResponse.json({ error: "Masterclass not found." }, { status: 404 });
  if (!item.youtubeId) return NextResponse.json({ status: "coming_soon" });
  return NextResponse.json(
    { status: "ready", provider: "youtube", embedUrl: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(item.youtubeId)}` },
    { headers: { "cache-control": "public, max-age=300" } },
  );
}
