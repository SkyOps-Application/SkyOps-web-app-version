'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from './Icon';

const navItems = [
  { href: '/home', label: 'Home', icon: 'home' as const },
  { href: '/exercises', label: 'Exercises', icon: 'airplane' as const },
  { href: '/profile', label: 'Profile', icon: 'user' as const },
  { href: '/about', label: 'About', icon: 'info' as const },
];

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('access_token');
      setIsLoggedIn(!!token);
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, [pathname]);


  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setIsLoggedIn(false);
    window.location.href = '/login';
  };

  // Only hide navbar on auth pages, radar page, and landing page
  const hiddenPaths = ['/login', '/register', '/forgot-password', '/reset-password', '/radar'];
  const shouldHide = hiddenPaths.some(path => pathname.startsWith(path)) || pathname === '/';
  
  if (!isLoggedIn || shouldHide) return null;

  return (
    <nav 
      style={{
        position: 'fixed',
        top: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        width: 'calc(100% - 48px)',
        maxWidth: '900px',
      }}
    >
      <div 
        style={{
          display: 'flex',
          height: '56px',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          backgroundColor: 'rgba(17, 24, 39, 0.75)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Logo */}
        <Link href="/home" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <Image
            src="/mainlogo.png"
            alt="SkyOps"
            width={32}
            height={32}
          />
          <span style={{ fontSize: '16px', fontWeight: 600, color: 'white' }}>
            SkyOps
          </span>
        </Link>

        {/* Navigation Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/home' && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  color: isActive ? '#d946ef' : '#9ca3af',
                  backgroundColor: isActive ? 'rgba(217, 70, 239, 0.12)' : 'transparent',
                }}
              >
                <Icon name={item.icon} size={16} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 14px',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: 500,
            color: '#9ca3af',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <Icon name="logout" size={16} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}
