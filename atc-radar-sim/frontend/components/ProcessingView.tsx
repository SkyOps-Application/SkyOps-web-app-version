/**
 * Processing View - Loading Screen
 * Ported from iPadOS Swift ProcessingView
 */

'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { ParticleSystem, QuickTip, ProgressBar } from './Effects';
import { MaterialIcon } from './MaterialIcon';

// Quick tips for ATC training - using Material Symbol names
const QUICK_TIPS = [
    { icon: 'flight_takeoff', title: 'Climb Command', description: 'Use C + altitude to climb aircraft. Example: C350 = Climb to FL350' },
    { icon: 'flight_land', title: 'Descend Command', description: 'Use D + altitude to descend. Example: D280 = Descend to FL280' },
    { icon: 'turn_left', title: 'Turn Left', description: 'Use L + heading for left turns. Example: L090 = Turn left heading 090' },
    { icon: 'turn_right', title: 'Turn Right', description: 'Use R + heading for right turns. Example: R270 = Turn right heading 270' },
    { icon: 'speed', title: 'Speed Control', description: 'Use S + speed for speed changes. Example: S280 = Speed 280 knots' },
    { icon: 'visibility', title: 'Identify Aircraft', description: 'Tap on any aircraft to select it, then issue commands' },
    { icon: 'warning', title: 'Separation', description: 'Maintain minimum 5nm horizontal or 1000ft vertical separation' },
    { icon: 'swap_horiz', title: 'Transfer', description: 'Use CT to transfer aircraft to the next sector' },
    { icon: 'radar', title: 'Radar Tips', description: 'Use + and - to zoom, drag to pan the radar display' },
    { icon: 'lightbulb', title: 'Pro Tip', description: 'Plan ahead! Issue commands early to avoid conflicts' },
];

// Gradient color pairs
const COLOR_PAIRS = [
    ['#667eea', '#764ba2'],
    ['#f093fb', '#f5576c'],
    ['#4facfe', '#00f2fe'],
    ['#43e97b', '#38f9d7'],
    ['#fa709a', '#fee140'],
    ['#a8edea', '#fed6e3'],
    ['#d299c2', '#fef9d7'],
    ['#89f7fe', '#66a6ff'],
    ['#fdcbf1', '#e6dee9'],
];

// Aurora colors
const AURORA_COLORS = [
    '#5e879e', '#8abdd3', '#18c3e8', '#e5b14b', '#e8a473',
    '#e88599', '#d34f98', '#d97ce7', '#bd95ed', '#5e879e'
];

interface GridItem {
    id: number;
    colorPair: [string, string];
    chaosOffset: { x: number; y: number };
    chaosRotation: number;
    driftOffset: { x: number; y: number };
    finalRotation: number;
    isFlashing: boolean;
    showBorder: boolean;
    isRippling: boolean;
}

interface ProcessingViewProps {
    exerciseName: string;
    onComplete: () => void;
}

