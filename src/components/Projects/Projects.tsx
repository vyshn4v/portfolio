import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '../../data/projects';
import { DomainScannerSurface } from './DomainScannerSurface';
import './Projects.css';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const Projects: React.FC = () => {
  const domainScanner = projects.find((p) => p.slug === 'domain-scanner');

  return (
    <section className="projects-section" id="projects" aria-label="Selected Engineering Work">
      <div className="container">
        {/* Section Header */}
        <div className="projects-header-block">
          <div className="eyebrow">FEATURED PRODUCTION SYSTEMS</div>
          <div className="projects-heading-wrap">
            <motion.h2
              className="projects-section-heading"
              initial={{ clipPath: 'inset(100% 0 0 0)', opacity: 0 }}
              whileInView={{ clipPath: 'inset(0% 0 0 0)', opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: EASE_OUT }}
            >
              SELECTED WORK.
            </motion.h2>
          </div>
        </div>

        <div className="projects-list">
          {/* ============================================================
              PHASE 5: Selected Work — Domain Scanner Showcase
             ============================================================ */}
          {domainScanner && (
            <motion.div
              className="project-showcase-row"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: EASE_OUT }}
            >
              {/* Left Column: Narrative Details */}
              <div className="project-info-col">
                <div className="project-status-badge live">
                  <span className="status-beacon" />
                  <span>LIVE PRODUCTION SAAS</span>
                </div>

                <h3 className="project-title">{domainScanner.name}</h3>

                <div className="project-stack-pills">
                  {domainScanner.stack.map((tech) => (
                    <span key={tech} className="project-stack-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                <ul className="project-bullets-list">
                  {domainScanner.bullets.map((bullet, idx) => (
                    <li key={idx} className="project-bullet-item">
                      <span className="project-bullet-dot" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {domainScanner.url && (
                  <a
                    href={domainScanner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-live-btn"
                  >
                    <span>VISIT LIVE SAAS</span>
                    <ArrowUpRight size={15} />
                  </a>
                )}
              </div>

              {/* Right Column: Illustrative Mini Product Surface */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: 0.15, ease: EASE_OUT }}
              >
                <DomainScannerSurface />
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
