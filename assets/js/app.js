/* ============================================================
   BIHELZ TV — APP v2 "Laboranok"
   Router SPA + YouTube (live + chat) + login Google + notícias + party +
   trade + timer de MVP + Lab do Cientista + efeitos 3D.
   Segurança: conteúdo de input do usuário é montado com
   createElement/textContent (nunca interpretado como HTML);
   frag() só recebe templates estáticos de data.js.
   ============================================================ */

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

/* Fragmento de HTML — usar SOMENTE com templates estáticos de data.js */
const frag = (html) => document.createRange().createContextualFragment(html);

/* Construtor de nós seguro para conteúdo do usuário */
function el(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
}
function clearNode(node) { while (node.firstChild) node.removeChild(node.firstChild); }
function setContent(node, ...children) { clearNode(node); children.forEach((c) => node.append(c)); }

/* ---------- Toast estilo mensagem de sistema ---------- */
let toastTimer;
function toast(msg) {
  const t = $("#sysToast");
  t.textContent = `[Sistema] ${msg}`;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
}

async function copyText(text, okMsg) {
  try { await navigator.clipboard.writeText(text); toast(okMsg); }
  catch { toast("Não consegui copiar — copie manualmente."); }
}

/* ---------- Router (hash) ---------- */
const ROUTES = ["home", "noticias", "party", "mercado", "mvp", "lab", "buscar", "blog", "database", "nostalgia", "guias", "comunidade", "admin"];
function route() {
  let h = (location.hash || "#home").slice(1);
  if (!ROUTES.includes(h)) h = "home";
  $$(".page").forEach((p) => p.classList.toggle("active", p.id === h));
  $$("[data-nav]").forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + h));
  if (h === "admin" && typeof renderAdmin === "function") renderAdmin();
  if (h === "blog" && typeof loadBlog === "function") loadBlog();
  window.scrollTo({ top: 0 });
}
addEventListener("hashchange", route);

/* ---------- Utilidades ---------- */
const fmtDate = (iso) => { const [y, m, d] = iso.split("-"); return `${d}/${m}/${y}`; };
const fmtZeny = (n) => Number(n).toLocaleString("pt-BR");
const load = (key, seed) => {
  try { const v = localStorage.getItem(key); if (v) return JSON.parse(v); } catch {}
  localStorage.setItem(key, JSON.stringify(seed));
  return structuredClone(seed);
};
const save = (key, val) => localStorage.setItem(key, JSON.stringify(val));
const uuid = () => (crypto.randomUUID ? crypto.randomUUID() : "id" + Date.now() + Math.floor(performance.now()));

/* ============================================================
   CAMADA DE DADOS — Supabase (quadros compartilhados) ou local
   Cria o client só se a anon key estiver configurada; caso
   contrário tudo cai pra localStorage e o site funciona igual.
   Deleção segura: cada post guarda um delete_token (uuid) gerado
   no cliente e salvo localmente — só quem publicou consegue
   remover, via RPC delete_own_post.
   ============================================================ */
const SB = (() => {
  try {
    const cfg = window.SUPA_CONFIG;
    if (cfg && cfg.anonKey && cfg.url && typeof supabase !== "undefined" && supabase.createClient) {
      return supabase.createClient(cfg.url, cfg.anonKey, { auth: { persistSession: false } });
    }
  } catch {}
  return null;
})();
const CLOUD = !!SB;

/* Guarda os tokens dos posts criados NESTE navegador: { id: token } */
const tokenStore = {
  get: (k) => load(k, {}),
  put(k, id, token) { const m = load(k, {}); m[id] = token; save(k, m); },
  del(k, id) { const m = load(k, {}); delete m[id]; save(k, m); },
};

/* ============================================================
   EFEITOS 3D — tilt de janelas + parallax do hero
   ============================================================ */
const FINE_POINTER = matchMedia("(hover:hover) and (pointer:fine)").matches;
const REDUCED = matchMedia("(prefers-reduced-motion:reduce)").matches;

function initTilt() {
  if (!FINE_POINTER || REDUCED) return;
  $$(".tilt").forEach((card) => {
    let raf = null;
    card.addEventListener("pointermove", (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const r = card.getBoundingClientRect();
        const dx = (e.clientX - r.left) / r.width - 0.5;
        const dy = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${(-dy * 7).toFixed(2)}deg) rotateY(${(dx * 9).toFixed(2)}deg) translateZ(2px)`;
        card.classList.add("is-tilting");
      });
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
      card.classList.remove("is-tilting");
    });
  });
}

function initHeroParallax() {
  const hero = $("#heroBanner"), bg = $("#heroBg");
  if (!hero || !bg) return;
  // partículas douradas subindo (motes)
  if (!REDUCED) {
    const POS = [8, 22, 37, 51, 66, 79, 91, 15, 58, 84];
    POS.forEach((left, i) => {
      const m = el("span", "mote");
      const size = 3 + (i % 4) * 2;
      m.style.cssText = `left:${left}%;bottom:${(i * 7) % 30}%;width:${size}px;height:${size}px;animation-duration:${5 + (i % 5) * 1.6}s;animation-delay:${(i % 7) * 0.9}s`;
      hero.append(m);
    });
  }
  if (!FINE_POINTER || REDUCED) return;
  hero.addEventListener("pointermove", (e) => {
    const r = hero.getBoundingClientRect();
    const dx = (e.clientX - r.left) / r.width - 0.5;
    const dy = (e.clientY - r.top) / r.height - 0.5;
    bg.style.setProperty("--px", `${(-dx * 18).toFixed(1)}px`);
    bg.style.setProperty("--py", `${(-dy * 12).toFixed(1)}px`);
  });
  hero.addEventListener("pointerleave", () => {
    bg.style.setProperty("--px", "0px");
    bg.style.setProperty("--py", "0px");
  });
}

/* ============================================================
   DIÁLOGO DO NPC (home)
   ============================================================ */
const NPC_MSGS = [
  "Poring! Bem-vindo ao Laboranok do Ragnatório, aventureiro! ♪",
  "Aqui tem notícia diária, party, trade, timer de MVP... e o meu laboratório novinho, poring!",
  "Aperta F6 pra entrar no Lab do Cientista: Farmacologia Especial, homúnculos e tabela elemental!",
  "As lives do Bihelz rolam no YouTube — dá pra assistir e usar o chat aqui do site!",
  "As inscrições do Stars LATAM 2026 fecham dia 20/07... monta tua equipe, poring!",
  "Agora segue o Bihelz e entra no Discord... ou eu misturo você num frasco! ♪",
];
let npcIdx = 0, npcTyping = null;
function npcSay(i) {
  const node = $("#npcText");
  const msg = NPC_MSGS[i % NPC_MSGS.length];
  clearInterval(npcTyping);
  node.textContent = "";
  let c = 0;
  npcTyping = setInterval(() => {
    node.textContent = msg.slice(0, ++c);
    if (c >= msg.length) clearInterval(npcTyping);
  }, 22);
}

/* ============================================================
   YOUTUBE — player, detecção de live e chat da live
   Com CANAL.youtubeApiKey: detecta a live atual (videoId) e
   embeda o CHAT REAL do YouTube (os usuários interagem com a
   própria conta do YouTube). Sem a key: player do canal + link.
   ============================================================ */
let liveVideoId = null;
const YT_CACHE = "bz_yt_live";
const ytKey = () => (typeof CANAL !== "undefined" && CANAL.youtubeApiKey) || "";

async function detectLive() {
  if (!ytKey()) return null;
  try {
    const c = JSON.parse(localStorage.getItem(YT_CACHE) || "null");
    if (c && Date.now() - c.ts < 4 * 60 * 1000) return c.videoId; // cache 4 min p/ poupar quota
  } catch {}
  try {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CANAL.youtubeChannelId}&eventType=live&type=video&maxResults=1&key=${ytKey()}`;
    const r = await fetch(url);
    if (!r.ok) return null;
    const d = await r.json();
    const videoId = d.items && d.items[0] ? d.items[0].id.videoId : null;
    localStorage.setItem(YT_CACHE, JSON.stringify({ ts: Date.now(), videoId }));
    return videoId;
  } catch { return null; }
}

let statsTimer = null;

async function checkLive() {
  const badge = $("#liveBadge"), txt = $("#liveText");
  if (!ytKey()) { txt.textContent = "YOUTUBE"; badge.classList.remove("is-live"); mountYouTube(); return; }
  liveVideoId = await detectLive();
  const live = !!liveVideoId;
  badge.classList.toggle("is-live", live);
  txt.textContent = live ? "AO VIVO" : "OFFLINE";
  if (live) {
    mountLivePlayer(liveVideoId);        // autoplay a 25% via IFrame API
    $("#unmuteBtn").classList.remove("hide");
    fetchLiveStats(liveVideoId);
    if (!statsTimer) statsTimer = setInterval(() => fetchLiveStats(liveVideoId), 60000);
  } else {
    mountYouTube();                       // player do canal (sem stats)
    $("#unmuteBtn").classList.add("hide");
    $("#liveStats").classList.add("hide");
    if (statsTimer) { clearInterval(statsTimer); statsTimer = null; }
  }
  if (!$("#liveChatBox").classList.contains("hide")) mountChat(true);
}

/* embed simples do canal (offline ou sem key) */
function mountYouTube() {
  const f = document.createElement("iframe");
  f.className = "stream-frame";
  f.src = liveVideoId
    ? `https://www.youtube.com/embed/${liveVideoId}`
    : `https://www.youtube.com/embed/live_stream?channel=${CANAL.youtubeChannelId}`;
  f.allowFullscreen = true;
  f.allow = "autoplay; encrypted-media; picture-in-picture";
  f.title = "Live do Bihelz TV no YouTube";
  setContent($("#streamBox"), f);
}

/* ---------- Player com controle de volume (IFrame API) ---------- */
let ytApiPromise = null;
function loadYTApi() {
  if (window.YT && window.YT.Player) return Promise.resolve();
  if (ytApiPromise) return ytApiPromise;
  ytApiPromise = new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => { if (typeof prev === "function") prev(); resolve(); };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  });
  return ytApiPromise;
}

let livePlayer = null, liveUnmuted = false;
async function mountLivePlayer(videoId) {
  await loadYTApi();
  const box = $("#streamBox");
  const holder = el("div"); holder.id = "ytPlayer"; holder.className = "stream-frame";
  setContent(box, holder);
  try {
    livePlayer = new YT.Player("ytPlayer", {
      videoId,
      playerVars: { autoplay: 1, mute: 1, playsinline: 1, modestbranding: 1, rel: 0 },
      events: {
        onReady: (e) => { try { e.target.setVolume(25); e.target.playVideo(); } catch {} armUnmute(); },
      },
    });
  } catch { mountYouTube(); }
}

/* autoplay entra mudo (política do navegador); solta o som a 25%
   no 1º clique/tecla do usuário — e pausa a rádio pra não misturar. */