export function ProcessingView({ exerciseName, onComplete }: ProcessingViewProps) {
    const COLUMNS = 7;
    const ROWS = 5;
    const TOTAL_CELLS = COLUMNS * ROWS;

    // Animation states
    const [isExploded, setIsExploded] = useState(false);
    const [isFinishing, setIsFinishing] = useState(false);
    const [containerScale, setContainerScale] = useState(0.3);
    const [containerOpacity, setContainerOpacity] = useState(0);

    // Aurora border state
    const [showAuroraBorder, setShowAuroraBorder] = useState(false);
    const [auroraOpacity, setAuroraOpacity] = useState(0);
    const [auroraRotation, setAuroraRotation] = useState(0);

    // Progress state
    const [progress, setProgress] = useState(0);

    // Tips state
    const [currentTipIndex, setCurrentTipIndex] = useState(0);
    const [tipVisible, setTipVisible] = useState(true);

    // Grid items
    const [gridItems, setGridItems] = useState<GridItem[]>([]);

    // Initialize grid
    useEffect(() => {
        const items: GridItem[] = Array.from({ length: TOTAL_CELLS }, (_, i) => ({
            id: i,
            colorPair: COLOR_PAIRS[i % COLOR_PAIRS.length] as [string, string],
            chaosOffset: {
                x: (Math.random() - 0.5) * 160,
                y: (Math.random() - 0.5) * 160,
            },
            chaosRotation: (Math.random() - 0.5) * 60,
            driftOffset: {
                x: (Math.random() - 0.5) * 60,
                y: (Math.random() - 0.5) * 40,
            },
            finalRotation: (Math.random() - 0.5) * 6,
            isFlashing: false,
            showBorder: false,
            isRippling: false,
        }));
        setGridItems(items);
    }, [TOTAL_CELLS]);

    // Animation sequence (matching Swift timing)
    useEffect(() => {
        // Container appears
        const timeout1 = setTimeout(() => {
            setContainerOpacity(1);
            setContainerScale(1);
        }, 100);

        // Explode to grid at 100ms
        const timeout2 = setTimeout(() => {
            setIsExploded(true);
        }, 100);

        // Start random effects at 200ms
        const effectsInterval = setInterval(() => {
            if (!isFinishing) {
                setGridItems(prev => {
                    const newItems = [...prev];
                    const idx1 = Math.floor(Math.random() * TOTAL_CELLS);
                    const idx2 = Math.floor(Math.random() * TOTAL_CELLS);

                    // Trigger flash effect
                    newItems[idx1] = { ...newItems[idx1], isFlashing: true };
                    setTimeout(() => {
                        setGridItems(p => {
                            const n = [...p];
                            if (n[idx1]) n[idx1] = { ...n[idx1], isFlashing: false };
                            return n;
                        });
                    }, 800);

                    // Trigger border effect
                    if (Math.random() > 0.5) {
                        newItems[idx2] = { ...newItems[idx2], showBorder: true };
                        setTimeout(() => {
                            setGridItems(p => {
                                const n = [...p];
                                if (n[idx2]) n[idx2] = { ...n[idx2], showBorder: false };
                                return n;
                            });
                        }, 1500);
                    }

                    return newItems;
                });
            }
        }, 200);

        // Progress animation (14 seconds)
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) return 100;
                return prev + 0.72; // ~100/140 increments
            });
        }, 100);

        // Aurora border at 12.8s
        const timeout3 = setTimeout(() => {
            setShowAuroraBorder(true);
            setAuroraOpacity(1);

            // Rotate aurora
            let rotation = 0;
            const rotateInterval = setInterval(() => {
                rotation += 3;
                setAuroraRotation(rotation);
            }, 16);

            // Fade out aurora at 14s
            setTimeout(() => {
                setAuroraOpacity(0);
                clearInterval(rotateInterval);
            }, 1500);

            // Hide aurora completely at 14.5s
            setTimeout(() => {
                setShowAuroraBorder(false);
            }, 2000);
        }, 12800);

        // Grid snaps to neat at 13s
        const timeout4 = setTimeout(() => {
            setIsFinishing(true);
            clearInterval(effectsInterval);
        }, 13000);

        // Ripple effect at 14s
        const timeout5 = setTimeout(() => {
            setProgress(100);
            clearInterval(progressInterval);

            // Trigger ripple from center
            const centerCol = Math.floor(COLUMNS / 2);
            const centerRow = Math.floor(ROWS / 2);

            gridItems.forEach((_, index) => {
                const col = index % COLUMNS;
                const row = Math.floor(index / COLUMNS);
                const distance = Math.sqrt(
                    Math.pow(col - centerCol, 2) + Math.pow(row - centerRow, 2)
                );
                const delay = distance * 100;

                setTimeout(() => {
                    setGridItems(prev => {
                        const newItems = [...prev];
                        if (newItems[index]) {
                            newItems[index] = { ...newItems[index], isRippling: true };
                        }
                        return newItems;
                    });
                }, delay);
            });
        }, 14000);

        // Complete at 15s
        const timeout6 = setTimeout(() => {
            onComplete();
        }, 15000);

        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
            clearTimeout(timeout3);
            clearTimeout(timeout4);
            clearTimeout(timeout5);
            clearTimeout(timeout6);
            clearInterval(effectsInterval);
            clearInterval(progressInterval);
        };
    }, [onComplete, gridItems.length, TOTAL_CELLS, isFinishing, COLUMNS, ROWS]);

    // Tips rotation
    useEffect(() => {
        const interval = setInterval(() => {
            setTipVisible(false);

            setTimeout(() => {
                setCurrentTipIndex(prev => (prev + 1) % QUICK_TIPS.length);
                setTipVisible(true);
            }, 350);
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    // Calculate cell position
    const getCellStyle = useCallback((item: GridItem, index: number): React.CSSProperties => {
        const col = index % COLUMNS;
        const row = Math.floor(index / COLUMNS);

        let transform = '';
        let opacity = 1;

        if (isFinishing) {
            // Neat grid position
            transform = item.isRippling
                ? 'scale(0.95)'
                : 'scale(1)';
            opacity = item.isRippling ? 0.7 : 1;
        } else if (isExploded) {
            // Exploded with drift
            transform = `translate(${item.driftOffset.x}px, ${item.driftOffset.y}px) rotate(${item.finalRotation}deg)`;
        } else {
            // Chaos state - clustered in center
            transform = `translate(${item.chaosOffset.x}px, ${item.chaosOffset.y}px) rotate(${item.chaosRotation}deg) scale(0.4)`;
        }

        return {
            transform,
            opacity,
            transition: isFinishing
                ? 'all 1s cubic-bezier(0.4, 0, 0.2, 1)'
                : `all 1.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.02}s`,
        };
    }, [isExploded, isFinishing, COLUMNS]);

    const currentTip = QUICK_TIPS[currentTipIndex];

    return (
        <div className="processing-view">
            {/* Particle background */}
            <ParticleSystem count={80} />

            {/* Aurora border effect */}
            {showAuroraBorder && (
                <div
                    className="fixed inset-0 pointer-events-none z-50"
                    style={{ opacity: auroraOpacity, transition: 'opacity 0.3s ease' }}
                >
                    {/* Outer glow */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `conic-gradient(from ${auroraRotation}deg, ${AURORA_COLORS.join(', ')})`,
                            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                            WebkitMaskComposite: 'xor',
                            maskComposite: 'exclude',
                            padding: '8px',
                            filter: 'blur(20px)',
                            opacity: 0.8,
                        }}
                    />
                    {/* Sharp border */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `conic-gradient(from ${auroraRotation}deg, ${AURORA_COLORS.join(', ')})`,
                            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                            WebkitMaskComposite: 'xor',
                            maskComposite: 'exclude',
                            padding: '2px',
                        }}
                    />
                </div>
            )}

            {/* Main content */}
            <div className="flex flex-col items-center justify-center h-full px-10">
                {/* Mosaic grid */}
                <div
                    className="mosaic-grid relative"
                    style={{
                        width: 'min(80vw, 550px)',
                        aspectRatio: '16/10',
                        transform: `scale(${containerScale})`,
                        opacity: containerOpacity,
                        transition: 'transform 3.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 1s ease',
                    }}
                >
                    {gridItems.map((item, index) => (
                        <div
                            key={item.id}
                            className={`mosaic-cell relative ${item.isFlashing ? 'flashing' : ''} ${item.showBorder ? 'border-rainbow' : ''} ${item.isRippling ? 'rippling' : ''}`}
                            style={{
                                ...getCellStyle(item, index),
                                background: `linear-gradient(135deg, ${item.colorPair[0]}, ${item.colorPair[1]})`,
                                boxShadow: `0 8px 16px ${item.colorPair[0]}40`,
                            }}
                        >
                            {/* Flash overlay */}
                            {item.isFlashing && (
                                <div className="absolute inset-0 bg-white rounded-xl blur-xl opacity-50" />
                            )}
                        </div>
                    ))}
                </div>

                {/* Spacer */}
                <div className="h-24" />

                {/* Quick tips */}
                <div
                    className="w-full max-w-lg px-10"
                    style={{
                        opacity: isFinishing ? 0 : 1,
                        transition: 'opacity 0.5s ease'
                    }}
                >
                    <QuickTip
                        icon={<MaterialIcon name={currentTip.icon} size={24} />}
                        title={currentTip.title}
                        description={currentTip.description}
                        visible={tipVisible}
                    />
                </div>

                {/* Spacer */}
                <div className="h-12" />

                {/* Progress bar */}
                <div
                    style={{
                        opacity: isFinishing ? 0 : 1,
                        transition: 'opacity 0.5s ease'
                    }}
                >
                    <ProgressBar
                        progress={progress}
                        label={`Preparing ${exerciseName}`}
                    />
                </div>
            </div>
        </div>
    );
}

export default ProcessingView;
