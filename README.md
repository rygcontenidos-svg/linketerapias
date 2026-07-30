# LinkeTerapias — base del MVP

Scaffold de arranque: tema de marca aplicado, componentes del núcleo del
directorio, modelo de datos completo con RLS y geolocalización, e i18n
(ES/CA/EN) desde el día uno. **No es el app terminado** — es la base sobre
la que se construyen las 6-7 semanas.

## Stack

- **Next.js 15** (App Router) + TypeScript
- **Supabase** — Postgres + PostGIS (geo) + Auth + RLS + Storage
- **Stripe** — suscripciones + destacados (pago puntual)
- **next-intl** — i18n con rutas `/es`, `/ca`, `/en`
- **Tailwind** — tokens de marca en `app/globals.css`

## Qué trae

| Ya hecho | Dónde |
|---|---|
| Tokens de marca (azul Linke / verde Terapias, radios, tipografías) | `app/globals.css`, `tailwind.config.ts` |
| Logo como componente (infinito + corazón) | `components/brand/logo.tsx` |
| Buscador (especialidad + ciudad) | `components/search-bar.tsx` |
| Tarjeta de terapeuta + estrellas + badge Destacado | `components/therapist-card.tsx` |
| Pantalla de directorio armada | `app/[locale]/buscar/page.tsx` |
| Modelo de datos: 3 roles, geo, agenda, empleo, suscripciones, destacados | `supabase/schema.sql` |
| RLS: "ocultar perfil al vencer", empleo solo pro, citas privadas | `supabase/schema.sql` |
| Modo "gratis hasta masa crítica" (flag, sin tocar código) | `platform_settings` |
| i18n con las 3 rutas de idioma | `i18n/`, `messages/`, `middleware.ts` |

Las tres reglas más caras del negocio ya están resueltas en la base de datos:
`is_visible()` (visibilidad según suscripción), `is_featured()` (destacado
vigente por fecha) y `search_therapists()` (directorio: destacados primero,
luego por cercanía).

## Correr en local

```bash
npm install
cp .env.example .env.local     # completá las claves
npm run dev                     # http://localhost:3000/es/buscar
```

La pantalla arranca con datos de muestra, así que se ve sin base conectada.

## Conectar Supabase

1. Crear proyecto en supabase.com.
2. SQL Editor → pegar y correr `supabase/schema.sql`, luego `supabase/seed.sql`.
3. Copiar URL y anon key a `.env.local`.
4. En `app/[locale]/buscar/page.tsx`, cambiar `SAMPLE` por la llamada a
   `search_therapists` (está el snippet comentado arriba de la constante).

## Próximos pasos (en orden de lo que destraba el prototipo)

1. **Auth + onboarding por rol** — registro paciente/terapeuta/empresa sobre
   Supabase Auth; el `role` decide el dashboard.
2. **Ficha pública + edición de perfil** del terapeuta.
3. **Mapa real** — Google Maps JS API en el `<aside>` del directorio.
4. **Stripe** — Checkout + Customer Portal para suscripción; webhook que
   escribe en `subscriptions` (esto activa/desactiva la visibilidad solo).
5. **Destacados** — Checkout de pago puntual que inserta en `featured`.
6. **Agenda** — flujo de cita con confirmación bilateral (+ Google Calendar).
7. **Bolsa de empleo** — `job_posts` / `job_seekers` con gating por rol.
8. **Emails** — avisos de vencimiento con Resend.

## Notas

- Iconos Tabler cargan por CDN en el layout; en producción, instalá
  `@tabler/icons-webfont` local.
- Traducción real de contenido a CA/EN: los archivos de UI están; el contenido
  de perfiles es Fase 3 (ya flagueado como fuera de alcance del MVP).
