import Link from "next/link";
import { MapWrapper } from "@/components/map-wrapper";

const team = [
  { initials: "LM", name: "Laura Martín", role: "Psicóloga · TCC", tone: "brand" },
  { initials: "JR", name: "Jordi Roca", role: "Logopeda", tone: "accent" },
  { initials: "MS", name: "Marta Serra", role: "Fisioterapeuta", tone: "accent" },
  { initials: "CR", name: "Carlos Ruiz", role: "Psicólogo · Pareja", tone: "brand" },
];

const sedes = [
  { name: "Sede Eixample", addr: "Carrer de Balmes, 245 · 08006 Barcelona" },
  { name: "Sede Gràcia", addr: "Carrer Gran de Gràcia, 12 · 08012 Barcelona" },
];

const ofertas = [
  { title: "Psicólogo/a clínico — jornada completa", extra: "Eixample · Contratado" },
  { title: "Logopeda infantil — media jornada", extra: "Gràcia · Autónomo" },
];

export default function EmpresaPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-[1120px] px-6">
        <div className="grid items-start gap-6 pb-12 pt-6 lg:grid-cols-[1.55fr_1fr]">
          <div>
            <section className="pb-6">
              <div className="flex gap-[18px]">
                <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-[14px] text-[30px]"
                  style={{ background: "var(--accent-tint)", color: "var(--accent-text)" }}>
                  <i className="ti ti-building" aria-hidden />
                </div>
                <div>
                  <h1 className="flex flex-wrap items-center gap-2.5 font-display text-2xl">
                    Centro Aurora
                    <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-[3px] text-[11px] font-semibold"
                      style={{ background: "#F5C518", color: "#ffffff" }}>
                      <i className="ti ti-star-filled text-[10px]" aria-hidden /> Destacado
                    </span>
                  </h1>
                  <p className="mt-0.5 text-[14px] text-muted">Clínica de salud integrativa</p>
                  <div className="mt-1.5 flex flex-wrap gap-x-3.5 gap-y-1 text-[13px] text-muted">
                    <span style={{ color: "var(--accent-text)" }}>
                      <i className="ti ti-star-filled" /><i className="ti ti-star-filled" />
                      <i className="ti ti-star-filled" /><i className="ti ti-star-filled" />
                      <i className="ti ti-star-filled" /> 4,8 · 96 opiniones
                    </span>
                    <span><i className="ti ti-map-pin" aria-hidden /> 2 sedes en Barcelona</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Link href="#"
                  className="inline-flex items-center gap-1.5 rounded-control bg-brand px-[18px] py-[9px] text-[14px] font-medium text-white transition hover:bg-brand-dark">
                  <i className="ti ti-message" aria-hidden /> Contactar
                </Link>
                <Link href="#"
                  className="inline-flex items-center gap-1.5 rounded-control border border-brand px-[18px] py-2 text-[13px] font-medium text-brand transition hover:bg-brand hover:text-white">
                  <i className="ti ti-briefcase" aria-hidden /> Ver sus ofertas
                </Link>
              </div>
            </section>

            <section className="border-t border-line py-6">
              <h2 className="mb-3.5 font-display text-lg">Sobre el centro</h2>
              <p className="text-[14px] text-ink">
                Centro de salud integrativa con más de 10 años acompañando a pacientes en Barcelona. Equipo multidisciplinar de psicólogos, logopedas y fisioterapeutas trabajando de forma coordinada.
              </p>
            </section>

            <section className="border-t border-line py-6">
              <h2 className="mb-3.5 font-display text-lg">Nuestro equipo</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {team.map((t) => (
                  <div key={t.name} className="flex items-center gap-3 rounded-xl border border-line bg-surface p-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-medium"
                      style={{
                        background: t.tone === "brand" ? "var(--brand-tint)" : "var(--accent-tint)",
                        color: t.tone === "brand" ? "var(--brand)" : "var(--accent-text)",
                      }}>
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-[14px] font-medium">{t.name}</p>
                      <p className="text-[12px] text-muted">{t.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="border-t border-line py-6">
              <h2 className="mb-3.5 font-display text-lg">Sedes</h2>
              {sedes.map((s) => (
                <div key={s.name} className="flex gap-3 border-b border-line py-3 last:border-none">
                  <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-lg"
                    style={{ background: "var(--brand-tint)", color: "var(--brand)" }}>
                    <i className="ti ti-map-pin" aria-hidden />
                  </div>
                  <div>
                    <p className="text-[14px] font-medium">{s.name}</p>
                    <p className="text-[13px] text-muted">{s.addr}</p>
                  </div>
                </div>
              ))}
              <div className="mt-2 overflow-hidden rounded-xl border border-line" style={{ height: 230 }}>
                <MapWrapper
                  zoom={15}
                  center={[41.3895, 2.1620]}
                  markers={[
                    { lat: 41.3895, lng: 2.1620, name: "Sede Eixample", specialty: "Centro Aurora" },
                    { lat: 41.4026, lng: 2.1538, name: "Sede Gràcia", specialty: "Centro Aurora" },
                  ]}
                />
              </div>
            </section>

            <section className="border-t border-line py-6">
              <h2 className="mb-3.5 font-display text-lg">Ofertas activas</h2>
              <div className="flex flex-col gap-2.5">
                {ofertas.map((o) => (
                  <div key={o.title} className="flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-3.5">
                    <div>
                      <p className="text-[14px] font-medium">{o.title}</p>
                      <p className="text-[12px] text-muted">{o.extra}</p>
                    </div>
                    <Link href="/empleo/oferta/1"
                      className="rounded-control border border-brand px-[18px] py-2 text-[13px] font-medium text-brand transition hover:bg-brand hover:text-white">
                      Ver oferta
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="sticky top-20 rounded-card border border-line bg-surface p-5">
            <h3 className="mb-3.5 font-display text-base">Contacto</h3>
            <div className="flex flex-col gap-[7px] text-[13px] text-muted">
              <div className="flex items-center gap-2.5">
                <i className="ti ti-map-pin w-4 text-center" style={{ color: "var(--brand)" }} aria-hidden />
                <span>Barcelona · 2 sedes</span>
              </div>
              <div className="flex items-center gap-2.5">
                <i className="ti ti-phone w-4 text-center" style={{ color: "var(--brand)" }} aria-hidden />
                <span>Ver teléfono</span>
              </div>
              <div className="flex items-center gap-2.5">
                <i className="ti ti-world w-4 text-center" style={{ color: "var(--brand)" }} aria-hidden />
                <span>centroaurora.es</span>
              </div>
              <div className="flex items-center gap-2.5">
                <i className="ti ti-brand-instagram w-4 text-center" style={{ color: "var(--brand)" }} aria-hidden />
                <span>@centroaurora</span>
              </div>
            </div>
            <button type="button"
              className="mt-3.5 flex w-full items-center justify-center gap-1.5 rounded-control bg-brand py-[11px] text-[14px] font-medium text-white transition hover:bg-brand-dark">
              <i className="ti ti-message" aria-hidden /> Enviar mensaje
            </button>
            <hr className="my-4 border-t border-line" />
            <p className="mb-1 text-[13px] text-muted">¿Buscás empleo aquí?</p>
            <button type="button"
              className="flex w-full items-center justify-center gap-1.5 rounded-control border border-brand py-2.5 text-[13px] font-medium text-brand transition hover:bg-brand hover:text-white">
              <i className="ti ti-briefcase" aria-hidden /> Ver 2 ofertas activas
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}
