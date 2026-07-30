import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Logo, LogoMark } from "@/components/brand/logo";
import { SearchBar } from "@/components/search-bar";
import { TherapistCard } from "@/components/therapist-card";
import type { TherapistCardData } from "@/lib/types";

const ESPECIALIDADES = [
  { key: "fisioterapeuta", icon: "ti-activity" },
  { key: "logopeda", icon: "ti-messages" },
  { key: "pedagogo", icon: "ti-school" },
  { key: "psicologo", icon: "ti-brain" },
  { key: "ocupacional", icon: "ti-puzzle" },
] as const;

const DESTACADOS: TherapistCardData[] = [
  { slug: "laura-martin", name: "Laura Martín", specialty: "Psicóloga", subtitle: "Terapia cognitivo-conductual", city: "Eixample, Barcelona", rating: 4.9, reviews: 128, featured: true },
  { slug: "jordi-roca", name: "Jordi Roca", specialty: "Logopeda", subtitle: "Infantil y adultos", city: "Gràcia, Barcelona", rating: 4.8, reviews: 74, featured: false },
  { slug: "marta-serra", name: "Marta Serra", specialty: "Fisioterapeuta", subtitle: "Neurológica", city: "Sant Martí, Barcelona", rating: 4.6, reviews: 41, featured: false },
  { slug: "carlos-ruiz", name: "Carlos Ruiz", specialty: "Psicólogo", subtitle: "Terapia de pareja", city: "Les Corts, Barcelona", rating: 4.7, reviews: 93, featured: false },
  { slug: "ana-vidal", name: "Ana Vidal", specialty: "Pedagoga", subtitle: "Dificultades de aprendizaje", city: "Sabadell, Barcelona", rating: 4.9, reviews: 56, featured: false },
  { slug: "elena-gil", name: "Elena Gil", specialty: "Logopeda", subtitle: "Trastornos del lenguaje", city: "L'Hospitalet, Barcelona", rating: 4.8, reviews: 112, featured: false },
  { slug: "marina-costa", name: "Marina Costa", specialty: "Terapeuta ocupacional", subtitle: "Integración sensorial", city: "Ciutat Vella, Barcelona", rating: 4.6, reviews: 27, featured: false },
  { slug: "david-lopez", name: "David López", specialty: "Psicólogo", subtitle: "Neuropsicología clínica", city: "Centro, Madrid", rating: 4.9, reviews: 201, featured: true },
  { slug: "sara-ibanez", name: "Sara Ibáñez", specialty: "Fisioterapeuta", subtitle: "Suelo pélvico", city: "Sants-Montjuïc, Barcelona", rating: 4.7, reviews: 63, featured: false },
];

export default async function HomePage() {
  const t = await getTranslations("home");

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-surface py-12 md:py-16">
        <div
          className="pointer-events-none absolute right-[50px] top-0 opacity-[0.15]"
          style={{ transform: "translate(10%, -10%)" }}
          aria-hidden
        >
          <LogoMark size={320} />
        </div>
        <div className="relative mx-auto max-w-3xl px-5 text-center">
          <p className="mb-3 text-[13px] font-bold uppercase tracking-widest text-brand">
            {t("hero.eyebrow")}
          </p>
          <h1 className="font-display text-3xl text-ink md:text-5xl md:leading-tight">
            {t("hero.title")}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[15px] text-muted">
            {t("hero.subtitle")}
          </p>
          <div className="mt-8">
            <SearchBar />
          </div>
          <p className="mt-5 text-[15px] text-muted">
            <i className="ti ti-heart align-text-bottom text-lg" style={{ color: "var(--accent)" }} aria-hidden />{" "}
            {t("hero.free")}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <h2 className="font-display text-2xl text-ink">{t("especialidades.title")}</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {ESPECIALIDADES.map(({ key, icon }, i) => {
            const label = t(`especialidades.${key}` as never) as string;
            return (
              <Link
                key={key}
                href={`/buscar?especialidad=${encodeURIComponent(label)}`}
                className="animate-card-rise specialty-card relative flex flex-col items-center gap-3 rounded-card border border-line bg-surface p-5 text-center"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div
                  className="icon-circle flex h-16 w-16 items-center justify-center rounded-[20px]"
                  style={{
                    background: "linear-gradient(135deg, var(--brand) 0%, var(--accent) 100%)",
                    boxShadow: "0 6px 20px rgba(94,23,235,0.25), inset 0 2px 6px rgba(255,255,255,0.45)",
                  }}
                >
                  <i className={`ti ${icon} text-[30px] text-white`} style={{ filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.15))" }} aria-hidden />
                </div>
                <span className="text-[14px] font-medium text-ink">{label}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl text-ink">{t("destacados.title")}</h2>
          <Link
            href="/buscar"
            className="text-[14px] font-medium text-brand transition hover:underline"
          >
            {t("destacados.verTodos")}
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {DESTACADOS.map((th) => (
            <TherapistCard key={th.slug} t={th} />
          ))}
        </div>
      </section>

      <section className="py-16 md:py-20" style={{ background: "var(--brand)" }}>
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-center font-display text-2xl text-white">
            {t("profesionales.title")}
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="flex flex-col items-center rounded-card border border-line bg-surface p-8 text-center">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full"
                style={{ background: "var(--brand-tint)", color: "var(--brand)" }}
              >
                <i className="ti ti-stethoscope text-2xl" aria-hidden />
              </div>
              <h3 className="mt-4 font-display text-lg text-ink">
                {t("profesionales.terapeuta.title")}
              </h3>
              <p className="mt-2 max-w-xs text-[14px] text-muted">
                {t("profesionales.terapeuta.description")}
              </p>
              <Link
                href="/registro/terapeuta"
                className="mt-6 inline-block rounded-control bg-brand px-6 py-2.5 text-[14px] font-medium text-white transition hover:bg-brand-dark"
              >
                {t("profesionales.terapeuta.cta")}
              </Link>
            </div>
            <div className="flex flex-col items-center rounded-card border border-line bg-surface p-8 text-center">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full"
                style={{ background: "var(--accent-tint)", color: "var(--accent-text)" }}
              >
                <i className="ti ti-building-community text-2xl" aria-hidden />
              </div>
              <h3 className="mt-4 font-display text-lg text-ink">
                {t("profesionales.empresa.title")}
              </h3>
              <p className="mt-2 max-w-xs text-[14px] text-muted">
                {t("profesionales.empresa.description")}
              </p>
              <Link
                href="/registro/empresa"
                className="mt-6 inline-block rounded-control border-2 border-brand px-6 py-2.5 text-[14px] font-medium text-brand transition hover:bg-brand hover:text-white"
              >
                {t("profesionales.empresa.cta")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
