
'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import Image from 'next/image';
import { GlassBackground } from '@/components/GlassBackground';
import { GridOverlay } from '@/components/GridOverlay';
import { SFSymbol } from '@/components/SFSymbol';

export default function AboutPage() {
  return (
    <GlassBackground>
      <GridOverlay opacity={0.04} />
      
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/background-web.png"
          alt="Background"
          fill
          className="object-cover opacity-15"
          priority
        />
      </div>

      <Navbar />

      <main className="relative z-10 w-full flex flex-col items-center min-h-screen pt-40 px-6 pb-24">
        <div className="w-full max-w-5xl mx-auto space-y-16">
          {/* Header */}
          <div className="text-center space-y-12">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#18c3e8]/30 via-[#e5b14b]/30 to-[#d34f98]/30 rounded-full blur-3xl opacity-60" />
                <div className="relative w-44 h-44 flex items-center justify-center">
                  <Image
                    src="/mainlogo.png"
                    alt="SkyOps Logo"
                    width={176}
                    height={176}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-6xl md:text-7xl font-bold text-white tracking-tight" style={{ fontFamily: 'system-ui, -apple-system' }}>
                SkyOps
              </h1>
              <p className="text-2xl text-gray-400 font-medium">Air Traffic Control Training Simulator</p>
            </div>
          </div>
        
          {/* Content Cards */}
          <div className="space-y-10">
            <div className="glass-strong rounded-3xl p-10 shadow-2xl">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#18c3e8] to-[#5e879e] flex items-center justify-center shadow-lg">
                  <SFSymbol name="info" className="text-white" size={28} />
                </div>
                <h2 className="text-3xl font-bold text-white">About SkyOps</h2>
              </div>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  SkyOps is a cutting-edge Air Traffic Control (ATC) radar simulation platform designed to bridge the gap between theoretical knowledge and practical application.
                </p>
                <p>
                  Our mission is to provide aviation enthusiasts, students, and professionals with a highly realistic environment to practice radar monitoring, vectoring, and airspace management.
                </p>
                <p>
                  Built with modern web technologies and real-time WebSocket communication, SkyOps delivers a seamless, high-fidelity experience right in your browser.
                </p>
              </div>
            </div>

            <div className="glass-strong rounded-3xl p-10 shadow-2xl">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#e5b14b] to-[#ffd200] flex items-center justify-center shadow-lg">
                  <SFSymbol name="star" className="text-white" size={28} />
                </div>
                <h2 className="text-3xl font-bold text-white">Key Features</h2>
              </div>
              <ul className="space-y-5 text-gray-300 text-lg">
                <li className="flex items-start gap-4">
                  <SFSymbol name="chart" className="text-[#18c3e8] mt-1 flex-shrink-0" size={20} />
                  <span>Realistic radar display with waypoints</span>
                </li>
                <li className="flex items-start gap-4">
                  <SFSymbol name="airplane" className="text-[#18c3e8] mt-1 flex-shrink-0" size={20} />
                  <span>Real-time aircraft simulation</span>
                </li>
                <li className="flex items-start gap-4">
                  <SFSymbol name="gear" className="text-[#18c3e8] mt-1 flex-shrink-0" size={20} />
                  <span>Command-based control system</span>
                </li>
                <li className="flex items-start gap-4">
                  <SFSymbol name="chart" className="text-[#18c3e8] mt-1 flex-shrink-0" size={20} />
                  <span>Separation monitoring</span>
                </li>
                <li className="flex items-start gap-4">
                  <SFSymbol name="book" className="text-[#18c3e8] mt-1 flex-shrink-0" size={20} />
                  <span>Step-by-step tutorial</span>
                </li>
                <li className="flex items-start gap-4">
                  <SFSymbol name="star" className="text-[#18c3e8] mt-1 flex-shrink-0" size={20} />
                  <span>Score tracking</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </GlassBackground>
  );
}
