import { useState, useCallback, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ArrowLeft, Bolt } from "lucide-react";
import RedBullCan from "@/components/RedBullCan";
import TimerDisplay from "@/components/TimerDisplay";
import DurationButtons from "@/components/DurationButtons";
import CompletionMessage from "@/components/CompletionMessage";
import { useTimer } from "@/hooks/useTimer";
import { useCompletionSound } from "@/hooks/useCompletionSound";
import { scheduleServerNotification } from "@/lib/push";
import redbullImg from "@/assets/redbull.png";

const PRESET_DURATIONS = [5, 10, 20];

const RedBullTimer = () => {
  const [searchParams] = useSearchParams();
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [isImageReady, setIsImageReady] = useState(false);
  const { playCompletionSound, scheduleCompletionChime, cancelScheduledChimes } = useCompletionSound();

  const handleComplete = useCallback(() => {
    setIsComplete(true);
    playCompletionSound();
  }, [playCompletionSound]);

  const timer = useTimer({ onComplete: handleComplete });

  useEffect(() => {
    const img = new Image();
    img.src = redbullImg;
    if (img.complete) {
      setIsImageReady(true);
    } else {
      const onLoad = () => setIsImageReady(true);
      const onError = () => setIsImageReady(true);
      img.addEventListener("load", onLoad);
      img.addEventListener("error", onError);
      return () => {
        img.removeEventListener("load", onLoad);
        img.removeEventListener("error", onError);
      };
    }
  }, []);

  // Handle URL parameter for duration
  useEffect(() => {
    const timeParam = searchParams.get("time");
    if (timeParam) {
      const duration = parseInt(timeParam, 10);
      if (!isNaN(duration) && duration > 0 && duration <= 120) {
        setSelectedDuration(duration);
        timer.start(duration);
        cancelScheduledChimes();
        scheduleCompletionChime(duration * 60 * 1000);
        scheduleServerNotification({
          id: `redbull-${Date.now()}`,
          fireAt: Date.now() + duration * 60 * 1000,
          title: "Sip Timer",
          body: `Red Bull timer complete`,
          url: window.location.href,
        });
      }
    }
  }, [searchParams]);

  const handleDurationSelect = (duration: number) => {
    setSelectedDuration(duration);
    setIsComplete(false);
    timer.start(duration);
    cancelScheduledChimes();
    scheduleCompletionChime(duration * 60 * 1000);
    scheduleServerNotification({
      id: `redbull-${Date.now()}`,
      fireAt: Date.now() + duration * 60 * 1000,
      title: "Sip Timer",
      body: `Red Bull timer complete`,
      url: window.location.href,
    });
  };

  const handleReset = () => {
    setIsComplete(false);
    setSelectedDuration(null);
    timer.reset();
    cancelScheduledChimes();
  };

  const handleContainerClick = () => {
    if (timer.isRunning && !isComplete) {
      timer.toggle();
    }
  };

  // Reschedule chime on resume; cancel on pause
  useEffect(() => {
    if (!timer.isRunning) {
      cancelScheduledChimes();
      return;
    }
    if (timer.isPaused) {
      cancelScheduledChimes();
    } else {
      cancelScheduledChimes();
      scheduleCompletionChime(timer.timeRemaining);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer.isPaused]);

  return (
    <div 
      className={`min-h-screen bg-redbull-bg transition-colors duration-500 relative overflow-hidden`}
      onClick={handleContainerClick}
    >
      {/* Back navigation */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 z-10 p-3 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <ArrowLeft className="w-5 h-5 text-foreground" />
      </Link>

      {/* Header icon */}
      <div className="absolute top-6 right-6 p-3 rounded-full bg-background/50 backdrop-blur-sm">
        <Bolt className="w-5 h-5 text-redbull-accent" />
      </div>

      {/* Loader overlay while the image is preloading */}
      {!isImageReady && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-background/70 backdrop-blur-sm shadow-lg">
            <div className="w-10 h-10 rounded-full border-2 border-muted-foreground/30 border-t-redbull-accent animate-spin" aria-label="Loading" />
            <span className="text-sm text-muted-foreground">Loading Red Bull…</span>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className={`min-h-screen flex flex-col items-center justify-center px-6 py-12 gap-8 ${!isImageReady ? "opacity-0" : "opacity-100"} transition-opacity`}>
        {/* Can visual */}
        <div className="relative">
          <RedBullCan progress={timer.progress} size={260} />

          {/* Completion overlay */}
          {isComplete && (
            <div onClick={(e) => e.stopPropagation()}>
              <CompletionMessage type="redbull" onReset={handleReset} />
            </div>
          )}
        </div>

        {/* Timer display */}
        <TimerDisplay 
          timeRemaining={timer.timeRemaining}
          isRunning={timer.isRunning}
          isPaused={timer.isPaused}
        />

        {/* Duration buttons */}
        {!timer.isRunning && !isComplete && (
          <div onClick={(e) => e.stopPropagation()}>
            <DurationButtons
              durations={PRESET_DURATIONS}
              selectedDuration={selectedDuration}
              onSelect={handleDurationSelect}
            />
          </div>
        )}

        {/* Restart button when running */}
        {timer.isRunning && !isComplete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleReset();
            }}
            className="text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            Reset timer
          </button>
        )}
      </div>
    </div>
  );
};

export default RedBullTimer;
