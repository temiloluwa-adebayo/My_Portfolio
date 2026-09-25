import { MotionConfig } from 'motion/react';
import { Contact, Footer } from './components/Contact';
import { Hero } from './components/Hero';
import { Nav } from './components/Nav';
import { Experience, Proof, Stack } from './components/Sections';
import { Faq, Services } from './components/Services';
import { Work } from './components/Work';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[80] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-page"
      >
        Skip to work
      </a>
      <Nav />
      <main>
        <Hero />
        <Work />
        <Stack />
        <Services />
        <Proof />
        <Experience />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
