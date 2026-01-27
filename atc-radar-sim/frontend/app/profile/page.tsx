
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { GlassBackground } from '@/components/GlassBackground';
import { GridOverlay } from '@/components/GridOverlay';
import { Navbar } from '@/components/Navbar';
import { API_URL } from '@/lib/config';

interface UserProfile {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    age: number;
    role: string;
    email: string;
}

interface Violation {
  type: string;
  aircraft1: string;
  aircraft2?: string;
  timestamp: string;
}

interface HistoryRecord {
    id: number;
    duration_seconds: number;
    violations_count: number;
    traffic_count: number;
    timestamp: string;
    score: number;
    start_time: string;
    end_time: string;
    violation_details?: Violation[];
}


export default function ProfilePage() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [history, setHistory] = useState<HistoryRecord[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('access_token');
            if (!token) return;

            try {
                // Fetch Profile
                const profileRes = await fetch(`${API_URL}/me`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                
                if (profileRes.ok) {
                    const pData = await profileRes.json();
                    setProfile(pData);
                }

                // Fetch History
                const historyRes = await fetch(`${API_URL}/history`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (historyRes.ok) {
                    const hData = await historyRes.json();
                    setHistory(hData);
                }

            } catch (e) {
                console.error("Failed to fetch data", e);
            } finally {
               setLoading(false);
            }
        };

        fetchData();
    }, []);

  return (
    <GlassBackground>
      <GridOverlay opacity={0.04} />
      
      <div className="fixed inset-0 z-0">
         <Image src="/background-web.png" alt="Background" fill className="object-cover opacity-15" priority />
      </div>

      <Navbar />

      <main className="relative z-20 w-full min-h-screen pt-40 px-6 pb-48">
         <div className="max-w-6xl mx-auto">
           <div className="w-full glass-strong rounded-3xl p-16 shadow-2xl mt-8 relative z-20">
             {/* Header */}
             <div className="flex flex-col md:flex-row items-center md:items-start gap-12 mb-24 border-b border-white/10 pb-16">
                <div className="w-36 h-36 bg-gradient-to-br from-[#ffde59] to-[#ffd200] rounded-full flex items-center justify-center text-6xl font-bold text-[#0C2D57] shadow-xl">
                    {profile ? profile.first_name[0].toUpperCase() : 'P'}
                </div>
                <div className="flex-1 text-center md:text-left space-y-4">
                    <h1 className="text-5xl font-bold text-white tracking-tight">
                        {profile ? `${profile.first_name} ${profile.last_name}` : 'Pilot Profile'}
                    </h1>
                    <div className="flex flex-col md:flex-row gap-6 text-gray-300 justify-center md:justify-start text-lg">
                        {profile && (
                            <>
                                <span className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                    {profile.email}
                                </span>
                                <span className="hidden md:inline">•</span>
                                <span>Age: {profile.age}</span>
                            </>
                        )}
                        {!profile && <span>View your stats and history</span>}
                    </div>
                </div>
             </div>

             {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                <div className="glass rounded-2xl p-8 text-center hover:bg-white/10 transition-all">
                    <h3 className="text-gray-400 uppercase text-xs font-bold tracking-wider mb-6">Total Sessions</h3>
                    <p className="text-5xl font-bold text-white">{history.length}</p>
                </div>
                 <div className="glass rounded-2xl p-8 text-center hover:bg-white/10 transition-all">
                    <h3 className="text-gray-400 uppercase text-xs font-bold tracking-wider mb-6">Total Flight Time</h3>
                    <p className="text-5xl font-bold text-white">
                        {Math.floor(history.reduce((acc, curr) => acc + curr.duration_seconds, 0) / 60)}m
                    </p>
                </div>
                 <div className="glass rounded-2xl p-8 text-center hover:bg-white/10 transition-all">
                    <h3 className="text-gray-400 uppercase text-xs font-bold tracking-wider mb-6">Avg Safety Score</h3>
                    <p className="text-5xl font-bold text-white">
                        {history.length > 0 ? Math.round(history.reduce((acc, curr) => acc + (curr.score || 0), 0) / history.length) : '0'}
                    </p>
                </div>
            </div>

            {/* History Table */}
            <h2 className="text-3xl font-bold text-white mb-10 tracking-tight">Simulation History</h2>
            <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full text-left text-white/90">
                    <thead className="bg-white/5 uppercase text-sm font-bold text-blue-200">
                        <tr>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Duration</th>
                            <th className="px-6 py-4">Traffic</th>
                            <th className="px-6 py-4">Violations</th>
                            <th className="px-6 py-4">Score</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {history.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-blue-300">No history records found.</td>
                            </tr>
                        ) : (
                            history.map((record) => (
                                <tr key={record.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4">{new Date(record.timestamp).toLocaleDateString()} {new Date(record.timestamp).toLocaleTimeString()}</td>
                                    <td className="px-6 py-4">{Math.floor(record.duration_seconds / 60)}m {record.duration_seconds % 60}s</td>
                                    <td className="px-6 py-4">{record.traffic_count}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${record.violations_count > 0 ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'}`}>
                                            {record.violations_count}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-[#ffde59]">{record.score}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
           </div>
         </div>
      </main>
    </GlassBackground>
  );
}
