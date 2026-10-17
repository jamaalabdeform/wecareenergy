import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { Pending } from "@/components/ui/Pending";
import { company, fullAddress, mailHref } from "@/config/company";

export const metadata: Metadata = { title: "Politique de confidentialité", alternates: { canonical: "/confidentialite" } };

/** Adresse de contact pour l'exercice des droits : l'e-mail confirmé, sinon un texte neutre. */
function ContactLink() {
  return mailHref ? <a href={mailHref}>{company.email.value}</a> : <>l’adresse de contact indiquée dans les mentions légales</>;
}

export default function Confidentialite() {
  return (
    <LegalPage title="Politique de confidentialité" updated="octobre 2026">
      <Pending label="Politique à valider juridiquement (durées de conservation, sous-traitants : CRM MENS, WhatsApp, hébergeur ; éventuel traitement des appels hors de l’Union européenne)." />
      <section>
        <h2>Responsable du traitement</h2>
        <p>
          {company.name}
          {fullAddress && <>, {fullAddress}</>}. Contact : <ContactLink />.
        </p>
      </section>
      <section>
        <h2>Données collectées</h2>
        <ul>
          <li>Via la fiche ou le formulaire de rappel : nom, téléphone, e-mail (facultatif), code postal, créneau de rappel, informations sur votre logement et votre contrat d’énergie (énergie, fournisseur actuel, montant approximatif de la facture) et, pour les professionnels et collectivités, la structure et la fonction.</li>
          <li>Données de navigation et de campagne (source publicitaire, paramètres UTM) pour savoir comment vous nous avez connus.</li>
        </ul>
      </section>
      <section>
        <h2>Finalités et base légale</h2>
        <ul>
          <li>Vous recontacter au sujet de votre demande et préparer votre comparatif — sur la base de votre consentement, recueilli et horodaté lors de l’envoi.</li>
          <li>Suivre le traitement commercial de votre demande (outil de gestion de la relation client).</li>
          <li>Mesurer l’efficacité de nos actions de communication — uniquement avec votre accord pour les cookies concernés.</li>
        </ul>
        <p>{company.name} ne réalise aucune prospection téléphonique non sollicitée : nous vous appelons uniquement si vous l’avez demandé via le formulaire.</p>
      </section>
      <section>
        <h2>Destinataires</h2>
        <p>
          Les données sont destinées à {company.name}. Elles peuvent être traitées par des prestataires techniques (hébergement, outil CRM, messagerie) agissant pour le compte de {company.name}. Si vous signez un contrat, les informations nécessaires à la souscription sont transmises au fournisseur choisi.
        </p>
        <Pending label="Liste des sous-traitants et localisation des données" />
      </section>
      <section>
        <h2>Durée de conservation</h2>
        <Pending label="Durée de conservation des demandes (ex. : 3 ans après le dernier contact)" />
      </section>
      <section>
        <h2>Vos droits</h2>
        <p>
          Vous disposez d’un droit d’accès, de rectification, d’effacement, d’opposition, de limitation et de portabilité, ainsi que du droit de retirer votre consentement à tout moment, en écrivant à <ContactLink />. Vous pouvez introduire une réclamation auprès de la CNIL (cnil.fr).
        </p>
      </section>
    </LegalPage>
  );
}
