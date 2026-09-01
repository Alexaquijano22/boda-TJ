import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.monogram}>
        <span>T &amp; J</span>
      </div>
      <p className={styles.closing}>Vamos a celebrar, ¡te esperamos!</p>
      <p className={styles.names}>
        Tatiana &amp; Juan Carlos · 20 de noviembre de 2026
      </p>
    </footer>
  );
}
