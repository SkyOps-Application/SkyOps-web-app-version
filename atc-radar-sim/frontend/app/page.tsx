'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PageBackground } from '@/components/PageBackground';
import { Button } from '@/components/Button';

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      router.push('/home');
    }
  }, [router]);

  return (
    <PageBackground showGlow={true}>
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center space-y-12 max-w-2xl animate-slideUp">
          {/* Logo */}
          <div className="relative inline-block">
            <div 
              className="absolute inset-0 rounded-full blur-3xl opacity-40"
              style={{ 
                background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)',
                transform: 'scale(2)'
              }} 
            />
            <Image
              src="/mainlogo.png"
              alt="SkyOps Logo"
              width={160}
              height={160}
              className="relative"
              priority
            />
          </div>

          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
              <span className="text-gradient">SkyOps</span>
            </h1>
            <p className="text-xl md:text-2xl text-[var(--text-secondary)] font-light">
              Professional Air Traffic Control Simulator
            </p>
          </div>

          {/* Description */}
          <p className="text-[var(--text-muted)] text-lg leading-relaxed max-w-lg mx-auto">
            Master the art of air traffic control with our advanced radar simulation platform. 
            Practice vectoring, separation management, and real-time decision making.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/login" className="w-full sm:w-auto">
              <Button size="lg" className="min-w-[180px]">
                Sign In
              </Button>
            </Link>
            <Link href="/register" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="min-w-[180px]">
                Create Account
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-[var(--border-subtle)]">
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient">100+</div>
              <div className="text-sm text-[var(--text-muted)] mt-1">Exercises</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient">Real-time</div>
              <div className="text-sm text-[var(--text-muted)] mt-1">Simulation</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient">Pro</div>
              <div className="text-sm text-[var(--text-muted)] mt-1">Training</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-8 text-center">
          <p className="text-xs text-[var(--text-muted)]">
            © 2026 SkyOps Simulation System. All rights reserved.
          </p>
        </div>
      </div>
    </PageBackground>
  );
}
