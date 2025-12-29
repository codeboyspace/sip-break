interface TimerDisplayProps {
  timeRemaining: number;
  isRunning: boolean;
  isPaused: boolean;
}

const TimerDisplay = ({ timeRemaining, isRunning, isPaused }: TimerDisplayProps) => {
  const minutes = Math.floor(timeRemaining / 60000);
  const seconds = Math.floor((timeRemaining % 60000) / 1000);

  const formatTime = (value: number) => value.toString().padStart(2, "0");

  return (
    <div className="text-center space-y-2">
      <div className="font-display text-6xl md:text-7xl tracking-tight text-foreground tabular-nums">
        {formatTime(minutes)}:{formatTime(seconds)}
      </div>
      {isRunning && (
        <p className={`text-muted-foreground text-sm transition-opacity ${isPaused ? "animate-gentle-pulse" : ""}`}>
          {isPaused ? "Paused — tap to resume" : "Tap anywhere to pause"}
        </p>
      )}
    </div>
  );
};

export default TimerDisplay;
