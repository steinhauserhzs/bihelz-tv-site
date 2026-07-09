<div align="center">

# 🧪 BIHELZ TV — Laboranok do Ragnatório

### O QG da comunidade de Ragnarok Online LATAM do streamer **Bihelz TV**

**[▶️ ABRIR O SITE](https://bihelz-tv-site.vercel.app)** · [Twitch](https://twitch.tv/bihelztv) · [YouTube](https://www.youtube.com/@bihelzs) · [Discord](https://discord.gg/w36y82XZp)

![Tema](https://img.shields.io/badge/tema-Ragnarok%20Online-9d4edd?style=for-the-badge)
![Zero deps](https://img.shields.io/badge/build-nenhum-4ecdc4?style=for-the-badge)
![Mobile](https://img.shields.io/badge/mobile-first-ffc24b?style=for-the-badge)
![Supabase](https://img.shields.io/badge/quadros-Supabase-3ecf8e?style=for-the-badge)
![PT-BR](https://img.shields.io/badge/idioma-PT--BR-ff5fa2?style=for-the-badge)

*Feito com ❤️ pela comunidade. Site de fãs, não oficial. Arte 100% original gerada com IA.*

</div>

---

## 🎮 O que é

Um site de comunidade **todo tematizado na UI clássica do Ragnarok Online** (janelas de pergaminho, barras de HP/SP/EXP, hotbar F1–F8, diálogos de NPC) com acabamento moderno e efeitos 3D. Feito **mobile-first** e 100% responsivo. Conteúdo de Ragnarok LATAM atualizado diariamente + ferramentas de verdade pra guilda.

## ✨ Seções

| | Ferramenta |
|---|---|
| 🏰 **Início** | Player Twitch **e** YouTube (abas), status ao vivo, countdown do Stars LATAM, hero com parallax |
| 📜 **Notícias** | Curadoria diária + **Radar ao vivo** (myROverse via REST/CORS) com filtros |
| 🤝 **Party** | Party finder — publique classe/nível/objetivo, quadro **compartilhado** (Supabase) |
| 💰 **Trade** | Quadro de vendo/compro em zeny, **compartilhado** (Supabase) |
| ☠️ **MVP** | Timer de respawn de 12 chefes + elemento/tamanho e melhores elementos de ataque |
| 🧪 **Lab do Cientista** | A classe do Bihelz — calc de **Farmacologia Avançada** (fórmula real, taxas LATAM), **tabela elemental** Renewal pós-2024, modificador de tamanho, checklist de dailies com reset automático, quiz de Homunculus S, guia de homúnculos e **Arsenal** de 18 ferramentas |
| 🔎 **Central do Aventureiro** | Busca estilo op.gg: char/guilda/item/carta direto no Divine Pride, bROWiki e ROla Market |
| 📖 **Guias** | Classes 4, leveling, zeny, MVP, WoE e o competitivo |
| 🛡️ **Guilda** | Redes do Bihelz, programação das lives e regras do Laboranok |

## 🎨 Design System "Ragnarok" (`assets/css/ragnarok.css`)

Marca do Bihelz (roxo `#7b2fd6` · dourado `#ffc24b` · rosa `#ff5fa2`) fundida com a UI do jogo:
`.ro-window` (janela com título), `.ro-btn`, `.ro-bar` (HP/SP/EXP), `.ro-slot`, `.npc-dialog`, `.sys-toast`.
Fontes: Cinzel Decorative · Cinzel · Rajdhani · Poppins. Efeitos 3D (tilt/parallax) em `assets/css/v2.css`.
Arte custom (hero de laboratório, mascote cientista, 8 ícones) em `assets/img/`.

## ☁️ Quadros compartilhados (Supabase)

Party e Trade viram **globais** (todos os visitantes veem os mesmos anúncios) quando a anon key está configurada — senão caem pra `localStorage` e o site funciona igual.

1. Painel Supabase → **Settings → API Keys** → copie a **anon public** key.
2. Cole em [`assets/js/supabase-config.js`](assets/js/supabase-config.js) → `anonKey`.
3. Deploy.

O schema (tabelas + RLS anti-griefing + RPC de deleção por token de dono) está em
[`supabase/migrations/0001_community_boards.sql`](supabase/migrations/0001_community_boards.sql).
**Nunca** coloque a senha do Postgres nem a `service_role` key no frontend.

## 📰 Conteúdo diário

Tudo editável em [`assets/js/data.js`](assets/js/data.js). O array `NEWS` é regenerado por uma tarefa agendada (~8h30) que pesquisa o RO LATAM e faz redeploy. Categorias: `update`, `evento`, `esports`, `manutencao`, `dica`.

## 🛠️ Rodar localmente

```bash
python3 -m http.server 4310
# http://localhost:4310
```

## 🚀 Deploy

Estático puro — `vercel deploy --prod`.

## ⚠️ Avisos

- Ragnarok Online © Gravity Co., Ltd. Site de fãs, **não oficial**. Sem sprites/assets do jogo.
- Tempos de respawn de MVP e horários de WoE são aproximados — confirme no servidor.
- Dados de jogo verificados na [bROWiki](https://browiki.org) e [iRO Wiki](https://irowiki.org) (tabela elemental pós-patch de 19/08/2024).
