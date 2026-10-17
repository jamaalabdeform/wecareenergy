import type { Segment } from "./services";

/**
 * FAQ — contenu volontairement prudent, réutilisé pour le schema FAQPage.
 * Toute réponse touchant à la réglementation est marquée `legalReview`
 * (TODO_WCE_VALIDATION : relecture juridique avant production).
 */
export interface FaqItem {
  q: string;
  a: string;
  legalReview?: boolean;
  /** Profils concernés (toutes les pages si absent). */
  for?: Segment[];
}

export const faqFor = (segment?: Segment) => (segment ? faq.filter((f) => !f.for || f.for.includes(segment)) : faq);

export const faq: FaqItem[] = [
  {
    q: "Le changement de fournisseur risque-t-il de couper mon électricité ou mon gaz ?",
    for: ["particulier"],
    a: "Non. Le réseau (Enedis, GRDF ou l’entreprise locale de distribution) et le compteur restent les mêmes, quel que soit le fournisseur : seul le contrat change. Le nouveau fournisseur se charge de la résiliation de l’ancien contrat.",
    legalReview: true,
  },
  {
    q: "Le service est-il payant ?",
    a: "Non, la comparaison et l’accompagnement ne vous sont pas facturés. WE CARE ÉNERGIE est un courtier : nous sommes rémunérés par les fournisseurs partenaires lorsqu’un contrat est signé grâce à notre mise en relation.",
  },
  {
    q: "Suis-je engagé si je remplis la fiche ?",
    a: "Non. Remplir la fiche ou demander un rappel ne vous engage à rien. Si vous souscrivez ensuite un contrat à distance, vous disposez d’un délai de rétractation de 14 jours.",
    legalReview: true,
  },
  {
    q: "Comparez-vous toutes les offres du marché ?",
    for: ["particulier"],
    a: "Nous comparons les offres des fournisseurs avec lesquels nous travaillons. Pour une vue indépendante de l’ensemble du marché, le médiateur national de l’énergie propose un comparateur officiel sur energie-info.fr.",
    legalReview: true,
  },
  {
    q: "Pouvez-vous m’accompagner pour des panneaux photovoltaïques ?",
    for: ["particulier", "professionnel"],
    a: "Oui. Lors de l’échange, nous regardons avec vous si une installation est pertinente pour votre logement ou vos bâtiments, et quelles en seraient les étapes.",
  },
  {
    q: "Dans quelle zone intervenez-vous ?",
    a: "Partout en France : la comparaison et le changement de fournisseur se font à distance, par téléphone et en ligne.",
  },
  {
    q: "Mon contrat d’entreprise est encore engagé : pouvez-vous m’aider ?",
    for: ["professionnel", "collectivite"],
    a: "Oui. Nous notons la date d’échéance de votre contrat et préparons la suite pour que vous puissiez décider au bon moment, sans pénalité de résiliation anticipée.",
    legalReview: true,
  },
];
