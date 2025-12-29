interface DurationButtonsProps {
  durations: number[];
  selectedDuration: number | null;
  onSelect: (duration: number) => void;
  disabled?: boolean;
}

const DurationButtons = ({ 
  durations, 
  selectedDuration, 
  onSelect, 
  disabled = false 
}: DurationButtonsProps) => {
  return (
    <div className="flex gap-3 justify-center flex-wrap">
      {durations.map((duration) => (
        <button
          key={duration}
          onClick={() => onSelect(duration)}
          disabled={disabled}
          className={`timer-button ${
            selectedDuration === duration ? "timer-button-active" : ""
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {duration} min
        </button>
      ))}
    </div>
  );
};

export default DurationButtons;
