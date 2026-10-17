# Message à coller dans Claude Code (première session)

---

Ce dépôt est une copie complète du site HDF Bâti (Next.js 16, React 19, Tailwind 4), qui est en production et
validé. Ta mission : le transformer en site **We Care Energy**, au même niveau de qualité, sans casser ce qui
fonctionne.

Avant toute modification, lis dans cet ordre :
1. `CLAUDE.md` (règles du projet) ;
2. `_kit/BRIEF_WE_CARE_ENERGY.md` (ce qu'on sait du client) et, s'il existe, `_kit/client/` (logo, charte) ;
3. `_kit/PLAN_DE_TRAVAIL.md` (les étapes à suivre, dans l'ordre) ;
4. `_kit/LECONS_HDF.md` (pièges déjà rencontrés) ;
5. `_kit/reference-hdf/PRODUCT.md` et `DESIGN.md` (le modèle à adapter).

Règles absolues :
- Ne rien inventer sur We Care Energy. Toute information absente du brief passe par `pending()` et la liste
  `WCE_CONTENT_TO_VALIDATE.md`. Pas de faux avis, faux chantiers, fausses certifications, faux chiffres.
- Aucune promesse « 1 € », « gratuit », « 100 % financé » ; aides toujours « selon conditions d'éligibilité ».
- Le site doit rester rapide, accessible (contrastes AA, cibles 44 px) et ne jamais « faire IA ».
- `npm run typecheck`, `npm run lint`, `npm run build`, `npm run qa:screens` et `npm run check:rebrand`
  doivent passer avant chaque push.

Commence par l'étape 1 du plan (inventaire et questions), puis présente-moi ton plan et les questions bloquantes
avant de modifier le code.

---
