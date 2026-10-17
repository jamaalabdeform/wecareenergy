# WE CARE ÉNERGIE — landing page

Landing page de conversion de **WE CARE ÉNERGIE**, courtier indépendant en énergie : comparaison des offres
d’électricité et de gaz et projets photovoltaïques pour les particuliers (priorité, canal publicitaire), suivi des
contrats d’énergie pour les professionnels et les collectivités. Partout en France, à distance.

Chaîne visée : **Publicité Meta / Google → accueil ou page profil → fiche (qualification) → scoring → CRM MENS → alerte WhatsApp du conseiller → rappel sous 24 h → signature en ligne chez le fournisseur**.

- Stack : **Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · lucide-react**
- Aucune librairie d'animation : apparitions et micro-interactions en CSS (+ IntersectionObserver), `prefers-reduced-motion` respecté.
- Police Inter (charte) auto-hébergée et préchargée — aucun appel à Google Fonts.

> Avant la mise en ligne : lire **[WCE_CONTENT_TO_VALIDATE.md](./WCE_CONTENT_TO_VALIDATE.md)** et la
> [checklist avant production](#checklist-avant-production).

---

## Outils IA du projet

Le dossier `.claude/` contient les outils utilisés pour faire évoluer le site avec Claude Code : **Impeccable** (design, détecteur anti-« look IA »), **Ponytail** (sobriété du code), **Graphify** (graphe du code) et les skills Anthropic `frontend-design` et `webapp-testing`. Voir `CLAUDE.md`. Aucun impact sur le site en production.

---

## Installation

Prérequis : Node.js ≥ 20.9 (testé avec Node 22).

```bash
npm install
cp .env.example .env.local      # puis compléter
npm run dev                     # http://localhost:3000
```

| Commande | Rôle |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` / `npm start` | Build et serveur de production |
| `npm run lint` · `npm run typecheck` | ESLint · TypeScript |
| `npm run check:content` | Liste tous les contenus `pending_validation` / `TODO_WCE_VALIDATION` du code |
| `npm run qa:screens -- http://localhost:3000 qa-screens` | Contrôle visuel : captures 375 / 390 / 430 / 768 / 1024 / 1440 px, débordements, textes tronqués, cibles tactiles, erreurs console, accueil + 3 pages profil, parcours complet de la fiche + formulaire de rappel |
| `node scripts/build-og.mjs` | Régénère l'image de partage `public/og-we-care-energie.jpg` |
| `python3 scripts/build-logo.py` | Régénère les SVG du logo corrigé (`pip install fonttools uharfbuzz`) |

`npm run qa:screens` utilise Playwright (déjà en devDependency) ; installer un navigateur une fois avec `npx playwright install chromium` si nécessaire.

---

## Architecture

```
app/
  layout.tsx              métadonnées SEO, JSON-LD Organization + WebSite, police, providers
  page.tsx                landing (sections) + JSON-LD FAQPage
  api/lead/route.ts       réception des leads → validation → scoring → CRM / WhatsApp / Meta CAPI
  interventions/[ville]   pages locales (générées uniquement depuis config/local-pages.ts)
  mentions-legales, confidentialite, cookies
  sitemap.ts, robots.ts, manifest.ts, icon.png, apple-icon.png
components/
  brand/      Logo (PNG fourni par le client, en attendant le SVG)
  etude/      StudySheet (fiche par étapes), DossierHero, Dossier (sommaire + rubriques A → D), DossierEntries, ProfilePage
  layout/     Header (sticky, bouton selon la page), Footer, MobileActionBar, LegalPage
  sections/   WhyUs, GoogleReviews, Callback, Faq, Contact
  forms/      Field (champs accessibles), CallbackForm
  analytics/  AnalyticsProvider (UTM, consentement, délégation des clics), ConsentBanner
  ui/         Button, Container, SectionHeading, Pending
config/       ← toute l'information métier, rien n'est dupliqué ailleurs
  company.ts  identité, NAP, légal, WhatsApp, réseaux (source unique)
  services.ts segments, offres (PAC à confirmer), cartes, parcours
  jawabot.ts  questions de la fiche par profil (données pures)
  dossiers.ts contenu des pages profil : titre, sommaire, rubriques A → D
  proofs.ts, faq.ts, positioning.ts, navigation.ts, site.ts, tracking.ts, local-pages.ts
  validation.ts  système pending_validation / [À CONFIRMER AVEC LE CLIENT]
lib/
  analytics.ts   track() unique → dataLayer (GTM), gtag (GA4), fbq (Meta), event_id
  utm.ts         capture UTM / gclid / fbclid, session + first-touch
  lead.ts        modèle de lead, validation, résumé du conseiller, message WhatsApp
  scoring.ts     score 0-100 → chaud / tiède / froid
  consent.ts     consentement cookies (CNIL)
  schema.ts      données structurées schema.org
  jawabot/engine.ts   moteur de la fiche (reducer pur : réponses, retour à une rubrique, envoi)
  jawabot/adapter.ts  point d'extension backend (Knowledge Base / IA en V2)
  server/integrations.ts  webhooks CRM + alerte WhatsApp + Meta Conversions API
```

### Parcours de conversion

- **Accueil + une page par profil** (`/particuliers`, `/professionnels`, `/collectivites`) : chaque page ouvre sur la fiche du profil, puis le dossier (sommaire en 5 étapes + rubriques « Ce que nous étudions / Ce que vous préparez / Qui vous rappelle / Ce que vous recevez »), la FAQ du profil et le rappel. Bouton principal et barre mobile reprennent le libellé du profil.
- **Fiche** (`components/etude/StudySheet.tsx`) : formulaire par étapes intégré à la page (pas de fenêtre, pas de chat). Chaque rubrique se remplit en place, « Modifier » revient à une rubrique, progression « n/N », consentement explicite → `/api/lead` → fiche « Transmise » proposant **ensuite** WhatsApp (message pré-rempli avec la référence du lead) ou l'appel. Questions pilotées par `config/jawabot.ts`.
- **Formulaire express** « Vous préférez être rappelé ? » en version courte (profil, nom, téléphone, moment, consentement, anti-spam). Si la fiche a été commencée, le profil et ses réponses (code postal, projet…) sont repris et joints à la demande.
- Paramètre de campagne `?profil=particulier|professionnel|collectivite` : présélectionne le profil dans la fiche de l’accueil (utile pour des annonces Meta ciblées).

### Leads → CRM → WhatsApp du conseiller

`POST /api/lead` valide (téléphone FR normalisé en +33, code postal, consentement), calcule le score,
construit le résumé pour le conseiller puis envoie en parallèle :

1. `CRM_WEBHOOK_URL` : `{ type: "wce_lead", pipelineStage: "nouveau", lead }` — lead complet avec UTM, first-touch, consentement horodaté, `event_id`.
2. `LEAD_NOTIFY_WEBHOOK_URL` : `{ text, leadId, temperature, lead }` — `text` est le message court prêt à envoyer au conseiller (format UI Kit : besoin, score, contact, source, action).
3. Meta Conversions API (si `META_CAPI_TOKEN` et consentement publicité) : événement `Lead` dédupliqué avec le Pixel via `event_id`.
4. **WhatsApp direct** (si `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_NOTIFY_TO`) : message au(x) conseiller(s) via l'API officielle WhatsApp Business Cloud — `lib/server/whatsapp.ts`.

Le lead est considéré comme transmis dès qu'**une** destination l'a reçu ; sinon, relais WhatsApp par le visiteur (ci-dessous).

#### Leads → WhatsApp du conseiller : mise en place (une fois)

1. **Numéro expéditeur.** Un numéro dédié à WE CARE ÉNERGIE (nouvelle SIM ou numéro fixe/virtuel capable de recevoir un SMS ou un appel), **différent du numéro personnel du conseiller** : un numéro déjà utilisé dans l'application WhatsApp ne peut pas servir d'expéditeur API sans être retiré de l'application. Le conseiller continue de recevoir sur son numéro habituel.
2. **Meta Business** (business.facebook.com) → *Comptes WhatsApp* → ajouter le numéro expéditeur ; puis *developers.facebook.com* → application de type « Business » → produit **WhatsApp** → noter le **Phone number ID**.
3. **Jeton permanent** : *Paramètres de l'entreprise → Utilisateurs système* → créer un utilisateur système administrateur → lui attribuer l'application et le compte WhatsApp → *Générer un jeton* avec les permissions `whatsapp_business_messaging` et `whatsapp_business_management` (expiration : jamais).
4. **Modèle de message** : *WhatsApp Manager → Modèles de message → Créer* — catégorie **Utilité**, nom `nouveau_lead_wce`, langue **Français**, corps :

   ```
   Nouveau lead WE CARE ÉNERGIE — {{1}}
   Nom : {{2}}
   Téléphone : {{3}}
   Demande : {{4}}
   À faire : {{5}}
   Réf. {{6}}
   ```

   Exemples demandés par Meta : `Particulier` · `Jean Dupont` · `06 12 34 56 78` · `Demande : Réduire ma facture · Fournisseur actuel : EDF` · `Rappeler — le matin (9h–12h)` · `WCE-20260101-ABCD`. Le modèle est indispensable : sans lui, WhatsApp n'accepte un message que si le destinataire a écrit au numéro expéditeur dans les 24 h précédentes.
5. **Variables chez l'hébergeur** (Vercel → *Settings → Environment Variables*, environnement *Production*) : `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_NOTIFY_TO=33612345678` (plusieurs destinataires séparés par des virgules), `WHATSAPP_TEMPLATE_NAME=nouveau_lead_wce`, `WHATSAPP_TEMPLATE_LANG=fr` — puis **redéployer**.
6. **Tester** : `npm run test:whatsapp` avec les mêmes variables (message « TEST » au conseiller), puis une vraie demande depuis le site : le message doit arriver en quelques secondes, et les journaux Vercel affichent `[lead] transmis … whatsapp: true`.

Tant que le compte Meta n'est pas vérifié, l'envoi reste possible mais limité (quelques centaines de conversations par jour : largement suffisant pour une landing).

Signature optionnelle : en-tête `X-WCE-Signature = sha256(LEAD_WEBHOOK_SECRET + corps)`.
**Relais WhatsApp par le visiteur** : si aucune destination n'est configurée, ou si toutes échouent, le lead complet est journalisé et la fiche se termine sur « Dernière étape : envoyez votre fiche » — un bouton ouvre WhatsApp vers le numéro de WE CARE ÉNERGIE avec la demande déjà rédigée (sans le score interne). La fiche ne passe à « Transmise » qu'après cet appui. Sans numéro WhatsApp configuré (`NEXT_PUBLIC_WHATSAPP_NUMBER`), ce relais est impossible : le visiteur voit alors une erreur plutôt qu'une fausse confirmation. Aucune demande ne se termine donc sans être partie vers le conseiller.

### Avis Google

`components/sections/GoogleReviews.tsx` affiche la note, le nombre d'avis et jusqu'à 5 avis de la fiche
Google de WE CARE ÉNERGIE (3 sur mobile), avec l'auteur et le lien vers Google, sur l'accueil et les pages profil.
Les données viennent de l'**API officielle Google Places (New)**, rafraîchies une fois par jour ; rien
n'est recopié à la main. Sans configuration, la section n'apparaît pas en production.

1. Google Cloud Console → créer un projet → activer **Places API (New)** → créer une **clé API**,
   restreinte à cette API (facturation à activer ; l'usage d'une landing reste dans le quota gratuit mensuel).
2. Trouver l'**identifiant de la fiche** : outil « Place ID Finder » de Google (rechercher « WE CARE ÉNERGIE »).
3. Chez l'hébergeur : `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID`, et `NEXT_PUBLIC_GOOGLE_BUSINESS_URL`
   (lien public de la fiche), puis redéployer.

Pas de balisage `aggregateRating` schema.org : Google ne l'accepte pas pour des avis de sa propre plateforme
affichés sur le site de l'entreprise.

### Analytics

Un seul point d'entrée : `track(event, params)` dans `lib/analytics.ts`. Les composants ne contiennent
aucun appel à gtag/fbq ; les clics téléphone / WhatsApp sont captés par délégation (`data-track`).

| Événement | Déclencheur | Meta |
|---|---|---|
| `view_landing` | chargement | (PageView du Pixel) |
| `select_segment` | choix du profil (fiche de l’accueil) | custom |
| `start_jawabot` | première réponse dans la fiche | custom |
| `jawabot_step` | chaque réponse (`step_id`, `step_index`) | custom |
| `qualified_lead` | fiche envoyée (+ `generate_lead` GA4) | `Lead` |
| `submit_callback` | formulaire de rappel envoyé (+ `generate_lead`) | `Lead` |
| `click_whatsapp` / `click_phone` | clic sur un lien WhatsApp / tel: | `Contact` |
| `appointment_request` | « Convenir d’un rendez-vous » choisi dans la fiche | `Schedule` |

Chaque événement porte les paramètres UTM de la session. Consent Mode v2 (tout refusé par défaut) ;
GTM / GA4 / Pixel ne sont chargés qu'après accord.

---

## Variables d'environnement

Voir `.env.example`.

| Variable | Côté | Obligatoire en prod | Rôle |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | public | **oui** | URL canonique (sans `/` final) |
| `NEXT_PUBLIC_SITE_ENV` | public | **oui** = `production` | Masque les placeholders, autorise l'indexation, exige un connecteur de lead |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | public | **oui** | Numéro WhatsApp qui reçoit les demandes (ex. `33612345678`) |
| `NEXT_PUBLIC_PHONE_E164` | public | **oui** | Téléphone affiché, qui est aussi le numéro qui rappelle (ex. `+33612345678`) ; vide = non affiché |
| `NEXT_PUBLIC_JAWABOT_WIDGET_KEY` | public | — | Clé du widget Jawabot ; vide = widget désactivé |
| `NEXT_PUBLIC_GTM_ID` | public | — | Google Tag Manager (`GTM-XXXX`) |
| `NEXT_PUBLIC_GA4_ID` | public | — | GA4 direct si pas de GTM (`G-XXXX`) |
| `NEXT_PUBLIC_META_PIXEL_ID` | public | — | Meta Pixel |
| `NEXT_PUBLIC_GSC_VERIFICATION` | public | — | Balise Google Search Console |
| `NEXT_PUBLIC_ANALYTICS_DEBUG` | public | — | `true` : journalise les événements en console |
| `CRM_WEBHOOK_URL` | serveur | **oui** (ou le suivant) | Webhook CRM |
| `LEAD_NOTIFY_WEBHOOK_URL` | serveur | **oui** (ou le précédent) | Alerte WhatsApp du conseiller |
| `LEAD_WEBHOOK_SECRET` | serveur | recommandé | Signature des webhooks |
| `META_PIXEL_ID`, `META_CAPI_TOKEN` | serveur | — | Meta Conversions API |
| `META_CAPI_TEST_CODE` | serveur | — | Code de test Meta (vide en prod) |

Les variables `NEXT_PUBLIC_*` sont figées au build : relancer un build après modification.

---

## Déploiement

### Vercel (recommandé)

1. Importer le repository `wecareenergy` dans Vercel (framework détecté : Next.js ; aucune configuration de build à modifier).
2. Déclarer les variables d'environnement :
   - **Production** : `NEXT_PUBLIC_SITE_ENV=production`, `NEXT_PUBLIC_SITE_URL=https://<domaine>` + connecteurs.
   - **Preview** : `NEXT_PUBLIC_SITE_ENV=preview` (placeholders visibles, `noindex`).
3. Ajouter le domaine, forcer HTTPS, rediriger `www` ↔ apex selon le choix retenu.
4. Déployer, puis dérouler la checklist ci-dessous.

### Autre hébergeur Node

```bash
npm ci && npm run build
NODE_ENV=production PORT=3000 npm start
```

Derrière un reverse proxy (Nginx / Caddy) avec HTTPS. La route `/api/lead` nécessite un runtime Node
(pas d'export statique). La limitation anti-abus de l'API est en mémoire par instance : suffisante pour
une landing ; utiliser un store partagé si plusieurs instances.

---

## Checklist avant production

**Contenu & conformité**
- [ ] Tous les points bloquants de `WCE_CONTENT_TO_VALIDATE.md` (§1) traités ; `npm run check:content` relu.
- [ ] Logo source (SVG) fourni par le client et intégré dans `public/brand/`.
- [ ] Relecture juridique : mentions légales (activité de courtage), confidentialité, FAQ, texte de consentement.
- [ ] Aucune allégation chiffrée (« -30 % »…), qualification (RGE…), avis ou fournisseur partenaire affiché sans preuve.
- [ ] Aucune photo publiée tant que de vraies photos d’installations ne sont pas fournies.

**Configuration**
- [ ] `NEXT_PUBLIC_SITE_ENV=production` et `NEXT_PUBLIC_SITE_URL` renseignés, build relancé.
- [ ] Aucun badge « [À CONFIRMER AVEC LE CLIENT] » visible en production.
- [ ] `robots.txt` autorise l'indexation, `sitemap.xml` pointe vers le bon domaine.
- [ ] Connecteur CRM et alerte WhatsApp testés de bout en bout (fiche **et** formulaire de rappel) : lead reçu, résumé lisible, score, UTM présents.
- [ ] Numéro WhatsApp correct (message pré-rempli reçu avec la référence du lead).

**Mesure**
- [ ] GTM / GA4 : événements visibles en DebugView ; `generate_lead` marqué comme conversion.
- [ ] Meta Pixel + CAPI : `Lead` dédupliqué (même `event_id`) dans le Gestionnaire d'événements.
- [ ] Bannière cookies : refuser = aucun traceur chargé (vérifier l'onglet Réseau).
- [ ] Search Console : propriété validée, sitemap soumis.
- [ ] Fiche Google Business : même NAP que le site (nom, adresse, téléphone), lien vers le site.
- [ ] Test d'une annonce avec `?utm_source=facebook&utm_medium=paid&utm_campaign=...` → UTM présents dans le lead CRM.

**Qualité**
- [ ] `npm run lint`, `npm run typecheck`, `npm run build` sans erreur.
- [ ] `npm run qa:screens` : 0 problème sur 4 pages × 6 largeurs, fiche et rappel OK.
- [ ] Lighthouse mobile (Performance, Accessibilité, SEO, Bonnes pratiques) sur l'URL de production.
- [ ] Test réel sur iPhone et Android (Safari / Chrome) : barre d'action, fiche au clavier virtuel, appel.
