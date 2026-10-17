# Étape 1 — Inventaire (17/10/2026)

## État du code (copie HDF Bâti, non modifiée)

| Contrôle | Résultat |
|---|---|
| `npm ci` | OK |
| `npm run typecheck` | OK |
| `npm run lint` | OK |
| `npm run build` | **OK** (16 routes, dont `/api/lead` dynamique) |
| `npm run check:rebrand` | **447 occurrences bloquantes** + 19 « zone à vérifier » |

Fichiers les plus concernés : `README.md` (47), `config/company.ts` (45), `components/etude/StudySheet.tsx` (26),
`config/site.ts` (16), `lib/lead.ts` (15), `.env.example` (15), `config/dossiers.ts` (14), `config/jawabot.ts` (12),
`components/brand/Logo.tsx` (12), 7 SVG `public/brand/hdf-bati-*`.

## Écart métier

Le code HDF est organisé autour de **3 profils** (particulier / professionnel / collectivité) et d'une **fiche
d'étude de projet de rénovation** (`StudySheet.tsx`, `config/jawabot.ts`, `config/dossiers.ts`, `config/aides.ts`,
pages `/interventions/[ville]`). WE CARE ÉNERGIE est un courtier en énergie, priorité particuliers.

| Brique HDF | Sort proposé |
|---|---|
| Formulaire de rappel, créneau, consentement, `/api/lead`, WhatsApp, scoring | **Garder**, adapter les champs (fournisseur actuel, énergie, facture) |
| Fiche d'étude (`StudySheet`) | **Garder la mécanique**, remplacer les questions (logement, énergie, fournisseur, facture, équipements) |
| Profil particulier | **Garder**, page principale |
| Profil professionnel | **Garder en version courte** (renvoi vers Jamel) si confirmé |
| Profil collectivité | **Supprimer** sauf confirmation |
| Aides (MaPrimeRénov', CEE…) | **Supprimer** (hors métier du courtage) |
| Pages locales `/interventions/[ville]` | **Vider** (zone inconnue, activité à distance) |
| Avis Google | **Garder le composant**, masqué tant qu'aucune fiche n'est fournie |
| Jawabot | **Garder si confirmé**, textes réécrits |
| Pages légales | **Garder**, ajouter les mentions courtier (rémunération, médiateur, rétractation 14 j) |

## Questions bloquantes

Voir le message de synthèse de la session ; reprises dans `_kit/QUESTIONNAIRE_CLIENT.md` pour Jamel.
