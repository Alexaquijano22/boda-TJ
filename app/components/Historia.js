import Image from "next/image";
import styles from "./Historia.module.css";

export default function Historia() {
  return (
    <section className={`${styles.historia} page`}>
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
      <div className={styles.portrait}>
        <Image
          src="/images/gallery-5.jpg"
          alt="Tatiana y Juan Carlos"
          fill
          sizes="128px"
        />
      </div>
      <p className="eyebrow">Nuestra historia</p>
      <h2>¡Nos casamos!</h2>
      <p className={styles.cuerpo}>
        Y queremos que seas parte de este día tan especial, celebrando con
        nosotros como solo tú sabes hacerlo.
      </p>
    </section>
  );
}
