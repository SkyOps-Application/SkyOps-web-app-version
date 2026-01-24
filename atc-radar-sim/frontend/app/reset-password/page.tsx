'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuroraInput } from '@/components/AuroraInput';
import { GlassBackground } from '@/components/GlassBackground';
import { GridOverlay } from '@/components/GridOverlay';

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

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reset-password`,
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

      setSuccess('Password updated successfully! Redirecting to login...');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassBackground>
      <GridOverlay opacity={0.04} />

      <div className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-lg space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 animate-fadeIn">
            <h1 className="text-5xl font-bold text-white tracking-tight">
              Reset Password
            </h1>
            <p className="text-lg text-white/70">
              Verify your identity to set a new password
            </p>
          </div>

          {/* Card */}
          <div className="glass-strong rounded-3xl p-12 shadow-2xl animate-fadeIn space-y-10">
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-6 py-4 rounded-2xl backdrop-blur-sm text-base">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-500/20 border border-green-500/50 text-green-300 px-6 py-4 rounded-2xl backdrop-blur-sm text-base">
                {success}
              </div>
            )}

            <form onSubmit={handleReset} className="space-y-12">
              {/* Identity section */}
              <section className="space-y-8">
                <div className="space-y-4">
                  <label className="block text-white/90 text-sm font-bold uppercase tracking-wider ml-1">
                    Email Address
                  </label>
                  <AuroraInput
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="pilot@skyops.com"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="block text-white/90 text-sm font-bold uppercase tracking-wider ml-1">
                      First Name
                    </label>
                    <AuroraInput
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="John"
                      required
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="block text-white/90 text-sm font-bold uppercase tracking-wider ml-1">
                      Last Name
                    </label>
                    <AuroraInput
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
              </section>

              <div className="h-px bg-white/10 my-10" />

              {/* Password section */}
              <section className="space-y-8">
                <div className="space-y-4">
                  <label className="block text-white/90 text-sm font-bold uppercase tracking-wider ml-1">
                    New Password
                  </label>
                  <AuroraInput
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min 8 characters"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <label className="block text-white/90 text-sm font-bold uppercase tracking-wider ml-1">
                    Confirm Password
                  </label>
                  <AuroraInput
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    required
                  />
                </div>
              </section>

              <button
                type="submit"
                disabled={loading}
                className={`
                  w-full h-16 rounded-full font-bold text-lg
                  bg-gradient-to-r from-[#18c3e8] to-[#5e879e]
                  hover:from-[#18c3e8]/90 hover:to-[#5e879e]/90
                  text-white mt-8
                  transition-all duration-300
                  shadow-xl hover:shadow-2xl hover:scale-[0.98]
                  ${loading ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {loading ? 'Verifying & Updating...' : 'Set New Password'}
              </button>
            </form>

            <div className="pt-6 text-center">
              <Link
                href="/login"
                className="text-white/60 hover:text-white text-base font-medium transition-colors"
              >
                ← Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </GlassBackground>
  );
}
