/**
 * Audio manager for sound effects
 */

import { Howl } from 'howler';

class AudioManager {
  private sounds: Map<string, Howl> = new Map();
  private enabled = true;
  
  constructor() {
    this.loadSounds();
  }
  
  private loadSounds() {
    // Confirmation sound
    this.sounds.set('confirmation', new Howl({
      src: ['/sounds/ting.mp3'],
      volume: 0.5,
      preload: true,
    }));
    
    // Error sound
    this.sounds.set('error', new Howl({
      src: ['/sounds/error.mp3'],
      volume: 0.5,
      preload: true,
    }));
    
    // Alert sound
    this.sounds.set('alert', new Howl({
      src: ['/sounds/alert.mp3'],
      volume: 0.7,
      preload: true,
      loop: false,
    }));
    
    // Separation warning
    this.sounds.set('warning', new Howl({
      src: ['/sounds/warning.mp3'],
      volume: 0.6,
      preload: true,
    }));
  }
  
  play(soundName: string) {
    if (!this.enabled) return;
    
    const sound = this.sounds.get(soundName);
    if (sound) {
      sound.play();
    }
  }
  
  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }
  
  setVolume(soundName: string, volume: number) {
    const sound = this.sounds.get(soundName);
    if (sound) {
      sound.volume(Math.max(0, Math.min(1, volume)));
    }
  }
  
  stopAll() {
    this.sounds.forEach((sound) => sound.stop());
  }
}

// Singleton instance
export const audioManager = new AudioManager();

