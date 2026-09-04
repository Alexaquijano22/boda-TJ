"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./MusicToggle.module.css";

const VIDEO_ID = "328Z3b77k6Y";

export default function MusicToggle() {
  const targetRef = useRef(null);
  const playerRef = useRef(null);
  const apiReadyRef = useRef(false);
  const loadingTimeoutRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showHint, setShowHint] = useState(true);

  const clearLoadingTimeout = () => {
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    }
  };

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
        onReady: (e) => {
          // En algunos navegadores (iOS) el autoplay del playerVars no
          // arranca solo; forzamos playVideo() explícito como respaldo.
          e.target.playVideo();
          // Si no llega a reproducir en unos segundos, liberamos el botón
          // para que se pueda volver a tocar en vez de quedar "cargando".
          clearLoadingTimeout();
          loadingTimeoutRef.current = setTimeout(() => setLoading(false), 4000);
        },
        onStateChange: (e) => {
          const playing = e.data === window.YT.PlayerState.PLAYING;
          setIsPlaying(playing);
          if (playing) {
            clearLoadingTimeout();
            setLoading(false);
          }
        },
        onError: (e) => {
          console.error("YouTube player error code:", e.data);
          clearLoadingTimeout();
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

    return () => clearLoadingTimeout();
  }, []);

  useEffect(() => {
    const onSpotifyPlay = () => {
      if (playerRef.current) {
        playerRef.current.pauseVideo();
      }
    };
    window.addEventListener("spotify-play", onSpotifyPlay);
    return () => window.removeEventListener("spotify-play", onSpotifyPlay);
  }, []);

  const handleClick = () => {
    setShowHint(false);
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
      {showHint && !isPlaying && (
        <div className={styles.hint}>
          <span>🎵 Toca aquí para reproducir nuestra canción</span>
          <button
            type="button"
            className={styles.hintClose}
            onClick={() => setShowHint(false)}
            aria-label="Cerrar aviso"
          >
            ×
          </button>
        </div>
      )}
      <button
        type="button"
        className={`${styles.button} ${isPlaying ? styles.playing : ""}`}
        onClick={handleClick}
        disabled={loading}
        aria-label={loading ? "Cargando canción" : isPlaying ? "Pausar música" : "Reproducir música"}
        title={loading ? "Cargando canción…" : isPlaying ? "Pausar música" : "Reproducir música"}
      >
        {loading ? (
          <svg className={styles.spinner} viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="42"
              strokeDashoffset="14"
            />
          </svg>
        ) : isPlaying ? (
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
