/**
 * Main radar simulation page
 */

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { RadarDisplay } from '@/components/RadarDisplay';
import { getSocket, connectSocket, disconnectSocket } from '@/lib/socket';
import { useAircraftStore } from '@/lib/store/aircraft-store';
import { useUIStore } from '@/lib/store/ui-store';
import { audioManager } from '@/lib/audio';
import { useVoiceCommand } from '@/hooks/useVoiceCommand';

export default function RadarPage() {
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  
  const [replayTime, setReplayTime] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState('03:00:00');
  const [currentCallsign, setCurrentCallsign] = useState('');
  const [currentClearance, setCurrentClearance] = useState('');
  const [commandLog, setCommandLog] = useState<{ time: string; text: string; valid?: boolean }[]>([]);
  const [exerciseId] = useState(1);
  
  const { isListening, isSupported: voiceSupported, startListening, stopListening } = useVoiceCommand({
    onCommand: (cmd) => {
      const parts = cmd.split(' ');
      if (parts.length >= 2) {
        const callsign = parts[0];
        const clearance = parts.slice(1).join(' ');
        setCurrentCallsign(callsign);
        setCurrentClearance(clearance);
        
        setTimeout(() => {
          const socket = getSocket();
          socket.emit('command:manual', { callsign, clearance });
        }, 100);
        
        audioManager.play('confirmation');
      }
    },
    onError: (error) => {
      console.error('Voice recognition error:', error);
      audioManager.play('error');
    },
  });
  
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight - 64 - 88;
      setDimensions({ width, height });
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  useEffect(() => {
    connectSocket();
    const socket = getSocket();
    
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
      
      const timeStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
      const displayText = cmd.message || `Command acknowledged for ${cmd.aircraftId}`;
      setCommandLog(prev => [
        { time: timeStr, text: displayText, valid: true },
        ...prev.slice(0, 49),
      ]);
    });
    
    socket.on('command:error', (error) => {
      console.error('Command error:', error);
      audioManager.play('error');
      
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
    
    socket.emit('exercise:load', exerciseId);
    socket.emit('aircraft:request');
    
    return () => {
      disconnectSocket();
    };
  }, [exerciseId]);
  
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
  
  const handleSpeedChange = (newSpeed: number) => {
    const socket = getSocket();
    socket.emit('exercise:setSpeed', newSpeed);
    setSpeed(newSpeed);
  };
  
  const handleReplayAdjust = (delta: number) => {
    const newTime = Math.max(0, replayTime + delta);
    setReplayTime(newTime);
    const socket = getSocket();
    socket.emit('exercise:seekTo', newTime);
  };
  
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
    <div className="flex flex-col h-screen bg-[#0a0f1a]">
      {/* Top Control Bar */}
      <header className="bg-[#111827] px-6 h-16 flex items-center justify-between border-b border-[rgba(255,255,255,0.1)]">
        <div className="flex items-center gap-6">
          {/* QUIT Button */}
          <Link
            href="/home"
            className="text-[var(--text-secondary)] hover:text-white font-semibold text-sm transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            EXIT
          </Link>
          
          {/* Divider */}
          <div className="w-px h-6 bg-[rgba(255,255,255,0.1)]" />
          
          {/* REPLAY Controls */}
          <div className="flex items-center gap-3">
            <span className="text-[var(--error)] font-semibold text-xs uppercase tracking-wider">Replay</span>
            <div className="bg-[var(--bg-card)] rounded-full px-3 py-1.5 flex items-center gap-2 border border-[rgba(255,255,255,0.1)]">
              <button 
                onClick={() => handleReplayAdjust(-1)}
                className="w-6 h-6 flex items-center justify-center text-[var(--text-secondary)] hover:text-white rounded transition-colors"
              >
                −
              </button>
              <span className="text-[var(--error)] font-mono font-semibold min-w-[50px] text-center text-sm">
                {Math.floor(replayTime).toString().padStart(2, '0')}:{Math.floor((replayTime % 1) * 60).toString().padStart(2, '0')}
              </span>
              <button 
                onClick={() => handleReplayAdjust(1)}
                className="w-6 h-6 flex items-center justify-center text-[var(--text-secondary)] hover:text-white rounded transition-colors"
              >
                +
              </button>
            </div>
          </div>
          
          {/* Speed Selection */}
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4].map((s) => (
              <button
                key={s}
                onClick={() => handleSpeedChange(s)}
                className={`px-3 py-1.5 rounded-md font-semibold text-sm transition-all ${
                  speed === s
                    ? 'bg-[var(--accent-primary)] text-[var(--bg-primary)]'
                    : 'bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-white border border-[rgba(255,255,255,0.1)]'
                }`}
              >
                {s}X
              </button>
            ))}
          </div>
          
          {/* Play/Pause Button */}
          <button
            onClick={handlePlayPause}
            className="w-10 h-10 rounded-full bg-[var(--accent-primary)] hover:bg-[var(--accent-secondary)] flex items-center justify-center transition-colors shadow-lg"
          >
            {isPlaying ? (
              <div className="flex gap-0.5">
                <div className="w-1 h-4 bg-[var(--bg-primary)] rounded-sm"></div>
                <div className="w-1 h-4 bg-[var(--bg-primary)] rounded-sm"></div>
              </div>
            ) : (
              <svg className="w-5 h-5 text-[var(--bg-primary)] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Clock */}
        <div className="text-[var(--accent-primary)] text-2xl font-mono font-bold tracking-wider">
          {currentTime}
        </div>
      </header>
      
      {/* Main Map Area */}
      <div className="flex-1 relative overflow-hidden">
        <RadarDisplay 
          width={dimensions.width} 
          height={dimensions.height}
        />
      </div>
      
      {/* Bottom Command Bar */}
      <div className="bg-[#111827] px-6 py-4 border-t border-[rgba(255,255,255,0.1)]">
        <div className="grid grid-cols-3 gap-6 items-center">
          {/* Left - Add Clearance */}
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={currentCallsign}
              onChange={(e) => setCurrentCallsign(e.target.value.toUpperCase())}
              placeholder="Callsign"
              className="input-base w-24 py-2 text-sm font-mono uppercase"
              disabled={isListening}
            />
            <input
              type="text"
              value={currentClearance}
              onChange={(e) => setCurrentClearance(e.target.value.toUpperCase())}
              placeholder="Command"
              className="input-base w-36 py-2 text-sm font-mono uppercase"
              onKeyPress={(e) => e.key === 'Enter' && handleAddClearance()}
              disabled={isListening}
            />
            {voiceSupported && (
              <button
                type="button"
                onClick={isListening ? stopListening : startListening}
                className={`px-3 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${
                  isListening
                    ? 'bg-[var(--error)] text-white animate-pulse'
                    : 'bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-white border border-[rgba(255,255,255,0.1)]'
                }`}
                title={isListening ? 'Stop listening' : 'Voice command'}
              >
                {isListening ? '🔴' : '🎤'}
              </button>
            )}
            <button 
              onClick={handleAddClearance}
              className="btn-primary py-2 px-4 text-sm"
              disabled={isListening}
            >
              Send
            </button>
          </div>

          {/* Middle - Exercise Info */}
          <div className="text-center">
            <div className="text-white font-semibold">
              Exercise {exerciseId}
            </div>
            <div className="text-[var(--text-muted)] text-sm">
              {isPlaying ? 'Running' : 'Paused'} • {speed}X Speed
            </div>
          </div>

          {/* Right - Command Log */}
          <div className="relative">
            <div className="max-h-16 overflow-y-auto bg-[var(--bg-card)] rounded-lg px-3 py-2 border border-[rgba(255,255,255,0.1)]">
              {commandLog.length === 0 ? (
                <div className="text-xs text-[var(--text-muted)] italic">No commands yet</div>
              ) : (
                commandLog.slice(0, 3).map((log, index) => (
                  <div key={index} className={`text-xs mb-1 ${log.valid === false ? 'text-[var(--error)]' : 'text-[var(--text-secondary)]'}`}>
                    <span className="font-mono text-[var(--text-muted)]">{log.time}</span> {log.text}
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
