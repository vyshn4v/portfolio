import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, Globe, ExternalLink } from 'lucide-react';
import { profile } from '../../data/profile';
import './Contact.css';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const Contact: React.FC = () => {
  return (
    <section className="contact-section" id="contact" aria-label="Contact and Collaboration">
      <div className="container">
        <motion.div
          className="contact-panel"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
        >
          {/* Restrained Organic Orange Shape in Dark Theme */}
          <div className="contact-organic-shape" aria-hidden="true">
            <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M 120,60 C 220,20 340,50 370,140 C 400,230 360,330 280,370 C 200,410 100,380 50,300 C 0,220 20,100 120,60 Z"
                fill="var(--color-orange)"
              />
            </svg>
          </div>

          <div className="contact-inner">
            <div className="contact-eyebrow">
              <span>GET IN TOUCH</span>
              <span>—</span>
              <span>OPEN FOR SDE &amp; BACKEND ROLES</span>
            </div>

            <div className="contact-heading-wrap">
              <motion.h2
                className="contact-heading"
                initial={{ clipPath: 'inset(100% 0 0 0)', opacity: 0 }}
                whileInView={{ clipPath: 'inset(0% 0 0 0)', opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, ease: EASE_OUT }}
              >
                LET'S BUILD SOMETHING USEFUL.
              </motion.h2>
            </div>

            <div className="contact-grid">
              {/* Left Column: Direct Communication Channels */}
              <div className="contact-primary-channels">
                <div className="contact-channel-item">
                  <span className="channel-label">EMAIL DIRECT</span>
                  <a
                    href={`mailto:${profile.email}`}
                    className="channel-action-link"
                    aria-label={`Send email to ${profile.email}`}
                  >
                    <span>{profile.email}</span>
                    <ArrowUpRight size={22} />
                  </a>
                </div>

                <div className="contact-channel-item">
                  <span className="channel-label">PHONE DIRECT</span>
                  <a
                    href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                    className="channel-action-link"
                    aria-label={`Call ${profile.phone}`}
                  >
                    <span>{profile.phone}</span>
                    <ArrowUpRight size={22} />
                  </a>
                </div>
              </div>

              {/* Right Column: Professional Presence & Links */}
              <div className="contact-links-col">
                <span className="channel-label">PROFESSIONAL PROFILES</span>

                <div className="contact-links-list">
                  {profile.links.map((link) => {
                    const isPending = link.url.includes('TODO');
                    const isPortfolio = link.label === 'Portfolio';

                    return isPending ? (
                      <div
                        key={link.label}
                        className="profile-link-card"
                        title="Profile link pending setup"
                      >
                        <div className="link-label-group">
                          <ExternalLink size={15} opacity={0.6} />
                          <span>{link.label}</span>
                        </div>
                        <span className="pending-pill">PENDING SETUP</span>
                      </div>
                    ) : (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="profile-link-card active"
                      >
                        <div className="link-label-group">
                          {isPortfolio ? (
                            <Globe size={15} color="var(--color-orange-warm)" />
                          ) : (
                            <Mail size={15} color="var(--color-orange-warm)" />
                          )}
                          <span>{link.label}</span>
                        </div>
                        <span className="active-pill-tag">
                          <span>LIVE</span>
                          <ArrowUpRight size={12} style={{ display: 'inline', marginLeft: 4 }} />
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
