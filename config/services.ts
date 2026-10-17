import { anchors } from "./navigation";
import { confirmed, pending, SHOW_PENDING, type Validated } from "./validation";

/**
 * Les 3 parcours commerciaux WE CARE ÉNERGIE. Priorité aux particuliers (canal publicitaire) ;
 * les entreprises et collectivités sont le portefeuille historique suivi par Jamel MER.
 */
export type Segment = "particulier" | "professionnel" | "collectivite";

export type SegmentTone = "brand" | "leaf" | "orange";

/**
 * Classes de la couleur de chaque profil (onglets, filets, repères, liens).
 * Sur l'orange, le texte est foncé (ink) ; en texte sur fond clair, on utilise action-ink.
 */
export const toneClasses = {
  brand: { chip: "bg-brand text-white", rule: "border-brand", text: "text-brand", mark: "bg-brand", accent: "border-l-brand hover:border-l-brand", current: "aria-[current=page]:text-brand aria-[current=page]:decoration-brand", link: "text-brand decoration-brand/40 hover:decoration-brand" },
  leaf: { chip: "bg-leaf text-white", rule: "border-leaf", text: "text-leaf", mark: "bg-leaf", accent: "border-l-leaf hover:border-l-leaf", current: "aria-[current=page]:text-leaf aria-[current=page]:decoration-leaf", link: "text-leaf decoration-leaf/40 hover:decoration-leaf" },
  orange: { chip: "bg-action text-ink", rule: "border-action", text: "text-action-ink", mark: "bg-action", accent: "border-l-action hover:border-l-action", current: "aria-[current=page]:text-action-ink aria-[current=page]:decoration-action", link: "text-action-ink decoration-action hover:decoration-action-ink" },
} as const satisfies Record<SegmentTone, Record<string, string>>;

export interface SegmentDef {
  id: Segment;
  label: string;
  /** Libellé court du choix dans le hero. */
  chooserLabel: string;
  chooserHint: string;
  badge: string;
  /** Couleur de segment : particulier = bleu, pro = vert, collectivité = orange. */
  tone: SegmentTone;
  cta: string;
}

export const segments: Record<Segment, SegmentDef> = {
  particulier: {
    id: "particulier",
    label: "Particulier",
    chooserLabel: "Particulier",
    chooserHint: "Mon logement",
    badge: "Particuliers",
    tone: "brand",
    cta: "Comparer mes offres",
  },
  professionnel: {
    id: "professionnel",
    label: "Professionnel",
    chooserLabel: "Professionnel",
    chooserHint: "Mon entreprise",
    badge: "Pro",
    tone: "leaf",
    cta: "Faire relire mes contrats",
  },
  collectivite: {
    id: "collectivite",
    label: "Collectivité",
    chooserLabel: "Collectivité",
    chooserHint: "Ma structure publique",
    badge: "Collectivités",
    tone: "orange",
    cta: "Optimiser mes contrats",
  },
};

export const segmentOrder: Segment[] = ["particulier", "professionnel", "collectivite"];

/**
 * Offres de WE CARE ÉNERGIE. Une offre non confirmée n'apparaît qu'en préproduction.
 * TODO_WCE_VALIDATION : la pompe à chaleur est probable mais non confirmée par le client.
 */
export const offers = {
  fournisseur: confirmed(true, "Métier de courtier en énergie (contrat, réunion du 19/07/2026)"),
  photovoltaique: confirmed(true, "Indication de l'équipe projet, 17/10/2026"),
  pac: pending<boolean>("Le client propose-t-il aussi les pompes à chaleur ? (« je pense même les PAC », 17/10/2026) — en propre ou via un installateur RGE partenaire ?"),
} satisfies Record<string, Validated<boolean>>;

/** Une offre s'affiche si elle est confirmée, ou en préproduction si elle est à confirmer. */
export const offerShown = (o: Validated<boolean>) => o.status === "confirmed" || SHOW_PENDING;

