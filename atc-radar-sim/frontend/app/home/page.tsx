'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { GlassBackground } from '@/components/GlassBackground';
import { GridOverlay } from '@/components/GridOverlay';
import { DashboardCard } from '@/components/DashboardCard';

export default function HomePage() {
  const router = useRouter();
  const [logoScale, setLogoScale] = useState(0.8);
  const [logoOpacity, setLogoOpacity] = useState(0);
  const [cardsOpacity, setCardsOpacity] = useState(0);

  useEffect(() => {
    // Protect route
    const token = localStorage.getItem('access_token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    // Animate logo
    const timer1 = setTimeout(() => {
      setLogoScale(1.0);
      setLogoOpacity(1.0);
    }, 200);

    // Animate cards
    const timer2 = setTimeout(() => {
      setCardsOpacity(1.0);
    }, 500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <GlassBackground>
      <GridOverlay opacity={0.04} />

      <main className="relative z-10 w-full flex flex-col items-center min-h-screen px-6 pt-40 pb-40">
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
          
          {/* Hero Section */}
          <div className="text-center mb-40">
            {/* Logo */}
            <div className="flex justify-center mb-16 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#18c3e8]/30 via-[#e5b14b]/30 to-[#d34f98]/30 rounded-full blur-3xl opacity-60" />
              <div 
                className="relative w-44 h-44 flex items-center justify-center transition-all duration-700 ease-out"
                style={{ 
                  transform: `scale(${logoScale})`,
                  opacity: logoOpacity
                }}
              >
                <Image
                  src="/mainlogo.png"
                  alt="SkyOps Logo"
                  width={175}
                  height={175}
                  className="object-contain"
                />
              </div>
            </div>

            {/* Title */}
            <div className="space-y-6">
              <h1 className="text-7xl md:text-8xl font-bold text-white tracking-tight" style={{ fontFamily: 'system-ui, -apple-system' }}>
                SkyOps
              </h1>
              <p className="text-2xl md:text-3xl text-gray-400 font-medium">
                Air Traffic Control Simulator
              </p>
            </div>
          </div>

          {/* Dashboard Cards */}
          <div 
            className="flex flex-col md:flex-row gap-10 max-w-5xl w-full mb-40 transition-opacity duration-700"
            style={{ opacity: cardsOpacity }}
          >
            <DashboardCard
              icon="airplane"
              title="Start Training"
              subtitle="Begin your journey"
              gradientColors={['#667eea', '#764ba2']}
              href="/exercises"
            />
            
            <DashboardCard
              icon="book"
              title="Tutorial Notebook"
              subtitle="Learn ATC basics"
              gradientColors={['#11998e', '#38ef7d']}
              href="/instructions"
            />
            
            <DashboardCard
              icon="info"
              title="About SkyOps"
              subtitle="Learn more"
              gradientColors={['#f093fb', '#f5576c']}
              href="/about"
            />
          </div>

          {/* Footer */}
          <div className="text-center mt-auto pt-12" style={{ opacity: cardsOpacity }}>
            <p className="text-gray-500 text-sm font-medium">
            </p>
          </div>
        </div>
      </main>
    </GlassBackground>
  );
}
