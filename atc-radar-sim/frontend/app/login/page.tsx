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
        <div className="w-full max-w-lg space-y-16">

          {/* HERO */}
          <div className="text-center space-y-16 animate-fadeIn">
            {/* Logo */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#18c3e8]/30 via-[#e5b14b]/30 to-[#d34f98]/30 rounded-full blur-2xl opacity-60 animate-pulse" />
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <Image
                    src="/mainlogo.png"
                    alt="SkyOps Logo"
                    width={140}
                    height={140}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="space-y-6">
              <h1
                className="text-6xl font-bold text-white tracking-tight"
                style={{ fontFamily: 'system-ui, -apple-system' }}
              >
                SkyOps
              </h1>

              {/* ✅ pb-8 = ~30px như DevTools */}
              <p className="text-xl text-gray-400 font-medium pb-8">
                Air Traffic Control Simulator
              </p>
            </div>
          </div>

          {/* LOGIN CARD */}
          <div className="glass-strong rounded-3xl p-10 shadow-2xl animate-fadeIn">
            {/* ✅ thêm padding cho title */}
            <h2 className="text-4xl font-bold text-center text-white px-6 pt-8 pb-4 mb-12 leading-tight">
              Sign In
            </h2>

            {error && (
              <div
                className="bg-red-500/20 border border-red-500/50 text-red-300 px-6 py-4 rounded-2xl backdrop-blur-sm mb-10 text-base"
                role="alert"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="flex flex-col gap-10">
              <div>
                <label
                  htmlFor="email"
                  className="block text-white/90 text-sm font-bold uppercase tracking-wider mb-2 ml-1"
                >
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

              <div>
                <label
                  htmlFor="password"
                  className="block text-white/90 text-sm font-bold uppercase tracking-wider mb-2 ml-1"
                >
                  Password
                </label>
                <AuroraInput
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="flex justify-end pt-2">
                <Link
                  href="/forgot-password"
                  className="text-sm text-white/70 hover:text-white transition-colors font-medium"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`
                  w-full h-16 rounded-full font-bold text-lg
                  bg-gradient-to-r from-[#18c3e8] to-[#5e879e]
                  hover:from-[#18c3e8]/90 hover:to-[#5e879e]/90
                  text-white
                  transition-all duration-300
                  shadow-xl hover:shadow-2xl hover:scale-[0.98]
                  mt-6
                  ${loading ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-10 pt-6 text-center border-t border-white/10">
              <p className="text-white/60 text-base">
                Don't have an account?{' '}
                <Link
                  href="/register"
                  className="text-[#18c3e8] hover:text-[#5e879e] font-bold transition-colors"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>

        </div>
      </div>
    </GlassBackground>
  );
}
