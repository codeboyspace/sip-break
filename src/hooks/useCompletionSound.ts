import { useCallback, useRef, useEffect } from "react";

export const useCompletionSound = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const unlockedRef = useRef(false);
  const scheduledRef = useRef<Array<{ osc: OscillatorNode; gain: GainNode }>>([]);

  const ensureContext = useCallback((): AudioContext => {
    if (!audioContextRef.current) {
      const Ctor = (window as any).AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new Ctor();
    }
    return audioContextRef.current!;
  }, []);

  // Attempt to unlock/resume the AudioContext on first user interaction
  useEffect(() => {
    const unlock = async () => {
      try {
        const ctx = ensureContext();
        if (ctx.state === "suspended") {
          await ctx.resume();
        }
        unlockedRef.current = true;
        window.removeEventListener("pointerdown", unlock);
        window.removeEventListener("keydown", unlock);
        window.removeEventListener("touchstart", unlock);
      } catch {
        // ignore
      }
    };
    window.addEventListener("pointerdown", unlock, { once: false });
    window.addEventListener("keydown", unlock, { once: false });
    window.addEventListener("touchstart", unlock, { once: false });
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, [ensureContext]);

  const playCompletionSound = useCallback(async () => {
    try {
      const ctx = ensureContext();
      if (ctx.state === "suspended") {
        // Attempt resume just in case the unlock didn't fire
        await ctx.resume();
      }

      const now = ctx.currentTime;
      // Pleasant completion chime: C5, E5, G5
      const frequencies = [523.25, 659.25, 783.99];

      frequencies.forEach((freq, index) => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(freq, now);

        const startTime = now + index * 0.1;
        const duration = 0.8;

        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.22, startTime + 0.06);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
      });
    } catch (error) {
      console.log("Audio playback not available:", error);
    }
  }, [ensureContext]);

  const cancelScheduledChimes = useCallback(() => {
    const ctx = audioContextRef.current;
    if (!ctx) {
      scheduledRef.current = [];
      return;
    }
    const now = ctx.currentTime;
    scheduledRef.current.forEach(({ osc, gain }) => {
      try {
        gain.gain.cancelScheduledValues(now);
        gain.gain.setValueAtTime(0, now);
        osc.stop(now);
        osc.disconnect();
        gain.disconnect();
      } catch {
        // ignore
      }
    });
    scheduledRef.current = [];
  }, []);

  const scheduleCompletionChime = useCallback(async (delayMs: number) => {
    const ctx = ensureContext();
    if (ctx.state === "suspended") {
      await ctx.resume();
    }
    const startAt = ctx.currentTime + Math.max(0, delayMs) / 1000;
    const frequencies = [523.25, 659.25, 783.99];

    const scheduled: Array<{ osc: OscillatorNode; gain: GainNode }> = [];
    frequencies.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, startAt);

      const noteStart = startAt + index * 0.1;
      const duration = 0.8;
      gain.gain.setValueAtTime(0, noteStart);
      gain.gain.linearRampToValueAtTime(0.22, noteStart + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.01, noteStart + duration);
      try {
        osc.start(noteStart);
        osc.stop(noteStart + duration);
      } catch {
        // ignore
      }
      scheduled.push({ osc, gain });
    });
    scheduledRef.current.push(...scheduled);
    return () => cancelScheduledChimes();
  }, [ensureContext, cancelScheduledChimes]);

  return { playCompletionSound, scheduleCompletionChime, cancelScheduledChimes };
};
