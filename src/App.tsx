import React, { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import { useHashScroll } from "@/hooks/use-hash-scroll";
import ErrorBoundary from "@/components/ErrorBoundary";

// The home page ships in the main bundle because it is what almost every
// visitor lands on. Everything else is fetched on demand so a phone on mobile
// data is not paying for pages it may never open.
const AboutPage = lazy(() => import("./pages/AboutPage"));
const EventsPage = lazy(() => import("./pages/EventsPage"));
const GivePage = lazy(() => import("./pages/GivePage"));
const FindUsPage = lazy(() => import("./pages/FindUsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const NewLifePage = lazy(() => import("./pages/NewLifePage"));
const NextStepsPage = lazy(() => import("./pages/NextStepsPage"));

const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

/** Owns hash-link scrolling; must sit inside BrowserRouter to read location. */
const HashScroll = () => {
  useHashScroll();
  return null;
};

/** Holds the viewport height so the header does not jump while a route loads. */
const RouteFallback = () => (
  <div className="min-h-[100svh] bg-background" aria-busy="true" aria-live="polite">
    <span className="sr-only">Loading…</span>
  </div>
);

const App = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ErrorBoundary>
              <HashScroll />
              <Suspense fallback={<RouteFallback />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/events" element={<EventsPage />} />
                  <Route path="/give" element={<GivePage />} />
                  <Route path="/find-us" element={<FindUsPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/new-life" element={<NewLifePage />} />
                  <Route path="/next-steps" element={<NextStepsPage />} />

                  {/* Keep the catch-all last. */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
