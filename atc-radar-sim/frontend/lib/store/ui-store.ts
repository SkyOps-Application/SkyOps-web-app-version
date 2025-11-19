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

// Center on TSH (Tan Son Nhat) - WGS84 coordinates
// Vietnam airspace approximately 7-17°N, 103-114°E
const DEFAULT_CENTER = { latitude: 12.5, longitude: 107.5 };

export const useUIStore = create<UIStore>((set) => ({
  radarSettings: {
    center: DEFAULT_CENTER,
    zoom: 1.0, // Adjusted zoom for real coordinates
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
      radarSettings: { ...state.radarSettings, zoom: Math.max(0.5, Math.min(8.0, zoom)) },
    })),
  
  zoomIn: () =>
    set((state) => ({
      radarSettings: { ...state.radarSettings, zoom: Math.min(8.0, state.radarSettings.zoom + 0.05) },
    })),
  
  zoomOut: () =>
    set((state) => ({
      radarSettings: { ...state.radarSettings, zoom: Math.max(0.5, state.radarSettings.zoom - 0.05) },
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

