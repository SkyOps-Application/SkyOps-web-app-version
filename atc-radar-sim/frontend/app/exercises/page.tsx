'use client';

import React from 'react';
import Link from 'next/link';
import { PageBackground } from '@/components/PageBackground';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';

const modes = [
  {
    icon: 'book' as const,
    title: 'Tutorial',
    description: 'Learn the commands and controls before starting your training.',
    href: '/instructions',
    gradient: 'linear-gradient(135deg, #10b981, #14b8a6)',
    badge: 'Recommended',
  },
  {
    icon: 'airplane' as const,
    title: 'Start Exercise',
    description: 'Enter the radar simulator and practice air traffic control.',
    href: '/radar',
    gradient: 'linear-gradient(135deg, #d946ef, #a21caf)',
    badge: null,
  },
];

export default function ExercisesPage() {
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
            <h1 style={{ 
              fontSize: '48px', 
              fontWeight: 700, 
              color: 'white',
              marginBottom: '16px',
            }}>
              Select Mode
            </h1>
            <p style={{ 
              fontSize: '18px', 
              color: '#9ca3af',
              maxWidth: '480px',
              margin: '0 auto',
            }}>
              Choose how you want to train. New pilots should start with the tutorial.
            </p>
          </div>

          {/* Mode Cards */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '48px',
          }}>
            {modes.map((mode) => (
              <Link 
                key={mode.href}
                href={mode.href}
                style={{ textDecoration: 'none' }}
              >
                <Card 
                  variant="elevated" 
                  padding="lg"
                  style={{ 
                    height: '100%',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {mode.badge && (
                    <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
                      <span style={{
                        display: 'inline-flex',
                        padding: '4px 12px',
                        borderRadius: '9999px',
                        fontSize: '12px',
                        fontWeight: 600,
                        background: 'rgba(16, 185, 129, 0.15)',
                        color: '#6ee7b7',
                      }}>
                        {mode.badge}
                      </span>
                    </div>
                  )}
                  
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    background: mode.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '24px',
                  }}>
                    <Icon name={mode.icon} size={28} className="text-white" />
                  </div>
                  
                  <h2 style={{ 
                    fontSize: '24px', 
                    fontWeight: 700, 
                    color: 'white',
                    marginBottom: '12px',
                  }}>
                    {mode.title}
                  </h2>
                  
                  <p style={{ 
                    fontSize: '15px', 
                    color: '#9ca3af',
                    lineHeight: 1.6,
                    marginBottom: '20px',
                  }}>
                    {mode.description}
                  </p>
                  
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#e879f9',
                    fontWeight: 500,
                  }}>
                    <span>Start now</span>
                    <Icon name="chevron-right" size={18} />
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* Exercise List */}
          <Card variant="elevated" padding="lg">
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px',
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'white' }}>
                Available Exercises
              </h2>
              <span style={{
                padding: '4px 12px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 600,
                background: 'rgba(217, 70, 239, 0.15)',
                color: '#f0abfc',
              }}>
                3 exercises
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[1, 2, 3].map((num) => (
                <div 
                  key={num}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    borderRadius: '12px',
                    background: '#111827',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'rgba(217, 70, 239, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#d946ef',
                      fontWeight: 700,
                    }}>
                      {num}
                    </div>
                    <div>
                      <h3 style={{ fontWeight: 600, color: 'white', marginBottom: '2px' }}>
                        Exercise {num}
                      </h3>
                      <p style={{ fontSize: '13px', color: '#6b7280' }}>
                        Basic ATC operations
                      </p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Link 
                      href={`/exercise/${num}/practice-history`}
                      style={{
                        padding: '8px 12px',
                        fontSize: '13px',
                        color: '#9ca3af',
                        textDecoration: 'none',
                        borderRadius: '6px',
                        transition: 'all 0.2s',
                      }}
                    >
                      History
                    </Link>
                    <Link 
                      href="/radar"
                      style={{
                        padding: '8px 16px',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#0a0f1a',
                        background: 'linear-gradient(135deg, #d946ef, #e879f9)',
                        textDecoration: 'none',
                        borderRadius: '8px',
                      }}
                    >
                      Practice
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </PageBackground>
  );
}
