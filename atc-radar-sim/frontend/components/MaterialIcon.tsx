/**
 * Material Symbol Icon Component
 * Uses Google Material Symbols font
 */

'use client';

import React from 'react';

interface MaterialIconProps {
    name: string;
    size?: number;
    filled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

export function MaterialIcon({
    name,
    size = 24,
    filled = false,
    className = '',
    style
}: MaterialIconProps) {
    return (
        <span
            className={`material-symbols-outlined ${className}`}
            style={{
                fontSize: size,
                fontVariationSettings: filled ? "'FILL' 1" : "'FILL' 0",
                ...style
            }}
        >
            {name}
        </span>
    );
}

// Common icon mappings for the app
export const Icons = {
    // Navigation & Actions
    back: 'arrow_back',
    forward: 'arrow_forward',
    close: 'close',
    menu: 'menu',
    settings: 'settings',
    search: 'search',

    // Aviation
    flight: 'flight',
    flightTakeoff: 'flight_takeoff',
    flightLand: 'flight_land',
    radar: 'radar',

    // Training & Learning
    school: 'school',
    book: 'menu_book',
    tutorial: 'school',
    lightbulb: 'lightbulb',

    // Info & Status
    info: 'info',
    warning: 'warning',
    error: 'error',
    check: 'check_circle',

    // Controls
    play: 'play_arrow',
    pause: 'pause',
    speed: 'speed',
    scope: 'radar',

    // Directions
    turnLeft: 'turn_left',
    turnRight: 'turn_right',
    arrowUp: 'arrow_upward',
    arrowDown: 'arrow_downward',
    swap: 'swap_horiz',

    // Other
    person: 'person',
    list: 'format_list_numbered',
    map: 'map',
    rotate: 'autorenew',
    zoom: 'zoom_in',
    transfer: 'swap_horiz',

    // Dashboard
    startTraining: 'flight_takeoff',
    notebook: 'menu_book',
    about: 'info',
} as const;

export default MaterialIcon;
