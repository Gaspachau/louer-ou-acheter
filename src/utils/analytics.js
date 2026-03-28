// ─── PostHog analytics — consent-gated ───────────────────────
// Set VITE_POSTHOG_KEY in your .env or Vercel env vars
import posthog from "posthog-js";

const PH_KEY = import.meta.env.VITE_POSTHOG_KEY;
const PH_HOST = import.meta.env.VITE_POSTHOG_HOST || "https://eu.i.posthog.com";

let _initialized = false;

function isAnalyticsAllowed() {
  return localStorage.getItem("cookie_analytics_v1") === "true";
}

export function initAnalytics() {
  if (!PH_KEY || PH_KEY === "phc_REPLACE_ME") return;
  if (_initialized) return;
  if (!isAnalyticsAllowed()) return;

  posthog.init(PH_KEY, {
    api_host: PH_HOST,
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: false, // only manual events — no accidental PII capture
    persistence: "localStorage",
    sanitize_properties: sanitize,
    session_recording: {
      maskAllInputs: false,
      maskInputOptions: { password: true },
    },
  });

  _initialized = true;
}

export function shutdownAnalytics() {
  if (_initialized) {
    posthog.opt_out_capturing();
    _initialized = false;
  }
}

// ─── Core tracking helper ─────────────────────────────────────
export function track(event, props = {}) {
  if (!isAnalyticsAllowed()) return;
  if (!_initialized) initAnalytics();
  if (!_initialized) return; // no key configured
  posthog.capture(event, sanitize(props));
}

// ─── Specific event helpers ───────────────────────────────────

/** Fired when a simulator page mounts (alias kept for SimLayout.jsx) */
export function trackSimulatorOpened(name, path) {
  track("simulator_started", { simulator: name, path });
}

/** Fired when a simulator page mounts */
export function trackSimulatorStarted(name, path) {
  track("simulator_started", { simulator: name, path });
}

/** Fired on unmount with how long the user stayed */
export function trackSimulatorClosed(name, durationSeconds) {
  track("simulator_closed", { simulator: name, duration_seconds: durationSeconds });
}

/** Fired on unmount when user left without completing a full simulation */
export function trackSimulatorAbandoned(name, durationSeconds) {
  track("simulator_abandoned", { simulator: name, duration_seconds: durationSeconds });
}

/** Fired when user has filled all fields and result is computed */
export function trackSimulatorCompleted(name, inputs, results) {
  track("simulator_completed", {
    simulator: name,
    ...sanitize(inputs),
    ...sanitizeResults(results),
  });
}

/** Fired (debounced) when a field value changes */
export function trackFieldChanged(simulator, fieldName, value) {
  track("field_changed", { simulator, field: fieldName, value: roundValue(value) });
}

/** Fired when result panel updates with key output values */
export function trackResultComputed(simulator, results) {
  track("result_computed", { simulator, ...sanitizeResults(results) });
}

/** Fired on landing page when a preset is chosen */
export function trackPresetSelected(presetId, presetName) {
  track("preset_selected", { preset_id: presetId, preset_name: presetName });
}

/** Fired when user starts a custom simulation */
export function trackSimulationStarted(method) {
  track("simulation_started", { method }); // method: 'preset' | 'custom'
}

/** Fired when user chooses a city in comparateur */
export function trackCitySelected(city) {
  track("city_selected", { city });
}

/** Fired when user chooses a scenario type in stress test / histoire */
export function trackScenarioSelected(simulator, scenario) {
  track("scenario_selected", { simulator, scenario });
}

/** Page view for non-simulator pages */
export function trackPageView(page) {
  track("page_viewed", { page });
}

// ─── Utilities ────────────────────────────────────────────────

/** Round numeric values to 2 significant figures for anonymization */
function roundValue(v) {
  if (typeof v !== "number" || !isFinite(v)) return v;
  if (v === 0) return 0;
  const magnitude = Math.pow(10, Math.floor(Math.log10(Math.abs(v))) - 1);
  return Math.round(v / magnitude) * magnitude;
}

/** Strip any accidental string PII from event props */
function sanitize(props) {
  if (!props || typeof props !== "object") return props;
  const out = {};
  for (const [k, v] of Object.entries(props)) {
    if (typeof v === "string" && v.length > 100) continue; // skip long strings
    if (typeof v === "number") out[k] = roundValue(v);
    else out[k] = v;
  }
  return out;
}

function sanitizeResults(results) {
  const safe = {};
  for (const [k, v] of Object.entries(results)) {
    if (typeof v === "number") safe[`result_${k}`] = roundValue(v);
    else if (typeof v === "string" || typeof v === "boolean") safe[`result_${k}`] = v;
  }
  return safe;
}
