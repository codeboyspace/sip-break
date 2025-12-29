import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Index from "./pages/Index";
const BeverageTimer = lazy(() => import("./pages/BeverageTimer"));
const MealTimer = lazy(() => import("./pages/MealTimer"));
const RedBullTimer = lazy(() => import("./pages/RedBullTimer"));
const NotFound = lazy(() => import("./pages/NotFound"));
import ThemeProvider from "@/components/ThemeProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/tea" element={<BeverageTimer type="tea" />} />
              <Route path="/coffee" element={<BeverageTimer type="coffee" />} />
              <Route path="/water" element={<BeverageTimer type="water" />} />
              <Route path="/meal" element={<MealTimer />} />
              <Route path="/redbull" element={<RedBullTimer />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
