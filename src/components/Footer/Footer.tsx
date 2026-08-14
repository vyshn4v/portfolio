import React from 'react';
import { ArrowUp } from 'lucide-react';
import { profile } from '../../data/profile';
import './Footer.css';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-container" aria-label="Site Footer">
      <div className="container footer-inner">
        {/* Left: Identity & Copyright */}
        <div className="footer-left">
          <span className="footer-brand">{profile.name}</span>
          <span className="footer-role">/ BACKEND SDE</span>
          <span className="footer-center">© {currentYear}</span>
        </div>

        {/* Center: Technical Stack Note */}
        <div className="footer-center">
          <span>STACK:</span>
          <span className="footer-stack-badge">
            React · TypeScript · Vite · Framer Motion
          </span>
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
