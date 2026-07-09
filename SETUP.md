# 🔧 Setup — o que falta ligar (2 coisinhas do Google)

O site já está no ar e funcionando. Estas duas integrações usam credenciais do
**Google** que só você pode criar (levam ~5 min cada). O frontend já está pronto:
é só colar as credenciais e cada recurso liga sozinho.

Projeto Supabase: `jdazhiihbbobzupvzohf` · Site: https://bihelztv.vercel.app

---

## 1) 🔑 Login com Google (Supabase Auth)

O botão **"Entrar com Google"** já está no site — falta ativar o provedor.

**a. Criar o app OAuth no Google Cloud** — https://console.cloud.google.com
1. Crie/escolha um projeto.
2. **APIs e Serviços → Tela de consentimento OAuth** → tipo **Externo** → preencha
   nome do app (ex.: *Bihelz TV*) e e-mail de suporte → salvar.
3. **APIs e Serviços → Credenciais → Criar credenciais → ID do cliente OAuth →
   Aplicativo da Web**:
   - **Origens JavaScript autorizadas:** `https://bihelztv.vercel.app`
   - **URIs de redirecionamento autorizados:**
     `https://jdazhiihbbobzupvzohf.supabase.co/auth/v1/callback`
   - Criar → copie **Client ID** e **Client Secret**.

**b. Ativar no Supabase**
4. Painel → **Authentication → Sign In / Providers → Google** → ative → cole o
   Client ID + Client Secret → salvar.
5. Painel → **Authentication → URL Configuration**:
   - **Site URL:** `https://bihelztv.vercel.app`
   - **Redirect URLs:** adicione `https://bihelztv.vercel.app/**`

Pronto — o login com Google passa a funcionar. (Manda o Client ID/Secret pra mim
que eu configuro os passos 4–5 no Supabase pra você, se preferir.)

---

## 2) ▶️ Live + chat do YouTube no site (YouTube Data API)

Sem chave: o site mostra o player do canal + botão "abrir no YouTube".
**Com** a chave: detecta quando você está ao vivo (badge **AO VIVO**) e **embeda o
chat REAL da live** — a galera comenta com a própria conta do YouTube, dentro do site.

1. https://console.cloud.google.com → mesmo projeto → **APIs e Serviços → Biblioteca**
   → ativar **"YouTube Data API v3"**.
2. **Credenciais → Criar credenciais → Chave de API** → copie.
3. (Recomendado) Restrinja a chave: **Referenciadores HTTP** → `https://bihelztv.vercel.app/*`
   e **API restrita** → YouTube Data API v3.
4. Cole em [`assets/js/data.js`](assets/js/data.js) → `CANAL.youtubeApiKey` e faça deploy
   (`vercel deploy --prod`). Ou me manda a chave que eu colo e faço o deploy.

> A chave tem cota grátis de 10.000 unidades/dia; o site cacheia a checagem de live
> por 4 min pra economizar. Tranquilo pra uma comunidade.

---

## Já está pronto e ligado ✅
- Site no ar, tema Ragnarok, sem Twitch (só YouTube).
- Logo grafite do Bihelz no topo + favicon.
- Quadros **Party** e **Trade** compartilhados via Supabase (publishable key já configurada).
- Notícias diárias automáticas, Lab do Cientista, Central do Aventureiro (busca op.gg-style).
