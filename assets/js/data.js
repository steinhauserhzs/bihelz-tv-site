/* ============================================================
   BIHELZ TV — DADOS DO SITE (v2 "Laboranok")
   Este arquivo é a fonte de conteúdo do site. Um agente pode
   regenerar a constante NEWS diariamente com as novidades do
   Ragnarok Online LATAM (pesquisadas na internet).
   Última atualização: 2026-07-09
   Fontes dos dados de jogo: browiki.org (LATAM) e irowiki.org
   (Renewal, tabela elemental pós-patch kRO 19/08/2024).
   ============================================================ */

const CANAL = {
  nome: "Bihelz TV",
  youtube: "@bihelzs",
  youtubeChannelId: "UCDr0kxeySD8NlVFpkI5W1Pw", // canal "bihelz tv" — as lives acontecem aqui
  instagram: "@bielz_life",
  discordConvite: "https://discord.gg/nn4MMAW9xm",
  discordInvite: "nn4MMAW9xm",              // código do convite (contador ao vivo via API)
  discordGuildId: "1524620145660792953",    // p/ widget.json (lista de online, se o widget for ativado)
  discordNome: "Laboranok do Ragnatório",
  // Chave da YouTube Data API v3 (pública, restrinja por referrer no Google Cloud).
  // Com ela o site detecta quando o Bihelz está ao vivo e embeda o chat real da
  // live (os usuários interagem com a própria conta do YouTube). Vazia = só o
  // player + botão "abrir no YouTube". Como pegar: Google Cloud → APIs → ativar
  // "YouTube Data API v3" → Credentials → API key.
  youtubeApiKey: "AIzaSyBIc-rNXudDaYMBkcI3BsPhOvnYe4uG2ag", // restrita por referrer a bihelztv.vercel.app
};

/* ---- NOTÍCIAS (atualizadas diariamente) ------------------- */
const NEWS = [
  {
    date: "2026-07-09",
    cat: "esports",
    title: "Stars LATAM 2026: inscrições abertas até 20 de julho!",
    text: "A Gravity, em parceria com a Gamers Club, abriu as inscrições do Ragnarok Online Stars LATAM 2026. Serão 4 classificatórias online em agosto e o Main Event em setembro — a melhor equipe da América Latina garante vaga na grande final global em Bangkok, na Tailândia. Monte sua equipe e representa a guilda!",
    url: "https://gamehall.com.br/ragnarok-online-stars-latam-2026-abre-inscricoes/",
    source: "GameHall",
  },
  {
    date: "2026-07-07",
    cat: "manutencao",
    title: "Manutenção semanal concluída (07/07)",
    text: "Os servidores do Ragnarok Online LATAM passaram pela manutenção programada de 7 de julho e já estão online. Confira as notas oficiais para ver os ajustes aplicados.",
    url: "https://ro.gnjoylatam.com/pt/news/notice",
    source: "Site oficial",
  },
  {
    date: "2026-07-06",
    cat: "evento",
    title: "Evento de aniversário chegou ao fim — pegou tudo?",
    text: "As celebrações de 1 ano do servidor terminaram em 06/07: recompensas de retorno, reinicialização gratuita de atributos e habilidades, bônus de EXP e drop por login diário. Se você aproveitou o reset grátis, agora é hora de testar a build nova!",
    url: "https://www.terra.com.br/gameon/ragnarok-online-latam-completa-um-ano-com-a-maior-atualizacao-da-sua-historia-e-o-brasil-e-o-coracao-disso-tudo,cccab7604a445bb8831e395ab90ec27f5gkh0w11.html",
    source: "Terra GameOn",
  },
  {
    date: "2026-07-05",
    cat: "dica",
    title: "5 motivos para (voltar a) jogar Ragnarok em 2026",
    text: "O Canaltech listou por que 2026 é um ótimo momento para entrar (ou voltar) em Rune-Midgard: servidor LATAM em crescimento, Classes 4, cena competitiva nova e a comunidade brasileira mais ativa do que nunca.",
    url: "https://canaltech.com.br/games/motivos-para-jogar-ragnarok-online-em-2026/",
    source: "Canaltech",
  },
  {
    date: "2026-07-01",
    cat: "update",
    title: "Roadmap: próximos conteúdos do ano serão revelados em julho",
    text: "A equipe do RO LATAM prometeu compartilhar ainda neste mês os detalhes dos próximos conteúdos principais de 2026. Fica de olho nas lives do Bihelz que a gente comenta tudo em tempo real!",
    url: "https://ro.gnjoylatam.com/pt/news/notice",
    source: "Site oficial",
  },
  {
    date: "2026-06-28",
    cat: "update",
    title: "Passe de Batalha chega em grande atualização",
    text: "O Ragnarok Online LATAM recebeu o Passe de Batalha em uma nova grande atualização, com trilha de recompensas gratuita e premium — mais um motivo pra fazer as missões diárias.",
    url: "https://www.folhavitoria.com.br/games/ragnarok-online-latam-passe-de-batalha-atualizacao/",
    source: "Folha Vitória",
  },
  {
    date: "2026-06-26",
    cat: "update",
    title: "Kumamon invade Rune-Midgard e o Episódio 18 chegou! 🐻",
    text: "O RO LATAM recebeu a colaboração com o Kumamon (mascote da província de Kumamoto, no Japão) junto com o aguardado Episódio 18: continuação da história principal, novas instâncias, equipamentos inéditos e sistemas avançados de reforma e encantamento — missões temáticas a partir do nível 100. Voltou também a tradicional Festa da Pipoca em Comodo (nível 30+). Conteúdo de sobra pra farmar nas lives do Bihelz!",
    url: "https://www.terra.com.br/gameon/plataformas-e-consoles/ragnarok-online-latam-recebe-colaboracao-com-kumamon,530e32c17b2928b49ae3276a6c3dd002tvx4bb3c.html",
    source: "Terra GameOn",
  },
  {
    date: "2026-06-25",
    cat: "update",
    title: "CLASSES 4 chegaram ao LATAM no aniversário de 1 ano! 🎉",
    text: "A maior atualização da história do servidor: as aguardadas Classes 4 chegaram junto com o aniversário de 1 ano do Ragnarok Online LATAM. Novas classes, novas skills e um novo teto de progressão — e o Brasil é o coração dessa comunidade.",
    url: "https://www.adrenaline.com.br/games/ragnarok-online-latam-classe-4/",
    source: "Adrenaline",
  },
];

const NEWS_CATS = {
  update: { label: "Atualização", cls: "ro-chip--update" },
  evento: { label: "Evento", cls: "ro-chip--evento" },
  esports: { label: "eSports", cls: "ro-chip--esports" },
  manutencao: { label: "Manutenção", cls: "ro-chip--manut" },
  dica: { label: "Dica", cls: "ro-chip--dica" },
};

/* ---- MVPs — respawn aproximado + dados de combate ----------
   mobId = Divine Pride (sprite hotlink + link de drops)
   element deve casar com as chaves da tabela elemental abaixo */
const MVPS = [
  { id: "baphomet", name: "Baphomet", emoji: "😈", mobId: 1039, map: "Labirinto da Floresta 3", min: 120, max: 130, element: "Sombrio", elv: 3, size: "Grande", race: "Demônio" },
  { id: "osiris", name: "Osíris", emoji: "🏺", mobId: 1038, map: "Pirâmide — Subsolo", min: 60, max: 70, element: "Maldito", elv: 4, size: "Médio", race: "Morto-Vivo" },
  { id: "eddga", name: "Eddga", emoji: "🐯", mobId: 1115, map: "Floresta de Payon 10", min: 120, max: 130, element: "Fogo", elv: 1, size: "Grande", race: "Bruto" },
  { id: "gtb", name: "Golden Thief Bug", emoji: "🪲", mobId: 1086, map: "Esgotos de Prontera 4", min: 60, max: 70, element: "Fogo", elv: 2, size: "Grande", race: "Inseto" },
  { id: "moonlight", name: "Flor do Luar", emoji: "🦊", mobId: 1150, map: "Caverna de Payon 4", min: 60, max: 70, element: "Fogo", elv: 3, size: "Médio", race: "Demônio" },
  { id: "mistress", name: "Mistress", emoji: "🐝", mobId: 1059, map: "Monte Mjolnir 4", min: 120, max: 130, element: "Vento", elv: 4, size: "Pequeno", race: "Inseto" },
  { id: "doppel", name: "Doppelganger", emoji: "⚔️", mobId: 1046, map: "Torre de Geffen 2", min: 120, max: 130, element: "Sombrio", elv: 3, size: "Médio", race: "Demônio" },
  { id: "orchero", name: "Herói Orc", emoji: "🪓", mobId: 1087, map: "Aldeia dos Orcs", min: 60, max: 70, element: "Terra", elv: 2, size: "Grande", race: "Semi-Humano" },
  { id: "orclord", name: "Lorde Orc", emoji: "👹", mobId: 1190, map: "Campo de Geffen 10", min: 120, max: 130, element: "Terra", elv: 4, size: "Grande", race: "Semi-Humano" },
  { id: "maya", name: "Maya", emoji: "🐜", mobId: 1147, map: "Formigueiro Infernal 2", min: 120, max: 130, element: "Terra", elv: 4, size: "Grande", race: "Inseto" },
  { id: "phreeoni", name: "Phreeoni", emoji: "👁️", mobId: 1159, map: "Deserto de Sograt 17", min: 120, max: 130, element: "Neutro", elv: 3, size: "Grande", race: "Bruto" },
  { id: "drake", name: "Drake", emoji: "🏴‍☠️", mobId: 1112, map: "Navio Fantasma", min: 120, max: 130, element: "Maldito", elv: 3, size: "Médio", race: "Morto-Vivo" },
];