function armUnmute() {
  if (liveUnmuted) return;
  const go = () => {
    if (!livePlayer) return;
    try { livePlayer.unMute(); livePlayer.setVolume(25); } catch {}
    liveUnmuted = true;
    if (window.BZRadio && window.BZRadio.isPlaying()) window.BZRadio.pause();
    document.removeEventListener("pointerdown", go);
    document.removeEventListener("keydown", go);
  };
  document.addEventListener("pointerdown", go);
  document.addEventListener("keydown", go);
}
function unmuteLive() {
  if (!livePlayer) return toast("Sem live agora.");
  try { livePlayer.unMute(); livePlayer.setVolume(25); livePlayer.playVideo(); } catch {}
  liveUnmuted = true;
  if (window.BZRadio && window.BZRadio.isPlaying()) window.BZRadio.pause();
  toast("Som da live ligado a 25% 🔊");
}

/* ---------- Contador ao vivo (views / curtidas / assistindo) ---------- */
async function fetchLiveStats(videoId) {
  if (!ytKey() || !videoId) return;
  try {
    const r = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails,statistics&id=${videoId}&key=${ytKey()}`);
    if (!r.ok) return;
    const d = await r.json();
    const it = d.items && d.items[0];
    if (!it) return;
    renderLiveStats({
      viewers: it.liveStreamingDetails && it.liveStreamingDetails.concurrentViewers,
      views: it.statistics && it.statistics.viewCount,
      likes: it.statistics && it.statistics.likeCount,
    });
  } catch {}
}
function renderLiveStats(s) {
  const box = $("#liveStats");
  if (!box) return;
  const fmt = (n) => (n == null ? "—" : Number(n).toLocaleString("pt-BR"));
  const stat = (ic, val, lb) => {
    const d = el("div", "live-stat");
    d.append(el("span", "live-stat__ic", ic), el("span", "live-stat__v", fmt(val)), el("span", "live-stat__l", lb));
    return d;
  };
  setContent(box,
    stat("🔴", s.viewers, "assistindo"),
    stat("👁", s.views, "views"),
    stat("👍", s.likes, "curtidas"),
  );
  box.classList.remove("hide");
}

/* ---------- Últimos vídeos / lives do canal (uploads playlist) ---------- */
async function loadYouTubeVideos() {
  const box = $("#ytVideos"), section = $("#ytSection");
  if (!box || !ytKey()) return;
  const CK = "bz_yt_videos";
  let vids = null;
  try { const c = JSON.parse(localStorage.getItem(CK) || "null"); if (c && Date.now() - c.ts < 30 * 60 * 1000) vids = c.vids; } catch {}
  if (!vids) {
    try {
      let up = localStorage.getItem("bz_yt_uploads");
      if (!up) {
        const r = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CANAL.youtubeChannelId}&key=${ytKey()}`);
        const d = await r.json();
        up = d.items && d.items[0] && d.items[0].contentDetails.relatedPlaylists.uploads;
        if (up) localStorage.setItem("bz_yt_uploads", up);
      }
      if (!up) return;
      const r2 = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${up}&maxResults=12&key=${ytKey()}`);
      const d2 = await r2.json();
      vids = (d2.items || []).map((it) => {
        const sn = it.snippet, th = sn.thumbnails || {};
        return { id: sn.resourceId && sn.resourceId.videoId, title: sn.title, date: sn.publishedAt, thumb: (th.medium || th.high || th.default || {}).url };
      }).filter((v) => v.id && v.title !== "Private video" && v.title !== "Deleted video" && v.thumb);
      localStorage.setItem(CK, JSON.stringify({ ts: Date.now(), vids }));
    } catch {}
  }
  if (!vids || !vids.length) return;
  const cards = vids.map((v) => {
    const c = el("button", "vid-card"); c.type = "button";
    const th = el("div", "vid-thumb");
    const img = document.createElement("img"); img.src = v.thumb; img.alt = ""; img.loading = "lazy";
    th.append(img, el("span", "vid-play", "▶"));
    c.append(th, el("div", "vid-title", v.title), el("div", "vid-date", timeago(v.date)));
    c.addEventListener("click", () => openVideoLightbox(v));
    return c;
  });
  setContent(box, ...cards);
  if (section) section.classList.remove("hide");
}

function openVideoLightbox(v) {
  let lb = $("#vidLightbox");
  if (!lb) {
    lb = el("div", "vid-lightbox"); lb.id = "vidLightbox";
    lb.addEventListener("click", (e) => { if (e.target === lb) closeVideoLightbox(); });
    document.body.append(lb);
  }
  const inner = el("div", "vid-lb-inner");
  const close = el("button", "vid-lb-close", "✕"); close.type = "button"; close.addEventListener("click", closeVideoLightbox);
  const f = document.createElement("iframe");
  f.className = "vid-lb-frame";
  f.src = `https://www.youtube.com/embed/${v.id}?autoplay=1&rel=0`;
  f.allow = "autoplay; encrypted-media; picture-in-picture";
  f.allowFullscreen = true;
  f.title = v.title;
  inner.append(close, f, el("div", "vid-lb-title", v.title));
  lb.replaceChildren(inner);
  lb.classList.add("show");
  document.body.style.overflow = "hidden";
  if (window.BZRadio && window.BZRadio.isPlaying()) window.BZRadio.pause();
}
function closeVideoLightbox() {
  const lb = $("#vidLightbox");
  if (lb) { lb.classList.remove("show"); lb.replaceChildren(); }
  document.body.style.overflow = "";
}
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeVideoLightbox(); });

function mountChat(forceShow) {
  const box = $("#liveChatBox"), btn = $("#toggleChat");
  const host = location.hostname;
  if (!liveVideoId) {
    window.open("https://www.youtube.com/@bihelzs/live", "_blank", "noopener");
    toast(ytKey() ? "Sem live agora — abrindo o YouTube." : "Chat embutido precisa da YouTube API key. Abrindo o YouTube por enquanto.");
    return;
  }
  const showing = !box.classList.contains("hide");
  if (showing && !forceShow) { box.classList.add("hide"); btn.textContent = "💬 Chat da live"; return; }
  const f = document.createElement("iframe");
  f.className = "chat-frame";
  f.src = `https://www.youtube.com/live_chat?v=${liveVideoId}&embed_domain=${host}`;
  f.title = "Chat da live do Bihelz TV";
  setContent(box, f);
  box.classList.remove("hide");
  btn.textContent = "💬 Fechar chat";
}

/* ============================================================
   CONTAGEM REGRESSIVA — Stars LATAM (inscrições até 20/07)
   ============================================================ */
const STARS_DEADLINE = new Date("2026-07-20T23:59:59-03:00").getTime();
function tickCountdown() {
  const box = $("#starsCountdown");
  const diff = STARS_DEADLINE - Date.now();
  if (diff <= 0) {
    const p = el("p", null, "Inscrições encerradas — bora torcer! 🏆");
    p.style.cssText = "font-family:var(--f-hud);font-weight:700;color:var(--danger)";
    setContent(box, p);
    return;
  }
  const d = Math.floor(diff / 864e5), h = Math.floor((diff % 864e5) / 36e5);
  const m = Math.floor((diff % 36e5) / 6e4), s = Math.floor((diff % 6e4) / 1e3);
  const units = [["dias", d], ["horas", h], ["min", m], ["seg", s]].map(([u, n]) => {
    const b = el("div", "unit");
    b.append(el("div", "num", String(n).padStart(2, "0")), el("div", "u", u));
    return b;
  });
  setContent(box, ...units);
}

/* ============================================================
   NOTÍCIAS (dados estáticos de data.js — confiáveis)
   ============================================================ */
let newsFilter = "todas";

function newsCard(n) {
  const cat = NEWS_CATS[n.cat] || { label: n.cat, cls: "" };
  const art = el("article", "ro-window news-card");
  const body = el("div", "ro-window__body");
  const meta = el("div", "meta");
  meta.append(el("span", `ro-chip ${cat.cls}`, cat.label), el("span", "date", fmtDate(n.date)));
  const link = el("a", "src", `Fonte: ${n.source} ↗`);
  link.href = n.url; link.target = "_blank"; link.rel = "noopener";
  body.append(meta, el("h3", null, n.title), el("p", null, n.text), link);
  art.append(body);
  return art;
}

function chipButtons(container, items, current, onPick) {
  const nodes = items.map(([key, label]) => {
    const b = el("button", `ro-chip ro-chip--btn${current === key ? " active" : ""}`, label);
    b.type = "button";
    b.addEventListener("click", () => onPick(key));
    return b;
  });
  setContent(container, ...nodes);
}

function emptyState(emoji, text) {
  const win = el("div", "ro-window");
  const box = el("div", "empty-state");
  box.append(el("div", "big", emoji), el("div", null, text));
  win.append(box);
  return win;
}

function renderNews() {
  const cats = [["todas", "Todas"], ...Object.entries(NEWS_CATS).map(([k, v]) => [k, v.label])];
  chipButtons($("#newsFilters"), cats, newsFilter, (k) => { newsFilter = k; renderNews(); });
  const list = newsFilter === "todas" ? NEWS : NEWS.filter((n) => n.cat === newsFilter);
  const target = $("#newsList");
  if (!list.length) return setContent(target, emptyState("🕊️", "Nada por aqui nessa categoria hoje."));
  setContent(target, ...list.map(newsCard));
}

function renderHomeNews() {
  setContent($("#homeNews"), ...NEWS.slice(0, 3).map(newsCard));
  $("#newsUpdated").textContent = fmtDate(NEWS[0].date);
}

/* ============================================================
   JOGAR JUNTO (party finder) — conteúdo do usuário: DOM seguro
   ============================================================ */
const PKEY = "bz_party_posts";
const PTOK = "bz_party_tokens";
let partyPosts = CLOUD ? [] : load(PKEY, SEED_PARTY);
let partyFilter = "Todos";
const OBJETIVOS = ["Todos", "Upar", "MVP", "Instância", "Quest", "WoE/PvP", "Social"];

/* Party: lê da nuvem ou local; normaliza pro shape do site */
async function fetchParty() {
  if (!CLOUD) { partyPosts = load(PKEY, SEED_PARTY); return; }
  const { data, error } = await SB.from("party_posts")
    .select("id,nick,classe,nivel,objetivo,horario,contato,descricao,created_at")
    .order("created_at", { ascending: false }).limit(100);
  if (error) { console.warn("party fetch", error.message); return; }
  partyPosts = (data || []).map((r) => ({
    id: r.id, nick: r.nick, classe: r.classe, nivel: r.nivel, objetivo: r.objetivo,
    horario: r.horario, contato: r.contato, desc: r.descricao || "",
    ts: new Date(r.created_at).getTime(),
  }));
}

