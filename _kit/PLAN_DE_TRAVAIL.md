# Plan de travail — HDF Bâti → We Care Energy

Chaque étape se termine par un commit. Ne passe à la suivante que lorsque les contrôles passent.

## Étape 1 — Inventaire (aucune modification)
- `npm install`, `npm run build`, `npm run check:rebrand` : noter le nombre d'occurrences HDF.
- Lire le brief ; lister ce qui est connu, ce qui manque, et les **questions bloquantes** (nom légal, activités,
  publics, zone, téléphone, logo). Les poser à l'utilisateur en une fois.

## Étape 2 — Produit et design
- Réécrire `PRODUCT.md` et `DESIGN.md` à la racine pour We Care Energy en partant de `_kit/reference-hdf/`
  (même structure). Garder la direction « fiche d'étude » si elle convient au client, sinon la justifier.
- Palette : à partir du logo / charte du client. Renommer les jetons de marque dans `app/globals.css`
  (`--color-hdf*` → `--color-brand*`, puis remplacer les classes `*-hdf*` partout). Conserver la logique :
  une couleur d'action unique pour les CTA, des couleurs par profil (`toneClasses` dans `config/services.ts`),
  contrastes vérifiés (texte ≥ 4,5:1).
- Utiliser le skill Impeccable (`/impeccable`) pour la direction visuelle, puis son détecteur.

## Étape 3 — Données (config/)
- `config/company.ts` : identité, NAP, légal, WhatsApp, horaires, réseaux. `confirmed(valeur, source)` seulement
  pour ce qui vient du brief ; le reste en `pending(note)`.
- `config/site.ts` (domaine, SEO), `config/services.ts` (profils réellement servis : supprimer un profil si le
  client ne le sert pas), `config/positioning.ts`, `config/dossiers.ts`, `config/faq.ts`, `config/proofs.ts`,
  `config/aides.ts`, `config/jawabot.ts` (questions de la fiche), `config/local-pages.ts` (vider si zone inconnue).
- `config/validation.ts` : `PENDING_LABEL` → « [À CONFIRMER AVEC LE CLIENT] ».
- Créer `WCE_CONTENT_TO_VALIDATE.md` sur le modèle de `_kit/reference-hdf/HDF_CONTENT_TO_VALIDATE.md`.

## Étape 4 — Marque et fichiers
- Logos : `public/brand/` (renommer `hdf-bati-*` → `we-care-energy-*`), `components/brand/Logo.tsx`,
  `app/icon.svg`, `app/manifest.ts`, icônes PNG, image OG (`scripts/build-og.mjs`).
- Si aucun logo n'est fourni : un logotype texte sobre provisoire, signalé comme à remplacer. Ne jamais
  dessiner un faux logo présenté comme officiel.

## Étape 5 — Code et textes
- Renommer composants et textes : `WhyHdf.tsx` → `WhyUs.tsx`, clés sessionStorage `hdf-fiche:*` → `wce-fiche:*`,
  événements, modèle WhatsApp (`nouveau_lead_hdf` → `nouveau_lead_wce`), textes de consentement
  (`lib/lead.ts`, `lib/consent.ts`), pages légales, README, `.env.example`, `scripts/*`.
- `CLAUDE.md` : remplacer toute mention HDF (ce fichier a déjà été adapté ; le compléter si besoin).

## Étape 6 — Contrôles
- `npm run typecheck && npm run lint && npm run build`
- `npm run check:rebrand` → **0 occurrence bloquante** (les « À vérifier » de zone doivent être justifiés).
- `npm run qa:screens` (4 pages × 6 largeurs + parcours de la fiche + rappel) : relire les captures.
- Détecteur Impeccable sur `/` et une page profil.
- Test d'un lead de bout en bout (voir `_kit/LECONS_HDF.md` § Leads).

## Étape 7 — Mise en ligne (avec l'utilisateur)
- Hébergeur (Vercel) : variables de `.env.example`, dont `NEXT_PUBLIC_SITE_ENV=production` et `NEXT_PUBLIC_SITE_URL`.
- DNS : voir `_kit/LECONS_HDF.md` § Domaine (piège IPv6 sur mobile).
- Supprimer `_kit/reference-hdf/` du dépôt une fois le rebranding terminé.
