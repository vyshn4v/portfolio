import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Cpu } from 'lucide-react';
import { profile } from '../../data/profile';
import { Blob } from '../Blob/Blob';
import './Hero.css';

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
        <div className="hero-layout-grid">
          {/* ============================================================
              LEFT COLUMN: Greeting, Email Link & Scale Metric
             ============================================================ */}
          <div className="hero-left-col">
            <motion.div
              className="eyebrow"
              style={{ marginBottom: '12px' }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3, ease: EASE_OUT }}
            >
              {profile.eyebrow}
            </motion.div>

            <motion.h1
              className="hero-greeting"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.45, ease: EASE_OUT }}
            >
              Hey There,
              <span className="hero-name-highlight">I'm Vyshnav</span>
            </motion.h1>

            <motion.a
              href={`mailto:${profile.email}`}
              className="hero-email-link"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.6, ease: EASE_OUT }}
            >
              {profile.email}
            </motion.a>

            <motion.div
              className="hero-stat-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.7, ease: EASE_OUT }}
            >
              <span className="hero-stat-number">2+</span>
              <span className="hero-stat-label">
                YEARS PRODUCTION
                <br />
                EXPERIENCE
              </span>
            </motion.div>
          </div>

          {/* ============================================================
              CENTER COLUMN: Acrylic Dry-Brush Stroke Gesture
             ============================================================ */}
          <div className="hero-center-col">
            <Blob delay={1.8} />
          </div>

          {/* ============================================================
              RIGHT COLUMN: Narrative Quote, Circular Stamp & Tech Pills
             ============================================================ */}
          <div className="hero-right-col">
            <motion.div
              className="hero-quote-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.6, ease: EASE_OUT }}
            >
              I engineer high-throughput backend services, resilient distributed workflows, and end-to-end production systems.
            </motion.div>

            <motion.div
              className="hero-stamp-wrapper"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.8, ease: EASE_OUT }}
            >
              <div className="hero-circular-stamp" aria-hidden="true">
                <Cpu size={26} className="hero-stamp-inner-icon" />
              </div>
              <div className="hero-stamp-caption">
                SDE-I · BACKEND &amp; DISTRIBUTED SYSTEMS
              </div>
            </motion.div>

            <motion.div
              className="hero-tech-pills"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.9, ease: EASE_OUT }}
            >
              {profile.heroSupport.split('·').map((tech) => (
                <span key={tech.trim()} className="hero-tech-tag">
                  {tech.trim()}
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ============================================================
            HERO BOTTOM BAR: Location Metadata & Scroll Indicator
           ============================================================ */}
        <motion.div
          className="hero-footer-bar"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.0, ease: EASE_OUT }}
        >
          <div className="hero-location-info">
            <span>LOCATION:</span>
            <strong>{profile.location}</strong>
          </div>

          <div
            className="hero-scroll-hint"
            onClick={handleScrollClick}
            role="button"
            tabIndex={0}
            aria-label="Scroll down to Explore"
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
