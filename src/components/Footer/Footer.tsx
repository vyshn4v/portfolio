import React from 'react';
import { ArrowUp, ArrowUpRight, Sparkles, MapPin, Mail, Phone } from 'lucide-react';
import { profile } from '../../data/profile';
import './Footer.css';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const linkedinLink = profile.links.find((l) => l.label === 'LinkedIn');
  const githubLink = profile.links.find((l) => l.label === 'GitHub');
  const leetcodeLink = profile.links.find((l) => l.label === 'LeetCode');
  const lixerLabLink = profile.links.find((l) => l.label === 'LixerLab') || {
    label: 'LixerLab',
    url: 'https://lixerlab.vyshnavpc.com/',
  };

  return (
    <footer className="footer-container" aria-label="Site Footer">
      <div className="container footer-content-wrap">
        {/* Top Big Footer Grid */}
        <div className="footer-grid">
          {/* Col 1: Brand & Bio */}
          <div className="footer-col footer-col-brand">
            <div className="footer-brand-header">
              <img src="/navbar_logo.png" alt={profile.name} className="footer-logo-img" />
              <div className="footer-availability-badge">
                <span className="pulse-dot" />
                <span>Available for Projects</span>
              </div>
            </div>
            <p className="footer-brand-bio">
              Software engineer crafting high-throughput backend services, distributed systems, and resilient cloud architectures.
            </p>
            <div className="footer-meta-info">
              <span className="footer-meta-item">
                <MapPin size={13} />
                <span>{profile.location}</span>
              </span>
            </div>
          </div>

          {/* Col 2: Services & Agency */}
          <div className="footer-col footer-col-services">
            <span className="footer-col-title">SERVICES</span>
            <div className="footer-agency-card">
              <a
                href={lixerLabLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="agency-card-link"
                aria-label="LixerLab Agency Website"
              >
                <div className="agency-card-header">
                  <div className="agency-title-row">
                    <Sparkles size={14} className="agency-icon" />
                    <span className="agency-name">LixerLab</span>
                    <span className="agency-badge">Agency</span>
                  </div>
                  <ArrowUpRight size={15} className="agency-arrow" />
                </div>
                <p className="agency-description">
                  My digital agency initiative delivering full-stack solutions, high-performance backends, and digital products.
                </p>
                <span className="agency-domain">lixerlab.vyshnavpc.com</span>
              </a>
            </div>

            <ul className="footer-services-list">
              <li>Agentic AI Development</li>
              <li>Backend &amp; API Architecture</li>
              <li>Distributed Systems &amp; Queues</li>
              <li>Database Design &amp; Optimization</li>
              <li>End-to-End Product Engineering</li>
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div className="footer-col footer-col-nav">
            <span className="footer-col-title">EXPLORE</span>
            <nav className="footer-nav-links" aria-label="Footer Navigation">
              <a href="#about" className="footer-nav-link">About</a>
              <a href="#experience" className="footer-nav-link">Experience</a>
              <a href="#projects" className="footer-nav-link">Featured Work</a>
              <a href="#skills" className="footer-nav-link">Expertise</a>
              <a href="#certifications" className="footer-nav-link">Certifications</a>
              <a href="#contact" className="footer-nav-link">Contact</a>
            </nav>
          </div>

          {/* Col 4: Connect & Direct Contact */}
          <div className="footer-col footer-col-connect">
            <span className="footer-col-title">CONNECT</span>
            <div className="footer-direct-contacts">
              <a href={`mailto:${profile.email}`} className="footer-contact-link">
                <Mail size={14} />
                <span>{profile.email}</span>
              </a>
              <a href={`tel:${profile.phone.replace(/\s+/g, '')}`} className="footer-contact-link">
                <Phone size={14} />
                <span>{profile.phone}</span>
              </a>
            </div>

            <div className="footer-social-pills">
              {linkedinLink && (
                <a
                  href={linkedinLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-pill"
                  aria-label="LinkedIn Profile"
                >
                  <span>LINKEDIN</span>
                  <ArrowUpRight size={11} />
                </a>
              )}
              {githubLink && (
                <a
                  href={githubLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-pill"
                  aria-label="GitHub Profile"
                >
                  <span>GITHUB</span>
                  <ArrowUpRight size={11} />
                </a>
              )}
              {leetcodeLink && (
                <a
                  href={leetcodeLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-pill"
                  aria-label="LeetCode Profile"
                >
                  <span>LEETCODE</span>
                  <ArrowUpRight size={11} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="footer-bottom-bar">
          <div className="footer-bottom-left">
            <span className="footer-copyright">
              © {currentYear} {profile.name}. All rights reserved.
            </span>
            <span className="footer-divider">•</span>
            <span className="footer-tech-tag">Built with React &amp; TypeScript</span>
          </div>

          <div className="footer-bottom-right">
            <button
              onClick={scrollToTop}
              className="footer-bubble-btn"
              aria-label="Back to top"
              title="Back to top"
            >
              <ArrowUp size={14} />
              <span>TOP</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
