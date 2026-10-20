import React from 'react';
import { PUSH_WORLD_LOGO_IMAGE } from '../data/travelData';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'footer';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
}) => {
  // Height sizing for headers, footers, and mobile viewports
  const sizeClasses = {
    sm: 'h-9 sm:h-11 max-w-[160px]',
    md: 'h-11 sm:h-14 max-w-[190px] sm:max-w-[230px]',
    lg: 'h-16 sm:h-20 max-w-[260px] sm:max-w-[300px]',
    footer: 'h-13 sm:h-16 max-w-[200px] sm:max-w-[240px]',
  }[size];

  return (
    <div className={`inline-flex items-center justify-center select-none ${className}`}>
      <img
        src={PUSH_WORLD_LOGO_IMAGE}
        alt="Push World Travel Ltd - Your World. Our Journey."
        className={`${sizeClasses} w-auto object-contain transition-transform duration-200 hover:scale-102`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};
