import { Callback } from "../sections/Callback";
import { Faq } from "../sections/Faq";
import { GoogleReviews } from "../sections/GoogleReviews";
import { WhyUs } from "../sections/WhyUs";
import { dossiers } from "@/config/dossiers";
import type { Segment } from "@/config/services";
import { faqJsonLd, jsonLd } from "@/lib/schema";
import { DossierHero } from "./DossierHero";
import { Dossier } from "./Dossier";

/** Page profil : la fiche, le dossier (sommaire + rubriques A → D), puis la clôture. */
export function ProfilePage({ segment }: { segment: Segment }) {
  const d = dossiers[segment];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqJsonLd(segment))} />
      <DossierHero segment={segment} />
      <Dossier d={d} />
      <GoogleReviews />
      <WhyUs />
      <Faq segment={segment} />
      <Callback segment={segment} />
    </>
  );
}
