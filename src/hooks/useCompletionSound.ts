import { useCallback, useRef, useEffect } from "react";

export const useCompletionSound = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const playCompletionSound = useCallback(() => {
    try {
      // Create audio context on demand (required for user interaction)
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }

      const ctx = audioContextRef.current;
      const now = ctx.currentTime;

      // Create a gentle, pleasant completion chime
      const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5 - major chord

      frequencies.forEach((freq, index) => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(freq, now);

        // Stagger the notes slightly for a pleasant arpeggio effect
        const startTime = now + index * 0.1;
        const duration = 0.8;

        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.15, startTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
      });
    } catch (error) {
      console.log("Audio playback not available:", error);
    }
  }, []);

  return { playCompletionSound };
};
