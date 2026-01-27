'use client';

import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, style, ...props }, ref) => {
    return (
      <div style={{ width: '100%' }}>
        {label && (
          <label 
            htmlFor={props.id} 
            style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: 500,
              color: '#9ca3af',
              marginBottom: '8px',
            }}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          style={{
            width: '100%',
            background: '#111827',
            border: `1px solid ${error ? '#ef4444' : 'rgba(255, 255, 255, 0.1)'}`,
            borderRadius: '10px',
            padding: '14px 18px',
            color: 'white',
            fontSize: '15px',
            outline: 'none',
            transition: 'all 0.2s',
            boxSizing: 'border-box',
            ...style
          }}
          {...props}
        />
        {error && (
          <p style={{ marginTop: '6px', fontSize: '12px', color: '#fca5a5' }}>{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
