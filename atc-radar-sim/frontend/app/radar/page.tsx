/**
 * Main radar simulation page
 */

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { RadarDisplay, ExerciseView } from '@/components/RadarDisplay';
import { ExerciseSelector } from '@/components/ExerciseSelector';
import { CommandPanel } from '@/components/CommandPanel';
import { AircraftList } from '@/components/AircraftList';
import { getSocket, connectSocket, disconnectSocket } from '@/lib/socket';
import { useAircraftStore } from '@/lib/store/aircraft-store';
import { useUIStore } from '@/lib/store/ui-store';
import { audioManager } from '@/lib/audio';

export default function RadarPage() {
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const commandPanelOpen = useUIStore((state) => state.commandPanelOpen);
  const aircraftListOpen = useUIStore((state) => state.aircraftListOpen);
  
  const [replayTime, setReplayTime] = useState(0); // Minutes
  const [speed, setSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState('03:00:00');
  const [currentCallsign, setCurrentCallsign] = useState('');
  const [currentClearance, setCurrentClearance] = useState('');
  const [commandLog, setCommandLog] = useState<{ time: string; text: string; valid?: boolean }[]>([]);
  const [exerciseId, setExerciseId] = useState(1); // Default to Exercise 1
  const [exerciseView, setExerciseView] = useState<ExerciseView>('all'); // Route view filter
  
  useEffect(() => {
    // Update dimensions on resize
    const updateDimensions = () => {
      const width = window.innerWidth; // Full width
      const height = window.innerHeight - 60 - 100; // Top bar (60px) + Bottom bar (100px)
      setDimensions({ width, height });
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  useEffect(() => {
    // Connect to WebSocket
    connectSocket();
    const socket = getSocket();
    
    // Set up event listeners
    socket.on('aircraft:update', (aircraft) => {
      useAircraftStore.getState().updateAircraft(aircraft);
    });
    
    socket.on('aircraft:add', (aircraft) => {
      useAircraftStore.getState().addAircraft(aircraft);
    });
    
    socket.on('aircraft:remove', (aircraftId) => {
      useAircraftStore.getState().removeAircraft(aircraftId);
    });
    
    socket.on('aircraft:batch', (aircraftList) => {
      useAircraftStore.getState().batchUpdateAircraft(aircraftList);
    });
    
    socket.on('command:acknowledged', (cmd) => {
      audioManager.play('confirmation');
      
      // Add to command log
      const timeStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
      setCommandLog(prev => [
        { time: timeStr, text: `Command acknowledged for ${cmd.aircraftId}`, valid: true },
        ...prev.slice(0, 49),
      ]);
    });
    
    socket.on('command:error', (error) => {
      console.error('Command error:', error);
      audioManager.play('error');
      
      // Add error to command log
      const timeStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
      setCommandLog(prev => [
        { time: timeStr, text: error.error, valid: false },
        ...prev.slice(0, 49),
      ]);
    });
    
    socket.on('separation:violation', (violation) => {
      console.warn('Separation violation:', violation);
      audioManager.play('alert');
    });
    
    socket.on('separation:warning', (warning) => {
      console.warn('Separation warning:', warning);
      audioManager.play('warning');
    });
    
    socket.on('exercise:loaded', (data) => {
      console.log(`Exercise ${data.exerciseId} loaded: ${data.name}`);
    });
    
    socket.on('session:event', (event) => {
      if (event.type === 'TIME_UPDATE') {
        setCurrentTime(event.data as string);
      }
    });
    
    // Load exercise by default
    socket.emit('exercise:load', exerciseId);
    socket.emit('aircraft:request');
    
    return () => {
      disconnectSocket();
    };
  }, [exerciseId]);
  
  const toggleCommandPanel = useUIStore((state) => state.toggleCommandPanel);
  const toggleAircraftList = useUIStore((state) => state.toggleAircraftList);
  const zoomIn = useUIStore((state) => state.zoomIn);
  const zoomOut = useUIStore((state) => state.zoomOut);
  
  // Handle play/pause
  const handlePlayPause = () => {
    const socket = getSocket();
    if (isPlaying) {
      socket.emit('exercise:pause');
      setIsPlaying(false);
    } else {
      socket.emit(replayTime === 0 && !isPlaying ? 'exercise:start' : 'exercise:resume');
      setIsPlaying(true);
    }
  };
  
  // Handle speed change
  const handleSpeedChange = (newSpeed: number) => {
    const socket = getSocket();
    socket.emit('exercise:setSpeed', newSpeed);
    setSpeed(newSpeed);
  };
  
  // Handle replay time adjustment
  const handleReplayAdjust = (delta: number) => {
    const newTime = Math.max(0, replayTime + delta);
    setReplayTime(newTime);
    const socket = getSocket();
    socket.emit('exercise:seekTo', newTime);
  };
  
  // Handle manual command submission
  const handleAddClearance = () => {
    if (!currentCallsign || !currentClearance) return;
    
    const socket = getSocket();
    socket.emit('command:manual', {
      callsign: currentCallsign.toUpperCase(),
      clearance: currentClearance.toUpperCase(),
    });
    
    setCurrentCallsign('');
    setCurrentClearance('');
  };

  return (
    <div className="flex flex-col h-screen bg-[#0C2D57]">
      {/* Top Control Bar */}
      <header className="bg-[#F2F2F2] px-6 py-4 flex items-center justify-between border-b-2 border-gray-300">
        <div className="flex items-center gap-6">
          {/* QUIT Button */}
          <Link
            href="/"
            className="text-black font-bold text-lg hover:text-gray-600 transition-colors ml-4"
          >
            QUIT
          </Link>
          
          {/* REPLAY Controls */}
          <div className="flex flex-col items-center">
            <span className="text-[#E53935] font-bold text-xs mb-1">REPLAY</span>
            <div className="bg-[#E0E0E0] rounded-full px-4 py-2 flex items-center gap-3">
              <button 
                onClick={() => handleReplayAdjust(-1)}
                className="text-xl font-bold hover:text-[#E53935]"
              >
                −
              </button>
              <span className="text-[#E53935] font-bold min-w-[60px] text-center">
                {Math.floor(replayTime).toString().padStart(2, '0')}:{Math.floor((replayTime % 1) * 60).toString().padStart(2, '0')}
              </span>
              <button 
                onClick={() => handleReplayAdjust(1)}
                className="text-xl font-bold hover:text-[#E53935]"
              >
                +
              </button>
            </div>
          </div>
          
          {/* Speed Selection */}
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((s) => (
              <button
                key={s}
                onClick={() => handleSpeedChange(s)}
                className={`px-4 py-2 rounded font-bold transition-all ${
                  speed === s
                    ? 'bg-gray-800 text-white'
                    : 'bg-white text-black hover:bg-gray-200'
                }`}
              >
                {s}X
              </button>
            ))}
          </div>
          
          {/* Play/Pause Button */}
          <button
            onClick={handlePlayPause}
            className="w-10 h-10 rounded-full bg-[#E53935] hover:bg-[#c62828] flex items-center justify-center transition-colors shadow-lg"
          >
            {isPlaying ? (
              <div className="flex gap-1">
                <div className="w-0.5 h-3 bg-white"></div>
                <div className="w-0.5 h-3 bg-white"></div>
              </div>
            ) : (
              <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Clock */}
        <div className="text-[#E53935] text-3xl font-bold font-mono">
          {currentTime}
        </div>
      </header>
      
      {/* Main Map Area */}
      <div className="flex-1 relative overflow-hidden">
        {/* Radar Display with Exercise Routes */}
        <RadarDisplay 
          width={dimensions.width} 
          height={dimensions.height}
          exerciseView={exerciseView}
        />
        
        {/* Exercise Selector Overlay */}
        <ExerciseSelector 
          currentView={exerciseView}
          onViewChange={setExerciseView}
        />
      </div>
      
      {/* Bottom Command Bar */}
      <div className="bg-[#F2F2F2] px-6 py-4 border-t-2 border-gray-300">
            <div className="grid grid-cols-3 gap-6 items-center">
              {/* Left - Add Clearance */}
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={currentCallsign}
                  onChange={(e) => setCurrentCallsign(e.target.value.toUpperCase())}
                  placeholder="Callsign"
                  className="px-3 py-2 border-2 border-gray-300 rounded text-[#0C2D57] font-bold uppercase w-24"
                />
                <input
                  type="text"
                  value={currentClearance}
                  onChange={(e) => setCurrentClearance(e.target.value.toUpperCase())}
                  placeholder="Command"
                  className="px-3 py-2 border-2 border-gray-300 rounded text-[#0C2D57] font-bold uppercase w-32"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddClearance()}
                />
                <button 
                  onClick={handleAddClearance}
                  className="text-[#E53935] font-bold text-lg hover:text-[#c62828] transition-colors whitespace-nowrap"
                >
                  ADD CLEARANCE
                </button>
              </div>

              {/* Middle - Exercise Info */}
              <div className="text-center">
                <div className="text-[#0C2D57] font-bold text-xl">
                  Exercise {exerciseId}
                </div>
                <div className="text-[#0C2D57] font-semibold text-sm">
                  {isPlaying ? 'Running' : 'Paused'} - {speed}X Speed
                </div>
              </div>

              {/* Right - Command Log */}
              <div className="relative">
                <div className="max-h-20 overflow-y-auto bg-white rounded-lg px-4 py-2 border-2 border-gray-300">
                  {commandLog.length === 0 ? (
                    <div className="text-sm text-gray-400 italic">No commands yet</div>
                  ) : (
                    commandLog.map((log, index) => (
                      <div key={index} className={`text-sm mb-1 ${log.valid === false ? 'text-red-600' : 'text-gray-700'}`}>
                        <span className="font-bold">{log.time}</span> {log.text}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
      </div>
    </div>
  );
}

