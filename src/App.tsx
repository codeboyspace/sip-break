import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BeverageTimer from "./pages/BeverageTimer";
import MealTimer from "./pages/MealTimer";
import RedBullTimer from "./pages/RedBullTimer";
import NotFound from "./pages/NotFound";
import ThemeProvider from "@/components/ThemeProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tea" element={<BeverageTimer type="tea" />} />
            <Route path="/coffee" element={<BeverageTimer type="coffee" />} />
            <Route path="/water" element={<BeverageTimer type="water" />} />
            <Route path="/meal" element={<MealTimer />} />
            <Route path="/redbull" element={<RedBullTimer />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
