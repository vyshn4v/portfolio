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
        {/* ============================================================
            TIER 1: Editorial Introduction (Heading Left, Narrative Right)
           ============================================================ */}
        <div className="about-intro-grid">
          <div className="about-heading-col">
            <div className="eyebrow" style={{ marginBottom: '16px' }}>
              ENGINEERING SUMMARY
            </div>
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
            className="about-narrative-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
          >
            {(profile.about.paragraphs || [profile.summary]).map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </motion.div>
        </div>

        {/* ============================================================
            TIER 2: Evidence & Capabilities (3 Metrics Left, 3 Capabilities Right)
           ============================================================ */}
        <div className="about-pillars-grid">
          {/* Left Pillar: Proven Scale & Impact (3 Metric Cards) */}
          <motion.div
            className="about-metrics-col"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT }}
          >
            <div className="eyebrow" style={{ marginBottom: '16px' }}>
              PROVEN SCALE &amp; IMPACT
            </div>
            <div className="about-metrics-stack">
              {profile.about.metrics.map((metric, idx) => (
                <div key={idx} className="metric-card">
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
            </div>
          </motion.div>

          {/* Right Pillar: Core Capabilities (3 Capability Cards) */}
          <motion.div
            className="about-capabilities-col"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE_OUT }}
          >
            <div className="eyebrow" style={{ marginBottom: '16px' }}>
              CORE ARCHITECTURAL FOCUS
            </div>
            <div className="about-capabilities-stack">
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
