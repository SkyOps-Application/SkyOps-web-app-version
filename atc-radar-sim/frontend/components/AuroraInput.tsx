'use client';

import React, { useState } from 'react';

interface AuroraInputProps {
  isActive?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  id?: string;
  required?: boolean;
}

export const AuroraInput: React.FC<AuroraInputProps> = ({
  isActive: externalIsActive,
  value,
  onChange,
  placeholder,
  type = 'text',
  id,
  required = false,
}) => {
  const [internalActive, setInternalActive] = useState(false);
  const isActive =
    externalIsActive !== undefined ? externalIsActive : internalActive;
  
  return (
    <div style={{ position: 'relative', width: '100%', zIndex: 0 }}>
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          height: '56px',
          borderRadius: '12px',
          overflow: 'hidden',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(24px)',
          border: isActive 
            ? '1px solid rgba(255, 255, 255, 0.3)' 
            : '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: isActive 
            ? '0 0 20px rgba(255, 255, 255, 0.2)' 
            : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          onFocus={() => externalIsActive === undefined && setInternalActive(true)}
          onBlur={() => externalIsActive === undefined && setInternalActive(false)}
          style={{
            width: '100%',
            height: '100%',
            background: 'transparent',
            color: 'white',
            fontSize: '16px',
            fontWeight: 300,
            padding: '0 24px',
            border: 'none',
            outline: 'none',
          }}
        />
      </div>
    </div>
  );
};

