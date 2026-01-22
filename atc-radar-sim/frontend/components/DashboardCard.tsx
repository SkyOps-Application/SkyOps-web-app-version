'use client';

import React from 'react';
import Link from 'next/link';
import { SFSymbol } from './SFSymbol';

interface DashboardCardProps {
  icon: string; // SF Symbol name
  title: string;
  subtitle: string;
  gradientColors: [string, string];
  href: string;
  onClick?: () => void;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  icon,
  title,
  subtitle,
  gradientColors,
  href,
  onClick
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Link
      href={href}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex-1"
    >
      <div className="
        h-[220px] w-full
        flex flex-col items-center justify-center
        rounded-3xl
        transition-all duration-300
        bg-white/[0.08]
        border border-white/15
        hover:bg-white/[0.12]
        hover:scale-[0.97]
        hover:border-white/25
        shadow-lg hover:shadow-2xl
        px-8 py-10
      ">
        {/* Icon Circle */}
        <div 
          className="
            w-20 h-20 rounded-full
            flex items-center justify-center
            transition-transform duration-300
            group-hover:scale-110
            shadow-lg
            mb-6
          "
          style={{
            background: `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`
          }}
        >
          <SFSymbol name={icon} className="text-white" size={32} />
        </div>

        {/* Text Content */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-white tracking-tight mb-2">{title}</h3>
          <p className="text-sm text-gray-400 font-medium">{subtitle}</p>
        </div>
      </div>
    </Link>
  );
};