function partyShareText(p) {
  return [
    "⚔️ PROCURANDO GRUPO — Laboranok do Ragnatório (comunidade Bihelz TV)",
    `👤 ${p.nick} — ${p.classe} (Lv. ${p.nivel})`,
    `🎯 Objetivo: ${p.objetivo}`,
    `🕒 Horário: ${p.horario}`,
    `💬 Contato: ${p.contato}`,
    p.desc ? `📝 ${p.desc}` : "",
  ].filter(Boolean).join("\n");
}

function actionButtons(onCopy, onDelete, canDelete = true) {
  const wrap = el("div", "actions");
  const copy = el("button", "ro-btn ro-btn--small ro-btn--sp", "📋 Copiar p/ Discord");
  copy.type = "button"; copy.addEventListener("click", onCopy);
  wrap.append(copy);
  if (canDelete) {
    const del = el("button", "ro-btn ro-btn--small ro-btn--danger", "✕ Remover");
    del.type = "button"; del.addEventListener("click", onDelete);
    wrap.append(del);
  }
  return wrap;
}

function partyCard(p) {
  const art = el("article", "ro-window post-card");
  const body = el("div", "ro-window__body");
  const top = el("div", "row");
  top.style.justifyContent = "space-between";
  top.append(el("h3", null, `⚔️ ${p.nick}`), el("span", "ro-chip", p.objetivo));
  body.append(top, el("div", "sub", `${p.classe} · Lv. ${p.nivel} · ${p.horario}`));
  if (p.desc) body.append(el("p", null, p.desc));
  const contact = el("p", "mt8");
  contact.style.fontSize = "13px";
  contact.append("💬 ", el("b", null, p.contato));
  body.append(contact);
  const mine = !CLOUD || !!tokenStore.get(PTOK)[p.id];
  body.append(actionButtons(
    () => copyText(partyShareText(p), "Anúncio copiado! Cola no Discord da guilda."),
    () => removeParty(p.id),
    mine
  ));
  art.append(body);
  return art;
}

async function removeParty(id) {
  if (CLOUD) {
    const token = tokenStore.get(PTOK)[id];
    if (!token) return toast("Só quem publicou pode remover este anúncio.");
    const { error } = await SB.rpc("delete_own_post", { p_table: "party", p_id: id, p_token: token });
    if (error) return toast("Não consegui remover agora.");
    tokenStore.del(PTOK, id);
    await fetchParty();
  } else {
    partyPosts = partyPosts.filter((x) => x.id !== id);
    save(PKEY, partyPosts);
  }
  renderParty();
  toast("Anúncio removido.");
}

function renderParty() {
  chipButtons($("#partyFilters"), OBJETIVOS.map((o) => [o, o]), partyFilter, (k) => { partyFilter = k; renderParty(); });
  const list = partyPosts
    .filter((p) => partyFilter === "Todos" || p.objetivo === partyFilter)
    .sort((a, b) => b.ts - a.ts);
  const target = $("#partyList");
  if (!list.length) return setContent(target, emptyState("🐷", "Nenhum anúncio nesse objetivo ainda. Seja o primeiro a chamar a guilda!"));
  setContent(target, ...list.map(partyCard));
}

function initPartyForm() {
  const sel = $("#pClasse");
  CLASSES.forEach((c) => sel.append(el("option", null, c)));
  $("#partyForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const f = {
      nick: $("#pNick").value.trim(), classe: sel.value, nivel: $("#pNivel").value,
      objetivo: $("#pObjetivo").value, horario: $("#pHorario").value.trim(),
      contato: $("#pContato").value.trim(), desc: $("#pDesc").value.trim(),
    };
    if (CLOUD) {
      btn.disabled = true;
      const token = uuid();
      const { data, error } = await SB.from("party_posts")
        .insert({ nick: f.nick, classe: f.classe, nivel: f.nivel, objetivo: f.objetivo, horario: f.horario, contato: f.contato, descricao: f.desc || null, delete_token: token })
        .select("id").single();
      btn.disabled = false;
      if (error) return toast("Não consegui publicar agora — tenta de novo.");
      tokenStore.put(PTOK, data.id, token);
      await fetchParty();
    } else {
      partyPosts.push({ id: "p" + Date.now(), ...f, ts: Date.now() });
      save(PKEY, partyPosts);
    }
    e.target.reset();
    renderParty();
    toast(CLOUD ? "Anúncio publicado pra guilda toda! ⚔️" : "Anúncio publicado! Copie e divulgue no Discord. ⚔️");
  });
}

/* ============================================================
   MERCADO (trade board) — conteúdo do usuário: DOM seguro
   ============================================================ */
const TKEY = "bz_trade_posts";
const TTOK = "bz_trade_tokens";
let tradePosts = CLOUD ? [] : load(TKEY, SEED_TRADE);
let tradeFilter = "todos";

async function fetchTrade() {
  if (!CLOUD) { tradePosts = load(TKEY, SEED_TRADE); return; }
  const { data, error } = await SB.from("trade_posts")
    .select("id,tipo,item,detalhe,preco,contato,created_at")
    .order("created_at", { ascending: false }).limit(100);
  if (error) { console.warn("trade fetch", error.message); return; }
  tradePosts = (data || []).map((r) => ({
    id: r.id, tipo: r.tipo, item: r.item, detalhe: r.detalhe || "",
    preco: Number(r.preco), contato: r.contato, ts: new Date(r.created_at).getTime(),
  }));
}

function tradeShareText(t) {
  return [
    `${t.tipo === "vendo" ? "💰 VENDO" : "🔎 COMPRO"} — Laboranok do Ragnatório (comunidade Bihelz TV)`,
    `📦 ${t.item}${t.detalhe ? " (" + t.detalhe + ")" : ""}`,
    `💵 ${fmtZeny(t.preco)} zeny`,
    `💬 Contato: ${t.contato}`,
  ].join("\n");
}

function tradeCard(t) {
  const art = el("article", "ro-window post-card");
  const body = el("div", "ro-window__body");
  const top = el("div", "row");
  top.style.justifyContent = "space-between";
  const chipCls = t.tipo === "vendo" ? "ro-chip ro-chip--vendo" : "ro-chip ro-chip--compro";
  top.append(el("h3", null, `📦 ${t.item}`), el("span", chipCls, t.tipo === "vendo" ? "Vendo" : "Compro"));
  body.append(top);
  if (t.detalhe) body.append(el("div", "sub", t.detalhe));
  body.append(el("p", "zeny", fmtZeny(t.preco)));
  const contact = el("p", "mt8");
  contact.style.fontSize = "13px";
  contact.append("💬 ", el("b", null, t.contato));
  body.append(contact);
  const mine = !CLOUD || !!tokenStore.get(TTOK)[t.id];
  body.append(actionButtons(
    () => copyText(tradeShareText(t), "Anúncio copiado! Bora fechar negócio."),
    () => removeTrade(t.id),
    mine
  ));
  art.append(body);
  return art;
}

async function removeTrade(id) {
  if (CLOUD) {
    const token = tokenStore.get(TTOK)[id];
    if (!token) return toast("Só quem publicou pode remover este anúncio.");
    const { error } = await SB.rpc("delete_own_post", { p_table: "trade", p_id: id, p_token: token });
    if (error) return toast("Não consegui remover agora.");
    tokenStore.del(TTOK, id);
    await fetchTrade();
  } else {
    tradePosts = tradePosts.filter((x) => x.id !== id);
    save(TKEY, tradePosts);
  }
  renderTrade();
  toast("Anúncio removido.");
}

function renderTrade() {
  chipButtons($("#tradeFilters"), [["todos", "Todos"], ["vendo", "Vendo"], ["compro", "Compro"]], tradeFilter, (k) => { tradeFilter = k; renderTrade(); });
  const list = tradePosts
    .filter((t) => tradeFilter === "todos" || t.tipo === tradeFilter)
    .sort((a, b) => b.ts - a.ts);
  const target = $("#tradeList");
  if (!list.length) return setContent(target, emptyState("🪙", "Nenhum anúncio por aqui. Publique o primeiro!"));
  setContent(target, ...list.map(tradeCard));
}

function initTradeForm() {
  $("#tradeForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const f = {
      tipo: $("#tTipo").value, item: $("#tItem").value.trim(),
      detalhe: $("#tDetalhe").value.trim(), preco: Number($("#tPreco").value),
      contato: $("#tContato").value.trim(),
    };
    if (CLOUD) {
      btn.disabled = true;
      const token = uuid();
      const { data, error } = await SB.from("trade_posts")
        .insert({ tipo: f.tipo, item: f.item, detalhe: f.detalhe || null, preco: f.preco, contato: f.contato, delete_token: token })
        .select("id").single();
      btn.disabled = false;
      if (error) return toast("Não consegui publicar agora — tenta de novo.");
      tokenStore.put(TTOK, data.id, token);
      await fetchTrade();
    } else {
      tradePosts.push({ id: "t" + Date.now(), ...f, ts: Date.now() });
      save(TKEY, tradePosts);
    }
    e.target.reset();
    renderTrade();
    toast(CLOUD ? "Anúncio publicado pra guilda toda! 💰" : "Anúncio publicado no quadro! 💰");
  });
}

/* ============================================================
   TIMER DE MVP
   ============================================================ */
const MKEY = "bz_mvp_timers";
let mvpTimers = load(MKEY, {});

const pad = (n) => String(n).padStart(2, "0");
const fmtHMS = (ms) => {
  const s = Math.max(0, Math.floor(ms / 1000));
  return `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
};

function renderMvpShell() {
  const cards = MVPS.map((m) => {
    const art = el("article", "ro-window mvp-card");
    art.id = `mvp-${m.id}`;
    const body = el("div", "ro-window__body");

    const head = el("div", "head");
    head.append(el("div", "ro-slot mvp-slot", m.emoji));
    const info = el("div");
    info.append(el("h3", null, m.name), el("div", "map", `📍 ${m.map}`), el("div", "respawn", `Respawn ~${m.min}–${m.max} min`));
    head.append(info);

    // elemento do chefe + melhores elementos de ataque (da tabela elemental)
    const extra = el("div", "mvp-extra");
    extra.append(el("span", "ro-chip", `${m.element} ${m.elv} · ${m.size}`));
    const row = (typeof LAB !== "undefined" && LAB.elements.table[`${m.element} ${m.elv}`]) || null;
    if (row) {
      const ranked = LAB.elements.names
        .map((n, i) => ({ n, v: row[i] }))
        .sort((a, b) => b.v - a.v)
        .filter((x) => x.v > 100)
        .slice(0, 2);
      ranked.forEach((x) => extra.append(el("span", "ro-chip ro-chip--vendo", `⚔️ ${x.n} ${x.v}%`)));
    }
    if (m.mobId) {
      const dp = el("a", "dp-link", "drops ↗");
      dp.href = `https://www.divine-pride.net/database/monster/${m.mobId}?server=LATAM`;
      dp.target = "_blank"; dp.rel = "noopener";
      extra.append(dp);
    }

    const timer = el("div", "timer", "--:--:--"); timer.dataset.timer = "";
    const status = el("div", "status", "Sem registro"); status.dataset.status = "";
    const bar = el("div", "ro-bar ro-bar--exp"); bar.style.marginBottom = "12px";
    const fill = el("div", "ro-bar__fill"); fill.dataset.bar = ""; fill.style.width = "0%";
    bar.append(fill);

    const actions = el("div", "actions");
    const kill = el("button", "ro-btn ro-btn--small", "☠️ Morreu agora");
    kill.type = "button";
    kill.addEventListener("click", () => {
      mvpTimers[m.id] = Date.now();
      save(MKEY, mvpTimers);
      toast("Morte registrada! Te aviso quando a janela abrir. ☠️");
      tickMvps();
    });
    const reset = el("button", "ro-btn ro-btn--small ro-btn--ghost", "↺");
    reset.type = "button"; reset.title = "Limpar registro";
    reset.addEventListener("click", () => {
      delete mvpTimers[m.id];
      save(MKEY, mvpTimers);
      tickMvps();
    });
    actions.append(kill, reset);

    body.append(head, extra, timer, status, bar, actions);
    art.append(body);
    return art;
  });
  setContent($("#mvpList"), ...cards);
}

