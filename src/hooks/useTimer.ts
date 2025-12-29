import { useState, useCallback, useRef, useEffect } from "react";

interface UseTimerOptions {
  onComplete?: () => void;
}

interface UseTimerReturn {
  timeRemaining: number;
  totalDuration: number;
  isRunning: boolean;
  isPaused: boolean;
  progress: number;
  start: (durationMinutes: number) => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  toggle: () => void;
}

export const useTimer = (options: UseTimerOptions = {}): UseTimerReturn => {
  const [totalDuration, setTotalDuration] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const startTimeRef = useRef<number>(0);
  const pausedTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number>(0);
  const hasCompletedRef = useRef(false);

  const tick = useCallback(() => {
    if (!isRunning || isPaused) return;

    const now = performance.now();
    const elapsed = now - startTimeRef.current;
    const remaining = Math.max(0, totalDuration - elapsed);

    setTimeRemaining(remaining);

    if (remaining <= 0 && !hasCompletedRef.current) {
      hasCompletedRef.current = true;
      setIsRunning(false);
      options.onComplete?.();
      return;
    }

    animationFrameRef.current = requestAnimationFrame(tick);
  }, [isRunning, isPaused, totalDuration, options]);

  useEffect(() => {
    if (isRunning && !isPaused) {
      animationFrameRef.current = requestAnimationFrame(tick);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRunning, isPaused, tick]);

  const start = useCallback((durationMinutes: number) => {
    const durationMs = durationMinutes * 60 * 1000;
    setTotalDuration(durationMs);
    setTimeRemaining(durationMs);
    startTimeRef.current = performance.now();
    pausedTimeRef.current = 0;
    hasCompletedRef.current = false;
    setIsRunning(true);
    setIsPaused(false);
  }, []);

  const pause = useCallback(() => {
    if (!isRunning || isPaused) return;
    pausedTimeRef.current = performance.now();
    setIsPaused(true);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, [isRunning, isPaused]);

  const resume = useCallback(() => {
    if (!isRunning || !isPaused) return;
    const pauseDuration = performance.now() - pausedTimeRef.current;
    startTimeRef.current += pauseDuration;
    setIsPaused(false);
  }, [isRunning, isPaused]);

  const reset = useCallback(() => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeRemaining(0);
    setTotalDuration(0);
    hasCompletedRef.current = false;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, []);

  const toggle = useCallback(() => {
    if (isPaused) {
      resume();
    } else if (isRunning) {
      pause();
    }
  }, [isPaused, isRunning, pause, resume]);

  const progress = totalDuration > 0 ? (timeRemaining / totalDuration) * 100 : 100;

  return {
    timeRemaining,
    totalDuration,
    isRunning,
    isPaused,
    progress,
    start,
    pause,
    resume,
    reset,
    toggle,
  };
};
