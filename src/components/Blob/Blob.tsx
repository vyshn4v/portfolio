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

  // Desktop subtle cursor parallax (10-16px)
  const parallaxX = isDesktop ? normalizedX * 16 : 0;
  const parallaxY = isDesktop ? normalizedY * 16 : 0;

  return (
    <motion.div
      className="blob-container"
      initial={{ scale: 0.7, opacity: 0, rotate: -6 }}
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
      aria-label="Artistic acrylic dry-brush stroke mark"
    >
      <svg
        viewBox="0 0 640 640"
        className="blob-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Authentic dry brush displacement filter */}
          <filter id="paintTearEdge" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.045 0.08"
              numOctaves="3"
              result="noise"
              seed="18"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="16"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          <filter id="bristleNoise" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.08 0.03"
              numOctaves="2"
              result="bNoise"
              seed="42"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="bNoise"
              scale="8"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          {/* Deep Teal Acrylic Paint Gradient matching image reference */}
          <linearGradient id="tealPaintGrad" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1C4542" />
            <stop offset="35%" stopColor="#255C57" />
            <stop offset="70%" stopColor="#2F6D68" />
            <stop offset="100%" stopColor="#3B7D77" />
          </linearGradient>

          {/* Warm Accent Under-stroke Gradient */}
          <linearGradient id="warmPaintGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-orange-warm)" />
            <stop offset="60%" stopColor="var(--color-orange)" />
            <stop offset="100%" stopColor="var(--color-rust)" />
          </linearGradient>
        </defs>

        <g className="brush-gesture-group">
          {/* --- LAYER 1: Warm Orange Accent Under-Pass (Depth & Contrast) --- */}
          <g className="orange-brush-accent" filter="url(#paintTearEdge)">
            <path
              d="M 120,440 
                 L 220,340 
                 L 380,210 
                 L 490,130 
                 L 535,100 
                 L 555,140 
                 L 495,195 
                 L 350,320 
                 L 210,430 
                 L 140,480 
                 Z"
              fill="url(#warmPaintGrad)"
              opacity="0.88"
              style={{ mixBlendMode: 'multiply' }}
            />
          </g>

          {/* --- LAYER 2: Main Broad Acrylic Dry-Brush Stroke in Deep Teal (Matching Reference) --- */}
          <g className="teal-brush-stroke" filter="url(#paintTearEdge)">
            {/* Broad sweeping diagonal acrylic swipe */}
            <path
              d="M 160,490 
                 L 235,385 
                 L 310,310 
                 L 425,190 
                 L 510,105 
                 L 550,85 
                 L 565,130 
                 L 530,170 
                 L 460,250 
                 L 380,345 
                 L 285,455 
                 L 205,535 
                 L 155,545 
                 Z"
              fill="url(#tealPaintGrad)"
              opacity="0.98"
            />

            {/* Upper feathered bristle flare matching the top-right stroke end in the Dribbble shot */}
            <path
              d="M 430,170 
                 L 520,70 
                 L 560,50 
                 L 580,85 
                 L 550,130 
                 L 470,215 
                 Z"
              fill="#22534F"
              opacity="0.92"
            />

            {/* Lower heavy paint deposit lobe */}
            <path
              d="M 180,430 
                 L 270,330 
                 L 360,240 
                 L 330,220 
                 L 220,320 
                 L 150,420 
                 Z"
              fill="#1D4744"
              opacity="0.85"
            />
          </g>

          {/* --- LAYER 3: Dry-Brush Bristle Streaks & Fine Texture Lines --- */}
          <g filter="url(#bristleNoise)" opacity="0.9">
            {/* Top-right feathered bristle tails */}
            <path
              d="M 525,60 L 595,25 
                 M 545,80 L 610,50 
                 M 560,110 L 620,85 
                 M 515,140 L 575,100"
              stroke="#255C57"
              strokeWidth="4"
              strokeLinecap="square"
            />

            {/* Bottom-left dry-brush bristle trails */}
            <path
              d="M 175,510 L 115,565 
                 M 195,535 L 140,590 
                 M 225,550 L 175,605 
                 M 150,470 L 95,520"
              stroke="#204E4A"
              strokeWidth="4.5"
              strokeLinecap="square"
            />

            {/* Center dry bristle gap cuts (creating realistic dry acrylic canvas pull) */}
            <path
              d="M 280,390 L 440,230 
                 M 240,430 L 390,290"
              stroke="var(--color-bg)"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity="0.3"
            />
          </g>

          {/* --- LAYER 4: Authentic Paint Splatter Droplets (Orbiting the stroke) --- */}
          <g opacity="0.9">
            {/* Upper spray droplets */}
            <circle cx="585" cy="40" r="5.5" fill="#255C57" />
            <circle cx="610" cy="70" r="3.5" fill="#1C4542" />
            <circle cx="540" cy="30" r="4" fill="var(--color-orange)" />
            <circle cx="490" cy="50" r="3" fill="#2F6D68" />

            {/* Lower spray droplets */}
            <circle cx="105" cy="545" r="5" fill="#255C57" />
            <circle cx="130" cy="580" r="3.5" fill="#1C4542" />
            <circle cx="85" cy="500" r="4" fill="var(--color-orange)" />
            <circle cx="150" cy="615" r="3" fill="#2F6D68" />
          </g>
        </g>
      </svg>
    </motion.div>
  );
};
