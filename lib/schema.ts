import { company, fullAddress, hasPhone } from "@/config/company";
import { faqFor } from "@/config/faq";
import type { Segment } from "@/config/services";
import { seo, siteUrl } from "@/config/site";
import { publicValue } from "@/config/validation";

/**
 * Données structurées schema.org.
 * - Organization (pas de LocalBusiness) : WE CARE ÉNERGIE travaille à distance, partout en France.
 * - Seules les informations confirmées sont déclarées ; aucune note / aucun avis tant qu'ils ne
 *   sont pas vérifiables. TODO_WCE_VALIDATION : SIREN, adresse, téléphone, e-mail.
 */
export function businessJsonLd() {
  const sameAs = Object.values(company.social).map(publicValue).filter(Boolean);
  const gbp = publicValue(company.googleBusiness.url);
  if (gbp) sameAs.push(gbp);
  const siren = publicValue(company.legal.siren);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#entreprise`,
    name: company.name,
    legalName: publicValue(company.legal.denomination) ?? undefined,
    description: seo.description,
    slogan: company.tagline,
    url: siteUrl,
    logo: `${siteUrl}/brand/we-care-energie-logo.png`,
    image: `${siteUrl}${seo.ogImage}`,
    ...(hasPhone ? { telephone: company.phone.e164 } : {}),
    ...(company.email.status === "confirmed" ? { email: company.email.value } : {}),
    foundingDate: publicValue(company.foundingDate) ?? undefined,
    ...(siren ? { identifier: { "@type": "PropertyValue", propertyID: "SIREN", value: siren } } : {}),
    ...(company.address.publicDisplay.value && fullAddress
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: company.address.street.value,
            postalCode: company.address.postalCode.value,
            addressLocality: company.address.city.value,
            addressCountry: company.address.country,
          },
        }
      : {}),
    founder: { "@type": "Person", name: company.legal.president.value },
    areaServed: { "@type": "Country", name: "France" },
    knowsAbout: ["Courtage en énergie", "Contrats d’électricité", "Contrats de gaz", "Photovoltaïque"],
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function faqJsonLd(segment?: Segment) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqFor(segment).map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#site`,
    url: siteUrl,
    name: company.name,
    inLanguage: "fr-FR",
    publisher: { "@id": `${siteUrl}/#entreprise` },
  };
}

/** Sérialisation sûre pour <script type="application/ld+json">. */
export const jsonLd = (data: unknown) => ({ __html: JSON.stringify(data).replace(/</g, "\\u003c") });
