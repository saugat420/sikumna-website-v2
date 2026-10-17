create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null check (char_length(full_name) between 2 and 100),
  learning_interest text,
  signup_source text,
  marketing_consent boolean not null default false,
  marketing_consent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  is_admin boolean not null default false,
  welcome_email_status text not null default 'pending' check (welcome_email_status in ('pending', 'sending', 'sent', 'failed')),
  welcome_email_attempts integer not null default 0,
  welcome_email_last_attempt_at timestamptz,
  welcome_email_sent_at timestamptz,
  welcome_email_last_error text
);

alter table public.profiles enable row level security;

create policy "Learners can read their own profile"
on public.profiles for select
to authenticated
using ((select auth.uid()) = id);

revoke insert, update, delete on public.profiles from anon, authenticated;
grant select on public.profiles to authenticated;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (
    id, full_name, learning_interest, signup_source,
    marketing_consent, marketing_consent_at
  ) values (
    new.id,
    coalesce(nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''), split_part(new.email, '@', 1)),
    nullif(trim(new.raw_user_meta_data ->> 'learning_interest'), ''),
    coalesce(nullif(trim(new.raw_user_meta_data ->> 'signup_source'), ''), 'website'),
    coalesce(new.raw_user_meta_data ->> 'marketing_consent', 'false') = 'true',
    case when coalesce(new.raw_user_meta_data ->> 'marketing_consent', 'false') = 'true' then now() else null end
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.claim_welcome_email(target_user uuid)
returns boolean
language plpgsql
security definer set search_path = ''
as $$
declare claimed boolean := false;
begin
  update public.profiles
  set welcome_email_status = 'sending',
      welcome_email_attempts = welcome_email_attempts + 1,
      welcome_email_last_attempt_at = now(),
      welcome_email_last_error = null,
      updated_at = now()
  where id = target_user
    and welcome_email_sent_at is null
    and (
      welcome_email_status in ('pending', 'failed')
      or (welcome_email_status = 'sending' and welcome_email_last_attempt_at < now() - interval '10 minutes')
    )
  returning true into claimed;
  return coalesce(claimed, false);
end;
$$;

revoke all on function public.claim_welcome_email(uuid) from public, anon, authenticated;
grant execute on function public.claim_welcome_email(uuid) to service_role;

create index if not exists profiles_created_at_idx on public.profiles(created_at desc);
create index if not exists profiles_marketing_consent_idx on public.profiles(marketing_consent) where marketing_consent = true;
