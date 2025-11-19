/**
 * Zustand store for aircraft state management
 */

import { create } from 'zustand';
import { AircraftData } from '@atc-radar-sim/shared';

interface AircraftStore {
  aircraft: AircraftData[];
  selectedAircraftId: string | null;
  
  // Actions
  addAircraft: (aircraft: AircraftData) => void;
  updateAircraft: (aircraft: AircraftData) => void;
  removeAircraft: (aircraftId: string) => void;
  batchUpdateAircraft: (aircraft: AircraftData[]) => void;
  selectAircraft: (aircraftId: string | null) => void;
  getAircraft: (aircraftId: string) => AircraftData | undefined;
  clearAll: () => void;
}

export const useAircraftStore = create<AircraftStore>((set, get) => ({
  aircraft: [],
  selectedAircraftId: null,
  
  addAircraft: (aircraft) =>
    set((state) => ({
      aircraft: [...state.aircraft, aircraft]
    })),
  
  updateAircraft: (aircraft) =>
    set((state) => ({
      aircraft: state.aircraft.map(ac => {
        if (ac.id === aircraft.id) {
          // If labelRotation is explicitly set in the update, use it (user changed it)
          // Otherwise preserve the existing labelRotation (server update)
          const shouldUseNewRotation = aircraft.labelRotation !== undefined && 
                                        aircraft.labelRotation !== ac.labelRotation;
          return {
            ...aircraft,
            labelRotation: shouldUseNewRotation ? aircraft.labelRotation : ac.labelRotation
          };
        }
        return ac;
      })
    })),
  
  removeAircraft: (aircraftId) =>
    set((state) => ({
      aircraft: state.aircraft.filter(ac => ac.id !== aircraftId)
    })),
  
  batchUpdateAircraft: (aircraftList) =>
    set((state) => {
      const existingIds = new Set(state.aircraft.map(ac => ac.id));
      const updatedAircraft = state.aircraft.map(ac => {
        const update = aircraftList.find(u => u.id === ac.id);
        if (update) {
          // Preserve labelRotation from existing aircraft (user-set UI state)
          return {
            ...update,
            labelRotation: ac.labelRotation !== undefined ? ac.labelRotation : update.labelRotation
          };
        }
        return ac;
      });
      
      // Add new aircraft that don't exist
      const newAircraft = aircraftList.filter(ac => !existingIds.has(ac.id));
      
      return { aircraft: [...updatedAircraft, ...newAircraft] };
    }),
  
  selectAircraft: (aircraftId) =>
    set({ selectedAircraftId: aircraftId }),
  
  getAircraft: (aircraftId) => 
    get().aircraft.find(ac => ac.id === aircraftId),
  
  clearAll: () => set({ aircraft: [], selectedAircraftId: null }),
}));

