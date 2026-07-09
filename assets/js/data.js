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
  instagram: "@bihelztv",
  discordConvite: "https://discord.gg/w36y82XZp",
  discordNome: "Laboranok do Ragnatório",
  // Chave da YouTube Data API v3 (pública, restrinja por referrer no Google Cloud).
  // Com ela o site detecta quando o Bihelz está ao vivo e embeda o chat real da
  // live (os usuários interagem com a própria conta do YouTube). Vazia = só o
  // player + botão "abrir no YouTube". Como pegar: Google Cloud → APIs → ativar
  // "YouTube Data API v3" → Credentials → API key.
  youtubeApiKey: "",
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
