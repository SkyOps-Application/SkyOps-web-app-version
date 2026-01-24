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
  required = false
}) => {
  const [internalActive, setInternalActive] = useState(false);
  const isActive = externalIsActive !== undefined ? externalIsActive : internalActive;
  
  // Sequence: #5e879e -> #8abdd3 -> #18c3e8 -> #e5b14b -> #e8a473 -> #e88599 -> #d34f98 -> #d97ce7 -> #bd95ed
  const colors = [
    "#5e879e", "#8abdd3", "#18c3e8", "#e5b14b", 
    "#e8a473", "#e88599", "#d34f98", "#d97ce7", "#bd95ed", "#5e879e"
  ];
  
  const gradientString = colors.join(', ');

  const gradientStyle = {
    backgroundImage: `conic-gradient(from 0deg, ${gradientString})`,
  };

  return (
    <div className="relative w-full z-0">
      {/* LAYER 1: Atmospheric "Blow" (Deep Blur) */}
      <div 
        className={`
          absolute -inset-8 rounded-full transition-opacity duration-1000 blur-3xl overflow-hidden pointer-events-none
          ${isActive ? 'opacity-40' : 'opacity-0'}
        `}
      >
        <div 
          className="absolute top-1/2 left-1/2 w-[200%] aspect-square animate-aurora-spin"
          style={gradientStyle}
        />
      </div>

      {/* LAYER 2: Intense Glow (Closer Blur) */}
      <div 
        className={`
          absolute -inset-1 rounded-full transition-opacity duration-500 blur-lg overflow-hidden pointer-events-none
          ${isActive ? 'opacity-80' : 'opacity-0'}
        `}
      >
        <div 
          className="absolute top-1/2 left-1/2 w-[200%] aspect-square animate-aurora-spin"
          style={gradientStyle}
        />
      </div>

      {/* LAYER 3: The Glassy Container */}
      <div className="relative z-10 group">
        <div className={`
          relative flex items-center h-14 w-full px-2 rounded-full overflow-hidden
          transition-all duration-500 ease-out
          bg-white/5 backdrop-blur-xl border
          ${isActive 
            ? 'border-white/25 shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:border-white/40 hover:shadow-[0_0_25px_rgba(255,255,255,0.25)]' 
            : 'border-white/10 hover:border-white/20 shadow-none'
          }
        `}>
          {/* Subtle Inner Highlight/Ring */}
          <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/5 pointer-events-none" />

          <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className="flex-1 bg-transparent border-none text-white px-10 text-lg font-light focus:outline-none placeholder-white/40"
            onFocus={() => {
              if (externalIsActive === undefined) {
                setInternalActive(true);
              }
            }}
            onBlur={() => {
              if (externalIsActive === undefined) {
                setInternalActive(false);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

