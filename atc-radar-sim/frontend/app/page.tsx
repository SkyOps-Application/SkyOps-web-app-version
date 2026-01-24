
'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GlassBackground } from '@/components/GlassBackground';
import { GridOverlay } from '@/components/GridOverlay';

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    // If already logged in, redirect to home
    const token = localStorage.getItem('access_token');
    if (token) {
      router.push('/home');
    }
  }, [router]);

  return (
    <GlassBackground>
      <GridOverlay opacity={0.04} />
      
      {/* Background Image (Lower opacity for better theme blend) */}
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

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center w-full min-h-screen px-6 text-center space-y-16 animate-fadeIn">
        {/* Logo/Title Area */}
        <div className="space-y-8">
           <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#18c3e8]/30 via-[#e5b14b]/30 to-[#d34f98]/30 rounded-full blur-3xl opacity-60 animate-pulse" />
                <div className="relative w-48 h-48 flex items-center justify-center">
                  <Image
                    src="/mainlogo.png"
                    alt="SkyOps Logo"
                    width={192}
                    height={192}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          <div className="space-y-4">
            <h1 className="text-7xl md:text-9xl font-black text-white drop-shadow-2xl tracking-tighter" style={{ fontFamily: 'system-ui, -apple-system' }}>
                SKY OPS
            </h1>
            <p className="text-2xl md:text-3xl text-blue-100 font-medium tracking-wide">
                ADVANCED RADAR SIMULATION
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-lg justify-center">
          <Link
            href="/login"
            className="group relative px-10 py-5 bg-[#ffde59] hover:bg-[#ffe600] text-[#0C2D57] font-bold text-xl rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 w-full md:w-1/2 flex items-center justify-center"
          >
            <span className="relative z-10">Login</span>
          </Link>

          <Link
            href="/register"
            className="group relative px-10 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold text-xl rounded-full transition-all duration-300 border border-white/30 hover:border-white shadow-xl hover:shadow-2xl hover:-translate-y-1 w-full md:w-1/2 flex items-center justify-center"
          >
            <span className="relative z-10">Register</span>
          </Link>
        </div>

        <div className="absolute bottom-8 pt-12 text-blue-200/60 text-sm">
          © 2026 SkyOps Simulation System
        </div>
      </main>
    </GlassBackground>
  );
}
