
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SFSymbol } from './SFSymbol';

export function Navbar({ position = 'top' }: { position?: 'top' | 'bottom' }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('access_token');
      setIsLoggedIn(!!token);
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  useEffect(() => {
    // Add nav item click handler for active state
    const navItems = navRef.current?.querySelectorAll('.nav-item');
    if (navItems) {
      navItems.forEach(item => {
        item.addEventListener('click', function(e) {
          // Update active state on click
          const target = e.currentTarget as HTMLElement;
          navItems.forEach(navItem => navItem.classList.remove('active'));
          target.classList.add('active');
        });
      });
      
      return () => {
        navItems.forEach(item => {
          item.removeEventListener('click', () => {});
        });
      };
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setIsLoggedIn(false);
    window.location.href = '/login';
  };

  if (!isLoggedIn) return null;

  return (
    <nav ref={navRef} className={`fixed ${position === 'bottom' ? 'bottom-6' : 'top-6'} left-0 right-0 z-[100] flex justify-center px-6`}>
      <div className="glass-nav">
        <div className="glass-filter"></div>
        <div className="glass-overlay"></div>
        <div className="glass-specular"></div>
        <div className="glass-content">
          <div className="flex items-center justify-between w-full">
            {/* Logo */}
            <Link href="/home" className="flex items-center gap-3 hover:opacity-90 transition-opacity flex-shrink-0">
              <Image
                src="/SkyOps-logo-text.png"
                alt="SkyOps Logo"
                width={140}
                height={35}
                className="h-9 w-auto"
              />
            </Link>

            {/* Navigation Items */}
            <ul className="nav-list flex-1">
              <li>
                <Link
                  href="/about"
                  className={`nav-item ${pathname === '/about' ? 'active' : ''}`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className={`nav-item ${pathname === '/profile' ? 'active' : ''}`}
                >
                  Profiles
                </Link>
              </li>
              <li>
                <Link
                  href="/exercises"
                  className={`nav-item ${pathname === '/exercises' ? 'active' : ''}`}
                >
                  Exercises
                </Link>
              </li>
            </ul>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-[#ffde59] text-[#10396f] font-bold px-6 py-2 rounded-full hover:bg-[#ffd700] hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 flex-shrink-0 ml-6"
            >
              <SFSymbol name="arrow.right" className="w-5 h-5" size={20} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
