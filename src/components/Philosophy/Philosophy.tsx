import React from 'react';
import { motion } from 'framer-motion';
import './Philosophy.css';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const principles = [
  {
    num: '01',
    tag: 'LIFECYCLE OWNERSHIP',
    title: 'End-to-End Production Delivery',
    body: 'From presales proof-of-concept and architecture alignment through Kubernetes deployment windows, reliable software requires owning the entire delivery pipeline, not just writing code.',
  },
  {
    num: '02',
    tag: 'THROUGHPUT & SCALE',
    title: 'Architecting for Real Request Volume',
    body: 'Designing high-volume decision engines (1,000–2,000 req/min) means treating latency and deterministic behavior as foundational constraints through deliberate database indexing and caching.',
  },
  {
    num: '03',
    tag: 'DECOUPLED SYSTEMS',
    title: 'Async-First Resilient Workflows',
    body: 'Long-running tasks belong in message queues with automated retries, DLQs, and cache persistence, keeping user-facing endpoints responsive and isolated from heavy downstream processing.',
  },
  {
    num: '04',
    tag: 'CODE CORRECTNESS',
    title: 'Rigorous Review & Knowledge Sharing',
    body: 'Modular architectures only succeed when teams uphold high standards for business-logic correctness, OWASP security practices, and active mentorship of new engineers.',
  },
];

export const Philosophy: React.FC = () => {
  return (
    <section className="philosophy-section" id="philosophy" aria-label="Engineering Philosophy">
      <div className="container">
        {/* Section Header */}
        <div className="philosophy-header-block">
          <div className="eyebrow">PRACTICAL BELIEFS &amp; PRINCIPLES</div>
          <div className="philosophy-heading-wrap">
            <motion.h2
              className="philosophy-section-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, ease: EASE_OUT }}
            >
              ENGINEERING PHILOSOPHY.
            </motion.h2>
          </div>
        </div>

        {/* 2-Column Principles Grid */}
        <div className="philosophy-grid">
          {principles.map((item, index) => (
            <motion.div
              key={item.num}
              className="philosophy-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: EASE_OUT }}
            >
              <div className="philosophy-card-header">
                <span className="philosophy-num">{item.num}.</span>
                <span className="philosophy-tag">{item.tag}</span>
              </div>
              <h3 className="philosophy-title">{item.title}</h3>
              <p className="philosophy-body">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
