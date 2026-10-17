# Kit « We Care Energy » — à partir du site HDF Bâti

Ce dossier contient **tout le site HDF Bâti** (code Next.js complet, outils, tests, design system), prêt à être transformé
en site **We Care Energy** par Claude Code.

## Ce qu'il contient

| Élément | Rôle |
|---|---|
| Le code à la racine (`app/`, `components/`, `config/`, `lib/`, `scripts/`…) | Le site HDF Bâti qui fonctionne, à rebrander |
| `CLAUDE.md` | Les consignes que Claude Code lit automatiquement à chaque session |
| `_kit/BRIEF_WE_CARE_ENERGY.md` | Ce qu'on sait du client (**à compléter par vous avant de lancer**) |
| `_kit/QUESTIONNAIRE_CLIENT.md` | Les questions à envoyer au dirigeant de We Care Energy |
| `_kit/PROMPT_CLAUDE_CODE.md` | Le message à coller dans Claude Code pour démarrer |
| `_kit/PLAN_DE_TRAVAIL.md` | Les étapes, dans l'ordre, que Claude Code doit suivre |
| `_kit/LECONS_HDF.md` | Tout ce qu'on a appris sur HDF (pièges évités, réglages) |
| `_kit/JAWABOT_MODELE.md` | Modèle des textes de l'assistant Jawabot |
| `_kit/reference-hdf/` | Documents HDF d'origine (produit, design, contenus validés), en lecture seule |
| `npm run check:rebrand` | Contrôle automatique : échoue tant qu'il reste une trace de HDF |

## Comment l'utiliser (5 étapes)

1. **Complétez `_kit/BRIEF_WE_CARE_ENERGY.md`** avec ce que vous savez déjà (nom légal, SIREN, activités, zone,
   téléphone, logo, couleurs…). Ce qui manque reste « à confirmer » : le site ne l'affichera pas en production.
2. **Ajoutez le logo** (SVG de préférence) et la charte du client dans `_kit/client/` (créez le dossier).
3. **Créez un dépôt GitHub vide** (ex. `we-care-energy-site`), décompressez ce zip dedans, poussez-le sur `main`.
4. **Ouvrez une session Claude Code sur ce dépôt** et collez le contenu de `_kit/PROMPT_CLAUDE_CODE.md`.
5. **Envoyez `_kit/QUESTIONNAIRE_CLIENT.md`** au client ; transmettez ses réponses à Claude Code au fur et à mesure.

Le site reste en mode préproduction (informations non confirmées signalées en orange, site non indexé) tant que
`NEXT_PUBLIC_SITE_ENV=production` n'est pas défini chez l'hébergeur.
