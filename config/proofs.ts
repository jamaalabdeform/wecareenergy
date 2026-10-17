import { company } from "./company";
import { positioning } from "./positioning";
import { confirmed, pending, type Validated } from "./validation";

/**
 * Section « Pourquoi WE CARE ÉNERGIE ? ».
 * Engagements = formulations de méthode (pas de chiffres, pas de labels).
 * Preuves chiffrées / labels = uniquement après validation (masqués en production sinon).
 */

export const commitments = [
  { title: positioning.reactivite.title, text: positioning.reactivite.text },
  { title: positioning.gestion.title, text: positioning.gestion.text },
  {
    title: "Un courtier qui dit comment il est payé",
    text: company.brokerNotice.value ?? "",
  },
  {
    title: "Des réponses honnêtes",
    text: "Pas d’économie promise à l’aveugle : le comparatif part de votre consommation réelle. Si votre contrat actuel reste le meilleur choix, nous vous le disons.",
  },
] as const;

export interface ProofItem {
  id: string;
  label: string;
  data: Validated<string>;
  /** Détail affiché sous le texte une fois confirmé. */
  items?: string[];
}

/** Preuves à obtenir du client — rendues uniquement lorsqu'elles sont confirmées. */
export const proofs: ProofItem[] = [
  {
    id: "avis",
    label: "Avis clients",
    data: pending("Avis vérifiables (fiche Google Business ou plateforme d'avis) : nombre, note moyenne, lien"),
  },
  {
    id: "fournisseurs",
    label: "Fournisseurs partenaires",
    data: pending("Liste des fournisseurs partenaires publiable (et accord de chacun pour citer son nom)"),
  },
  {
    id: "photovoltaique",
    label: "Installations photovoltaïques",
    data: pending("Qui installe ? Entreprise partenaire qualifiée RGE (QualiPV) ? Assurance décennale ? Chantiers documentés avec autorisation"),
  },
  {
    id: "mediateur",
    label: "Un recours indépendant",
    data: confirmed(
      "En cas de litige avec un fournisseur, le médiateur national de l’énergie peut être saisi gratuitement. Son comparateur d’offres officiel est disponible sur energie-info.fr.",
      "Maquette de landing B2C (renvoi vers le médiateur national de l’énergie)",
    ),
  },
];

export const legalCreation = company.legal.rcs.value && company.legal.siren.value
  ? confirmed(`Société immatriculée au ${company.legal.rcs.value} — SIREN ${company.legal.siren.value}`, "Fiche légale publique")
  : pending<string>("Immatriculation (RCS + SIREN)");