function tickMvps() {
  const now = Date.now();
  MVPS.forEach((m) => {
    const card = $(`#mvp-${m.id}`);
    if (!card) return;
    const t = $("[data-timer]", card), st = $("[data-status]", card), bar = $("[data-bar]", card);
    const kill = mvpTimers[m.id];
    card.classList.remove("window-open");
    if (!kill) {
      t.textContent = "--:--:--"; st.textContent = "Sem registro"; bar.style.width = "0%";
      return;
    }
    const elapsed = now - kill;
    const minMs = m.min * 60000, maxMs = m.max * 60000;
    if (elapsed < minMs) {
      t.textContent = fmtHMS(minMs - elapsed);
      st.textContent = "Janela abre em";
      bar.style.width = `${Math.min(100, (elapsed / minMs) * 100)}%`;
    } else if (elapsed <= maxMs) {
      card.classList.add("window-open");
      t.textContent = fmtHMS(maxMs - elapsed);
      st.textContent = "⚡ JANELA ABERTA — vai!";
      bar.style.width = "100%";
    } else {
      t.textContent = "00:00:00";
      st.textContent = "Provavelmente já nasceu 👀";
      bar.style.width = "100%";
    }
  });
}

/* ============================================================
   LAB DO CIENTISTA
   ============================================================ */
/* Farmacologia Avançada (fórmula LATAM/Renewal, browiki + irowiki):
   A = INT + ⌊DES/2⌋ + SOR + NvClasse + R1[30,150] + (NvBase−100)
       + PesquisaPoções×5 + ProtQuímicaTotal×R2[4,10]
   B = Fator(nível da skill) + Taxa do item
   A−B: ≥400 Máx | ≥300 Máx−3 | ≥100 Máx−4 | ≥1 Máx−5 | <0 Máx−6 */
function initPharmacy() {
  if (typeof LAB === "undefined") return;
  const itemSel = $("#phItem"), skillSel = $("#phSkill");
  LAB.pharmacyItems.forEach((it, i) => {
    const o = el("option", null, `${it.name} (taxa ${it.rate})`);
    o.value = String(i);
    itemSel.append(o);
  });
  for (let lv = 1; lv <= 10; lv++) {
    const o = el("option", null, `Nível ${lv} — fator ${LAB.pharmacyFactor[lv - 1]}, cria até ${LAB.pharmacyMaxBySkill[lv - 1]}`);
    o.value = String(lv);
    skillSel.append(o);
  }
  skillSel.value = "10";
  ["#phInt", "#phDex", "#phLuk", "#phJob", "#phBase", "#phResearch", "#phFcp", "#phItem", "#phSkill"]
    .forEach((id) => $(id).addEventListener("input", calcPharmacy));
  calcPharmacy();
}

function calcPharmacy() {
  const int = +$("#phInt").value || 0, dex = +$("#phDex").value || 0, luk = +$("#phLuk").value || 0;
  const job = +$("#phJob").value || 0, base = +$("#phBase").value || 0, res = +$("#phResearch").value || 0;
  const fcp = Math.min(5, Math.max(0, +$("#phFcp").value || 0));
  const item = LAB.pharmacyItems[+$("#phItem").value || 0];
  const skillLv = +$("#phSkill").value || 10;
  const maxQty = LAB.pharmacyMaxBySkill[skillLv - 1];
  const B = LAB.pharmacyFactor[skillLv - 1] + item.rate;

  const fixed = int + Math.floor(dex / 2) + luk + job + (base - 100) + res * 5;
  const qtyFor = (margin) => {
    if (margin >= 400) return maxQty;
    if (margin >= 300) return maxQty - 3;
    if (margin >= 100) return maxQty - 4;
    if (margin >= 1) return maxQty - 5;
    return maxQty - 6;
  };

  // distribuição EXATA: enumera R1 (30..150) × R2 (4..10, se FCP>0)
  const r2vals = fcp > 0 ? [4, 5, 6, 7, 8, 9, 10] : [0];
  let total = 0, sum = 0, hitMax = 0, qMin = Infinity, qMax = -Infinity;
  for (let r1 = 30; r1 <= 150; r1++) {
    for (const r2 of r2vals) {
      const A = fixed + r1 + fcp * r2;
      const q = qtyFor(A - B);
      total++; sum += q;
      if (q === maxQty) hitMax++;
      if (q < qMin) qMin = q;
      if (q > qMax) qMax = q;
    }
  }
  const avg = sum / total;
  const pMax = Math.round((hitMax / total) * 100);

  const box = $("#pharmaResult");
  const big = el("div", "big", qMin === qMax ? `${qMin} poções` : `${qMin}–${qMax} poções`);
  const lbl = el("div", "lbl", `por brew de ${item.name} · média ${avg.toFixed(1)}`);
  const detail = el("div", "detail",
    `Chance do resultado máximo (${maxQty}): ${pMax}% · pontos fixos ${fixed} vs dificuldade ${B} (fator ${LAB.pharmacyFactor[skillLv - 1]} + taxa LATAM ${item.rate}). Nunca falha: o piso do nv.10 é 6.`);
  setContent(box, big, lbl, detail);
}

function renderElements() {
  if (typeof LAB === "undefined") return;
  const defSel = $("#elemDef"), lvSel = $("#elemLv");
  LAB.elements.names.forEach((n) => defSel.append(el("option", null, n)));
  [1, 2, 3, 4].forEach((l) => lvSel.append(el("option", null, `Nv. ${l}`)));
  const draw = () => {
    const def = defSel.value, lv = +lvSel.value.replace(/\D/g, "") || 1;
    const row = LAB.elements.table[`${def} ${lv}`] || [];
    const cells = LAB.elements.names.map((atk, i) => {
      const v = row[i];
      const cell = el("div", "elem-cell");
      if (v > 100) cell.classList.add("good");
      else if (v < 100 && v > 0) cell.classList.add("bad");
      else if (v <= 0) cell.classList.add("immune");
      cell.append(el("div", "nm", atk), el("div", "val", `${v}%`));
      return cell;
    });
    setContent($("#elemGrid"), ...cells);
  };
  defSel.addEventListener("change", draw);
  lvSel.addEventListener("change", draw);
  draw();
}

function initSizeCalc() {
  if (typeof LAB === "undefined") return;
  const wSel = $("#sizeWeapon"), tSel = $("#sizeTarget");
  LAB.sizes.forEach((w, i) => {
    const o = el("option", null, w.name);
    o.value = String(i);
    wSel.append(o);
  });
  const draw = () => {
    const w = LAB.sizes[+wSel.value || 0];
    const key = { "Pequeno": "p", "Médio": "m", "Grande": "g" }[tSel.value];
    const v = w[key];
    const box = $("#sizeResult");
    const big = el("div", "big", `${v}%`);
    big.style.color = v >= 100 ? "var(--bz-gold)" : "#ff9d9d";
    const lbl = el("div", "lbl", `${w.name} vs alvo ${tSel.value.toLowerCase()}`);
    setContent(box, big, lbl);
  };
  wSel.addEventListener("change", draw);
  tSel.addEventListener("change", draw);
  draw();
}

/* ---------- Rotina do Laboranok (dailies + relógios do servidor) ---
   Reset diário 04:00 BRT (=07:00 UTC) · semanal segunda 04:00 BRT
   WoE: domingo 20:00–22:00 BRT (=23:00 UTC até 01:00 UTC de segunda) */
const DKEY = "bz_dailies";
let dailyChecks = load(DKEY, {});

