/**
 * Voice Command Hook
 * Uses Web Speech API to recognize voice commands for ATC
 */

import { useState, useEffect, useRef } from 'react';

interface VoiceCommandResult {
  transcript: string;
  command: string | null;
  confidence: number;
}

interface UseVoiceCommandOptions {
  onCommand?: (command: string) => void;
  onError?: (error: string) => void;
  language?: string;
}

export function useVoiceCommand(options: UseVoiceCommandOptions = {}) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check if browser supports Web Speech API
    const SpeechRecognition = 
      (window as any).SpeechRecognition || 
      (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = options.language || 'en-US';
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setTranscript('');
      };

      recognition.onresult = (event: any) => {
        const result = event.results[0][0];
        const spokenText = result.transcript;
        const confidence = result.confidence;
        
        setTranscript(spokenText);
        
        // Parse voice input to command
        const command = parseVoiceToCommand(spokenText);
        
        if (command && options.onCommand) {
          options.onCommand(command);
        }
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        if (options.onError) {
          options.onError(event.error);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      setIsSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [options]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Failed to start recognition:', error);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  return {
    isListening,
    isSupported,
    transcript,
    startListening,
    stopListening,
  };
}

/**
 * Parse spoken text to ATC command format
 * Handles aviation phonetic alphabet and common ATC phraseology
 */
function parseVoiceToCommand(spokenText: string): string | null {
  const text = spokenText.toLowerCase().trim();
  
  // Extract callsign (e.g., "hotel victor november 123" -> "HVN123")
  const callsign = extractCallsign(text);
  if (!callsign) return null;
  
  // Parse command type and value
  let command = '';
  
  // Altitude commands
  if (text.includes('descend to')) {
    const alt = extractAltitude(text);
    if (alt) command = `${callsign} D${alt}`;
  }
  else if (text.includes('climb to')) {
    const alt = extractAltitude(text);
    if (alt) command = `${callsign} C${alt}`;
  }
  else if (text.includes('stop descend at') || text.includes('stop descent at')) {
    const alt = extractAltitude(text);
    if (alt) command = `${callsign} SD${alt}`;
  }
  else if (text.includes('stop climb at')) {
    const alt = extractAltitude(text);
    if (alt) command = `${callsign} SC${alt}`;
  }
  // Heading commands
  else if (text.includes('turn right') || text.includes('right turn')) {
    const hdg = extractHeading(text);
    if (hdg) command = `${callsign} R${hdg}`;
  }
  else if (text.includes('turn left') || text.includes('left turn')) {
    const hdg = extractHeading(text);
    if (hdg) command = `${callsign} L${hdg}`;
  }
  else if (text.includes('fly heading') || text.includes('heading')) {
    const hdg = extractHeading(text);
    if (hdg) command = `${callsign} F${hdg}`;
  }
  // Speed commands
  else if (text.includes('increase speed')) {
    const spd = extractSpeed(text);
    if (spd) command = `${callsign} IS${spd}`;
  }
  else if (text.includes('reduce speed') || text.includes('decrease speed')) {
    const spd = extractSpeed(text);
    if (spd) command = `${callsign} RS${spd}`;
  }
  // Mach commands
  else if (text.includes('increase mach')) {
    const mach = extractMach(text);
    if (mach) command = `${callsign} IM${mach}`;
  }
  else if (text.includes('reduce mach') || text.includes('decrease mach')) {
    const mach = extractMach(text);
    if (mach) command = `${callsign} RM${mach}`;
  }
  // Other commands
  else if (text.includes('identify') || text.includes('identified')) {
    command = `${callsign} ID`;
  }
  else if (text.includes('contact')) {
    command = `${callsign} CT`;
  }
  else if (text.includes('direct')) {
    const waypoint = extractWaypoint(text);
    if (waypoint) command = `${callsign} DR${waypoint}`;
  }
  
  return command || null;
}

/**
 * Extract callsign from spoken text
 * Handles phonetic alphabet (e.g., "hotel victor november")
 */
