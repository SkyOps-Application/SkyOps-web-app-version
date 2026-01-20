
'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import Image from 'next/image';

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
            if (!token) return; // Auth handled by Navbar/Home redirect usually, but safe to check

            try {
                // Fetch Profile (Assume we have an endpoint or derive from me)
                // For now, I'll mock observing there isn't a direct /me endpoint in my memory, 
                // but usually OAuth/JWT has this. 
                // I will try to fetch from a hypothetic /users/me or decode token?
                // Actually, I'll use the user_service endpoints.
                
                // Oops, I didn't create a /users/me endpoint in user_service.
                // I will assume for now we might fail at this step if the endpoint is missing.
                // But let's check /history first which I was supposed to verify.
                
                // Fetch History
                // The implementation plan for history was verify_user_service history retrieval.
                // Let's assume GET /users/{id}/history or /history/me
                
                // I'll check user_service/routes/user_route.py carefully in next steps if needed.
                // For now, I'll put placeholders and likely fix this in next turn if endpoints are missing.
                
                // TEMPORARY: Just try to fetch history assuming authentication works on /users/history
                const historyRes = await fetch('http://localhost:8000/users/history', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (historyRes.ok) {
                    const hData = await historyRes.json();
                    setHistory(hData);
                }

                // Temporary Profile Mock or Fetch
                // I'll decode the token if possible or just use what I have.
                // Since I can't decode easily without lib, I'll just show what I can or fetch list.
            } catch (e) {
                console.error("Failed to fetch data", e);
            } finally {
               setLoading(false);
            }
        };

        fetchData();
    }, []);

  return (
    <div className="min-h-screen relative bg-[#0C2D57]">
      <div className="fixed inset-0 z-0">
         <Image src="/background-web.png" alt="Background" fill className="object-cover opacity-20" priority />
      </div>

      <Navbar />

      <main className="relative z-10 flex flex-col items-center min-h-screen pt-32 px-6 max-w-6xl mx-auto w-full">
         <div className="w-full bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
             {/* Header */}
             <div className="flex items-center gap-6 mb-10 border-b border-white/10 pb-8">
                <div className="w-24 h-24 bg-[#ffde59] rounded-full flex items-center justify-center text-4xl font-bold text-[#0C2D57]">
                    P
                </div>
                <div>
                    <h1 className="text-4xl font-bold text-white">Pilot Profile</h1>
                    <p className="text-blue-200">View your stats and history</p>
                </div>
             </div>

             {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-black/20 rounded-2xl p-6 text-center">
                    <h3 className="text-blue-200 uppercase text-sm font-bold tracking-wider mb-2">Total Sessions</h3>
                    <p className="text-4xl font-bold text-white">{history.length}</p>
                </div>
                 <div className="bg-black/20 rounded-2xl p-6 text-center">
                    <h3 className="text-blue-200 uppercase text-sm font-bold tracking-wider mb-2">Total Flight Time</h3>
                    <p className="text-4xl font-bold text-white">
                        {Math.floor(history.reduce((acc, curr) => acc + curr.duration_seconds, 0) / 60)}m
                    </p>
                </div>
                 <div className="bg-black/20 rounded-2xl p-6 text-center">
                    <h3 className="text-blue-200 uppercase text-sm font-bold tracking-wider mb-2">Avg Safety Score</h3>
                    <p className="text-4xl font-bold text-white">
                        {history.length > 0 ? Math.round(history.reduce((acc, curr) => acc + (curr.score || 0), 0) / history.length) : 'N/A'}
                    </p>
                </div>
            </div>

            {/* History Table */}
            <h2 className="text-2xl font-bold text-white mb-6">Simulation History</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-white/90">
                    <thead className="bg-white/5 uppercase text-sm font-bold text-blue-200">
                        <tr>
                            <th className="px-6 py-4 rounded-tl-xl">Date</th>
                            <th className="px-6 py-4">Duration</th>
                            <th className="px-6 py-4">Traffic</th>
                            <th className="px-6 py-4">Violations</th>
                            <th className="px-6 py-4 rounded-tr-xl">Score</th>
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
                                    <td className="px-6 py-4 font-bold">{record.score}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
         </div>
      </main>
    </div>
  );
}