/** Section « Votre projet » — 3 grandes cartes. */
export interface ProjectCard {
  id: string;
  anchor: string;
  badge: string;
  tone: SegmentDef["tone"];
  title: string;
  text: string;
  points: string[];
  cta: string;
  /** Segment ouvert dans Jawabot au clic. */
  segment: Segment;
  /** Sous-besoin pré-sélectionné dans Jawabot (optionnel). */
  presetNeed?: string;
}

export const segmentTone = (s: Segment) => toneClasses[segments[s].tone];

export const projectCards: ProjectCard[] = [
  {
    id: "particuliers",
    anchor: anchors.particuliers + "-carte",
    badge: "Particuliers",
    tone: "brand",
    title: "Payez le juste prix pour votre électricité et votre gaz",
    text: "Un conseiller compare les offres du marché à partir de votre facture, et vous accompagne si vous souhaitez produire votre propre électricité.",
    points: [
      "Comparatif électricité et gaz",
      "Changement de fournisseur sans coupure",
      "Panneaux photovoltaïques",
      ...(offerShown(offers.pac) ? ["Pompe à chaleur"] : []),
    ],
    cta: "Comparer mes offres",
    segment: "particulier",
  },
  {
    id: "professionnels",
    anchor: anchors.professionnels + "-carte",
    badge: "Pro",
    tone: "leaf",
    title: "Des contrats d’énergie adaptés à votre activité",
    text: "Nous relisons vos contrats d’électricité et de gaz, suivons leurs échéances et négocions au bon moment.",
    points: ["Contrats d’électricité et de gaz", "Suivi des échéances et renouvellements", "Photovoltaïque sur vos bâtiments"],
    cta: "Faire relire mes contrats",
    segment: "professionnel",
  },
  {
    id: "collectivites",
    anchor: anchors.energie,
    badge: "Collectivités",
    tone: "orange",
    title: "Reprenez la main sur les contrats d’énergie de votre structure",
    text: "Communes, intercommunalités et établissements publics : analyse de vos contrats d’électricité et de gaz, de leurs échéances et de vos consommations.",
    points: ["Contrats d’électricité et de gaz", "Échéances et renouvellements", "Échanges par e-mail, à votre rythme"],
    cta: "Optimiser mes contrats",
    segment: "collectivite",
  },
];

/** Parcours particulier (maquette B2C : simule → un conseiller compare → vous changez sans coupure). */
export const parcoursParticulier = [
  {
    title: "Je décris ma situation",
    text: "En quelques questions : votre logement, votre énergie, votre fournisseur actuel et le montant de votre facture.",
  },
  {
    title: "Un conseiller compare pour moi",
    text: "Il vous rappelle sous 24 h, au créneau choisi, avec un comparatif des offres adaptées à votre consommation.",
  },
  {
    title: "Je décide, sans engagement",
    text: "Vous gardez votre contrat actuel si rien n’est plus intéressant. Aucune obligation de changer.",
  },
  {
    title: "Je signe en ligne",
    text: "Si l’offre vous convient, le contrat est établi par le fournisseur et signé électroniquement. Nous gérons les démarches.",
  },
  {
    title: "Le changement se fait sans coupure",
    text: "Le nouveau fournisseur s’occupe de la résiliation de l’ancien contrat. Le réseau et le compteur ne changent pas.",
  },
] as const;

/** Parcours professionnel / collectivité — distinct du parcours particulier. */
export const parcoursPro = [
  {
    title: "Compréhension de votre structure",
    text: "Activité, sites, organisation : nous partons de votre réalité.",
  },
  {
    title: "Lecture de vos contrats",
    text: "Fournisseurs, prix, durées d’engagement et dates d’échéance de vos contrats d’électricité et de gaz.",
  },
  {
    title: "Analyse des consommations",
    text: "Lorsque vous les avez : historiques de consommation et factures récentes.",
  },
  {
    title: "Consultation des fournisseurs",
    text: "Nous vous présentons les offres obtenues, leurs conditions et leurs limites, au bon moment avant l’échéance.",
  },
  {
    title: "Suivi dans la durée",
    text: "Un interlocuteur unique, qui vous alerte avant chaque renouvellement.",
  },
] as const;
