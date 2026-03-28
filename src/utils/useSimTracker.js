// ─── useSimTracker ────────────────────────────────────────────
// Tracks simulator open/close (with time spent), field changes,
// completion, and abandonment.
// Usage:
//   const { trackField, trackCompleted } = useSimTracker("Prêt immobilier");
//   <Field onChange={(v) => { set(v); trackField("prix", v); }} />
//   // Call trackCompleted(inputs, results) when final result is ready

import { useEffect, useRef, useCallback } from "react";
import {
  trackSimulatorStarted,
  trackSimulatorClosed,
  trackSimulatorAbandoned,
  trackSimulatorCompleted,
  trackFieldChanged,
} from "./analytics";

const DEBOUNCE_MS = 1500;

export function useSimTracker(simulatorName) {
  const openedAt = useRef(Date.now());
  const timers = useRef({});
  const completedRef = useRef(false);

  useEffect(() => {
    trackSimulatorStarted(simulatorName, window.location.pathname);
    openedAt.current = Date.now();
    completedRef.current = false;

    return () => {
      const seconds = Math.round((Date.now() - openedAt.current) / 1000);
      if (completedRef.current) {
        trackSimulatorClosed(simulatorName, seconds);
      } else {
        trackSimulatorAbandoned(simulatorName, seconds);
      }
    };
  }, [simulatorName]);

  const trackField = useCallback(
    (fieldName, value) => {
      clearTimeout(timers.current[fieldName]);
      timers.current[fieldName] = setTimeout(() => {
        trackFieldChanged(simulatorName, fieldName, value);
      }, DEBOUNCE_MS);
    },
    [simulatorName]
  );

  /** Call this once results are fully computed and displayed */
  const trackCompleted = useCallback(
    (inputs = {}, results = {}) => {
      completedRef.current = true;
      trackSimulatorCompleted(simulatorName, inputs, results);
    },
    [simulatorName]
  );

  return { trackField, trackCompleted };
}
