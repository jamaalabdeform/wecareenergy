import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { Pending, ValidatedText } from "@/components/ui/Pending";
import { company, fullAddress, hasPhone, mailHref, telHref } from "@/config/company";
import { SHOW_PENDING, type Validated } from "@/config/validation";

/** Ligne « libellé : valeur » : omise en production tant que la valeur n'est pas confirmée. */
function Line({ label, data, first = false }: { label: string; data: Validated<string>; first?: boolean }) {
  if (data.status !== "confirmed" && !SHOW_PENDING) return null;
  return (
    <>
      {!first && <br />}
      {label} : <ValidatedText data={data} label={label} />
    </>
  );
}

export const metadata: Metadata = { title: "Mentions légales", alternates: { canonical: "/mentions-legales" } };

export default function MentionsLegales() {
  const l = company.legal;
  return (
    <LegalPage title="Mentions légales" updated="octobre 2026">
      <Pending label="Relecture juridique des mentions légales avant mise en production (statut d’intermédiaire, mentions du courtage)." />
      <section>
        <h2>Éditeur du site</h2>
        <p>
          {company.name}
          <Line label="Dénomination" data={l.denomination} />
          <Line label="Forme juridique" data={l.form} />
          <Line label="Capital" data={l.capital} />
          {fullAddress ? (
            <>
              <br />
              Siège social : {fullAddress}
            </>
          ) : (
            <Line label="Siège social" data={company.address.street} />
          )}
          <Line label="RCS" data={l.rcs} />
          <Line label="SIREN" data={l.siren} />
          <Line label="SIRET" data={l.siret} />
          <Line label="Code APE" data={l.ape} />
          <Line label="N° TVA intracommunautaire" data={l.vat} />
          {hasPhone && (
            <>
              <br />
              Téléphone : <a href={telHref}>{company.phone.display}</a>
            </>
          )}
          {mailHref ? (
            <>
              <br />
              E-mail : <a href={mailHref}>{company.email.value}</a>
            </>
          ) : (
            <Line label="E-mail" data={company.email} />
          )}
        </p>
        <p>
          <Line first label="Président" data={l.president} />
          <Line label="Directeur de la publication" data={l.publicationDirector} />
        </p>
      </section>
      {(l.host.status === "confirmed" || SHOW_PENDING) && (
        <section>
          <h2>Hébergement</h2>
          <p>
            <ValidatedText data={l.host} label="Hébergeur (raison sociale, adresse, téléphone)" />
          </p>
        </section>
      )}
      <section>
        <h2>Activité de courtage</h2>
        <p>{company.brokerNotice.value}</p>
        <p>
          Les offres présentées proviennent des fournisseurs avec lesquels {company.name} travaille ; elles ne couvrent pas nécessairement l’ensemble du marché. Le médiateur national de l’énergie propose un comparateur d’offres officiel et indépendant sur{" "}
          <a href="https://www.energie-info.fr" target="_blank" rel="noopener noreferrer">
            energie-info.fr
          </a>
          .
        </p>
        <p>Tout contrat de fourniture d’énergie souscrit à distance ouvre droit à un délai de rétractation de 14 jours.</p>
      </section>
      <section>
        <h2>Propriété intellectuelle</h2>
        <p>La marque, le logo {company.brandUpper} et l’ensemble des contenus de ce site sont la propriété de {company.name} ou utilisés avec autorisation. Toute reproduction sans accord préalable est interdite.</p>
      </section>
    </LegalPage>
  );
}
