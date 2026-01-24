
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('access_token');
      setIsLoggedIn(!!token);
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setIsLoggedIn(false);
    window.location.href = '/login';
  };

  if (!isLoggedIn) return null; // Only show Navbar if logged in (or handle differently on landing?)
  // Actually, user might want Navbar on landing too but customized. 
  // For now, based on request "home view thì sẽ có cái nav bar", implying it belongs to app pages.
  // But landing page had navbar before. 
  // Let's assume on Landing page we DON'T show this specific App Navbar, or we make it smart.
  // The Landing Page I wrote doesn't use Navbar.
  // So this Navbar is for the App (/home, /about, etc).

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-7xl">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl px-8 py-4 shadow-2xl border border-white/20 hover:bg-white/15 transition-colors duration-300">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/home" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <span className="text-2xl font-bold text-white tracking-wider">SkyOps</span>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center gap-8">
            <Link
              href="/about"
              className="text-white font-semibold text-lg hover:text-[#ffde59] transition-colors"
            >
              About
            </Link>

            <Link
              href="/profile"
              className="text-white font-semibold text-lg hover:text-[#ffde59] transition-colors"
            >
              Profiles
            </Link>

            <Link
              href="/exercises"
              className="text-white font-semibold text-lg hover:text-[#ffde59] transition-colors"
            >
              Exercises
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-[#ffde59] text-[#10396f] font-bold px-7 py-2.5 rounded-full hover:bg-[#ffd700] hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
