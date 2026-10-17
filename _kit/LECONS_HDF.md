# Leçons du projet HDF Bâti (à appliquer d'emblée)

## Leads — le point le plus important
- **Au lancement de HDF, le client ne recevait aucune demande** : aucun connecteur n'était configuré et le
  formulaire « réussissait » quand même. Corrigé : `/api/lead` livre via CRM, webhook, ou **alerte WhatsApp
  directe** (`lib/server/whatsapp.ts`, API Cloud de Meta : numéro expéditeur dédié, jeton permanent, modèle
  approuvé à 6 paramètres) ; sinon le visiteur reçoit un bouton **« relais WhatsApp »** qui envoie sa demande
  rédigée au numéro du client. Aucune demande ne doit se perdre en silence.
- Destinataires WhatsApp : séparer uniquement par `,` ou `;` (un numéro « 06 01 45 11 10 » contient des espaces).
- Tester : `npm run test:whatsapp`, puis une vraie demande depuis le site en ligne.

## Fiche d'étude (cœur du site)
- Questionnaire pas à pas (`lib/jawabot/engine.ts`) : « Modifier » non destructif avec « Garder », reprise
  automatique (sessionStorage, **réponses du projet uniquement, jamais les coordonnées**), compteur juste en
  mode édition, ordre du DOM = ordre visuel, indications sous les champs plutôt que des placeholders.
- Formulaire de rappel court, prérempli avec les réponses de la fiche si le profil correspond.

## Contenus
- Tout ce qui n'est pas confirmé par le client : `pending()` → masqué en production. Liste tenue à jour.
- Garanties : formulations légales génériques (parfait achèvement 1 an, biennale 2 ans, décennale 10 ans selon
  installation) ; garantie constructeur « précisée au devis ».
- Partenaire RGE non nommé si le client le souhaite ; pas de marques si le client ne le souhaite pas.
- Zone : HDF intervient « dans sa région et partout en France selon le projet » — ne pas restreindre la zone
  par défaut (l'assistant Jawabot avait refusé une demande à Auxerre à cause d'un texte trop restrictif).

## Avis Google
- API Places (New) : `GOOGLE_PLACES_API_KEY` + `GOOGLE_PLACE_ID`, mise à jour quotidienne, auteur et lien exigés.
- Sans clé : simple lien « Voir nos avis sur Google » vers la fiche. Jamais de note recopiée à la main ni de
  `aggregateRating` dans les données structurées.

## Domaine et mise en ligne
- **Site inaccessible sur mobile alors qu'il marche sur ordinateur** : enregistrements **AAAA** (IPv6) laissés
  par le registrar → les réseaux 4G/5G (IPv6 en priorité) tombent sur le parking. Zone DNS à garder :
  `A @ 76.76.21.21` et `CNAME www cname.vercel-dns.com.` ; supprimer les AAAA et autres A ; garder MX/TXT.
  Ajouter domaine nu **et** www dans Vercel, l'un redirigeant vers l'autre.
- `NEXT_PUBLIC_SITE_URL` = domaine final (canonique, sitemap, OG). `NEXT_PUBLIC_SITE_ENV=production` sinon le
  site reste en `noindex` et affiche les mentions « à confirmer ».

## Pied de page et réseaux
- Icônes Facebook / Instagram / LinkedIn toujours visibles ; URL via `NEXT_PUBLIC_FACEBOOK_URL`,
  `NEXT_PUBLIC_INSTAGRAM_URL`, `NEXT_PUBLIC_LINKEDIN_URL` (vide = accueil du réseau).

## Jawabot
- Widget chargé en `lazyOnload` dans `app/layout.tsx`, clé via `NEXT_PUBLIC_JAWABOT_WIDGET_KEY`.
- Vérifier sur mobile que la bulle ne recouvre pas la barre d'action du bas (remonter d'environ 90 px).
- Textes : voir `_kit/JAWABOT_MODELE.md`. Couleurs du widget dérivées de la palette du site.

## Couleurs par profil
- Une couleur par profil, partout (onglets, choix de la fiche, page profil, navigation) : `toneClasses` /
  `segmentTone()` dans `config/services.ts`. Sur un fond de couleur claire (orange), texte foncé ; pour une
  couleur trop claire en texte sur blanc, créer une variante foncée (`action-ink`).

## Méthode
- Critiques Impeccable successives (score 25 → 27/36) : supprimer les doublons de navigation, un seul CTA
  orange par écran, pas de flou sur la barre mobile, contrôle visuel à chaque modification.
