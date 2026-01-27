'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PageBackground } from '@/components/PageBackground';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';

export default function LandingPage() {
  return (
    <PageBackground showGlow={true}>
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center space-y-10 max-w-3xl animate-slideUp">
          {/* Logo with glow */}
          <div className="relative inline-block">
            <div 
              className="absolute inset-0 rounded-full blur-3xl opacity-50"
              style={{ 
                background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)',
                transform: 'scale(2)'
              }} 
            />
            <Image
              src="/mainlogo.png"
              alt="SkyOps Logo"
              width={140}
              height={140}
              className="relative"
              priority
            />
          </div>

          {/* Title */}
          <div className="space-y-3">
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
              Exercise 1
            </h1>
            <p className="text-xl text-[var(--text-secondary)]">
              Air Traffic Control Training
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/exercise/1/flight-plan">
              <Card padding="sm" className="hover:border-[var(--border-default)] transition-colors cursor-pointer">
                <div className="flex items-center gap-3 px-4 py-2">
                  <Icon name="chart" size={18} className="text-[var(--accent-primary)]" />
                  <span className="text-sm font-medium text-white">Flight Plan</span>
                </div>
              </Card>
            </Link>
            <Link href="/exercise/1/practice-history">
              <Card padding="sm" className="hover:border-[var(--border-default)] transition-colors cursor-pointer">
                <div className="flex items-center gap-3 px-4 py-2">
                  <Icon name="clock" size={18} className="text-[var(--accent-primary)]" />
                  <span className="text-sm font-medium text-white">Practice History</span>
                </div>
              </Card>
            </Link>
          </div>

          {/* Practice Now Button */}
          <Link href="/radar">
            <Button size="lg" className="min-w-[240px] text-lg py-5">
              <Icon name="play" size={22} />
              Practice Now
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <div className="absolute bottom-8 text-center">
          <p className="text-xs text-[var(--text-muted)]">
            © 2026 SkyOps Simulation. All rights reserved.
          </p>
        </div>
      </div>
    </PageBackground>
  );
}
