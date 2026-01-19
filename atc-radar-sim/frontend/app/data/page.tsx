/**
 * About / Data Page
 * Information about the simulator and system status
 */

'use client';

import React from 'react';
import Link from 'next/link';
import {
    StaticGlassBackground,
    AuroraBorder,
    LogoGlow,
    LiquidGlass,
    ThemeColors,
    GradientPairs
} from '@/components/Effects';
import { Navbar } from '@/components/Navbar';
import { MaterialIcon } from '@/components/MaterialIcon';

export default function AboutPage() {
    return (
        <div className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden">
            <StaticGlassBackground />
            <Navbar />

            {/* Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />

            {/* Main Container */}
            <div className="relative z-10 w-full max-w-5xl px-4 py-20 animate-fade-in-up">

                {/* Header Section */}
                <div className="flex flex-col items-center text-center mb-16">
                    <LogoGlow>
                        <div className="w-24 h-24 mb-6 relative">
                            {/* Placeholder for logo - using icon for now if image fails */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <MaterialIcon name="radar" size={64} className="text-white opacity-80" />
                            </div>
                        </div>
                    </LogoGlow>

                    <h1 className="text-5xl font-bold text-white mb-2 tracking-tight">
                        SkyOps <span className="text-[var(--theme-primary)]">Pro</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl px-4">
                        Next-Generation Air Traffic Control Radar Simulation System
                    </p>
                    <div className="mt-4 flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-gray-400">
                        <span>v2.0.1 (Web Release)</span>
                        <span className="w-1 h-1 rounded-full bg-green-500" />
                        <span className="text-green-400">System Online</span>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">

                    {/* Developer Card */}
                    <AuroraBorder className="h-full rounded-3xl">
                        <div className="bg-[#0a0e1a]/80 backdrop-blur-xl p-8 rounded-3xl h-full border border-white/5">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20">
                                <MaterialIcon name="code" className="text-white" size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Development Team</h3>
                            <p className="text-gray-400 leading-relaxed mb-6">
                                Designed and built by <strong className="text-white">Tien Quoc Bui & Phuong Khanh Pham</strong>.
                                Bringing professional iPadOS flight simulation experiences to the modern web.
                            </p>
                            <div className="flex gap-3">
                                <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                    <MaterialIcon name="mail" className="text-gray-300" />
                                </button>
                                <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                    <MaterialIcon name="language" className="text-gray-300" />
                                </button>
                            </div>
                        </div>
                    </AuroraBorder>

                    {/* Tech Stack Card */}
                    <AuroraBorder className="h-full rounded-3xl">
                        <div className="bg-[#0a0e1a]/80 backdrop-blur-xl p-8 rounded-3xl h-full border border-white/5">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
                                <MaterialIcon name="memory" className="text-white" size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Technical Core</h3>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                                    <span className="w-2 h-2 rounded-full bg-white"></span>
                                    <span className="text-sm text-gray-300">Next.js 14</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                                    <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                                    <span className="text-sm text-gray-300">React Konva</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                                    <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                                    <span className="text-sm text-gray-300">Tailwind CSS</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                                    <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                                    <span className="text-sm text-gray-300">Socket.IO</span>
                                </div>
                            </div>
                        </div>
                    </AuroraBorder>

                    {/* Data Sources */}
                    <div className="md:col-span-2">
                        <LiquidGlass className="p-8">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/20 shrink-0">
                                    <MaterialIcon name="database" className="text-white" size={28} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-white mb-2">Simulated Airspace Data</h3>
                                    <p className="text-gray-400">
                                        This simulator uses procedural generation for traffic patterns based on real-world airway structures.
                                        Exercise scenarios are crafted to challenge separation management skills.
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-white">200+</div>
                                        <div className="text-xs text-gray-500 uppercase tracking-wider">Waypoints</div>
                                    </div>
                                    <div className="w-px h-10 bg-white/10" />
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-white">45</div>
                                        <div className="text-xs text-gray-500 uppercase tracking-wider">Routes</div>
                                    </div>
                                </div>
                            </div>
                        </LiquidGlass>
                    </div>

                </div>

                {/* Footer */}
                <div className="mt-20 text-center">
                    <Link href="/">
                        <button className="text-gray-500 hover:text-white transition-colors text-sm flex items-center gap-2 mx-auto">
                            <MaterialIcon name="arrow_back" size={16} />
                            Back to Home
                        </button>
                    </Link>
                </div>

            </div>
        </div>
    );
}
