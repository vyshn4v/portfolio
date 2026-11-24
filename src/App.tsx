import React, { useState, useCallback, Suspense, lazy } from 'react';
import { Preloader } from './components/Preloader/Preloader';
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
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderComplete(true);
  }, []);

  return (
    <div className="app-root">
      <div className="grain-overlay" aria-hidden="true" />
      <Preloader onComplete={handlePreloaderComplete} />
      <Navigation delay={1.2} />
      <SectionNav />

      <main id="main-content" style={{ paddingTop: '80px' }}>
        <Hero />
        <Marquee />
        <div className="section-deferred"><About /></div>
        <div className="section-deferred"><Experience /></div>
        <div className="section-deferred"><Projects /></div>
        <div className="section-deferred"><Skills /></div>
        <div className="section-deferred"><Philosophy /></div>
        <div className="section-deferred"><Certifications /></div>
        <div className="section-deferred"><Contact /></div>
      </main>

      <Footer />
      <Suspense fallback={null}>
        <AIChat isReady={preloaderComplete} />
      </Suspense>
    </div>
  );
};

export default App;