/* ============================================================
   LAB DO CIENTISTA — dados verificados (browiki/irowiki)
   ============================================================ */
const LAB = {
  /* Farmacologia Avançada (GN_S_PHARMACY) — fórmula LATAM/Renewal:
     A = INT + DES/2 + SOR + NvClasse + Random[30,150] + (NvBase-100)
         + PesquisaPoções×5 + ProtQuímicaTotal×Random[4,10]
     B = Fator do nível da skill + Taxa do item
     A−B: ≥400 Máx | ≥300 Máx−3 | ≥100 Máx−4 | ≥1 Máx−5 | <0 Máx−6 */
  pharmacyFactor: [600, 580, 560, 540, 520, 500, 480, 460, 440, 420],
  pharmacyMaxBySkill: [7, 8, 8, 9, 9, 10, 10, 11, 11, 12],
  /* Taxas por item — valores do LATAM (bROWiki), que DIFEREM do iRO */
  pharmacyItems: [
    { name: "Poção Branca Especial", rate: 10 },
    { name: "Poção Vitata 500", rate: 20 },
    { name: "Suco Celular Enriquecido", rate: 30 },
    { name: "Poção de Recuperação", rate: 40 },
    { name: "Elixir Vermelho", rate: 80 },
    { name: "Energético Físico", rate: 120 },
    { name: "Energético Mágico", rate: 120 },
    { name: "Elixir Azul", rate: 160 },
    { name: "Elixir Dourado", rate: 160 },
    { name: "Poção X", rate: 160 },
    { name: "Esporo de Cogumelo Explosivo", rate: 15 },
    { name: "Semente de Planta Selvagem", rate: 30 },
    { name: "Semente de Planta Sanguessuga", rate: 30 },
    { name: "Poção de HP Pequena", rate: 10 },
    { name: "Poção de HP Média", rate: 20 },
    { name: "Poção de HP Grande", rate: 40 },
    { name: "Poção de SP Pequena", rate: 10 },
    { name: "Poção de SP Média", rate: 15 },
    { name: "Poção de SP Grande", rate: 20 },
  ],

  /* Homúnculos — nomes e comidas oficiais do LATAM (browiki) */
  homunculus: [
    { emoji: "👼", name: "Lif", evo: "Básico → Lif evoluído · Suporte (Humanoide)", food: "Ração para Bichinho", role: "Cura pelas Mãos e Esforço Mental — o enfermeiro da dupla." },
    { emoji: "🐑", name: "Amistr", evo: "Básico → Amistr evoluído · Tanque (Bruto)", food: "Zargônio", role: "Fortaleza e Pele de Adamantium — segura o tranco por você." },
    { emoji: "🦅", name: "Filir", evo: "Básico → Filir evoluído · DPS ágil (Bruto)", food: "Garleta", role: "Pica-Pau e Voo Frenético — dano rápido single-target." },
    { emoji: "🧪", name: "Vanilmirth", evo: "Básico → Vanilmirth evoluído · Mago (Amorfo)", food: "Scell", role: "Capricho e Mudança de Planos (+INT do dono) — O homúnculo do brewer: melhora sua Farmacologia!" },
    { emoji: "❄️", name: "Eira (Homunculus S)", evo: "Mutação nv.99 evoluído · Anjo / Vento", food: "Cristal de Neve", role: "Superestimular e Luz da Vida (ressuscita o dono) — suporte supremo." },
    { emoji: "🦄", name: "Bayeri (Homunculus S)", evo: "Mutação nv.99 evoluído · Bruto / Sagrado", food: "Planta Fresca", role: "Impacto Preciso e Luz Salvadora — o unicórnio sagrado." },
    { emoji: "🦂", name: "Sera (Homunculus S)", evo: "Mutação nv.99 evoluído · Inseto / Terra", food: "Gelatina de Maçã", role: "Analgésico (grande redução de dano) — coringa de PvM." },
    { emoji: "🌋", name: "Dieter (Homunculus S)", evo: "Mutação nv.99 evoluído · Amorfo / Fogo", food: "Cristal Gigante", role: "Piroclástico e Armadura de Granito — o favorito pra MVP." },
    { emoji: "🥊", name: "Eleanor (Homunculus S)", evo: "Mutação nv.99 evoluído · Humanoide / Veneno", food: "Pão", role: "Garra Supersônica e combos — lutadora single-target." },
  ],
  homunNote: "Mutação: com o homúnculo evoluído no nível 99, fale com Viorel em Lighthalzen. Pagando 50.000z você ESCOLHE o Homunculus S; de graça é aleatório. Qualquer básico pode virar qualquer S — mas a lealdade reseta.",
  homunQuiz: [
    { goal: "Caçar MVP / dano máximo", rec: "Dieter 🌋", why: "Piroclástico buffa seu dano e Inundação de Magma limpa a tela." },
    { goal: "Suporte e sobrevivência (WoE)", rec: "Eira ❄️", why: "Luz da Vida ressuscita você; Superestimular dá esquiva 500." },
    { goal: "PvM tranquilo com redução de dano", rec: "Sera 🦂", why: "Analgésico reduz muito o dano recebido pelo dono." },
    { goal: "Dano single-target consistente", rec: "Eleanor 🥊", why: "Garra Supersônica e combos derretem um alvo por vez." },
    { goal: "Sou brewer — vivo de Farmacologia", rec: "Vanilmirth evoluído 🧪", why: "Mudança de Planos aumenta INT e melhora sua taxa de brew." },
  ],

  /* Tabela elemental Renewal (pós-patch kRO 19/08/2024) — irowiki.org/wiki/Element
     Linha = elemento de DEFESA (alvo) · valores na ordem de attackNames */
  elements: {
    names: ["Neutro", "Água", "Terra", "Fogo", "Vento", "Veneno", "Sagrado", "Sombrio", "Fantasma", "Maldito"],
    table: {
      "Neutro 1":   [100, 100, 100, 100, 100, 100, 100, 100, 90, 100],
      "Água 1":     [100, 25, 100, 90, 150, 150, 100, 100, 100, 100],
      "Terra 1":    [100, 100, 25, 150, 90, 150, 100, 100, 100, 100],
      "Fogo 1":     [100, 150, 90, 25, 100, 150, 100, 100, 100, 90],
      "Vento 1":    [100, 90, 150, 100, 25, 150, 100, 100, 100, 100],
      "Veneno 1":   [100, 150, 150, 150, 150, 0, 75, 75, 75, 75],
      "Sagrado 1":  [100, 100, 100, 100, 100, 75, 0, 125, 90, 125],
      "Sombrio 1":  [100, 100, 100, 100, 100, 75, 125, 0, 90, 0],
      "Fantasma 1": [90, 100, 100, 100, 100, 75, 100, 100, 125, 100],
      "Maldito 1":  [100, 100, 100, 125, 100, 75, 125, 0, 100, 0],
      "Neutro 2":   [100, 100, 100, 100, 100, 100, 100, 100, 70, 100],
      "Água 2":     [100, 0, 100, 80, 175, 150, 100, 100, 100, 100],
      "Terra 2":    [100, 100, 0, 175, 80, 150, 100, 100, 100, 100],
      "Fogo 2":     [100, 175, 80, 0, 100, 150, 100, 100, 100, 80],
      "Vento 2":    [100, 80, 175, 100, 0, 150, 100, 100, 100, 100],
      "Veneno 2":   [100, 150, 150, 150, 150, 0, 75, 75, 75, 50],
      "Sagrado 2":  [100, 100, 100, 100, 100, 75, 0, 150, 80, 150],
      "Sombrio 2":  [100, 100, 100, 100, 100, 75, 150, 0, 80, 0],
      "Fantasma 2": [70, 100, 100, 100, 100, 75, 100, 100, 150, 125],
      "Maldito 2":  [100, 100, 100, 150, 100, 50, 150, 0, 125, 0],
      "Neutro 3":   [100, 100, 100, 100, 100, 100, 100, 100, 50, 100],
      "Água 3":     [100, 0, 100, 70, 200, 125, 100, 100, 100, 100],
      "Terra 3":    [100, 100, 0, 200, 70, 125, 100, 100, 100, 100],
      "Fogo 3":     [100, 200, 70, 0, 100, 125, 100, 100, 100, 70],
      "Vento 3":    [100, 70, 200, 100, 0, 125, 100, 100, 100, 100],
      "Veneno 3":   [100, 125, 125, 125, 125, 0, 50, 50, 50, 25],
      "Sagrado 3":  [100, 100, 100, 100, 100, 50, 0, 175, 70, 175],
      "Sombrio 3":  [100, 100, 100, 100, 100, 50, 175, 0, 70, 0],
      "Fantasma 3": [50, 100, 100, 100, 100, 50, 100, 100, 175, 150],
      "Maldito 3":  [100, 100, 100, 175, 100, 25, 175, 0, 150, 0],
      "Neutro 4":   [100, 100, 100, 100, 100, 100, 100, 100, 0, 100],
      "Água 4":     [100, 0, 100, 60, 200, 125, 100, 100, 100, 100],
      "Terra 4":    [100, 100, 0, 200, 60, 125, 100, 100, 100, 100],
      "Fogo 4":     [100, 200, 60, 0, 100, 125, 100, 100, 100, 60],
      "Vento 4":    [100, 60, 200, 100, 0, 125, 100, 100, 100, 100],
      "Veneno 4":   [100, 125, 125, 125, 125, 0, 50, 50, 50, 0],
      "Sagrado 4":  [100, 100, 100, 100, 100, 50, 0, 200, 60, 200],
      "Sombrio 4":  [100, 100, 100, 100, 100, 50, 200, 0, 60, 0],
      "Fantasma 4": [0, 100, 100, 100, 100, 50, 100, 100, 200, 175],
      "Maldito 4":  [100, 100, 100, 200, 100, 0, 200, 0, 175, 0],
    },
  },

  /* Modificadores de tamanho (só ataques físicos com arma; magia ignora) */
  sizes: [
    { name: "Desarmado", p: 100, m: 100, g: 100 },
    { name: "Adaga", p: 100, m: 75, g: 50 },
    { name: "Espada de 1 mão", p: 75, m: 100, g: 75 },
    { name: "Espada de 2 mãos", p: 75, m: 75, g: 100 },
    { name: "Lança", p: 75, m: 75, g: 100 },
    { name: "Lança (montado PecoPeco)", p: 75, m: 100, g: 100 },
    { name: "Lança (montado Dragão)", p: 100, m: 100, g: 100 },
    { name: "Machado", p: 50, m: 75, g: 100 },
    { name: "Maça", p: 75, m: 100, g: 100 },
    { name: "Cajado", p: 100, m: 100, g: 100 },
    { name: "Arco", p: 100, m: 100, g: 75 },
    { name: "Katar", p: 75, m: 100, g: 75 },
    { name: "Livro", p: 100, m: 100, g: 50 },
    { name: "Soqueira", p: 100, m: 100, g: 75 },
    { name: "Instrumento musical", p: 75, m: 100, g: 75 },
    { name: "Chicote", p: 75, m: 100, g: 50 },
    { name: "Arma de fogo", p: 100, m: 100, g: 100 },
    { name: "Shuriken Gigante", p: 75, m: 75, g: 100 },
  ],

  /* Rotina do Laboranok — reset diário 04:00 BRT · WoE dom 20h–22h BRT */
  dailies: [
    { id: "login", nome: "Login diário (recompensa + Passe de Batalha)", freq: "diaria" },
    { id: "liga", nome: "Liga dos Desbravadores — Alberta (116, 71), até 10 tarefas", freq: "diaria" },
    { id: "cacadas", nome: "Missões de caça do quadro", freq: "diaria" },
    { id: "instancias", nome: "Instâncias diárias (cooldown)", freq: "diaria" },
    { id: "brew", nome: "Brew do dia — Farmacologia com Vanilmirth de INT 🧪", freq: "diaria" },
    { id: "woe", nome: "Guerra do Emperium — domingo 20h às 22h", freq: "semanal" },
    { id: "semanais", nome: "Instâncias semanais (EDDA e afins)", freq: "semanal" },
  ],
};

