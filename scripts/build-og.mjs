/** Génère public/og-we-care-energie.jpg (1200×630) : logo, titre et fiche, sans photo.  node scripts/build-og.mjs */
import { chromium } from "playwright";
import fs from "node:fs";

const b64 = (p) => fs.readFileSync(p).toString("base64");
const logo = `data:image/png;base64,${b64("public/brand/we-care-energie-logo.png")}`;
const font = `data:font/woff2;base64,${b64("app/inter-latin-wght.woff2")}`;

const html = `<!doctype html><html><head><style>
@font-face{font-family:Inter;src:url(${font}) format("woff2");font-weight:100 900}
*{margin:0;box-sizing:border-box}body{width:1200px;height:630px;font-family:Inter;background:#0C2C47;display:flex;overflow:hidden}
.l{width:640px;padding:56px 56px;display:flex;flex-direction:column;justify-content:space-between;color:#fff}
.plate{background:#fff;border-radius:8px;padding:14px 20px;width:fit-content}.logo{width:300px;display:block}
h1{font-size:58px;line-height:1.05;letter-spacing:-.03em;font-weight:750}
h1 span{color:#7DBE5E}
p{margin-top:20px;font-size:24px;line-height:1.4;color:rgba(255,255,255,.84)}
.chips{display:flex;gap:10px}.chips b{font-size:15px;letter-spacing:.12em;text-transform:uppercase;padding:9px 16px;border-radius:4px;background:rgba(255,255,255,.1)}
.r{flex:1;padding:64px 56px 0 0;display:flex;align-items:flex-start}
.sheet{width:100%;background:#fff;border-radius:6px;color:#13263A;padding:26px 30px}
.hd{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #DAE5EE;padding-bottom:14px}
.hd b{font-size:20px;color:#0C2C47}.st{font-size:13px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#1A6BA8;border:2px solid #1A6BA8;border-radius:3px;padding:3px 8px}
.ticks{display:flex;gap:5px;margin:18px 0 8px}.ticks i{flex:1;height:7px;border-radius:1px;background:#DAE5EE}.ticks i.f{background:#1A6BA8}.ticks i.a{background:#7DBE5E}
.row{display:flex;gap:14px;align-items:baseline;border-top:1px solid #DAE5EE;padding:13px 0;font-size:19px}
.row .n{width:30px;color:#1A6BA8;font-weight:700;font-variant-numeric:tabular-nums}.row .k{color:#46596B}.row .d{flex:1;border-bottom:2px dotted rgba(12,44,71,.3);transform:translateY(-5px)}.row .v{font-weight:650;color:#0C2C47}
</style></head><body><div class="l"><span class="plate"><img class="logo" src="${logo}"></span><div><h1>Votre énergie,<br><span>au juste prix.</span></h1><p>Un conseiller compare les offres d’électricité<br>et de gaz pour vous. Sans engagement.</p></div><div class="chips"><b>Particuliers</b><b>Pros</b><b>Collectivités</b></div></div><div class="r"><div class="sheet"><div class="hd"><b>Fiche</b><span class="st">À compléter</span></div><div class="ticks"><i class="f"></i><i class="f"></i><i class="f"></i><i class="a"></i><i></i><i></i><i></i><i></i></div><div class="row"><span class="n">01</span><span class="k">Demande</span><span class="d"></span><span class="v">Réduire ma facture</span></div><div class="row"><span class="n">02</span><span class="k">Énergie</span><span class="d"></span><span class="v">Électricité et gaz</span></div><div class="row"><span class="n">03</span><span class="k">Fournisseur actuel</span><span class="d"></span><span class="v">EDF</span></div><div class="row"><span class="n">04</span><span class="k">Facture mensuelle</span><span class="d"></span></div><div class="row"><span class="n">05</span><span class="k">Logement</span><span class="d"></span></div></div></div></body></html>`;

const opts = fs.existsSync("/opt/pw-browsers/chromium") ? { executablePath: "/opt/pw-browsers/chromium" } : {};
const browser = await chromium.launch(opts);
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: "load" });
await page.waitForTimeout(300);
await page.screenshot({ path: "public/og-we-care-energie.jpg", type: "jpeg", quality: 86 });
await browser.close();
console.log("public/og-we-care-energie.jpg");
