
'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Protect route
    const token = localStorage.getItem('access_token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0C2D57]">
      {/* Background */}
      <div className="fixed inset-0 z-0">
         <Image
          src="/background-web.png"
          alt="Background"
          fill
          className="object-cover opacity-40"
          priority
        />
      </div>

      <Navbar />

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-20 px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
          Welcome to <span className="text-[#ffde59]">SkyOps</span>
        </h1>
        <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
          The ultimate Radar Simulation platform for training and practice.
          <br/>
          Select "Exercises" to start your training or "Profiles" to view your history.
        </p>
      </main>
    </div>
  );
}
