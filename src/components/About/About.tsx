import React from 'react';
import { motion } from 'framer-motion';
import { Server, Layers, GitBranch } from 'lucide-react';
import { profile } from '../../data/profile';
import './About.css';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const capabilityIconMap = {
  server: { icon: <Server size={24} />, boxClass: 'icon-box-teal' },
  layers: { icon: <Layers size={24} />, boxClass: 'icon-box-orange' },
  'git-branch': { icon: <GitBranch size={24} />, boxClass: 'icon-box-rust' },
};

export const About: React.FC = () => {
  return (
    <section className="about-section" id="about" aria-label="About Vyshnav">
      <div className="container">
        <div className="about-grid">
          {/* ============================================================
              LEFT COLUMN: Core Capabilities & Focus Blocks
             ============================================================ */}
          <motion.div
            className="about-cards-col"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            {profile.about.capabilities.map((cap) => {
              const meta = capabilityIconMap[cap.icon];
              return (
                <div key={cap.id} className="about-feature-card">
                  <div className={`feature-icon-box ${meta.boxClass}`}>
                    {meta.icon}
                  </div>
                  <div className="feature-info">
                    <span className="feature-title">{cap.title}</span>
                    <span className="feature-sub">{cap.subtitle}</span>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* ============================================================
              RIGHT COLUMN: Narrative & Request-Scale Metrics
             ============================================================ */}
          <div className="about-narrative-col">
            <div className="eyebrow" style={{ marginBottom: '12px' }}>
              ENGINEERING SUMMARY
            </div>

            <div className="about-heading-wrap">
              <motion.h2
                className="about-section-heading"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, ease: EASE_OUT }}
              >
                {profile.about.heading}
              </motion.h2>
            </div>

            <motion.div
              className="about-paragraphs"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
            >
              <p>
                {profile.summary}
              </p>
            </motion.div>

            {/* Scale Metrics from Resume Work */}
            <motion.div
              className="about-metrics-row"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE_OUT }}
            >
              {profile.about.metrics.map((metric, idx) => (
                <div key={idx} className="metric-item">
                  <span className="metric-value">{metric.value}</span>
                  <span className="metric-label">
                    {metric.label.split('\n').map((line, lIdx) => (
                      <React.Fragment key={lIdx}>
                        {lIdx > 0 && <br />}
                        {line}
                      </React.Fragment>
                    ))}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
