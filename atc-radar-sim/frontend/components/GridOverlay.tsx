'use client';

import React from 'react';

interface GridOverlayProps {
  opacity?: number;
}

export function GridOverlay({ opacity = 0.04 }: GridOverlayProps) {
  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity,
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
      }}
    />
  );
}

