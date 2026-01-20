
'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen relative bg-[#0C2D57]">
       {/* Background */}
      <div className="fixed inset-0 z-0">
         <Image
          src="/background-web.png"
          alt="Background"
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>

      <Navbar />

      <main className="relative z-10 flex flex-col items-center min-h-screen pt-32 px-6 max-w-4xl mx-auto text-white">
        <h1 className="text-5xl font-bold mb-8 text-[#ffde59]">About SkyOps</h1>
        
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20 space-y-6 text-lg leading-relaxed">
            <p>
                SkyOps is a cutting-edge Air Traffic Control (ATC) radar simulation platform designed to bridge the gap between theoretical knowledge and practical application.
            </p>
            <p>
                Our mission is to provide aviation enthusiasts, students, and professionals with a highly realistic environment to practice radar monitoring, vectoring, and airspace management.
            </p>
            <p>
                Built with modern web technologies and real-time WebSocket communication, SkyOps delivers a seamless, high-fidelity experience right in your browser.
            </p>
        </div>
      </main>
    </div>
  );
}
