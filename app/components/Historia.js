import Image from "next/image";
import styles from "./Historia.module.css";

export default function Historia() {
  return (
    <section id="historia" className={`${styles.historia} page`}>
      <Image
        src="/images/pampas-corner.png"
        alt=""
        width={600}
        height={515}
        className={styles.cornerTop}
      />
      <Image
        src="/images/pampas-corner.png"
        alt=""
        width={600}
        height={515}
        className={styles.cornerBottom}
      />
      <p className={styles.quote}>
        La maravillosa coincidencia de encontrar el amor y poder seguir
        eligiéndolo todos los días
      </p>
      <h2>nos casamos</h2>
      <div className={styles.portrait}>
        <Image
          src="/images/gallery-5.jpg"
          alt="Tatiana y Juan Carlos"
          fill
          sizes="128px"
        />
      </div>
      <p className={styles.fecha}>20 de Noviembre, 2026</p>
      <p className={styles.details}>4:00 pm · Peñalolén, Santiago</p>
    </section>
  );
}
