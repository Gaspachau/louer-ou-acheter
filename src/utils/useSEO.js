import { useEffect } from "react";

const BASE_URL = "https://www.louer-acheter.fr";
const DEFAULT_TITLE = "Louer ou Acheter - Simulateur gratuit 2026";
const DEFAULT_DESC = "Comparez louer et acheter en 2 minutes. Calcul personnalisé selon votre ville, votre budget et votre situation. Gratuit, sans inscription.";
const DEFAULT_OG_IMAGE = "https://www.louer-acheter.fr/og-image.svg";

/**
 * Sets document.title, meta description, canonical, Open Graph, Twitter Card,
 * and optional JSON-LD schema for the current page.
 *
 * @param {object} options
 * @param {string} options.title       - Page title (without site name suffix)
 * @param {string} options.description - Meta description (150-160 chars ideal)
 * @param {string} options.path        - URL path e.g. "/simulateurs/pret-immobilier"
 * @param {string} options.robots      - robots meta content (default "index, follow")
 * @param {string} options.ogImage     - Optional OG image URL override
 * @param {object} options.schema      - Optional JSON-LD schema object to inject
 */
export function useSEO({
  title,
  description,
  path,
  robots = "index, follow",
  ogImage,
  schema,
} = {}) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | louer-acheter.fr`
      : DEFAULT_TITLE;
    document.title = fullTitle;

    const desc = description || DEFAULT_DESC;
    const img = ogImage || DEFAULT_OG_IMAGE;

    setMeta("name", "description", desc);
    setMeta("name", "robots", robots);

    // Open Graph
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", desc);
    setMeta("property", "og:image", img);
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");

    // Twitter Card
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", desc);
    setMeta("name", "twitter:image", img);

    if (path) {
      const canonical = `${BASE_URL}${path}`;
      setMeta("property", "og:url", canonical);
      setCanonical(canonical);
    }

    // Inject JSON-LD schema if provided
    if (schema) {
      const id = "dynamic-schema";
      let el = document.getElementById(id);
      if (!el) {
        el = document.createElement("script");
        el.id = id;
        el.type = "application/ld+json";
        document.head.appendChild(el);
      }
      el.textContent = JSON.stringify(schema);
    }

    // Cleanup schema on unmount
    return () => {
      if (schema) {
        const el = document.getElementById("dynamic-schema");
        if (el) el.remove();
      }
    };
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
