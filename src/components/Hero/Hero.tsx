import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { profile } from '../../data/profile';
import { Blob } from '../Blob/Blob';
import './Hero.css';

// Break heroHeading into editorial lines for staggered entrance
const titleLines = ['BUILDING', 'SYSTEMS', 'THAT SCALE.'];
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const Hero: React.FC = () => {
  const handleScrollClick = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section" id="hero" aria-label="Hero Introduction">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Typography */}
          <div className="hero-content">
            <div className="hero-eyebrow-container">
              <motion.div
                className="hero-eyebrow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3, ease: EASE_OUT }}
              >
                {profile.eyebrow}
              </motion.div>
            </div>

            <h1 className="hero-title" aria-label={profile.heroHeading}>
              {titleLines.map((line, index) => (
                <span key={line} className="hero-title-line-wrap">
                  <motion.span
                    className="hero-title-line"
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.9,
                      delay: 1.45 + index * 0.1,
                      ease: EASE_OUT,
                    }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <div className="hero-support-wrap">
              <motion.div
                className="hero-support"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.6, ease: EASE_OUT }}
              >
                <p>
                  High-throughput architectures, resilient REST &amp; asynchronous workflows, and production service ownership.
                </p>
                <div className="hero-tech-stack-pill">
                  {profile.heroSupport.split('·').map((tech) => (
                    <span key={tech.trim()} className="hero-tech-tag">
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Organic Splash */}
          <div className="hero-splash-container">
            <Blob delay={1.8} />
          </div>
        </div>

        {/* Hero Footer Bar: Location & Scroll Hint */}
        <motion.div
          className="hero-footer-bar"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.0, ease: EASE_OUT }}
        >
          <div className="hero-location-info">
            <span>LOCATION</span>
            <span>{profile.location}</span>
          </div>

          <div
            className="hero-scroll-hint"
            onClick={handleScrollClick}
            role="button"
            tabIndex={0}
            aria-label="Scroll down to About section"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleScrollClick();
              }
            }}
          >
            <span>SCROLL TO EXPLORE</span>
            <div className="scroll-line-indicator" />
            <ArrowDown size={14} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
