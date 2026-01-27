
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import { GlassBackground } from '@/components/GlassBackground';
import { GridOverlay } from '@/components/GridOverlay';
import { SFSymbol } from '@/components/SFSymbol';

export default function ExercisesPage() {
  return (
    <GlassBackground>
      <GridOverlay opacity={0.04} />
      
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/background-web.png"
          alt="Background"
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>

      <Navbar />

      <main className="relative z-10 w-full flex flex-col items-center justify-center min-h-screen pt-48 pb-48 px-6">
        <div className="w-full max-w-6xl mx-auto">
        <div className="w-full max-w-5xl space-y-16">
          <h1 className="text-6xl md:text-7xl font-bold text-white text-center tracking-tight" style={{ fontFamily: 'system-ui, -apple-system' }}>
            Select Mode
          </h1>

          <div className="flex flex-col md:flex-row gap-10 justify-center">
            {/* Tutorial Card */}
            <Link 
              href="/instructions" 
              className="group relative flex flex-col items-center justify-center glass-strong rounded-3xl p-12 flex-1 hover:bg-white/15 transition-all duration-300 hover:scale-[0.97] shadow-2xl hover:shadow-3xl min-h-[280px]"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#11998e] to-[#38ef7d] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <SFSymbol name="book" className="text-white" size={40} />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Tutorial</h2>
              <p className="text-gray-300 text-center">Learn the commands and controls.</p>
            </Link>

            {/* Simulator Card */}
            <Link 
              href="/radar" 
              className="group relative flex flex-col items-center justify-center glass-strong rounded-3xl p-12 flex-1 hover:bg-white/15 transition-all duration-300 hover:scale-[0.97] shadow-2xl hover:shadow-3xl min-h-[280px]"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <SFSymbol name="airplane" className="text-white" size={40} />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Start Exercise</h2>
              <p className="text-gray-300 text-center">Enter the Radar Simulator.</p>
            </Link>
          </div>
        </div>
        </div>
      </main>
    </GlassBackground>
  );
}
