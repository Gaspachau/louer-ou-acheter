-- ══════════════════════════════════════════════════════════════
-- louer-acheter.fr — Migration initiale
-- À exécuter dans Supabase Dashboard → SQL Editor
-- ══════════════════════════════════════════════════════════════

-- ── 1. Table simulations ──────────────────────────────────────
create table if not exists public.simulations (
  id                           uuid default gen_random_uuid() primary key,
  created_at                   timestamptz default now(),
  ville                        text,
  profil                       text,
  revenus                      integer,
  apport                       integer,
  prix_bien                    integer,
  duree_pret                   integer,
  taux                         numeric(5,2),
  loyer                        integer,
  resultat_verdict             text,
  resultat_patrimoine_achat    integer,
  resultat_patrimoine_location integer,
  resultat_difference          integer,
  point_equilibre              integer
);

-- ── 2. Table leads ────────────────────────────────────────────
create table if not exists public.leads (
  id            uuid default gen_random_uuid() primary key,
  created_at    timestamptz default now(),
  email         text not null,
  source        text,
  simulation_id uuid references public.simulations(id) on delete set null
);

-- ── 3. Table newsletter ───────────────────────────────────────
create table if not exists public.newsletter (
  id         uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  email      text unique not null,
  actif      boolean default true
);

-- ── 4. Row Level Security ─────────────────────────────────────
alter table public.simulations enable row level security;
alter table public.leads       enable row level security;
alter table public.newsletter  enable row level security;

-- Visiteurs anonymes : insertion uniquement
create policy "anon_insert_simulations" on public.simulations
  for insert to anon with check (true);

create policy "anon_insert_leads" on public.leads
  for insert to anon with check (true);

create policy "anon_insert_newsletter" on public.newsletter
  for insert to anon with check (true);

-- Admin authentifié : lecture complète
create policy "auth_select_simulations" on public.simulations
  for select to authenticated using (true);

create policy "auth_select_leads" on public.leads
  for select to authenticated using (true);

create policy "auth_select_newsletter" on public.newsletter
  for select to authenticated using (true);

-- ── 5. Index performances ────────────────────────────────────
create index if not exists idx_simulations_created_at on public.simulations (created_at desc);
create index if not exists idx_leads_created_at       on public.leads       (created_at desc);
create index if not exists idx_newsletter_email       on public.newsletter  (email);
