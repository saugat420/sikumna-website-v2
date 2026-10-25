"use client";

import { CircleAlert, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Masterclass } from "../../data/masterclasses";

type Playback = { state: "idle" | "loading" | "coming-soon" | "ready" | "error"; embedUrl?: string; message?: string };
type PlayerStateEvent = { data: number };
type ReadyEvent = { target: YouTubePlayer };
type YouTubePlayer = {
  destroy: () => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  getPlayerState: () => number;
  pauseVideo: () => void;
  playVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
};
type YouTubeApi = {
  Player: new (element: HTMLElement, options: {
    videoId: string;
    host: string;
    playerVars: Record<string, number>;
    events: { onReady: (event: ReadyEvent) => void; onStateChange: (event: PlayerStateEvent) => void };
  }) => YouTubePlayer;
  PlayerState: { PLAYING: number };
};

declare global {
  interface Window {
    YT?: YouTubeApi;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let youtubeApiPromise: Promise<YouTubeApi> | null = null;

function loadYouTubeApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (youtubeApiPromise) return youtubeApiPromise;
  youtubeApiPromise = new Promise<YouTubeApi>((resolve, reject) => {
    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousReady?.();
      if (window.YT) resolve(window.YT);
    };
    const existing = document.querySelector<HTMLScriptElement>('script[src="https://www.youtube.com/iframe_api"]');
    if (existing) return;
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    script.onerror = () => reject(new Error("YouTube player failed to load."));
    document.head.appendChild(script);
  });
  return youtubeApiPromise;
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;
}

function CustomYouTubePlayer({ videoId, title }: { videoId: string; title: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setInterval> | undefined;
    loadYouTubeApi().then((YT) => {
      if (cancelled || !mountRef.current) return;
      playerRef.current = new YT.Player(mountRef.current, {
        videoId,
        host: "https://www.youtube-nocookie.com",
        playerVars: { autoplay: 1, controls: 0, disablekb: 1, fs: 0, iv_load_policy: 3, modestbranding: 1, playsinline: 1, rel: 0 },
        events: {
          onReady: ({ target }) => {
            if (cancelled) return;
            setReady(true);
            setDuration(target.getDuration());
            target.playVideo();
            timer = setInterval(() => {
              setCurrentTime(target.getCurrentTime());
              setDuration(target.getDuration());
            }, 500);
          },
          onStateChange: ({ data }) => setPlaying(data === YT.PlayerState.PLAYING),
        },
      });
    }).catch(() => setReady(false));
    return () => {
      cancelled = true;
      if (timer) clearInterval(timer);
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [videoId]);

  function togglePlayback() {
    if (!playerRef.current) return;
    if (playing) playerRef.current.pauseVideo();
    else playerRef.current.playVideo();
  }

  function seek(seconds: number) {
    setCurrentTime(seconds);
    playerRef.current?.seekTo(seconds, true);
  }

  return <div className="custom-video-player">
    <div className="custom-video-frame" ref={mountRef} title={title} />
    <div className="custom-video-hit-area" aria-hidden="true" />
    <div className="custom-video-controls">
      <button type="button" onClick={togglePlayback} disabled={!ready} aria-label={playing ? "Pause video" : "Play video"}>
        {playing ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
      </button>
      <span>{formatTime(currentTime)}</span>
      <input type="range" min="0" max={duration || 0} step="0.1" value={Math.min(currentTime, duration || 0)} onChange={(event) => seek(Number(event.target.value))} disabled={!ready || !duration} aria-label="Video timeline" />
      <span>{formatTime(duration)}</span>
    </div>
  </div>;
}

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

  const videoId = playback.embedUrl?.split("/").pop();

  return <section className="video-shell">
      {playback.state === "ready" && videoId ? <CustomYouTubePlayer videoId={videoId} title={masterclass.title} />
      : playback.state === "coming-soon" ? <div className="video-facade video-coming-soon" role="status"><span><Play size={34} aria-hidden="true" /></span><strong>Video coming soon</strong><small>A video URL has not been supplied for this masterclass yet.</small></div>
      : playback.state === "error" ? <div className="video-facade video-coming-soon" role="alert"><CircleAlert size={30} /><strong>Video unavailable</strong><small>{playback.message}</small><button className="text-button" type="button" onClick={loadVideo}>Try again</button></div>
      : <button className="video-facade" type="button" onClick={loadVideo} disabled={playback.state === "loading"} aria-label={`Play ${masterclass.title}`}><span><Play size={34} fill="currentColor" /></span><strong>{playback.state === "loading" ? "Loading video…" : "Play Masterclass"}</strong><small>Free to watch—no account or sign-in required.</small></button>}
    </section>;
}
