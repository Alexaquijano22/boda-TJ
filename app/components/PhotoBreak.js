import Image from "next/image";
import styles from "./PhotoBreak.module.css";

export default function PhotoBreak({ src, objectPosition = "center" }) {
  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <Image
          src={src}
          alt="Tatiana y Juan Carlos"
          fill
          sizes="(max-width: 760px) 100vw, 760px"
          className={styles.img}
          style={{ objectPosition }}
        />
      </div>
    </section>
  );
}
