"use client";

import { useEffect, useRef } from "react";
import styles from "./Musica.module.css";

const PLAYLIST_ID = "5wYojnfvtWplugmDlmq0uD";
const PLAYLIST_URI = `spotify:playlist:${PLAYLIST_ID}`;
const PLAYLIST_URL = `https://open.spotify.com/playlist/${PLAYLIST_ID}`;

export default function Musica() {
  const targetRef = useRef(null);

  useEffect(() => {
    function setup(IFrameAPI) {
      IFrameAPI.createController(
        targetRef.current,
        { width: "100%", height: "352", uri: PLAYLIST_URI },
        (EmbedController) => {
          EmbedController.addListener("playback_update", (e) => {
            if (!e.data.isPaused) {
              window.dispatchEvent(new CustomEvent("spotify-play"));
            }
          });
        }
      );
    }

    if (window.Spotify && window.Spotify.Embed) {
      setup(window.Spotify.Embed);
      return;
    }

    const prevReady = window.onSpotifyIframeApiReady;
    window.onSpotifyIframeApiReady = (IFrameAPI) => {
      prevReady?.(IFrameAPI);
      setup(IFrameAPI);
    };

    if (!document.getElementById("spotify-iframe-api")) {
      const script = document.createElement("script");
      script.id = "spotify-iframe-api";
      script.src = "https://open.spotify.com/embed/iframe-api/v1";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section className={styles.musica}>
      <div className="page">
        <p className="eyebrow">Música</p>
        <h2>Arma nuestro playlist</h2>
        <p className={styles.lead}>
          Ayúdanos a armar la música de la celebración: agrega esa canción
          que no puede faltar en nuestra playlist de Spotify.
        </p>
        <div className={styles.card}>
          <div className={styles.player} ref={targetRef} />
          <a
            className={styles.addBtn}
            href={PLAYLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Agrega tu canción
          </a>
        </div>
      </div>
    </section>
  );
}
