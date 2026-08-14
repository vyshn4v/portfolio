import React from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { profile } from '../../data/profile';
import './Footer.css';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const githubLink = profile.links.find((l) => l.label === 'GitHub');
  const leetcodeLink = profile.links.find((l) => l.label === 'LeetCode');

  return (
    <footer className="footer-container" aria-label="Site Footer">
      <div className="container footer-inner">
        {/* Left: Identity & Copyright */}
        <div className="footer-left">
          <span className="footer-brand">{profile.name}</span>
          <span className="footer-role">/ BACKEND SDE</span>
          <span className="footer-center">© {currentYear}</span>
        </div>

        {/* Center: Quick Dev Profiles */}
        <div className="footer-links-group">
          {githubLink && !githubLink.url.includes('TODO') && (
            <a
              href={githubLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-profile-link"
              aria-label="GitHub Profile"
            >
              <span>GITHUB</span>
              <ArrowUpRight size={11} />
            </a>
          )}
          {leetcodeLink && !leetcodeLink.url.includes('TODO') && (
            <a
              href={leetcodeLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-profile-link"
              aria-label="LeetCode Profile"
            >
              <span>LEETCODE</span>
              <ArrowUpRight size={11} />
            </a>
          )}
        </div>

        {/* Right: Back to Top Trigger */}
        <div className="footer-right">
          <button
            onClick={scrollToTop}
            className="footer-back-top"
            aria-label="Back to top of page"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
};
