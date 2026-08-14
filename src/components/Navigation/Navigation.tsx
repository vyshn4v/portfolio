import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { profile } from '../../data/profile';
import './Navigation.css';

interface NavigationProps {
  delay?: number;
}

const navItems = [
  { label: 'ABOUT', href: '#about', active: true },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'WORK', href: '#projects' },
  { label: 'EXPERTISE', href: '#skills' },
];

const NAV_EASE = [0.16, 1, 0.3, 1] as const;

export const Navigation: React.FC<NavigationProps> = ({ delay = 1.2 }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <motion.header
      className="navbar"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.8,
        delay,
        ease: NAV_EASE,
      }}
    >
      <div className="container nav-container">
        {/* Brand Logo */}
        <div className="nav-brand">
          <a href="#" className="nav-logo" aria-label="Vyshnav Home">
            <span>Vyshnav</span>
            <span className="logo-dot">.</span>
          </a>
        </div>

        {/* Center Pill-Style Navigation */}
        <nav className="nav-center-links" aria-label="Main Navigation">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`nav-item-link ${item.active ? 'active-pill' : ''}`}
            >
              {item.active ? `( ${item.label} )` : item.label}
            </a>
          ))}
        </nav>

        {/* Right Phone Contact */}
        <div className="nav-right-contact">
          <a href={`tel:${profile.phone.replace(/\s+/g, '')}`} className="nav-phone-text">
            {profile.phone}
          </a>
          <a
            href={`tel:${profile.phone.replace(/\s+/g, '')}`}
            className="nav-round-btn"
            aria-label="Call Vyshnav"
          >
            <Phone size={15} />
          </a>

          <button
            className="mobile-toggle"
            onClick={toggleMenu}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="nav-item-link"
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
            <a
              href={`tel:${profile.phone.replace(/\s+/g, '')}`}
              className="nav-item-link"
              onClick={closeMenu}
              style={{ color: 'var(--color-orange)' }}
            >
              Call: {profile.phone}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