/* ---- ARSENAL DO LABORATÓRIO — links curados pela pesquisa --- */
const ARSENAL = [
  { categoria: "Database", name: "Divine Pride (LATAM)", url: "https://www.divine-pride.net/", description: "O database de referência mundial — itens, monstros e skills com dados do servidor LATAM (?server=LATAM)." },
  { categoria: "Database", name: "Latam RO", url: "https://latam.ro/", description: "Database feito para o RO LATAM, com Leveling Helper de onde upar por nível." },
  { categoria: "Database", name: "RagnaPlace (PT)", url: "https://ragnaplace.com/pt/rolatam-pt/stats/simulator", description: "Database + simuladores de atributos e skills com seção dedicada ao LATAM em português." },
  { categoria: "Calculadora", name: "Calculadora LATAM (calc do Nas)", url: "https://lzcouto.github.io/nas-calc-host/", description: "Calculadora de build/dano feita pela comunidade especificamente para o Ragnarok LATAM." },
  { categoria: "Calculadora", name: "tong-calc (Classes 4)", url: "https://turugrura.github.io/tong-calc-ro-host/", description: "Calculadora renewal com suporte completo às Classes 4 — incluindo a linha Bioquímico/Cientista." },
  { categoria: "Calculadora", name: "iRO Wiki Calculator", url: "https://calc.irowiki.org/", description: "A calculadora renewal mais usada do mundo; gera URL compartilhável — perfeita pra publicar builds do Bihelz." },
  { categoria: "Calculadora", name: "Simulador de Skills (Classes 4)", url: "https://irowiki.org/~himeyasha/skill7/", description: "Simulador da árvore de skills das Classes 4 (incluindo o Cientista) com build por URL." },
  { categoria: "Calculadora", name: "LATAM Tools", url: "https://latam-tools.com.br/", description: "Hub open source da comunidade LATAM: builds, calculadoras, montador de visuais e RagnaRecap (replay de WoE)." },
  { categoria: "Wiki", name: "bROWiki", url: "https://browiki.org/", description: "A wiki em português mais completa — mecânicas, classes, quests, homúnculos e Farmacologia do LATAM." },
  { categoria: "Wiki", name: "iRO Wiki", url: "https://irowiki.org/", description: "Referência internacional para mecânicas Renewal, Classes 4, dailies e instâncias." },
  { categoria: "Wiki", name: "RolaGuiada", url: "https://www.rolaguiada.com.br/classes", description: "Guias PT-BR do RO LATAM: builds por classe, tier list PvM e rotas de leveling." },
  { categoria: "Wiki", name: "MeuRag", url: "https://www.meurag.com/", description: "Portal PT-BR: guia de up 1–250, simuladores, rastreador de dailies e MVPs." },
  { categoria: "Mercado", name: "ROla Market", url: "https://rolamarket.com/", description: "Tracker de lojinhas e preços do RO LATAM — a referência de preço fora do jogo. Confira antes de anunciar no Trade!" },
  { categoria: "Mercado", name: "Pesquisa de Mercado oficial", url: "https://ro.gnjoylatam.com/pt/intro/shop-search/market-price", description: "Ferramenta oficial GNJoy: preço médio de transações e ranking semanal de itens." },
  { categoria: "Oficial", name: "Notícias oficiais RO LATAM", url: "https://ro.gnjoylatam.com/pt/news/notice", description: "Avisos, patch notes, eventos e manutenções direto da Gravity." },
  { categoria: "Oficial", name: "Guia oficial da WoE", url: "https://ro.gnjoylatam.com/pt/intro/guide?cate=6-20", description: "Como funciona a Guerra do Emperium no LATAM, direto da fonte." },
  { categoria: "Oficial", name: "Discord oficial RO LATAM", url: "https://discord.gg/ragnarokonlinelatam", description: "O servidor oficial da Gravity LATAM — anúncios e suporte." },
  { categoria: "Comunidade", name: "myROverse", url: "https://myroverse.com/", description: "Portal de notícias da comunidade focado em RO LATAM — fonte do nosso radar ao vivo." },
];

/* ---- CENTRAL DO AVENTUREIRO (busca estilo op.gg) -----------
   Não existe op.gg oficial nem API pública de perfil de jogador
   no RO LATAM — então isto é um launcher de busca para os
   melhores destinos (todos testados, abrem em nova aba com o
   termo já preenchido). {q} é substituído pelo termo buscado. */
const SEARCH = {
  database: [
    { name: "Divine Pride", desc: "Itens, monstros, cartas e skills — com dados do servidor LATAM.", url: "https://www.divine-pride.net/database/search?q={q}" },
    { name: "bROWiki", desc: "A wiki em português — mecânicas, quests, classes e receitas.", url: "https://browiki.org/index.php?search={q}" },
    { name: "Latam RO", desc: "Database feito pro RO LATAM.", url: "https://latam.ro/?s={q}" },
  ],
  jogador: [
    { name: "ROla Market", desc: "Ache as lojinhas e o que um vendedor está anunciando (o mais perto de um 'perfil').", url: "https://rolamarket.com/" },
    { name: "Site oficial RO LATAM", desc: "Ranking de personagens e guildas, direto da Gravity.", url: "https://ro.gnjoylatam.com/pt" },
    { name: "Calculadora LATAM (calc do Nas)", desc: "Reproduza a build de alguém e compare a sua.", url: "https://lzcouto.github.io/nas-calc-host/" },
  ],
};

