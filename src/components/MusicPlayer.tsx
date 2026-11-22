import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import songAsset from "@/assets/flashing-lights.mp3.asset.json";

export function MusicPlayer() {
  const playerRef = useRef<HTMLElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    const player = playerRef.current;
    if (!audio) return;

    setPlaying(!audio.paused && !audio.ended);

    let active = true;

    const removeInteractionListeners = () => {
      for (const name of ["pointerdown", "touchend", "click", "keydown"]) document.removeEventListener(name, handleFirstInteraction, true);
    };

    const startPlayback = async () => {
      try {
        await audio.play();
        if (!active) return;
        setError(false);
        removeInteractionListeners();
      } catch (error) {
        if (!active || (error instanceof DOMException && error.name === "NotAllowedError")) return;
        setError(true);
        removeInteractionListeners();
      }
    };

    function handleFirstInteraction(event: Event) {
      if (player?.contains(event.target as Node)) {
        removeInteractionListeners();
        return;
      }
      if (audio?.paused) void startPlayback();
    }

    for (const name of ["pointerdown", "touchend", "click", "keydown"]) document.addEventListener(name, handleFirstInteraction, true);
    void startPlayback();

    return () => {
      active = false;
      removeInteractionListeners();
    };
  }, []);

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      audio.pause();
      return;
    }
    setError(false);
    try {
      await audio.play();
    } catch {
      setError(true);
    }
  }

  return (
    <aside ref={playerRef} aria-label="Store music" className="fixed bottom-24 left-3 z-50 w-64 max-w-[calc(100vw-1.5rem)] md:bottom-5 md:left-5">
      <audio
        ref={audioRef}
        src={songAsset.url}
        autoPlay
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onError={() => { setError(true); setPlaying(false); }}
      />
      <div className="overflow-hidden rounded-[1.25rem] border border-primary/40 bg-popover/95 text-popover-foreground shadow-glow backdrop-blur-md">
      <Button
        variant="ghost"
        aria-label={playing ? "Pause Flashing Lights" : "Play Flashing Lights by Kanye West"}
        onClick={togglePlayback}
        className="h-16 w-full justify-start gap-3 rounded-none px-3 hover:bg-accent"
      >
        <span aria-hidden="true" className={`relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-foreground/20 bg-background motion-safe:animate-[spin_5s_linear_infinite] ${playing ? "motion-safe:[animation-play-state:running]" : "motion-safe:[animation-play-state:paused]"}`}>
          <span className="pointer-events-none absolute inset-0 rounded-full bg-vinyl-highlight" />
          <span className="relative flex size-8 items-center justify-center rounded-full border border-foreground/15">
            <span className="flex size-6 items-center justify-center rounded-full border border-foreground/10">
              <span className="flex size-3 items-center justify-center rounded-full bg-primary"><span className="size-1 rounded-full bg-background" /></span>
            </span>
          </span>
        </span>
        <span className="min-w-0 flex-1 text-left">
          <span className="block text-[0.6rem] font-semibold uppercase leading-4 text-muted-foreground">Kanye West</span>
          <span className="block truncate text-sm font-bold leading-5">Flashing Lights</span>
        </span>
        {playing ? <Pause className="text-primary" /> : <Play className="text-primary" />}
      </Button>
      {error && <p role="alert" className="px-3 pb-2 text-xs text-destructive">Song unavailable. Please try again.</p>}
      </div>
    </aside>
  );
}