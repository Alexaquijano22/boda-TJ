import styles from "./ClosingQuote.module.css";

export default function ClosingQuote() {
  return (
    <section className={styles.note}>
      <div className={`divider ${styles.divider}`}>
        <span className="line" />
        <span className="dot" />
        <span className="line" />
      </div>
      <p className={styles.text}>
        Gracias por ser parte de este viaje y de cada capítulo que aún nos
        falta por escribir.
      </p>
    </section>
  );
}
