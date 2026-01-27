
'use client';

import React from 'react';
import Image from 'next/image';
import { GlassBackground } from '@/components/GlassBackground';
import { GridOverlay } from '@/components/GridOverlay';
import { Navbar } from '@/components/Navbar';

export default function InstructionsPage() {
  return (
    <GlassBackground>
      <GridOverlay opacity={0.04} />
      
      {/* Background */}
      <div className="fixed inset-0 z-0">
         <Image src="/background-web.png" alt="Background" fill className="object-cover opacity-15" priority />
      </div>

      <Navbar />

      <main className="relative z-10 w-full flex flex-col items-center min-h-screen pt-40 px-6 pb-48">
        <div className="w-full max-w-5xl mx-auto">
        <h1 className="text-6xl md:text-7xl font-bold mb-20 text-white tracking-tight" style={{ fontFamily: 'system-ui, -apple-system' }}>
          Radar Instructions
        </h1>

        <div className="grid gap-20 w-full">
            {/* Section 1: Basic Controls */}
            <div className="glass-strong rounded-3xl p-16 shadow-2xl">
                <h2 className="text-3xl font-bold mb-10 flex items-center gap-6 text-white">
                    <span className="w-16 h-16 bg-gradient-to-br from-[#18c3e8] to-[#5e879e] rounded-xl flex items-center justify-center text-lg font-bold shadow-lg">1</span>
                     Basic Controls
                </h2>
                <div className="space-y-6">
                    <div className="flex items-start gap-6">
                        <div className="glass p-4 rounded-xl min-w-[140px] text-center font-mono text-[#ffde59] font-semibold text-base">Click</div>
                        <p className="text-gray-300 text-lg leading-relaxed pt-2">Select an aircraft to view its details and issue commands.</p>
                    </div>
                     <div className="flex items-start gap-6">
                        <div className="glass p-4 rounded-xl min-w-[140px] text-center font-mono text-[#ffde59] font-semibold text-base">Drag</div>
                        <p className="text-gray-300 text-lg leading-relaxed pt-2">Pan across the radar screen to view different sectors.</p>
                    </div>
                     <div className="flex items-start gap-6">
                        <div className="glass p-4 rounded-xl min-w-[140px] text-center font-mono text-[#ffde59] font-semibold text-base">Scroll</div>
                        <p className="text-gray-300 text-lg leading-relaxed pt-2">Zoom in and out of the radar scope.</p>
                    </div>
                </div>
            </div>

            {/* Section 2: Commands */}
            <div className="glass-strong rounded-3xl p-16 shadow-2xl">
                <h2 className="text-3xl font-bold mb-10 flex items-center gap-6 text-white">
                    <span className="w-16 h-16 bg-gradient-to-br from-[#11998e] to-[#38ef7d] rounded-xl flex items-center justify-center text-lg font-bold shadow-lg">2</span>
                     ATC Commands
                </h2>
                <div className="grid gap-8">
                    <div className="border-b border-white/10 pb-8">
                        <h3 className="font-bold text-xl mb-4 text-[#18c3e8]">Altitude Control</h3>
                        <code className="block glass p-4 rounded-xl text-base mb-4 font-mono text-[#ffde59]">CLIMB TO FLIGHT LEVEL [XXX]</code>
                        <p className="text-base text-gray-300 leading-relaxed">Instructs aircraft to change altitude. Example: FL 350 for 35,000 ft.</p>
                    </div>

                    <div className="border-b border-white/10 pb-8">
                        <h3 className="font-bold text-xl mb-4 text-[#18c3e8]">Heading Control</h3>
                        <code className="block glass p-4 rounded-xl text-base mb-4 font-mono text-[#ffde59]">TURN [LEFT/RIGHT] HEADING [XXX]</code>
                        <p className="text-base text-gray-300 leading-relaxed">Vectors the aircraft to a specific magnetic heading (000-360).</p>
                    </div>

                    <div>
                        <h3 className="font-bold text-xl mb-4 text-[#18c3e8]">Speed Control</h3>
                        <code className="block glass p-4 rounded-xl text-base mb-4 font-mono text-[#ffde59]">SPEED [XXX] KNOTS</code>
                        <p className="text-base text-gray-300 leading-relaxed">Adjusts the indicated airspeed of the aircraft.</p>
                    </div>
                </div>
            </div>
             {/* Section 3: Safety Rules */}
            <div className="glass-strong rounded-3xl p-16 shadow-2xl">
                <h2 className="text-3xl font-bold mb-10 flex items-center gap-6 text-white">
                    <span className="w-16 h-16 bg-gradient-to-br from-[#f093fb] to-[#f5576c] rounded-xl flex items-center justify-center text-lg font-bold shadow-lg">3</span>
                     Separation Rules
                </h2>
                <ul className="list-disc pl-8 space-y-5 text-lg text-gray-300 leading-relaxed">
                    <li>Maintain minimal vertical separation of <strong className="text-white">1000 ft</strong>.</li>
                    <li>Maintain minimal horizontal separation of <strong className="text-white">3 NM</strong> (Nautical Miles).</li>
                    <li>Ensure aircraft do not enter restricted zones.</li>
                </ul>
            </div>
        </div>
        </div>
      </main>
    </GlassBackground>
  );
}
