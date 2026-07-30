import Link from "next/link";

export default function OfertaPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-[1120px] px-6">
        <nav className="py-4 text-[13px] text-muted">
          <Link href="/empleo" className="hover:text-ink">Bolsa de empleo</Link> › <Link href="/empleo" className="hover:text-ink">Ofertas</Link> › <span className="text-ink">Psicólogo/a clínico</span>
        </nav>

        <div className="grid items-start gap-6 pb-12 lg:grid-cols-[1.55fr_1fr]">
          <div>
            <section className="pb-6">
              <div className="flex gap-4">
                <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-[14px]"
                  style={{ background: "var(--brand-tint)", color: "var(--brand)" }}>
                  <i className="ti ti-building text-[26px]" aria-hidden />
                </div>
                <div>
                  <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-[3px] text-[11px] font-semibold"
                    style={{ background: "#F5C518", color: "#ffffff" }}>
                    <i className="ti ti-star-filled text-[10px]" aria-hidden /> Destacado
                  </span>
                  <h1 className="mt-2 font-display text-[22px]">Psicólogo/a clínico — jornada completa</h1>
                  <p className="mt-1 text-[14px] text-muted">Centro Aurora · Eixample, Barcelona</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <span className="rounded-full px-[11px] py-[5px] text-[12px] font-medium"
                      style={{ background: "rgba(94,23,235,0.08)", color: "var(--brand)" }}>Psicólogo</span>
                    <span className="rounded-full border border-line px-[11px] py-[5px] text-[12px] text-muted">Contratado</span>
                    <span className="rounded-full border border-line px-[11px] py-[5px] text-[12px] text-muted">Presencial</span>
                    <span className="rounded-full border border-line px-[11px] py-[5px] text-[12px] text-muted">Jornada completa</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="border-t border-line py-6">
              <h2 className="mb-3.5 font-display text-lg">Descripción del puesto</h2>
              <p className="text-[14px] text-ink">
                Buscamos psicólogo/a clínico para incorporarse a nuestro equipo de salud mental. Atención a población adulta, enfoque cognitivo-conductual, dentro de un centro con equipo multidisciplinar y agenda estable.
              </p>
            </section>

            <section className="border-t border-line py-6">
              <h2 className="mb-3.5 font-display text-lg">Requisitos</h2>
              <ul className="flex flex-col gap-2.5">
                {[
                  "Grado en Psicología + habilitación sanitaria (PIR o Máster PGS).",
                  "Colegiación vigente.",
                  "Mínimo 2 años de experiencia en consulta.",
                  "Catalán y castellano.",
                ].map((r) => (
                  <li key={r} className="flex gap-2.5 text-[14px]">
                    <i className="ti ti-check mt-[3px] shrink-0" style={{ color: "var(--accent-text)" }} aria-hidden />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="border-t border-line py-6">
              <h2 className="mb-3.5 font-display text-lg">Qué ofrecemos</h2>
              <ul className="flex flex-col gap-2.5">
                {[
                  "Contrato indefinido, jornada completa.",
                  "Formación continua a cargo del centro.",
                  "Equipo multidisciplinar y buen ambiente.",
                ].map((r) => (
                  <li key={r} className="flex gap-2.5 text-[14px]">
                    <i className="ti ti-check mt-[3px] shrink-0" style={{ color: "var(--accent-text)" }} aria-hidden />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="border-t border-line py-6">
              <h2 className="mb-3.5 font-display text-lg">Sobre la empresa</h2>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px]"
                  style={{ background: "var(--brand-tint)", color: "var(--brand)" }}>
                  <i className="ti ti-building text-xl" aria-hidden />
                </div>
                <div>
                  <p className="text-[14px] font-medium">Centro Aurora</p>
                  <p className="text-[12px] text-muted">
                    Clínica de salud integrativa · Barcelona ·{" "}
                    <Link href="/empresa/centro-aurora" className="text-brand hover:underline">Ver perfil</Link>
                  </p>
                </div>
              </div>
            </section>
          </div>

          <aside className="sticky top-20 rounded-card border border-line bg-surface p-5">
            <h3 className="mb-3.5 font-display text-base">Resumen del puesto</h3>
            <div className="flex flex-col gap-[7px] text-[13px] text-muted">
              <div className="flex items-center gap-2.5">
                <i className="ti ti-briefcase w-4 text-center" style={{ color: "var(--brand)" }} aria-hidden />
                <span>Contrato: <b className="font-medium text-ink">Indefinido</b></span>
              </div>
              <div className="flex items-center gap-2.5">
                <i className="ti ti-clock-hour-4 w-4 text-center" style={{ color: "var(--brand)" }} aria-hidden />
                <span>Jornada: <b className="font-medium text-ink">Completa</b></span>
              </div>
              <div className="flex items-center gap-2.5">
                <i className="ti ti-map-pin w-4 text-center" style={{ color: "var(--brand)" }} aria-hidden />
                <span>Lugar: <b className="font-medium text-ink">Eixample, Barcelona</b></span>
              </div>
              <div className="flex items-center gap-2.5">
                <i className="ti ti-cash w-4 text-center" style={{ color: "var(--brand)" }} aria-hidden />
                <span>Salario: <b className="font-medium text-ink">A convenir</b></span>
              </div>
              <div className="flex items-center gap-2.5">
                <i className="ti ti-calendar w-4 text-center" style={{ color: "var(--brand)" }} aria-hidden />
                <span>Publicada: <b className="font-medium text-ink">Hace 2 días</b></span>
              </div>
            </div>
            <button type="button"
              className="mt-3.5 flex w-full items-center justify-center gap-1.5 rounded-control bg-brand py-[11px] text-[14px] font-medium text-white transition hover:bg-brand-dark">
              Postular ahora
            </button>
            <button type="button"
              className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-control border border-brand py-2.5 text-[13px] font-medium text-brand transition hover:bg-brand hover:text-white">
              <i className="ti ti-bookmark" aria-hidden /> Guardar oferta
            </button>
            <p className="mt-3 text-center text-[11px] text-muted">
              Solo terapeutas registrados pueden postular.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
