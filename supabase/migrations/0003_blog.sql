-- ============================================================
-- BIHELZ TV — Blog da Comunidade
-- Só quem está LOGADO (Google/Supabase Auth) publica. Leitura
-- é pública. Autor apaga o próprio post; admin apaga qualquer.
-- Curtidas por usuário (1 por post), com contador denormalizado.
-- ============================================================

create table if not exists public.blog_posts (
  id            uuid primary key default gen_random_uuid(),
  author_id     uuid not null,
  author_name   text not null,
  author_avatar text,
  title         text not null check (char_length(title) between 3 and 120),
  body          text not null check (char_length(body) between 1 and 8000),
  likes         integer not null default 0,
  created_at    timestamptz not null default now()
);
create index if not exists blog_posts_created_idx on public.blog_posts (created_at desc);

create table if not exists public.blog_likes (
  post_id  uuid not null references public.blog_posts(id) on delete cascade,
  user_id  uuid not null,
  primary key (post_id, user_id)
);

alter table public.blog_posts enable row level security;
alter table public.blog_likes enable row level security;

-- ---- posts: leitura pública, escrita só logado (author = auth.uid) ----
drop policy if exists blog_read on public.blog_posts;
create policy blog_read on public.blog_posts for select using (true);

drop policy if exists blog_insert on public.blog_posts;
create policy blog_insert on public.blog_posts for insert to authenticated
  with check (author_id = auth.uid());

drop policy if exists blog_delete on public.blog_posts;
create policy blog_delete on public.blog_posts for delete to authenticated
  using (author_id = auth.uid() or public.is_admin());

grant select on public.blog_posts to anon, authenticated;
grant insert, delete on public.blog_posts to authenticated;

-- ---- likes: usuário vê/gerencia as próprias; contador via RPC ----
drop policy if exists blog_likes_read on public.blog_likes;
create policy blog_likes_read on public.blog_likes for select to authenticated
  using (user_id = auth.uid());
grant select on public.blog_likes to authenticated;

-- ---- RPC: curtir/descurtir (retorna novo total) ----
create or replace function public.toggle_blog_like(p_post uuid)
returns integer
language plpgsql security definer set search_path = public
as $$
declare uid uuid := auth.uid(); n int;
begin
  if uid is null then raise exception 'login necessário'; end if;
  if exists (select 1 from public.blog_likes where post_id = p_post and user_id = uid) then
    delete from public.blog_likes where post_id = p_post and user_id = uid;
    update public.blog_posts set likes = greatest(0, likes - 1) where id = p_post returning likes into n;
  else
    insert into public.blog_likes(post_id, user_id) values (p_post, uid);
    update public.blog_posts set likes = likes + 1 where id = p_post returning likes into n;
  end if;
  return coalesce(n, 0);
end;
$$;
grant execute on function public.toggle_blog_like(uuid) to authenticated;
