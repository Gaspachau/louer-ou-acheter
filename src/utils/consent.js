// ─── Consent management ──────────────────────────────────────
// Keys stored in localStorage
const DECIDED_KEY = "cookie_consent_v1"; // 'all' | 'none' | 'custom'
const ANALYTICS_KEY = "cookie_analytics_v1"; // 'true' | 'false'

export function getConsent() {
  return {
    decided: !!localStorage.getItem(DECIDED_KEY),
    analytics: localStorage.getItem(ANALYTICS_KEY) === "true",
  };
}

export function acceptAll() {
  localStorage.setItem(DECIDED_KEY, "all");
  localStorage.setItem(ANALYTICS_KEY, "true");
  window.dispatchEvent(new Event("consent_updated"));
}

export function rejectAll() {
  localStorage.setItem(DECIDED_KEY, "none");
  localStorage.setItem(ANALYTICS_KEY, "false");
  window.dispatchEvent(new Event("consent_updated"));
}

export function saveCustom({ analytics }) {
  localStorage.setItem(DECIDED_KEY, "custom");
  localStorage.setItem(ANALYTICS_KEY, analytics ? "true" : "false");
  window.dispatchEvent(new Event("consent_updated"));
}

export function resetConsent() {
  localStorage.removeItem(DECIDED_KEY);
  localStorage.removeItem(ANALYTICS_KEY);
}
