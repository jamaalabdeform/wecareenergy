import { parcoursParticulier, parcoursPro, type Segment } from "./services";
import { positioning } from "./positioning";
import type { Validated } from "./validation";

/**
 * Contenu des pages profil, composées comme une fiche d'étude :
 * sommaire (les étapes) puis quatre rubriques A → D.
 *
 * Sources : réunion du 19/07/2026, maquette de landing B2C, présentation MENS (B2B).
 * TODO_WCE_VALIDATION : textes pro / collectivité à relire avec Jamel MER.
 */

export interface Rubrique {
  title: string;
  items: string[];
  /** Précision non encore confirmée (masquée en production). */
  precise?: Validated<string>;
}

export interface Dossier {
  segment: Segment;
  slug: string;
  /** Titre de page (H1). */
  title: string;
  lead: string;
  metaTitle: string;
  metaDescription: string;
  sommaireTitle: string;
  sommaire: readonly { title: string; text: string }[];
  etudions: Rubrique;
  preparez: Rubrique;
  rappel: Rubrique;
  recevez: Rubrique;
}

const rappel: Rubrique = {
  title: "Qui vous rappelle, et quand",
  items: [
    "Un conseiller WE CARE ÉNERGIE reprend votre fiche, avec vos réponses sous les yeux.",
    "Il vous rappelle sous 24 h, au créneau que vous avez choisi.",
    "Vous n’avez pas à tout réexpliquer : l’échange porte directement sur votre situation.",
  ],
  precise: positioning.reactivite.precise,
};

export const dossiers: Record<Segment, Dossier> = {
  particulier: {
    segment: "particulier",
    slug: "particuliers",
    title: "Électricité, gaz, photovoltaïque : payez le juste prix pour votre logement",
    lead: "Décrivez votre logement et votre facture actuelle : un conseiller WE CARE ÉNERGIE compare les offres du marché et vous rappelle sous 24 h. Sans engagement.",
    metaTitle: "Particuliers : comparer vos offres d’électricité et de gaz",
    metaDescription:
      "Un conseiller WE CARE ÉNERGIE compare les offres d’électricité et de gaz pour votre logement et vous rappelle sous 24 h. Changement de fournisseur sans coupure, sans engagement.",
    sommaireTitle: "Les 5 étapes",
    sommaire: parcoursParticulier,
    etudions: {
      title: "Ce que nous comparons",
      items: [
        "Votre consommation d’électricité et de gaz, à partir de votre facture actuelle.",
        "Les offres des fournisseurs avec lesquels nous travaillons, au regard de votre profil.",
        "Si vous le souhaitez : l’intérêt de panneaux photovoltaïques pour produire une partie de votre électricité.",
      ],
    },
    preparez: {
      title: "Ce que vous préparez",
      items: [
        "Votre dernière facture d’électricité ou de gaz : le fournisseur, l’offre et la consommation annuelle y figurent.",
        "Pas de facture sous la main ? Le montant approximatif de votre mensualité suffit pour un premier échange.",
      ],
    },
    rappel,
    recevez: {
      title: "Ce que vous recevez",
      items: [
        "Un comparatif établi à partir de votre consommation réelle, expliqué par téléphone.",
        "Aucune obligation : si votre contrat actuel reste le plus intéressant, nous vous le disons.",
        "Si vous changez, un contrat signé en ligne chez le fournisseur, avec un droit de rétractation de 14 jours.",
      ],
    },
  },
  professionnel: {
    segment: "professionnel",
    slug: "professionnels",
    title: "Les contrats d’énergie de votre entreprise, relus et suivis",
    lead: "Électricité et gaz, un site ou plusieurs : WE CARE ÉNERGIE relit vos contrats, suit leurs échéances et consulte les fournisseurs au bon moment.",
    metaTitle: "Professionnels : contrats d’électricité et de gaz",
    metaDescription:
      "Commerces, bureaux, artisans, industrie : WE CARE ÉNERGIE relit vos contrats d’électricité et de gaz, suit leurs échéances et consulte les fournisseurs pour vous.",
    sommaireTitle: "Les 5 étapes de l’accompagnement",
    sommaire: parcoursPro,
    etudions: {
      title: "Ce que nous étudions",
      items: [
        "Vos contrats d’électricité et de gaz : fournisseur, prix, durée d’engagement, date d’échéance.",
        "Vos consommations et le nombre de sites concernés.",
        "Si c’est pertinent : une installation photovoltaïque sur vos bâtiments.",
      ],
    },
    preparez: {
      title: "Ce que vous préparez",
      items: [
        "Vos dernières factures d’électricité et de gaz.",
        "La date de fin de vos contrats, si vous la connaissez. Un contrat encore engagé plusieurs années peut tout de même être étudié.",
      ],
    },
    rappel,
    recevez: {
      title: "Ce que vous recevez",
      items: [
        "Une lecture claire de vos contrats et de leurs échéances.",
        "Les offres obtenues, avec leurs conditions et leurs limites. Pas d’économie chiffrée avant l’étude de votre dossier.",
        "Un interlocuteur unique, qui vous alerte avant chaque renouvellement.",
      ],
    },
  },
  collectivite: {
    segment: "collectivite",
    slug: "collectivites",
    title: "Les contrats d’énergie de votre collectivité, relus et suivis",
    lead: "Communes, intercommunalités, établissements publics : WE CARE ÉNERGIE analyse vos contrats d’électricité et de gaz, leurs échéances et vos consommations.",
    metaTitle: "Collectivités : contrats d’électricité et de gaz",
    metaDescription:
      "Communes, intercommunalités, établissements publics : analyse de vos contrats d’électricité et de gaz et suivi de leurs échéances par WE CARE ÉNERGIE.",
    sommaireTitle: "Les 5 étapes de l’accompagnement",
    sommaire: parcoursPro,
    etudions: {
      title: "Ce que nous étudions",
      items: [
        "Vos contrats d’électricité et de gaz, et leurs échéances de renouvellement.",
        "Le nombre de sites et les consommations, quand vous les connaissez.",
      ],
    },
    preparez: {
      title: "Ce que vous préparez",
      items: [
        "Vos dernières factures d’électricité et de gaz.",
        "Une estimation du nombre de sites et la date de fin des contrats suffisent pour un premier échange.",
      ],
    },
    rappel: {
      title: "Comment nous échangeons",
      items: [
        "Un conseiller WE CARE ÉNERGIE reprend votre fiche, avec vos réponses sous les yeux.",
        "Les échanges se font par e-mail si vous le préférez : les pièces restent traçables pour vos services.",
        "Vous n’avez pas à tout réexpliquer : l’échange porte directement sur vos contrats.",
      ],
      precise: positioning.reactivite.precise,
    },
    recevez: {
      title: "Ce que vous recevez",
      items: [
        "Une lecture de vos contrats et des pistes identifiées, avec leurs conditions et leurs limites.",
        "Pas d’économie chiffrée avant l’étude de votre dossier.",
        "Un interlocuteur unique, qui vous alerte avant chaque échéance.",
      ],
    },
  },
};

export const dossierHref = (s: Segment) => `/${dossiers[s].slug}`;
