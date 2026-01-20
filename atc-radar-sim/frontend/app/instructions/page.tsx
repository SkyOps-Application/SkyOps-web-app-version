
'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import Image from 'next/image';

export default function InstructionsPage() {
  return (
    <div className="min-h-screen relative bg-[#0C2D57] text-white">
      {/* Background */}
      <div className="fixed inset-0 z-0">
         <Image src="/background-web.png" alt="Background" fill className="object-cover opacity-20" priority />
      </div>

      <Navbar />

      <main className="relative z-10 flex flex-col items-center min-h-screen pt-32 px-6 max-w-5xl mx-auto pb-20">
        <h1 className="text-5xl font-bold mb-10 text-[#ffde59]">Radar Instructions</h1>

        <div className="grid gap-8 w-full">
            {/* Section 1: Basic Controls */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-sm">1</span>
                     Basic Controls
                </h2>
                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <div className="bg-white/5 p-3 rounded-lg min-w-[120px] text-center font-mono text-[#ffde59]">Click</div>
                        <p>Select an aircraft to view its details and issue commands.</p>
                    </div>
                     <div className="flex items-start gap-4">
                        <div className="bg-white/5 p-3 rounded-lg min-w-[120px] text-center font-mono text-[#ffde59]">Drag</div>
                        <p>Pan across the radar screen to view different sectors.</p>
                    </div>
                     <div className="flex items-start gap-4">
                        <div className="bg-white/5 p-3 rounded-lg min-w-[120px] text-center font-mono text-[#ffde59]">Scroll</div>
                        <p>Zoom in and out of the radar scope.</p>
                    </div>
                </div>
            </div>

            {/* Section 2: Commands */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-sm">2</span>
                     ATC Commands
                </h2>
                <div className="grid gap-6">
                    <div className="border-b border-white/10 pb-4">
                        <h3 className="font-bold text-lg mb-2 text-blue-300">Altitude Control</h3>
                        <code className="block bg-black/30 p-3 rounded text-sm mb-2">CLIMB TO FLIGHT LEVEL [XXX]</code>
                        <p className="text-sm text-gray-300">Instructs aircraft to change altitude. Example: FL 350 for 35,000 ft.</p>
                    </div>

                    <div className="border-b border-white/10 pb-4">
                        <h3 className="font-bold text-lg mb-2 text-blue-300">Heading Control</h3>
                        <code className="block bg-black/30 p-3 rounded text-sm mb-2">TURN [LEFT/RIGHT] HEADING [XXX]</code>
                        <p className="text-sm text-gray-300">Vectors the aircraft to a specific magnetic heading (000-360).</p>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-2 text-blue-300">Speed Control</h3>
                        <code className="block bg-black/30 p-3 rounded text-sm mb-2">SPEED [XXX] KNOTS</code>
                        <p className="text-sm text-gray-300">Adjusts the indicated airspeed of the aircraft.</p>
                    </div>
                </div>
            </div>
             {/* Section 3: Safety Rules */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-sm">3</span>
                     Separation Rules
                </h2>
                <ul className="list-disc pl-6 space-y-3 text-lg">
                    <li>Maintain minimal vertical separation of <strong>1000 ft</strong>.</li>
                    <li>Maintain minimal horizontal separation of <strong>3 NM</strong> (Nautical Miles).</li>
                    <li>Ensure aircraft do not enter restricted zones.</li>
                </ul>
            </div>
        </div>
      </main>
    </div>
  );
}
