"use client";

import { useEffect, useState } from "react";
import styles from "./Countdown.module.css";

const WEDDING_DATE = new Date("2026-11-20T16:00:00-03:00");

function getTimeLeft() {
  const diff = Math.max(0, WEDDING_DATE.getTime() - Date.now());
  return {
    dias: Math.floor(diff / (1000 * 60 * 60 * 24)),
    horas: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutos: Math.floor((diff / (1000 * 60)) % 60),
    segundos: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) return null;

  const units = [
    { label: "Días", value: timeLeft.dias },
    { label: "Horas", value: timeLeft.horas },
    { label: "Min", value: timeLeft.minutos },
    { label: "Seg", value: timeLeft.segundos },
  ];

  return (
    <div className={styles.countdown} aria-label="Cuenta regresiva para la boda">
      {units.map((unit) => (
        <div className={styles.unit} key={unit.label}>
          <span className={styles.value}>
            {String(unit.value).padStart(2, "0")}
          </span>
          <span className={styles.label}>{unit.label}</span>
        </div>
      ))}
    </div>
  );
}
