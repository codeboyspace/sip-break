import { Link } from "react-router-dom";
import { Coffee, Droplets, Leaf } from "lucide-react";

const beverages = [
  {
    id: "tea",
    name: "Tea",
    description: "Warm & calming",
    icon: Leaf,
    bgClass: "bg-tea-bg hover:bg-tea-accent/10",
    iconClass: "text-tea-accent",
  },
  {
    id: "coffee",
    name: "Coffee",
    description: "Rich & energizing",
    icon: Coffee,
    bgClass: "bg-coffee-bg hover:bg-coffee-accent/10",
    iconClass: "text-coffee-accent",
  },
  {
    id: "water",
    name: "Water",
    description: "Fresh & refreshing",
    icon: Droplets,
    bgClass: "bg-water-bg hover:bg-water-accent/10",
    iconClass: "text-water-accent",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12 space-y-4">
        <h1 className="font-display text-5xl md:text-6xl text-foreground tracking-tight">
          Sip Timer
        </h1>
        <p className="text-muted-foreground text-lg max-w-md text-balance">
          Take a mindful break. Watch your beverage slowly drain as you rest.
        </p>
      </div>

      {/* Beverage selection */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-2xl">
        {beverages.map((beverage) => {
          const Icon = beverage.icon;
          return (
            <Link
              key={beverage.id}
              to={`/${beverage.id}`}
              className={`beverage-card ${beverage.bgClass} flex flex-col items-center text-center group`}
            >
              <div className="mb-4 p-4 rounded-full bg-background/60 group-hover:bg-background transition-colors">
                <Icon className={`w-10 h-10 ${beverage.iconClass}`} strokeWidth={1.5} />
              </div>
              <h2 className="font-display text-2xl text-foreground">{beverage.name}</h2>
              <p className="text-muted-foreground text-sm mt-1">{beverage.description}</p>
            </Link>
          );
        })}
      </div>

      {/* Footer hint */}
      <p className="mt-16 text-muted-foreground/60 text-sm text-center">
        Add <code className="bg-muted px-2 py-1 rounded text-xs">?time=5</code> to any URL to start automatically
      </p>
    </div>
  );
};

export default Index;
