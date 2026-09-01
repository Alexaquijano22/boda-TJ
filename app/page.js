import Hero from "./components/Hero";
import Historia from "./components/Historia";
import PhotoBreak from "./components/PhotoBreak";
import Detalles from "./components/Detalles";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Historia />
      <PhotoBreak src="/images/gallery-8.jpg" objectPosition="center 70%" />
      <Detalles />
      <PhotoBreak src="/images/gallery-2.jpg" objectPosition="center 30%" />
      <Footer />
    </>
  );
}
