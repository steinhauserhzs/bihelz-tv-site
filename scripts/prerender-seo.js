#!/usr/bin/env node
/* ============================================================
   Pré-render de SEO — injeta no index.html o conteúdo estático
   (crawlable) gerado a partir de assets/js/data.js. O app.js
   continua como enhancement: as funções render* usam setContent()
   (limpa+reconstrói), então o HTML estático é SUBSTITUÍDO no
   cliente — crawler sem JS lê o texto, usuário com JS vê a UI.
   Fonte única = data.js. Re-executável (usa marcadores seo:auto).
   Uso: node scripts/prerender-seo.js
   ============================================================ */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const dataFile = path.join(ROOT, "assets/js/data.js");
const indexFile = path.join(ROOT, "index.html");

/* ---- carrega os arrays do data.js num sandbox ---- */
const code = fs.readFileSync(dataFile, "utf8") +
  "\n;globalThis.__DATA = {" +
  "NEWS: typeof NEWS!=='undefined'?NEWS:[]," +
  "MVPS: typeof MVPS!=='undefined'?MVPS:[]," +
  "GUIDES: typeof GUIDES!=='undefined'?GUIDES:[]," +
  "ITEMS: typeof ESSENTIAL_ITEMS!=='undefined'?ESSENTIAL_ITEMS:[]," +
  "BUILDS: typeof PRE_BUILDS!=='undefined'?PRE_BUILDS:[]};";
const ctx = { window: {}, document: {}, localStorage: {}, navigator: {}, console };
ctx.globalThis = ctx;
vm.createContext(ctx);
vm.runInContext(code, ctx, { filename: "data.js" });
const D = ctx.__DATA;

const esc = (s) => String(s == null ? "" : s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* ---- geradores de HTML estático por container ---- */
const gen = {
  newsList: () => (D.NEWS || []).slice(0, 8).map((n) =>
    `<article class="seo-pre"><h3>${esc(n.title)}</h3><p>${esc(n.text)}</p><p><time datetime="${esc(n.date)}">${esc(n.date)}</time></p></article>`
  ).join("\n"),

  mvpList: () => (D.MVPS || []).map((m) =>
    `<article class="seo-pre"><h3>${esc(m.name)} — MVP de Ragnarok Online LATAM</h3>` +
    `<p>Mapa: ${esc(m.map)} · Elemento: ${esc(m.element)}${m.elv ? " nível " + esc(m.elv) : ""} · Tamanho: ${esc(m.size)} · Raça: ${esc(m.race)} · Nível ${esc(m.min)}–${esc(m.max)}.</p></article>`
  ).join("\n"),

  guideList: () => (D.GUIDES || []).map((g) =>
    `<article class="seo-pre"><h3>${esc(g.title)}</h3>${g.html || ""}</article>`
  ).join("\n"),

  itemGrid: () => (D.ITEMS || []).map((it) =>
    `<div class="seo-pre"><h4>${esc(it.nome)}</h4><p>${esc(it.tipo)}${it.efeito ? " — " + esc(it.efeito) : ""}</p></div>`
  ).join("\n"),

  buildList: () => (D.BUILDS || []).map((b) =>
    `<article class="seo-pre"><h3>${esc(b.nome)} — ${esc(b.classe)}</h3><p>Foco: ${esc(b.foco)}. ${esc(b.stats)}</p></article>`
  ).join("\n"),
};

/* ---- injeta entre marcadores dentro de cada container ---- */
function inject(html, id, content) {
  const wrapped = `<!--seo:auto-->\n${content}\n<!--/seo:auto-->`;
  const stripRe = new RegExp(`(id="${id}"[^>]*>)<!--seo:auto-->[\\s\\S]*?<!--/seo:auto-->`);
  if (stripRe.test(html)) return html.replace(stripRe, `$1${wrapped}`);
  const emptyRe = new RegExp(`(id="${id}"[^>]*>)(</div>)`);
  if (emptyRe.test(html)) return html.replace(emptyRe, `$1${wrapped}$2`);
  throw new Error(`container #${id} não encontrado/injetável`);
}

let html = fs.readFileSync(indexFile, "utf8");
const counts = {};
for (const id of Object.keys(gen)) {
  const content = gen[id]();
  counts[id] = (content.match(/<(article|div)/g) || []).length;
  html = inject(html, id, content);
}
fs.writeFileSync(indexFile, html);
console.log("Pré-render OK:", JSON.stringify(counts));
