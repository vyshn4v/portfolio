import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import './Navigation.css';

interface NavigationProps {
  delay?: number;
}

const navItems = [
  { label: 'ABOUT', href: '#about' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'WORK', href: '#projects' },
  { label: 'EXPERTISE', href: '#skills' },
];

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
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="container nav-container">
        <div className="nav-brand">
          <a href="#" className="nav-logo" aria-label="Vyshnav P C Home">
            <span>VYSHNAV P C</span>
          </a>
          <div className="status-badge" title="Status: Available for SDE / Backend roles">
            <span className="status-dot" />
            <span>AVAILABLE FOR ROLES</span>
          </div>
        </div>

        <nav className="nav-links" aria-label="Main Navigation">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="nav-cta">
          <span>CONTACT</span>
          <ArrowUpRight size={14} />
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
                className="nav-link"
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
            <a href="#contact" className="nav-cta" onClick={closeMenu}>
              <span>GET IN TOUCH</span>
              <ArrowUpRight size={14} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
