"use client";

import { CircleAlert, Play } from "lucide-react";
import { useState } from "react";
import type { Masterclass } from "../../data/masterclasses";

type Playback = { state: "idle" | "loading" | "coming-soon" | "ready" | "error"; embedUrl?: string; message?: string };

export default function MasterclassExperience({ masterclass }: { masterclass: Pick<Masterclass, "slug" | "title"> }) {
  const [playback, setPlayback] = useState<Playback>({ state: "idle" });

  async function loadVideo() {
    setPlayback({ state: "loading" });
    try {
      const response = await fetch(`/api/masterclasses/${masterclass.slug}/playback`, { cache: "no-store" });
      const result = await response.json() as { error?: string; status?: "coming_soon" | "ready"; embedUrl?: string };
      if (!response.ok) { setPlayback({ state: "error", message: result.error }); return; }
      if (result.status === "coming_soon") setPlayback({ state: "coming-soon" });
      else setPlayback({ state: "ready", embedUrl: result.embedUrl });
    } catch { setPlayback({ state: "error", message: "We couldn’t load the video. Please try again." }); }
  }

  return <section className="video-shell">
      {playback.state === "ready" && playback.embedUrl ? <iframe src={`${playback.embedUrl}?autoplay=1`} title={masterclass.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
      : playback.state === "coming-soon" ? <div className="video-facade video-coming-soon" role="status"><span><Play size={34} aria-hidden="true" /></span><strong>Video coming soon</strong><small>A video URL has not been supplied for this masterclass yet.</small></div>
      : playback.state === "error" ? <div className="video-facade video-coming-soon" role="alert"><CircleAlert size={30} /><strong>Video unavailable</strong><small>{playback.message}</small><button className="text-button" type="button" onClick={loadVideo}>Try again</button></div>
      : <button className="video-facade" type="button" onClick={loadVideo} disabled={playback.state === "loading"} aria-label={`Play ${masterclass.title}`}><span><Play size={34} fill="currentColor" /></span><strong>{playback.state === "loading" ? "Loading video…" : "Play Masterclass"}</strong><small>Free to watch—no account or sign-in required.</small></button>}
    </section>;
}
