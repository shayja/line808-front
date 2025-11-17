// src/hooks/useGAPageTracking.ts
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

// Type the window.gtag function
declare global {
  interface Window {
    gtag?: (
      command: "config" | "event" | "js",
      targetIdOrEventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

export function useGAPageTracking() {
  const location = useLocation();

  useEffect(() => {
    if (!window.gtag || !GA_MEASUREMENT_ID) return;

    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: location.pathname + location.search,
    });
  }, [location]);
}
