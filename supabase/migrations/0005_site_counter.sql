-- ============================================================
-- BIHELZ TV — Contador de visitas GLOBAL ("Selo do Reino")
-- Total persistente e honesto: anon LÊ o total via RPC; a ESCRITA
-- é SÓ +1 atômico via RPC SECURITY DEFINER. O anon NUNCA seta valor
-- arbitrário, nem faz UPDATE direto, nem lê a tabela direto (só as
-- duas funções). Idempotente: pode rodar quantas vezes quiser.
-- Endurecido conforme revisão de segurança (2026-07-09).
-- ============================================================

-- ---- tabela genérica de contadores (1 linha por métrica) ----
create table if not exists public.site_counters (
  key         text primary key,
  value       bigint not null default 0,
  updated_at  timestamptz not null default now()
);

-- semeia o contador de visitas só na 1ª vez (valor inicial 0)
insert into public.site_counters (key, value)
values ('site_views', 0)
on conflict (key) do nothing;

-- ---- RLS ligada e SEM política de leitura: ninguém acessa a
--      tabela direto pela API. Toda leitura/escrita passa pelas
--      funções SECURITY DEFINER abaixo (defense-in-depth: se um dia
--      adicionarem uma métrica privada, ela não vaza pelo PostgREST).
alter table public.site_counters enable row level security;
drop policy if exists site_counters_read on public.site_counters;
revoke all on public.site_counters from anon, authenticated;

-- ---- RPC: incrementa +1 de forma ATÔMICA e devolve o novo total ----
-- SECURITY DEFINER roda como dono (contorna o bloqueio de escrita do
-- anon). search_path fixado (fecha o vetor de hijack). O UPSERT trava
-- a linha, então chamadas concorrentes serializam (nada de perda).
-- Parametrizada SEM valor: só existe "+1", impossível setar arbitrário.
create or replace function public.increment_site_views()
returns bigint
language sql
security definer
set search_path = public, pg_temp
as $$
  insert into public.site_counters (key, value, updated_at)
  values ('site_views', 1, now())
  on conflict (key) do update
    set value = site_counters.value + 1,
        updated_at = now()
  returning value;
$$;

revoke all on function public.increment_site_views() from public;
grant execute on function public.increment_site_views() to anon, authenticated;

-- ---- RPC de leitura (total atual, quando a sessão já contou) ----
create or replace function public.get_site_views()
returns bigint
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select coalesce((select value from public.site_counters
                   where key = 'site_views'), 0);
$$;

revoke all on function public.get_site_views() from public;
grant execute on function public.get_site_views() to anon, authenticated;
