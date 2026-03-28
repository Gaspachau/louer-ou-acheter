// ─── useSimTracker ────────────────────────────────────────────
// Tracks simulator open/close (with time spent) and field changes
// Usage:
//   const { trackField } = useSimTracker("Prêt immobilier");
//   <Field onChange={(v) => { set("prix")(v); trackField("prix", v); }} />

import { useEffect, useRef, useCallback } from "react";
import { trackSimulatorOpened, trackSimulatorClosed, trackFieldChanged } from "./analytics";

const DEBOUNCE_MS = 1500;

export function useSimTracker(simulatorName) {
  const openedAt = useRef(Date.now());
  const timers = useRef({});

  useEffect(() => {
    trackSimulatorOpened(simulatorName, window.location.pathname);
    openedAt.current = Date.now();

    return () => {
      const seconds = Math.round((Date.now() - openedAt.current) / 1000);
      trackSimulatorClosed(simulatorName, seconds);
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

  return { trackField };
}
