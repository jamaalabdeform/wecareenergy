import { offers, offerShown, type Segment } from "./services";

/**
 * Arbre conversationnel Jawabot WE CARE ÉNERGIE.
 *
 * Les questions sont de la configuration pure : le moteur (lib/jawabot/engine.ts)
 * et l'interface (components/jawabot) ne contiennent aucune question en dur.
 * Pour ajouter / retirer une question : modifier ce fichier uniquement.
 *
 * Questions issues de la maquette B2C et de la réunion du 19/07/2026 (fournisseur actuel
 * + « Autre », créneau de rappel). TODO_WCE_VALIDATION : arbre et liste des fournisseurs
 * à relire avec Jamel MER.
 */

export interface ChoiceOption {
  value: string;
  label: string;
  /** Message affiché par Jawabot après ce choix (information, pas de promesse). */
  reply?: string;
}

interface BaseStep {
  id: string;
  question: string;
  help?: string;
  /** La question n'est posée que si la condition est vraie. */
  when?: (answers: Answers) => boolean;
  /** Libellé court utilisé dans le récapitulatif et le résumé du conseiller. */
  summaryLabel: string;
}

export interface ChoiceStep extends BaseStep {
  type: "choice";
  options: ChoiceOption[];
}

export interface TextStep extends BaseStep {
  type: "text";
  placeholder?: string;
  optional?: boolean;
  maxLength?: number;
  autoComplete?: string;
}

export interface PostalStep extends BaseStep {
  type: "postal";
}

export interface ContactStep extends BaseStep {
  type: "contact";
  /** Demander la fonction (B2B). */
  askRole?: boolean;
  /** Demander le nom de la structure s'il n'a pas déjà été saisi. */
  emailRequired?: boolean;
}

export type Step = ChoiceStep | TextStep | PostalStep | ContactStep;
export type Answers = Record<string, string>;

export const jawabotCopy = {
  name: "Jawabot",
  title: "WE CARE ÉNERGIE • Assistant",
  launcher: "Comparer mes offres",
  greeting: "Bonjour,",
  intro: "Je vais vous poser quelques questions pour préparer votre comparatif.",
  segmentQuestion: "Votre demande concerne :",
  humanNote: "Un conseiller WE CARE ÉNERGIE reprend ensuite personnellement votre demande.",
  disclaimer:
    "Cette fiche prépare votre demande : elle ne vaut ni offre ni engagement. WE CARE ÉNERGIE est un courtier rémunéré par les fournisseurs partenaires.",
  successTitle: "Merci, votre fiche est transmise.",
  successText: "Un conseiller WE CARE ÉNERGIE a reçu votre fiche et vous rappelle sous 24 h.",
  errorText: "Votre demande n’a pas pu être envoyée. Réessayez dans un instant",
} as const;

export const segmentChoices: { value: Segment; label: string }[] = [
  { value: "particulier", label: "Particulier : mon logement" },
  { value: "professionnel", label: "Professionnel : mon entreprise" },
  { value: "collectivite", label: "Collectivité : ma structure publique" },
];

const contactPreference: ChoiceStep = {
  id: "contact_preference",
  type: "choice",
  summaryLabel: "Suite souhaitée",
  question: "Pour la suite, vous préférez :",
  options: [
    { value: "rappel", label: "Être rappelé" },
    { value: "email", label: "Recevoir le comparatif par e-mail" },
    { value: "whatsapp", label: "Échanger sur WhatsApp" },
  ],
};

/**
 * Fournisseur actuel (décision du 19/07 : principaux fournisseurs + « Autre »).
 * Liste des principaux fournisseurs du marché français, à ajuster avec Jamel MER.
 */
const fournisseurs: ChoiceOption[] = [
  { value: "edf", label: "EDF" },
  { value: "engie", label: "Engie" },
  { value: "totalenergies", label: "TotalEnergies" },
  { value: "eni", label: "Eni / Plenitude" },
  { value: "ekwateur", label: "ekWateur" },
  { value: "octopus", label: "Octopus Energy" },
  { value: "mint", label: "Mint Énergie" },
  { value: "vattenfall", label: "Vattenfall" },
  { value: "autre", label: "Autre fournisseur" },
  { value: "ne_sait_pas", label: "Je ne sais pas" },
];

const fournisseurAutre = (id: string, when: (a: Answers) => boolean): TextStep => ({
  id: `${id}_autre`,
  type: "text",
  summaryLabel: "Autre fournisseur",
  question: "Quel est votre fournisseur ?",
  placeholder: "Nom du fournisseur",
  maxLength: 80,
  optional: true,
  when,
});

