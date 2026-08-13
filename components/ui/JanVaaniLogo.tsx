'use client';

import React from 'react';

export type LogoVariant =
  | 'primary' // Horizontal: Symbol + JanVaani
  | 'stacked' // Vertical: Symbol on top, JanVaani below
  | 'icon' // Submark: Symbol only
  | 'compact' // Compact horizontal for header nav
  | 'watermark' // Low opacity watermark
  | 'social'; // Square social media tile

export type LogoColorMode =
  | 'full' // Official 4-color (Blue #0066FF, Navy #0A1F44, Green #16A34A, Orange #FF7A00, Purple for tagline)
  | 'dark' // Dark mode surface (#0A1F44 background)
  | 'white' // Pure white monochrome
  | 'navy' // Deep navy monochrome (#0A1F44)
  | 'black'; // Black monochrome

export interface JanVaaniLogoProps {
  variant?: LogoVariant;
  colorMode?: LogoColorMode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'hero';
  showTagline?: boolean;
  showSecondaryLine?: boolean;
  className?: string;
}

export function JanVaaniSymbol({
  colorMode = 'full',
  size = 48,
  className = '',
}: {
  colorMode?: LogoColorMode;
  size?: number;
  className?: string;
}) {
  // Color tokens
  let blue = '#0066FF';
  let orange = '#FF7A00';
  let green = '#16A34A';
  let micColor = '#0066FF';

  if (colorMode === 'white') {
    blue = '#FFFFFF';
    orange = '#FFFFFF';
    green = '#FFFFFF';
    micColor = '#FFFFFF';
  } else if (colorMode === 'navy') {
    blue = '#0A1F44';
    orange = '#0A1F44';
    green = '#0A1F44';
    micColor = '#0A1F44';
  } else if (colorMode === 'black') {
    blue = '#000000';
    orange = '#000000';
    green = '#000000';
    micColor = '#000000';
  } else if (colorMode === 'dark') {
    blue = '#38A4F8';
    orange = '#FF9433';
    green = '#22C55E';
    micColor = '#38A4F8';
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform ${className}`}
      aria-label="JanVaani Official Symbol"
    >
      {/* 1. Primary Civic Blue Main Outer Ring Arc (Top-Left 270 deg) */}
      <path
        d="M 60 12 
           A 48 48 0 1 0 94 94
           L 94 94"
        stroke={blue}
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
      />

      {/* 2. Energy Action Orange Accent Segment (Right Arc) */}
      <path
        d="M 108 60 
           A 48 48 0 0 1 97 86"
        stroke={orange}
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
      />

      {/* 3. Growth & Community Green Speech Bubble Tail (Bottom-Right) */}
      <path
        d="M 60 108 
           L 106 108 
           L 96 82 
           A 48 48 0 0 1 60 108 Z"
        fill={green}
      />

      {/* 4. Internal Civic Voice Microphone */}
      {/* Mic Capsule */}
      <rect
        x="51"
        y="34"
        width="18"
        height="32"
        rx="9"
        fill={micColor}
      />

      {/* Mic U-Shape Cradle */}
      <path
        d="M 42 48 
           C 42 66, 78 66, 78 48"
        stroke={micColor}
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Mic Vertical Stem */}
      <path
        d="M 60 66 L 60 78"
        stroke={micColor}
        strokeWidth="4.5"
        strokeLinecap="round"
      />

      {/* Mic Base Bar */}
      <path
        d="M 49 78 L 71 78"
        stroke={micColor}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function JanVaaniLogo({
  variant = 'primary',
  colorMode = 'full',
  size = 'md',
  showTagline = true,
  showSecondaryLine = false,
  className = '',
}: JanVaaniLogoProps) {
  // Size mapping
  const symbolSizeMap = {
    xs: 28,
    sm: 36,
    md: 48,
    lg: 60,
    xl: 76,
    '2xl': 96,
    hero: 120,
  };

  const currentSymbolSize = symbolSizeMap[size] || 48;

  // Typography color tokens
  let janColor = 'text-[#0A1F44]';
  let vaaniColor = 'text-[#0066FF]';
  let dotColor = '#FF7A00';
  let taglineColor = 'text-slate-600';
  let secondaryColor = 'text-slate-500';

  if (colorMode === 'white') {
    janColor = 'text-white';
    vaaniColor = 'text-white';
    dotColor = '#FFFFFF';
    taglineColor = 'text-slate-300';
    secondaryColor = 'text-slate-400';
  } else if (colorMode === 'navy') {
    janColor = 'text-[#0A1F44]';
    vaaniColor = 'text-[#0A1F44]';
    dotColor = '#0A1F44';
    taglineColor = 'text-[#0A1F44]';
    secondaryColor = 'text-[#0A1F44]';
  } else if (colorMode === 'black') {
    janColor = 'text-black';
    vaaniColor = 'text-black';
    dotColor = '#000000';
    taglineColor = 'text-black';
    secondaryColor = 'text-black';
  } else if (colorMode === 'dark') {
    janColor = 'text-white';
    vaaniColor = 'text-[#38A4F8]';
    dotColor = '#FF9433';
    taglineColor = 'text-slate-300';
    secondaryColor = 'text-slate-400';
  }

  // Text sizes
  const titleSizeClass =
    size === 'xs'
      ? 'text-base'
      : size === 'sm'
      ? 'text-lg'
      : size === 'md'
      ? 'text-2xl sm:text-3xl'
      : size === 'lg'
      ? 'text-3xl sm:text-4xl'
      : size === 'xl'
      ? 'text-4xl sm:text-5xl'
      : size === '2xl'
      ? 'text-5xl sm:text-6xl'
      : 'text-6xl sm:text-7xl';

  const taglineSizeClass =
    size === 'xs' || size === 'sm'
      ? 'text-[9px]'
      : size === 'md'
      ? 'text-xs sm:text-sm'
      : size === 'lg'
      ? 'text-sm sm:text-base'
      : 'text-base sm:text-lg';

  // 1. SUBMARK / ICON-ONLY VARIANT
  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <JanVaaniSymbol colorMode={colorMode} size={currentSymbolSize} />
      </div>
    );
  }

  // 2. SOCIAL MEDIA SQUARE TILE
  if (variant === 'social') {
    const bgClass =
      colorMode === 'white'
        ? 'bg-white'
        : colorMode === 'dark' || colorMode === 'navy'
        ? 'bg-[#0A1F44]'
        : 'bg-slate-900';

    return (
      <div
        className={`w-full aspect-square rounded-3xl ${bgClass} flex items-center justify-center p-6 shadow-xl ${className}`}
      >
        <JanVaaniSymbol colorMode={colorMode} size={currentSymbolSize * 1.5} />
      </div>
    );
  }

  // 3. STACKED / VERTICAL LOGO
  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center gap-3 ${className}`}>
        <JanVaaniSymbol colorMode={colorMode} size={currentSymbolSize * 1.2} />

        <div className="space-y-1">
          <div className={`font-black tracking-tight ${titleSizeClass} font-sans leading-none flex items-center justify-center`}>
            <span className={janColor}>Jan</span>
            <span className={vaaniColor}>Vaan</span>
            {/* Lowercase 'i' with orange dot */}
            <span className={`relative ${vaaniColor}`}>
              <span className="inline-block">ı</span>
              <span
                className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 rounded-full"
                style={{ backgroundColor: dotColor }}
              />
            </span>
          </div>

          {showTagline && (
            <div className={`font-bold tracking-tight ${taglineSizeClass} pt-1 flex items-center justify-center gap-1.5`}>
              {colorMode === 'full' ? (
                <>
                  <span className="text-[#0066FF]">Speak.</span>
                  <span className="text-[#16A34A]">Share.</span>
                  <span className="text-[#FF7A00]">Solve.</span>
                  <span className="text-[#8B5CF6]">Reward.</span>
                </>
              ) : (
                <span className={taglineColor}>Speak. Share. Solve. Reward.</span>
              )}
            </div>
          )}

          {showSecondaryLine && (
            <div className={`text-[11px] font-medium tracking-wide ${secondaryColor} pt-1`}>
              — Your Voice. Your Problem. Your Impact. —
            </div>
          )}
        </div>
      </div>
    );
  }

  // 4. COMPACT HORIZONTAL (FOR HEADER NAV / APP BARS)
  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2.5 ${className}`}>
        <JanVaaniSymbol colorMode={colorMode} size={currentSymbolSize} />
        <div className="flex flex-col justify-center leading-none">
          <div className={`font-black tracking-tight ${titleSizeClass} font-sans leading-none flex items-center`}>
            <span className={janColor}>Jan</span>
            <span className={vaaniColor}>Vaan</span>
            <span className={`relative ${vaaniColor}`}>
              <span className="inline-block">ı</span>
              <span
                className="absolute left-1/2 -translate-x-1/2 -top-0.5 w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: dotColor }}
              />
            </span>
          </div>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
            Civic Platform
          </span>
        </div>
      </div>
    );
  }

  // 5. PRIMARY HORIZONTAL LOGO LOCKUP (DEFAULT)
  return (
    <div className={`flex items-center gap-3.5 sm:gap-4.5 ${className}`}>
      <JanVaaniSymbol colorMode={colorMode} size={currentSymbolSize} />

      <div className="flex flex-col justify-center">
        {/* Wordmark */}
        <div className={`font-black tracking-tight ${titleSizeClass} font-sans leading-none flex items-center`}>
          <span className={janColor}>Jan</span>
          <span className={vaaniColor}>Vaan</span>
          <span className={`relative ${vaaniColor}`}>
            <span className="inline-block">ı</span>
            <span
              className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full"
              style={{ backgroundColor: dotColor }}
            />
          </span>
        </div>

        {/* Official Tagline */}
        {showTagline && (
          <div className={`font-bold tracking-tight ${taglineSizeClass} mt-1.5 flex items-center gap-1 sm:gap-1.5`}>
            {colorMode === 'full' ? (
              <>
                <span className="text-[#0066FF]">Speak.</span>
                <span className="text-[#16A34A]">Share.</span>
                <span className="text-[#FF7A00]">Solve.</span>
                <span className="text-[#8B5CF6]">Reward.</span>
              </>
            ) : (
              <span className={taglineColor}>Speak. Share. Solve. Reward.</span>
            )}
          </div>
        )}

        {/* Secondary Supporting Line */}
        {showSecondaryLine && (
          <div className={`text-[10px] sm:text-xs font-semibold tracking-wide ${secondaryColor} mt-1`}>
            — Your Voice. Your Problem. Your Impact. —
          </div>
        )}
      </div>
    </div>
  );
}
