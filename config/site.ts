import { confirmed } from "./validation";

/**
 * Paramètres du site. L'URL publique vient de NEXT_PUBLIC_SITE_URL
 * (canonical, sitemap, OpenGraph, schema.org).
 */
export const siteDomain = confirmed("wecareenergie.fr", "Domaine affiché sur le visuel publicitaire du client");

// NEXT_PUBLIC_SITE_URL reste prioritaire (préproduction, développement).
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.wecareenergie.fr").replace(/\/$/, "");

export const seo = {
  title: "WE CARE ÉNERGIE — Courtier en électricité, gaz et photovoltaïque",
  titleTemplate: "%s | WE CARE ÉNERGIE",
  description:
    "WE CARE ÉNERGIE, courtier indépendant : un conseiller compare les offres d’électricité et de gaz pour votre logement ou votre entreprise, et vous accompagne sur vos projets photovoltaïques. Sans engagement, partout en France.",
  ogImage: "/og-we-care-energie.jpg",
  locale: "fr_FR",
  themeColor: "#0C2C47",
} as const;
