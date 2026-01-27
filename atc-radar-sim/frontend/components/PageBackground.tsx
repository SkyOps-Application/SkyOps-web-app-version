'use client';

import React from 'react';

interface PageBackgroundProps {
  children: React.ReactNode;
  showGrid?: boolean;
  showGlow?: boolean;
}

export function PageBackground({ 
  children, 
  showGrid = true,
  showGlow = true 
}: PageBackgroundProps) {
  return (
    <div style={{ minHeight: '100vh', position: 'relative', backgroundColor: '#0a0f1a' }}>
      {/* Background layers */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        {/* Base gradient */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, #0a0f1a 0%, #111827 50%, #0a0f1a 100%)'
          }}
        />
        
        {/* Grid pattern */}
        {showGrid && (
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.4,
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
              `,
              backgroundSize: '48px 48px',
            }}
          />
        )}
        
        {/* Top glow */}
        {showGlow && (
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at 50% 0%, rgba(245, 158, 11, 0.08) 0%, transparent 60%)'
            }}
          />
        )}
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        {children}
      </div>
    </div>
  );
}