/* ---- GUIAS -------------------------------------------------- */
const GUIDES = [
  {
    emoji: "🌟",
    title: "Classes 4: o que muda e como evoluir",
    tag: "Atualização de 2026",
    html: `<p>As <strong>Classes 4</strong> chegaram ao LATAM na atualização de aniversário. O essencial:</p><ul>
      <li>Requisito: <strong>nível 200/70</strong> na classe 3 — o novo teto é <strong>250/50</strong>.</li>
      <li>A linha do Bihelz: Mercador → Alquimista → Criador → Bioquímico → <strong>Cientista</strong> (sim, é o nome oficial!).</li>
      <li>Se você usou o <strong>reset gratuito</strong> do evento de aniversário, realoque atributos pensando nas skills novas.</li>
      <li>Nas lives, o Bihelz testa builds das Classes 4 com a galera — traz a sua para discutir no chat!</li></ul>`,
  },
  {
    emoji: "⚗️",
    title: "A linha do Cientista: do Mercador ao Biolo",
    tag: "A classe do Bihelz",
    html: `<p>O caminho oficial no LATAM: <strong>Mercador → Alquimista → Criador → Bioquímico → Cientista</strong>.</p><ul>
      <li><strong>Bioquímico</strong> (classe 3): Canhão de Prótons, Planta Infernal, Farmacologia Avançada e Culinária Avançada.</li>
      <li><strong>Cientista</strong> (classe 4): Atirar Ácido em 4 elementos, Cultivar plantas de batalha (Vinha, Bárbaro, Fada, Árvore Infernal), Eureka e Manipular Poção.</li>
      <li>Bônus de atributos do Cientista: FOR+5, AGI+6, VIT+8, <strong>INT+12</strong>, DES+8, SOR+4 — feito pra quem brewa.</li>
      <li>Use a <strong>Calculadora do Cientista</strong> aqui do Lab pra planejar seus brews com as taxas do LATAM.</li></ul>`,
  },
  {
    emoji: "⚔️",
    title: "Guia de upar: do Poring ao late game",
    tag: "Iniciantes",
    html: `<p>Rota clássica de leveling para quem está começando no LATAM:</p><ul>
      <li><strong>1–20:</strong> Porings, Fabres e Rockers nos campos de Prontera. Missões de tutorial dão um bom empurrão.</li>
      <li><strong>20–50:</strong> Esporos em Payon, Lobos e Mukas. Entre num grupo — EXP compartilhada acelera muito.</li>
      <li><strong>50–80:</strong> Orcs, Geographers e missões de caça do quadro. Instâncias em grupo valem ouro.</li>
      <li><strong>80+:</strong> feche grupo no <em>Jogar Junto</em> aqui do site e vá de instâncias diárias + missões de caça.</li>
      <li>Dica de ouro: a <strong>Liga dos Desbravadores</strong> (Alberta 116,71) dá até 10 tarefas por dia — EXP fácil.</li></ul>`,
  },
  {
    emoji: "💰",
    title: "Como farmar zeny sem sofrer",
    tag: "Economia",
    html: `<p>Zeny é o que move Rune-Midgard. Caminhos que funcionam:</p><ul>
      <li><strong>Farme materiais com demanda constante</strong> (cartas, elementais, consumíveis de WoE) e venda no Mercado.</li>
      <li><strong>Confira os preços no ROla Market</strong> (link no Arsenal) antes de anunciar no quadro de Trade daqui.</li>
      <li><strong>MVPs</strong>: use o Timer de MVP para chegar na janela certa. Drop de MVP paga o mês.</li>
      <li>Brewer ganha bem: poções de Farmacologia têm demanda infinita em WoE — calcule a margem no Lab.</li></ul>`,
  },
  {
    emoji: "🏆",
    title: "Stars LATAM 2026: como participar",
    tag: "Competitivo",
    html: `<p>O circuito oficial da Gravity com a Gamers Club está aberto:</p><ul>
      <li><strong>Inscrições até 20/07/2026</strong> — monte sua equipe e registre no site da Gamers Club.</li>
      <li><strong>Agosto:</strong> 4 classificatórias online. <strong>Setembro:</strong> Main Event.</li>
      <li>O campeão da LATAM ganha vaga na <strong>final global em Bangkok</strong>, na Tailândia! 🇹🇭</li>
      <li>Procurando time? Poste no <em>Jogar Junto</em> com objetivo "WoE/PvP" e encontre a galera da comunidade.</li></ul>`,
  },
  {
    emoji: "☠️",
    title: "MVP para iniciantes: etiqueta e estratégia",
    tag: "PvM",
    html: `<p>Caçar MVP é das coisas mais divertidas do jogo — com regras não escritas:</p><ul>
      <li><strong>Respeite quem chegou primeiro</strong> e está lutando. Roubo de MVP mancha seu nome no servidor.</li>
      <li>Use o <strong>Timer de MVP</strong> daqui do site: registre a morte, veja o elemento do chefe e os melhores elementos de ataque.</li>
      <li>Leve <strong>Asas de Mosca</strong> para varrer o mapa rápido e consumíveis de sobra.</li>
      <li>Em grupo, combine o loot antes. Amizade vale mais que uma carta (quase sempre 😅).</li></ul>`,
  },
  {
    emoji: "🛡️",
    title: "WoE / GvG: primeiro contato",
    tag: "PvP",
    html: `<p>A Guerra do Emperium é o coração competitivo do Ragnarok — no LATAM ela rola <strong>domingo, das 20h às 22h</strong> (horário de Brasília), com 16 castelos em Prontera, Al De Baran, Payon e Geffen.</p><ul>
      <li>Entre numa <strong>guilda ativa</strong> — sem guilda não há WoE. Pergunte no Discord do Laboranok.</li>
      <li>Tenha uma <strong>build dedicada</strong>: equipamentos de redução e consumíveis são obrigatórios.</li>
      <li>Poções de Farmacologia (Elixires, Energéticos) são o combustível da guerra — brewers são VIP.</li>
      <li>Assista às lives do Bihelz nos dias de WoE para aprender as rotações e táticas do meta LATAM.</li></ul>`,
  },
];

/* ---- SEEDS dos quadros (aparecem no primeiro acesso) -------- */
const SEED_PARTY = [
  {
    id: "seed-p1",
    nick: "Bihelz",
    classe: "Cientista",
    nivel: "200",
    objetivo: "MVP",
    horario: "Hoje, 21h (durante a live)",
    contato: "youtube.com/@bihelzs (chat da live)",
    desc: "Caçada de MVP com a galera da live! Traz teu buffer que a gente divide o loot no sorteio.",
    ts: 1751990400000,
  },
  {
    id: "seed-p2",
    nick: "AcolyteDaGuilda",
    classe: "Arcebispo",
    nivel: "187",
    objetivo: "Upar",
    horario: "Seg a sex, 19h–22h",
    contato: "Discord: acolyte#0001",
    desc: "FS full suporte procura grupo fixo de instância diária. Tenho Gloria e Magnificat no ponto.",
    ts: 1751904000000,
  },
  {
    id: "seed-p3",
    nick: "ZenyHunterBR",
    classe: "Sentinela",
    nivel: "194",
    objetivo: "Instância",
    horario: "Fins de semana, tarde",
    contato: "Discord: zenyhunter#4242",
    desc: "Fecho DPS pra qualquer instância. Só chegar, marcar horário e partiu.",
    ts: 1751817600000,
  },
];

const SEED_TRADE = [
  {
    id: "seed-t1",
    tipo: "vendo",
    item: "Poção Branca Especial (x100)",
    detalhe: "Brew fresco do Laboranok, feito com carinho científico",
    preco: 900000,
    contato: "youtube.com/@bihelzs (chat da live)",
    ts: 1751990400000,
  },
  {
    id: "seed-t2",
    tipo: "compro",
    item: "Carta Poring",
    detalhe: "Pago bem, é pra coleção",
    preco: 150000,
    contato: "Discord: colecionador#7777",
    ts: 1751904000000,
  },
  {
    id: "seed-t3",
    tipo: "vendo",
    item: "Elixir Vermelho (x30)",
    detalhe: "Estoque pra WoE de domingo",
    preco: 2400000,
    contato: "Discord: mercador#2020",
    ts: 1751817600000,
  },
  {
    id: "seed-t4",
    tipo: "compro",
    item: "Equipos de WoE (set redução)",
    detalhe: "Montando build pro Stars LATAM",
    preco: 12000000,
    contato: "Discord: woeplayer#3131",
    ts: 1751731200000,
  },
];

/* ---- Classes para o formulário de party (nomes LATAM) ------- */
const CLASSES = [
  "Cientista", "Cavaleiro do Dragão", "Guarda Imperial", "Arcanjo",
  "Inquisidor", "Arquimago", "Mestre Elemental", "Falcoeiro",
  "Trovador/Musa", "Cruz Sombria", "Perseguidor Abissal", "Meister",
  "Arcebispo", "Bioquímico", "Sentinela", "Outra",
];

