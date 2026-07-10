/* ============================================================
   BIHELZ TV — Fundo animado "Ragnarok pixel + 3D"
   Canvas fixo atrás do conteúdo: aurora suave + estrelas em
   camadas (profundidade) + porings PIXELADOS originais flutuando
   + brilhos dourados. Parallax por mouse e por scroll = efeito 3D.
   Arte 100% original (nenhum sprite da Gravity). Respeita
   prefers-reduced-motion e pausa quando a aba está oculta.
   ============================================================ */
(function () {
  const canvas = document.getElementById("bgfx");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const REDUCED = matchMedia("(prefers-reduced-motion:reduce)").matches;
  const FINE = matchMedia("(hover:hover) and (pointer:fine)").matches;

  let W = 0, H = 0, DPR = 1;
  function resize() {
    DPR = Math.min(2, window.devicePixelRatio || 1);
    W = canvas.width = Math.floor(innerWidth * DPR);
    H = canvas.height = Math.floor(innerHeight * DPR);
    canvas.style.width = innerWidth + "px";
    canvas.style.height = innerHeight + "px";
  }

  /* ---------- sprites de poring pixelado (originais) ---------- */
  const PALETTES = [
    { body: "#ff7fb0", dark: "#a8336a", light: "#ffd6e8" }, // rosa
    { body: "#57d6e0", dark: "#27798f", light: "#c6f2f8" }, // ciano
    { body: "#ffcf5a", dark: "#a5701a", light: "#ffe9b0" }, // dourado
    { body: "#b06bf0", dark: "#5f2ba8", light: "#e7c6ff" }, // roxo
    { body: "#7fd68a", dark: "#357a4a", light: "#cdf3d2" }, // verde
  ];
  function makePoring(p) {
    const S = 16, off = document.createElement("canvas");
    off.width = S; off.height = S;
    const g = off.getContext("2d");
    const cx = 8, cy = 8.6, r = 6.6;
    for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
      const dx = x + 0.5 - cx, dy = (y + 0.5 - cy) * 1.06, d = Math.hypot(dx, dy);
      if (d <= r) {
        let col = p.body;
        if (d > r - 1.15) col = p.dark;
        else if (dy < -1.6 && dx < 1) col = p.light;
        g.fillStyle = col; g.fillRect(x, y, 1, 1);
      }
    }
    g.fillStyle = "#241030";                 // olhos
    g.fillRect(6, 8, 1, 2); g.fillRect(10, 8, 1, 2);
    g.fillRect(8, 11, 1, 1);                  // boquinha
    g.fillStyle = "rgba(255,255,255,.9)";     // brilho
    g.fillRect(5, 5, 1, 1);
    return off;
  }
  const SPRITES = PALETTES.map(makePoring);

  /* ---------- entidades ---------- */
  const rnd = (a, b) => a + Math.random() * (b - a);
  let stars = [], porings = [], sparks = [], auroras = [];
  function seed() {
    const area = innerWidth * innerHeight;
    const nStars = Math.min(120, Math.floor(area / 9000));
    const nPor = Math.min(16, Math.max(6, Math.floor(area / 90000)));
    stars = Array.from({ length: nStars }, () => {
      const layer = Math.random() < 0.6 ? 0 : Math.random() < 0.7 ? 1 : 2;
      return { x: Math.random(), y: Math.random(), r: (layer + 1) * rnd(0.5, 1.1), layer, tw: Math.random() * Math.PI * 2, c: Math.random() < 0.3 ? "#ffc24b" : Math.random() < 0.5 ? "#c77dff" : "#ffffff" };
    });
    porings = Array.from({ length: nPor }, () => {
      const depth = rnd(0.45, 1.5);
      return { s: SPRITES[Math.floor(Math.random() * SPRITES.length)], x: Math.random(), y: rnd(0.05, 0.95), depth, vx: rnd(0.004, 0.014) * (Math.random() < 0.5 ? 1 : -1), bobA: rnd(6, 18), bobP: Math.random() * Math.PI * 2, spin: rnd(-0.15, 0.15) };
    });
    auroras = [
      { x: 0.2, y: 0.15, r: 0.5, c: "157,78,221", vx: 0.00003, vy: 0.00002, ph: 0 },
      { x: 0.8, y: 0.3, r: 0.42, c: "87,214,224", vx: -0.000025, vy: 0.000018, ph: 1.7 },
      { x: 0.5, y: 0.85, r: 0.45, c: "255,95,162", vx: 0.00002, vy: -0.000022, ph: 3.1 },
    ];
    sparks = [];
  }

  /* ---------- parallax (mouse + scroll) ---------- */
  const target = { x: 0, y: 0 }, cur = { x: 0, y: 0 };
  if (FINE && !REDUCED) {
    addEventListener("pointermove", (e) => { target.x = (e.clientX / innerWidth - 0.5) * 2; target.y = (e.clientY / innerHeight - 0.5) * 2; }, { passive: true });
  }
  let scrollY = 0;
  addEventListener("scroll", () => { scrollY = window.scrollY || 0; }, { passive: true });

  /* ---------- loop ---------- */
  let t = 0, raf = null, running = true;
  function frame() {
    t += 0.016;
    cur.x += (target.x - cur.x) * 0.05;
    cur.y += (target.y - cur.y) * 0.05;
    const sPar = -(scrollY % 4000) * 0.02 * DPR; // parallax vertical do scroll

    ctx.clearRect(0, 0, W, H);

    // aurora (glows suaves à deriva)
    auroras.forEach((a) => {
      a.ph += 0.004;
      const ax = (a.x + Math.sin(a.ph) * 0.03) * W;
      const ay = (a.y + Math.cos(a.ph * 0.8) * 0.03) * H + sPar * 0.3;
      const rad = a.r * Math.min(W, H);
      const grd = ctx.createRadialGradient(ax, ay, 0, ax, ay, rad);
      grd.addColorStop(0, `rgba(${a.c},0.16)`);
      grd.addColorStop(1, `rgba(${a.c},0)`);
      ctx.fillStyle = grd; ctx.fillRect(0, 0, W, H);
    });

    // estrelas (camadas = profundidade)
    stars.forEach((s) => {
      const px = cur.x * (s.layer + 1) * 6 * DPR, py = cur.y * (s.layer + 1) * 6 * DPR + sPar * (s.layer + 1) * 0.5;
      const alpha = 0.35 + 0.45 * (0.5 + 0.5 * Math.sin(t * (1 + s.layer) + s.tw));
      ctx.globalAlpha = alpha;
      ctx.fillStyle = s.c;
      ctx.beginPath();
      ctx.arc(s.x * W + px, s.y * H + py, s.r * DPR, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    // porings pixelados flutuando
    ctx.imageSmoothingEnabled = false;
    porings.forEach((o) => {
      if (running) o.x += o.vx * 0.016;
      if (o.x > 1.08) o.x = -0.08; else if (o.x < -0.08) o.x = 1.08;
      const size = 26 * o.depth * DPR;
      const bob = Math.sin(t * (0.6 + o.depth) + o.bobP) * o.bobA * DPR * 0.4;
      const px = cur.x * o.depth * 22 * DPR, py = cur.y * o.depth * 16 * DPR + sPar * o.depth;
      const x = o.x * W + px, y = o.y * H + bob + py;
      ctx.globalAlpha = Math.min(1, 0.35 + o.depth * 0.5);
      // sombrinha/glow
      ctx.drawImage(o.s, x - size / 2, y - size / 2, size, size);
    });
    ctx.globalAlpha = 1;

    // brilhos dourados subindo
    if (running && Math.random() < 0.25 && sparks.length < 24) {
      sparks.push({ x: Math.random() * W, y: H + 10, vy: rnd(0.2, 0.7) * DPR, r: rnd(1, 2.4) * DPR, life: 1, c: Math.random() < 0.5 ? "255,194,75" : "199,125,255" });
    }
    sparks = sparks.filter((sp) => {
      sp.y -= sp.vy; sp.life -= 0.0025;
      if (sp.life <= 0 || sp.y < -10) return false;
      ctx.globalAlpha = sp.life * 0.8;
      ctx.fillStyle = `rgba(${sp.c},1)`;
      ctx.beginPath(); ctx.arc(sp.x + Math.sin(sp.y * 0.02) * 6, sp.y, sp.r, 0, Math.PI * 2); ctx.fill();
      return true;
    });
    ctx.globalAlpha = 1;

    if (running) raf = requestAnimationFrame(frame);
  }

  function start() { if (!raf) { running = true; raf = requestAnimationFrame(frame); } }
  function stop() { running = false; if (raf) { cancelAnimationFrame(raf); raf = null; } }

  function init() {
    resize(); seed();
    if (REDUCED) { frame(); return; } // um quadro estático
    start();
  }
  addEventListener("resize", () => { resize(); seed(); if (REDUCED) frame(); });
  document.addEventListener("visibilitychange", () => { if (document.hidden) stop(); else if (!REDUCED) start(); });
  init();
})();
