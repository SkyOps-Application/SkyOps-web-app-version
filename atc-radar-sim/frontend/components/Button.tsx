'use client';

import React, { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    loading = false, 
    children, 
    disabled,
    style,
    ...props 
  }, ref) => {
    const sizeStyles = {
      sm: { height: '36px', padding: '0 16px', fontSize: '14px' },
      md: { height: '44px', padding: '0 24px', fontSize: '15px' },
      lg: { height: '52px', padding: '0 32px', fontSize: '16px' },
    };

    const variantStyles = {
      primary: {
        background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
        color: '#0a0f1a',
        border: 'none',
        boxShadow: '0 4px 12px rgba(245, 158, 11, 0.25)',
      },
      secondary: {
        background: 'rgba(31, 41, 55, 0.8)',
        color: 'white',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: 'none',
      },
      ghost: {
        background: 'transparent',
        color: '#9ca3af',
        border: 'none',
        boxShadow: 'none',
      },
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          width: '100%',
          borderRadius: '10px',
          fontWeight: 600,
          cursor: disabled || loading ? 'not-allowed' : 'pointer',
          opacity: disabled || loading ? 0.5 : 1,
          transition: 'all 0.2s ease',
          ...sizeStyles[size],
          ...variantStyles[variant],
          ...style
        }}
        {...props}
      >
        {loading ? (
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg 
              style={{ animation: 'spin 1s linear infinite', width: '16px', height: '16px' }}
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                style={{ opacity: 0.25 }}
                cx="12" cy="12" r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              />
              <path 
                style={{ opacity: 0.75 }}
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Loading...
          </span>
        ) : children}
      </button>
    );
  }
);

Button.displayName = 'Button';
