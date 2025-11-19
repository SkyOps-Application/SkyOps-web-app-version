/**
 * Command input panel with text and voice support
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { parseCommand, formatCommand } from '@atc-radar-sim/shared';
import { getSocket } from '@/lib/socket';
import { audioManager } from '@/lib/audio';
import { useVoiceCommand } from '@/hooks/useVoiceCommand';

interface CommandHistory {
  command: string;
  timestamp: Date;
  valid: boolean;
  error?: string;
}

export function CommandPanel() {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Voice command hook
  const { isListening, isSupported: voiceSupported, transcript, startListening, stopListening } = useVoiceCommand({
    onCommand: (cmd) => {
      // Voice command parsed successfully, set it in the input
      setCommand(cmd);
      setVoiceTranscript(transcript);
      audioManager.play('confirmation');
      
      // Auto-submit the command
      setTimeout(() => {
        handleSubmitCommand(cmd);
      }, 100);
    },
    onError: (error) => {
      console.error('Voice recognition error:', error);
      audioManager.play('error');
      setHistory((prev) => [
        {
          command: `Voice error: ${error}`,
          timestamp: new Date(),
          valid: false,
          error: `Failed to recognize voice: ${error}`,
        },
        ...prev.slice(0, 49),
      ]);
    },
  });
  
  useEffect(() => {
    // Listen for distance results from server
    const socket = getSocket();
    const handleDistanceResult = (event: any) => {
      if (event.type === 'DISTANCE_RESULT') {
        setHistory((prev) => [
          {
            command: event.data,
            timestamp: new Date(event.timestamp),
            valid: true,
          },
          ...prev.slice(0, 49),
        ]);
        audioManager.play('confirmation');
      }
    };
    
    socket.on('session:event', handleDistanceResult);
    
    return () => {
      socket.off('session:event', handleDistanceResult);
    };
  }, []);
  
  const handleSubmitCommand = (cmd: string) => {
    if (!cmd.trim()) return;
    
    const parsed = parseCommand(cmd);
    
    // Add to history
    setHistory((prev) => [
      {
        command: parsed.valid ? formatCommand(parsed) : cmd,
        timestamp: new Date(),
        valid: parsed.valid,
        error: parsed.error,
      },
      ...prev.slice(0, 49), // Keep last 50 commands
    ]);
    
    if (parsed.valid) {
      // Send command to server
      const socket = getSocket();
      socket.emit('command:text', cmd);
      
      // Play confirmation sound
      audioManager.play('confirmation');
    } else {
      // Play error sound
      audioManager.play('error');
    }
    
    setCommand('');
    inputRef.current?.focus();
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmitCommand(command);
  };
  
  const toggleVoiceRecognition = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };
  
  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      {/* Header */}
      <div className="px-4 py-3 bg-gray-800 border-b border-gray-700">
        <h2 className="text-lg font-semibold">Command Panel</h2>
      </div>
      
      {/* Command history */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-sm">
        {history.map((item, index) => (
          <div
            key={index}
            className={`p-2 rounded ${
              item.valid ? 'bg-green-900 bg-opacity-30' : 'bg-red-900 bg-opacity-30'
            }`}
          >
            <div className={item.valid ? 'text-green-300' : 'text-red-300'}>
              {item.command}
            </div>
            {item.error && (
              <div className="text-xs text-red-400 mt-1">{item.error}</div>
            )}
            <div className="text-xs text-gray-500 mt-1">
              {item.timestamp.toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
      
      {/* Input form */}
      <form onSubmit={handleSubmit} className="p-4 bg-gray-800 border-t border-gray-700">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value.toUpperCase())}
            placeholder="Enter command (e.g., VNA123 D120) or use voice"
            className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
            autoComplete="off"
          />
          
          {voiceSupported && (
            <button
              type="button"
              onClick={toggleVoiceRecognition}
              className={`px-4 py-2 rounded font-medium transition-colors flex items-center gap-2 ${
                isListening
                  ? 'bg-red-600 hover:bg-red-700 animate-pulse'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
              title={isListening ? 'Stop listening' : 'Start voice command'}
            >
              <span className="text-xl">{isListening ? '🔴' : '🎤'}</span>
              {isListening ? 'Listening...' : 'Voice'}
            </button>
          )}
          
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded font-medium transition-colors"
            disabled={isListening}
          >
            Send
          </button>
        </div>
        
        {/* Voice transcript indicator */}
        {isListening && (
          <div className="mt-2 p-2 bg-blue-900 bg-opacity-30 rounded border border-blue-600 text-blue-300 text-sm">
            🎤 Listening... Speak your command (e.g., "Victor Juliet Charlie 793 descend flight level 120")
          </div>
        )}
        
        {voiceTranscript && !isListening && (
          <div className="mt-2 p-2 bg-green-900 bg-opacity-30 rounded text-green-300 text-sm">
            Heard: "{voiceTranscript}"
          </div>
        )}
        
        <div className="mt-2 text-xs text-gray-400 space-y-1">
          <div><strong>Text Commands:</strong></div>
          <div><strong>Altitude:</strong> VNA123 C120 (climb) | VNA123 D90 (descend) | VNA123 SC120 (stop climb) | VNA123 SD90 (stop descend)</div>
          <div><strong>Heading:</strong> VNA123 R270 (turn right) | VNA123 L090 (turn left) | VNA123 F180 (fly heading)</div>
          <div><strong>Speed:</strong> VNA123 IS280 (increase, max ±20kts) | VNA123 RS240 (reduce)</div>
          <div><strong>Mach:</strong> VNA123 IM0.80 (increase, max ±0.3) | VNA123 RM0.76 (reduce, max 2 decimals)</div>
          <div><strong>Direct-to:</strong> VNA123 DRPCA (direct to waypoint)</div>
          <div><strong>Distance:</strong> DT VNA123 UAL456 (aircraft-aircraft) | DT VNA123 TSH (aircraft-waypoint) | DT TSH AC (waypoint-waypoint)</div>
          <div><strong>Other:</strong> VNA123 ID (identify) | VNA123 CT (contact/handoff)</div>
          {voiceSupported && (
            <>
              <div className="mt-2"><strong>Voice Commands:</strong></div>
              <div>Say: "Victor Juliet Charlie 793 descend flight level 120" → VJC793 D120</div>
              <div>Say: "Hotel Victor November 123 turn right heading two seven zero" → HVN123 R270</div>
              <div>Say: "Victor November Alpha 456 identify" → VNA456 ID</div>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

