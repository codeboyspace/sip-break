import { Link } from "react-router-dom";
import { Coffee, Droplets, Leaf, Utensils, Bolt, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ThemeToggle from "@/components/ThemeToggle";
import BackgroundCurves from "@/components/BackgroundCurves";

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
  {
    id: "meal",
    name: "Meal",
    description: "Mindful meal timing",
    icon: Utensils,
    bgClass: "bg-meal-bg hover:bg-meal-accent/10",
    iconClass: "text-meal-accent",
  },
  {
    id: "redbull",
    name: "Red Bull",
    description: "Energy break",
    icon: Bolt,
    bgClass: "bg-redbull-bg hover:bg-redbull-accent/10",
    iconClass: "text-redbull-accent",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12 relative">
      <BackgroundCurves />
      {/* About button top-right */}
      <div className="absolute top-6 right-6 flex items-center gap-3">
        <ThemeToggle />
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" className="gap-2">
              <Info className="w-4 h-4" />
              About
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-xl md:max-w-2xl p-8">
            <DialogHeader>
              <DialogTitle className="font-display text-3xl">Sip Timer</DialogTitle>
              <DialogDescription className="mt-2 text-base leading-relaxed">
                I built Sip Timer for fun and out of personal curiosity a small experiment in mindful breaks.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-6 border-t pt-6">
              <p className="font-curvy text-xl text-foreground/90">
                — Surya Alexplato
              </p>
              <a
                href="https://github.com/codeboyspace"
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
              >
                github.com/codeboyspace
              </a>
            </div>
          </DialogContent>
        </Dialog>
      </div>
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
