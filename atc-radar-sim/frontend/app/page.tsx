/**
 * Landing page / Homepage
 * Updated with iPadOS-style UI effects
 */

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { MaterialIcon } from '@/components/MaterialIcon';
import {
  StaticGlassBackground,
  LogoGlow,
  DashboardCard,
  LiquidGlass,
  GradientPairs,
  ThemeColors
} from '@/components/Effects';

export default function HomePage() {
  const [logoScale, setLogoScale] = useState(0.8);
  const [logoOpacity, setLogoOpacity] = useState(0);
  const [cardsOpacity, setCardsOpacity] = useState(0);

  // Entrance animations
  useEffect(() => {
    // Logo animation
    const timer1 = setTimeout(() => {
      setLogoScale(1);
      setLogoOpacity(1);
    }, 200);

    // Cards animation
    const timer2 = setTimeout(() => {
      setCardsOpacity(1);
    }, 500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Static Glass Background */}
      <StaticGlassBackground />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center min-h-screen pt-32 px-8">
        {/* Hero Section */}
        <div className="flex flex-col items-center gap-5 mb-16">
          {/* Logo with Glow */}
          <LogoGlow>
            <div
              style={{
                transform: `scale(${logoScale})`,
                opacity: logoOpacity,
                transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease',
              }}
            >
              <Image
                src="/mainlogo.png"
                alt="SkyOps Logo"
                width={140}
                height={140}
                className="drop-shadow-2xl"
                priority
              />
            </div>
          </LogoGlow>

          {/* Title Text */}
          <div
            className="flex flex-col items-center gap-2"
            style={{
              opacity: logoOpacity,
              transition: 'opacity 0.8s ease 0.2s',
            }}
          >
            <h1
              className="text-5xl md:text-6xl font-bold text-white tracking-tight"
              style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
            >
              SkyOps
            </h1>
            <p
              className="text-xl font-medium"
              style={{ color: ThemeColors.secondary, opacity: 0.9 }}
            >
              Air Traffic Control Simulator
            </p>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div
          className="flex flex-wrap justify-center gap-5 max-w-4xl w-full px-4"
          style={{
            opacity: cardsOpacity,
            transform: cardsOpacity === 1 ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease',
          }}
        >
          {/* Start Training Card */}
          <Link href="/exercise-selection" className="w-full sm:w-[280px]">
            <DashboardCard
              icon={<MaterialIcon name="flight_takeoff" size={32} />}
              title="Start Training"
              subtitle="Begin your journey"
              gradientColors={GradientPairs.purple as [string, string]}
            />
          </Link>

          {/* Tutorial Notebook Card */}
          <Link href="/instructions" className="w-full sm:w-[280px]">
            <DashboardCard
              icon={<MaterialIcon name="menu_book" size={32} />}
              title="Tutorial Notebook"
              subtitle="Learn ATC basics"
              gradientColors={GradientPairs.teal as [string, string]}
            />
          </Link>

          {/* About Card */}
          <Link href="/data" className="w-full sm:w-[280px]">
            <DashboardCard
              icon={<MaterialIcon name="info" size={32} />}
              title="About SkyOps"
              subtitle="Learn more"
              gradientColors={GradientPairs.pink as [string, string]}
            />
          </Link>
        </div>

        {/* Practice Now Button */}
        <div className="mt-16" style={{ opacity: cardsOpacity, transition: 'opacity 0.6s ease 0.2s' }}>
          <Link
            href="/exercise-selection"
            className="group inline-flex items-center gap-4 btn-scale"
          >
            <LiquidGlass className="flex items-center gap-4 px-8 py-4 rounded-full hover:bg-white/10 transition-all">
              {/* Play Icon */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                style={{ background: `linear-gradient(135deg, ${GradientPairs.purple[0]}, ${GradientPairs.purple[1]})` }}
              >
                <MaterialIcon name="play_arrow" size={32} className="text-white ml-0.5" />
              </div>
              <span className="text-white font-bold text-2xl pr-2">Practice now</span>
            </LiquidGlass>
          </Link>
        </div>

        {/* Footer */}
        <div
          className="absolute bottom-6 flex items-center gap-1.5 text-gray-500 text-xs"
          style={{ opacity: cardsOpacity * 0.6, transition: 'opacity 0.6s ease 0.3s' }}
        >
          <span>©</span>
          <span>2026 SkyOps Simulation. All rights reserved.</span>
        </div>
      </main>
    </div>
  );
}
