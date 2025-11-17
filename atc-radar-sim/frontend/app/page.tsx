/**
 * Landing page / Homepage
 */

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
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
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-blue-800/20 to-blue-900/40" />
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10 flex items-center min-h-screen px-8 md:px-16 lg:px-24">
        <div className="max-w-4xl space-y-10">
          {/* Main Title */}
          <div>
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-white drop-shadow-2xl tracking-tight leading-none">
              EXERCISE 1
            </h1>
          </div>

          {/* Secondary Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/exercise/1/flight-plan"
              className="bg-white/15 backdrop-blur-md text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white/25 transition-all duration-300 border border-white/20 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Flight Plan
            </Link>
            <Link
              href="/exercise/1/practice-history"
              className="bg-white/15 backdrop-blur-md text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white/25 transition-all duration-300 border border-white/20 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Practice History
            </Link>
          </div>

          {/* Practice Now Button */}
          <div className="pt-6">
            <Link
              href="/radar"
              className="group inline-flex items-center gap-4 bg-gradient-to-r from-[#ffde59] to-[#ffd700] hover:from-[#ffd700] hover:to-[#ffde59] text-[#0d2d52] font-bold text-2xl px-8 py-4 rounded-full transition-all duration-300 shadow-2xl hover:shadow-[0_20px_60px_rgba(255,222,89,0.4)] hover:scale-105 transform"
            >
              {/* Play Icon */}
              <div className="w-14 h-14 bg-[#0d2d52] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-7 h-7 text-[#ffde59] ml-0.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="pr-2">Practice now</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
