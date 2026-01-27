
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuroraInput } from '@/components/AuroraInput';
import { GlassBackground } from '@/components/GlassBackground';
import { GridOverlay } from '@/components/GridOverlay';
import Image from 'next/image';

import { API_URL } from '@/lib/config';

export default function RegisterPage() {
  console.log('Current API_URL:', API_URL); // Debugging Render config
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      // Backend expects: email, password, first_name, last_name, age
      const res = await fetch(`${API_URL}/register`, {
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

      // Automatically login or redirect to login
      router.push('/login?registered=true');
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
        <div className="w-full max-w-3xl space-y-12">
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
                Create Account
              </h1>
              <p className="text-xl text-gray-400 font-medium">Join SkyOps today</p>
            </div>
          </div>

          {/* Register Card */}
          <div className="glass-strong rounded-3xl p-12 shadow-2xl animate-fadeIn">
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-6 py-4 rounded-2xl backdrop-blur-sm mb-10 text-base" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {/* Left Column */}
              <div className="flex flex-col gap-8">
                <div>
                  <label className="block text-white/90 text-sm font-bold uppercase tracking-wider mb-3 ml-1" htmlFor="first_name">
                    First Name
                  </label>
                  <AuroraInput
                    id="first_name"
                    type="text"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="John"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-white/90 text-sm font-bold uppercase tracking-wider mb-3 ml-1" htmlFor="last_name">
                    Last Name
                  </label>
                  <AuroraInput
                    id="last_name"
                    type="text"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white/90 text-sm font-bold uppercase tracking-wider mb-3 ml-1" htmlFor="age">
                    Age
                  </label>
                  <AuroraInput
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="25"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-8">
                <div>
                  <label className="block text-white/90 text-sm font-bold uppercase tracking-wider mb-3 ml-1" htmlFor="email">
                    Email Address
                  </label>
                  <AuroraInput
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="pilot@skyops.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white/90 text-sm font-bold uppercase tracking-wider mb-3 ml-1" htmlFor="password">
                    Password
                  </label>
                  <AuroraInput
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white/90 text-sm font-bold uppercase tracking-wider mb-3 ml-1" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <AuroraInput
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>

              {/* Full Width Button */}
              <div className="md:col-span-2 mt-10">
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
                    ${loading ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  {loading ? 'Creating Account...' : 'Register'}
                </button>
              </div>
            </form>

            <div className="mt-12 pt-8 text-center border-t border-white/10">
              <p className="text-white/60 text-base">
                Already have an account?{' '}
                <Link 
                  href="/login" 
                  className="text-[#18c3e8] hover:text-[#5e879e] font-bold transition-colors"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </GlassBackground>
  );
}
