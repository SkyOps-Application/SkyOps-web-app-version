/**
 * Exercise selector component for toggling between exercise views
 */

'use client';

import React from 'react';
import { useUIStore } from '@/lib/store/ui-store';

export type ExerciseView = 'all' | 'exercise1' | 'exercise2';

interface ExerciseSelectorProps {
  currentView: ExerciseView;
  onViewChange: (view: ExerciseView) => void;
}

export function ExerciseSelector({ currentView, onViewChange }: ExerciseSelectorProps) {
  const buttonClass = (view: ExerciseView) => 
    `px-4 py-2 rounded font-semibold text-sm transition-colors ${
      currentView === view
        ? 'bg-yellow-400 text-black'
        : 'bg-gray-700 text-white hover:bg-gray-600'
    }`;

  return (
    <div className="absolute top-36 left-4 bg-black bg-opacity-70 px-10 py-5 rounded">
      <p className="text-yellow-300 font-semibold mb-2 text-sm">View Exercise:</p>
      <div className="flex flex-col gap-1.5">
        <button
          onClick={() => onViewChange('all')}
          className={buttonClass('all') + ' h-5 w-30'} // h-12 = height, w-48 = width
        >
          Show All Routes
        </button>
        <button
          onClick={() => onViewChange('exercise1')}
          className={buttonClass('exercise1') + ' h-5 w-30'}
        >
          <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ background: '#FF69B4' }}></span>
          Exercise 1
        </button>
        <button
          onClick={() => onViewChange('exercise2')}
          className={buttonClass('exercise2')}
        >
          <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ background: '#00CED1' }}></span>
          Exercise 2
        </button>
      </div>
    </div>
  );
}

