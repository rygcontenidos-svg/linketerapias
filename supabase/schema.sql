-- ============================================================
-- LinkeTerapias · Modelo de datos (MVP)
-- Ejecutar en el SQL Editor de Supabase, o via `supabase db push`.
-- ============================================================

create extension if not exists postgis;      -- geolocalización (buscador por cercanía)
create extension if not exists pg_cron;       -- limpieza opcional de destacados vencidos

-- ---------- Configuración de plataforma ----------
-- Modo "gratis hasta masa crítica": con billing_enabled = false, todos los
-- perfiles son visibles sin suscripción. Se activa el cobro sin tocar código.
create table platform_settings (
  id boolean primary key default true check (id),   -- fila única
  billing_enabled boolean not null default false
);
insert into platform_settings (id) values (true);

-- ---------- Perfiles y roles ----------
create type user_role as enum ('patient', 'therapist', 'company');

create table profiles (
  id uuid primary key references auth.users on delete cascade,
  role user_role not null,
  full_name text,
  email text,
  phone text,
  avatar_url text,
  created_at timestamptz not null default now()
);

-- ---------- Especialidades (contenido i18n) ----------
create table specialties (
  id serial primary key,
  slug text unique not null,
  name_es text not null,
  name_ca text,
  name_en text
);

-- ---------- Terapeutas ----------
create table therapists (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles on delete cascade,
  slug text unique not null,
  headline text,
  bio text,
  price_cents integer,
  city text,
  address text,
  location geography(Point, 4326),            -- lng/lat para ST_DWithin
  google_place_id text,                       -- reseñas via Google Places API
  rating numeric(2,1) default 0,
  reviews_count integer default 0,
  online_booking boolean not null default true,
  created_at timestamptz not null default now()
);
create index therapists_location_gix on therapists using gist (location);

create table therapist_specialties (
  therapist_id uuid references therapists on delete cascade,
  specialty_id integer references specialties on delete cascade,
  primary key (therapist_id, specialty_id)
);

-- ---------- Empresas (varios terapeutas + varias sedes) ----------
create table companies (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles on delete cascade,
  name text not null,
  logo_url text,
  description text
);

create table company_locations (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies on delete cascade,
  address text,
  city text,
  location geography(Point, 4326)
);

create table company_therapists (
  company_id uuid references companies on delete cascade,
  therapist_id uuid references therapists on delete cascade,
  primary key (company_id, therapist_id)
);

-- ---------- Agenda de citas (confirmación bilateral) ----------
create type appointment_status as enum ('requested', 'confirmed', 'cancelled');

create table appointments (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references profiles on delete cascade,
  therapist_id uuid not null references therapists on delete cascade,
  starts_at timestamptz not null,
  status appointment_status not null default 'requested',
  created_at timestamptz not null default now()
);

-- ---------- Bolsa de empleo (solo terapeutas y empresas) ----------
create table job_posts (              -- ofertas publicadas por empresas
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies on delete cascade,
  title text not null,
  description text,
  city text,
  contract_type text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table job_seekers (            -- disponibilidad laboral de terapeutas
  therapist_id uuid primary key references therapists on delete cascade,
  cv_url text,
  contract_pref text,
  available boolean not null default true
);

-- ---------- Suscripciones (sincronizadas desde Stripe via webhooks) ----------
create type subscription_status as enum ('active', 'past_due', 'canceled', 'unpaid');

create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text unique,
  status subscription_status not null default 'active',
  current_period_end timestamptz
);
create index subscriptions_profile_idx on subscriptions (profile_id);

-- ---------- Destacados (pago puntual, expiración automática por fecha) ----------
create type featured_target as enum ('therapist', 'company', 'job_post');
create type featured_plan as enum ('basico', 'estandar', 'premium');  -- 7 / 15 / 30 días

create table featured (
  id uuid primary key default gen_random_uuid(),
  target_type featured_target not null,
  target_id uuid not null,
  plan featured_plan not null,
  starts_at timestamptz not null default now(),
  ends_at timestamptz not null,
  stripe_payment_intent text
);
create index featured_active_idx on featured (target_type, target_id, ends_at);

