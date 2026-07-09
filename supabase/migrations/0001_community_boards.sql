-- ============================================================
-- BIHELZ TV — Quadros da comunidade (Party + Trade)
-- Boards públicos SEM login, protegidos por RLS.
-- Estratégia anti-griefing:
--   • anon pode SELECT (menos a coluna delete_token) e INSERT
--   • DELETE só via RPC delete_own_post(id, token) que confere o
--     delete_token gerado no cliente (guardado no localStorage).
--   Assim ninguém apaga o post dos outros.
-- ============================================================

-- ---------- PARTY (Jogar Junto) ----------
create table if not exists public.party_posts (
  id           uuid primary key default gen_random_uuid(),
  nick         text not null check (char_length(nick) between 1 and 30),
  classe       text not null check (char_length(classe) between 1 and 40),
  nivel        text not null check (char_length(nivel) between 1 and 4),
  objetivo     text not null check (char_length(objetivo) between 1 and 20),
  horario      text not null check (char_length(horario) between 1 and 60),
  contato      text not null check (char_length(contato) between 1 and 60),
  descricao    text          check (char_length(coalesce(descricao,'')) <= 200),
  delete_token uuid not null,
  created_at   timestamptz not null default now()
);

-- ---------- TRADE (Mercado) ----------
create table if not exists public.trade_posts (
  id           uuid primary key default gen_random_uuid(),
  tipo         text not null check (tipo in ('vendo','compro')),
  item         text not null check (char_length(item) between 1 and 60),
  detalhe      text          check (char_length(coalesce(detalhe,'')) <= 80),
  preco        bigint not null check (preco >= 0 and preco <= 100000000000),
  contato      text not null check (char_length(contato) between 1 and 60),
  delete_token uuid not null,
  created_at   timestamptz not null default now()
);

create index if not exists party_posts_created_idx on public.party_posts (created_at desc);
create index if not exists trade_posts_created_idx on public.trade_posts (created_at desc);

-- ---------- RLS ----------
alter table public.party_posts enable row level security;
alter table public.trade_posts enable row level security;

drop policy if exists party_read on public.party_posts;
drop policy if exists party_insert on public.party_posts;
drop policy if exists trade_read on public.trade_posts;
drop policy if exists trade_insert on public.trade_posts;

create policy party_read   on public.party_posts for select using (true);
create policy party_insert on public.party_posts for insert with check (true);
create policy trade_read   on public.trade_posts for select using (true);
create policy trade_insert on public.trade_posts for insert with check (true);

-- ---------- Column privileges (esconde delete_token do anon) ----------
revoke all on public.party_posts from anon, authenticated;
revoke all on public.trade_posts from anon, authenticated;

grant select (id, nick, classe, nivel, objetivo, horario, contato, descricao, created_at)
  on public.party_posts to anon, authenticated;
grant insert (nick, classe, nivel, objetivo, horario, contato, descricao, delete_token)
  on public.party_posts to anon, authenticated;

grant select (id, tipo, item, detalhe, preco, contato, created_at)
  on public.trade_posts to anon, authenticated;
grant insert (tipo, item, detalhe, preco, contato, delete_token)
  on public.trade_posts to anon, authenticated;

-- ---------- RPC de deleção segura (confere o token do dono) ----------
create or replace function public.delete_own_post(p_table text, p_id uuid, p_token uuid)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare n int;
begin
  if p_table = 'party' then
    delete from public.party_posts where id = p_id and delete_token = p_token;
  elsif p_table = 'trade' then
    delete from public.trade_posts where id = p_id and delete_token = p_token;
  else
    raise exception 'tabela inválida';
  end if;
  get diagnostics n = row_count;
  return n > 0;
end;
$$;

grant execute on function public.delete_own_post(text, uuid, uuid) to anon, authenticated;

-- ---------- Limpeza automática: apaga posts com +21 dias ----------
create or replace function public.purge_old_posts()
returns void language sql security definer set search_path = public as $$
  delete from public.party_posts where created_at < now() - interval '21 days';
  delete from public.trade_posts where created_at < now() - interval '21 days';
$$;
