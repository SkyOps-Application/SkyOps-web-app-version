'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuroraInput } from '@/components/AuroraInput';
import { GlassBackground } from '@/components/GlassBackground';
import { GridOverlay } from '@/components/GridOverlay';
import Image from 'next/image';
import { API_URL } from '@/lib/config';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/oauth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      localStorage.setItem('access_token', data.access_token);
      router.push('/home');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageBackground>
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
      }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <Logo size="lg" />
            <div style={{ marginTop: '24px' }}>
              <h1 style={{ 
                fontSize: '32px', 
                fontWeight: 700, 
                color: 'white',
                marginBottom: '8px',
              }}>
                Welcome back
              </h1>
              <p style={{ fontSize: '16px', color: '#9ca3af' }}>
                Sign in to continue your training
              </p>
            </div>
          </div>

          {/* Form Card */}
          <Card variant="elevated" padding="lg">
            {error && (
              <div style={{
                padding: '16px',
                borderRadius: '10px',
                marginBottom: '24px',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                color: '#fca5a5',
                fontSize: '14px',
                fontWeight: 500,
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '20px' }}>
                <Input
                  id="email"
                  type="email"
                  label="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="pilot@skyops.com"
                  required
                  autoComplete="email"
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <Input
                  id="password"
                  type="password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                />
              </div>

              <div style={{ textAlign: 'right', marginBottom: '24px' }}>
                <Link
                  href="/forgot-password"
                  style={{ 
                    fontSize: '14px', 
                    color: '#6b7280',
                    textDecoration: 'none',
                  }}
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                loading={loading}
                size="lg"
              >
                Sign In
              </Button>
            </form>

            <div style={{ 
              marginTop: '24px',
              paddingTop: '24px',
              textAlign: 'center',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            }}>
              <p style={{ fontSize: '14px', color: '#9ca3af' }}>
                Don&apos;t have an account?{' '}
                <Link
                  href="/register"
                  style={{ color: '#f59e0b', fontWeight: 500, textDecoration: 'none' }}
                >
                  Create one
                </Link>
              </p>
            </div>
          </Card>

          {/* Footer */}
          <p style={{ 
            textAlign: 'center',
            marginTop: '32px',
            fontSize: '12px',
            color: '#6b7280',
          }}>
            © 2026 SkyOps. All rights reserved.
          </p>
        </div>
      </div>
    </PageBackground>
  );
}
