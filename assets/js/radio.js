/* ============================================================
   BIHELZ TV — Rádio da Guilda (player flutuante)
   Rádios online por gênero via Radio Browser API (grátis, sem
   chave, CORS). Só estações HTTPS (evita mixed-content).
   Volume + mute funcionais, estado salvo no localStorage.
   Expõe window.BZRadio = { pause, isPlaying } para o player da
   live pausar a rádio quando o Bihelz entrar ao vivo.
   Todo o DOM é montado com createElement/textContent (seguro).
   ============================================================ */
(function () {
  const HOSTS = [
    "https://de1.api.radio-browser.info",
    "https://de2.api.radio-browser.info",
    "https://fi1.api.radio-browser.info",
  ];
  const GENRES = [
    { l: "Lofi", t: "lofi" }, { l: "Eletrônica", t: "electronic" },
    { l: "Funk", t: "funk" }, { l: "Rock", t: "rock" },
    { l: "Synthwave", t: "synthwave" }, { l: "Pop", t: "pop" },
    { l: "Hip-Hop", t: "hip hop" }, { l: "Jazz", t: "jazz" },
    { l: "Metal", t: "metal" }, { l: "Reggae", t: "reggae" },
    { l: "Sertanejo", t: "sertanejo" }, { l: "Anime", t: "anime" },
  ];
  const LS = "bz_radio";
  const el = (tag, cls, txt) => { const n = document.createElement(tag); if (cls) n.className = cls; if (txt != null) n.textContent = txt; return n; };
  const state = (() => { try { return JSON.parse(localStorage.getItem(LS)) || {}; } catch { return {}; } })();
  const persist = () => localStorage.setItem(LS, JSON.stringify(state));

  const audio = new Audio();
  audio.preload = "none";
  audio.volume = state.volume != null ? state.volume : 0.6;
  audio.muted = !!state.muted;

  /* ---------- FAB (botão flutuante) ---------- */
  const fab = el("button", "bzr-fab", null);
  fab.type = "button";
  fab.setAttribute("aria-label", "Rádio da guilda");
  const eqMini = el("span", "bzr-eq");
  eqMini.append(el("i"), el("i"), el("i"));
  fab.append(el("span", "bzr-fab__ico", "📻"), eqMini);

  /* ---------- Painel ---------- */
  const panel = el("div", "bzr-panel bzr-hide");
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-label", "Rádio da Guilda");

  const head = el("div", "bzr-head");
  head.append(el("span", "bzr-head__t", "♪  RÁDIO DA GUILDA"));
  const closeBtn = el("button", "bzr-close", "✕"); closeBtn.type = "button"; closeBtn.setAttribute("aria-label", "Fechar");
  head.append(closeBtn);

  const chips = el("div", "bzr-chips");
  const searchWrap = el("div", "bzr-search");
  const search = el("input", null);
  search.type = "search"; search.placeholder = "Buscar estação ou gênero…"; search.maxLength = 40;
  searchWrap.append(el("span", "bzr-search__i", "🔎"), search);
  const list = el("div", "bzr-list");

  /* now-playing bar */
  const bar = el("div", "bzr-bar bzr-hide");
  const barInfo = el("div", "bzr-bar__info");
  const eqBig = el("span", "bzr-eq bzr-eq--big");
  eqBig.append(el("i"), el("i"), el("i"), el("i"));
  const nowName = el("div", "bzr-bar__name", "—");
  barInfo.append(eqBig, nowName);

  const play = el("button", "bzr-play", "▶"); play.type = "button"; play.setAttribute("aria-label", "Tocar/Pausar");

  const volWrap = el("div", "bzr-vol");
  const muteBtn = el("button", "bzr-mute", "🔊"); muteBtn.type = "button"; muteBtn.setAttribute("aria-label", "Mudo");
  const vol = el("input", "bzr-slider");
  vol.type = "range"; vol.min = "0"; vol.max = "100"; vol.step = "1";
  vol.value = String(Math.round(audio.volume * 100));
  const volPct = el("span", "bzr-pct", vol.value + "%");
  volWrap.append(muteBtn, vol, volPct);

  bar.append(barInfo, play, volWrap);
  panel.append(head, chips, searchWrap, list, bar);
  document.body.append(fab, panel);

  const paintVol = () => {
    vol.style.setProperty("--fill", vol.value + "%");
    volPct.textContent = (audio.muted ? 0 : vol.value) + "%";
    muteBtn.textContent = audio.muted || +vol.value === 0 ? "🔇" : +vol.value < 45 ? "🔉" : "🔊";
  };
  paintVol();

  /* ---------- toast ---------- */
  const toast = (m) => {
    const t = document.getElementById("sysToast");
    if (!t) return;
    t.textContent = `[Rádio] ${m}`;
    t.classList.add("show");
    clearTimeout(t._rt);
    t._rt = setTimeout(() => t.classList.remove("show"), 2400);
  };

  /* ---------- API ---------- */
  let hostIdx = 0;
  async function apiJSON(path) {
    for (let i = 0; i < HOSTS.length; i++) {
      const host = HOSTS[(hostIdx + i) % HOSTS.length];
      try { const r = await fetch(host + path); if (!r.ok) continue; hostIdx = (hostIdx + i) % HOSTS.length; return await r.json(); } catch {}
    }
    return null;
  }
  const stationsQuery = (params) => `/json/stations/search?${new URLSearchParams({ hidebroken: "true", order: "clickcount", reverse: "true", limit: "50", ...params })}`;

  let activeStationUrl = null;
  async function loadStations(params, emptyMsg) {
    list.replaceChildren(el("div", "bzr-hint", "Sintonizando…"));
    const data = (await apiJSON(stationsQuery(params))) || [];
    const https = data.filter((s) => (s.url_resolved || "").startsWith("https://"));
    const seen = new Set();
    const clean = https.filter((s) => { const k = (s.name || "").trim().toLowerCase(); if (!k || seen.has(k)) return false; seen.add(k); return true; });
    if (!clean.length) return list.replaceChildren(el("div", "bzr-hint", emptyMsg || "Nenhuma estação HTTPS nesse gênero. Tenta outro."));
    const rows = clean.slice(0, 40).map((s) => {
      const row = el("button", "bzr-item", null); row.type = "button";
      if (s.url_resolved === activeStationUrl) row.classList.add("is-active");
      const left = el("span", "bzr-item__l");
      left.append(el("span", "bzr-item__dot"), el("span", "bzr-item__nm", s.name.trim()));
      const meta = `${(s.codec || "").toUpperCase()}${s.bitrate ? " · " + s.bitrate + "k" : ""}`;
      row.append(left, el("span", "bzr-item__meta", meta));
      row.addEventListener("click", () => playStation({ url: s.url_resolved, name: s.name.trim() }));
      return row;
    });
    list.replaceChildren(...rows);
  }

  /* ---------- player ---------- */
  function setPlayingUI(on) {
    play.textContent = on ? "⏸" : "▶";
    fab.classList.toggle("is-playing", on);
    bar.classList.toggle("is-playing", on);
  }
  function markActive() {
    [...list.querySelectorAll(".bzr-item")].forEach((r) => r.classList.remove("is-active"));
  }
  function playStation(st) {
    state.station = st; persist();
    activeStationUrl = st.url;
    bar.classList.remove("bzr-hide");
    nowName.textContent = st.name;
    markActive();
    audio.src = st.url;
    audio.play().then(() => setPlayingUI(true)).catch(() => { setPlayingUI(false); toast("Não rolou tocar essa — tenta outra."); });
    toast("▶ " + st.name);
  }
  play.addEventListener("click", () => {
    if (!audio.src) { if (state.station) return playStation(state.station); return; }
    if (audio.paused) audio.play().then(() => setPlayingUI(true)).catch(() => {});
    else { audio.pause(); setPlayingUI(false); }
  });
  audio.addEventListener("playing", () => setPlayingUI(true));
  audio.addEventListener("pause", () => setPlayingUI(false));
  audio.addEventListener("error", () => { setPlayingUI(false); toast("Estação fora do ar — escolhe outra."); });

  vol.addEventListener("input", () => {
    const v = +vol.value / 100;
    audio.volume = v; state.volume = v;
    if (v > 0 && audio.muted) { audio.muted = false; state.muted = false; }
    persist(); paintVol();
  });
  muteBtn.addEventListener("click", () => {
    audio.muted = !audio.muted; state.muted = audio.muted; persist(); paintVol();
  });

  /* ---------- gêneros + busca ---------- */
  let activeGenre = null;
  function renderChips() {
    const nodes = GENRES.map((g) => {
      const b = el("button", "bzr-chip" + (activeGenre === g.t ? " is-on" : ""), g.l); b.type = "button";
      b.addEventListener("click", () => { activeGenre = g.t; renderChips(); loadStations({ tag: g.t }); });
      return b;
    });
    chips.replaceChildren(...nodes);
  }
  let searchT;
  search.addEventListener("input", () => {
    clearTimeout(searchT);
    const q = search.value.trim();
    searchT = setTimeout(() => { if (!q) return; activeGenre = null; renderChips(); loadStations({ name: q }, "Nada com esse nome. Tenta um gênero acima."); }, 400);
  });

  /* ---------- toggle ---------- */
  let opened = false;
  function open() {
    panel.classList.remove("bzr-hide");
    fab.classList.add("is-open");
    opened = true;
    if (!list.dataset.loaded) { activeGenre = "lofi"; renderChips(); loadStations({ tag: "lofi" }); list.dataset.loaded = "1"; }
  }
  function close() { panel.classList.add("bzr-hide"); fab.classList.remove("is-open"); opened = false; }
  fab.addEventListener("click", () => (opened ? close() : open()));
  closeBtn.addEventListener("click", close);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && opened) close(); });

  /* restaura estação (sem autoplay — política do navegador) */
  if (state.station && state.station.name) {
    activeStationUrl = state.station.url;
    bar.classList.remove("bzr-hide");
    nowName.textContent = state.station.name;
    audio.src = state.station.url;
  }

  /* API pública p/ o player da live pausar a rádio */
  window.BZRadio = {
    pause() { if (!audio.paused) { audio.pause(); setPlayingUI(false); } },
    isPlaying() { return !audio.paused && !!audio.src; },
  };
})();
