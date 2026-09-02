import styles from "./Musica.module.css";

const PLAYLIST_ID = "5wYojnfvtWplugmDlmq0uD";
const PLAYLIST_URL = `https://open.spotify.com/playlist/${PLAYLIST_ID}`;
const EMBED_URL = `https://open.spotify.com/embed/playlist/${PLAYLIST_ID}?utm_source=generator`;

export default function Musica() {
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
          <iframe
            className={styles.player}
            src={EMBED_URL}
            width="100%"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Playlist de Spotify"
          />
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
