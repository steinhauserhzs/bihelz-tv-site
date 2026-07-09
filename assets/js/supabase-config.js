/* ============================================================
   BIHELZ TV — Configuração do Supabase (quadros compartilhados)
   ------------------------------------------------------------
   Só a URL do projeto e a ANON KEY (chave PÚBLICA, protegida por
   RLS) ficam aqui. NUNCA coloque a senha do banco nem a
   service_role key neste arquivo — é servido ao navegador.

   Como ativar os quadros compartilhados (Party + Trade):
   1. No painel do Supabase: Settings → API Keys → copie a
      "anon public" key (começa com eyJ... ou sb_publishable_...).
   2. Cole no campo anonKey abaixo e faça deploy.
   Enquanto a anonKey estiver vazia, o site usa localStorage
   (quadros só no navegador de cada visitante) — nada quebra.
   ============================================================ */
window.SUPA_CONFIG = {
  url: "https://jdazhiihbbobzupvzohf.supabase.co",
  anonKey: "sb_publishable_Ex94TWSYa47T6RoRYoDWQg_ZoNaoqkk", // publishable key (pública, protegida por RLS)
};
