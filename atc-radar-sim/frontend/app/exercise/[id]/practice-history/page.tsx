'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { PageBackground } from '@/components/PageBackground';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';

const mockSessions = [
  {
    id: 1,
    date: '2024-11-12',
    time: '14:30',
    duration: '15:45',
    score: 85,
    violations: 2,
  },
  {
    id: 2,
    date: '2024-11-11',
    time: '10:15',
    duration: '18:20',
    score: 92,
    violations: 0,
  },
  {
    id: 3,
    date: '2024-11-10',
    time: '16:45',
    duration: '12:30',
    score: 78,
    violations: 4,
  },
];

export default function PracticeHistoryPage() {
  const params = useParams();
  const exerciseId = params.id;

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#6ee7b7';
    if (score >= 75) return '#fcd34d';
    return '#fca5a5';
  };

  const getViolationStyle = (count: number) => {
    if (count === 0) return { background: 'rgba(16, 185, 129, 0.15)', color: '#6ee7b7' };
    if (count < 3) return { background: 'rgba(245, 158, 11, 0.15)', color: '#fcd34d' };
    return { background: 'rgba(239, 68, 68, 0.15)', color: '#fca5a5' };
  };

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
          {/* Header */}
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '40px',
          }}>
            <div>
              <h1 style={{ 
                fontSize: '36px', 
                fontWeight: 700, 
                color: 'white',
                marginBottom: '8px',
              }}>
                Exercise {exerciseId} History
              </h1>
              <p style={{ fontSize: '16px', color: '#9ca3af' }}>
                Review your past training sessions
              </p>
            </div>
            <Link href="/home" style={{ textDecoration: 'none' }}>
              <Button variant="secondary" size="sm">
                <Icon name="chevron-left" size={16} />
                Back to Home
              </Button>
            </Link>
          </div>

          {/* Sessions */}
          <Card variant="elevated" padding="lg">
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px',
            }}>
              <h2 style={{ 
                fontSize: '18px',
                fontWeight: 600,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <Icon name="clock" size={20} />
                Training Sessions
              </h2>
              <span style={{
                padding: '4px 12px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 600,
                background: 'rgba(245, 158, 11, 0.15)',
                color: '#fcd34d',
              }}>
                {mockSessions.length} sessions
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {mockSessions.map((session) => (
                <div
                  key={session.id}
                  style={{
                    padding: '20px',
                    borderRadius: '12px',
                    background: '#111827',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gap: '16px',
                    alignItems: 'center',
                  }}>
                    {/* Date */}
                    <div>
                      <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Date</p>
                      <p style={{ fontWeight: 500, color: 'white' }}>{session.date}</p>
                      <p style={{ fontSize: '12px', color: '#6b7280' }}>{session.time}</p>
                    </div>
                    
                    {/* Duration */}
                    <div>
                      <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Duration</p>
                      <p style={{ fontWeight: 500, color: 'white' }}>{session.duration}</p>
                    </div>
                    
                    {/* Score */}
                    <div>
                      <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Score</p>
                      <p style={{ 
                        fontSize: '24px',
                        fontWeight: 700,
                        color: getScoreColor(session.score),
                      }}>
                        {session.score}%
                      </p>
                    </div>
                    
                    {/* Violations */}
                    <div>
                      <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Violations</p>
                      <span style={{
                        display: 'inline-flex',
                        padding: '4px 12px',
                        borderRadius: '9999px',
                        fontSize: '12px',
                        fontWeight: 600,
                        ...getViolationStyle(session.violations),
                      }}>
                        {session.violations}
                      </span>
                    </div>
                    
                    {/* Action */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Link href={`/replay/${session.id}`} style={{ textDecoration: 'none' }}>
                        <Button size="sm">
                          <Icon name="play" size={14} />
                          Replay
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

              {mockSessions.length === 0 && (
                <div style={{ textAlign: 'center', padding: '48px', color: '#6b7280' }}>
                  <Icon name="clock" size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
                  <p>No practice sessions yet.</p>
                  <p style={{ fontSize: '14px' }}>Start practicing to see your history!</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </PageBackground>
  );
}
