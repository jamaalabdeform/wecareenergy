import type { Segment } from "@/config/services";
import type { Answers } from "@/config/jawabot";

/**
 * Scoring des leads (partagé client + serveur).
 *
 * TODO_WCE_VALIDATION — status: "pending_validation"
 * Pondérations provisoires. La réunion du 19/07/2026 prévoit un score fondé sur la
 * priorité des fournisseurs (1, 2, 3) gérée dans le CRM MENS : à recalibrer avec
 * Jamel MER puis sur les contrats réellement signés.
 */

export type LeadTemperature = "chaud" | "tiede" | "froid";

export interface LeadScore {
  score: number;
  temperature: LeadTemperature;
  reasons: string[];
}

type Rule = { when: (a: Answers) => boolean; points: number; reason: string };

const common: Rule[] = [
  { when: (a) => !!a.phone, points: 10, reason: "Téléphone fourni" },
  { when: (a) => !!a.email, points: 5, reason: "E-mail fourni" },
  { when: (a) => a.contact_preference === "rappel", points: 10, reason: "Souhaite être rappelé" },
];

const rules: Record<Segment, Rule[]> = {
  particulier: [
    { when: (a) => a.facture === "plus_200", points: 20, reason: "Facture > 200 €/mois" },
    { when: (a) => a.facture === "120_200", points: 15, reason: "Facture 120–200 €/mois" },
    { when: (a) => a.facture === "60_120", points: 8, reason: "Facture 60–120 €/mois" },
    { when: (a) => a.energie === "les_deux", points: 10, reason: "Électricité et gaz" },
    { when: (a) => !!a.fournisseur && a.fournisseur !== "ne_sait_pas", points: 5, reason: "Fournisseur connu" },
    { when: (a) => a.logement === "maison", points: 5, reason: "Maison" },
    { when: (a) => a.projet === "photovoltaique" || a.projet === "pac" || a.projet === "plusieurs", points: 5, reason: "Projet d’installation" },
    { when: (a) => a.statut === "proprietaire", points: 10, reason: "Propriétaire (installation possible)" },
    { when: (a) => a.statut === "locataire", points: -10, reason: "Locataire (installation soumise à accord)" },
  ],
  professionnel: [
    { when: (a) => a.interlocuteur === "dirigeant", points: 15, reason: "Décisionnaire" },
    { when: (a) => a.interlocuteur === "responsable" || a.interlocuteur === "finance", points: 10, reason: "Responsable identifié" },
    { when: (a) => a.echeance === "moins_3_mois", points: 20, reason: "Échéance < 3 mois" },
    { when: (a) => a.echeance === "3_6_mois", points: 15, reason: "Échéance 3–6 mois" },
    { when: (a) => a.echeance === "6_12_mois", points: 8, reason: "Échéance 6–12 mois" },
    { when: (a) => a.sites === "deux_cinq" || a.sites === "plus_cinq", points: 10, reason: "Plusieurs sites" },
    { when: (a) => !!a.societe, points: 5, reason: "Société renseignée" },
  ],
  collectivite: [
    { when: (a) => a.echeance === "moins_6_mois", points: 20, reason: "Échéance < 6 mois" },
    { when: (a) => a.echeance === "6_12_mois", points: 12, reason: "Échéance 6–12 mois" },
    { when: (a) => !!a.volumes, points: 10, reason: "Volumes communiqués" },
    { when: (a) => !!a.nom_structure, points: 10, reason: "Structure identifiée" },
    { when: (a) => !!a.role, points: 5, reason: "Fonction renseignée" },
  ],
};

export function scoreLead(segment: Segment, answers: Answers): LeadScore {
  const applied = [...common, ...rules[segment]].filter((r) => r.when(answers));
  const raw = 25 + applied.reduce((sum, r) => sum + r.points, 0);
  const score = Math.max(0, Math.min(100, raw));
  const temperature: LeadTemperature = score >= 70 ? "chaud" : score >= 45 ? "tiede" : "froid";
  return { score, temperature, reasons: applied.map((r) => `${r.points > 0 ? "+" : ""}${r.points} ${r.reason}`) };
}
