/**
 * Effects Components
 * Ported from iPadOS Swift Effects.swift
 */

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MaterialIcon } from './MaterialIcon';

export function StaticGlassBackground() {
    return (
        <div className="static-glass-bg">
            {/* Grid overlay */}
            <div className="grid-overlay" />
        </div>
    );
}

// Grid Overlay (Canvas-based for performance)
export function GridOverlay({ opacity = 0.04 }: { opacity?: number }) {
    return (
        <div
            className="grid-overlay"
            style={{ opacity }}
        />
    );
}

// Logo Glow Effect
export function LogoGlow({ children }: { children: React.ReactNode }) {
    return (
        <div className="logo-glow">
            {children}
        </div>
    );
}

// Aurora Border Effect
interface AuroraBorderProps {
    children?: React.ReactNode;
    className?: string;
    fullscreen?: boolean;
    visible?: boolean;
}

export function AuroraBorder({
    children,
    className = '',
    fullscreen = false,
    visible = true
}: AuroraBorderProps) {
    if (!visible) return <>{children}</>;

    if (fullscreen) {
        return (
            <>
                <div className="aurora-border-fullscreen" />
                {children}
            </>
        );
    }

    return (
        <div className={`aurora-border ${className}`}>
            {children}
        </div>
    );
}

// Liquid Glass Wrapper
interface LiquidGlassProps {
    children: React.ReactNode;
    className?: string;
    tinted?: boolean;
    card?: boolean;
}

export function LiquidGlass({
    children,
    className = '',
    tinted = false,
    card = false
}: LiquidGlassProps) {
    const glassClass = card
        ? 'liquid-glass-card'
        : tinted
            ? 'liquid-glass-tinted'
            : 'liquid-glass';

    return (
        <div className={`${glassClass} ${className}`}>
            {children}
        </div>
    );
}

// Dashboard Card
interface DashboardCardProps {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    gradientColors: [string, string];
    onClick?: () => void;
}

export function DashboardCard({
    icon,
    title,
    subtitle,
    gradientColors,
    onClick
}: DashboardCardProps) {
    return (
        <button
            onClick={onClick}
            className="dashboard-card btn-scale w-full"
        >
            <div className="flex flex-col items-center gap-4 p-6 h-[180px]">
                {/* Icon Circle */}
                <div
                    className="dashboard-card-icon"
                    style={{
                        background: `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`
                    }}
                >
                    {icon}
                </div>

                {/* Text Content */}
                <div className="flex flex-col items-center gap-1.5">
                    <span className="text-lg font-bold text-white">{title}</span>
                    <span className="text-sm text-gray-400">{subtitle}</span>
                </div>
            </div>
        </button>
    );
}

// Quick Tip Component
interface QuickTipProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    visible?: boolean;
}

export function QuickTip({ icon, title, description, visible = true }: QuickTipProps) {
    return (
        <div
            className="quick-tip"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.5s ease'
            }}
        >
            <div className="quick-tip-icon">
                {icon}
            </div>
            <div className="flex flex-col gap-1">
                <span className="text-white font-semibold">{title}</span>
                <span className="text-gray-400 text-sm line-clamp-2">{description}</span>
            </div>
        </div>
    );
}

// Progress Bar
interface ProgressBarProps {
    progress: number; // 0-100
    label?: string;
}

export function ProgressBar({ progress, label }: ProgressBarProps) {
    return (
        <div className="flex flex-col items-center gap-3">
            {label && (
                <span className="text-lg font-semibold text-white">{label}</span>
            )}
            <div className="progress-bar">
                <div
                    className="progress-bar-fill"
                    style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                />
            </div>
            <span className="text-sm text-gray-400 font-mono">{Math.round(progress)}%</span>
        </div>
    );
}

// Particle System
interface Particle {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
}

export function ParticleSystem({ count = 80 }: { count?: number }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Initialize particles
        particlesRef.current = Array.from({ length: count }, (_, i) => ({
            id: i,
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.4 + 0.1,
        }));

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach(p => {
                // Update position
                p.x += p.vx;
                p.y += p.vy;

                // Wrap around edges
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
                ctx.fill();
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [count]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none opacity-60"
            style={{ zIndex: 0 }}
        />
    );
}

// Exercise Card
interface ExerciseCardProps {
    name: string;
    description: string;
    difficulty: string;
    aircraftCount: number;
    isTutorial?: boolean;
    tutorialSteps?: number;
    onClick?: () => void;
}

export function ExerciseCard({
    name,
    description,
    difficulty,
    aircraftCount,
    isTutorial = false,
    tutorialSteps = 0,
    onClick
}: ExerciseCardProps) {
    const gradientColors = isTutorial
        ? ['#11998e', '#38ef7d']
        : ['#f7971e', '#ffd200'];

    return (
        <button onClick={onClick} className="exercise-card btn-scale w-full text-left">
            {/* Left Section - Gradient */}
            <div
                className="exercise-card-left"
                style={{
                    background: `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`
                }}
            >
                <MaterialIcon
                    name={isTutorial ? 'school' : 'flight'}
                    size={40}
                    className="text-white"
                />
                <span className="text-xs font-bold text-white bg-black/20 px-3 py-1.5 rounded-lg">
                    {difficulty}
                </span>
            </div>

            {/* Right Section - Info */}
            <div className="exercise-card-right">
                <h3 className="text-xl font-bold text-white">{name}</h3>
                <p className="text-sm text-gray-400 line-clamp-2 mt-2">{description}</p>

                <div className="flex items-center gap-4 mt-auto">
                    <span className="flex items-center gap-1 text-xs" style={{ color: gradientColors[0] }}>
                        <MaterialIcon name="flight" size={14} /> {aircraftCount} aircraft
                    </span>
                    {isTutorial && tutorialSteps > 0 && (
                        <span className="flex items-center gap-1 text-xs" style={{ color: gradientColors[1] }}>
                            <MaterialIcon name="format_list_numbered" size={14} /> {tutorialSteps} steps
                        </span>
                    )}
                    <span className="ml-auto">
                        <MaterialIcon name="arrow_forward" size={24} style={{ color: gradientColors[0] }} />
                    </span>
                </div>
            </div>
        </button>
    );
}

// Theme Colors Helper
export const ThemeColors = {
    primary: '#BC82F3',
    secondary: '#8D9FFF',
    accent: '#F5B9EA',
    warning: '#FFBA71',
    danger: '#FF6778',
};

export const GradientPairs = {
    purple: ['#667eea', '#764ba2'],
    pink: ['#f093fb', '#f5576c'],
    cyan: ['#4facfe', '#00f2fe'],
    green: ['#43e97b', '#38f9d7'],
    orange: ['#fa709a', '#fee140'],
    teal: ['#11998e', '#38ef7d'],
};
