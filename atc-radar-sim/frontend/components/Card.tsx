'use client';

import React, { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated';
  padding?: 'sm' | 'md' | 'lg';
}

export function Card({ 
  variant = 'default', 
  padding = 'md',
  className = '', 
  children, 
  style,
  ...props 
}: CardProps) {
  const paddingValues = {
    sm: '16px',
    md: '24px',
    lg: '32px'
  };

  const baseStyles: React.CSSProperties = {
    background: variant === 'elevated' 
      ? 'linear-gradient(135deg, rgba(31, 41, 55, 0.95), rgba(17, 24, 39, 0.98))'
      : 'rgba(31, 41, 55, 0.8)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    boxShadow: variant === 'elevated' 
      ? '0 8px 32px rgba(0, 0, 0, 0.4)'
      : '0 4px 12px rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(12px)',
    padding: paddingValues[padding],
    ...style
  };

  return (
    <div 
      className={className}
      style={baseStyles}
      {...props}
    >
      {children}
    </div>
  );
}
