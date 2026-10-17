import { NextResponse } from "next/server";
import { getMasterclass } from "../../../../../data/masterclasses";
import { createClient } from "../../../../../lib/supabase/server";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const item = getMasterclass((await params).slug);
  if (!item) return NextResponse.json({ error: "Masterclass not found." }, { status: 404 });
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Create a free account or log in to watch.", code: "AUTH_REQUIRED" }, { status: 401 });
    if (!user.email_confirmed_at) return NextResponse.json({ error: "Verify your email to unlock free videos.", code: "EMAIL_NOT_VERIFIED" }, { status: 403 });
    if (!item.youtubeId) return NextResponse.json({ status: "coming_soon" });
    return NextResponse.json({ status: "ready", provider: "youtube", embedUrl: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(item.youtubeId)}` }, { headers: { "cache-control": "private, no-store" } });
  } catch { return NextResponse.json({ error: "Video access is not configured yet.", code: "NOT_CONFIGURED" }, { status: 503 }); }
}
