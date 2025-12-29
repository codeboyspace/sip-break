import { useState, useCallback, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import BeverageVessel from "@/components/BeverageVessel";
import TimerDisplay from "@/components/TimerDisplay";
import DurationButtons from "@/components/DurationButtons";
import CompletionMessage from "@/components/CompletionMessage";
import { useTimer } from "@/hooks/useTimer";
import { useCompletionSound } from "@/hooks/useCompletionSound";
import { scheduleServerNotification } from "@/lib/push";

interface BeverageTimerProps {
  type: "tea" | "coffee" | "water";
}

const PRESET_DURATIONS = [3, 5, 10];

const BeverageTimer = ({ type }: BeverageTimerProps) => {
  const [searchParams] = useSearchParams();
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const { playCompletionSound, scheduleCompletionChime, cancelScheduledChimes } = useCompletionSound();

  const handleComplete = useCallback(() => {
    setIsComplete(true);
    playCompletionSound();
  }, [playCompletionSound]);

  const timer = useTimer({ onComplete: handleComplete });

  // Handle URL parameter for duration
  useEffect(() => {
    const timeParam = searchParams.get("time");
    if (timeParam) {
      const duration = parseInt(timeParam, 10);
      if (!isNaN(duration) && duration > 0 && duration <= 60) {
        setSelectedDuration(duration);
        timer.start(duration);
        cancelScheduledChimes();
        scheduleCompletionChime(duration * 60 * 1000);
        scheduleServerNotification({
          id: `bev-${type}-${Date.now()}`,
          fireAt: Date.now() + duration * 60 * 1000,
          title: "Sip Timer",
          body: `${type.charAt(0).toUpperCase() + type.slice(1)} timer complete`,
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
      id: `bev-${type}-${Date.now()}`,
      fireAt: Date.now() + duration * 60 * 1000,
      title: "Sip Timer",
      body: `${type.charAt(0).toUpperCase() + type.slice(1)} timer complete`,
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

  const bgClass = {
    tea: "bg-tea-bg",
    coffee: "bg-coffee-bg",
    water: "bg-water-bg",
  }[type];

  return (
    <div 
      className={`min-h-screen ${bgClass} transition-colors duration-500 relative overflow-hidden`}
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

      {/* Main content */}
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 gap-8">
        {/* Vessel */}
        <div className="relative">
          <BeverageVessel 
            type={type} 
            fillPercentage={timer.progress}
            size={240}
          />
          
          {/* Completion overlay */}
          {isComplete && (
            <div onClick={(e) => e.stopPropagation()}>
              <CompletionMessage type={type} onReset={handleReset} />
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

export default BeverageTimer;
