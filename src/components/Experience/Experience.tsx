import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { experience } from '../../data/experience';
import './Experience.css';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const Experience: React.FC = () => {
  return (
    <section className="experience-section" id="experience" aria-label="Professional Experience">
      <div className="container">
        {/* Section Header */}
        <div className="experience-header-block">
          <div className="eyebrow">CAREER PATH &amp; PRODUCTION WORK</div>
          <div className="experience-heading-wrap">
            <motion.h2
              className="experience-section-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, ease: EASE_OUT }}
            >
              PROFESSIONAL EXPERIENCE.
            </motion.h2>
          </div>
        </div>

        {/* Editorial Row Layout */}
        <div className="experience-list">
          {experience.map((entry, index) => (
            <motion.div
              key={`${entry.company}-${index}`}
              className="experience-row"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, ease: EASE_OUT }}
            >
              {/* Left Column: Role, Company, Period & Awards */}
              <div className="experience-meta-col">
                <span className="experience-period">{entry.period}</span>
                <h3 className="experience-role">{entry.role}</h3>
                <div className="experience-company">
                  <span className="experience-company-dot" />
                  <span>{entry.company}</span>
                </div>

                {entry.awards && entry.awards.length > 0 && (
                  <div className="experience-awards-block">
                    <div className="awards-heading">
                      <Award size={14} />
                      <span>HONORS &amp; RECOGNITION</span>
                    </div>
                    {entry.awards.map((award) => (
                      <div key={award} className="award-item">
                        {award}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: All Verbatim Accomplishment Bullets */}
              <div className="experience-details-col">
                <ul className="experience-bullets-list">
                  {entry.bullets.map((bullet, bIdx) => (
                    <motion.li
                      key={bIdx}
                      className="experience-bullet-item"
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{
                        duration: 0.5,
                        delay: bIdx * 0.05,
                        ease: EASE_OUT,
                      }}
                    >
                      <span className="bullet-index">0{bIdx + 1}</span>
                      <span className="bullet-text">{bullet}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
