/* ============================================================
   BIHELZ TV — Rádio flutuante
   Player de rádios online por gênero, via Radio Browser API
   (grátis, sem chave, CORS liberado). Só estações HTTPS (pra
   não dar mixed-content). Estado salvo no localStorage.
   Todo o DOM é montado com createElement/textContent (seguro).
   ============================================================ */
(function () {
  const HOSTS = [
    "https://de1.api.radio-browser.info",
    "https://de2.api.radio-browser.info",
    "https://fi1.api.radio-browser.info",
  ];
  const GENRES = [
    { l: "Lofi", t: "lofi" },
    { l: "Eletrônica", t: "electronic" },
    { l: "Funk", t: "funk" },
    { l: "Rock", t: "rock" },
    { l: "Synthwave", t: "synthwave" },
    { l: "Pop", t: "pop" },
    { l: "Hip-Hop", t: "hip hop" },
    { l: "Jazz", t: "jazz" },
    { l: "Metal", t: "metal" },
    { l: "Reggae", t: "reggae" },
    { l: "Sertanejo", t: "sertanejo" },
    { l: "Anime", t: "anime" },
  ];
  const LS = "bz_radio";
  const el = (tag, cls, txt) => { const n = document.createElement(tag); if (cls) n.className = cls; if (txt != null) n.textContent = txt; return n; };
  const state = (() => { try { return JSON.parse(localStorage.getItem(LS)) || {}; } catch { return {}; } })();
  const save = () => localStorage.setItem(LS, JSON.stringify(state));

  const audio = new Audio();
  audio.preload = "none";
  audio.volume = state.volume != null ? state.volume : 0.7;

  /* ---------- shell ---------- */
  const fab = el("button", "radio-fab", null);
  fab.type = "button";
  fab.setAttribute("aria-label", "Rádio da guilda");
  fab.append(el("span", "radio-fab__ico", "📻"), el("span", "radio-fab__eq"));
  const panel = el("div", "radio-panel hide");
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-label", "Rádio");

  const head = el("div", "radio-head");
  head.append(el("span", "radio-head__t", "📻 Rádio da Guilda"));
  const close = el("button", "radio-x", "✕"); close.type = "button";
  head.append(close);

  const chips = el("div", "radio-chips");
  const search = el("input", "ro-input radio-search");
  search.placeholder = "Buscar estação ou gênero...";
  search.maxLength = 40;
  const list = el("div", "radio-list");

  const now = el("div", "radio-now hide");
  const nowName = el("div", "radio-now__name", "");
  const controls = el("div", "radio-now__ctrls");
  const playBtn = el("button", "radio-play", "▶"); playBtn.type = "button";
  const vol = el("input", "radio-vol"); vol.type = "range"; vol.min = "0"; vol.max = "1"; vol.step = "0.05"; vol.value = String(audio.volume);
  controls.append(playBtn, vol);
  now.append(nowName, controls);

  panel.append(head, chips, search, list, now);
  document.body.append(fab, panel);

  /* ---------- toast simples ---------- */
  const toast = (m) => {
    const t = document.getElementById("sysToast");
    if (!t) return;
    t.textContent = `[Rádio] ${m}`;
    t.classList.add("show");
    clearTimeout(t._rt);
    t._rt = setTimeout(() => t.classList.remove("show"), 2400);
  };

  /* ---------- data ---------- */
  let hostIdx = 0;
  async function apiJSON(path) {
    for (let i = 0; i < HOSTS.length; i++) {
      const host = HOSTS[(hostIdx + i) % HOSTS.length];
      try {
        const r = await fetch(host + path);
        if (!r.ok) continue;
        hostIdx = (hostIdx + i) % HOSTS.length;
        return await r.json();
      } catch {}
    }
    return null;
  }

  function stationsQuery(params) {
    const qs = new URLSearchParams({ hidebroken: "true", order: "clickcount", reverse: "true", limit: "40", ...params });
    return `/json/stations/search?${qs.toString()}`;
  }

  async function loadStations(params, emptyMsg) {
    list.replaceChildren(el("div", "radio-hint", "Sintonizando..."));
    const data = (await apiJSON(stationsQuery(params))) || [];
    const https = data.filter((s) => (s.url_resolved || "").startsWith("https://"));
    const seen = new Set();
    const clean = https.filter((s) => { const k = (s.name || "").trim().toLowerCase(); if (!k || seen.has(k)) return false; seen.add(k); return true; });
    if (!clean.length) return list.replaceChildren(el("div", "radio-hint", emptyMsg || "Nenhuma estação HTTPS aqui. Tenta outro gênero."));
    const rows = clean.slice(0, 30).map((s) => {
      const row = el("button", "radio-item", null); row.type = "button";
      row.append(el("span", "radio-item__nm", s.name.trim()), el("span", "radio-item__meta", `${(s.codec || "").toUpperCase()} ${s.bitrate ? s.bitrate + "k" : ""}`.trim()));
      row.addEventListener("click", () => play({ url: s.url_resolved, name: s.name.trim() }));
      return row;
    });
    list.replaceChildren(...rows);
  }

  /* ---------- player ---------- */
  function setPlayingUI(isPlaying) {
    playBtn.textContent = isPlaying ? "⏸" : "▶";
    fab.classList.toggle("is-playing", isPlaying);
  }
  function play(station) {
    state.station = station; save();
    now.classList.remove("hide");
    nowName.textContent = station.name;
    audio.src = station.url;
    audio.play().then(() => setPlayingUI(true)).catch(() => { setPlayingUI(false); toast("Não consegui tocar essa — tenta outra."); });
    toast("Tocando: " + station.name);
  }
  playBtn.addEventListener("click", () => {
    if (!audio.src) return;
    if (audio.paused) audio.play().then(() => setPlayingUI(true)).catch(() => {});
    else { audio.pause(); setPlayingUI(false); }
  });
  audio.addEventListener("playing", () => setPlayingUI(true));
  audio.addEventListener("pause", () => setPlayingUI(false));
  audio.addEventListener("error", () => { setPlayingUI(false); toast("Estação fora do ar — escolhe outra."); });
  vol.addEventListener("input", () => { audio.volume = +vol.value; state.volume = audio.volume; save(); });

  /* ---------- genres + search ---------- */
  let activeGenre = null;
  function renderChips() {
    const nodes = GENRES.map((g) => {
      const b = el("button", "radio-chip" + (activeGenre === g.t ? " active" : ""), g.l); b.type = "button";
      b.addEventListener("click", () => { activeGenre = g.t; renderChips(); loadStations({ tag: g.t }); });
      return b;
    });
    chips.replaceChildren(...nodes);
  }
  let searchT;
  search.addEventListener("input", () => {
    clearTimeout(searchT);
    const q = search.value.trim();
    searchT = setTimeout(() => {
      if (!q) return;
      activeGenre = null; renderChips();
      loadStations({ name: q }, "Nada encontrado. Tenta outro nome ou um gênero acima.");
    }, 400);
  });

  /* ---------- toggle ---------- */
  let opened = false;
  function openPanel() {
    panel.classList.remove("hide");
    opened = true;
    if (!list.dataset.loaded) {
      activeGenre = "lofi"; renderChips();
      loadStations({ tag: "lofi" });
      list.dataset.loaded = "1";
    }
  }
  function closePanel() { panel.classList.add("hide"); opened = false; }
  fab.addEventListener("click", () => (opened ? closePanel() : openPanel()));
  close.addEventListener("click", closePanel);

  // restaura estação anterior (sem autoplay — navegador bloqueia)
  if (state.station && state.station.name) {
    now.classList.remove("hide");
    nowName.textContent = state.station.name;
    audio.src = state.station.url;
  }
})();
