'use client';

import React from 'react';
import { PageBackground } from '@/components/PageBackground';
import { Card } from '@/components/Card';
import { Logo } from '@/components/Logo';
import { Icon } from '@/components/Icon';

const features = [
  { icon: 'chart' as const, text: 'Realistic radar display with waypoints' },
  { icon: 'airplane' as const, text: 'Real-time aircraft simulation' },
  { icon: 'gear' as const, text: 'Command-based control system' },
  { icon: 'alert' as const, text: 'Separation monitoring & alerts' },
  { icon: 'book' as const, text: 'Step-by-step tutorial' },
  { icon: 'trophy' as const, text: 'Score tracking & history' },
];

export default function AboutPage() {
  return (
    <PageBackground>
      <div style={{ 
        minHeight: '100vh', 
        paddingTop: '100px', 
        paddingBottom: '60px',
        paddingLeft: '24px',
        paddingRight: '24px',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <Logo size="lg" />
            <div style={{ marginTop: '24px' }}>
              <h1 style={{ 
                fontSize: '42px', 
                fontWeight: 700, 
                color: 'white',
                marginBottom: '12px',
              }}>
                About{' '}
                <span style={{ 
                  background: 'linear-gradient(135deg, #d946ef, #f0abfc)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  SkyOps
                </span>
              </h1>
              <p style={{ fontSize: '18px', color: '#9ca3af' }}>
                Air Traffic Control Training Simulator
              </p>
            </div>
          </div>

          {/* Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* About Section */}
            <Card variant="elevated" padding="lg">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #d946ef, #a21caf)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Icon name="info" size={22} className="text-white" />
                </div>
                <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'white' }}>About SkyOps</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: '#9ca3af', lineHeight: 1.7 }}>
                <p>
                  SkyOps is a cutting-edge Air Traffic Control (ATC) radar simulation platform 
                  designed to bridge the gap between theoretical knowledge and practical application.
                </p>
                <p>
                  Our mission is to provide aviation enthusiasts, students, and professionals 
                  with a highly realistic environment to practice radar monitoring, vectoring, 
                  and airspace management.
                </p>
                <p>
                  Built with modern web technologies and real-time WebSocket communication, 
                  SkyOps delivers a seamless, high-fidelity experience right in your browser.
                </p>
              </div>
            </Card>

            {/* Features Section */}
            <Card variant="elevated" padding="lg">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #10b981, #14b8a6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Icon name="star" size={22} className="text-white" />
                </div>
                <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'white' }}>Key Features</h2>
              </div>
              
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '12px',
              }}>
                {features.map((feature) => (
                  <div 
                    key={feature.text}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      padding: '14px',
                      borderRadius: '10px',
                      background: '#111827',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                    }}
                  >
                    <Icon name={feature.icon} size={18} className="text-fuchsia-500" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '14px', color: '#9ca3af' }}>{feature.text}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Technology Section */}
            <Card variant="elevated" padding="lg">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Icon name="gear" size={22} className="text-white" />
                </div>
                <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'white' }}>Technology Stack</h2>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['Next.js', 'React', 'TypeScript', 'Socket.IO', 'Node.js', 'Python', 'PostgreSQL', 'Redis'].map((tech) => (
                  <span 
                    key={tech}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '9999px',
                      background: '#111827',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      fontSize: '14px',
                      color: '#9ca3af',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageBackground>
  );
}
