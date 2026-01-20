
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';

export default function ExercisesPage() {
  return (
    <div className="min-h-screen relative bg-[#0C2D57]">
      {/* Background */}
      <div className="fixed inset-0 z-0">
         <Image
          src="/background-web.png"
          alt="Background"
          fill
          className="object-cover opacity-30"
          priority
        />
      </div>

      <Navbar />

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-20 px-4">
        <h1 className="text-5xl font-bold text-white mb-16 text-center">Select Mode</h1>

        <div className="flex flex-col md:flex-row gap-10 w-full max-w-5xl justify-center">
            {/* Tutorial Card */}
            <Link 
                href="/instructions" 
                className="group relative flex flex-col items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10 flex-1 hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-2xl"
            >
                <div className="text-[#ffde59] mb-4">
                    <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Tutorial</h2>
                <p className="text-blue-100 text-center">Learn the commands and controls.</p>
            </Link>

            {/* Simulator Card */}
            <Link 
                href="/radar" 
                className="group relative flex flex-col items-center justify-center bg-gradient-to-br from-[#ffde59] to-[#bfa33f] border border-yellow-400 rounded-3xl p-10 flex-1 hover:brightness-110 transition-all duration-300 hover:scale-105 shadow-2xl"
            >
                 <div className="text-[#0C2D57] mb-4">
                    <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                    </svg>
                </div>
                <h2 className="text-3xl font-bold text-[#0C2D57] mb-2">Start Exercise</h2>
                <p className="text-[#0C2D57] text-center font-medium">Enter the Radar Simulator.</p>
            </Link>
        </div>
      </main>
    </div>
  );
}
