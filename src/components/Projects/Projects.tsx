import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock } from 'lucide-react';
import { projects } from '../../data/projects';
import { DomainScannerSurface } from './DomainScannerSurface';
import { QStackArchitectureMap } from './QStackArchitectureMap';
import { YohoAgentSurface } from './YohoAgentSurface';
import './Projects.css';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const GithubIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

export const Projects: React.FC = () => {
  const yohoAgent = projects.find((p) => p.slug === 'yoho-ai-agent');
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
              PROJECT 1: Yoho Ai-Agent (Multi-Agent RAG & Async Consultation)
             ============================================================ */}
          {yohoAgent && (
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
                  <span>{yohoAgent.badgeText || 'LIVE MULTI-AGENT SYSTEM'}</span>
                </div>

                <div className="project-title-row">
                  <h3 className="project-title">{yohoAgent.name}</h3>
                  {yohoAgent.period && (
                    <span className="project-period-badge">{yohoAgent.period}</span>
                  )}
                </div>

                <div className="project-stack-pills">
                  {yohoAgent.stack.map((tech) => (
                    <span key={tech} className="project-stack-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                <ul className="project-bullets-list">
                  {yohoAgent.bullets.map((bullet, idx) => (
                    <li key={idx} className="project-bullet-item">
                      <span className="project-bullet-dot" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="project-actions-group">
                  {yohoAgent.url && (
                    <a
                      href={yohoAgent.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-live-btn"
                    >
                      <span>VISIT LIVE DEMO</span>
                      <ArrowUpRight size={15} />
                    </a>
                  )}

                  {yohoAgent.githubUrl && (
                    <a
                      href={yohoAgent.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-github-btn"
                    >
                      <GithubIcon />
                      <span>VIEW GITHUB</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Multi-Agent State Machine Surface */}
              <motion.div
                className="project-surface-wrap"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
              >
                <YohoAgentSurface data={yohoAgent.architecture} />
              </motion.div>
            </motion.div>
          )}

          {/* ============================================================
              PROJECT 2: Domain Scanner (Live Production SaaS)
             ============================================================ */}
          {domainScanner && (
            <motion.div
              className="project-showcase-row reversed"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, ease: EASE_OUT }}
            >
              {/* Left Column (Desktop) / Second (Mobile): Surface */}
              <motion.div
                className="project-surface-wrap"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
              >
                <DomainScannerSurface />
              </motion.div>

              {/* Right Column (Desktop) / First (Mobile): Narrative Details */}
              <div className="project-info-col">
                <div className="project-status-badge live">
                  <span className="status-beacon pulse" />
                  <span>{domainScanner.badgeText || 'LIVE PRODUCTION SAAS'}</span>
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

                <div className="project-actions-group">
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

                  {domainScanner.githubUrl && (
                    <a
                      href={domainScanner.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-github-btn"
                    >
                      <GithubIcon />
                      <span>VIEW GITHUB</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ============================================================
              PROJECT 3: QStack (Modular Clean Architecture + RAG AI)
             ============================================================ */}
          {qstack && (
            <motion.div
              className="project-showcase-row"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, ease: EASE_OUT }}
            >
              {/* Left Column: Narrative Details */}
              <div className="project-info-col">
                <div className="project-status-badge in-dev">
                  <span className="status-beacon pulse" />
                  <span>{qstack.badgeText || 'IN-DEVELOPMENT // SYSTEM ARCHITECTURE'}</span>
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

              {/* Right Column: Architecture Map */}
              <motion.div
                className="project-surface-wrap"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
              >
                <QStackArchitectureMap />
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
