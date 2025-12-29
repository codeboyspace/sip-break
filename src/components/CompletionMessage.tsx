import { Coffee, Droplets, Leaf, Utensils, Bolt } from "lucide-react";

interface CompletionMessageProps {
  type: "tea" | "coffee" | "water" | "meal" | "redbull";
  onReset: () => void;
}

const CompletionMessage = ({ type, onReset }: CompletionMessageProps) => {
  const config = {
    tea: {
      icon: Leaf,
      message: "Break complete",
      subtitle: "Time to get back to it",
    },
    coffee: {
      icon: Coffee,
      message: "Break complete",
      subtitle: "Feeling refreshed?",
    },
    water: {
      icon: Droplets,
      message: "Break complete",
      subtitle: "Stay hydrated",
    },
    meal: {
      icon: Utensils,
      message: "Meal timer done",
      subtitle: "Hope that was delicious",
    },
    redbull: {
      icon: Bolt,
      message: "Energy break done",
      subtitle: "Feel the boost",
    },
  };

  const { icon: Icon, message, subtitle } = config[type];

  return (
    <div className="completion-overlay">
      <div className="text-center space-y-4 p-8">
        <div className="animate-float inline-block">
          <Icon className="w-12 h-12 text-primary mx-auto" strokeWidth={1.5} />
        </div>
        <div>
          <h2 className="font-display text-3xl text-foreground">{message}</h2>
          <p className="text-muted-foreground mt-1">{subtitle}</p>
        </div>
        <button
          onClick={onReset}
          className="timer-button mt-4"
        >
          Take another break
        </button>
      </div>
    </div>
  );
};

export default CompletionMessage;
