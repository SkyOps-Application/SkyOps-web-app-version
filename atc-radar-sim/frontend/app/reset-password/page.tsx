'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
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

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${API_URL}/reset-password`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            first_name: firstName,
            last_name: lastName,
            new_password: newPassword,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Reset failed');
      }

      setSuccess('Password updated successfully! Redirecting...');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageBackground>
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8 animate-fadeIn">
          {/* Header */}
          <div className="text-center space-y-4">
            <Logo size="md" />
            <div>
              <h1 className="text-3xl font-bold text-white">
                Reset password
              </h1>
              <p className="mt-2 text-[var(--text-secondary)]">
                Verify your identity to set a new password
              </p>
            </div>
          </div>

          {/* Form Card */}
          <Card variant="elevated" padding="lg">
            {error && (
              <div className="alert alert-error mb-6">
                {error}
              </div>
            )}

            {success && (
              <div className="alert alert-success mb-6 flex items-start gap-3">
                <Icon name="check" size={20} className="flex-shrink-0 mt-0.5" />
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handleReset} className="space-y-5">
              {/* Identity Section */}
              <div className="space-y-4">
                <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wide">
                  Verify Identity
                </p>
                
                <Input
                  type="email"
                  label="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="pilot@skyops.com"
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="text"
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    required
                  />

                  <Input
                    type="text"
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <div className="divider" />

              {/* Password Section */}
              <div className="space-y-4">
                <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wide">
                  New Password
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="password"
                    label="Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    required
                  />

                  <Input
                    type="password"
                    label="Confirm"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                loading={loading}
                size="lg"
              >
                Reset Password
              </Button>
            </form>

            <div className="mt-6 pt-6 text-center border-t border-[var(--border-subtle)]">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-white transition-colors"
              >
                <Icon name="chevron-left" size={16} />
                Back to sign in
              </Link>
            </div>
          </Card>

          {/* Footer */}
          <p className="text-center text-xs text-[var(--text-muted)]">
            © 2026 SkyOps. All rights reserved.
          </p>
        </div>
      </div>
    </PageBackground>
  );
}
