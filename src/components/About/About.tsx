import React from 'react';
import { motion } from 'framer-motion';
import { Server, Layers, GitBranch } from 'lucide-react';
import { profile } from '../../data/profile';
import './About.css';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

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
            <div className="about-feature-card">
              <div className="feature-icon-box icon-box-teal">
                <Server size={24} />
              </div>
              <div className="feature-info">
                <span className="feature-title">High-Throughput Backend</span>
                <span className="feature-sub">Node.js · NestJS · PostgreSQL · REST</span>
              </div>
            </div>

            <div className="about-feature-card">
              <div className="feature-icon-box icon-box-orange">
                <Layers size={24} />
              </div>
              <div className="feature-info">
                <span className="feature-title">Asynchronous Event Pipelines</span>
                <span className="feature-sub">RabbitMQ · Redis Caching · Resilient Queues</span>
              </div>
            </div>

            <div className="about-feature-card">
              <div className="feature-icon-box icon-box-rust">
                <GitBranch size={24} />
              </div>
              <div className="feature-info">
                <span className="feature-title">Cloud Delivery &amp; DevOps</span>
                <span className="feature-sub">Kubernetes · Docker · Zero-Downtime Migrations</span>
              </div>
            </div>
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
                ARCHITECTING RELIABLE BACKEND SYSTEMS.
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
              <div className="metric-item">
                <span className="metric-value">1,000–2,000</span>
                <span className="metric-label">
                  REQUESTS / MINUTE
                  <br />
                  DECISION ENGINE ORCHESTRATION
                </span>
              </div>

              <div className="metric-item">
                <span className="metric-value">100%</span>
                <span className="metric-label">
                  END-TO-END PRODUCTION
                  <br />
                  DELIVERY &amp; MIGRATION OWNERSHIP
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
