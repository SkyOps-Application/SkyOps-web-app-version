/**
 * View specific flight plan details
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ViewFlightPlanPage() {
  const params = useParams();
  const exerciseId = params.id;

  return (
    <div className="min-h-screen bg-[#1e3a5f] text-white">
      {/* Header */}
      <div className="bg-[#2d5282] px-8 py-6 border-b-4 border-[#1a2d4d]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-5xl font-black tracking-wider">
            EXERCISE {exerciseId} - FLIGHT PLAN
          </h1>
          
          <Link
            href={`/exercise/${exerciseId}/flight-plan`}
            className="bg-[#1a2d4d] hover:bg-[#14233a] px-6 py-3 rounded-lg font-bold transition-colors"
          >
            ← BACK
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="bg-[#2d5282] rounded-xl p-8 shadow-2xl border-2 border-[#3d6ba8]">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-2 text-[#ffde59]">Flight Information</h3>
                <div className="space-y-2 text-lg">
                  <p><span className="font-semibold">Callsign:</span> HVN123</p>
                  <p><span className="font-semibold">Aircraft Type:</span> B738</p>
                  <p><span className="font-semibold">Departure:</span> VVNB</p>
                  <p><span className="font-semibold">Destination:</span> VVTS</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2 text-[#ffde59]">Flight Details</h3>
                <div className="space-y-2 text-lg">
                  <p><span className="font-semibold">Cruise FL:</span> FL350</p>
                  <p><span className="font-semibold">Cruise Speed:</span> 450 kt</p>
                  <p><span className="font-semibold">Squawk:</span> 2000</p>
                  <p><span className="font-semibold">Route:</span> VOMAY DCT HANOI</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t-2 border-[#3d6ba8]">
              <h3 className="text-xl font-bold mb-4 text-[#ffde59]">Route Waypoints</h3>
              <div className="bg-[#1e3a5f] rounded-lg p-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-[#3d6ba8]">
                      <th className="text-left py-3 px-4">Waypoint</th>
                      <th className="text-left py-3 px-4">Coordinates</th>
                      <th className="text-left py-3 px-4">Altitude</th>
                      <th className="text-left py-3 px-4">Speed</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#3d6ba8]">
                      <td className="py-3 px-4 font-semibold">VOMAY</td>
                      <td className="py-3 px-4">21°00'N 105°48'E</td>
                      <td className="py-3 px-4">FL350</td>
                      <td className="py-3 px-4">450 kt</td>
                    </tr>
                    <tr className="border-b border-[#3d6ba8]">
                      <td className="py-3 px-4 font-semibold">HANOI</td>
                      <td className="py-3 px-4">21°01'N 105°51'E</td>
                      <td className="py-3 px-4">FL350</td>
                      <td className="py-3 px-4">450 kt</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

