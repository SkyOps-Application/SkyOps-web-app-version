'use client';

import React from 'react';

interface GridOverlayProps {
  opacity?: number;
  className?: string;
}

export const GridOverlay: React.FC<GridOverlayProps> = ({ 
  opacity = 0.03,
  className = '' 
}) => {
  return (
    <div 
      className={`fixed inset-0 pointer-events-none -z-10 ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, ${opacity}) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, ${opacity}) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
      }}
    />
  );
};

