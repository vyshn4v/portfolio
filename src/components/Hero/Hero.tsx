import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Cpu, Download } from 'lucide-react';
import { profile } from '../../data/profile';
import './Hero.css';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const Hero: React.FC = () => {
  const handleScrollClick = () => {
    const marqueeSection = document.querySelector('.marquee-container');
    if (marqueeSection) {
      marqueeSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section" id="hero" aria-label="Hero Introduction">
      <div className="container hero-inner">
        <div className="hero-layout-grid">
          {/* ============================================================
              LEFT COLUMN: Greeting, Email Link & Scale Metric
             ============================================================ */}
          <div className="hero-left-col">
            <div className="hero-eyebrow-row">
              <div className="eyebrow">
                {profile.eyebrow}
              </div>
              <div className="hero-availability-pill" title={profile.availability}>
                <span className="pulse-dot" />
                <span>{profile.availabilityBadge}</span>
              </div>
            </div>

            <h1 className="hero-greeting">
              {profile.hero.greeting}
              <span className="hero-name-highlight"> {profile.hero.nameHighlight}</span>
              <span className="hero-sr-title">{profile.hero.srTitle}</span>
            </h1>

            <motion.div
              className="hero-cta-group"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05, ease: EASE_OUT }}
            >
              <a
                href="/Resume_vyshnavPC.pdf"
                download="Resume_vyshnavPC.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-resume-btn"
                aria-label="Download Vyshnav P C Resume (PDF)"
              >
                <Download size={15} />
                <span>DOWNLOAD RESUME</span>
              </a>

              <a
                href={`mailto:${profile.email}`}
                className="hero-email-link"
              >
                {profile.email}
              </a>
            </motion.div>

            <motion.div
              className="hero-stat-block"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15, ease: EASE_OUT }}
            >
              <span className="hero-stat-number">{profile.hero.stat.value}</span>
              <span className="hero-stat-label">
                {profile.hero.stat.label.split('\n').map((line, idx) => (
                  <React.Fragment key={idx}>
                    {idx > 0 && <br />}
                    {line}
                  </React.Fragment>
                ))}
              </span>
            </motion.div>
          </div>

          {/* ============================================================
              RIGHT COLUMN: Narrative Quote, Circular Stamp & Tech Pills
             ============================================================ */}
          <div className="hero-right-col">
            <div className="hero-quote-text">
              {profile.hero.quote}
            </div>

            <motion.div
              className="hero-stamp-wrapper"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT }}
            >
              <div className="hero-circular-stamp" aria-hidden="true">
                <Cpu size={28} className="hero-stamp-inner-icon" />
              </div>
              <div className="hero-stamp-caption">
                {profile.hero.stampCaption}
              </div>
            </motion.div>

            <motion.div
              className="hero-tech-pills"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2, ease: EASE_OUT }}
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
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25, ease: EASE_OUT }}
        >
          <div className="hero-location-info">
            <span>LOCATION:</span>
            <strong>{profile.location} · {profile.relocation}</strong>
          </div>

          <div
            className="hero-scroll-hint"
            onClick={handleScrollClick}
            role="button"
            tabIndex={0}
            aria-label="Scroll to explore marquee and projects"
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
