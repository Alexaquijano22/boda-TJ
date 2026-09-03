import Image from "next/image";
import styles from "./Detalles.module.css";

const DIRECCION = "Camino Las Pircas 4298, casa 13, Peñalolén, Santiago";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(DIRECCION)}`;

export default function Detalles() {
  return (
    <section className={styles.detalles} id="detalles">
      <div className="page">
        <p className="eyebrow">Recepción</p>
        <h2 style={{ textAlign: "center" }}>Te esperamos</h2>
        <div className={styles.moments}>
          <div className={styles.moment}>
            <Image
              src="/images/pampas-corner.png"
              alt=""
              width={600}
              height={515}
              className={styles.corner}
            />
            <svg
              className={styles.icon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 21c-4-3-7-6.5-7-10.5A5 5 0 0 1 12 6a5 5 0 0 1 7 4.5C19 14.5 16 18 12 21Z" />
              <path d="M12 21V9" />
            </svg>
            <p className={styles.hora}>4:00 pm</p>
            <h3>Nuestro hogar</h3>
            <p>
              Camino Las Pircas 4298, casa 13, Peñalolén
              <br />
              Dress code: Semiformal
            </p>
            <a
              className={styles.mapBtn}
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
