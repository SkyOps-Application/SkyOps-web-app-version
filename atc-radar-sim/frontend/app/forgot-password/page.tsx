'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AuroraInput } from '@/components/AuroraInput';
import { GlassBackground } from '@/components/GlassBackground';
import { GridOverlay } from '@/components/GridOverlay';
import { API_URL } from '@/lib/config';

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
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassBackground>
      <GridOverlay opacity={0.04} />
      
      <div className="min-h-screen flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center animate-fadeIn">
            <h1 className="text-4xl font-bold text-white tracking-tight">
              Forgot Password
            </h1>
            <p className="text-white/60 mt-2">Enter your email to receive a reset link</p>
          </div>

          <div className="glass-strong rounded-3xl px-8 py-10 shadow-2xl animate-fadeIn">
            
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-5 py-3 rounded-xl backdrop-blur-sm mb-6 text-sm" role="alert">
                {error}
              </div>
            )}

            {message && (
              <div className="bg-green-500/20 border border-green-500/50 text-green-300 px-5 py-3 rounded-xl backdrop-blur-sm mb-6 text-sm" role="alert">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <label className="block text-white/90 text-xs font-semibold mb-2 uppercase tracking-wide" htmlFor="email">
                  Email Address
                </label>
                <AuroraInput
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="pilot@skyops.com"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`
                  w-full h-12 rounded-full font-bold text-base
                  bg-gradient-to-r from-[#18c3e8] to-[#5e879e]
                  hover:from-[#18c3e8]/90 hover:to-[#5e879e]/90
                  text-white mt-2
                  transition-all duration-300
                  shadow-lg hover:shadow-xl hover:scale-[0.98]
                  ${loading ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {loading ? 'Sending Request...' : 'Send Reset Link'}
              </button>
            </form>

            <div className="mt-8 text-center">
                 <Link href="/login" className="text-white/60 hover:text-white text-sm transition-colors">
                    ← Back to Login
                 </Link>
            </div>
          </div>
        </div>
      </div>
    </GlassBackground>
  );
}
