import React, { useState } from 'react';
import { Preloader } from './components/Preloader/Preloader';
import { Navigation } from './components/Navigation/Navigation';
import { Hero } from './components/Hero/Hero';
import { Marquee } from './components/Marquee/Marquee';

export const App: React.FC = () => {
  const [, setPreloaderComplete] = useState(false);

  return (
    <div className="app-root">
      <div className="grain-overlay" aria-hidden="true" />
      <Preloader onComplete={() => setPreloaderComplete(true)} />
      <Navigation delay={1.2} />

      <main id="main-content" style={{ paddingTop: '80px' }}>
        <Hero />
        <Marquee />
      </main>
    </div>
  );
};

export default App;
