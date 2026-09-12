"use client";

import { useEffect, useRef } from "react";
import styles from "./Musica.module.css";

const PLAYLIST_ID = "5wYojnfvtWplugmDlmq0uD";
const PLAYLIST_URI = `spotify:playlist:${PLAYLIST_ID}`;
// Link de invitación colaborativa (con el token "si") en vez del link pelado:
// es el que Spotify usa para reconocer a quien lo abre como colaborador.
const PLAYLIST_URL =
  "https://open.spotify.com/playlist/5wYojnfvtWplugmDlmq0uD?si=TUwJ2R7IStaAyxrvSa93ig&utm_source=whatsapp&pt=a270936f6850d909bab69143ebc8448e&pi=SIPqDk5wRZuw4";

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
        <p className={`eyebrow ${styles.title}`}>Música</p>
        <p className={styles.lead}>
          Agrega esa canción que no puede faltar en nuestra celebración.
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
