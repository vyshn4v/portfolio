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

  // Desktop cursor parallax (12-20px)
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
        x: { type: 'spring', damping: 30, stiffness: 180, mass: 0.6 },
        y: { type: 'spring', damping: 30, stiffness: 180, mass: 0.6 },
      }}
      aria-label="Abstract organic fluid splash illustration"
    >
      <svg
        viewBox="0 0 560 560"
        className="blob-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="splashOrange" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-orange-warm)" />
            <stop offset="50%" stopColor="var(--color-orange)" />
            <stop offset="100%" stopColor="var(--color-rust)" />
          </linearGradient>

          <linearGradient id="splashGreen" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-green)" />
            <stop offset="100%" stopColor="#8EAAA4" />
          </linearGradient>

          <linearGradient id="splashRust" x1="10%" y1="20%" x2="90%" y2="90%">
            <stop offset="0%" stopColor="var(--color-rust)" />
            <stop offset="100%" stopColor="#8A320C" />
          </linearGradient>

          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- Background Ambient Glow / Shadow Layer --- */}
        <g className="blob-layer-back">
          {/* Broad soft sand splash */}
          <path
            d="M 170,90 C 290,40 440,70 480,180 C 520,290 490,420 390,480 C 290,540 140,500 70,400 C 0,300 20,150 170,90 Z"
            fill="var(--color-beige)"
            opacity="0.3"
            style={{ mixBlendMode: 'multiply' }}
          />
        </g>

        {/* --- Sage Green Fluid Tendril & Counter-Weight Layer --- */}
        <g className="blob-layer-green">
          <path
            d="M 120,140 C 210,90 320,110 370,190 C 420,270 380,380 300,430 C 220,480 110,450 60,370 C 10,290 30,190 120,140 Z"
            fill="url(#splashGreen)"
            opacity="0.8"
            style={{ mixBlendMode: 'multiply' }}
          />
        </g>

        {/* --- Deep Burnt Rust Foundation Layer --- */}
        <g className="blob-layer-rust">
          {/* Main asymmetrical body with dynamic fluid lobes */}
          <path
            d="M 210,120 C 330,80 430,130 460,240 C 490,350 420,450 310,460 C 200,470 120,410 100,310 C 80,210 110,150 210,120 Z"
            fill="url(#splashRust)"
            opacity="0.92"
            style={{ mixBlendMode: 'multiply' }}
          />
        </g>

        {/* --- Primary Vibrant Orange Splash Form --- */}
        <g className="blob-layer-orange">
          {/* Expressive fluid organic splash with organic sweeping tendrils */}
          <path
            d="M 230,135 C 340,100 420,155 435,255 C 450,355 375,435 270,430 C 165,425 125,345 135,245 C 145,155 155,160 230,135 Z"
            fill="url(#splashOrange)"
            opacity="0.98"
          />

          {/* Upper extended fluid crest */}
          <path
            d="M 310,145 C 360,110 405,130 415,185 C 425,240 370,260 330,240 C 290,220 280,170 310,145 Z"
            fill="var(--color-orange-warm)"
            opacity="0.9"
          />
        </g>

        {/* --- Warm Amber Inner Detail & Handcrafted Organic Gestures --- */}
        <g className="blob-layer-accent">
          {/* Center illuminated amber lobe */}
          <path
            d="M 260,190 C 330,160 380,200 385,270 C 390,340 335,380 270,380 C 205,380 185,320 195,260 C 205,200 215,210 260,190 Z"
            fill="var(--color-orange-warm)"
            opacity="0.75"
          />

          {/* Sweeping editorial vector calligraphic cut */}
          <path
            d="M 220,230 C 280,195 330,225 350,285 C 370,345 325,370 285,385"
            stroke="var(--color-bg)"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
          />

          {/* Secondary micro organic accent */}
          <circle cx="340" cy="230" r="6" fill="var(--color-bg)" opacity="0.7" />
        </g>

        {/* --- Orbiting Paint Splash Droplets & Splatter Particles --- */}
        {/* Droplet 1: Top right outer splash drop */}
        <g className="droplet-1">
          <ellipse
            cx="475"
            cy="140"
            rx="14"
            ry="18"
            transform="rotate(25 475 140)"
            fill="var(--color-orange)"
            opacity="0.9"
          />
        </g>

        {/* Droplet 2: Small upper splatter bead */}
        <g className="droplet-2">
          <circle cx="430" cy="85" r="7" fill="var(--color-rust)" opacity="0.85" />
        </g>

        {/* Droplet 3: Bottom left trailing droplet */}
        <g className="droplet-3">
          <ellipse
            cx="95"
            cy="410"
            rx="12"
            ry="16"
            transform="rotate(-30 95 410)"
            fill="var(--color-orange-warm)"
            opacity="0.9"
          />
        </g>

        {/* Droplet 4: Far left tiny ink splatter speck */}
        <g className="droplet-4">
          <circle cx="65" cy="270" r="6" fill="var(--color-green)" opacity="0.85" />
        </g>

        {/* Droplet 5: Bottom right accent droplet */}
        <g className="droplet-5">
          <circle cx="435" cy="460" r="10" fill="var(--color-orange)" opacity="0.9" />
          <circle cx="460" cy="485" r="4.5" fill="var(--color-rust)" opacity="0.75" />
        </g>
      </svg>
    </motion.div>
  );
};