function lastDailyResetUTC(now = Date.now()) {
  const d = new Date(now);
  const boundary = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 7, 0, 0);
  return now >= boundary ? boundary : boundary - 864e5;
}
function lastWeeklyResetUTC(now = Date.now()) {
  const t = lastDailyResetUTC(now);
  const dow = new Date(t).getUTCDay(); // 1 = segunda
  return t - ((dow - 1 + 7) % 7) * 864e5;
}
function woeStatus(now = Date.now()) {
  const d = new Date(now);
  const todayUTC = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  const lastSunStart = todayUTC - d.getUTCDay() * 864e5 + 23 * 36e5;
  if (now >= lastSunStart && now < lastSunStart + 2 * 36e5) return { live: true, t: lastSunStart + 2 * 36e5 };
  return { live: false, t: now < lastSunStart ? lastSunStart : lastSunStart + 7 * 864e5 };
}
const fmtDHMS = (ms) => {
  const s = Math.max(0, Math.floor(ms / 1000));
  const dd = Math.floor(s / 86400);
  const rest = `${pad(Math.floor((s % 86400) / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
  return dd > 0 ? `${dd}d ${rest}` : rest;
};

function renderChecklist() {
  if (typeof LAB === "undefined") return;
  const dB = lastDailyResetUTC(), wB = lastWeeklyResetUTC();
  const rows = LAB.dailies.map((t) => {
    const boundary = t.freq === "semanal" ? wB : dB;
    const done = (dailyChecks[t.id] || 0) >= boundary;
    const label = el("label", "check-item" + (done ? " done" : ""));
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = done;
    cb.addEventListener("change", () => {
      if (cb.checked) dailyChecks[t.id] = Date.now();
      else delete dailyChecks[t.id];
      save(DKEY, dailyChecks);
      renderChecklist();
      if (cb.checked) toast("Missão concluída! O Laboranok agradece. ✅");
    });
    label.append(cb, el("span", "txt", t.nome), el("span", "ro-chip", t.freq === "semanal" ? "Semanal" : "Diária"));
    return label;
  });
  setContent($("#dailyChecklist"), ...rows);
}

function tickLabClocks() {
  const reset = $("#resetCountdown"), woe = $("#woeCountdown");
  if (!reset) return;
  const now = Date.now();
  reset.textContent = fmtDHMS(lastDailyResetUTC(now) + 864e5 - now);
  const w = woeStatus(now);
  if (w.live) {
    woe.textContent = "AO VIVO! 🔥";
    woe.title = `Termina em ${fmtDHMS(w.t - now)}`;
  } else {
    woe.textContent = fmtDHMS(w.t - now);
  }
}

/* ---------- Quiz: qual Homunculus S? ---------- */
function initQuiz() {
  if (typeof LAB === "undefined") return;
  const sel = $("#quizGoal");
  LAB.homunQuiz.forEach((q, i) => {
    const o = el("option", null, q.goal);
    o.value = String(i);
    sel.append(o);
  });
  const draw = () => {
    const q = LAB.homunQuiz[+sel.value || 0];
    const box = $("#quizResult");
    setContent(box, el("div", "big", q.rec), el("div", "detail", q.why));
  };
  sel.addEventListener("change", draw);
  $("#homunNote").textContent = LAB.homunNote;
  draw();
}

/* ---------- Radar da comunidade (myROverse, com cache 30 min) ---------- */
async function loadRadar() {
  const box = $("#radarBox");
  if (!box) return;
  const CK = "bz_radar_cache";
  let posts = null;
  try {
    const c = JSON.parse(localStorage.getItem(CK) || "null");
    if (c && Date.now() - c.ts < 30 * 60 * 1000) posts = c.posts;
  } catch {}
  if (!posts) {
    try {
      const r = await fetch("https://myroverse.com/wp-json/wp/v2/posts?per_page=5&_fields=title,link,date");
      if (!r.ok) throw new Error("http " + r.status);
      posts = await r.json();
      localStorage.setItem(CK, JSON.stringify({ ts: Date.now(), posts }));
    } catch { posts = null; }
  }
  const decode = (s) => new DOMParser().parseFromString(String(s), "text/html").documentElement.textContent || "";
  if (posts && posts.length) {
    const items = posts.map((p) => {
      const row = el("div", "radar-item");
      const a = el("a", null, decode(p.title && p.title.rendered));
      const url = String(p.link || "");
      if (/^https:\/\//.test(url)) a.href = url;
      a.target = "_blank"; a.rel = "noopener";
      const dt = (p.date || "").slice(0, 10).split("-").reverse().join("/");
      row.append(el("span", "date", dt), a);
      return row;
    });
    const credit = el("p", "muted", "Fonte: myROverse — portal da comunidade RO LATAM. Atualiza a cada 30 min.");
    credit.style.cssText = "font-size:11px;margin-top:10px";
    setContent(box, ...items, credit);
  } else {
    const p = el("p", null, "Radar fora do ar agora — vai direto na fonte:");
    p.style.fontSize = "13px";
    const links = el("div", "row mt8");
    [["Avisos", "https://ro.gnjoylatam.com/pt/news/notice"], ["Atualizações", "https://ro.gnjoylatam.com/pt/news/update"], ["Eventos", "https://ro.gnjoylatam.com/pt/news/event"]].forEach(([lbl, url]) => {
      const a = el("a", "ro-btn ro-btn--small ro-btn--ghost", lbl);
      a.href = url; a.target = "_blank"; a.rel = "noopener";
      links.append(a);
    });
    setContent(box, p, links);
  }
}

function renderHomunculus() {
  if (typeof LAB === "undefined") return;
  const cards = LAB.homunculus.map((h) => {
    const c = el("div", "homun-card");
    c.append(el("div", "emoji", h.emoji));
    const info = el("div");
    info.append(el("h4", null, h.name), el("div", "evo", h.evo));
    const food = el("div", "food");
    food.append("🍽️ Comida: ", el("b", null, h.food));
    info.append(food, el("div", "food", h.role));
    c.append(info);
    return c;
  });
  setContent($("#homunGrid"), ...cards);
}

function renderArsenal() {
  if (typeof ARSENAL === "undefined") return;
  const cards = ARSENAL.map((a) => {
    const card = el("a", "arsenal-card");
    card.href = a.url; card.target = "_blank"; card.rel = "noopener";
    card.append(el("div", "cat", a.categoria), el("h4", null, a.name), el("p", null, a.description));
    return card;
  });
  setContent($("#arsenalGrid"), ...cards);
}

/* ============================================================
   CENTRAL DO AVENTUREIRO — launcher de busca (op.gg-style)
   ============================================================ */
function initSearch() {
  if (typeof SEARCH === "undefined") return;
  const form = $("#searchForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const term = $("#searchTerm").value.trim();
    const mode = $("#searchMode").value;
    if (!term) return;
    const primary = (SEARCH[mode] || [])[0];
    if (primary) {
      const url = primary.url.includes("{q}") ? primary.url.replace("{q}", encodeURIComponent(term)) : primary.url;
      window.open(url, "_blank", "noopener");
      toast(`Abrindo "${term}" no ${primary.name}... ⚔️`);
    }
    renderSearchDestinos(term);
  });
  renderSearchDestinos("");
}

function renderSearchDestinos(term) {
  const box = $("#searchDestinos");
  if (!box) return;
  const all = [
    ...SEARCH.database.map((d) => ({ ...d, cat: "Item / Monstro / Carta" })),
    ...SEARCH.jogador.map((d) => ({ ...d, cat: "Personagem / Guilda / Build" })),
  ];
  const cards = all.map((d) => {
    const card = el("a", "arsenal-card");
    const url = d.url.includes("{q}") ? d.url.replace("{q}", encodeURIComponent(term || "")) : d.url;
    card.href = url; card.target = "_blank"; card.rel = "noopener";
    const h = el("h4", null, d.name);
    if (term && d.url.includes("{q}")) h.append(el("span", "muted", `  · "${term}"`));
    card.append(el("div", "cat", d.cat), h, el("p", null, d.desc));
    return card;
  });
  setContent(box, ...cards);
}

/* ============================================================
   GUIAS (HTML estático confiável de data.js) + COMUNIDADE
   ============================================================ */
function renderGuides() {
  const cards = GUIDES.map((g) => {
    const win = el("div", "ro-window guide-card");
    const body = el("div", "ro-window__body");
    const det = el("details");
    const sum = el("summary");
    sum.append(el("div", "ro-slot", g.emoji));
    const info = el("div");
    info.append(el("h3", null, g.title), el("div", "tag", g.tag));
    sum.append(info, el("span", "arrow", "▼"));
    const content = el("div", "content");
    content.append(frag(g.html)); // conteúdo autoral estático de data.js
    det.append(sum, content);
    body.append(det);
    win.append(body);
    return win;
  });
  setContent($("#guideList"), ...cards);
}

let scheduleData = (typeof SCHEDULE !== "undefined") ? SCHEDULE.slice() : [];

async function loadSchedule() {
  if (SB) {
    try {
      const { data } = await SB.from("app_settings").select("value").eq("key", "schedule").single();
      if (data && Array.isArray(data.value)) scheduleData = data.value;
    } catch {}
  }
  renderSchedule();
}

function renderSchedule() {
  const rows = scheduleData.map((s) => {
    const tr = el("tr");
    const td1 = el("td");
    td1.append(el("b", null, s.dia));
    tr.append(td1, el("td", null, s.hora), el("td", null, s.tema));
    return tr;
  });
  setContent($("#scheduleTable tbody"), ...rows);
}

/* ============================================================
   BLOG DA COMUNIDADE — estilo Reddit (Supabase)
   Flairs (Build/Print/Dúvida/...), upvote + ordenação, upload de
   print (Supabase Storage), comentários. Ler é público; postar,
   votar e comentar exige login Google (RLS no servidor).
   ============================================================ */
const blogLiked = new Set();
let blogSort = "novos", blogFlairFilter = "todos";
let pendingImage = null;

const BLOG_FLAIRS = [
  { key: "build", label: "Build", emoji: "⚔️", cls: "fl-build" },
  { key: "print", label: "Print/Conquista", emoji: "📸", cls: "fl-print" },
  { key: "duvida", label: "Dúvida", emoji: "❓", cls: "fl-duvida" },
  { key: "discussao", label: "Discussão", emoji: "💬", cls: "fl-disc" },
  { key: "pvp", label: "PvP/WoE", emoji: "🛡️", cls: "fl-pvp" },
  { key: "trade", label: "Trade", emoji: "💰", cls: "fl-trade" },
  { key: "guia", label: "Guia", emoji: "📖", cls: "fl-guia" },
  { key: "outro", label: "Outro", emoji: "✨", cls: "fl-outro" },
];
const flairOf = (k) => BLOG_FLAIRS.find((f) => f.key === k) || BLOG_FLAIRS[BLOG_FLAIRS.length - 1];

function timeago(iso) {
  const s = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return "agora";
  if (s < 3600) return `há ${Math.floor(s / 60)}min`;
  if (s < 86400) return `há ${Math.floor(s / 3600)}h`;
  if (s < 2592000) return `há ${Math.floor(s / 86400)}d`;
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
}
function blogAuthorName() {
  const m = (currentUser && currentUser.user_metadata) || {};
  return (m.full_name || m.name || (currentUser && currentUser.email) || "Aventureiro");
}

async function loadBlog() {
  renderBlogCompose();
  renderBlogControls();
  const list = $("#blogList");
  if (!list) return;
  if (!SB) return setContent(list, emptyState("🔒", "O blog precisa do Supabase configurado."));
  let q = SB.from("blog_posts").select("*");
  q = blogSort === "top" ? q.order("likes", { ascending: false }).order("created_at", { ascending: false })
                         : q.order("created_at", { ascending: false });
  if (blogFlairFilter !== "todos") q = q.eq("flair", blogFlairFilter);
  const { data, error } = await q.limit(60);
  if (error) return setContent(list, emptyState("😕", "Não consegui carregar o blog agora."));
  blogLiked.clear();
  if (currentUser) {
    try { const { data: likes } = await SB.from("blog_likes").select("post_id"); (likes || []).forEach((l) => blogLiked.add(l.post_id)); } catch {}
  }
  renderBlogList(data || []);
}

function renderBlogControls() {
  const box = $("#blogControls");
  if (!box) return;
  const wrap = el("div", "blog-controls");
  // sort
  const sorts = [["novos", "🆕 Recentes"], ["top", "🔥 Mais votados"]];
  const sortRow = el("div", "row");
  sorts.forEach(([k, lbl]) => {
    const b = el("button", "ro-chip ro-chip--btn" + (blogSort === k ? " active" : ""), lbl); b.type = "button";
    b.addEventListener("click", () => { blogSort = k; loadBlog(); });
    sortRow.append(b);
  });
  // flair filter
  const filterRow = el("div", "row"); filterRow.style.marginTop = "8px";
  const all = el("button", "ro-chip ro-chip--btn" + (blogFlairFilter === "todos" ? " active" : ""), "Tudo"); all.type = "button";
  all.addEventListener("click", () => { blogFlairFilter = "todos"; loadBlog(); });
  filterRow.append(all);
  BLOG_FLAIRS.forEach((f) => {
    const b = el("button", "ro-chip ro-chip--btn" + (blogFlairFilter === f.key ? " active" : ""), `${f.emoji} ${f.label}`); b.type = "button";
    b.addEventListener("click", () => { blogFlairFilter = f.key; loadBlog(); });
    filterRow.append(b);
  });
  wrap.append(sortRow, filterRow);
  box.replaceChildren(wrap);
}

function renderBlogCompose() {
  const box = $("#blogCompose");
  if (!box) return;
  if (!SB) { box.replaceChildren(); return; }
  if (!currentUser) {
    const win = el("div", "ro-window");
    const body = el("div", "ro-window__body center");
    body.append(el("p", "muted", "Entre com sua conta Google pra criar post, votar e comentar no fórum da guilda."));
    const b = el("button", "btn-google", null); b.type = "button"; b.style.marginTop = "12px";
    b.append(el("span", "g", "G"), el("span", null, "Entrar com Google"));
    b.addEventListener("click", loginGoogle);
    body.append(b); win.append(body); box.replaceChildren(win);
    return;
  }
  pendingImage = null;
  const win = el("div", "ro-window");
  const t = el("div", "ro-window__title", "✍️ Criar post");
  const body = el("div", "ro-window__body stack"); body.style.gap = "10px";

  const flairWrap = el("div", "ro-field");
  flairWrap.append(el("label", null, "Categoria"));
  const flairSel = el("select", "ro-select");
  BLOG_FLAIRS.forEach((f) => { const o = el("option", null, `${f.emoji} ${f.label}`); o.value = f.key; flairSel.append(o); });
  flairWrap.append(flairSel);

  const titleI = el("input", "ro-input"); titleI.placeholder = "Título do post"; titleI.maxLength = 120;
  const bodyI = el("textarea", "ro-textarea"); bodyI.placeholder = "Escreve teu texto... (build, dúvida, relato, print de conquista)"; bodyI.maxLength = 8000; bodyI.style.minHeight = "110px";

  // imagem
  const imgWrap = el("div", "blog-imgpick");
  const fileBtn = el("label", "ro-btn ro-btn--small ro-btn--ghost", "📸 Anexar print");
  const file = document.createElement("input"); file.type = "file"; file.accept = "image/png,image/jpeg,image/webp,image/gif"; file.style.display = "none";
  const preview = el("div", "blog-preview hide");
  file.addEventListener("change", () => {
    const f = file.files && file.files[0];
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) { toast("Imagem muito grande (máx 5MB)."); file.value = ""; return; }
    pendingImage = f;
    const url = URL.createObjectURL(f);
    const im = document.createElement("img"); im.src = url; im.alt = "";
    const rm = el("button", "blog-preview__rm", "✕ remover print"); rm.type = "button";
    rm.addEventListener("click", () => { pendingImage = null; file.value = ""; preview.classList.add("hide"); preview.replaceChildren(); });
    preview.replaceChildren(im, rm); preview.classList.remove("hide");
  });
  fileBtn.append(file);
  imgWrap.append(fileBtn);

  const btn = el("button", "ro-btn", "📢 Publicar"); btn.type = "button";
  btn.addEventListener("click", async () => {
    const title = titleI.value.trim(), b = bodyI.value.trim();
    if (title.length < 3) return toast("Escreve um título (mín. 3 letras).");
    if (!b && !pendingImage) return toast("Escreve um texto ou anexa um print.");
    btn.disabled = true; btn.textContent = "Publicando...";
    let image_url = null;
    if (pendingImage) {
      const ext = (pendingImage.name.split(".").pop() || "png").toLowerCase().replace(/[^a-z0-9]/g, "");
      const path = `${currentUser.id}/${Date.now()}.${ext}`;
      const up = await SB.storage.from("blog-images").upload(path, pendingImage, { cacheControl: "3600", upsert: false });
      if (up.error) { btn.disabled = false; btn.textContent = "📢 Publicar"; return toast("Falha no upload da imagem."); }
      image_url = SB.storage.from("blog-images").getPublicUrl(path).data.publicUrl;
    }
    const m = currentUser.user_metadata || {};
    const { error } = await SB.from("blog_posts").insert({
      author_id: currentUser.id, author_name: blogAuthorName(), author_avatar: m.avatar_url || null,
      flair: flairSel.value, title, body: b || "", image_url,
    });
    btn.disabled = false; btn.textContent = "📢 Publicar";
    if (error) return toast("Não consegui publicar — tenta de novo.");
    toast("Post publicado no fórum! 📢");
    loadBlog();
  });

  body.append(el("div", "muted", "Postando como " + blogAuthorName()), flairWrap, titleI, bodyI, imgWrap, preview, btn);
  win.append(t, body); box.replaceChildren(win);
}

function renderBlogList(posts) {
  const box = $("#blogList");
  if (!posts.length) return setContent(box, emptyState("📝", "Nenhum post por aqui ainda. Seja o primeiro da guilda!"));
  setContent(box, ...posts.map(blogCard));
}

function blogCard(p) {
  const art = el("article", "ro-window post-reddit");
  const wrap = el("div", "rd-wrap");

  const vote = el("div", "rd-vote");
  const liked = blogLiked.has(p.id);
  const up = el("button", "rd-up" + (liked ? " on" : ""), "▲"); up.type = "button"; up.title = "Upvote";
  const score = el("div", "rd-score", String(p.likes || 0));
  up.addEventListener("click", async () => {
    if (!currentUser) return toast("Entre com Google pra votar.");
    const { data, error } = await SB.rpc("toggle_blog_like", { p_post: p.id });
    if (error) return toast("Não consegui votar agora.");
    if (blogLiked.has(p.id)) blogLiked.delete(p.id); else blogLiked.add(p.id);
    up.className = "rd-up" + (blogLiked.has(p.id) ? " on" : "");
    score.textContent = String(data);
  });
  vote.append(up, score);

  const main = el("div", "rd-main");
  const fl = flairOf(p.flair);
  const meta = el("div", "rd-meta");
  meta.append(el("span", "rd-flair " + fl.cls, `${fl.emoji} ${fl.label}`));
  meta.append(el("span", "rd-sub", `${p.author_name} · ${timeago(p.created_at)}`));
  main.append(meta, el("h3", "rd-title", p.title));
  if (p.image_url) {
    const im = document.createElement("img");
    im.className = "rd-img"; im.src = p.image_url; im.alt = ""; im.loading = "lazy";
    const a = document.createElement("a"); a.href = p.image_url; a.target = "_blank"; a.rel = "noopener"; a.append(im);
    main.append(a);
  }
  if (p.body) main.append(el("p", "rd-body", p.body));

  const foot = el("div", "rd-foot");
  const cbox = el("div", "rd-comments hide");
  const cbtn = el("button", "rd-cbtn", `💬 ${p.comment_count || 0} coment.`); cbtn.type = "button";
  cbtn.addEventListener("click", () => {
    if (cbox.classList.contains("hide")) { cbox.classList.remove("hide"); loadComments(p, cbox, cbtn); }
    else cbox.classList.add("hide");
  });
  foot.append(cbtn);
  if (currentUser && (currentUser.id === p.author_id || isAdmin)) {
    const del = el("button", "rd-del", "✕ apagar"); del.type = "button";
    del.addEventListener("click", async () => {
      const { error } = await SB.from("blog_posts").delete().eq("id", p.id);
      if (error) return toast("Falha ao apagar.");
      toast("Post apagado."); loadBlog();
    });
    foot.append(del);
  }
  main.append(foot, cbox);
  wrap.append(vote, main); art.append(wrap);
  return art;
}

async function loadComments(p, box, cbtn) {
  box.replaceChildren(el("div", "muted", "Carregando comentários..."));
  const { data, error } = await SB.from("blog_comments").select("*").eq("post_id", p.id).order("created_at", { ascending: true }).limit(300);
  if (error) return box.replaceChildren(el("div", "muted", "Não consegui carregar."));
  const nodes = (data || []).map((c) => commentNode(c, p, box, cbtn));
  const form = commentForm(p, box, cbtn);
  box.replaceChildren(...(nodes.length ? nodes : [el("div", "muted", "Sem comentários. Puxa o papo!")]), form);
}

function commentNode(c, p, box, cbtn) {
  const row = el("div", "rd-comment");
  const head = el("div", "rd-c-head");
  if (c.author_avatar) { const img = document.createElement("img"); img.className = "rd-c-av"; img.src = c.author_avatar; img.referrerPolicy = "no-referrer"; img.alt = ""; head.append(img); }
  else head.append(el("span", "rd-c-av rd-c-av--ph", "🧪"));
  head.append(el("b", null, c.author_name), el("span", "rd-c-time", " · " + timeago(c.created_at)));
  if (currentUser && (currentUser.id === c.author_id || isAdmin)) {
    const del = el("button", "rd-c-del", "✕"); del.type = "button"; del.title = "Apagar";
    del.addEventListener("click", async () => {
      const { error } = await SB.from("blog_comments").delete().eq("id", c.id);
      if (error) return toast("Falha ao apagar.");
      p.comment_count = Math.max(0, (p.comment_count || 1) - 1);
      if (cbtn) cbtn.textContent = `💬 ${p.comment_count} coment.`;
      loadComments(p, box, cbtn);
    });
    head.append(del);
  }
  row.append(head, el("div", "rd-c-body", c.body));
  return row;
}

function commentForm(p, box, cbtn) {
  if (!currentUser) {
    const g = el("div", "rd-c-gate");
    g.append(el("span", "muted", "Entre com Google pra comentar. "));
    const b = el("button", "btn-google", null); b.type = "button";
    b.append(el("span", "g", "G"), el("span", null, "Entrar"));
    b.addEventListener("click", loginGoogle);
    g.append(b);
    return g;
  }
  const form = el("div", "rd-c-form");
  const ta = el("textarea", "ro-textarea"); ta.placeholder = "Responder / comentar..."; ta.maxLength = 3000; ta.style.minHeight = "60px";
  const btn = el("button", "ro-btn ro-btn--small", "Comentar"); btn.type = "button";
  btn.addEventListener("click", async () => {
    const body = ta.value.trim();
    if (!body) return;
    btn.disabled = true;
    const m = currentUser.user_metadata || {};
    const { error } = await SB.from("blog_comments").insert({
      post_id: p.id, author_id: currentUser.id, author_name: blogAuthorName(), author_avatar: m.avatar_url || null, body,
    });
    btn.disabled = false;
    if (error) return toast("Não consegui comentar.");
    ta.value = "";
    p.comment_count = (p.comment_count || 0) + 1;
    if (cbtn) cbtn.textContent = `💬 ${p.comment_count} coment.`;
    loadComments(p, box, cbtn);
  });
  form.append(ta, btn);
  return form;
}

/* ============================================================
   DISCORD — card ao vivo (membros + online), via API pública
   Contagem: /invites/{code}?with_counts=true (CORS liberado).
   Lista de online (avatares): widget.json — só aparece se o
   widget estiver ativado em Config. do Servidor → Widget.
   ============================================================ */
function discordLogo() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 -28.5 256 256");
  svg.setAttribute("class", "disc-logo");
  const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
  p.setAttribute("fill", "#5865F2");
  p.setAttribute("d", "M216.856 16.597A208.502 208.502 0 0 0 164.042 0c-2.275 4.113-4.933 9.645-6.766 14.046-19.692-2.961-39.203-2.961-58.533 0-1.832-4.4-4.55-9.933-6.846-14.046a207.809 207.809 0 0 0-52.855 16.638C5.618 67.147-3.443 116.4 1.087 164.956c22.169 16.555 43.653 26.612 64.775 33.193A161.094 161.094 0 0 0 79.735 175.3a136.413 136.413 0 0 1-21.846-10.632 108.636 108.636 0 0 0 5.356-4.237c42.122 19.702 87.89 19.702 129.51 0a131.66 131.66 0 0 0 5.355 4.237 136.07 136.07 0 0 1-21.886 10.653c4.006 8.02 8.638 15.67 13.873 22.848 21.142-6.58 42.646-16.637 64.815-33.213 5.316-56.288-9.08-105.09-38.056-148.36ZM85.474 135.095c-12.645 0-23.015-11.805-23.015-26.18s10.149-26.2 23.015-26.2c12.867 0 23.236 11.804 23.015 26.2.02 14.375-10.148 26.18-23.015 26.18Zm85.051 0c-12.645 0-23.014-11.805-23.014-26.18s10.148-26.2 23.014-26.2c12.867 0 23.236 11.804 23.015 26.2 0 14.375-10.148 26.18-23.015 26.18Z");
  svg.append(p);
  return svg;
}

async function loadDiscord() {
  const box = $("#discordWidget");
  if (!box || typeof CANAL === "undefined" || !CANAL.discordInvite) return;
  const info = { name: CANAL.discordNome, total: null, online: null };
  let members = [];
  try {
    const r = await fetch(`https://discord.com/api/v10/invites/${CANAL.discordInvite}?with_counts=true`);
    if (r.ok) { const d = await r.json(); info.total = d.approximate_member_count; info.online = d.approximate_presence_count; if (d.guild && d.guild.name) info.name = d.guild.name; }
  } catch {}
  try {
    const r = await fetch(`https://discord.com/api/guilds/${CANAL.discordGuildId}/widget.json`);
    if (r.ok) { const w = await r.json(); if (Array.isArray(w.members)) members = w.members.filter((m) => m.avatar_url).slice(0, 14); if (w.presence_count != null) info.online = w.presence_count; }
  } catch {}
  renderDiscord(info, members);
}

