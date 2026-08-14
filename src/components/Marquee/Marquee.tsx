import React from 'react';
import './Marquee.css';

const TECH_ITEMS = [
  'Node.js',
  'NestJS',
  'TypeScript',
  'PostgreSQL',
  'Redis',
  'Docker',
  'Kubernetes',
  'AWS',
  'React',
];

export const Marquee: React.FC = () => {
  return (
    <section className="marquee-container" aria-label="Core Technology Stack Marquee">
      {/* Track 1: Primary track for screen readers and animation */}
      <div className="marquee-track">
        {TECH_ITEMS.map((tech, index) => (
          <div key={`track1-${index}`} className="marquee-item">
            <span className="marquee-text">{tech}</span>
            <span className="marquee-separator" aria-hidden="true">✦</span>
          </div>
        ))}
      </div>

      {/* Track 2: Duplicate for seamless continuous horizontal scroll */}
      <div className="marquee-track" aria-hidden="true">
        {TECH_ITEMS.map((tech, index) => (
          <div key={`track2-${index}`} className="marquee-item">
            <span className="marquee-text">{tech}</span>
            <span className="marquee-separator">✦</span>
          </div>
        ))}
      </div>

      {/* Track 3: Extra duplicate to ensure seamless wrap on ultrawide screens */}
      <div className="marquee-track" aria-hidden="true">
        {TECH_ITEMS.map((tech, index) => (
          <div key={`track3-${index}`} className="marquee-item">
            <span className="marquee-text">{tech}</span>
            <span className="marquee-separator">✦</span>
          </div>
        ))}
      </div>
    </section>
  );
};
