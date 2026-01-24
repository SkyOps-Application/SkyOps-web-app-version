'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SFSymbol } from './SFSymbol';

export function Navbar({ position = 'bottom' }: { position?: 'top' | 'bottom' }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const listRef = useRef<HTMLUListElement>(null);
  
  // Animation state
  const [bubbleProps, setBubbleProps] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('access_token');
      // Simple check. Real app might verify expiry.
      setIsLoggedIn(!!token);
    };

    checkAuth();
    
    // Listen for storage events (e.g. login/logout in another tab)
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  useEffect(() => {
    if (!listRef.current) return;

    // Find the active link
    // Logic: exact match OR starts with (for nested routes), excluding specific overlaps if any
    const links = Array.from(listRef.current.querySelectorAll('a'));
    
    const activeLink = links.find(link => {
        const href = link.getAttribute('href');
        if (!href) return false;
        if (href === pathname) return true;
        // Handle nested routes (e.g. /exercise/1) - strictly if not root
        if (href !== '/home' && pathname.startsWith(href)) return true;
        return false;
    });

    if (activeLink) {
        const { offsetLeft, offsetWidth } = activeLink as HTMLElement;
        setBubbleProps({ left: offsetLeft, width: offsetWidth, opacity: 1 });
    } else {
        setBubbleProps(prev => ({ ...prev, opacity: 0 }));
    }

  }, [pathname, isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setIsLoggedIn(false);
    window.location.href = '/login';
  };

  if (!isLoggedIn) return null;

  return (
    <nav className={`fixed ${position === 'bottom' ? 'bottom-6' : 'top-6'} left-0 right-0 z-[100] flex justify-center px-6 pointer-events-none`}>
      <div className="glass-nav rounded-full px-4 py-2 pointer-events-auto shadow-2xl bg-black/40 backdrop-blur-xl border border-white/10 relative">
        {/* Glass Content */}
        <div className="flex items-center justify-between gap-8 h-12 relative z-10">
            {/* Logo */}
            <Link href="/home" className="flex items-center gap-3 hover:opacity-80 transition-opacity flex-shrink-0 pl-2">
              <Image
                src="/SkyOps-logo-text.png"
                alt="SkyOps Logo"
                width={100}
                height={25}
                className="h-7 w-auto"
              />
            </Link>

            {/* Navigation Items Container with Bubble */}
            <div className="relative">
                {/* Sliding Bubble */}
                <div 
                    className="absolute top-0 bottom-0 my-auto h-10 bg-white/15 backdrop-blur-md rounded-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-[inset_0_0_10px_rgba(255,255,255,0.1)] border border-white/20"
                    style={{ 
                        left: bubbleProps.left, 
                        width: bubbleProps.width, 
                        opacity: bubbleProps.opacity,
                        height: '100%' 
                    }}
                />

                <ul ref={listRef} className="flex items-center gap-2 relative z-20">
                    <li>
                        <Link
                        href="/about"
                        className={`block px-6 py-2 rounded-full text-sm font-bold transition-colors duration-300 ${
                            pathname === '/about' ? 'text-white text-shadow-glow' : 'text-gray-400 hover:text-white'
                        }`}
                        >
                        About
                        </Link>
                    </li>
                    <li>
                        <Link
                        href="/profile"
                        className={`block px-6 py-2 rounded-full text-sm font-bold transition-colors duration-300 ${
                            pathname === '/profile' ? 'text-white text-shadow-glow' : 'text-gray-400 hover:text-white'
                        }`}
                        >
                        Profiles
                        </Link>
                    </li>
                    <li>
                        <Link
                        href="/exercises"
                        className={`block px-6 py-2 rounded-full text-sm font-bold transition-colors duration-300 ${
                            pathname.startsWith('/exercises') ? 'text-white text-shadow-glow' : 'text-gray-400 hover:text-white'
                        }`}
                        >
                        Exercises
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-[#ffde59] text-[#10396f] font-bold p-2 rounded-full hover:bg-[#ffd700] hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center w-10 h-10"
              title="Logout"
            >
              <SFSymbol name="arrow.right" className="w-5 h-5 -rotate-90 md:rotate-0" size={18} />
            </button>
        </div>
      </div>
    </nav>
  );
}