function renderDiscord(info, members) {
  const box = $("#discordWidget");
  const win = el("div", "ro-window disc-card");
  const body = el("div", "ro-window__body");

  const head = el("div", "disc-head");
  head.append(discordLogo());
  const meta = el("div", "disc-meta");
  meta.append(el("div", "disc-name", info.name || "Laboranok do Ragnatório"));
  const stats = el("div", "disc-stats");
  if (info.online != null) {
    const s = el("span", "disc-stat disc-stat--on");
    s.append(el("span", "disc-dot"), document.createTextNode(` ${Number(info.online).toLocaleString("pt-BR")} online agora`));
    stats.append(s);
  }
  if (info.total != null) stats.append(el("span", "disc-stat", `${Number(info.total).toLocaleString("pt-BR")} membros`));
  if (!stats.childNodes.length) stats.append(el("span", "disc-stat", "Comunidade da guilda"));
  meta.append(stats);
  head.append(meta);
  const join = el("a", "ro-btn disc-join", "Entrar no Discord");
  join.href = CANAL.discordConvite; join.target = "_blank"; join.rel = "noopener";
  head.append(join);
  body.append(head);

  if (members.length) {
    const av = el("div", "disc-avatars");
    members.forEach((m) => {
      const i = document.createElement("img");
      i.className = "disc-av"; i.src = m.avatar_url; i.alt = m.username || ""; i.title = m.username || "";
      i.referrerPolicy = "no-referrer"; i.loading = "lazy";
      av.append(i);
    });
    body.append(av);
  }
  win.append(body);
  box.replaceChildren(win);
}

