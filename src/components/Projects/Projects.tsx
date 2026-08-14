import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock } from 'lucide-react';
import { projects } from '../../data/projects';
import { DomainScannerSurface } from './DomainScannerSurface';
import { QStackArchitectureMap } from './QStackArchitectureMap';
import './Projects.css';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const Projects: React.FC = () => {
  const domainScanner = projects.find((p) => p.slug === 'domain-scanner');
  const qstack = projects.find((p) => p.slug === 'qstack');

  return (
    <section className="projects-section" id="projects" aria-label="Selected Engineering Work">
      <div className="container">
        {/* Section Header */}
        <div className="projects-header-block">
          <div className="eyebrow">FEATURED PRODUCTION &amp; ARCHITECTURE SYSTEMS</div>
          <div className="projects-heading-wrap">
            <motion.h2
              className="projects-section-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, ease: EASE_OUT }}
            >
              SELECTED WORK.
            </motion.h2>
          </div>
        </div>

        <div className="projects-list">
          {/* ============================================================
              PROJECT 1: Domain Scanner (Live Production SaaS)
             ============================================================ */}
          {domainScanner && (
            <motion.div
              className="project-showcase-row"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, ease: EASE_OUT }}
            >
              {/* Left Column: Narrative Details */}
              <div className="project-info-col">
                <div className="project-status-badge live">
                  <span className="status-beacon pulse" />
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
              >
                <DomainScannerSurface />
              </motion.div>
            </motion.div>
          )}

          {/* ============================================================
              PROJECT 2: QStack (Modular Clean Architecture + RAG AI)
             ============================================================ */}
          {qstack && (
            <motion.div
              className="project-showcase-row reversed"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, ease: EASE_OUT }}
            >
              {/* Left Column: Architecture Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
              >
                <QStackArchitectureMap />
              </motion.div>

              {/* Right Column: Narrative Details */}
              <div className="project-info-col">
                <div className="project-status-badge in-dev">
                  <span className="status-beacon pulse" />
                  <span>IN-DEVELOPMENT // SYSTEM ARCHITECTURE</span>
                </div>

                <h3 className="project-title">{qstack.name}</h3>

                <div className="project-stack-pills">
                  {qstack.stack.map((tech) => (
                    <span key={tech} className="project-stack-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                <ul className="project-bullets-list">
                  {qstack.bullets.map((bullet, idx) => (
                    <li key={idx} className="project-bullet-item">
                      <span className="project-bullet-dot" style={{ backgroundColor: 'var(--color-teal)' }} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="project-dev-note">
                  <Clock size={14} color="var(--color-orange)" />
                  <span>Active Development: RAG retrieval &amp; NestJS modular core</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
