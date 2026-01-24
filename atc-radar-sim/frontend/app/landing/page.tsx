/**
 * Landing page / Homepage
 */

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { GlassBackground } from '@/components/GlassBackground';
import { GridOverlay } from '@/components/GridOverlay';

export default function LandingPage() {
  return (
    <GlassBackground>
      <GridOverlay opacity={0.04} />
      
      {/* Background Image with overlay */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/background-web.png"
          alt="ATC Tower Background"
          fill
          className="object-cover opacity-30"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020408]/80 via-[#0a0e1a]/60 to-[#050810]/80" />
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="text-center space-y-16 max-w-5xl pt-28 animate-fadeIn">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#18c3e8]/30 via-[#e5b14b]/30 to-[#d34f98]/30 rounded-full blur-3xl opacity-60 animate-pulse" />
              <div className="relative w-52 h-52 flex items-center justify-center">
                <Image
                  src="/mainlogo.png"
                  alt="SkyOps Logo"
                  width={208}
                  height={208}
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Main Title */}
          <div className="space-y-6">
            <h1 className="text-8xl md:text-9xl font-bold text-white drop-shadow-2xl tracking-tight" style={{ fontFamily: 'system-ui, -apple-system' }}>
              EXERCISE 1
            </h1>
            <p className="text-2xl text-gray-400 font-medium">Air Traffic Control Training</p>
          </div>

          {/* Secondary Buttons */}
          <div className="flex items-center justify-center gap-6 flex-wrap pt-8">
            <Link
              href="/exercise/1/flight-plan"
              className="glass-strong text-white font-semibold px-10 py-5 rounded-full hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-base"
            >
              Flight Plan
            </Link>
            <Link
              href="/exercise/1/practice-history"
              className="glass-strong text-white font-semibold px-10 py-5 rounded-full hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-base"
            >
              Practice History
            </Link>
          </div>

          {/* Practice Now Button */}
          <div className="pt-8">
            <Link
              href="/radar"
              className="inline-flex items-center gap-5 bg-gradient-to-r from-[#ffde59] to-[#ffd200] text-[#10396f] font-bold text-2xl px-14 py-7 rounded-full hover:from-[#ffd200] hover:to-[#ffde59] transition-all shadow-2xl hover:scale-105 transform duration-300"
            >
              {/* Play Icon */}
              <div className="w-18 h-18 bg-[#10396f] rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-9 h-9 text-[#ffde59] ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
              <span>Practice Now</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Copyright */}
      <footer className="relative z-10 pb-8 text-center">
        <p className="text-white/60 text-sm">
          © 2026 SkyOps Simulation. All rights reserved.
        </p>
      </footer>
    </GlassBackground>
  );
}