/* ============================================================
   DATABASE — itens icônicos + pré-builds (dados em data.js)
   ============================================================ */
let itemFilter = "todos", itemQuery = "";
function strongLine(label, text) { const p = el("p"); p.append(el("b", null, label), document.createTextNode(text)); return p; }

function initDatabase() {
  const ti = $("#dbTabItens"), tb = $("#dbTabBuilds");
  if (!ti) return;
  ti.addEventListener("click", () => { ti.classList.add("active"); tb.classList.remove("active"); $("#dbItens").classList.remove("hide"); $("#dbBuilds").classList.add("hide"); });
  tb.addEventListener("click", () => { tb.classList.add("active"); ti.classList.remove("active"); $("#dbBuilds").classList.remove("hide"); $("#dbItens").classList.add("hide"); });
  const s = $("#itemSearch");
  if (s) s.addEventListener("input", () => { itemQuery = s.value.trim().toLowerCase(); renderItems(); });
  renderItems();
  renderBuilds();
}

function itemCard(i) {
  const c = el("div", "db-card" + (i.nostalgico ? " is-nost" : ""));
  const nm = el("div", "nm");
  nm.append(document.createTextNode(i.nome));
  if (i.nostalgico) nm.append(el("span", "nost-badge", "clássico"));
  c.append(nm, el("div", "tag", i.tipo), el("div", "eff", i.efeito));
  return c;
}
function renderItems() {
  if (typeof ESSENTIAL_ITEMS === "undefined" || !$("#itemGrid")) return;
  const cats = ["todos", ...Array.from(new Set(ESSENTIAL_ITEMS.map((i) => i.tipo)))];
  chipButtons($("#itemFilters"), cats.map((c) => [c, c === "todos" ? "Todos" : c]), itemFilter, (k) => { itemFilter = k; renderItems(); });
  let list = ESSENTIAL_ITEMS;
  if (itemFilter !== "todos") list = list.filter((i) => i.tipo === itemFilter);
  if (itemQuery) list = list.filter((i) => (i.nome + " " + i.efeito).toLowerCase().includes(itemQuery));
  const cards = list.map(itemCard);
  setContent($("#itemGrid"), ...(cards.length ? cards : [emptyState("🔍", "Nenhum item encontrado.")]));
}

function renderBuilds() {
  if (typeof PRE_BUILDS === "undefined" || !$("#buildList")) return;
  const cards = PRE_BUILDS.map((b) => {
    const win = el("div", "ro-window build-card");
    const body = el("div", "ro-window__body");
    const det = el("details");
    const sum = el("summary");
    sum.append(el("div", "ro-slot", "⚔️"));
    const info = el("div");
    info.append(el("h3", null, `${b.nome} — ${b.classe}`), el("div", "bmeta", b.foco));
    sum.append(info, el("span", "arrow", "▼"));
    const content = el("div", "content");
    content.append(strongLine("Atributos: ", b.stats));
    if (b.skills && b.skills.length) { const sk = el("div", "chips"); b.skills.forEach((s) => sk.append(el("span", "chip", s))); content.append(el("div", null, "Skills principais:"), sk); }
    if (b.equips && b.equips.length) { const eq = el("div", "chips"); b.equips.forEach((s) => eq.append(el("span", "chip", s))); content.append(el("div", null, "Equipamentos:"), eq); }
    content.append(el("p", null, b.descricao));
    det.append(sum, content); body.append(det); win.append(body);
    return win;
  });
  setContent($("#buildList"), ...cards);
}

/* ============================================================
   NOSTALGIA — BGMs, ícones, fatos, memes (dados em data.js)
   ============================================================ */
function initNostalgia() {
  if (typeof NOSTALGIA === "undefined") return;
  if ($("#bgmList") && Array.isArray(NOSTALGIA.bgms)) {
    const chips = NOSTALGIA.bgms.map((b) => {
      const c = el("button", "bgm-chip", "🎵 " + b.titulo); c.type = "button";
      c.title = b.contexto || "";
      c.addEventListener("click", () => playBgm(b, c));
      return c;
    });
    setContent($("#bgmList"), ...chips);
  }
  if ($("#iconicGrid") && Array.isArray(NOSTALGIA.iconicos)) {
    const ic = NOSTALGIA.iconicos.map((i) => {
      const c = el("div", "db-card is-nost");
      c.append(el("div", "nm", (i.emoji ? i.emoji + " " : "") + i.nome), el("div", "tag", i.categoria), el("div", "eff", i.descricao));
      return c;
    });
    setContent($("#iconicGrid"), ...ic);
  }
  if ($("#factsGrid") && Array.isArray(NOSTALGIA.fatos)) {
    const facts = NOSTALGIA.fatos.map((f) => { const c = el("div", "fact-card"); c.append(el("h4", null, f.titulo), el("p", null, f.texto)); return c; });
    setContent($("#factsGrid"), ...facts);
  }
  if ($("#memesList") && Array.isArray(NOSTALGIA.memes)) {
    setContent($("#memesList"), ...NOSTALGIA.memes.map((m) => el("span", "meme-chip", `"${m}"`)));
  }
}
function playBgm(b, chip) {
  const box = $("#bgmPlayer");
  $$("#bgmList .bgm-chip").forEach((c) => c.classList.remove("playing"));
  chip.classList.add("playing");
  if (window.BZRadio && window.BZRadio.isPlaying()) window.BZRadio.pause();
  const f = document.createElement("iframe");
  f.className = "bgm-frame";
  f.src = `https://www.youtube.com/embed/${b.youtubeId}?autoplay=1`;
  f.allow = "autoplay; encrypted-media";
  f.title = b.titulo;
  setContent(box, f);
  box.classList.remove("hide");
}

/* ============================================================
   PAINEL ADMIN — moderação + horários (só admin, via RLS)
   Admin = logado com Google e e-mail na tabela `admins`.
   Tudo é reconferido no servidor; o front só reflete.
   ============================================================ */
let isAdmin = false;

async function refreshAdmin() {
  isAdmin = false;
  if (SB && currentUser) {
    try { const { data } = await SB.rpc("is_admin"); isAdmin = !!data; } catch {}
  }
  const link = $("#adminNavLink");
  if (link) link.classList.toggle("hide", !isAdmin);
  if (location.hash === "#admin") renderAdmin();
}

function adminMsg(text, withLogin) {
  const gate = $("#adminGate"), panel = $("#adminPanel");
  panel.classList.add("hide");
  const body = el("div", "ro-window__body");
  body.append(el("p", "muted", text));
  if (withLogin) {
    const b = el("button", "btn-google", null);
    b.type = "button"; b.style.marginTop = "12px";
    b.append(el("span", "g", "G"), el("span", null, "Entrar com Google"));
    b.addEventListener("click", loginGoogle);
    body.append(b);
  }
  gate.replaceChildren(body);
  gate.classList.remove("hide");
}

