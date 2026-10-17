# Contenus à valider — WE CARE ÉNERGIE

Tout ce qui suit est déclaré `pending()` dans le code : visible en orange « [À CONFIRMER AVEC LE CLIENT] » en
préproduction, **masqué en production**. Liste exhaustive dans le code : `npm run check:content`.

## 1. Bloquant pour la mise en ligne

| # | Information | Où | Remarque |
|---|---|---|---|
| 1 | Téléphone affiché = numéro qui rappelle | `NEXT_PUBLIC_PHONE_E164` | Décision du 19/07 : l'annoncer pour que le client décroche |
| 2 | Numéro WhatsApp qui reçoit les demandes | `NEXT_PUBLIC_WHATSAPP_NUMBER` | Sans lui et sans connecteur CRM, une demande ne peut pas être transmise |
| 3 | Connecteur de lead (CRM MENS ou webhook) | `CRM_WEBHOOK_URL` / `LEAD_NOTIFY_WEBHOOK_URL` | Tester de bout en bout (voir les leçons du site d’origine dans `_kit/`, § Leads) |
| 4 | Dénomination, forme, capital, SIREN, SIRET, RCS, APE, TVA | `config/company.ts` | Extrait Kbis ou annuaire-entreprises.data.gouv.fr |
| 5 | Adresse du siège, et accord pour l'afficher | `config/company.ts` | « À compléter » dans le contrat |
| 6 | E-mail de contact sur le domaine | `config/company.ts` | Ex. contact@wecareenergie.fr |
| 7 | Hébergeur (raison sociale, adresse, téléphone) | `config/company.ts` | Mentions légales |
| 8 | Relecture juridique | mentions légales, confidentialité, FAQ (`legalReview`), consentement | Statut d'intermédiaire, sous-traitants, éventuel traitement hors UE (équipe au Maroc) |

## 2. Offre et contenu

| # | Information | Où | Remarque |
|---|---|---|---|
| 9 | Pompe à chaleur : proposée ou non ? En propre ou via installateur RGE ? | `config/services.ts` → `offers.pac` | « Je pense même les PAC » (17/10/2026) : masquée en production en attendant |
| 10 | Photovoltaïque : qui installe, qualification (QualiPV), assurance décennale | `config/proofs.ts` | Le site parle d'accompagnement, sans citer de qualification |
| 11 | Liste des fournisseurs du menu « fournisseur actuel » | `config/jawabot.ts` | Liste actuelle : principaux fournisseurs du marché + « Autre » |
| 12 | Fournisseurs partenaires publiables (et leur accord) | `config/proofs.ts` | Et leur priorité 1/2/3 pour le scoring (`lib/scoring.ts`) |
| 13 | Allégation « jusqu'à -30 % » | visuel pub | Non reprise sur le site ; à justifier avant toute utilisation (DGCCRF) |
| 14 | Horaires de rappel | `config/company.ts` → `openingHours` | |
| 15 | Avis clients vérifiables (fiche Google ou plateforme) | `config/company.ts`, `GOOGLE_PLACES_API_KEY` | Aucun faux avis |
| 16 | Réseaux sociaux | variables `NEXT_PUBLIC_*_URL` | |
| 17 | Collectivités : confirmer le service (marchés publics ?) | `config/dossiers.ts` | Profil hérité du portefeuille B2B de Jamel |
| 18 | Pondérations du scoring | `lib/scoring.ts` | À recalibrer sur les contrats signés |

## 3. Marque

| # | Information | Remarque |
|---|---|---|
| 19 | Logo source vectoriel (SVG) et variante blanche | En attendant : PNG 783×301 de la présentation STIPway, posé sur un cartouche blanc sur fond foncé |
| 20 | Couleurs officielles | Relevées sur le logo : bleu #1A6BA8, verts #367528 / #7DBE5E, orange #E8912A |
| 21 | Police de marque | Inter en attendant |
| 22 | Clé du widget Jawabot | `NEXT_PUBLIC_JAWABOT_WIDGET_KEY` ; vide = désactivé |
