/**
 * Aircraft list panel showing all active aircraft
 */

'use client';

import React from 'react';
import { useAircraftStore } from '@/lib/store/aircraft-store';
import { AircraftData } from '@atc-radar-sim/shared';

export function AircraftList() {
  const aircraft = useAircraftStore((state) => state.aircraft);
  const selectedAircraftId = useAircraftStore((state) => state.selectedAircraftId);
  const selectAircraft = useAircraftStore((state) => state.selectAircraft);
  
  // Sort by callsign
  const sortedAircraft = React.useMemo(() => 
    [...aircraft].sort((a, b) => a.callsign.localeCompare(b.callsign)),
    [aircraft]
  );
  
  const getStateColor = (state: AircraftData['state']) => {
    switch (state) {
      case 'UNKNOWN':
        return 'text-gray-400';
      case 'CONTACT':
        return 'text-orange-400';
      case 'IDENTIFIED':
        return 'text-green-400';
      case 'CONFLICT':
        return 'text-red-400';
      case 'TRANSFERRED':
        return 'text-purple-400';
      case 'HANDOFF':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
  };
  
  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      {/* Header */}
      <div className="px-4 py-3 bg-gray-800 border-b border-gray-700">
        <h2 className="text-lg font-semibold">
          Aircraft ({aircraft.length})
        </h2>
      </div>
      
      {/* Aircraft list */}
      <div className="flex-1 overflow-y-auto">
        {sortedAircraft.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No aircraft in the area
          </div>
        ) : (
          <div className="divide-y divide-gray-800">
            {sortedAircraft.map((ac) => (
              <div
                key={ac.id}
                onClick={() => selectAircraft(ac.id === selectedAircraftId ? null : ac.id)}
                className={`p-3 cursor-pointer hover:bg-gray-800 transition-colors ${
                  ac.id === selectedAircraftId ? 'bg-gray-800 border-l-4 border-blue-500' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="font-mono font-bold text-lg">{ac.callsign}</div>
                  <div className={`text-xs font-medium uppercase ${getStateColor(ac.state)}`}>
                    {ac.state}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm font-mono">
                  <div>
                    <span className="text-gray-400">FL:</span>{' '}
                    <span className="text-white">{ac.flightLevel}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">SPD:</span>{' '}
                    <span className="text-white">{Math.round(ac.speed)}kt</span>
                  </div>
                  <div>
                    <span className="text-gray-400">HDG:</span>{' '}
                    <span className="text-white">{Math.round(ac.heading).toString().padStart(3, '0')}°</span>
                  </div>
                  <div>
                    <span className="text-gray-400">SQK:</span>{' '}
                    <span className="text-white">{ac.squawk}</span>
                  </div>
                </div>
                
                <div className="mt-2 text-xs text-gray-400">
                  {ac.departure} → {ac.destination}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

