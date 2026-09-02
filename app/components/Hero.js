import Image from "next/image";
import styles from "./Hero.module.css";
import Countdown from "./Countdown";
import heroImage from "@/public/images/hero.jpg";

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <Image
        src={heroImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className={styles.bg}
      />
      <div className={styles.tint} />
      <div className={styles.content}>
        <p className={`script ${styles.tag}`}>Nos casamos</p>
        <p className={`eyebrow ${styles.eyebrow}`}>
          Te invitamos a celebrar nuestra unión
        </p>
        <h1 className={styles.names}>
          Tatiana &amp;<br />Juan Carlos
        </h1>
        <div className="divider on-dark">
          <span className="line" />
          <span className="dot" />
          <span className="line" />
        </div>
        <Countdown />
        <a className={styles.cta} href="#detalles">
          Ver detalles
        </a>
      </div>
    </section>
  );
}
