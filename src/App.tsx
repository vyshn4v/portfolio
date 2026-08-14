import React, { useState } from 'react';
import { Preloader } from './components/Preloader/Preloader';
import { Navigation } from './components/Navigation/Navigation';

export const App: React.FC = () => {
  const [, setPreloaderComplete] = useState(false);

  return (
    <div className="app-root">
      <div className="grain-overlay" aria-hidden="true" />
      <Preloader onComplete={() => setPreloaderComplete(true)} />
      <Navigation delay={1.2} />

      <main id="main-content" style={{ minHeight: '100vh', paddingTop: '100px' }}>
        <div className="container">
          {/* Phase 0 scaffold verification surface */}
          <div
            style={{
              padding: '80px 0',
              borderBottom: '1px solid rgba(198, 190, 165, 0.4)',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            <span className="eyebrow">PHASE 0 — SCAFFOLD &amp; NAVIGATION READY</span>
            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(32px, 5vw, 64px)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
                color: 'var(--color-ink)',
              }}
            >
              Vyshnav P C Portfolio System Initialized.
            </h1>
            <p className="lead-text" style={{ maxWidth: '640px' }}>
              Design tokens, type scales, Preloader, and Navigation are mounted. Ready for Phase 1: Hero &amp; Organic Splash.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
