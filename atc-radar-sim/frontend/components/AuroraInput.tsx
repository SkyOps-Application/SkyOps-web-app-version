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

  // Removed aurora effect logic
  
  return (
    <div className="relative w-full z-0">
      {/* Input shell */}
      <div
        className={`
          relative z-10 h-16 rounded-full overflow-hidden
          bg-white/5 backdrop-blur-xl border
          transition-all duration-300
          ${isActive
            ? 'border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.2)]'
            : 'border-white/10'}
        `}
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
          className="
            w-full h-full
            bg-transparent
            text-white text-lg font-light
            px-6 py-4
            focus:outline-none
            placeholder-white/40
          "
        />
      </div>
    </div>
  );
};