/* ---- Programação de lives (ajuste com o Bihelz) ------------- */
const SCHEDULE = [
  { dia: "Segunda", hora: "19h", tema: "Upando com a guilda" },
  { dia: "Quarta", hora: "19h", tema: "Caçada de MVP" },
  { dia: "Quinta", hora: "19h", tema: "Brew & Build — laboratório aberto" },
  { dia: "Domingo", hora: "19h30", tema: "Esquenta + WoE (20h–22h)" },
];

/* ============================================================
   DATABASE & NOSTALGIA — dados curados (pesquisa verificada:
   itens/builds via bROWiki/irowiki/rolaguiada; BGMs com IDs de
   YouTube confirmados). Fonte item DB: não há API RO aberta+CORS+pt-BR
   (Divine Pride/RagnaAPI sem CORS), então itens são curados +
   catálogo completo via launcher da Central do Aventureiro.
   ============================================================ */

const ESSENTIAL_ITEMS = [
  {
    "nome": "Carta de Poring",
    "tipo": "Carta",
    "efeito": "Compõe em Armadura. SOR +2 e Esquiva Perfeita +1. A carta mais amada e simbólica do RO.",
    "nostalgico": true
  },
  {
    "nome": "Carta de Angeling",
    "tipo": "Carta",
    "efeito": "Compõe em Armadura. Converte a armadura para o elemento Sagrado.",
    "nostalgico": true
  },
  {
    "nome": "Carta de Ghostring",
    "tipo": "Carta",
    "efeito": "Compõe em Armadura. Torna a armadura elemento Fantasma (imunidade parcial a Neutro), mas reduz a recuperação de HP em 25%. Lendária pra tankar.",
    "nostalgico": true
  },
  {
    "nome": "Carta de Deviling",
    "tipo": "Carta",
    "efeito": "Compõe em Armadura. Reduz 50% do dano de elemento Neutro recebido, mas aumenta em 50% o dano de todos os outros elementos.",
    "nostalgico": true
  },
  {
    "nome": "Carta de Doppelganger",
    "tipo": "Carta",
    "efeito": "Compõe em Arma. Aumenta a Velocidade de Ataque (ASPD).",
    "nostalgico": true
  },
  {
    "nome": "Carta de Phreeoni",
    "tipo": "Carta",
    "efeito": "Precisão (HIT) +100. Clássica pra garantir acerto.",
    "nostalgico": true
  },
  {
    "nome": "Carta de Bicho-Ladrão Dourado",
    "tipo": "Carta",
    "efeito": "Compõe em Armadura. Anula todas as magias que atingem você, mas dobra o custo de SP das suas habilidades.",
    "nostalgico": true
  },
  {
    "nome": "Carta de Orc Herói",
    "tipo": "Carta",
    "efeito": "Compõe em Elmo. Imunidade a Atordoamento e VIT +3. Item de sonho de todo tanker antigo.",
    "nostalgico": true
  },
  {
    "nome": "Carta de Orc Lorde",
    "tipo": "Carta",
    "efeito": "Compõe em Armadura. Reflete 30% do dano físico corpo a corpo de volta ao atacante.",
    "nostalgico": true
  },
  {
    "nome": "Carta de Baphomet",
    "tipo": "Carta",
    "efeito": "Compõe em Arma. Adiciona dano em área (splash) ao redor do alvo atingido.",
    "nostalgico": true
  },
  {
    "nome": "Carta de Hydra",
    "tipo": "Carta",
    "efeito": "Compõe em Arma. +20% de dano contra a raça Humanoide (Demi-Humano).",
    "nostalgico": true
  },
  {
    "nome": "Carta de Sapo Thara",
    "tipo": "Carta",
    "efeito": "Compõe em Escudo. Reduz 30% do dano recebido de Humanoides. Essencial em PvP/GvG.",
    "nostalgico": true
  },
  {
    "nome": "Carta de Raydric",
    "tipo": "Carta",
    "efeito": "Compõe em Manto. Reduz 20% do dano de elemento Neutro. A carta de manto mais usada da história.",
    "nostalgico": true
  },
  {
    "nome": "Carta de Flor do Luar",
    "tipo": "Carta",
    "efeito": "Compõe em Calçado. Concede velocidade de movimento aumentada constante.",
    "nostalgico": true
  },
  {
    "nome": "Carta de Marc",
    "tipo": "Carta",
    "efeito": "Compõe em Armadura. Imunidade a Congelamento e resistência ao elemento Água.",
    "nostalgico": true
  },
  {
    "nome": "Carta de Mistress",
    "tipo": "Carta",
    "efeito": "Compõe em Elmo. Suas habilidades não consomem Pedras/Gemas.",
    "nostalgico": true
  },
  {
    "nome": "Poção Vermelha",
    "tipo": "Consumível",
    "efeito": "Recupera cerca de 45 de HP. A poção mais básica e nostálgica do jogo.",
    "nostalgico": true
  },
  {
    "nome": "Poção Laranja",
    "tipo": "Consumível",
    "efeito": "Recupera uma quantidade moderada de HP.",
    "nostalgico": true
  },
  {
    "nome": "Poção Branca",
    "tipo": "Consumível",
    "efeito": "Recupera cerca de 325 de HP. Feita com Ervas Brancas.",
    "nostalgico": true
  },
  {
    "nome": "Poção Azul",
    "tipo": "Consumível",
    "efeito": "Recupera SP. Vital pra conjuradores.",
    "nostalgico": true
  },
  {
    "nome": "Fruta Mastela",
    "tipo": "Consumível",
    "efeito": "Recupera grande quantidade de HP instantaneamente.",
    "nostalgico": true
  },
  {
    "nome": "Asa de Mosca",
    "tipo": "Consumível",
    "efeito": "Teleporta o personagem para um ponto aleatório do mapa atual.",
    "nostalgico": true
  },
  {
    "nome": "Asa de Borboleta",
    "tipo": "Consumível",
    "efeito": "Retorna ao ponto de save (cidade memorizada).",
    "nostalgico": true
  },
  {
    "nome": "Semente de Yggdrasil",
    "tipo": "Consumível",
    "efeito": "Recupera uma boa quantidade de HP e SP de uma vez.",
    "nostalgico": true
  },
  {
    "nome": "Folha de Yggdrasil",
    "tipo": "Consumível",
    "efeito": "Ressuscita um personagem caído (usada na habilidade de reviver).",
    "nostalgico": true
  },
  {
    "nome": "Baga de Yggdrasil",
    "tipo": "Consumível",
    "efeito": "Recupera 100% do HP e SP. O famoso 'ygg berry', item mais valioso em batalha.",
    "nostalgico": true
  },
  {
    "nome": "Pedra Azul",
    "tipo": "Consumível",
    "efeito": "Reagente de habilidades (Teletransporte em grupo, Muralha da Segurança, etc.).",
    "nostalgico": true
  },
  {
    "nome": "Pedra Vermelha",
    "tipo": "Consumível",
    "efeito": "Reagente de várias habilidades de conjuradores.",
    "nostalgico": true
  },
  {
    "nome": "Água Benta",
    "tipo": "Consumível",
    "efeito": "Usada em habilidades sagradas (Aspersio) e pra converter a arma para o elemento Sagrado.",
    "nostalgico": true
  },
  {
    "nome": "Embrião",
    "tipo": "Consumível",
    "efeito": "Invoca o Homúnculo do Alquimista/Criador/Bioquímico. Item-símbolo da linha do Mercador que o Bihelz joga.",
    "nostalgico": true
  },
  {
    "nome": "Frasco de Ácido",
    "tipo": "Consumível",
    "efeito": "Munição da Demonstração Ácida / Terror Ácido (Bioquímico/Criador). Dano baseado em VIT do alvo.",
    "nostalgico": true
  },
  {
    "nome": "Granada (Frasco Incendiário)",
    "tipo": "Consumível",
    "efeito": "Frasco arremessável que causa dano de Fogo em área (habilidade Arremesso de Poção).",
    "nostalgico": true
  },
  {
    "nome": "Frasco de Planta",
    "tipo": "Consumível",
    "efeito": "Invoca uma planta (ex.: Cogumelo/Alface) para bloquear inimigos ou coletar itens.",
    "nostalgico": true
  },
  {
    "nome": "Frasco de Esfera Marinha",
    "tipo": "Consumível",
    "efeito": "Invoca uma Esfera Marinha que explode causando dano de elemento Água.",
    "nostalgico": true
  },
  {
    "nome": "Verniz Reluzente",
    "tipo": "Consumível",
    "efeito": "Reagente da Proteção Química: reveste um equipamento protegendo-o contra quebra.",
    "nostalgico": true
  },
  {
    "nome": "Poção Vermelha Condensada",
    "tipo": "Consumível",
    "efeito": "Versão fabricada pelo Alquimista: cura mais rápido (cast instantâneo) e pesa menos.",
    "nostalgico": true
  },
  {
    "nome": "Erva Vermelha",
    "tipo": "Consumível",
    "efeito": "Ingrediente base para fabricar poções na habilidade Preparar Poção. Reagente de fundo.",
    "nostalgico": false
  },
  {
    "nome": "Oridecon",
    "tipo": "Refino",
    "efeito": "Mineral usado para refinar/aprimorar armas de nível 3 e 4.",
    "nostalgico": true
  },
  {
    "nome": "Elunium",
    "tipo": "Refino",
    "efeito": "Mineral usado para refinar/aprimorar armaduras e equipamentos de defesa.",
    "nostalgico": true
  },
  {
    "nome": "Fragmento Estelar",
    "tipo": "Refino",
    "efeito": "Usado para forjar armas de elemento Fogo e aumentar o ATK ao criar armas (Ferreiro).",
    "nostalgico": true
  },
  {
    "nome": "Fita",
    "tipo": "Acessório de Cabeça",
    "efeito": "SP máximo +10. Acessório de cabeça clássico e barato.",
    "nostalgico": true
  },
  {
    "nome": "Óculos de Sol",
    "tipo": "Acessório de Cabeça",
    "efeito": "Reduz a duração do estado Cego. Visual icônico dos personagens antigos.",
    "nostalgico": true
  },
  {
    "nome": "Espada de Fogo",
    "tipo": "Arma",
    "efeito": "Espada de elemento Fogo com chance de causar queimadura no alvo.",
    "nostalgico": true
  },
  {
    "nome": "Arco Gakkung",
    "tipo": "Arma",
    "efeito": "Arco de dois toques clássico dos arqueiros; alto ataque para o custo.",
    "nostalgico": true
  },
  {
    "nome": "Calcinha",
    "tipo": "Armadura",
    "efeito": "Armadura leve; combo clássico com a Camiseta concede bônus de Esquiva e SP para iniciantes.",
    "nostalgico": true
  },
  {
    "nome": "Broquel",
    "tipo": "Escudo",
    "efeito": "Escudo pequeno clássico; boa defesa e base para compor a Carta de Sapo Thara.",
    "nostalgico": true
  },
  {
    "nome": "Manual de Batalha",
    "tipo": "Consumível",
    "efeito": "Aumenta a EXP obtida em 50% por tempo limitado. Item de era moderna/cash-shop (não clássico).",
    "nostalgico": false
  },
  {
    "nome": "Poção de HP Concentrada",
    "tipo": "Consumível",
    "efeito": "Poção de cura da era Renewal com recuperação percentual de HP. Item moderno, não pré-renewal.",
    "nostalgico": false
  }
];

