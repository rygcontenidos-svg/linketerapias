import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { RatingStars, FeaturedBadge } from "@/components/therapist-card";
import { BookingCard } from "@/components/booking-card";
import { MapWrapper } from "@/components/map-wrapper";

const SERVICIOS = [
  { name: "Primera consulta", price: 80 },
  { name: "Consulta online", price: 120 },
  { name: "Terapia de pareja", price: 100 },
];

const REVIEWS = [
  {
    nombre: "Carlos M.",
    texto: "Laura me ayudó muchísimo con mi ansiedad. Hace meses que no me siento tan bien. Muy profesional y cercana, la recomiendo totalmente.",
    fecha: "Hace 2 meses",
    estrellas: 5,
    respuesta: "Muchas gracias Carlos, es un placer acompañarte en este proceso. ¡Seguimos!",
  },
  {
    nombre: "Ana G.",
    texto: "Fui por un duelo y me sentí muy acompañada. Su enfoque cognitivo-conductual es muy práctico y se notan los avances desde las primeras sesiones.",
    fecha: "Hace 1 mes",
    estrellas: 5,
    respuesta: "Gracias Ana, qué alegría leerte. El mérito es tuyo por el trabajo que hacés entre sesiones.",
  },
];

export default async function TerapeutaPage() {
  const t = await getTranslations("profile");

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-6xl px-5 py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="relative shrink-0">
                <div
                  className="flex h-24 w-24 items-center justify-center rounded-full text-3xl font-medium"
                  style={{ background: "var(--brand-tint)", color: "var(--brand)" }}
                >
                  LM
                </div>
                <div
                  className="absolute -bottom-0.5 -right-0.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white"
                  style={{ background: "var(--brand)" }}
                >
                  <i className="ti ti-check text-xs text-white" aria-hidden />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h1 className="font-display text-2xl text-ink">Laura Martín</h1>
                  <FeaturedBadge />
                </div>
                <p className="mt-1 text-[15px] text-muted">
                  Psicóloga &middot; Terapia cognitivo-conductual
                </p>
                <div className="mt-2">
                  <RatingStars rating={4.9} reviews={128} />
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-muted">
                  <span>
                    <i className="ti ti-map-pin" aria-hidden /> Eixample, Barcelona
                  </span>
                  <span>
                    <i className="ti ti-id" aria-hidden /> Col. CAT-28471
                  </span>
                </div>
                <Link
                  href="#"
                  className="mt-4 inline-block rounded-control border border-brand px-5 py-2 text-[13px] font-medium text-brand transition hover:bg-brand hover:text-white"
                >
                  {t("sendMessage")}
                </Link>
              </div>
            </div>

            <section className="mt-10 border-t border-line pt-8">
              <h2 className="font-display text-xl text-ink">{t("about")}</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                Psicóloga colegiada con más de 8 años de experiencia en terapia individual para adultos
                y adolescentes. Especializada en terapia cognitivo-conductual (TCC), trabajamos juntos
                para identificar patrones de pensamiento, desarrollar herramientas prácticas y lograr
                cambios duraderos en tu bienestar emocional.
              </p>
              <div className="mt-4">
                <span className="text-[13px] font-medium text-ink">{t("treats")}:</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {["Ansiedad", "Depresión", "Estrés", "Autoestima", "Duelo", "TOC"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full px-3 py-1 text-[13px] font-medium"
                      style={{ background: "var(--accent-tint)", color: "var(--accent-text)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            <section className="mt-10 border-t border-line pt-8">
              <h2 className="font-display text-xl text-ink">{t("services")}</h2>
              <div className="mt-4 space-y-3">
                {SERVICIOS.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-card border border-line bg-surface px-5 py-3.5"
                  >
                    <div>
                      <p className="text-[15px] font-medium text-ink">{s.name}</p>
                      <p className="text-[13px] text-muted">{s.price} €</p>
                    </div>
                    <a
                      href="#booking-card"
                      className="rounded-control bg-brand px-4 py-2 text-[13px] font-medium text-white transition hover:bg-brand-dark"
                    >
                      {t("book")}
                    </a>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-10 border-t border-line pt-8">
              <h2 className="font-display text-xl text-ink">{t("location")}</h2>
              <p className="mt-1 text-[14px] text-muted">
                Carrer de Balmes, 245 · 08006 Barcelona
              </p>
              <div className="mt-4 overflow-hidden rounded-card border border-line" style={{ height: 300 }}>
                <MapWrapper
                  markers={[{ lat: 41.3895, lng: 2.1620, name: "Laura Martín", specialty: "Psicóloga" }]}
                  zoom={16}
                  center={[41.3895, 2.1620]}
                />
              </div>
            </section>

            <section className="mt-10 border-t border-line pt-8">
              <h2 className="font-display text-xl text-ink">{t("reviews")}</h2>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-2xl font-bold" style={{ color: "var(--accent-text)" }}>4.9</span>
                <RatingStars rating={4.9} reviews={128} />
              </div>

              <div className="mt-6 space-y-6">
                {REVIEWS.map((r, i) => (
                  <div key={i} className="rounded-card border border-line bg-surface p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] font-medium text-ink">{r.nombre}</span>
                      <span className="text-[12px] text-muted">{r.fecha}</span>
                    </div>
                    <div className="mt-1">
                      <span style={{ color: "var(--accent-text)" }} aria-hidden>
                        {Array.from({ length: 5 }).map((_, j) => (
                          <i key={j} className={j < r.estrellas ? "ti ti-star-filled text-[13px]" : "ti ti-star text-[13px] text-muted"} />
                        ))}
                      </span>
                    </div>
                    <p className="mt-2 text-[14px] leading-relaxed text-muted">{r.texto}</p>
                    {r.respuesta && (
                      <div className="mt-3 rounded-control border-l-2 border-accent py-3 pl-4" style={{ background: "var(--accent-tint)" }}>
                        <span className="text-[12px] font-medium" style={{ color: "var(--accent-text)" }}>
                          {t("reply")}
                        </span>
                        <p className="mt-0.5 text-[13px] text-muted">{r.respuesta}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside id="booking-card">
            <BookingCard
              services={SERVICIOS}
              t={{
                "booking.title": t("booking.title"),
                "booking.inPerson": t("booking.inPerson"),
                "booking.online": t("booking.online"),
                "booking.selectService": t("booking.selectService"),
                "booking.summary": t("booking.summary"),
                "booking.cta": t("booking.cta"),
              }}
            />
          </aside>
        </div>
      </main>
    </div>
  );
}