async function renderAdmin() {
  if (!SB) return adminMsg("O painel admin precisa do Supabase configurado.");
  if (!currentUser) return adminMsg("Entre com sua conta Google para acessar o painel de administração.", true);
  if (!isAdmin) { try { const { data } = await SB.rpc("is_admin"); isAdmin = !!data; } catch {} }
  if (!isAdmin) return adminMsg(`A conta ${currentUser.email || ""} não é administradora. Fale com o Hari para liberar.`);
  $("#adminGate").classList.add("hide");
  const panel = $("#adminPanel");
  panel.classList.remove("hide");
  panel.replaceChildren(adminScheduleCard(), adminModerationCard(), adminAdminsCard());
}

function adminWindow(title) {
  const win = el("div", "ro-window");
  const t = el("div", "ro-window__title", title);
  const body = el("div", "ro-window__body");
  win.append(t, body);
  return { win, body };
}

/* --- editor de horários --- */
function adminScheduleCard() {
  const { win, body } = adminWindow("🕒 Horários das lives");
  const rowsBox = el("div", "stack"); rowsBox.style.gap = "8px";
  const draft = scheduleData.map((s) => ({ ...s }));
  const drawRows = () => {
    const nodes = draft.map((s, i) => {
      const row = el("div", "row"); row.style.gap = "8px";
      const dia = el("input", "ro-input"); dia.value = s.dia; dia.placeholder = "Dia"; dia.style.flex = "1";
      const hora = el("input", "ro-input"); hora.value = s.hora; hora.placeholder = "Hora"; hora.style.width = "90px";
      const tema = el("input", "ro-input"); tema.value = s.tema; tema.placeholder = "Tema"; tema.style.flex = "2";
      dia.addEventListener("input", () => (draft[i].dia = dia.value));
      hora.addEventListener("input", () => (draft[i].hora = hora.value));
      tema.addEventListener("input", () => (draft[i].tema = tema.value));
      const del = el("button", "ro-btn ro-btn--small ro-btn--danger", "✕"); del.type = "button";
      del.addEventListener("click", () => { draft.splice(i, 1); drawRows(); });
      row.append(dia, hora, tema, del);
      return row;
    });
    rowsBox.replaceChildren(...nodes);
  };
  drawRows();
  const add = el("button", "ro-btn ro-btn--small ro-btn--ghost", "+ Adicionar dia"); add.type = "button";
  add.addEventListener("click", () => { draft.push({ dia: "", hora: "", tema: "" }); drawRows(); });
  const saveBtn = el("button", "ro-btn", "💾 Salvar horários"); saveBtn.type = "button";
  saveBtn.addEventListener("click", async () => {
    const clean = draft.filter((s) => s.dia.trim() && s.hora.trim());
    saveBtn.disabled = true;
    const { error } = await SB.from("app_settings").upsert({ key: "schedule", value: clean, updated_at: new Date().toISOString() });
    saveBtn.disabled = false;
    if (error) return toast("Não consegui salvar (você é admin?).");
    scheduleData = clean; renderSchedule();
    toast("Horários atualizados no site! 🕒");
  });
  const actions = el("div", "row mt12"); actions.style.gap = "8px";
  actions.append(add, saveBtn);
  body.append(el("p", "muted", "Edite e salve — reflete na aba Guilda na hora, sem redeploy."), rowsBox, actions);
  body.querySelector("p").style.marginBottom = "12px";
  return win;
}

/* --- moderação de anúncios --- */
function adminModerationCard() {
  const { win, body } = adminWindow("🧹 Moderar anúncios");
  const container = el("div", "stack"); container.style.gap = "16px";
  const mkList = (title, posts, table, refetch) => {
    const box = el("div");
    box.append(el("h3", null, title));
    box.querySelector("h3").style.cssText = "font-family:var(--f-serif);margin-bottom:8px";
    if (!posts.length) { box.append(el("p", "muted", "Nenhum anúncio.")); return box; }
    const rows = posts.map((p) => {
      const row = el("div", "row"); row.style.cssText = "justify-content:space-between;gap:8px;padding:8px;border-bottom:1px dashed var(--ro-frame)";
      const label = table === "party_posts"
        ? `${p.nick} · ${p.classe} Lv.${p.nivel} · ${p.objetivo}`
        : `${p.tipo === "vendo" ? "Vendo" : "Compro"}: ${p.item} · ${fmtZeny(p.preco)}z`;
      row.append(el("span", null, label));
      const del = el("button", "ro-btn ro-btn--small ro-btn--danger", "Remover"); del.type = "button";
      del.addEventListener("click", async () => {
        const { error } = await SB.from(table).delete().eq("id", p.id);
        if (error) return toast("Falha ao remover.");
        toast("Anúncio removido.");
        await refetch(); renderAdmin();
        if (table === "party_posts") renderParty(); else renderTrade();
      });
      row.append(del);
      return row;
    });
    rows.forEach((r) => box.append(r));
    return box;
  };
  container.append(
    mkList(`Party (${partyPosts.length})`, partyPosts, "party_posts", fetchParty),
    mkList(`Trade (${tradePosts.length})`, tradePosts, "trade_posts", fetchTrade),
  );
  body.append(container);
  return win;
}

/* --- gerenciar admins --- */
function adminAdminsCard() {
  const { win, body } = adminWindow("👑 Administradores");
  const listBox = el("div", "stack"); listBox.style.gap = "6px";
  const refresh = async () => {
    let admins = [];
    try { const { data } = await SB.from("admins").select("email").order("added_at"); admins = data || []; } catch {}
    const nodes = admins.map((a) => {
      const row = el("div", "row"); row.style.cssText = "justify-content:space-between;gap:8px";
      row.append(el("span", null, a.email));
      const del = el("button", "ro-btn ro-btn--small ro-btn--ghost", "Remover"); del.type = "button";
      del.addEventListener("click", async () => {
        if (a.email.toLowerCase() === (currentUser.email || "").toLowerCase()) return toast("Não remova a si mesmo.");
        await SB.from("admins").delete().eq("email", a.email); refresh();
      });
      row.append(del);
      return row;
    });
    listBox.replaceChildren(...(nodes.length ? nodes : [el("p", "muted", "—")]));
  };
  refresh();
  const inp = el("input", "ro-input"); inp.placeholder = "email@do-novo-admin.com"; inp.type = "email"; inp.style.flex = "1";
  const addBtn = el("button", "ro-btn ro-btn--small", "+ Add"); addBtn.type = "button";
  addBtn.addEventListener("click", async () => {
    const email = inp.value.trim().toLowerCase();
    if (!email || !email.includes("@")) return toast("E-mail inválido.");
    const { error } = await SB.from("admins").insert({ email });
    if (error) return toast("Não consegui adicionar.");
    inp.value = ""; refresh(); toast("Admin adicionado!");
  });
  const addRow = el("div", "row mt12"); addRow.style.gap = "8px";
  addRow.append(inp, addBtn);
  body.append(el("p", "muted", "Quem estiver aqui e logar com Google vira admin."), listBox, addRow);
  body.querySelector("p").style.marginBottom = "10px";
  return win;
}

/* ============================================================
   LOGIN GOOGLE (Supabase Auth) — opcional e aditivo
   Precisa do provedor Google ativado no painel do Supabase.
   Logado: mostra avatar/nome e pré-preenche o nick do form.
   ============================================================ */
let currentUser = null;

function renderAuth() {
  const area = $("#authArea");
  if (!area) return;
  if (!SB) { area.classList.add("hide"); return; }
  clearNode(area);
  if (currentUser) {
    const meta = currentUser.user_metadata || {};
    const name = meta.full_name || meta.name || currentUser.email || "Aventureiro";
    const wrap = el("div", "auth-user");
    if (meta.avatar_url) {
      const img = document.createElement("img");
      img.className = "auth-avatar"; img.src = meta.avatar_url; img.alt = ""; img.referrerPolicy = "no-referrer";
      wrap.append(img);
    }
    wrap.append(el("span", "auth-name", name.split(" ")[0]));
    const out = el("button", "ro-btn ro-btn--small ro-btn--ghost", "Sair");
    out.type = "button";
    out.addEventListener("click", () => SB.auth.signOut());
    wrap.append(out);
    area.append(wrap);
  } else {
    const btn = el("button", "btn-google", null);
    btn.type = "button";
    btn.append(el("span", "g", "G"), el("span", null, "Entrar com Google"));
    btn.addEventListener("click", loginGoogle);
    area.append(btn);
  }
}

async function loginGoogle() {
  if (!SB) return toast("Login indisponível: Supabase não configurado.");
  const { error } = await SB.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: location.origin + location.pathname },
  });
  if (error) toast("O login do Google ainda não está ativado no Supabase.");
}

function prefillFromUser() {
  if (!currentUser) return;
  const meta = currentUser.user_metadata || {};
  const name = (meta.full_name || meta.name || "").trim();
  const nick = $("#pNick");
  if (nick && !nick.value && name) nick.value = name.split(" ")[0];
}

async function initAuth() {
  const area = $("#authArea");
  if (!SB) { if (area) area.classList.add("hide"); return; }
  try {
    const { data } = await SB.auth.getSession();
    currentUser = data.session?.user || null;
  } catch {}
  renderAuth();
  prefillFromUser();
  refreshAdmin();
  SB.auth.onAuthStateChange((_e, session) => {
    const was = currentUser;
    currentUser = session?.user || null;
    renderAuth();
    prefillFromUser();
    refreshAdmin();
    if (location.hash === "#blog") loadBlog(); else renderBlogCompose();
    if (currentUser && !was) toast(`Bem-vindo, ${(currentUser.user_metadata?.name || "aventureiro").split(" ")[0]}! ⚔️`);
  });
}

/* ============================================================
   BOOT
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  route();
  npcSay(0);
  $("#npcNext").addEventListener("click", () => npcSay(++npcIdx));
  mountYouTube();
  $("#toggleChat").addEventListener("click", () => mountChat(false));
  $("#unmuteBtn").addEventListener("click", unmuteLive);
  checkLive();
  setInterval(checkLive, 5 * 60 * 1000);
  loadYouTubeVideos();
  initAuth();
  tickCountdown();
  setInterval(tickCountdown, 1000);
  renderHomeNews();
  renderNews();
  initPartyForm();
  initTradeForm();
  fetchParty().then(renderParty);
  fetchTrade().then(renderTrade);
  initSearch();
  renderMvpShell();
  tickMvps();
  setInterval(tickMvps, 1000);
  initPharmacy();
  renderElements();
  initSizeCalc();
  renderChecklist();
  tickLabClocks();
  setInterval(tickLabClocks, 1000);
  initQuiz();
  loadRadar();
  renderHomunculus();
  renderArsenal();
  renderGuides();
  loadSchedule();
  loadDiscord();
  setInterval(loadDiscord, 90000);
  initDatabase();
  initNostalgia();
  initTilt();
  initHeroParallax();
});
