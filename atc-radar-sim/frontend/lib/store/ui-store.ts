/**
 * Zustand store for UI state
 */

import { create } from 'zustand';

interface RadarSettings {
  center: { latitude: number; longitude: number };
  zoom: number;
  showGrid: boolean;
  showWaypoints: boolean;
  showRoutes: boolean;
  showTrails: boolean;
  showVectors: boolean;
}

interface UIStore {
  radarSettings: RadarSettings;
  
  // Panel visibility
  commandPanelOpen: boolean;
  aircraftListOpen: boolean;
  settingsPanelOpen: boolean;
  
  // Actions
  setRadarCenter: (center: { latitude: number; longitude: number }) => void;
  setZoom: (zoom: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  toggleGrid: () => void;
  toggleWaypoints: () => void;
  toggleRoutes: () => void;
  toggleTrails: () => void;
  toggleVectors: () => void;
  
  toggleCommandPanel: () => void;
  toggleAircraftList: () => void;
  toggleSettingsPanel: () => void;
}

// Center on the exercise area (internal 2D coordinates)
// TSH is at (0,0), main area extends to PLK/DAN
const DEFAULT_CENTER = { latitude: 100, longitude: 50 };

export const useUIStore = create<UIStore>((set) => ({
  radarSettings: {
    center: DEFAULT_CENTER,
    zoom: 1.2, // Adjusted zoom for 2D coordinate system
    showGrid: true,
    showWaypoints: true,
    showRoutes: true,
    showTrails: true,
    showVectors: true,
  },
  
  commandPanelOpen: true,
  aircraftListOpen: true,
  settingsPanelOpen: false,
  
  setRadarCenter: (center) =>
    set((state) => ({
      radarSettings: { ...state.radarSettings, center },
    })),
  
  setZoom: (zoom) =>
    set((state) => ({
      radarSettings: { ...state.radarSettings, zoom: Math.max(0.5, Math.min(4.0, zoom)) },
    })),
  
  zoomIn: () =>
    set((state) => ({
      radarSettings: { ...state.radarSettings, zoom: Math.min(4.0, state.radarSettings.zoom + 0.1) },
    })),
  
  zoomOut: () =>
    set((state) => ({
      radarSettings: { ...state.radarSettings, zoom: Math.max(0.5, state.radarSettings.zoom - 0.1) },
    })),
  
  toggleGrid: () =>
    set((state) => ({
      radarSettings: { ...state.radarSettings, showGrid: !state.radarSettings.showGrid },
    })),
  
  toggleWaypoints: () =>
    set((state) => ({
      radarSettings: { ...state.radarSettings, showWaypoints: !state.radarSettings.showWaypoints },
    })),
  
  toggleRoutes: () =>
    set((state) => ({
      radarSettings: { ...state.radarSettings, showRoutes: !state.radarSettings.showRoutes },
    })),
  
  toggleTrails: () =>
    set((state) => ({
      radarSettings: { ...state.radarSettings, showTrails: !state.radarSettings.showTrails },
    })),
  
  toggleVectors: () =>
    set((state) => ({
      radarSettings: { ...state.radarSettings, showVectors: !state.radarSettings.showVectors },
    })),
  
  toggleCommandPanel: () =>
    set((state) => ({ commandPanelOpen: !state.commandPanelOpen })),
  
  toggleAircraftList: () =>
    set((state) => ({ aircraftListOpen: !state.aircraftListOpen })),
  
  toggleSettingsPanel: () =>
    set((state) => ({ settingsPanelOpen: !state.settingsPanelOpen })),
}));

