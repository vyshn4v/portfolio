import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

interface PreloaderProps {
  onComplete?: () => void;
}

const PRELOADER_EASE = [0.76, 0, 0.24, 1] as const;

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 900; // 900ms progress duration, 100ms finish

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          onComplete?.();
        }, 100);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="preloader"
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.6, ease: PRELOADER_EASE },
          }}
          aria-hidden="true"
        >
          <div className="preloader-header">
            <span>Portfolio 2026</span>
            <span>Index / 001</span>
          </div>

          <div className="preloader-center">
            <span className="preloader-role">Backend Developer</span>
            <h1 className="preloader-name">VYSHNAV P C</h1>
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
