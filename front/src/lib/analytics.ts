// src/lib/analytics.ts
export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>
) {
  if (!window.gtag) return;
  window.gtag("event", eventName, params);
}
