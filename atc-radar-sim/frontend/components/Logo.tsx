'use client';

import React from 'react';
import Image from 'next/image';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export function Logo({ size = 'md', showText = false }: LogoProps) {
  const sizes = {
    sm: 40,
    md: 64,
    lg: 96,
    xl: 128
  };

  const imageSize = sizes[size];

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        {/* Glow effect */}
        <div 
          className="absolute inset-0 rounded-full blur-2xl opacity-30"
          style={{ 
            background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)',
            transform: 'scale(1.5)'
          }} 
        />
        <Image
          src="/mainlogo.png"
          alt="SkyOps Logo"
          width={imageSize}
          height={imageSize}
          className="relative object-contain"
          priority
        />
      </div>
      {showText && (
        <span className="text-2xl font-bold tracking-tight text-gradient">
          SkyOps
        </span>
      )}
    </div>
  );
}

