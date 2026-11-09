import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, ArrowRight, X } from 'lucide-react';
import './SectionNav.css';

interface SectionItem {
  id: string;
  label: string;
  short: string;
  index: string;
}

const sections: SectionItem[] = [
  { id: 'hero', label: 'Overview', short: 'Hero', index: '01' },
  { id: 'about', label: 'About', short: 'About', index: '02' },
  { id: 'experience', label: 'Experience', short: 'Roles', index: '03' },
  { id: 'projects', label: 'Featured Work', short: 'Work', index: '04' },
  { id: 'skills', label: 'Expertise', short: 'Skills', index: '05' },
  { id: 'philosophy', label: 'Philosophy', short: 'Approach', index: '06' },
  { id: 'certifications', label: 'Certifications', short: 'Certs', index: '07' },
  { id: 'contact', label: 'Get in Touch', short: 'Contact', index: '08' },
];

export const SectionNav: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('hero');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          if (scrollPosition >= el.offsetTop) {
            setActiveId(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when tapping/clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleMouseEnter = () => {
    if (window.matchMedia('(hover: hover)').matches) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.matchMedia('(hover: hover)').matches) {
      setIsOpen(false);
    }
  };

  const handlePillClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handlePillKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      setIsOpen((prev) => !prev);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const activeIndex = sections.findIndex((s) => s.id === activeId);
  const activeItem = sections[activeIndex] || sections[0];

  return (
    <>
      {/* Mobile Dim Backdrop when Card is Open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="quick-nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <aside
        ref={wrapperRef}
        className="quick-nav-wrapper"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label="Quick section navigator"
      >
        <AnimatePresence initial={false} mode="wait">
          {!isOpen ? (
            /* ============================================================
               COMPACT STATE: Vertical Pill with Vertical Name (Tap or Hover)
               ============================================================ */
            <motion.div
              key="compact"
              onClick={handlePillClick}
              onKeyDown={handlePillKeyDown}
              className="quick-nav-pill-vertical"
              initial={{ opacity: 0, scale: 0.94, x: 8 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.94, x: 8 }}
              transition={{ duration: 0.18 }}
              role="button"
              tabIndex={0}
              aria-label={`Current section: ${activeItem.label}. Tap to navigate.`}
            >
              <div className="pill-dot-wrap">
                <span className="pill-dot" />
              </div>
              <span className="pill-vertical-index">{activeItem.index}</span>
              <span className="pill-vertical-divider" />
              <span className="pill-vertical-label">{activeItem.short}</span>
            </motion.div>
          ) : (
            /* ============================================================
               EXPANDED STATE: Full Section Navigation Card
               ============================================================ */
            <motion.div
              key="expanded"
              className="quick-nav-card"
              initial={{ opacity: 0, scale: 0.96, x: 10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.96, x: 10 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Header */}
              <div className="card-header">
                <div className="card-header-left">
                  <Compass size={14} className="card-header-icon" />
                  <span className="card-header-title">SECTIONS</span>
                </div>
                <div className="card-header-right">
                  <span className="card-header-count">
                    {activeItem.index} / 08
                  </span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="card-close-btn"
                    aria-label="Close section menu"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              {/* Section Buttons List */}
              <div className="card-buttons-list">
                {sections.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`card-section-btn ${isActive ? 'btn-active' : ''}`}
                      aria-label={`Navigate to ${item.label}`}
                      aria-current={isActive ? 'true' : undefined}
                    >
                      <div className="btn-left">
                        <span className="btn-index">{item.index}</span>
                        <span className="btn-label">{item.label}</span>
                      </div>

                      {isActive ? (
                        <span className="btn-active-indicator">
                          <span className="active-dot" />
                        </span>
                      ) : (
                        <ArrowRight size={12} className="btn-hover-arrow" />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </aside>
    </>
  );
};
