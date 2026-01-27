'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PageBackground } from '@/components/PageBackground';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Logo } from '@/components/Logo';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    age: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
           email: formData.email,
           password: formData.password,
           first_name: formData.first_name,
           last_name: formData.last_name,
           age: parseInt(formData.age) || 0
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || 'Registration failed');
      }

      router.push('/login?registered=true');
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
        <div style={{ width: '100%', maxWidth: '520px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <Logo size="md" />
            <div style={{ marginTop: '20px' }}>
              <h1 style={{ 
                fontSize: '32px', 
                fontWeight: 700, 
                color: 'white',
                marginBottom: '8px',
              }}>
                Create your account
              </h1>
              <p style={{ fontSize: '16px', color: '#9ca3af' }}>
                Start your ATC training journey
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
          
            <form onSubmit={handleRegister}>
              {/* Name Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <Input
                  id="first_name"
                  type="text"
                  label="First Name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="John"
                  required
                />
                
                <Input
                  id="last_name"
                  type="text"
                  label="Last Name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Doe"
                  required
                />
              </div>

              {/* Email and Age Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <Input
                  id="email"
                  type="email"
                  label="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="pilot@skyops.com"
                  required
                  autoComplete="email"
                />

                <Input
                  id="age"
                  type="number"
                  label="Age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="25"
                />
              </div>

              {/* Password Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px' }}>
                <Input
                  id="password"
                  type="password"
                  label="Password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min. 8 characters"
                  required
                  autoComplete="new-password"
                />

                <Input
                  id="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  required
                  autoComplete="new-password"
                />
              </div>

              <Button
                type="submit"
                loading={loading}
                size="lg"
              >
                Create Account
              </Button>
            </form>

            <div style={{ 
              marginTop: '24px',
              paddingTop: '24px',
              textAlign: 'center',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            }}>
              <p style={{ fontSize: '14px', color: '#9ca3af' }}>
                Already have an account?{' '}
                <Link 
                  href="/login" 
                  style={{ color: '#f59e0b', fontWeight: 500, textDecoration: 'none' }}
                >
                  Sign in
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
