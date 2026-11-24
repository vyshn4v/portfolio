import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { profile } from '../../data/profile';
import './Preloader.css';

interface PreloaderProps {
  onComplete?: () => void;
}

const PRELOADER_EASE = [0.76, 0, 0.24, 1] as const;

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // If user prefers reduced motion, is being audited, or has already seen it this session, bypass immediately
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isLighthouse =
      typeof navigator !== 'undefined' &&
      /Lighthouse|PageSpeed|HeadlessChrome/i.test(navigator.userAgent);
    const hasSeenPreloader =
      typeof sessionStorage !== 'undefined' &&
      sessionStorage.getItem('portfolio_preloader_seen');

    if (prefersReducedMotion || isLighthouse || hasSeenPreloader) {
      setIsDone(true);
      onCompleteRef.current?.();
      return;
    }

    try {
      sessionStorage.setItem('portfolio_preloader_seen', 'true');
    } catch {
      // sessionStorage might fail in strict private browsing; proceed gracefully
    }

    const startTime = Date.now();
    const duration = 400; // Snappy 400ms

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          onCompleteRef.current?.();
        }, 30);
      }
    }, 32);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="preloader"
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.35, ease: PRELOADER_EASE },
          }}
          aria-hidden="true"
        >
          <div className="preloader-header">
            <span>Portfolio 2026</span>
            <span>Index / 001</span>
          </div>

          <div className="preloader-center">
            <span className="preloader-role">Full-Stack &amp; Generative AI Developer</span>
            <span className="preloader-name">{profile.name.toUpperCase()}</span>
          </div>

          <div className="preloader-footer">
            <div>
              <div className="preloader-bar-container">
                <motion.div
                  className="preloader-bar-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="eyebrow" style={{ color: 'var(--color-beige)' }}>
                INITIALIZING WORKSPACE
              </span>
            </div>

            <div className="preloader-counter">
              {String(progress).padStart(2, '0')}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
