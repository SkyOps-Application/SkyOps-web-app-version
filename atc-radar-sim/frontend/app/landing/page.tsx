/**
 * Landing page / Homepage
 */

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';

export default function LandingPage() {
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
      <main className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center space-y-8 max-w-4xl pt-20">
          {/* Main Title */}
          <h1 className="text-8xl font-bold text-white drop-shadow-2xl tracking-tight">
            EXERCISE 1
          </h1>

          {/* Secondary Buttons */}
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/exercise/1/flight-plan"
              className="bg-white/20 backdrop-blur-md text-white font-semibold px-8 py-3 rounded-full hover:bg-white/30 transition-all border border-white/30 shadow-lg"
            >
              Flight Plan
            </Link>
            <Link
              href="/exercise/1/practice-history"
              className="bg-white/20 backdrop-blur-md text-white font-semibold px-8 py-3 rounded-full hover:bg-white/30 transition-all border border-white/30 shadow-lg"
            >
              Practice history
            </Link>
          </div>

          {/* Practice Now Button */}
          <div className="pt-8">
            <Link
              href="/radar"
              className="inline-flex items-center gap-4 bg-[#ffde59] text-[#10396f] font-bold text-2xl px-12 py-6 rounded-full hover:bg-yellow-400 transition-all shadow-2xl hover:scale-105 transform"
            >
              {/* Play Icon */}
              <div className="w-16 h-16 bg-[#10396f] rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-[#ffde59] ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
              <span>Practice now</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Copyright Footer */}
      <footer className="relative z-10 pb-6 text-center">
        <p className="text-white text-sm drop-shadow-lg">
          Copyright by Tien Quoc Bui and Phuong Khanh Pham
        </p>
      </footer>
    </div>
  );
}

