'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PageBackground } from '@/components/PageBackground';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { Logo } from '@/components/Logo';

const features = [
  {
    icon: 'airplane' as const,
    title: 'Start Training',
    description: 'Begin your ATC simulation exercises',
    href: '/exercises',
    gradient: 'linear-gradient(135deg, #f59e0b, #ea580c)',
  },
  {
    icon: 'book' as const,
    title: 'Instructions',
    description: 'Learn commands and controls',
    href: '/instructions',
    gradient: 'linear-gradient(135deg, #10b981, #14b8a6)',
  },
  {
    icon: 'info' as const,
    title: 'About SkyOps',
    description: 'Learn about our platform',
    href: '/about',
    gradient: 'linear-gradient(135deg, #3b82f6, #6366f1)',
  },
];

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return (
    <PageBackground>
      <div style={{ 
        minHeight: '100vh', 
        paddingTop: '100px', 
        paddingBottom: '60px',
        paddingLeft: '24px',
        paddingRight: '24px',
      }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
          {/* Hero Section */}
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <Logo size="xl" />
            <div style={{ marginTop: '24px' }}>
              <h1 style={{ 
                fontSize: '48px', 
                fontWeight: 700, 
                color: 'white',
                marginBottom: '16px',
                lineHeight: 1.2,
              }}>
                Welcome to{' '}
                <span style={{ 
                  background: 'linear-gradient(135deg, #f59e0b, #fcd34d)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  SkyOps
                </span>
              </h1>
              <p style={{ 
                fontSize: '18px', 
                color: '#9ca3af',
                maxWidth: '512px',
                margin: '0 auto',
                lineHeight: 1.6,
              }}>
                Your professional air traffic control training platform. 
                Practice radar operations and master ATC procedures.
              </p>
            </div>
          </div>

          {/* Feature Cards */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '48px',
          }}>
            {features.map((feature) => (
              <Link 
                key={feature.href} 
                href={feature.href}
                style={{ textDecoration: 'none' }}
              >
                <Card 
                  variant="elevated" 
                  padding="lg"
                  style={{ 
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '12px',
                    background: feature.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                  }}>
                    <Icon name={feature.icon} size={24} className="text-white" />
                  </div>
                  <h3 style={{ 
                    fontSize: '20px', 
                    fontWeight: 600, 
                    color: 'white',
                    marginBottom: '8px',
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{ 
                    fontSize: '14px', 
                    color: '#9ca3af',
                    lineHeight: 1.5,
                  }}>
                    {feature.description}
                  </p>
                  <div style={{ 
                    marginTop: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#f59e0b',
                    fontSize: '14px',
                    fontWeight: 500,
                  }}>
                    <span>Get started</span>
                    <Icon name="chevron-right" size={16} />
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* Quick Start Section */}
          <Card variant="elevated" padding="lg" style={{ textAlign: 'center' }}>
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: 700, 
              color: 'white',
              marginBottom: '12px',
            }}>
              Ready to practice?
            </h2>
            <p style={{ 
              color: '#9ca3af',
              marginBottom: '24px',
              maxWidth: '400px',
              margin: '0 auto 24px',
            }}>
              Jump straight into the radar simulator and start your training session now.
            </p>
            <Link 
              href="/radar"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 32px',
                fontSize: '18px',
                fontWeight: 600,
                color: '#0a0f1a',
                background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
                borderRadius: '12px',
                textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(245, 158, 11, 0.3)',
                transition: 'all 0.2s ease',
              }}
            >
              <Icon name="play" size={20} />
              Launch Simulator
            </Link>
          </Card>
        </div>
      </div>
    </PageBackground>
  );
}
