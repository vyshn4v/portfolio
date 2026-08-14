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

  // Desktop subtle cursor parallax (10-18px)
  const parallaxX = isDesktop ? normalizedX * 16 : 0;
  const parallaxY = isDesktop ? normalizedY * 16 : 0;

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
        x: { type: 'spring', damping: 32, stiffness: 160, mass: 0.6 },
        y: { type: 'spring', damping: 32, stiffness: 160, mass: 0.6 },
      }}
      aria-label="Hand-painted brush stroke gesture"
    >
      <svg
        viewBox="0 0 600 600"
        className="blob-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* SVG turbulence + displacement filter for authentic rough/torn paper and brush edges */}
          <filter id="tornBrushEdge" x="-15%" y="-15%" width="130%" height="130%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04 0.07"
              numOctaves="3"
              result="noise"
              seed="12"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="15"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          <filter id="subtleBrushEdge" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.05 0.09"
              numOctaves="2"
              result="noise2"
              seed="27"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise2"
              scale="10"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          <linearGradient id="brushOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-orange-warm)" />
            <stop offset="40%" stopColor="var(--color-orange)" />
            <stop offset="100%" stopColor="#C95F06" />
          </linearGradient>

          <linearGradient id="brushRustGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-rust)" />
            <stop offset="100%" stopColor="#8A320C" />
          </linearGradient>
        </defs>

        <g className="brush-gesture-group">
          {/* ============================================================
              PASS 1: Secondary Muted Green Stroke (~ -25° diagonal sweep)
              Layered behind for depth, subtle translucent undertone
             ============================================================ */}
          <g className="brush-stroke-green" filter="url(#subtleBrushEdge)">
            <path
              d="M 110,380 
                 L 175,295 
                 L 330,175 
                 L 435,115 
                 L 485,95 
                 L 510,135 
                 L 455,175 
                 L 310,285 
                 L 190,385 
                 L 125,435 
                 Z"
              fill="var(--color-green)"
              opacity="0.75"
              style={{ mixBlendMode: 'multiply' }}
            />
            {/* Dry-brush bristle trails along the green stroke */}
            <path
              d="M 470,85 L 530,120 M 100,405 L 140,445"
              stroke="var(--color-green)"
              strokeWidth="4"
              strokeLinecap="square"
              opacity="0.6"
            />
          </g>

          {/* ============================================================
              PASS 2: Secondary Deep Rust Stroke (~ +15° diagonal angle)
              Broad, heavy, dry-paint marker texture layered across
             ============================================================ */}
          <g className="brush-stroke-rust" filter="url(#tornBrushEdge)">
            <path
              d="M 85,210 
                 L 220,245 
                 L 395,305 
                 L 505,370 
                 L 490,445 
                 L 430,440 
                 L 275,375 
                 L 145,305 
                 L 70,265 
                 Z"
              fill="url(#brushRustGrad)"
              opacity="0.82"
              style={{ mixBlendMode: 'multiply' }}
            />
            {/* Dry bristle streaks */}
            <path
              d="M 60,250 L 110,270 M 470,415 L 525,450"
              stroke="var(--color-rust)"
              strokeWidth="5"
              strokeLinecap="butt"
              opacity="0.7"
            />
          </g>

          {/* ============================================================
              PASS 3: Primary Bold Orange Marker Swipe (~ -45° diagonal)
              The main, confident foreground gesture across the hero space
             ============================================================ */}
          <g className="brush-stroke-orange" filter="url(#tornBrushEdge)">
            {/* Main broad diagonal stroke with varied thickness and torn edges */}
            <path
              d="M 135,120 
                 L 245,175 
                 L 390,275 
                 L 490,390 
                 L 460,475 
                 L 395,490 
                 L 270,395 
                 L 165,280 
                 L 90,175 
                 Z"
              fill="url(#brushOrangeGrad)"
              opacity="0.96"
            />

            {/* Inner warm highlighter layer / fiber texture gap */}
            <path
              d="M 170,165 
                 L 270,235 
                 L 380,335 
                 L 440,430 
                 L 415,455 
                 L 360,425 
                 L 260,325 
                 L 165,225 
                 Z"
              fill="var(--color-orange-warm)"
              opacity="0.85"
            />

            {/* Confident dry-brush bristle tails at both ends */}
            <path
              d="M 105,100 L 155,145 
                 M 80,140 L 125,175 
                 M 470,470 L 515,510 
                 M 445,495 L 485,530"
              stroke="var(--color-orange)"
              strokeWidth="6"
              strokeLinecap="square"
              opacity="0.9"
            />
          </g>
        </g>
      </svg>
    </motion.div>
  );
};
