# Brief — WE CARE ÉNERGIE

> Rempli le 17/10/2026 à partir du dossier de contexte STIPway (`WeCareEnergie_Contexte.zip`, réunion du 19/07/2026,
> spécifications, architecture B2C, maquette de landing, visuel publicitaire). Les sources utiles au site sont copiées
> dans `_kit/client/`. Les documents commerciaux (contrat, chiffrage) n'ont volontairement pas été versionnés.
>
> ✅ = confirmé par un document du client / de l'agence · ❓ = inconnu, traité comme **à confirmer** (`pending()`),
> visible en préproduction, masqué en production.

## Décision de cadrage

Le site HDF Bâti est un site d'artisan de la rénovation (PAC, isolation, aides, RGE). WE CARE ÉNERGIE est un
**courtier en énergie**. On garde la **technique** HDF (fiche, formulaire de rappel, envoi WhatsApp, Jawabot, avis
Google, pages légales, consentement, outils de contrôle) et on reconstruit le **parcours** sur le métier du courtage
particulier (maquette `_kit/client/maquette-landing-b2c.html` + décisions de la réunion du 19/07).

## Contexte

- Projet porté par l'agence **STIPway** (contrat de prestation, outils MENS / CRM). ✅
- Canal visé : publicité Meta / Instagram / TikTok / Google Search grand public → landing → rappel. ✅
- Lancement visé : rentrée (septembre 2026). ✅ — date réelle de mise en ligne : ❓
- Interlocuteur : **Jamel MER**, Président. ✅ — téléphone / e-mail : ❓

## Identité légale

| Champ | Valeur | Source |
|---|---|---|
| Graphie de la marque | **WE CARE ÉNERGIE** (avec É) ✅ | Logo du visuel pub, contrat, maquette |
| Dénomination exacte | ❓ | |
| Forme juridique, capital | ❓ (« Président » → probablement SAS/SASU, à confirmer) | Contrat |
| SIREN / SIRET / TVA | ❓ | |
| Adresse du siège | ❓ (« à compléter » dans le contrat) | Contrat |
| Date de création | ❓ | |
| Dirigeant / directeur de la publication | **Jamel MER**, Président ✅ | Contrat |

## Activité

| Question | Réponse |
|---|---|
| Métier | **Courtier indépendant en énergie** (électricité et gaz) ✅, rémunéré par les fournisseurs partenaires à la signature ✅ |
| Publics | **Particuliers (priorité B2C)** ✅ ; professionnels (~50 clients historiques, suivi personnel par Jamel) en option ✅ ; collectivités : ❓ (non mentionnées) |
| Zone | ❓ (France entière a priori : changement de fournisseur sans déplacement — à confirmer) |
| Fournisseurs partenaires (liste, priorité 1/2/3) | ❓ — la liste déroulante « fournisseur actuel » du formulaire en dépend |
| Promesses du visuel pub | « Sans engagement », « Réponse sous 24 h », « On gère tout » ✅ (à tenir réellement) |
| Allégation « jusqu'à -30 % » | ⚠ **à justifier** avant tout affichage (risque DGCCRF) — non reprise sur le site tant que non étayée |
| Délai de rappel, horaires | « sous 24 h » ✅ (visuel) ; horaires : ❓ |
| Fiche Google Business, avis | ❓ — la maquette contient un faux témoignage (« Famille D. »), **à ne pas reprendre** |
| Réseaux sociaux | ❓ |

## Formulaire (décisions de la réunion du 19/07)

- Champ **fournisseur actuel** : liste des principaux fournisseurs + « Autre » (saisie libre). ✅
- **Créneau de rappel** choisi par le client. ✅ (déjà présent dans le formulaire HDF : `bestTimeOptions`)
- **Afficher le numéro qui rappellera** le client, pour qu'il décroche. ✅ — numéro : ❓
- Consentement au rappel : case **non pré-cochée et non imposée pour simuler** ; le rappel n'a lieu que si elle est
  cochée (opt-in démarchage BtoC à partir du 11/08/2026). ✅
- Données de la maquette : facture mensuelle (curseur), type de logement, énergie (électricité / gaz / les deux). ✅
- Mentions de la maquette à conserver : courtier rémunéré par les fournisseurs ; comparateur non officiel, renvoi
  vers le comparateur du médiateur (energie-info.fr) ; droit de rétractation de 14 jours. ✅

## Marque

- Logo : visible sur `_kit/client/visuel-pub-reference.jpeg` (ampoule + maison + feuille, « WE CARE » bleu,
  « ÉNERGIE » vert). **Fichier source (SVG) à fournir** ❓ — en attendant, logotype texte provisoire.
- Couleurs relevées sur le visuel (à valider) : bleu `#1A73AF`, vert `#64A34A`, orange CTA `#E99525`.
  La maquette utilisait une autre palette (navy `#141E4D`, or `#F0B429`) : le visuel pub, plus récent, fait foi.
- Police : ❓ (le visuel ressemble à une grotesque géométrique) — à défaut, Inter (déjà embarquée).
- Nom de domaine : **wecareenergie.fr** (affiché sur le visuel) ✅ — achat / DNS : ❓

## Contact et leads

- Téléphone affiché / numéro qui rappelle : ❓ — WhatsApp qui reçoit les demandes : ❓
- E-mail de contact : ❓ (ex. contact@wecareenergie.fr)
- Destination des leads : CRM **MENS** (extension STIPway) à terme ✅ ; en attendant WhatsApp / e-mail : ❓
- Qui rappelle : Jamel, une ressource recrutée, ou une équipe externalisée STIPway (Maroc) : ❓
  → impacte les mentions RGPD (sous-traitant, transfert hors UE).
- Assistant Jawabot : ❓ (clé du widget : ❓)
