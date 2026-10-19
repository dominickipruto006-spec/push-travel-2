import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'header';
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'light',
  size = 'md',
}) => {
  // Dimensions
  const dims = {
    sm: { height: 42, width: 170 },
    md: { height: 56, width: 220 },
    lg: { height: 74, width: 280 },
  }[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Dynamic Push World Globe & Jet Emblem */}
      <svg
        width={dims.height}
        height={dims.height}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-md"
      >
        <defs>
          {/* Globe Ocean Gradient */}
          <radialGradient id="globeGrad" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="35%" stopColor="#1d4ed8" />
            <stop offset="85%" stopColor="#0a256e" />
            <stop offset="100%" stopColor="#041238" />
          </radialGradient>

          {/* Orange Orbit Gradient */}
          <linearGradient id="orbitGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ea580c" />
            <stop offset="50%" stopColor="#ff7b00" />
            <stop offset="100%" stopColor="#ffb703" />
          </linearGradient>

          {/* Royal Blue Ring Gradient */}
          <linearGradient id="ringBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="50%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#091b4a" />
          </linearGradient>
        </defs>

        {/* Outer Orbit Swoosh - Blue */}
        <path
          d="M 14 62 C 10 40 28 20 54 18 C 76 16 92 28 88 44 C 84 56 68 62 48 60"
          stroke="url(#ringBlueGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />

        {/* Globe Body */}
        <circle cx="50" cy="46" r="28" fill="url(#globeGrad)" />

        {/* Continents Graphic (Stylized Africa & Eurasia) */}
        <path
          d="M 44 26 C 46 24 53 23 58 26 C 62 28 66 33 63 38 C 61 41 57 41 55 46 C 53 50 55 57 52 64 C 48 65 47 62 45 56 C 43 51 40 48 39 44 C 38 39 42 36 44 32 Z"
          fill="#ffffff"
          opacity="0.95"
        />
        <path
          d="M 32 30 C 35 28 38 31 36 35 C 33 37 30 35 32 30 Z"
          fill="#ffffff"
          opacity="0.9"
        />
        <circle cx="64" cy="48" r="2.5" fill="#ffffff" opacity="0.85" />

        {/* Front Orange Sweeping Orbit with Jet */}
        <path
          d="M 18 56 C 26 74 60 78 84 52"
          stroke="url(#orbitGrad)"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 22 55 C 30 70 58 74 80 52"
          stroke="#fff"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />

        {/* Supersonic Jet Airplane */}
        <g transform="translate(80, 48) rotate(-35) scale(0.9)">
          <path
            d="M 0 0 L 12 -2 L 18 0 L 12 2 Z"
            fill="#ff7700"
          />
          {/* Main Wings */}
          <path
            d="M 6 -1 L 0 -10 L 4 -10 L 10 -1 Z"
            fill="#ea580c"
          />
          <path
            d="M 6 1 L 0 10 L 4 10 L 10 1 Z"
            fill="#ff8800"
          />
          {/* Tail Fin */}
          <path
            d="M 15 -0.5 L 12 -5 L 14 -5 L 17 0 Z"
            fill="#ea580c"
          />
        </g>
      </svg>

      {/* Typography Lockup */}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-baseline gap-1 font-['Outfit',sans-serif]">
          {/* PUSH */}
          <span
            className="text-2xl font-black tracking-tight drop-shadow-sm bg-gradient-to-b from-[#1e40af] via-[#1d4ed8] to-[#0a256e] bg-clip-text text-transparent"
            style={{ WebkitTextStroke: '0.3px #04143a' }}
          >
            PUSH
          </span>
          {/* WORLD */}
          <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-[#ea580c] via-[#ff7700] to-[#f59e0b] bg-clip-text text-transparent drop-shadow-sm">
            WORLD
          </span>
        </div>

        {/* TRAVEL LTD Sub-bar */}
        <div className="flex items-center gap-1.5 my-0.5">
          <span className="h-[1.5px] w-3 bg-[#ea580c] rounded-full"></span>
          <span className={`text-[10px] font-extrabold tracking-[0.22em] uppercase ${variant === 'dark' ? 'text-blue-200' : 'text-[#0a256e]'}`}>
            TRAVEL LTD
          </span>
          <span className="h-[1.5px] w-3 bg-[#ea580c] rounded-full"></span>
        </div>

        {/* Script Tagline: Your World. Our Journey. */}
        <span
          className={`text-[11px] font-semibold italic tracking-wide ${
            variant === 'dark' ? 'text-amber-300' : 'text-[#ea580c]'
          }`}
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Your World. Our Journey. ✈
        </span>
      </div>
    </div>
  );
};
