import React from 'react';
import { motion } from 'framer-motion';
import { Award, GraduationCap, Languages as LangIcon, ArrowUpRight } from 'lucide-react';
import { certifications } from '../../data/certifications';
import { profile } from '../../data/profile';
import './Certifications.css';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const Certifications: React.FC = () => {
  return (
    <section className="certifications-section" id="certifications" aria-label="Certifications and Education">
      <div className="container">
        {/* Section Header */}
        <div className="certifications-header-block">
          <div className="eyebrow">CREDENTIALS &amp; ACADEMIC FOUNDATION</div>
          <div className="certifications-heading-wrap">
            <motion.h2
              className="certifications-section-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, ease: EASE_OUT }}
            >
              CERTIFICATIONS &amp; EDUCATION.
            </motion.h2>
          </div>
        </div>

        {/* 2-Column Asymmetric Grid */}
        <div className="certifications-layout-grid">
          {/* ============================================================
              LEFT COLUMN: Verified Certifications
             ============================================================ */}
          <motion.div
            className="cert-group-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <div className="cert-col-title">
              <Award size={16} />
              <span>SPECIALIZED CERTIFICATIONS</span>
            </div>

            <div className="certs-list">
              {certifications.map((cert) => (
                <div key={cert.name} className="cert-item-card">
                  <div className="cert-main-info">
                    <span className="cert-name">{cert.name}</span>
                    {cert.issuer ? (
                      <span className="cert-issuer">Issued by {cert.issuer}</span>
                    ) : (
                      <span className="cert-issuer" style={{ fontStyle: 'italic' }}>
                        Specialized Training
                      </span>
                    )}
                  </div>

                  {cert.url ? (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-link-btn"
                    >
                      <span>VIEW CREDENTIAL</span>
                      <ArrowUpRight size={13} />
                    </a>
                  ) : (
                    <span className="cert-badge-plain">VERIFIED COURSE</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* ============================================================
              RIGHT COLUMN: Education & Spoken Languages
             ============================================================ */}
          <motion.div
            className="cert-group-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
          >
            <div className="cert-col-title">
              <GraduationCap size={16} />
              <span>EDUCATION &amp; TRAINING</span>
            </div>

            <div className="education-list">
              {profile.education.map((edu) => (
                <div key={edu.program} className="edu-item-card">
                  <span className="edu-program">{edu.program}</span>
                  <span className="edu-institution">{edu.institution}</span>
                  <span className="edu-period">{edu.period}</span>
                </div>
              ))}
            </div>

            {/* Languages Block */}
            <div className="languages-block">
              <div className="cert-col-title" style={{ marginTop: '12px' }}>
                <LangIcon size={16} />
                <span>LANGUAGES</span>
              </div>

              <div className="languages-grid">
                {profile.languages.map((lang) => (
                  <div key={lang.name} className="language-chip">
                    <span className="language-name">{lang.name}</span>
                    <span className="language-level">({lang.level})</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