-- Un terapeuta está "destacado" si tiene un featured vigente (now < ends_at).
-- No hace falta cron: las consultas filtran por fecha. El cron solo limpia.
create or replace function is_featured(p_type featured_target, p_id uuid)
returns boolean language sql stable as $$
  select exists (
    select 1 from featured
    where target_type = p_type and target_id = p_id and now() < ends_at
  );
$$;

-- ¿El perfil debe mostrarse? Sí si el cobro está apagado (modo gratis) o si
-- tiene una suscripción activa. Ésta es la regla de "ocultar al vencer".
create or replace function is_visible(p_profile_id uuid)
returns boolean language sql stable as $$
  select (select not billing_enabled from platform_settings)
      or exists (
        select 1 from subscriptions
        where profile_id = p_profile_id and status = 'active'
          and (current_period_end is null or now() < current_period_end)
      );
$$;

-- ============================================================
-- Búsqueda del directorio: visibles primero destacados, luego por cercanía.
-- ============================================================
create or replace function search_therapists(
  p_specialty text default null,
  p_city text default null,
  p_lat double precision default null,
  p_lng double precision default null,
  p_radius_m integer default null
)
returns table (
  slug text, name text, specialty text, city text,
  rating numeric, reviews_count integer, featured boolean, distance_m double precision
) language sql stable as $$
  select
    t.slug,
    p.full_name,
    (select s.name_es from specialties s
       join therapist_specialties ts on ts.specialty_id = s.id
      where ts.therapist_id = t.id limit 1) as specialty,
    t.city,
    t.rating,
    t.reviews_count,
    is_featured('therapist', t.id) as featured,
    case when p_lat is not null and p_lng is not null and t.location is not null
      then st_distance(t.location, st_point(p_lng, p_lat)::geography)
    end as distance_m
  from therapists t
  join profiles p on p.id = t.profile_id
  where is_visible(t.profile_id)
    and (p_city is null or t.city ilike '%' || p_city || '%')
    and (p_specialty is null or exists (
      select 1 from therapist_specialties ts
      join specialties s on s.id = ts.specialty_id
      where ts.therapist_id = t.id and s.name_es ilike p_specialty))
    and (p_radius_m is null or p_lat is null or p_lng is null
      or st_dwithin(t.location, st_point(p_lng, p_lat)::geography, p_radius_m))
  order by featured desc, distance_m asc nulls last, t.rating desc;
$$;

-- ============================================================
-- Row Level Security
-- ============================================================
alter table profiles enable row level security;
alter table therapists enable row level security;
alter table appointments enable row level security;
alter table job_posts enable row level security;
alter table subscriptions enable row level security;

-- Perfiles: cada quien ve y edita el suyo.
create policy "perfil propio: leer"   on profiles for select using (auth.uid() = id);
create policy "perfil propio: editar" on profiles for update using (auth.uid() = id);

-- Terapeutas: lectura pública solo si el perfil es visible; edita el dueño.
create policy "terapeutas visibles"     on therapists for select
  using (is_visible(profile_id));
create policy "terapeuta edita el suyo" on therapists for all
  using (auth.uid() = profile_id) with check (auth.uid() = profile_id);

-- Citas: solo las partes involucradas (paciente o dueño del perfil terapeuta).
create policy "citas propias" on appointments for all using (
  auth.uid() = patient_id
  or auth.uid() = (select profile_id from therapists where id = therapist_id)
);

-- Bolsa de empleo: visible para terapeutas y empresas, NO para pacientes.
create policy "empleo solo pro" on job_posts for select using (
  exists (select 1 from profiles where id = auth.uid() and role in ('therapist','company'))
);

-- Suscripciones: cada quien ve la suya (el webhook escribe con service_role).
create policy "suscripcion propia" on subscriptions for select using (auth.uid() = profile_id);
