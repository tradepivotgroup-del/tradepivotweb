import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Leadership from '@/components/Leadership';
import Gallery from '@/components/Gallery';
import Footer from '@/components/Footer';
import ScrollLine from '@/components/ScrollLine';
import Preloader from '@/components/Preloader';
import Marquee from '@/components/Marquee';

export default function Home() {
  return (
    <>
      <Preloader />
      <SmoothScroll>
        <main className="bg-[var(--background)] min-h-screen text-[var(--foreground)] font-sans transition-colors duration-500">
          <ScrollLine />
          <Navbar />
        <Hero />
        <About />
        <Services />
        <Projects />
        <Gallery />
        <Leadership />
        <Marquee />
        <Footer />
      </main>
    </SmoothScroll>
    </>
  );
}
