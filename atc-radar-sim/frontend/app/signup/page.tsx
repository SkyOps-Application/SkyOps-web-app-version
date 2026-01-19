/**
 * Signup Page
 * Premium UI with glassmorphism design
 */

'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
    StaticGlassBackground,
    LogoGlow,
    ThemeColors
} from '@/components/Effects';
import { MaterialIcon } from '@/components/MaterialIcon';
import { register, parseAuthError, AuthError } from '@/lib/auth';

export default function SignupPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        age: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Password strength calculation
    const passwordStrength = useMemo(() => {
        const { password } = formData;
        if (!password) return { score: 0, label: '', color: '' };

        let score = 0;
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

        const levels = [
            { label: 'Very Weak', color: '#ef4444' },
            { label: 'Weak', color: '#f97316' },
            { label: 'Fair', color: '#eab308' },
            { label: 'Good', color: '#22c55e' },
            { label: 'Strong', color: '#10b981' },
        ];

        return { score, ...levels[Math.min(score, 4)] };
    }, [formData.password]);

    // Password validation messages
    const passwordErrors = useMemo(() => {
        const { password, confirmPassword } = formData;
        const errors: string[] = [];

        if (password && password.length < 8) {
            errors.push('Must be at least 8 characters');
        }
        if (password && !/\d/.test(password)) {
            errors.push('Must contain at least one number');
        }
        if (password && !/[a-zA-Z]/.test(password)) {
            errors.push('Must contain at least one letter');
        }
        if (confirmPassword && password !== confirmPassword) {
            errors.push('Passwords do not match');
        }

        return errors;
    }, [formData.password, formData.confirmPassword]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Client-side validation
        if (passwordErrors.length > 0) {
            setError(passwordErrors.join('. '));
            return;
        }

        setIsLoading(true);

        try {
            await register({
                email: formData.email,
                first_name: formData.firstName,
                last_name: formData.lastName,
                age: formData.age ? parseInt(formData.age) : undefined,
                password: formData.password,
            });

            setSuccess(true);
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        } catch (err) {
            setError(parseAuthError(err as AuthError));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden py-10">
            <StaticGlassBackground />

            {/* Background decorative elements */}
            <div className="absolute top-1/3 -left-32 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Signup Card */}
            <div className="relative z-10 w-full max-w-lg px-4">
                {/* Logo */}
                <div className="flex flex-col items-center mb-6">
                    <LogoGlow>
                        <Link href="/">
                            <Image
                                src="/mainlogo.png"
                                alt="SkyOps"
                                width={70}
                                height={70}
                                className="drop-shadow-2xl cursor-pointer hover:scale-105 transition-transform"
                            />
                        </Link>
                    </LogoGlow>
                    <h1 className="text-3xl font-bold text-white mt-4">Create Account</h1>
                    <p className="text-gray-400 mt-1">Join SkyOps and start your training</p>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="mb-6 flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                        <MaterialIcon name="check_circle" className="text-green-400" size={24} />
                        <div>
                            <p className="text-green-300 font-medium">Account created successfully!</p>
                            <p className="text-green-400/70 text-sm">Redirecting to login...</p>
                        </div>
                    </div>
                )}

                {/* Form Card */}
                <div className="liquid-glass-card p-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Error Message */}
                        {error && (
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                                <MaterialIcon name="error" className="text-red-400 mt-0.5" size={20} />
                                <p className="text-red-300 text-sm whitespace-pre-line">{error}</p>
                            </div>
                        )}

                        {/* Name Fields - Row */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">First Name</label>
                                <div className="relative">
                                    <MaterialIcon
                                        name="person"
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                                        size={20}
                                    />
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:border-[var(--theme-primary)] focus:bg-white/10 focus:outline-none transition-all"
                                        placeholder="John"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:border-[var(--theme-primary)] focus:bg-white/10 focus:outline-none transition-all"
                                    placeholder="Doe"
                                    required
                                />
                            </div>
                        </div>

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
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:border-[var(--theme-primary)] focus:bg-white/10 focus:outline-none transition-all"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Age Field (Optional) */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">
                                Age <span className="text-gray-500">(optional)</span>
                            </label>
                            <div className="relative">
                                <MaterialIcon
                                    name="cake"
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                                    size={20}
                                />
                                <input
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    min="0"
                                    max="120"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:border-[var(--theme-primary)] focus:bg-white/10 focus:outline-none transition-all"
                                    placeholder="25"
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
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-12 text-white placeholder-gray-500 focus:border-[var(--theme-primary)] focus:bg-white/10 focus:outline-none transition-all"
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

                            {/* Password Strength Indicator */}
                            {formData.password && (
                                <div className="space-y-2">
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((level) => (
                                            <div
                                                key={level}
                                                className="flex-1 h-1 rounded-full transition-colors"
                                                style={{
                                                    backgroundColor: level <= passwordStrength.score ? passwordStrength.color : 'rgba(255,255,255,0.1)'
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-xs" style={{ color: passwordStrength.color }}>
                                        {passwordStrength.label}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Confirm Password</label>
                            <div className="relative">
                                <MaterialIcon
                                    name="lock_reset"
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                                    size={20}
                                />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`w-full bg-white/5 border rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:bg-white/10 focus:outline-none transition-all ${formData.confirmPassword && formData.password !== formData.confirmPassword
                                            ? 'border-red-500/50 focus:border-red-500'
                                            : 'border-white/10 focus:border-[var(--theme-primary)]'
                                        }`}
                                    placeholder="••••••••"
                                    required
                                />
                                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                                    <MaterialIcon
                                        name="check_circle"
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400"
                                        size={20}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading || success}
                            className="btn-primary-gradient w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-6"
                            style={{ background: `linear-gradient(135deg, #11998e, #38ef7d)` }}
                        >
                            {isLoading ? (
                                <>
                                    <MaterialIcon name="autorenew" size={20} className="animate-spin" />
                                    Creating account...
                                </>
                            ) : (
                                <>
                                    Create Account
                                    <MaterialIcon name="arrow_forward" size={20} />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Sign In Link */}
                <p className="text-center mt-6 text-gray-400">
                    Already have an account?{' '}
                    <Link href="/login" className="text-[var(--theme-primary)] font-medium hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
