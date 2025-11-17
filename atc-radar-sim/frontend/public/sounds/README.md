# Sound Files

This directory should contain audio files for the ATC simulation.

## Required Sound Files

1. **ting.mp3** - Command confirmation sound
   - Short, pleasant "ting" sound
   - Plays when a command is successfully acknowledged
   - Suggested: Bell or chime sound (1-2 seconds)

2. **error.mp3** - Error notification sound
   - Short, distinctive error sound
   - Plays when a command is invalid or fails
   - Suggested: Buzz or warning beep (1 second)

3. **alert.mp3** - Separation violation alert
   - Urgent alert sound
   - Plays when aircraft violate separation standards
   - Suggested: Alarm or siren (2-3 seconds)

4. **warning.mp3** - Separation warning
   - Warning tone
   - Plays when aircraft are approaching minimum separation
   - Suggested: Cautionary beep or tone (1-2 seconds)

## Where to Get Sound Files

### Free Sound Resources

1. **Freesound.org**
   - https://freesound.org/
   - Creative Commons licensed sounds
   - Search for: "bell", "ting", "error", "alert", "warning"

2. **Mixkit.co**
   - https://mixkit.co/free-sound-effects/
   - Free license for personal and commercial use
   - Categories: UI sounds, alerts, notifications

3. **Zapsplat.com**
   - https://www.zapsplat.com/
   - Free with attribution (check license)
   - Large collection of sound effects

4. **Notification Sounds**
   - https://notificationsounds.com/
   - Free notification sounds
   - Good for confirmation and error sounds

### Recommended Sound Effects

For **ting.mp3** (confirmation):
- "Bell Ding" or "Chime"
- "Success Notification"
- "Positive Beep"

For **error.mp3**:
- "Error Buzz"
- "Negative Beep"
- "Alert Tone"

For **alert.mp3** (separation violation):
- "Alarm"
- "Emergency Alert"
- "Urgent Siren"

For **warning.mp3**:
- "Warning Beep"
- "Caution Tone"
- "Alert Notification"

## Testing Sounds

Once you've added the sound files, test them by:

1. Start the application
2. Issue a valid command → should hear `ting.mp3`
3. Issue an invalid command → should hear `error.mp3`
4. Create a separation violation → should hear `alert.mp3`
5. Get close to violation threshold → should hear `warning.mp3`

## Sound File Requirements

- **Format**: MP3 (recommended) or WAV
- **Duration**: 1-3 seconds (keep them short)
- **Volume**: Normalized (not too loud or quiet)
- **Quality**: 128-192 kbps MP3 is sufficient

## Creating Your Own Sounds

If you want to create custom sounds:

1. **Audacity** (Free audio editor)
   - https://www.audacityteam.org/
   - Record or synthesize sounds
   - Export as MP3

2. **Online Tone Generators**
   - https://www.szynalski.com/tone-generator/
   - Generate simple tones
   - Useful for beeps and alerts

3. **Voice Recording**
   - Record yourself saying "acknowledged", "error", etc.
   - Process with effects for a more electronic sound

## Volume Adjustment

If sounds are too loud or quiet, you can adjust them in the code:

Edit `frontend/lib/audio.ts` and modify the `volume` parameter:

```typescript
this.sounds.set('confirmation', new Howl({
  src: ['/sounds/ting.mp3'],
  volume: 0.5,  // Adjust this (0.0 to 1.0)
  preload: true,
}));
```

## Troubleshooting

### Sounds not playing?

1. Check file names match exactly (case-sensitive)
2. Verify files are in `frontend/public/sounds/`
3. Check browser console for errors
4. Ensure MP3 format is supported by your browser
5. Check browser audio permissions

### Browser Support

All modern browsers support MP3:
- Chrome/Edge: ✅
- Firefox: ✅
- Safari: ✅
- Opera: ✅

---

**Note**: The application will work without sound files, but you'll see errors in the console. Sound effects enhance the training experience but are not required for core functionality.

