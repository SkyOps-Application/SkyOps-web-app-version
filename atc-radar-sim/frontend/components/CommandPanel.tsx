/**
 * Command input panel with text and voice support
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { parseCommand, formatCommand } from '@atc-radar-sim/shared';
import { getSocket } from '@/lib/socket';
import { audioManager } from '@/lib/audio';

interface CommandHistory {
  command: string;
  timestamp: Date;
  valid: boolean;
  error?: string;
}

export function CommandPanel() {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  
  useEffect(() => {
    // Check for voice recognition support
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setVoiceSupported(true);
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';
        
        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setCommand(transcript.toUpperCase());
          setIsListening(false);
        };
        
        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };
        
        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }
    
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!command.trim()) return;
    
    const parsed = parseCommand(command);
    
    // Add to history
    setHistory((prev) => [
      {
        command: parsed.valid ? formatCommand(parsed) : command,
        timestamp: new Date(),
        valid: parsed.valid,
        error: parsed.error,
      },
      ...prev.slice(0, 49), // Keep last 50 commands
    ]);
    
    if (parsed.valid) {
      // Send command to server
      const socket = getSocket();
      socket.emit('command:text', command);
      
      // Play confirmation sound
      audioManager.play('confirmation');
    } else {
      // Play error sound
      audioManager.play('error');
    }
    
    setCommand('');
    inputRef.current?.focus();
  };
  
  const startVoiceRecognition = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };
  
  const stopVoiceRecognition = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
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
            placeholder="Enter command (e.g., VNA123 D120)"
            className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
            autoComplete="off"
          />
          
          {voiceSupported && (
            <button
              type="button"
              onClick={isListening ? stopVoiceRecognition : startVoiceRecognition}
              className={`px-4 py-2 rounded font-medium transition-colors ${
                isListening
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isListening ? 'Stop' : 'Voice'}
            </button>
          )}
          
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded font-medium transition-colors"
          >
            Send
          </button>
        </div>
        
        <div className="mt-2 text-xs text-gray-400">
          <div>Altitude: VNA123 C120 (climb), VNA123 D90 (descend)</div>
          <div>Heading: VNA123 R270 (turn right), VNA123 F180 (fly heading)</div>
          <div>Speed: VNA123 IS280 (increase), VNA123 IM0.80 (Mach)</div>
          <div>Direct-to: VNA123 DIRECTTSH or VNA123 DTSH</div>
          <div>Identify: VNA123 ID | Measure: DISTANCE VNA123 UAL456</div>
        </div>
      </form>
    </div>
  );
}

