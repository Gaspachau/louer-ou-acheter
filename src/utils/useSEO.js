import { useEffect } from "react";

const BASE_URL = "https://www.louer-acheter.fr";
const DEFAULT_TITLE = "Louer ou Acheter en 2026 — Simulateur immobilier gratuit | louer-acheter.fr";
const DEFAULT_DESC = "Simulateur gratuit pour comparer louer et acheter en France. Obtenez votre point d'équilibre exact en 2 minutes : mensualité, patrimoine net, avantage chiffré. Données 2026, 25+ outils, sans inscription.";

/**
 * Sets document.title, meta description, canonical, and robots tags for the current page.
 * Call at the top of each page component.
 */
export function useSEO({ title, description, path, robots = "index, follow" } = {}) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | louer-acheter.fr`
      : DEFAULT_TITLE;
    document.title = fullTitle;

    setMeta("name", "description", description || DEFAULT_DESC);
    setMeta("name", "robots", robots);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description || DEFAULT_DESC);

    if (path) {
      const canonical = `${BASE_URL}${path}`;
      setMeta("property", "og:url", canonical);
      setCanonical(canonical);
    }
  });
}

function setMeta(attr, key, value) {
  if (!value) return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function setCanonical(href) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = href;
}