const PRE_BUILDS = [
  {
    "classe": "Biolo (4ª da linha Criador/Mercador)",
    "nome": "Canhão de Prótons",
    "foco": "Farm / PvM",
    "stats": "INT alto (limite útil ~120-130), DES alto p/ reduzir conjuração, resto em VIT p/ sobreviver; POD/CON quando disponíveis nos traços de 4ª classe",
    "skills": [
      "Canhão de Prótons",
      "Aprimorar Carrinho (escala o dano)",
      "Zona Acidificada / Ácido Terror",
      "Erva Maligna",
      "Reforço de Carrinho",
      "Chamado dos Homúnculos"
    ],
    "equips": [
      "Munição de bala de canhão (obrigatório ter carrinho)",
      "Arma que some MATK/INT (haste ou adaga com cartas de INT)",
      "Armadura/acessórios com foco em INT e redução de conjuração",
      "Set de farm inicial (barato) + cartas de raça/elemento no alvo",
      "Trevo de Mora ou item que reduza after-cast p/ spammar"
    ],
    "descricao": "É a build da linha do Bihelz na 4ª classe e uma das melhores p/ começar o servidor e farmar conteúdo médio rápido. O Canhão de Prótons NUNCA erra (ignora esquiva), IGNORA a DEF do alvo e escala com sua INT somada ao nível de Aprimorar Carrinho. Priorize DES suficiente p/ deixar o cast quase instantâneo e um bom pós-conjuração (80-90% de redução já é excelente) p/ transformar a skill numa metralhadora. Zona Acidificada e Erva Maligna cuidam do AoE quando precisar puxar mobs."
  },
  {
    "classe": "Criador / Genetic (3ª da linha Mercador)",
    "nome": "Canhão de Carga (Cart Cannon)",
    "foco": "Farm / MVP",
    "stats": "FOR ~100 e INT ~100 (o dano soma ATK+MATK), resto em DES p/ o canhão não errar e reduzir cast; um pouco de VIT/AGI conforme o equip",
    "skills": [
      "Canhão de Carga (Cart Cannon)",
      "Erva Maligna (Crazy Weed)",
      "Reforço de Carrinho (Cart Boost)",
      "Bomba Ácida (single-target/MVP)",
      "Reforma de Carrinho (aumenta o dano do canhão)"
    ],
    "equips": [
      "Arma tipo Slash [1]/[2] ou similar com cartas de raça (ex.: Encantado/Hydra)",
      "Escudo com carta de redução por raça/tamanho",
      "Munição de bala de canhão sempre no inventário",
      "Acessórios de FOR/INT (Anel de Força, broches de dano) e capa/sapatos de esquiva",
      "Cartas de INT/FOR na armadura e headgear de dano"
    ],
    "descricao": "A pré-build clássica da linha do Bihelz antes da 4ª classe: barata, forte e ótima p/ farmar em área. O Canhão de Carga dispara munição do carrinho num alvo com dano altíssimo, escalando com FOR, INT e o nível de Reforma de Carrinho. Use Erva Maligna p/ agrupar/derrubar plantas e limpar telas, mantendo Reforço de Carrinho ligado p/ mobilidade. Pra MVP, troque parte do farm por Bomba Ácida (dano single-target baseado em VIT do alvo)."
  },
  {
    "classe": "Cavaleiro Dragão (4ª de Cavaleiro Rúnico)",
    "nome": "Sopro do Dragão (Dragon Breath)",
    "foco": "MVP / PvM",
    "stats": "VIT 105-120 e INT 80-110 (o Sopro escala com HP e SP máximos), DES 60-90 p/ cast, FOR baixa; muito dependente de refino/equip",
    "skills": [
      "Sopro do Dragão - Fogo",
      "Sopro do Dragão - Água/Gelo",
      "Comando do Dragão (reduz delay/buffa o sopro)",
      "Aura Dracônica (opção física single-target)",
      "Poder de Estouro / Fúria"
    ],
    "equips": [
      "Set Runa Ur (conseguido de graça em Mora, +50% no Sopro)",
      "Tae Goo Lyeon (arma) p/ ganho de status",
      "Bota/acessório Temporal de DES e Luva da Destreza p/ cast",
      "Cartas e encantes que aumentem HP/SP máximos"
    ],
    "descricao": "Build de dano em área que vive de HP e SP máximos: quanto mais gordo e refinado, mais forte o Sopro. Empilhe VIT+INT p/ inflar os recursos e DES o suficiente p/ o cast ficar confortável. Alterne Sopro de Fogo e de Água/Gelo conforme o elemento do alvo e use Comando do Dragão p/ manter o spam. Flexível: serve em PvM, MVP e leva bem em WoE se o equip acompanhar."
  },
  {
    "classe": "Arcano / Arch Mage (4ª de Bruxo/Mago)",
    "nome": "Impacto Espiritual",
    "foco": "MVP / PvM",
    "stats": "INT máximo (mirar 130), DES alto p/ conjuração, resto em AGI (cancelamento de animação p/ spammar) ou SAB/POD conforme os traços; corte VIT/LUK se faltar INT",
    "skills": [
      "Impacto Espiritual (dano principal)",
      "Cometa (nv 1 p/ potencializar o Impacto; nv 5 p/ AoE pesado)",
      "Meteoro Escarlate",
      "Chamas de Hela",
      "Corrente Elétrica",
      "Domínio Mágico"
    ],
    "equips": [
      "Haste/livro com alto MATK e cartas de MATK",
      "Peças com redução de tempo de conjuração variável (Kardui + Fragmento de Yggdrasil)",
      "Acessórios e encantes de INT e de dano por raça/elemento",
      "Headgear de MATK; itens que dão cancelamento de animação p/ o spam"
    ],
    "descricao": "O carro-chefe atual do Arcano é spammar Impacto Espiritual com Cometa nv 1 aprendido só p/ buffar o multiplicador de dano. Foque INT e DES p/ cast quase instantâneo e AGI o bastante p/ cancelar animação e disparar sem parar. Cometa nv 5, Meteoro Escarlate e Chamas de Hela entram quando o alvo aguenta um AoE mais gordo. Excelente em MVP single-target e limpa mapas com facilidade."
  },
  {
    "classe": "Cardeal (4ª de Arcebispo)",
    "nome": "Suporte Total (Full Support)",
    "foco": "Suporte / WoE / Instâncias",
    "stats": "INT alto e DES alto (cast rápido de cura/buff), VIT p/ não cair, um pouco de SAB/LUK; sem foco em dano",
    "skills": [
      "Cura / Recuperação Total",
      "Bênção e Agilidade",
      "Santuário (Sanctuary)",
      "Ressurreição",
      "Poder Sagrado / buffs de 4ª classe",
      "Petitio / Adoração (dano opcional)"
    ],
    "equips": [
      "Cajado de cura com bônus de recuperação e redução de conjuração",
      "Escudo e armadura com resistências (fantasma/sagrado, congelamento, etc.)",
      "Kardui + Fragmento de Yggdrasil e peças de -cast",
      "Acessórios de INT/SAB; consumíveis de SP e Galho de Yggdrasil"
    ],
    "descricao": "A função é manter o grupo vivo em MVP, instâncias, Torre, Bio-Labs e WoE com cura, buffs, ressurreição e remoção de status. Priorize DES p/ curar instantâneo e INT p/ volume de cura e SP; VIT p/ tankar dano de área. Você raramente ataca — seu valor é buff, Santuário, res e proteção mágica. Se quiser um híbrido, um pingo de dano com Petitio/Adoração ajuda a farmar sozinho fora do grupo."
  },
  {
    "classe": "Meister (4ª de Mecânico)",
    "nome": "Fúria do Furacão (Axe Tornado)",
    "foco": "Farm / MVP",
    "stats": "FOR alto (dano), DES alto (acerto/cast), VIT p/ sobreviver e INT p/ SP; equilibre conforme a armadura mecânica",
    "skills": [
      "Fúria do Furacão (Axe Tornado - AoE)",
      "Canhão de Braço (Arm Cannon - single target/MVP)",
      "Reforço/Domínio de Machado",
      "Armadura Mecânica (Madogear)",
      "Impulso do Carrinho (mobilidade)"
    ],
    "equips": [
      "Machado das Cinzas + Elmo Cobiçado das Cinzas (tira ~1s de recarga da Fúria do Furacão)",
      "Armadura Mecânica (Madogear) equipada e abastecida",
      "Cartas de raça/elemento no machado e peças de FOR/DES",
      "Set das Cinzas / peças de dano por tamanho conforme o mapa"
    ],
    "descricao": "Farmer de área muito eficiente: monte a Armadura Mecânica e limpe telas com Fúria do Furacão, que fica com recarga curtíssima usando o combo Machado + Elmo das Cinzas. Empilhe FOR p/ dano e DES p/ acerto/cast. Pra MVP e alvos únicos, troque p/ Canhão de Braço, que dá burst pesado à distância. Aproveita muito bem os buffs de Ferreiro/Mecânico e é barato de começar."
  },
  {
    "classe": "Cruz das Sombras (4ª de Algoz/Guillotine Cross)",
    "nome": "Crítico Adaga Dupla (Impacto Cruzado)",
    "foco": "PvP / WoE / MVP",
    "stats": "FOR alto (dano), AGI alto p/ 193 de ASPD, VIT ~90 p/ tankar, e CRT/LUK o bastante p/ passar de 100 de Crítico; use a Mochila Heroica como base de status",
    "skills": [
      "Impacto Cruzado (Cross Impact - burst single-target)",
      "Golpe/Estocada das Sombras",
      "Envenenar Arma (venenos de status)",
      "Cortina de Fumaça / Ocultar-se",
      "Aprimorar Adaga / Domínio de Crítico"
    ],
    "equips": [
      "Duas adagas com cartas de Crítico e ASPD (raça no alvo)",
      "Mochila Heroica (base do status FOR/AGI/VIT)",
      "Peças de ASPD e de dano crítico; acessórios de FOR/LUK",
      "Frascos de veneno e itens de fuga/ocultação p/ WoE"
    ],
    "descricao": "Assassino de alvo único: com duas adagas você busca 193 de ASPD e Crítico acima de 100 p/ que todo golpe seja crítico, spammando Impacto Cruzado p/ derreter o alvo. FOR dá dano, AGI a velocidade e VIT a sobrevivência em pé de guerra. Em WoE, use Envenenar Arma p/ aplicar status e Cortina de Fumaça/ocultação p/ entrar, matar e sumir. Também rende ótimo DPS single-target em MVP."
  },
  {
    "classe": "Sentinela / Windhawk (4ª de Ranger/Atirador)",
    "nome": "Tempestade de Flechas (Arrow Storm)",
    "foco": "Farm / PvM",
    "stats": "DES máxima (dano/acerto), AGI p/ ASPD e esquiva, resto em FOR (peso/dano) ou INT p/ SP; POD/CON nos traços conforme disponíveis",
    "skills": [
      "Tempestade de Flechas (Arrow Storm - AoE)",
      "Disparo Certeiro (pré-requisito)",
      "Chamado do Warg / Lobo (mordida e mobilidade)",
      "Armadilhas (utilidade/controle)",
      "Foco de Águia / buffs de precisão"
    ],
    "equips": [
      "Arco com boa base de ATK + flechas do elemento certo (leve variedade no inventário)",
      "Trevo de Mora (reduz recarga e deixa a skill spammável)",
      "Set Virtual / Fundição (Foundry) - barato e forte p/ começar",
      "Cartas de raça/tamanho no arco e peças de DES/AGI"
    ],
    "descricao": "A build mais amigável p/ iniciantes e uma das melhores p/ upar e farmar barato. Tempestade de Flechas causa dano físico em área a distância consumindo 10 flechas; a partir do nível ~130 dá p/ reduzir muito a recarga e spammar sem parar (o Trevo de Mora facilita demais). Mantenha flechas de vários elementos p/ atacar a fraqueza do mapa e use o Warg p/ mobilidade e dano extra. Barata de montar e escala bem conforme você troca p/ equipamentos melhores."
  }
];

