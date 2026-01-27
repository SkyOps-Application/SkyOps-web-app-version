'use client';

import React, { useEffect, useState } from 'react';
import { PageBackground } from '@/components/PageBackground';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';

interface UserProfile {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  age: number;
  role: string;
  email: string;
}

interface HistoryRecord {
  id: number;
  duration_seconds: number;
  violations_count: number;
  traffic_count: number;
  timestamp: string;
  score: number;
  start_time: string;
  end_time: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) return;

      try {
        const [profileRes, historyRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);
        
        if (profileRes.ok) {
          const pData = await profileRes.json();
          setProfile(pData);
        }

        if (historyRes.ok) {
          const hData = await historyRes.json();
          setHistory(hData);
        }
      } catch (e) {
        console.error("Failed to fetch data", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalFlightTime = Math.floor(history.reduce((acc, curr) => acc + curr.duration_seconds, 0) / 60);
  const avgScore = history.length > 0 
    ? Math.round(history.reduce((acc, curr) => acc + (curr.score || 0), 0) / history.length) 
    : 0;

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
          <Card variant="elevated" padding="lg">
            {/* Profile Header */}
            <div style={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '24px',
              marginBottom: '40px',
              paddingBottom: '32px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
              {/* Avatar */}
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                fontWeight: 700,
                color: 'white',
                boxShadow: '0 8px 24px rgba(245, 158, 11, 0.3)',
              }}>
                {profile ? profile.first_name[0].toUpperCase() : 'P'}
              </div>
              
              {/* Info */}
              <div style={{ textAlign: 'center' }}>
                <h1 style={{ 
                  fontSize: '28px', 
                  fontWeight: 700, 
                  color: 'white',
                  marginBottom: '12px',
                }}>
                  {profile ? `${profile.first_name} ${profile.last_name}` : 'Loading...'}
                </h1>
                {profile && (
                  <div style={{ 
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '16px',
                    justifyContent: 'center',
                    fontSize: '14px',
                    color: '#9ca3af',
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Icon name="mail" size={16} />
                      {profile.email}
                    </span>
                    {profile.age > 0 && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Icon name="user" size={16} />
                        {profile.age} years old
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Stats Grid */}
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              marginBottom: '40px',
            }}>
              {[
                { label: 'Total Sessions', value: history.length },
                { label: 'Total Flight Time', value: `${totalFlightTime}m` },
                { label: 'Average Score', value: avgScore, highlight: true },
              ].map((stat) => (
                <div 
                  key={stat.label}
                  style={{
                    background: 'linear-gradient(135deg, rgba(31, 41, 55, 0.6), rgba(17, 24, 39, 0.8))',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '12px',
                    padding: '24px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ 
                    fontSize: '12px',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: '#6b7280',
                    marginBottom: '8px',
                  }}>
                    {stat.label}
                  </div>
                  <div style={{ 
                    fontSize: '32px',
                    fontWeight: 700,
                    color: stat.highlight ? '#f59e0b' : 'white',
                  }}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            {/* History Table */}
            <div>
              <h2 style={{ 
                fontSize: '18px',
                fontWeight: 600,
                color: 'white',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <Icon name="clock" size={20} />
                Simulation History
              </h2>
              
              <div style={{ 
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                overflow: 'hidden',
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: 'rgba(31, 41, 55, 0.5)' }}>
                      {['Date', 'Duration', 'Traffic', 'Violations', 'Score'].map((header) => (
                        <th 
                          key={header}
                          style={{
                            padding: '16px 20px',
                            textAlign: 'left',
                            fontSize: '12px',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            color: '#6b7280',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                          }}
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={5} style={{ textAlign: 'center', padding: '32px', color: '#6b7280' }}>
                          Loading...
                        </td>
                      </tr>
                    ) : history.length === 0 ? (
                      <tr>
                        <td colSpan={5} style={{ textAlign: 'center', padding: '32px', color: '#6b7280' }}>
                          No history records found. Start practicing to see your progress!
                        </td>
                      </tr>
                    ) : (
                      history.map((record) => (
                        <tr 
                          key={record.id}
                          style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}
                        >
                          <td style={{ padding: '16px 20px', color: 'white', fontSize: '14px' }}>
                            {new Date(record.timestamp).toLocaleDateString()}
                            <span style={{ color: '#6b7280', marginLeft: '8px', fontSize: '12px' }}>
                              {new Date(record.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </td>
                          <td style={{ padding: '16px 20px', color: '#9ca3af', fontSize: '14px' }}>
                            {Math.floor(record.duration_seconds / 60)}m {record.duration_seconds % 60}s
                          </td>
                          <td style={{ padding: '16px 20px', color: '#9ca3af', fontSize: '14px' }}>
                            {record.traffic_count}
                          </td>
                          <td style={{ padding: '16px 20px' }}>
                            <span style={{
                              display: 'inline-flex',
                              padding: '4px 12px',
                              borderRadius: '9999px',
                              fontSize: '12px',
                              fontWeight: 600,
                              background: record.violations_count > 0 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                              color: record.violations_count > 0 ? '#fca5a5' : '#6ee7b7',
                            }}>
                              {record.violations_count}
                            </span>
                          </td>
                          <td style={{ padding: '16px 20px', fontWeight: 600, color: '#f59e0b', fontSize: '14px' }}>
                            {record.score}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageBackground>
  );
}
