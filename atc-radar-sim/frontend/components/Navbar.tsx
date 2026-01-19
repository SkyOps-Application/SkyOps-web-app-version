/**
 * Navigation bar component with glass effect
 */

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function Navbar() {
  const [exercisesOpen, setExercisesOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-7xl">
      <div className="liquid-glass px-8 py-4 shadow-2xl hover:bg-white/10 transition-all duration-300">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <Image
              src="/mainlogo.png"
              alt="ATC Logo"
              width={140}
              height={56}
              className="h-14 w-auto"
            />
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center gap-6">
            {/* Exercises Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setExercisesOpen(!exercisesOpen);
                  setHistoryOpen(false);
                }}
                className="text-white font-semibold text-base hover:text-[var(--theme-primary)] transition-colors flex items-center gap-1.5"
              >
                Exercises
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${exercisesOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {exercisesOpen && (
                <div className="absolute top-full mt-3 left-0 liquid-glass-card py-3 min-w-[220px] animate-fade-in-up">
                  <Link
                    href="/radar"
                    className="block px-5 py-3 text-white/90 font-medium hover:bg-white/10 hover:text-[var(--theme-primary)] transition-all rounded-xl mx-2"
                    onClick={() => setExercisesOpen(false)}
                  >
                    Exercise 1
                  </Link>
                  <Link
                    href="/radar"
                    className="block px-5 py-3 text-white/90 font-medium hover:bg-white/10 hover:text-[var(--theme-primary)] transition-all rounded-xl mx-2"
                    onClick={() => setExercisesOpen(false)}
                  >
                    Exercise 2
                  </Link>
                  <Link
                    href="/radar"
                    className="block px-5 py-3 text-white/90 font-medium hover:bg-white/10 hover:text-[var(--theme-primary)] transition-all rounded-xl mx-2"
                    onClick={() => setExercisesOpen(false)}
                  >
                    Exercise 3
                  </Link>
                </div>
              )}
            </div>

            {/* Practice History Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setHistoryOpen(!historyOpen);
                  setExercisesOpen(false);
                }}
                className="text-white font-semibold text-base hover:text-[var(--theme-primary)] transition-colors flex items-center gap-1.5"
              >
                Practice history
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${historyOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {historyOpen && (
                <div className="absolute top-full mt-3 left-0 liquid-glass-card py-3 min-w-[220px] animate-fade-in-up">
                  <Link
                    href="/history/recent"
                    className="block px-5 py-3 text-white/90 font-medium hover:bg-white/10 hover:text-[var(--theme-primary)] transition-all rounded-xl mx-2"
                    onClick={() => setHistoryOpen(false)}
                  >
                    Recent Sessions
                  </Link>
                  <Link
                    href="/history/all"
                    className="block px-5 py-3 text-white/90 font-medium hover:bg-white/10 hover:text-[var(--theme-primary)] transition-all rounded-xl mx-2"
                    onClick={() => setHistoryOpen(false)}
                  >
                    All History
                  </Link>
                  <Link
                    href="/history/stats"
                    className="block px-5 py-3 text-white/90 font-medium hover:bg-white/10 hover:text-[var(--theme-primary)] transition-all rounded-xl mx-2"
                    onClick={() => setHistoryOpen(false)}
                  >
                    Statistics
                  </Link>
                </div>
              )}
            </div>

            {/* Instructions */}
            <Link
              href="/instructions"
              className="text-white font-semibold text-base hover:text-[var(--theme-primary)] transition-colors"
            >
              Instructions
            </Link>

            {/* Data */}
            <Link
              href="/data"
              className="text-white font-semibold text-base hover:text-[var(--theme-primary)] transition-colors"
            >
              Data
            </Link>

            {/* User/Login Button - Gradient style */}
            <Link
              href="/login"
              className="btn-primary-gradient flex items-center gap-2 px-6 py-2.5 rounded-full hover:scale-105 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              User
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