const NOSTALGIA = {
  "fatos": [
    {
      "titulo": "Ninguem 'clicava' pra mudar de classe",
      "texto": "Cursar a profissao era um rito de passagem. Sair de Aprendiz pra 1a classe (e alem) exigia uma quest inteira: virar Mago era prova teorica na Torre de Geffen, Cavaleiro precisava domar um PecoPeco, Sacerdote fazia peregrinacao pela igreja de Prontera. Job change instantaneo simplesmente nao existia."
    },
    {
      "titulo": "O MVP so chovia 1 premio",
      "texto": "Quem dava mais dano no chefe (o Most Valuable Player) ganhava um drop extra e aquele fogo de artificio na tela, mas geralmente vinha 1 item so, e a carta do Boss tinha chance de 0,01%. Gente farmava o mesmo MVP por meses atras de uma carta que nunca caia."
    },
    {
      "titulo": "O diabinho que assombrava as masmorras",
      "texto": "Descer na Torre do Relogio e em Glast Heim significava encarar o Deviruchi, o diabinho de tridente que batia forte e assustava qualquer novato desavisado. Ele era tao icônico que virou o super cobicado Chapeu de Deviruchi."
    },
    {
      "titulo": "A Guerra do Emperium parava o servidor",
      "texto": "Aos fins de semana as guildas inteiras se juntavam no Ventrilo/TeamSpeak pra invadir castelos na WoE (War of Emperium). Lag de centenas de players na mesma sala, Bruxo soltando Tempestade (Storm Gust) e a gloria absoluta de quebrar o Emperium no ultimo segundo. Guildas lendarias nasciam ali."
    },
    {
      "titulo": "A fonte de Prontera era a rede social antes das redes sociais",
      "texto": "A praca da fonte era o coracao do jogo: um mar de lojas de Mercador (Vending) coloridas, gente gritando 'B>' e 'S>', flerte, treta e papo furado. Andar por ali travava o PC de tanto texto na tela."
    },
    {
      "titulo": "Asa de Mosca, o teletransporte da sorte",
      "texto": "A Asa de Mosca (Fly Wing) te jogava num ponto aleatorio do mapa — perfeito pra fugir de mob ou cacar MVP. Ja a Asa de Borboleta (Butterfly Wing) te levava de volta pra cidade salva. Sair de casa sem elas na mochila era pedir pra morrer."
    },
    {
      "titulo": "Toda a economia girava em torno das Cartas",
      "texto": "Carta caia com chance ridicula e ia encaixada num slot do equipamento. Carta do Marc contra congelamento, Raydric contra dano neutro, Angeling pra armadura sagrada... uma carta rara valia mais que a conta inteira, e o mercado do jogo girava em cima delas."
    },
    {
      "titulo": "Se nao salvou na Kafra, chorou",
      "texto": "A atendente Kafra guardava seus itens no armazem (Storage), teletransportava por zeny e definia seu ponto de retorno. Esquecer de salvar e morrer longe significava uma longa (e perigosa) caminhada de volta ao ponto zero."
    },
    {
      "titulo": "Montar no PecoPeco era chique",
      "texto": "Cavaleiros e Cruzados ganhavam o PecoPeco, aquele 'avestruz' rosa, que dava velocidade extra e muito ego. Ver um trotando por Prontera era sinônimo de 'esse ai e veterano de verdade'."
    },
    {
      "titulo": "Zerar o personagem de proposito (Renascimento)",
      "texto": "Chegar no nivel 99/50 e 'renascer': voltar a ser Aprendiz Superior pra trilhar a classe Transcendente (Lorde, Alto Sacerdote, Mestre Ferreiro...). Recomecar do zero em troca de status melhores era motivo de orgulho, nao de castigo."
    },
    {
      "titulo": "O peso importava (e muito)",
      "texto": "Passar de 50% do limite de peso parava a regeneracao natural de HP/SP; perto do maximo voce mal andava e nem pegava loot. Administrar pocoes, asas e drops era um mini-jogo de gestao dentro do jogo."
    },
    {
      "titulo": "Galho da Morte: a roleta russa do RO",
      "texto": "O Galho da Morte (Dead Branch) invocava um monstro aleatorio do mapa. Podia sair um bichinho fraco pra bater a toa... ou um MVP furioso que limpava a party inteira em segundos. Usar era pura adrenalina."
    }
  ],
  "iconicos": [
    {
      "nome": "Poring",
      "emoji": "🫧",
      "descricao": "O slime rosa gelatinoso, primeiro monstro de todo aventureiro. Fofo, inofensivo e dropava Jellopy e Maca. Virou o mascote eterno do RO — e tem parente pra tudo: Drops, Poporing, Marin, Angeling e Deviling.",
      "categoria": "Monstro"
    },
    {
      "nome": "Prontera",
      "emoji": "🏰",
      "descricao": "A capital do reino de Rune-Midgard, com sua catedral imponente e a praca da fonte sempre lotada de vendedores. Ponto de encontro, de comercio e de saudade de todo mundo.",
      "categoria": "Cidade"
    },
    {
      "nome": "Baphomet",
      "emoji": "😈",
      "descricao": "O chefe demoniaco com cabeca de bode e uma foice gigante, escondido nas profundezas do Labirinto. Um dos MVPs mais temidos e classicos da era. So o barulho dele ja dava frio na espinha.",
      "categoria": "Monstro"
    },
    {
      "nome": "Emperium",
      "emoji": "💎",
      "descricao": "O cristal dourado sagrado. Quebra-lo conquistava o castelo na Guerra do Emperium (WoE), e era item obrigatorio pra fundar uma guilda. Nenhum objeto carregava tanto simbolismo.",
      "categoria": "Item"
    },
    {
      "nome": "Cartas (Cards)",
      "emoji": "🃏",
      "descricao": "Dropadas por monstros com chance minima e encaixadas nos slots do equipamento pra dar bonus. Eram o verdadeiro endgame e a base de toda a economia do jogo.",
      "categoria": "Sistema"
    },
    {
      "nome": "Kafra",
      "emoji": "💁‍♀️",
      "descricao": "A atendente de uniforme com o classico 'Bem-vindo aos Servicos Kafra'. Guardava seus itens no armazem, teletransportava e salvava seu ponto de retorno. Amiga de todo aventureiro.",
      "categoria": "NPC"
    },
    {
      "nome": "PecoPeco",
      "emoji": "🐤",
      "descricao": "O 'avestruz' rosa que servia de montaria pros Cavaleiros e Cruzados, dando velocidade extra. Tambem aparecia como monstro selvagem nos campos do deserto.",
      "categoria": "Monstro"
    },
    {
      "nome": "Aprendiz (Novice)",
      "emoji": "🔰",
      "descricao": "Onde absolutamente todos comecavam: faca de novato, roupa simples e o sonho de bater o job 10 pra escolher a primeira classe. O comeco humilde de toda lenda.",
      "categoria": "Classe"
    },
    {
      "nome": "Bongun",
      "emoji": "🧟",
      "descricao": "O 'zumbi saltitante' de roupa azul (o jiangshi do folclore coreano) que assombrava a floresta e o templo de Payon. Andava aos pulinhos e dava aquele sustinho classico.",
      "categoria": "Monstro"
    },
    {
      "nome": "Geffen",
      "emoji": "🧙",
      "descricao": "A cidade da magia, com a icônica Torre dos Magos onde se cursava a profissao de Mago e uma masmorra logo abaixo. Ar misterioso e medieval.",
      "categoria": "Cidade"
    },
    {
      "nome": "Payon",
      "emoji": "🏯",
      "descricao": "A vila oriental dos arqueiros, cercada de bambus, com a floresta e o templo/dungeon cheio de zumbis e mortos-vivos. Berco de Arqueiros e Sacerdotes.",
      "categoria": "Cidade"
    },
    {
      "nome": "Angeling",
      "emoji": "😇",
      "descricao": "O Poring de asas e auréola: a versao sagrada, rara e valiosa. Caçar um dava aquele friozinho na barriga, e sua carta era cobicadissima pra armadura de elemento Sagrado.",
      "categoria": "Monstro"
    },
    {
      "nome": "Deviruchi",
      "emoji": "👿",
      "descricao": "O diabinho de tridente das masmorras (Torre do Relogio e Glast Heim). Batia forte, assustava novato e imortalizou-se no Chapeu de Deviruchi, um dos tapas mais estilosos do jogo.",
      "categoria": "Monstro"
    },
    {
      "nome": "Asa de Mosca / Borboleta",
      "emoji": "🪰",
      "descricao": "A Asa de Mosca teleportava pra um ponto aleatorio do mapa (fuga ou caca ao MVP) e a Asa de Borboleta levava de volta pra cidade salva. Itens de sobrevivencia obrigatorios na mochila.",
      "categoria": "Item"
    }
  ],
  "bgms": [
    {
      "titulo": "Theme of Prontera",
      "youtubeId": "D30M_vLMvWk",
      "contexto": "A trilha da capital Prontera — a musica que definiu o RO. Todo mundo passou horas parado na fonte ouvindo isso."
    },
    {
      "titulo": "Title (tema da tela de login)",
      "youtubeId": "a9OdzOz-9-I",
      "contexto": "A tela de login/titulo do jogo. O primeiro som do RO ao abrir o cliente: saudade instantanea."
    },
    {
      "titulo": "Streamside",
      "youtubeId": "2DuvYC3zENI",
      "contexto": "Campos ao sul de Prontera. A trilha suave que embalava as primeiras horas de farm de todo novato."
    },
    {
      "titulo": "Theme of Payon",
      "youtubeId": "zwM4pDzR-6g",
      "contexto": "A vila oriental dos arqueiros, entre bambus e telhados curvos. Casa dos Arqueiros e Sacerdotes."
    },
    {
      "titulo": "Theme of Geffen",
      "youtubeId": "yWgf7p3_z8w",
      "contexto": "A cidade da magia e sua Torre dos Magos. Clima misterioso de quem ia cursar Mago ou Bruxo."
    },
    {
      "titulo": "Fear... (Glast Heim Churchyard)",
      "youtubeId": "8z4Xjq7pcR4",
      "contexto": "O cemiterio de Glast Heim. A trilha de arrepiar que embalava as cacadas mais assustadoras e lucrativas."
    },
    {
      "titulo": "Desert (Deserto de Sograt)",
      "youtubeId": "Pw3RTE3UH9g",
      "contexto": "A travessia do deserto de Sograt rumo a Morocc: sol, areia e PecoPecos selvagens no caminho."
    },
    {
      "titulo": "Theme of Al de Baran",
      "youtubeId": "ekJqpWbI09M",
      "contexto": "Al de Baran, a cidade do grande relogio e portal de entrada pra temida Torre do Relogio (Clock Tower)."
    },
    {
      "titulo": "High Roller Coaster (Comodo)",
      "youtubeId": "ihnYQSXKtwk",
      "contexto": "Comodo, a cidade-praia da festa e do cassino. O tema mais animado e dancante de todo o jogo."
    },
    {
      "titulo": "Theme of Alberta",
      "youtubeId": "lQjoaA9QqRA",
      "contexto": "Alberta, a cidade portuaria. Ponto de partida dos navios e capital espiritual dos Mercadores."
    }
  ],
  "memes": [
    "'B>' e 'S>' — a lingua oficial do comercio no chat de Prontera. B> era comprar (buy), S> era vender (sell). 'B> Carta do Marc pf' rolava o dia inteiro na fonte.",
    "'Bless e Agi, pf!' — o pedido eterno feito ao Sacerdote antes de qualquer caçada. Sem Bencao e Agilidade em Alta, ninguem saia de casa.",
    "'KS!' — o grito de guerra contra quem roubava seu mob ou sua spot de farm (Kill Steal). Motivo classico de treta, xingamento e ate PK.",
    "'Deu DC!' — quando a conexao caia, sempre na pior hora possivel: em plena WoE ou com o MVP em 1% de HP. O luto era coletivo.",
    "'Farmei a semana toda e a carta nao veio' — o lamento nacional de quem encarava o drop de 0,01% e voltava de maos vazias.",
    "'F> Warp' / 'Warp pra Prontera?' — a dependencia total do Sacerdote e seu Portal Dimensional pra se locomover pelo mundo sem gastar uma vida andando.",
    "'Salva na Kafra!' — o lembrete sagrado pra nao perder progresso e nao acordar do outro lado do mapa depois de morrer.",
    "'Cê tem Marc? Senao congela na WoE' — a Carta do Marc anticongelamento era item obrigatorio pra nao virar estatua diante das Tempestades dos Bruxos inimigos."
  ]
};
