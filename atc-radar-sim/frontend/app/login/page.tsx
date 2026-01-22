
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuroraInput } from '@/components/AuroraInput';
import { GlassBackground } from '@/components/GlassBackground';
import { GridOverlay } from '@/components/GridOverlay';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailActive, setEmailActive] = useState(false);
  const [passwordActive, setPasswordActive] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/oauth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store token and user info
      localStorage.setItem('access_token', data.access_token);
      
      // Redirect to home dashboard
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
        <div className="w-full max-w-md space-y-12">
          {/* Logo and Title */}
          <div className="text-center space-y-10 animate-fadeIn">
            <div className="flex justify-center">
              <div className="relative">
                {/* Glow effect */}
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
            
            <div className="space-y-4">
              <h1 className="text-6xl font-bold text-white tracking-tight" style={{ fontFamily: 'system-ui, -apple-system' }}>
                SkyOps
              </h1>
              <p className="text-xl text-gray-400 font-medium">Air Traffic Control Simulator</p>
            </div>
          </div>

          {/* Login Card */}
          <div className="glass-strong rounded-3xl px-10 py-12 shadow-2xl animate-fadeIn">
            <h2 className="text-3xl font-bold text-center text-white mb-10">Sign In</h2>
            
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-5 py-4 rounded-xl backdrop-blur-sm mb-8" role="alert">
                <span className="block sm:inline text-sm">{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="flex flex-col gap-8">
              <div>
                <label className="block text-white/90 text-sm font-semibold mb-4" htmlFor="email">
                  Email Address
                </label>
                <AuroraInput
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="pilot@skyops.com"
                  isActive={emailActive}
                  required
                />
              </div>

              <div>
                <label className="block text-white/90 text-sm font-semibold mb-4" htmlFor="password">
                  Password
                </label>
                <AuroraInput
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  isActive={passwordActive}
                  required
                />
              </div>

              <div className="flex justify-end">
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-white/70 hover:text-white/100 transition-colors font-medium"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`
                  w-full h-14 rounded-full font-semibold text-lg
                  bg-gradient-to-r from-[#18c3e8] to-[#5e879e]
                  hover:from-[#18c3e8]/90 hover:to-[#5e879e]/90
                  text-white
                  transition-all duration-300
                  shadow-lg hover:shadow-xl hover:scale-[0.98]
                  mt-2
                  ${loading ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-10 pt-8 text-center border-t border-white/10">
              <p className="text-white/60 text-sm">
                Don't have an account?{' '}
                <Link 
                  href="/register" 
                  className="text-[#18c3e8] hover:text-[#5e879e] font-semibold transition-colors"
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
