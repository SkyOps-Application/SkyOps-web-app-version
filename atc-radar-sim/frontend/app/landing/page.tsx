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
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '80px 24px 40px 24px',
      }}>
        {/* Spacer to center the main block vertically */}
        <div style={{ flex: 1 }} />

        {/* Center Content */}
        <div style={{
          textAlign: 'center',
          maxWidth: '560px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* Logo with glow */}
          <div style={{
            position: 'relative',
            display: 'inline-block',
            marginBottom: '48px',
          }}>
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
              style={{ position: 'relative' }}
              priority
            />
          </div>

          {/* Title */}
          <div style={{ marginBottom: '40px' }}>
            <h1 style={{ 
              fontSize: '48px', 
              fontWeight: 700, 
              color: 'white',
              marginBottom: '12px',
              letterSpacing: '-0.02em',
            }}>
              Exercise 1
            </h1>
            <p style={{ 
              fontSize: '18px', 
              color: 'var(--text-secondary)',
            }}>
              Air Traffic Control Training
            </p>
          </div>

          {/* Quick Actions */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '48px',
          }}>
            <Link href="/exercise/1/practice-history" style={{ textDecoration: 'none' }}>
              <Card padding="sm" className="hover:border-[var(--border-default)] transition-colors cursor-pointer">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 16px' }}>
                  <Icon name="clock" size={18} className="text-[var(--accent-primary)]" />
                  <span style={{ fontSize: '14px', fontWeight: 500, color: 'white' }}>Practice History</span>
                </div>
              </Card>
            </Link>
          </div>

          {/* Practice Now Button */}
          <Link href="/radar" style={{ textDecoration: 'none' }}>
            <Button size="lg" style={{ minWidth: '240px', fontSize: '18px', padding: '20px 32px' }}>
              <Icon name="play" size={22} />
              Practice Now
            </Button>
          </Link>
        </div>

        {/* Spacer to push footer down */}
        <div style={{ flex: 1 }} />

        {/* Footer */}
        <div style={{ textAlign: 'center', paddingTop: '40px' }}>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            © 2026 SkyOps Simulation. All rights reserved.
          </p>
        </div>
      </div>
    </PageBackground>
  );
}
