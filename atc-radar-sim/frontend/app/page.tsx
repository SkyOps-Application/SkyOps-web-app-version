
'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/background-web.png"
          alt="ATC Tower Background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center w-full max-w-4xl px-6 text-center space-y-12 animate-fadeIn">
        {/* Logo/Title Area */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-black text-white drop-shadow-2xl tracking-tighter">
            SKY OPS
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 font-medium tracking-wide">
            ADVANCED RADAR SIMULATION
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-lg justify-center mt-8">
          <Link
            href="/login"
            className="group relative px-8 py-4 bg-[#ffde59] hover:bg-[#ffe600] text-[#0C2D57] font-bold text-xl rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 w-full md:w-1/2 flex items-center justify-center"
          >
            <span className="relative z-10">Login</span>
          </Link>

          <Link
            href="/register"
            className="group relative px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold text-xl rounded-xl transition-all duration-300 border-2 border-white/50 hover:border-white shadow-lg hover:shadow-xl hover:-translate-y-1 w-full md:w-1/2 flex items-center justify-center"
          >
            <span className="relative z-10">Register</span>
          </Link>
        </div>

        <div className="pt-12 text-blue-200 text-sm">
          © 2026 SkyOps Simulation System
        </div>
      </main>
    </div>
  );
}
