'use client';

import React from 'react';

interface GlassBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassBackground: React.FC<GlassBackgroundProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`relative min-h-screen w-full ${className}`}>
      {/* Base dark background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#020408] via-[#0a0e1a] to-[#050810] -z-10" />
      
      {/* Subtle gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#0a1a2e]/30 via-transparent to-[#1a0a2e]/20 -z-10" />
      
      {/* Content */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};

