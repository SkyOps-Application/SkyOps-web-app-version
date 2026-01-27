'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AuroraInput } from '@/components/AuroraInput';
import { GlassBackground } from '@/components/GlassBackground';
import { GridOverlay } from '@/components/GridOverlay';
import { API_URL } from '@/lib/config';
import { PageBackground } from '@/components/PageBackground';
import { Logo } from '@/components/Logo';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Request failed');
      }

      setMessage(data.message || 'If an account exists for this email, you will receive a reset link shortly.');
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
            <Logo size="md" />
            <div style={{ marginTop: '24px' }}>
              <h1 style={{ 
                fontSize: '32px', 
                fontWeight: 700, 
                color: 'white',
                marginBottom: '8px',
              }}>
                Forgot password?
              </h1>
              <p style={{ fontSize: '16px', color: '#9ca3af' }}>
                No worries, we&apos;ll send you reset instructions
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

            {message && (
              <div style={{
                padding: '16px',
                borderRadius: '10px',
                marginBottom: '24px',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                color: '#6ee7b7',
                fontSize: '14px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
              }}>
                <Icon name="check" size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '24px' }}>
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

              <Button
                type="submit"
                loading={loading}
                size="lg"
              >
                Send Reset Link
              </Button>
            </form>

            <div style={{ 
              marginTop: '24px',
              paddingTop: '24px',
              textAlign: 'center',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            }}>
              <Link 
                href="/login" 
                style={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px', 
                  color: '#9ca3af',
                  textDecoration: 'none',
                }}
              >
                <Icon name="chevron-left" size={16} />
                Back to sign in
              </Link>
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
