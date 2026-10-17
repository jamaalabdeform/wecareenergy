# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Trois profils, **priorité aux particuliers** (décision de cadrage STIPway, juillet 2026 : le B2C passe en premier) :

- **Particuliers** : ménages qui paient une facture d'électricité et/ou de gaz, en maison ou en appartement, partout en France. Ils arrivent surtout d'une publicité Meta / Instagram / TikTok ou Google, sur smartphone, sans connaître WE CARE ÉNERGIE, et se méfient des comparateurs. Certains ont aussi un projet de panneaux photovoltaïques (et peut-être de pompe à chaleur, à confirmer).
- **Professionnels** : dirigeants ou responsables (technique, administratif, financier) d'entreprises, commerces, artisans, sites tertiaires ou agricoles ; contrats d'électricité et de gaz, échéances, photovoltaïque sur leurs bâtiments.
- **Collectivités** : communes, intercommunalités, établissements publics, bailleurs ; contrats d'énergie et échéances. Le canal d'échange préféré est l'e-mail.

Job commun : savoir en quelques secondes si WE CARE ÉNERGIE peut faire baisser leur facture ou les aider sur leurs contrats, puis être rappelé par un conseiller qui connaît déjà leur situation.

## Product Purpose

Landing page d'acquisition de WE CARE ÉNERGIE, courtier indépendant en énergie dirigé par Jamel MER. Elle est la brique « Capter » du dispositif STIPway (Attirer → Capter → Convertir → Piloter) : clic publicitaire → page du profil → fiche par étapes (pré-qualification) ou demande de rappel → lead scoré → CRM MENS → alerte WhatsApp du conseiller → rappel sous 24 h → contrat généré chez le fournisseur et signé électroniquement.

Succès : un coût par contrat signé maîtrisé (CPL, coût par RDV, coût par contrat), et des clients qui restent au-delà de 3 mois (au-delà, la commission n'est plus reprise par le fournisseur).

## Positioning

Ce que WE CARE ÉNERGIE peut affirmer, tel que validé sur le visuel publicitaire du client :

- **Réponse sous 24 h**, au créneau choisi par le client.
- **Sans engagement** : on compare, le client décide.
- **On gère tout** : démarches prises en charge si l'offre convient ; changement de fournisseur sans coupure.
- **Transparence sur la rémunération** : courtier payé par les fournisseurs partenaires ; renvoi vers le comparateur officiel du médiateur national de l'énergie (décision de conception de la maquette B2C, pour éviter les reproches faits à d'autres comparateurs).

**Non retenu** tant qu'il n'est pas étayé : « Économisez jusqu'à -30 % » (visuel pub). Aucune économie chiffrée n'est affichée sur le site.

## Operating Context

- Les demandes arrivent dans le CRM MENS (extension STIPway) et en alerte WhatsApp ; le conseiller rappelle, qualifie (intéressé / pas intéressé / à recontacter), puis le contrat est généré chez le fournisseur et signé électroniquement.
- Le conseiller qui rappelle peut être Jamel, une ressource recrutée ou une équipe externalisée (piste STIPway au Maroc) : à trancher, avec impact RGPD.
- Fournisseurs partenaires priorisés 1 / 2 / 3 dans le CRM (marge et prix client) : la liste et la priorité servent au scoring.
- Prospection inbound uniquement ; opt-in explicite au rappel (régime du démarchage BtoC à partir du 11/08/2026), consentement horodaté rattaché au lead.

## Capabilities and Constraints

- Offres : comparaison et changement de fournisseur d'électricité et de gaz (cœur de métier) ; photovoltaïque (confirmé) ; pompe à chaleur (à confirmer, masquée en production).
- Zone : France entière, à distance.
- Stack : Next.js 16, TypeScript, Tailwind CSS 4 (voir README).
- Fiche (moteur « Jawabot ») : questions configurables (`config/jawabot.ts`) — demande, énergie, fournisseur actuel (+ « Autre »), facture mensuelle, logement, statut, code postal, suite souhaitée, créneau de rappel ; scoring provisoire (`lib/scoring.ts`).
- Mesure : GA4 / GTM / Meta Pixel / CAPI après consentement ; UTM rattachés au lead.

## Brand Commitments

- Nom : **WE CARE ÉNERGIE** (capitales, É accentué). Logo : uniquement le fichier fourni par le client (`public/brand/`), jamais recomposé ni recoloré ; SVG à obtenir.
- Charte : couleurs du logo (bleu #1A6BA8, vert #367528 / #7DBE5E, orange #E8912A réservé aux CTA), police Inter en attendant celle du client.
- Ton : vouvoiement, simple et direct, rassurant, transparent. À dire : « Un conseiller compare pour vous », « Sans engagement ». À éviter : économies chiffrées non étayées, « gratuit » en accroche, superlatifs, faux avis.
- Le site ne doit jamais « faire IA ».

## Evidence on Hand

- Dirigeant : Jamel MER, Président (contrat STIPway).
- Logo (PNG) et visuel publicitaire ; domaine affiché : wecareenergie.fr.
- **Aucun** avis vérifiable, aucun cas client, aucun chiffre de résultat, aucune liste publiable de fournisseurs à ce jour. La maquette d'origine contenait un témoignage fictif : il n'est pas repris.
- Liste des contenus à obtenir : `WCE_CONTENT_TO_VALIDATE.md`.

## Product Principles

1. **Comparer avant de promettre** : la page promet un comparatif fondé sur la consommation réelle, jamais une économie.
2. **Un parcours par profil** : particulier, professionnel et collectivité ne sont jamais mélangés.
3. **Qualifier pour le conseiller** : chaque interaction produit un lead exploitable (fournisseur, facture, créneau), pas une conversation sans fin.
4. **Prouver avant d'afficher** : ce qui n'est pas confirmé reste masqué en production.
5. **Mobile d'abord** : le visiteur venu d'une publicité comprend et agit en moins de 5 secondes.

## Accessibility & Inclusion

WCAG 2.2 AA visé : contrastes, navigation clavier, libellés de formulaires, cibles tactiles ≥ 44 px, `prefers-reduced-motion` respecté.