/** Le comparatif de fournisseur concerne la demande (et pas seulement le photovoltaïque). */
const wantsSupply = (a: Answers) => a.projet !== "photovoltaique" && a.projet !== "pac";
const wantsInstall = (a: Answers) => a.projet === "photovoltaique" || a.projet === "pac" || a.projet === "plusieurs";

const flows: Record<Segment, Step[]> = {
  particulier: [
    {
      id: "projet",
      type: "choice",
      summaryLabel: "Demande",
      question: "Que souhaitez-vous ?",
      options: [
        { value: "facture", label: "Réduire ma facture d’électricité ou de gaz" },
        { value: "photovoltaique", label: "Installer des panneaux photovoltaïques" },
        ...(offerShown(offers.pac) ? [{ value: "pac", label: "Installer une pompe à chaleur" }] : []),
        { value: "plusieurs", label: "Plusieurs de ces sujets" },
      ],
    },
    {
      id: "energie",
      type: "choice",
      summaryLabel: "Énergie",
      question: "Quelle énergie utilisez-vous ?",
      when: wantsSupply,
      options: [
        { value: "electricite", label: "Électricité" },
        { value: "gaz", label: "Gaz" },
        { value: "les_deux", label: "Électricité et gaz" },
      ],
    },
    {
      id: "fournisseur",
      type: "choice",
      summaryLabel: "Fournisseur actuel",
      question: "Quel est votre fournisseur actuel ?",
      help: "Il figure en haut de votre facture.",
      when: wantsSupply,
      options: fournisseurs,
    },
    fournisseurAutre("fournisseur", (a) => wantsSupply(a) && a.fournisseur === "autre"),
    {
      id: "facture",
      type: "choice",
      summaryLabel: "Facture mensuelle",
      question: "Combien payez-vous par mois, environ ?",
      help: "Électricité et gaz confondus. Une estimation suffit.",
      options: [
        { value: "moins_60", label: "Moins de 60 €" },
        { value: "60_120", label: "De 60 à 120 €" },
        { value: "120_200", label: "De 120 à 200 €" },
        { value: "plus_200", label: "Plus de 200 €" },
        { value: "ne_sait_pas", label: "Je ne sais pas" },
      ],
    },
    {
      id: "logement",
      type: "choice",
      summaryLabel: "Logement",
      question: "Quel type de logement ?",
      options: [
        { value: "maison", label: "Maison" },
        { value: "appartement", label: "Appartement" },
        { value: "autre", label: "Autre" },
      ],
    },
    {
      id: "statut",
      type: "choice",
      summaryLabel: "Statut",
      question: "Vous êtes :",
      when: wantsInstall,
      options: [
        { value: "proprietaire", label: "Propriétaire" },
        {
          value: "locataire",
          label: "Locataire",
          reply: "Une installation sur le logement demande l’accord du propriétaire : nous en parlerons lors de l’échange. Le comparatif d’offres, lui, vous concerne directement.",
        },
      ],
    },
    {
      id: "code_postal",
      type: "postal",
      summaryLabel: "Code postal",
      question: "Où se situe le logement ?",
      help: "Le code postal suffit : les offres peuvent varier selon la zone.",
    },
    contactPreference,
    {
      id: "contact",
      type: "contact",
      summaryLabel: "Coordonnées",
      question: "Dernière étape : comment pouvons-nous vous joindre ?",
    },
  ],

  professionnel: [
    {
      id: "besoin",
      type: "choice",
      summaryLabel: "Besoin",
      question: "Quel est votre besoin principal ?",
      options: [
        { value: "contrats", label: "Mes contrats d’électricité et de gaz" },
        { value: "photovoltaique", label: "Photovoltaïque sur mes bâtiments" },
        { value: "plusieurs", label: "Les deux" },
      ],
    },
    {
      id: "societe",
      type: "text",
      summaryLabel: "Société",
      question: "Quel est le nom de votre société ?",
      placeholder: "Nom de l’entreprise",
      autoComplete: "organization",
      maxLength: 120,
    },
    {
      id: "secteur",
      type: "choice",
      summaryLabel: "Secteur",
      question: "Dans quel secteur ?",
      options: [
        { value: "commerce", label: "Commerce / restauration" },
        { value: "tertiaire", label: "Bureaux / services" },
        { value: "industrie", label: "Industrie / artisanat" },
        { value: "agricole", label: "Agricole" },
        { value: "sante_social", label: "Santé / médico-social" },
        { value: "autre", label: "Autre" },
      ],
    },
    {
      id: "energie",
      type: "choice",
      summaryLabel: "Énergies",
      question: "Quelles énergies utilisez-vous ?",
      options: [
        { value: "electricite", label: "Électricité" },
        { value: "gaz", label: "Gaz" },
        { value: "les_deux", label: "Électricité et gaz" },
      ],
    },
    {
      id: "fournisseur",
      type: "choice",
      summaryLabel: "Fournisseur actuel",
      question: "Quel est votre fournisseur actuel ?",
      options: fournisseurs,
    },
    fournisseurAutre("fournisseur", (a) => a.fournisseur === "autre"),
    {
      id: "sites",
      type: "choice",
      summaryLabel: "Sites",
      question: "Combien de sites sont concernés ?",
      options: [
        { value: "un", label: "Un seul" },
        { value: "deux_cinq", label: "De 2 à 5" },
        { value: "plus_cinq", label: "Plus de 5" },
      ],
    },
    {
      id: "echeance",
      type: "choice",
      summaryLabel: "Échéance",
      question: "Quand se termine votre contrat actuel ?",
      options: [
        { value: "moins_3_mois", label: "Dans moins de 3 mois" },
        { value: "3_6_mois", label: "Dans 3 à 6 mois" },
        { value: "6_12_mois", label: "Dans 6 à 12 mois" },
        { value: "plus_12_mois", label: "Dans plus de 12 mois" },
        { value: "inconnue", label: "Je ne sais pas" },
      ],
    },
    {
      id: "interlocuteur",
      type: "choice",
      summaryLabel: "Interlocuteur",
      question: "Vous êtes :",
      options: [
        { value: "dirigeant", label: "Dirigeant(e)" },
        { value: "responsable", label: "Responsable technique / services généraux" },
        { value: "finance", label: "Responsable administratif / financier" },
        { value: "autre", label: "Autre" },
      ],
    },
    {
      id: "code_postal",
      type: "postal",
      summaryLabel: "Code postal",
      question: "Où se situe le site principal ?",
      help: "Code postal du site principal.",
    },
    contactPreference,
    {
      id: "contact",
      type: "contact",
      summaryLabel: "Coordonnées",
      question: "Comment pouvons-nous vous joindre ?",
      askRole: true,
    },
  ],

  collectivite: [
    {
      id: "structure",
      type: "choice",
      summaryLabel: "Structure",
      question: "Quel type de structure ?",
      options: [
        { value: "commune", label: "Commune" },
        { value: "intercommunalite", label: "Intercommunalité" },
        { value: "etablissement_public", label: "Établissement public" },
        { value: "bailleur", label: "Bailleur social" },
        { value: "association", label: "Association" },
        { value: "autre", label: "Autre" },
      ],
    },
    {
      id: "nom_structure",
      type: "text",
      summaryLabel: "Nom de la structure",
      question: "Quel est le nom de votre structure ?",
      placeholder: "Ex. : Mairie de…",
      autoComplete: "organization",
      maxLength: 120,
    },
    {
      id: "contrats",
      type: "choice",
      summaryLabel: "Contrats",
      question: "Quels contrats sont concernés ?",
      options: [
        { value: "electricite", label: "Électricité" },
        { value: "gaz", label: "Gaz" },
        { value: "les_deux", label: "Électricité et gaz" },
        { value: "ne_sait_pas", label: "Je ne sais pas" },
      ],
    },
    {
      id: "echeance",
      type: "choice",
      summaryLabel: "Échéance",
      question: "Quelle est la prochaine échéance ?",
      options: [
        { value: "moins_6_mois", label: "Moins de 6 mois" },
        { value: "6_12_mois", label: "6 à 12 mois" },
        { value: "plus_12_mois", label: "Plus de 12 mois" },
        { value: "inconnue", label: "Je ne sais pas" },
      ],
    },
    {
      id: "volumes",
      type: "text",
      summaryLabel: "Volumes",
      question: "Si vous les connaissez : nombre de sites ou consommation annuelle ?",
      help: "Facultatif — une estimation suffit.",
      placeholder: "Ex. : 12 bâtiments, environ 400 MWh/an",
      optional: true,
      maxLength: 200,
    },
    {
      id: "code_postal",
      type: "postal",
      summaryLabel: "Code postal",
      question: "Code postal de la structure ?",
    },
    contactPreference,
    {
      id: "contact",
      type: "contact",
      summaryLabel: "Interlocuteur",
      question: "Qui est l’interlocuteur pour ce dossier ?",
      askRole: true,
    },
  ],
};

export function getFlow(segment: Segment): Step[] {
  return flows[segment];
}

/** Libellé lisible d'une réponse (pour le récapitulatif et le résumé du conseiller). */
export function answerLabel(step: Step, value: string | undefined): string {
  if (!value) return "—";
  if (step.type === "choice") return step.options.find((o) => o.value === value)?.label ?? value;
  return value;
}
