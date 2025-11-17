/**
 * Flight Plan page for exercises
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function FlightPlanPage() {
  const params = useParams();
  const [exercises, setExercises] = useState([
    { id: 1, name: 'EXERCISE 1', hasFlightPlan: true },
    { id: 2, name: 'EXERCISE 2', hasFlightPlan: true },
    { id: 3, name: 'EXERCISE 3', hasFlightPlan: true },
  ]);

  return (
    <div className="min-h-screen bg-[#1e3a5f] text-white">
      {/* Header */}
      <div className="bg-[#2d5282] px-8 py-6 border-b-4 border-[#1a2d4d]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-5xl font-black tracking-wider">FLIGHT PLAN</h1>
          
          <Link
            href="/"
            className="bg-[#1a2d4d] hover:bg-[#14233a] px-6 py-3 rounded-lg font-bold transition-colors"
          >
            ← BACK TO HOME
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section - Exercise List */}
          <div className="lg:col-span-2 space-y-8">
            {exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="bg-[#2d5282] rounded-xl p-8 shadow-2xl border-2 border-[#3d6ba8]"
              >
                <h2 className="text-3xl font-black mb-6 tracking-wide">
                  {exercise.name}
                </h2>
                
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="text-2xl mr-4">•</span>
                    <Link
                      href={`/exercise/${exercise.id}/flight-plan/view`}
                      className="text-xl font-medium italic hover:text-[#ffde59] transition-colors underline"
                    >
                      FLIGHT PLAN
                    </Link>
                  </li>
                </ul>
              </div>
            ))}
          </div>

          {/* Right Section - Add Exercises */}
          <div className="lg:col-span-1">
            <div className="bg-[#2d5282] rounded-xl p-8 shadow-2xl border-2 border-[#3d6ba8] sticky top-8">
              <h2 className="text-3xl font-black mb-6 tracking-wide text-center">
                ADD EXERCISES
              </h2>
              
              <button className="w-full bg-[#5a7ba6] hover:bg-[#6a8bb6] text-white font-bold text-xl py-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                ADD
              </button>

              <p className="text-sm text-gray-300 mt-4 text-center italic">
                Click to create a new exercise with custom flight plans
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

