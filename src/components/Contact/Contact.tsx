import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Globe, ExternalLink } from 'lucide-react';
import { profile } from '../../data/profile';
import './Contact.css';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const GithubIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LeetCodeIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .271 4.735 5.26 5.26 0 0 0 2.285 2.237l3.855 2.227 4.246 2.451a1.374 1.374 0 0 0 2.062-1.189 1.374 1.374 0 0 0-.687-1.19l-4.246-2.451-3.855-2.227a2.513 2.513 0 0 1-1.091-1.069 2.64 2.64 0 0 1-.129-2.261 2.513 2.513 0 0 1 .577-1.005l3.854-4.126 5.406-5.788A1.374 1.374 0 0 0 13.483 0z" />
  </svg>
);

const LinkedinIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

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
                    const isGitHub = link.label === 'GitHub';
                    const isLeetCode = link.label === 'LeetCode';
                    const isLinkedIn = link.label === 'LinkedIn';
                    const isPortfolio = link.label === 'Portfolio';

                    const renderIcon = () => {
                      if (isGitHub) return <GithubIcon />;
                      if (isLeetCode) return <LeetCodeIcon />;
                      if (isLinkedIn) return <LinkedinIcon />;
                      if (isPortfolio) return <Globe size={16} />;
                      return <ExternalLink size={16} />;
                    };

                    return isPending ? (
                      <div
                        key={link.label}
                        className="profile-link-card"
                        title={`${link.label} profile link pending setup`}
                      >
                        <div className="link-label-group">
                          <span style={{ opacity: 0.6, display: 'inline-flex' }}>
                            {renderIcon()}
                          </span>
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
                        aria-label={`Visit ${link.label} profile`}
                      >
                        <div className="link-label-group">
                          <span style={{ color: 'var(--color-orange-warm)', display: 'inline-flex' }}>
                            {renderIcon()}
                          </span>
                          <span>{link.label}</span>
                        </div>
                        <span className="active-pill-tag">
                          <span>VISIT</span>
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
