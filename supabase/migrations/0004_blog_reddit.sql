-- ============================================================
-- BIHELZ TV — Blog estilo Reddit
-- Adiciona: flair (categoria), imagem (print), comentários e
-- contador de comentários. Storage bucket público p/ prints.
-- ============================================================

-- ---- posts: flair + imagem + contador de comentários ----
alter table public.blog_posts add column if not exists flair text;
alter table public.blog_posts add column if not exists image_url text;
alter table public.blog_posts add column if not exists comment_count integer not null default 0;

-- ---- comentários ----
create table if not exists public.blog_comments (
  id            uuid primary key default gen_random_uuid(),
  post_id       uuid not null references public.blog_posts(id) on delete cascade,
  author_id     uuid not null,
  author_name   text not null,
  author_avatar text,
  body          text not null check (char_length(body) between 1 and 3000),
  created_at    timestamptz not null default now()
);
create index if not exists blog_comments_post_idx on public.blog_comments (post_id, created_at);

alter table public.blog_comments enable row level security;

drop policy if exists comments_read on public.blog_comments;
create policy comments_read on public.blog_comments for select using (true);

drop policy if exists comments_insert on public.blog_comments;
create policy comments_insert on public.blog_comments for insert to authenticated
  with check (author_id = auth.uid());

drop policy if exists comments_delete on public.blog_comments;
create policy comments_delete on public.blog_comments for delete to authenticated
  using (author_id = auth.uid() or public.is_admin());

grant select on public.blog_comments to anon, authenticated;
grant insert, delete on public.blog_comments to authenticated;

-- ---- trigger: mantém comment_count ----
create or replace function public.bump_comment_count()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if tg_op = 'INSERT' then
    update public.blog_posts set comment_count = comment_count + 1 where id = new.post_id;
  elsif tg_op = 'DELETE' then
    update public.blog_posts set comment_count = greatest(0, comment_count - 1) where id = old.post_id;
  end if;
  return null;
end $$;
drop trigger if exists trg_blog_comment_count on public.blog_comments;
create trigger trg_blog_comment_count
  after insert or delete on public.blog_comments
  for each row execute function public.bump_comment_count();

-- ---- Storage: bucket público p/ prints ----
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('blog-images', 'blog-images', true, 5242880, array['image/png','image/jpeg','image/webp','image/gif'])
on conflict (id) do update set public = true, file_size_limit = 5242880,
  allowed_mime_types = array['image/png','image/jpeg','image/webp','image/gif'];

drop policy if exists blog_img_read on storage.objects;
create policy blog_img_read on storage.objects for select
  using (bucket_id = 'blog-images');

drop policy if exists blog_img_upload on storage.objects;
create policy blog_img_upload on storage.objects for insert to authenticated
  with check (bucket_id = 'blog-images');

drop policy if exists blog_img_delete on storage.objects;
create policy blog_img_delete on storage.objects for delete to authenticated
  using (bucket_id = 'blog-images' and owner = auth.uid());
