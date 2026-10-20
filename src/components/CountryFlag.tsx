import React from 'react';
import { SupportedLanguage } from '../types/travel';

interface CountryFlagProps {
  code: SupportedLanguage | string;
  className?: string;
}

export const CountryFlag: React.FC<CountryFlagProps> = ({ code, className = 'w-5 h-3.5' }) => {
  const normalizedCode = code.toLowerCase();

  switch (normalizedCode) {
    case 'en':
      // United Kingdom / Great Britain Flag
      return (
        <svg
          viewBox="0 0 60 40"
          className={`inline-block shrink-0 rounded-[2px] overflow-hidden shadow-2xs border border-slate-300/70 ${className}`}
          aria-label="United Kingdom flag"
        >
          {/* Blue background */}
          <rect width="60" height="40" fill="#012169" />
          {/* White diagonal saltire */}
          <path d="M0,0 L60,40 M60,0 L0,40" stroke="#FFFFFF" strokeWidth="8" />
          {/* Red diagonal saltire */}
          <path d="M0,0 L60,40" stroke="#C8102E" strokeWidth="3" />
          <path d="M60,0 L0,40" stroke="#C8102E" strokeWidth="3" />
          {/* White cross */}
          <path d="M30,0 v40 M0,20 h60" stroke="#FFFFFF" strokeWidth="12" />
          {/* Red cross */}
          <path d="M30,0 v40 M0,20 h60" stroke="#C8102E" strokeWidth="7" />
        </svg>
      );

    case 'nl':
      // Netherlands Flag (Red, White, Blue horizontal tricolor)
      return (
        <svg
          viewBox="0 0 60 40"
          className={`inline-block shrink-0 rounded-[2px] overflow-hidden shadow-2xs border border-slate-300/70 ${className}`}
          aria-label="Netherlands flag"
        >
          <rect y="0" width="60" height="13.33" fill="#AE1C28" />
          <rect y="13.33" width="60" height="13.34" fill="#FFFFFF" />
          <rect y="26.67" width="60" height="13.33" fill="#21468B" />
        </svg>
      );

    case 'fr':
      // France Flag (Blue, White, Red vertical tricolor)
      return (
        <svg
          viewBox="0 0 60 40"
          className={`inline-block shrink-0 rounded-[2px] overflow-hidden shadow-2xs border border-slate-300/70 ${className}`}
          aria-label="France flag"
        >
          <rect x="0" width="20" height="40" fill="#002654" />
          <rect x="20" width="20" height="40" fill="#FFFFFF" />
          <rect x="40" width="20" height="40" fill="#ED2939" />
        </svg>
      );

    case 'de':
      // Germany Flag (Black, Red, Gold horizontal tricolor)
      return (
        <svg
          viewBox="0 0 60 40"
          className={`inline-block shrink-0 rounded-[2px] overflow-hidden shadow-2xs border border-slate-300/70 ${className}`}
          aria-label="Germany flag"
        >
          <rect y="0" width="60" height="13.33" fill="#000000" />
          <rect y="13.33" width="60" height="13.34" fill="#DD0000" />
          <rect y="26.67" width="60" height="13.33" fill="#FFCE00" />
        </svg>
      );

    case 'ru':
      // Russia Flag (White, Blue, Red horizontal tricolor)
      return (
        <svg
          viewBox="0 0 60 40"
          className={`inline-block shrink-0 rounded-[2px] overflow-hidden shadow-2xs border border-slate-300/70 ${className}`}
          aria-label="Russia flag"
        >
          <rect y="0" width="60" height="13.33" fill="#FFFFFF" />
          <rect y="13.33" width="60" height="13.34" fill="#0039A6" />
          <rect y="26.67" width="60" height="13.33" fill="#D52B1E" />
        </svg>
      );

    case 'es':
      // Spain Flag (Red, Yellow [wide with crest], Red)
      return (
        <svg
          viewBox="0 0 60 40"
          className={`inline-block shrink-0 rounded-[2px] overflow-hidden shadow-2xs border border-slate-300/70 ${className}`}
          aria-label="Spain flag"
        >
          <rect y="0" width="60" height="10" fill="#AA151B" />
          <rect y="10" width="60" height="20" fill="#F1BF00" />
          <rect y="30" width="60" height="10" fill="#AA151B" />
          {/* Stylized Spanish Coat of Arms badge in yellow stripe */}
          <circle cx="18" cy="20" r="4.5" fill="#AA151B" opacity="0.85" />
          <rect x="16.5" y="17" width="3" height="6" fill="#F1BF00" />
        </svg>
      );

    default:
      return null;
  }
};
