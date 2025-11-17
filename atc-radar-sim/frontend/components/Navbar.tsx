/**
 * Navigation bar component with dropdowns
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
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl px-8 py-4 shadow-2xl border border-white/20 hover:bg-white/15 transition-colors duration-300">
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
                onClick={() => setExercisesOpen(!exercisesOpen)}
                className="text-white font-semibold text-base hover:text-[#ffde59] transition-colors flex items-center gap-1.5"
              >
                Exercises
                <svg
                  className={`w-4 h-4 transition-transform ${exercisesOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {exercisesOpen && (
                <div className="absolute top-full mt-3 left-0 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl py-3 min-w-[220px] border border-white/30 animate-fadeIn">
                  <Link
                    href="/exercises/1"
                    className="block px-5 py-3 text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition-all rounded-xl mx-2"
                  >
                    Exercise 1
                  </Link>
                  <Link
                    href="/exercises/2"
                    className="block px-5 py-3 text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition-all rounded-xl mx-2"
                  >
                    Exercise 2
                  </Link>
                  <Link
                    href="/exercises/3"
                    className="block px-5 py-3 text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition-all rounded-xl mx-2"
                  >
                    Exercise 3
                  </Link>
                </div>
              )}
            </div>

            {/* Practice History Dropdown */}
            <div className="relative">
              <button
                onClick={() => setHistoryOpen(!historyOpen)}
                className="text-white font-semibold text-base hover:text-[#ffde59] transition-colors flex items-center gap-1.5"
              >
                Practice history
                <svg
                  className={`w-4 h-4 transition-transform ${historyOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {historyOpen && (
                <div className="absolute top-full mt-3 left-0 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl py-3 min-w-[220px] border border-white/30 animate-fadeIn">
                  <Link
                    href="/history/recent"
                    className="block px-5 py-3 text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition-all rounded-xl mx-2"
                  >
                    Recent Sessions
                  </Link>
                  <Link
                    href="/history/all"
                    className="block px-5 py-3 text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition-all rounded-xl mx-2"
                  >
                    All History
                  </Link>
                  <Link
                    href="/history/stats"
                    className="block px-5 py-3 text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition-all rounded-xl mx-2"
                  >
                    Statistics
                  </Link>
                </div>
              )}
            </div>

            {/* Instructions */}
            <Link
              href="/instructions"
              className="text-white font-semibold text-base hover:text-[#ffde59] transition-colors"
            >
              Instructions
            </Link>

            {/* Data */}
            <Link
              href="/data"
              className="text-white font-semibold text-base hover:text-[#ffde59] transition-colors"
            >
              Data
            </Link>

            {/* User/Login Button */}
            <Link
              href="/login"
              className="bg-[#ffde59] text-[#10396f] font-bold px-7 py-2.5 rounded-full hover:bg-[#ffd700] hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
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

