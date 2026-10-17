import { confirmed } from "./validation";

/**
 * Les deux engagements de WE CARE ÉNERGIE (PRODUCT.md), repris du visuel publicitaire
 * validé par le client : « Sans engagement », « Réponse sous 24 h », « On gère tout ».
 * L'allégation « jusqu'à -30 % » n'est volontairement PAS reprise (non étayée, risque DGCCRF).
 */
export const positioning = {
  reactivite: {
    short: "Réponse sous 24 h",
    title: "Un conseiller vous rappelle sous 24 h",
    heroText: "Au moment que vous choisissez, avec un comparatif établi à partir de votre situation.",
    text: "Vous laissez vos coordonnées : un conseiller WE CARE ÉNERGIE vous rappelle sous 24 h, au créneau que vous avez choisi, avec vos réponses sous les yeux.",
    precise: confirmed("Réponse sous 24 h", "Visuel publicitaire validé par le client"),
  },
  gestion: {
    short: "Sans engagement, on gère tout",
    title: "Sans engagement, on gère tout",
    heroText: "Si l’offre vous convient, nous nous occupons des démarches. Le changement de fournisseur se fait sans coupure.",
    text: "Si l’offre vous convient, nous nous occupons des démarches avec le fournisseur. Changer de fournisseur ne coupe jamais votre électricité ni votre gaz : seul le contrat change, le réseau reste le même.",
    precise: confirmed("Sans engagement · On gère tout", "Visuel publicitaire validé par le client"),
  },
} as const;
