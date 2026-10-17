import { confirmed, pending, type Validated } from "./validation";

/**
 * Source unique de vérité pour l'identité et les coordonnées WE CARE ÉNERGIE (NAP).
 * Ne jamais recopier ces informations ailleurs dans le code : importer `company`.
 *
 * TODO_WCE_VALIDATION : SIREN, adresse, téléphone, WhatsApp et e-mail restent à obtenir
 * (voir WCE_CONTENT_TO_VALIDATE.md). Tant qu'ils manquent, le site ne les affiche pas.
 */

const SRC_CONTRAT = "Contrat de prestation STIPway × WE CARE ÉNERGIE (juillet 2026)";
const SRC_PUB = "Logo et visuel publicitaire fournis par le client (2026)";
const SRC_REUNION = "Réunion avec Jamel MER, 19/07/2026";

function socialUrl(url: string, note: string): Validated<string> {
  return url ? confirmed(url, "Compte fourni par le client") : pending<string>(note);
}

/** Téléphone : variable d'environnement, sinon vide (aucun lien d'appel n'est alors rendu). */
const phoneE164 = (process.env.NEXT_PUBLIC_PHONE_E164 ?? "").replace(/[^\d+]/g, "");

export const company = {
  name: "WE CARE ÉNERGIE",
  /** Graphie du logo, en capitales, avec l'accent sur le É. */
  brandUpper: "WE CARE ÉNERGIE",
  tagline: "Courtier en énergie : électricité, gaz et photovoltaïque",

  legal: {
    denomination: pending<string>("Dénomination exacte (extrait Kbis / annuaire-entreprises.data.gouv.fr)"),
    form: pending<string>("Forme juridique (SAS ? — le contrat mentionne un Président)"),
    capital: pending<string>("Capital social"),
    siren: pending<string>("SIREN"),
    siret: pending<string>("SIRET du siège"),
    rcs: pending<string>("Ville du RCS"),
    ape: pending<string>("Code APE"),
    president: confirmed("Jamel MER", SRC_CONTRAT),
    vat: pending<string>("N° TVA intracommunautaire"),
    publicationDirector: confirmed("Jamel MER, Président", SRC_CONTRAT),
    host: pending<string>("Hébergeur définitif (nom, adresse, téléphone) — dépend du choix Vercel / autre"),
  },

  address: {
    street: pending<string>("Adresse du siège (« à compléter » dans le contrat)"),
    postalCode: pending<string>("Code postal du siège"),
    city: pending<string>("Ville du siège"),
    country: "FR",
    publicDisplay: pending<boolean>("Le client accepte-t-il d'afficher l'adresse du siège sur le site ?"),
  },

  phone: {
    e164: phoneE164,
    display: phoneE164 ? ("0" + phoneE164.replace(/^\+33/, "")).replace(/(\d{2})(?=\d)/g, "$1 ") : "",
    status: phoneE164
      ? confirmed(true, "Variable NEXT_PUBLIC_PHONE_E164")
      : pending<boolean>("Numéro affiché — c'est aussi le numéro qui rappelle le client (décision du 19/07 : l'annoncer pour qu'il décroche)"),
  },

  email: pending<string>("Adresse de contact sur le domaine (ex. contact@wecareenergie.fr)"),

  /** Numéro WhatsApp qui reçoit les demandes (surchargeable via NEXT_PUBLIC_WHATSAPP_NUMBER). */
  whatsapp: {
    number: pending<string>("Numéro WhatsApp qui reçoit les demandes"),
  },

  serviceArea: confirmed("Partout en France", "Proposition d'accompagnement STIPway (juillet 2026) — « ciblage national »"),

  openingHours: pending<string>("Jours et horaires de rappel"),
  responseTime: confirmed("Réponse sous 24 h", SRC_PUB),

  googleBusiness: {
    url: process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL
      ? confirmed(process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL, "Variable NEXT_PUBLIC_GOOGLE_BUSINESS_URL")
      : pending<string>("Lien de la fiche Google Business (s'il y en a une)"),
    reviewsCount: pending<number>("Nombre d'avis et note moyenne vérifiables"),
  },

  /** Réseaux sociaux : URL du compte dans la variable d'environnement indiquée. */
  social: {
    facebook: socialUrl(process.env.NEXT_PUBLIC_FACEBOOK_URL || "", "URL de la page Facebook WE CARE ÉNERGIE"),
    instagram: socialUrl(process.env.NEXT_PUBLIC_INSTAGRAM_URL || "", "URL du compte Instagram WE CARE ÉNERGIE"),
    linkedin: socialUrl(process.env.NEXT_PUBLIC_LINKEDIN_URL || "", "URL de la page LinkedIn WE CARE ÉNERGIE"),
  } satisfies Record<string, Validated<string>>,

  foundingDate: pending<string>("Date d'immatriculation"),

  /** Statut et rémunération : la transparence est une décision de conception (maquette B2C, 19/07). */
  brokerNotice: confirmed(
    "WE CARE ÉNERGIE est un courtier indépendant : nous sommes rémunérés par les fournisseurs partenaires lorsqu’un contrat est signé grâce à notre mise en relation. La comparaison et l’accompagnement ne vous sont pas facturés.",
    `${SRC_REUNION} ; maquette de landing B2C`,
  ),
} as const;

export const hasPhone = company.phone.e164 !== "";

export const fullAddress =
  company.address.street.value && company.address.postalCode.value && company.address.city.value
    ? `${company.address.street.value}, ${company.address.postalCode.value} ${company.address.city.value}`
    : null;

export const telHref = `tel:${company.phone.e164}`;
export const mailHref = company.email.value ? `mailto:${company.email.value}` : null;

/** Numéro WhatsApp effectif (variable d'environnement prioritaire). Vide si inconnu. */
export function whatsappNumber(): string {
  const env = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");
  return env || company.whatsapp.number.value || company.phone.e164.replace(/\D/g, "");
}

export const hasWhatsapp = whatsappNumber() !== "";

export function whatsappHref(message: string): string {
  return `https://wa.me/${whatsappNumber()}?text=${encodeURIComponent(message)}`;
}
