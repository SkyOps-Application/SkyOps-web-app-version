/**
 * Login Page
 * Premium UI with glassmorphism design
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
    StaticGlassBackground,
    LogoGlow,
    LiquidGlass,
    ThemeColors
} from '@/components/Effects';
import { MaterialIcon } from '@/components/MaterialIcon';
import { login, parseAuthError, AuthError } from '@/lib/auth';

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await login({ email, password });
            router.push('/');
        } catch (err) {
            setError(parseAuthError(err as AuthError));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
            <StaticGlassBackground />

            {/* Background decorative elements */}
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-md px-4">
                {/* Logo */}
                <div className="flex flex-col items-center mb-8">
                    <LogoGlow>
                        <Link href="/">
                            <Image
                                src="/mainlogo.png"
                                alt="SkyOps"
                                width={80}
                                height={80}
                                className="drop-shadow-2xl cursor-pointer hover:scale-105 transition-transform"
                            />
                        </Link>
                    </LogoGlow>
                    <h1 className="text-3xl font-bold text-white mt-4">Welcome Back</h1>
                    <p className="text-gray-400 mt-1">Sign in to continue to SkyOps</p>
                </div>

                {/* Form Card */}
                <div className="liquid-glass-card p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Error Message */}
                        {error && (
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                                <MaterialIcon name="error" className="text-red-400 mt-0.5" size={20} />
                                <p className="text-red-300 text-sm">{error}</p>
                            </div>
                        )}

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Email</label>
                            <div className="relative">
                                <MaterialIcon
                                    name="mail"
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                                    size={20}
                                />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-500 focus:border-[var(--theme-primary)] focus:bg-white/10 focus:outline-none transition-all"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Password</label>
                            <div className="relative">
                                <MaterialIcon
                                    name="lock"
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                                    size={20}
                                />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-12 text-white placeholder-gray-500 focus:border-[var(--theme-primary)] focus:bg-white/10 focus:outline-none transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                                >
                                    <MaterialIcon name={showPassword ? 'visibility_off' : 'visibility'} size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 rounded border-white/20 bg-white/5 checked:bg-[var(--theme-primary)] focus:ring-0 focus:ring-offset-0"
                                />
                                <span className="text-sm text-gray-400">Remember me</span>
                            </label>
                            <Link href="/forgot-password" className="text-sm text-[var(--theme-primary)] hover:underline">
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-primary-gradient w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <MaterialIcon name="autorenew" size={20} className="animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <MaterialIcon name="arrow_forward" size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-white/10" />
                        <span className="text-xs text-gray-500 uppercase">or</span>
                        <div className="flex-1 h-px bg-white/10" />
                    </div>

                    {/* Social Login (placeholder) */}
                    <button className="w-full py-3 rounded-xl border border-white/10 bg-white/5 text-white font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-3">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                    </button>
                </div>

                {/* Sign Up Link */}
                <p className="text-center mt-6 text-gray-400">
                    Don't have an account?{' '}
                    <Link href="/signup" className="text-[var(--theme-primary)] font-medium hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}
