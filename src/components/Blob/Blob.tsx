import React from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '../../hooks/useMousePosition';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import './Blob.css';

interface BlobProps {
  delay?: number; // default 1.8s (1800ms)
}

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const Blob: React.FC<BlobProps> = ({ delay = 1.8 }) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const { normalizedX, normalizedY } = useMousePosition();

  // Desktop-only subtle cursor parallax (10-20px)
  const parallaxX = isDesktop ? normalizedX * 18 : 0;
  const parallaxY = isDesktop ? normalizedY * 18 : 0;

  return (
    <motion.div
      className="blob-container"
      initial={{ scale: 0.7, opacity: 0, rotate: -8 }}
      animate={{
        scale: 1,
        opacity: 1,
        rotate: 0,
        x: parallaxX,
        y: parallaxY,
      }}
      transition={{
        scale: { duration: 1.2, delay, ease: EASE_OUT },
        opacity: { duration: 1.2, delay, ease: EASE_OUT },
        rotate: { duration: 1.2, delay, ease: EASE_OUT },
        x: { type: 'spring', damping: 30, stiffness: 200, mass: 0.5 },
        y: { type: 'spring', damping: 30, stiffness: 200, mass: 0.5 },
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 500 500"
        className="blob-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="orangeGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="var(--color-orange-warm)" />
            <stop offset="100%" stopColor="var(--color-orange)" />
          </radialGradient>
          <radialGradient id="rustGrad" cx="40%" cy="30%" r="70%">
            <stop offset="0%" stopColor="var(--color-orange)" />
            <stop offset="100%" stopColor="var(--color-rust)" />
          </radialGradient>
          <radialGradient id="greenGrad" cx="30%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#8DA8A3" />
            <stop offset="100%" stopColor="var(--color-green)" />
          </radialGradient>
          <filter id="softBlur" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* Layer 1: Soft Beige Back-Splash */}
        <g className="blob-layer-1">
          <path
            d="M 120,80 C 230,30 380,60 430,160 C 480,260 440,390 350,440 C 260,490 120,460 65,370 C 10,280 10,130 120,80 Z"
            fill="var(--color-beige)"
            opacity="0.35"
            style={{ mixBlendMode: 'multiply' }}
          />
        </g>

        {/* Layer 2: Muted Green Flowing Geometry */}
        <g className="blob-layer-2">
          <path
            d="M 140,110 C 240,60 370,100 400,200 C 430,300 370,410 270,430 C 170,450 70,390 50,290 C 30,190 40,160 140,110 Z"
            fill="url(#greenGrad)"
            opacity="0.75"
            style={{ mixBlendMode: 'multiply' }}
          />
        </g>

        {/* Layer 3: Rust Base Anchor */}
        <g className="blob-layer-3">
          <path
            d="M 170,130 C 270,90 380,140 390,240 C 400,340 330,420 230,410 C 130,400 80,330 70,230 C 60,130 70,170 170,130 Z"
            fill="url(#rustGrad)"
            opacity="0.9"
            style={{ mixBlendMode: 'multiply' }}
          />
        </g>

        {/* Layer 4: Primary Vibrant Orange Shape */}
        <g className="blob-layer-4">
          <path
            d="M 190,150 C 280,120 370,170 375,260 C 380,350 300,410 210,395 C 120,380 90,300 105,210 C 120,120 100,180 190,150 Z"
            fill="url(#orangeGrad)"
            opacity="0.95"
          />
        </g>

        {/* Layer 5: Warm Accent Core with tactile cutout & accents */}
        <g className="blob-layer-5">
          <path
            d="M 220,180 C 290,150 340,190 350,250 C 360,310 310,360 250,360 C 190,360 150,310 160,250 C 170,190 150,210 220,180 Z"
            fill="var(--color-orange-warm)"
            opacity="0.8"
          />
          {/* Subtle editorial organic contour mark */}
          <path
            d="M 210,210 C 260,190 290,210 310,250 C 330,290 300,320 270,330"
            stroke="var(--color-bg)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />
        </g>
      </svg>
    </motion.div>
  );
};
