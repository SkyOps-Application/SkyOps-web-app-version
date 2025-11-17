/**
 * Practice History page for exercises
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function PracticeHistoryPage() {
  const params = useParams();
  const exerciseId = params.id;

  const sessions = [
    {
      id: 1,
      date: '2024-11-12',
      time: '14:30',
      duration: '15:45',
      score: 85,
      violations: 2,
    },
    {
      id: 2,
      date: '2024-11-11',
      time: '10:15',
      duration: '18:20',
      score: 92,
      violations: 0,
    },
    {
      id: 3,
      date: '2024-11-10',
      time: '16:45',
      duration: '12:30',
      score: 78,
      violations: 4,
    },
  ];

  return (
    <div className="min-h-screen bg-[#1e3a5f] text-white">
      {/* Header */}
      <div className="bg-[#2d5282] px-8 py-6 border-b-4 border-[#1a2d4d]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-5xl font-black tracking-wider">
            EXERCISE {exerciseId} - PRACTICE HISTORY
          </h1>
          
          <Link
            href="/"
            className="bg-[#1a2d4d] hover:bg-[#14233a] px-6 py-3 rounded-lg font-bold transition-colors"
          >
            ← BACK TO HOME
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="bg-[#2d5282] rounded-xl p-8 shadow-2xl border-2 border-[#3d6ba8]">
          <h2 className="text-3xl font-black mb-6 tracking-wide">Training Sessions</h2>
          
          <div className="space-y-4">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="bg-[#1e3a5f] rounded-lg p-6 hover:bg-[#2a4a75] transition-colors cursor-pointer border-2 border-[#3d6ba8] hover:border-[#ffde59]"
              >
                <div className="grid grid-cols-5 gap-4 items-center">
                  <div>
                    <p className="text-sm text-gray-400">Date</p>
                    <p className="text-xl font-bold">{session.date}</p>
                    <p className="text-sm text-gray-400">{session.time}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400">Duration</p>
                    <p className="text-xl font-bold">{session.duration}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400">Score</p>
                    <p className={`text-3xl font-black ${
                      session.score >= 90 ? 'text-green-400' :
                      session.score >= 75 ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {session.score}%
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400">Violations</p>
                    <p className={`text-2xl font-bold ${
                      session.violations === 0 ? 'text-green-400' :
                      session.violations < 3 ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {session.violations}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <Link
                      href={`/replay/${session.id}`}
                      className="bg-[#ffde59] text-[#0d2d52] px-6 py-2 rounded-full font-bold hover:bg-[#ffd700] transition-colors inline-block"
                    >
                      REPLAY
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {sessions.length === 0 && (
            <div className="text-center py-12 text-gray-400 text-xl">
              No practice sessions yet. Start practicing to see your history!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

