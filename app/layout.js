import { Cormorant_Garamond, Alex_Brush, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const alexBrush = Alex_Brush({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  title: "Tatiana & Juan Carlos — Nos casamos",
  description:
    "Te invitamos a celebrar la boda de Tatiana y Juan Carlos, 20 de noviembre de 2026 en Peñalolén, Santiago.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${alexBrush.variable} ${beVietnamPro.variable}`}
    >
      <body style={{ fontFamily: "var(--font-body)" }}>{children}</body>
    </html>
  );
}
