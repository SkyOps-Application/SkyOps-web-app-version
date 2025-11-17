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
      aircraft: state.aircraft.map(ac => 
        ac.id === aircraft.id ? aircraft : ac
      )
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
        return update || ac;
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

