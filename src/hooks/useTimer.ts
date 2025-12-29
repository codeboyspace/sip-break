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
  const completionTimeoutRef = useRef<number | null>(null);
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

    // Schedule completion independent of animation frames so it works in background/minimized
    if (completionTimeoutRef.current) {
      clearTimeout(completionTimeoutRef.current);
    }
    completionTimeoutRef.current = window.setTimeout(() => {
      if (!hasCompletedRef.current) {
        hasCompletedRef.current = true;
        setIsRunning(false);
        setTimeRemaining(0);
        options.onComplete?.();
      }
    }, durationMs);
  }, []);

  const pause = useCallback(() => {
    if (!isRunning || isPaused) return;
    pausedTimeRef.current = performance.now();
    setIsPaused(true);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (completionTimeoutRef.current) {
      clearTimeout(completionTimeoutRef.current);
      completionTimeoutRef.current = null;
    }
  }, [isRunning, isPaused]);

  const resume = useCallback(() => {
    if (!isRunning || !isPaused) return;
    const pauseDuration = performance.now() - pausedTimeRef.current;
    startTimeRef.current += pauseDuration;
    setIsPaused(false);

    // Recalculate remaining and reschedule completion
    const now = performance.now();
    const elapsed = now - startTimeRef.current;
    const remaining = Math.max(0, totalDuration - elapsed);
    if (completionTimeoutRef.current) {
      clearTimeout(completionTimeoutRef.current);
    }
    completionTimeoutRef.current = window.setTimeout(() => {
      if (!hasCompletedRef.current) {
        hasCompletedRef.current = true;
        setIsRunning(false);
        setTimeRemaining(0);
        options.onComplete?.();
      }
    }, remaining);
  }, [isRunning, isPaused]);

  // When returning to the tab, refresh the displayed remaining time
  useEffect(() => {
    const onVisibility = () => {
      if (document.visibilityState !== "visible") return;
      if (!isRunning) return;
      const now = performance.now();
      const elapsed = now - startTimeRef.current;
      const remaining = Math.max(0, totalDuration - elapsed);
      setTimeRemaining(remaining);
      if (remaining <= 0 && !hasCompletedRef.current) {
        hasCompletedRef.current = true;
        setIsRunning(false);
        options.onComplete?.();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [isRunning, totalDuration, options]);

  const reset = useCallback(() => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeRemaining(0);
    setTotalDuration(0);
    hasCompletedRef.current = false;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (completionTimeoutRef.current) {
      clearTimeout(completionTimeoutRef.current);
      completionTimeoutRef.current = null;
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
