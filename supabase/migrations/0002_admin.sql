-- ============================================================
-- BIHELZ TV — Painel ADMIN (moderação + configurações)
-- Admin = quem está logado (Google/Supabase Auth) e cujo e-mail
-- está na tabela `admins`. Tudo enforçado por RLS no servidor —
-- nada de "admin" só no front. Sem login, ninguém é admin.
-- ============================================================

-- ---------- Quem é admin ----------
create table if not exists public.admins (
  email      text primary key,
  added_at   timestamptz not null default now()
);
insert into public.admins(email) values ('haira@3pontos.com') on conflict do nothing;

alter table public.admins enable row level security;

-- função central: o usuário logado é admin?
create or replace function public.is_admin()
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.admins a
    where lower(a.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;
grant execute on function public.is_admin() to anon, authenticated;

-- só admin lê/gerencia a lista de admins (não vaza e-mails pro público)
drop policy if exists admins_admin_all on public.admins;
create policy admins_admin_all on public.admins for all
  using (public.is_admin()) with check (public.is_admin());
grant select, insert, delete on public.admins to authenticated;

-- ---------- Configurações editáveis (horários das lives etc.) ----------
create table if not exists public.app_settings (
  key         text primary key,
  value       jsonb not null,
  updated_at  timestamptz not null default now()
);
alter table public.app_settings enable row level security;

drop policy if exists settings_read on public.app_settings;
create policy settings_read on public.app_settings for select using (true);

drop policy if exists settings_admin_write on public.app_settings;
create policy settings_admin_write on public.app_settings for all
  using (public.is_admin()) with check (public.is_admin());

grant select on public.app_settings to anon, authenticated;
grant insert, update, delete on public.app_settings to authenticated;

-- seed do horário das lives (o site lê daqui; edita no painel admin)
insert into public.app_settings(key, value) values
  ('schedule', '[
    {"dia":"Segunda","hora":"19h","tema":"Upando com a guilda"},
    {"dia":"Quarta","hora":"19h","tema":"Caçada de MVP"},
    {"dia":"Quinta","hora":"19h","tema":"Brew & Build — laboratório aberto"},
    {"dia":"Domingo","hora":"19h30","tema":"Esquenta + WoE (20h–22h)"}
  ]'::jsonb)
on conflict do nothing;

-- ---------- Moderação: admin pode apagar QUALQUER anúncio ----------
drop policy if exists party_admin_delete on public.party_posts;
create policy party_admin_delete on public.party_posts for delete using (public.is_admin());
drop policy if exists trade_admin_delete on public.trade_posts;
create policy trade_admin_delete on public.trade_posts for delete using (public.is_admin());
grant delete on public.party_posts, public.trade_posts to authenticated;
