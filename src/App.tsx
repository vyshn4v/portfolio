import React, { Suspense, lazy } from 'react';
import { Navigation } from './components/Navigation/Navigation';
import { SectionNav } from './components/SectionNav/SectionNav';
import { Hero } from './components/Hero/Hero';
import { Marquee } from './components/Marquee/Marquee';
import { About } from './components/About/About';
import { Experience } from './components/Experience/Experience';
import { Projects } from './components/Projects/Projects';
import { Skills } from './components/Skills/Skills';
import { Philosophy } from './components/Philosophy/Philosophy';
import { Certifications } from './components/Certifications/Certifications';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';

// Code-split AIChat so it doesn't block critical render path
const AIChat = lazy(() =>
  import('./components/AIChat/AIChat').then((m) => ({ default: m.AIChat }))
);

export const App: React.FC = () => {
  return (
    <div className="app-root">
      <div className="grain-overlay" aria-hidden="true" />
      <Navigation delay={0} />
      <SectionNav />

      <main id="main-content" style={{ paddingTop: '80px' }}>
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Philosophy />
        <Certifications />
        <Contact />
      </main>

      <Footer />
      <Suspense fallback={null}>
        <AIChat isReady={true} />
      </Suspense>
    </div>
  );
};

export default App;
