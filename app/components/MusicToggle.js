"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./MusicToggle.module.css";

const VIDEO_ID = "328Z3b77k6Y";

export default function MusicToggle() {
  const targetRef = useRef(null);
  const playerRef = useRef(null);
  const apiReadyRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);

  const createAndPlay = () => {
    if (playerRef.current) return;
    setLoading(true);
    playerRef.current = new window.YT.Player(targetRef.current, {
      height: "1",
      width: "1",
      videoId: VIDEO_ID,
      playerVars: {
        autoplay: 1,
        controls: 0,
        playsinline: 1,
        modestbranding: 1,
      },
      events: {
        onReady: () => setLoading(false),
        onStateChange: (e) => {
          setIsPlaying(e.data === window.YT.PlayerState.PLAYING);
        },
        onError: (e) => {
          console.error("YouTube player error code:", e.data);
          setLoading(false);
        },
      },
    });
  };

  useEffect(() => {
    if (window.YT && window.YT.Player) {
      apiReadyRef.current = true;
      return;
    }

    const prevReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prevReady?.();
      apiReadyRef.current = true;
    };

    if (!document.getElementById("youtube-iframe-api")) {
      const script = document.createElement("script");
      script.id = "youtube-iframe-api";
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const target = document.getElementById("hero");
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && !playerRef.current && apiReadyRef.current) {
            createAndPlay();
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const handleClick = () => {
    if (!playerRef.current) {
      if (!apiReadyRef.current) return;
      createAndPlay();
      return;
    }
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  return (
    <>
      <div className={styles.hiddenPlayer}>
        <div ref={targetRef} />
      </div>
      <button
        type="button"
        className={`${styles.button} ${isPlaying ? styles.playing : ""}`}
        onClick={handleClick}
        disabled={loading}
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
        title={isPlaying ? "Pausar música" : "Reproducir música"}
      >
        {isPlaying ? (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7Z" />
          </svg>
        )}
      </button>
    </>
  );
}
