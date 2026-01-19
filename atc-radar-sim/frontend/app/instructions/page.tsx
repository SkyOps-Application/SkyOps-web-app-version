/**
 * Tutorial Notebook Page
 * A comprehensive guide to using the ATC Simulator
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    StaticGlassBackground,
    LiquidGlass,
    ThemeColors,
    GradientPairs
} from '@/components/Effects';
import { Navbar } from '@/components/Navbar';
import { MaterialIcon } from '@/components/MaterialIcon';

// Tutorial Content Data
const CHAPTERS = [
    {
        id: 'intro',
        title: 'Introduction',
        icon: 'school',
        content: (
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white mb-4">Welcome to SkyOps</h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                    SkyOps is a professional-grade Air Traffic Control (ATC) radar simulator designed to train you in the art of airspace management.
                </p>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h3 className="text-xl font-bold text-[var(--theme-primary)] mb-3">Your Mission</h3>
                    <ul className="space-y-3 text-gray-300">
                        <li className="flex items-start gap-3">
                            <MaterialIcon name="check_circle" className="text-green-400 mt-1" />
                            <span>Guide aircraft safely to their destinations</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <MaterialIcon name="check_circle" className="text-green-400 mt-1" />
                            <span>Maintain standard separation (5nm horizontal, 1000ft vertical)</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <MaterialIcon name="check_circle" className="text-green-400 mt-1" />
                            <span>Issue clearances efficiently using standard phraseology</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    },
    {
        id: 'commands',
        title: 'Voice Commands',
        icon: 'record_voice_over',
        content: (
            <div className="space-y-8">
                <h2 className="text-3xl font-bold text-white mb-6">Standard Commands</h2>

                {/* Command Card: Altitude */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                        <MaterialIcon name="flight_takeoff" className="text-blue-400" />
                        Altitude Control
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="liquid-glass p-5">
                            <div className="text-sm text-gray-400 uppercase tracking-widest mb-2 font-bold">CLIMB</div>
                            <div className="font-mono text-xl text-[var(--theme-accent)] mb-2">C + [Level]</div>
                            <p className="text-sm text-gray-300">"Climb to flight level..."</p>
                            <div className="mt-3 px-3 py-2 bg-black/30 rounded font-mono text-sm text-green-300">
                                Example: C350 (Climb FL350)
                            </div>
                        </div>

                        <div className="liquid-glass p-5">
                            <div className="text-sm text-gray-400 uppercase tracking-widest mb-2 font-bold">DESCEND</div>
                            <div className="font-mono text-xl text-[var(--theme-accent)] mb-2">D + [Level]</div>
                            <p className="text-sm text-gray-300">"Descend to flight level..."</p>
                            <div className="mt-3 px-3 py-2 bg-black/30 rounded font-mono text-sm text-green-300">
                                Example: D240 (Descend FL240)
                            </div>
                        </div>
                    </div>
                </div>

                {/* Command Card: Heading */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                        <MaterialIcon name="explore" className="text-purple-400" />
                        Heading Control
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="liquid-glass p-5">
                            <div className="text-sm text-gray-400 uppercase tracking-widest mb-2 font-bold">TURN LEFT</div>
                            <div className="font-mono text-xl text-[var(--theme-accent)] mb-2">L + [Heading]</div>
                            <p className="text-sm text-gray-300">"Turn left heading..."</p>
                            <div className="mt-3 px-3 py-2 bg-black/30 rounded font-mono text-sm text-green-300">
                                Example: L270 (Left heading 270)
                            </div>
                        </div>

                        <div className="liquid-glass p-5">
                            <div className="text-sm text-gray-400 uppercase tracking-widest mb-2 font-bold">TURN RIGHT</div>
                            <div className="font-mono text-xl text-[var(--theme-accent)] mb-2">R + [Heading]</div>
                            <p className="text-sm text-gray-300">"Turn right heading..."</p>
                            <div className="mt-3 px-3 py-2 bg-black/30 rounded font-mono text-sm text-green-300">
                                Example: R090 (Right heading 090)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 'radar',
        title: 'Radar Scope',
        icon: 'radar',
        content: (
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white mb-4">Understanding the Scope</h2>
                <div className="liquid-glass p-6 space-y-4">
                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/50">
                            <MaterialIcon name="flight" className="text-blue-400" />
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-white">Target Symbols</h4>
                            <p className="text-gray-300 text-sm mt-1">
                                Aircraft are shown as squares with a velocity vector line showing where they will be in 1 minute.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 border-t border-white/10 pt-4">
                        <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/50">
                            <MaterialIcon name="warning" className="text-red-400" />
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-white">Conflict Alerts</h4>
                            <p className="text-gray-300 text-sm mt-1">
                                If two aircraft are predicted to violate separation minima, they will turn red and pulse. Act immediately!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
];

export default function TutorialNotebookPage() {
    const [activeChapter, setActiveChapter] = useState(CHAPTERS[0].id);

    const currentContent = CHAPTERS.find(c => c.id === activeChapter)?.content;

    return (
        <div className="min-h-screen relative flex flex-col">
            <StaticGlassBackground />
            <Navbar />

            <div className="flex-1 pt-32 px-4 md:px-8 pb-10 max-w-7xl mx-auto w-full">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center shadow-lg shadow-teal-500/20">
                        <MaterialIcon name="menu_book" size={28} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">Tutorial Notebook</h1>
                        <p className="text-gray-400">Standard Operating Procedures & Reference</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-3 space-y-2">
                        {CHAPTERS.map((chapter) => (
                            <button
                                key={chapter.id}
                                onClick={() => setActiveChapter(chapter.id)}
                                className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all duration-300 ${activeChapter === chapter.id
                                        ? 'bg-white/10 border border-white/20 text-white shadow-lg backdrop-blur-md'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <MaterialIcon
                                    name={chapter.icon}
                                    className={activeChapter === chapter.id ? 'text-[var(--theme-primary)]' : ''}
                                />
                                <span className="font-medium">{chapter.title}</span>
                                {activeChapter === chapter.id && (
                                    <MaterialIcon name="chevron_right" className="ml-auto opacity-50" />
                                )}
                            </button>
                        ))}

                        <div className="pt-6 mt-6 border-t border-white/10">
                            <Link href="/radar" className="block w-full">
                                <button className="w-full btn-primary-gradient flex items-center justify-center gap-2">
                                    <MaterialIcon name="play_arrow" />
                                    Start Practice
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-9">
                        <div className="liquid-glass p-8 min-h-[600px] animate-fade-in-up">
                            {currentContent}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
