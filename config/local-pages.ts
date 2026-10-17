/**
 * Architecture des pages locales (SEO local) — volontairement vide au lancement.
 *
 * Règle : une page locale n'est publiée QUE si elle s'appuie sur du contenu réel
 * (installations réalisées dans la commune, photos, témoignages). Pas de pages générées
 * en masse. Chaque entrée publiée apparaît automatiquement dans le sitemap.
 *
 * WE CARE ÉNERGIE travaille à distance partout en France : pas de page locale prévue.
 * URL : /interventions/[slug]
 */
export interface LocalPage {
  slug: string;
  city: string;
  postalCode: string;
  published: boolean;
  title: string;
  description: string;
  intro: string;
  /** Réalisations réelles documentées dans la zone (obligatoire pour publier). */
  realisations: { title: string; text: string; image?: string }[];
}

export const localPages: LocalPage[] = [];

export const publishedLocalPages = () => localPages.filter((p) => p.published && p.realisations.length > 0);
