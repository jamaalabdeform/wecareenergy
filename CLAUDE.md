# We Care Energy — consignes pour Claude Code

> Ce dépôt part du site WE CARE ÉNERGIE (projet terminé et en production) pour créer le site **We Care Energy**.
> Lire d'abord `_kit/PROMPT_CLAUDE_CODE.md`, `_kit/BRIEF_WE_CARE_ENERGY.md` et `_kit/PLAN_DE_TRAVAIL.md`.
> Le dossier de référence du site d'origine, dans `_kit/`, contient les documents d'origine : modèle à adapter, jamais à recopier tel quel.

## Outils à utiliser systématiquement

- **Impeccable** (`/impeccable`, `.claude/skills/impeccable`) : obligatoire pour tout travail de design / UI.
  Le site ne doit jamais « faire IA ». Après toute modification d'interface, lancer le détecteur sur la page rendue :
  `IMPECCABLE_BROWSER=<chromium --no-sandbox> .claude/skills/impeccable/scripts/impeccable detect --json http://localhost:3000/`.
  La charte du client (couleurs, police, logo) prime sur les avertissements génériques.
- **Ponytail** (`/ponytail`) : solution la plus simple qui fonctionne, pas de dépendance ni d'abstraction inutile.
- **Graphify** (`graphify query "…"`) : interroger le graphe du code avant d'explorer les fichiers ; `graphify update .` après modification.
- **Skills Anthropic** : `frontend-design` (direction visuelle) et `webapp-testing` (tests Playwright).

Les outils sont réinstallés automatiquement au démarrage des sessions web (`.claude/hooks/session-start.sh`).

## Règles métier

- Ne rien inventer : toute donnée non confirmée par le client passe par `pending()` (`config/validation.ts`)
  et `WCE_CONTENT_TO_VALIDATE.md`.
- Logo : uniquement les fichiers fournis par le client (`public/brand/`). Jamais de faux logo présenté comme officiel.
- Aucune promesse « 1 € », « gratuit », « 100 % financé » ; aides toujours « selon conditions d'éligibilité ».
- Avant chaque push : `npm run typecheck && npm run lint && npm run build && npm run check:rebrand && npm run qa:screens`.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
