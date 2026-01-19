/**
 * Exercise Selection Page
 * Matching iPadOS ExerciseSelectionView
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    StaticGlassBackground,
    GridOverlay,
    ExerciseCard,
    ThemeColors
} from '@/components/Effects';
import { ProcessingView } from '@/components/ProcessingView';

// Exercise data
const EXERCISES = [
    {
        id: 1,
        name: 'Basic Tutorial',
        description: 'Learn the fundamentals of air traffic control with guided instructions and step-by-step training.',
        difficulty: 'BEGINNER',
        aircraftCount: 3,
        isTutorial: true,
        tutorialSteps: 8,
    },
    {
        id: 2,
        name: 'Exercise 1 - Introduction',
        description: 'Your first independent exercise. Handle basic traffic flow with minimal conflicts.',
        difficulty: 'EASY',
        aircraftCount: 5,
        isTutorial: false,
        tutorialSteps: 0,
    },
    {
        id: 3,
        name: 'Exercise 2 - Busy Traffic',
        description: 'Manage increased traffic volume with multiple crossing routes and altitude changes.',
        difficulty: 'MEDIUM',
        aircraftCount: 8,
        isTutorial: false,
        tutorialSteps: 0,
    },
    {
        id: 4,
        name: 'Exercise 3 - Rush Hour',
        description: 'Peak traffic conditions with complex routing, weather considerations, and time pressure.',
        difficulty: 'HARD',
        aircraftCount: 12,
        isTutorial: false,
        tutorialSteps: 0,
    },
];

export default function ExerciseSelectionPage() {
    const router = useRouter();
    const [selectedExercise, setSelectedExercise] = useState<typeof EXERCISES[0] | null>(null);
    const [showProcessing, setShowProcessing] = useState(false);

    const handleExerciseSelect = (exercise: typeof EXERCISES[0]) => {
        setSelectedExercise(exercise);
        setShowProcessing(true);
    };

    const handleProcessingComplete = () => {
        // Navigate to radar page after loading animation
        router.push('/radar');
    };

    return (
        <div className="min-h-screen relative">
            {/* Background */}
            <StaticGlassBackground />
            <GridOverlay opacity={0.03} />

            {/* Processing View Overlay */}
            {showProcessing && selectedExercise && (
                <ProcessingView
                    exerciseName={selectedExercise.name}
                    onComplete={handleProcessingComplete}
                />
            )}

            {/* Main Content */}
            <div className="relative z-10">
                {/* Header */}
                <header className="flex items-center px-8 py-5 bg-white/5 border-b border-white/10">
                    {/* Back Button */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-full transition-all hover:bg-white/10"
                        style={{
                            color: ThemeColors.primary,
                            background: `${ThemeColors.primary}20`,
                        }}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="font-medium">Back</span>
                    </Link>

                    {/* Title */}
                    <h1 className="flex-1 text-center text-2xl font-bold text-white">
                        Select Exercise
                    </h1>

                    {/* Spacer for centering */}
                    <div className="w-24" />
                </header>

                {/* Exercise List */}
                <main className="max-w-4xl mx-auto px-8 py-8">
                    <div className="flex flex-col gap-6">
                        {EXERCISES.map((exercise) => (
                            <ExerciseCard
                                key={exercise.id}
                                name={exercise.name}
                                description={exercise.description}
                                difficulty={exercise.difficulty}
                                aircraftCount={exercise.aircraftCount}
                                isTutorial={exercise.isTutorial}
                                tutorialSteps={exercise.tutorialSteps}
                                onClick={() => handleExerciseSelect(exercise)}
                            />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}