function extractCallsign(text: string): string | null {
  const phoneticMap: { [key: string]: string } = {
    'alpha': 'A', 'bravo': 'B', 'charlie': 'C', 'delta': 'D', 'echo': 'E',
    'foxtrot': 'F', 'golf': 'G', 'hotel': 'H', 'india': 'I', 'juliet': 'J',
    'kilo': 'K', 'lima': 'L', 'mike': 'M', 'november': 'N', 'oscar': 'O',
    'papa': 'P', 'quebec': 'Q', 'romeo': 'R', 'sierra': 'S', 'tango': 'T',
    'uniform': 'U', 'victor': 'V', 'whiskey': 'W', 'xray': 'X', 'yankee': 'Y',
    'zulu': 'Z',
  };
  
  const words = text.split(/\s+/);
  let callsign = '';
  let numberPart = '';
  
  // Extract phonetic letters
  for (let i = 0; i < Math.min(words.length, 10); i++) {
    const word = words[i];
    
    // Check if it's a phonetic letter
    if (phoneticMap[word]) {
      callsign += phoneticMap[word];
    }
    // Check if it's a number (e.g., "one two three" -> "123")
    else if (/^\d+$/.test(word)) {
      numberPart += word;
      break;
    }
    // Convert spoken numbers to digits
    else {
      const digit = spokenNumberToDigit(word);
      if (digit !== null) {
        numberPart += digit;
      } else if (callsign.length > 0) {
        // Stop if we've started the callsign and hit a non-phonetic word
        break;
      }
    }
  }
  
  // Handle direct callsign format (e.g., "VJC793", "HVN123")
  const directMatch = text.match(/\b([A-Z]{3}\d{2,4})\b/i);
  if (directMatch) {
    return directMatch[1].toUpperCase();
  }
  
  return callsign + numberPart || null;
}

/**
 * Convert spoken numbers to digits (ICAO standard)
 */
function spokenNumberToDigit(word: string): string | null {
  const numberMap: { [key: string]: string } = {
    'zero': '0', 'one': '1', 'two': '2', 'three': '3', 'tree': '3', 
    'four': '4', 'five': '5', 'six': '6', 'seven': '7', 
    'eight': '8', 'nine': '9', 'niner': '9',
  };
  return numberMap[word] || null;
}

/**
 * Extract altitude from spoken text
 */
function extractAltitude(text: string): string | null {
  // Match "flight level XXX" or "FL XXX"
  let match = text.match(/flight\s*level\s*(\d{2,3})/i) || text.match(/fl\s*(\d{2,3})/i);
  if (match) return match[1];
  
  // Match "XXX feet" or "X thousand feet"
  match = text.match(/(\d{1,2})\s*thousand/i);
  if (match) return match[1]; // Return shortened form (e.g., 90 for 9000ft)
  
  match = text.match(/(\d{4,5})\s*feet/i);
  if (match) {
    const feet = parseInt(match[1]);
    return Math.floor(feet / 100).toString(); // Convert to FL notation
  }
  
  // Match plain numbers after altitude keywords
  match = text.match(/(?:to|at)\s*(\d{2,3})\b/);
  if (match) return match[1];
  
  return null;
}

/**
 * Extract heading from spoken text
 */
function extractHeading(text: string): string | null {
  // Match "heading XXX" or plain three-digit number
  const match = text.match(/heading\s*(\d{1,3})|(\d{3})/);
  if (match) {
    const hdg = match[1] || match[2];
    return hdg.padStart(3, '0');
  }
  
  // Match spoken numbers (e.g., "two seven zero")
  const words = text.split(/\s+/);
  let digits = '';
  let foundHeading = false;
  
  for (let i = 0; i < words.length; i++) {
    if (words[i] === 'heading') {
      foundHeading = true;
      continue;
    }
    if (foundHeading) {
      const digit = spokenNumberToDigit(words[i]);
      if (digit !== null) {
        digits += digit;
        if (digits.length === 3) break;
      }
    }
  }
  
  return digits.length === 3 ? digits : null;
}

/**
 * Extract speed from spoken text
 */
function extractSpeed(text: string): string | null {
  const match = text.match(/(\d{3})\s*knots?|to\s*(\d{3})/);
  if (match) return match[1] || match[2];
  return null;
}

/**
 * Extract mach number from spoken text
 */
function extractMach(text: string): string | null {
  const match = text.match(/mach\s*(\d\.\d{1,2})|(\d\.\d{1,2})/);
  if (match) return match[1] || match[2];
  return null;
}

/**
 * Extract waypoint from spoken text
 */
function extractWaypoint(text: string): string | null {
  // Match "direct to XXX" or "direct XXX"
  const match = text.match(/direct\s*(?:to\s*)?([A-Z]{2,6})/i);
  if (match) return match[1].toUpperCase();
  return null;
}

