/**
 * Vérifie qu'il ne reste aucune trace du projet d'origine (HDF Bâti) dans le site.
 *   npm run check:rebrand          → échoue (code 1) s'il reste une occurrence bloquante
 * Les mentions « à vérifier » (zone géographique) sont listées sans faire échouer.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const SKIP_DIRS = new Set(["node_modules", ".next", ".git", ".claude", "_kit", "graphify-out"]);
const SKIP_FILES = new Set(["package-lock.json", "scripts/check-rebrand.mjs"]);
const EXT = /\.(tsx?|mjs|cjs|js|json|css|md|svg|txt|example)$/;

const BLOCKING = [
  [/hdf/i, "nom ou jeton « hdf »"],
  [/b[âa]ti\b/i, "« Bâti »"],
  [/farid/i, "prénom du dirigeant d'origine"],
  [/anzin/i, "ville d'origine"],
  [/anatole/i, "adresse d'origine"],
  [/925\s?387\s?680/, "SIREN d'origine"],
  [/0?6[\s.]?01[\s.]?45[\s.]?11[\s.]?10|33601451110/, "téléphone d'origine"],
  [/xBE36dihMVkMGd6NA/, "fiche Google d'origine"],
];
const REVIEW = [[/hauts-de-france|valenciennes|nord\b|pas-de-calais/i, "zone géographique d'origine : à confirmer pour le nouveau client"]];

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (!SKIP_DIRS.has(name)) yield* walk(p);
    } else yield p;
  }
}

let blocking = 0;
const files = [];
for (const p of walk(ROOT)) {
  const rel = relative(ROOT, p).replaceAll("\\", "/");
  if (SKIP_FILES.has(rel)) continue;
  if (/\.(png|jpe?g|webp|ico|woff2?)$/i.test(rel)) {
    if (/hdf/i.test(rel)) { console.log(`✗ ${rel} — fichier image/police au nom d'origine`); blocking++; }
    continue;
  }
  if (!EXT.test(rel)) continue;
  if (/hdf/i.test(rel)) { console.log(`✗ ${rel} — nom de fichier d'origine`); blocking++; }
  readFileSync(p, "utf8").split("\n").forEach((line, i) => {
    for (const [re, why] of BLOCKING) if (re.test(line)) { console.log(`✗ ${rel}:${i + 1} — ${why} : ${line.trim().slice(0, 110)}`); blocking++; }
    for (const [re, why] of REVIEW) if (re.test(line)) files.push(`? ${rel}:${i + 1} — ${why}`);
  });
}
if (files.length) console.log("\nÀ vérifier :\n" + files.join("\n"));
console.log(blocking ? `\n${blocking} occurrence(s) bloquante(s).` : "\nAucune trace bloquante du projet d'origine.");
process.exit(blocking ? 1 : 0);
