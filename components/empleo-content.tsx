"use client";

import { useState } from "react";
import Link from "next/link";

interface Oferta {
  id: number;
  title: string;
  empresa: string;
  empresaSlug: string;
  ubicacion: string;
  especialidad: string;
  contratacion: string;
  modalidad: string;
  iconBg: "blue" | "green";
  featured?: boolean;
  hace: string;
}

interface Profesional {
  slug: string;
  name: string;
  initials: string;
  especialidad: string;
  subtitle: string;
  contratacion: string;
  modalidad: string;
  iconBg: "blue" | "green";
  featured?: boolean;
}

const OFERTAS: Oferta[] = [
  { id: 1, title: "Psicólogo/a clínico — jornada completa", empresa: "Centro Aurora", empresaSlug: "centro-aurora", ubicacion: "Eixample, Barcelona", especialidad: "Psicólogo", contratacion: "Contratado", modalidad: "Presencial", iconBg: "blue", featured: true, hace: "Hace 2 días" },
  { id: 2, title: "Logopeda infantil — media jornada", empresa: "Clínica Petit", empresaSlug: "clinica-petit", ubicacion: "Gràcia, Barcelona", especialidad: "Logopeda", contratacion: "Autónomo", modalidad: "Híbrido", iconBg: "green", hace: "Hace 5 días" },
  { id: 3, title: "Fisioterapeuta neurológico", empresa: "NeuroRehab BCN", empresaSlug: "neurorehab-bcn", ubicacion: "Sant Martí, Barcelona", especialidad: "Fisioterapeuta", contratacion: "Contratado", modalidad: "Presencial", iconBg: "blue", hace: "Hace 1 semana" },
  { id: 4, title: "Pedagogo/a terapéutico", empresa: "Gabinete Cisneros", empresaSlug: "gabinete-cisneros", ubicacion: "Centro, Madrid", especialidad: "Pedagogo", contratacion: "Autónomo", modalidad: "Online", iconBg: "green", hace: "Hace 2 semanas" },
  { id: 5, title: "Terapeuta ocupacional — geriatría", empresa: "Residencia Sant Jordi", empresaSlug: "residencia-sant-jordi", ubicacion: "Les Corts, Barcelona", especialidad: "Terapeuta ocupacional", contratacion: "Contratado", modalidad: "Presencial", iconBg: "blue", hace: "Hace 3 semanas" },
];

const PROFESIONALES: Profesional[] = [
  { slug: "elena-marquez", name: "Elena Márquez", initials: "EM", especialidad: "Psicóloga", subtitle: "Terapia cognitivo-conductual · Barcelona", contratacion: "Autónomo", modalidad: "Online", iconBg: "blue", featured: true },
  { slug: "david-ruiz", name: "David Ruiz", initials: "DR", especialidad: "Logopeda", subtitle: "Infantil · Sabadell, Barcelona", contratacion: "Contratado", modalidad: "Presencial", iconBg: "green" },
  { slug: "nuria-prat", name: "Nuria Prat", initials: "NP", especialidad: "Terapeuta ocupacional", subtitle: "Adultos · Barcelona", contratacion: "Autónomo", modalidad: "Híbrido", iconBg: "green" },
];

export function EmpleoContent({ t }: { t: Record<string, string> }) {
  const [view, setView] = useState<"ofertas" | "profesionales">("ofertas");

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-[1120px] px-6">
        <div className="flex items-center justify-between py-7">
          <div>
            <h1 className="font-display text-2xl">{t["title"]}</h1>
            <p className="mt-1 text-[14px] text-muted">{t["subtitle"]}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[12px] text-muted">
            <i className="ti ti-lock" aria-hidden />
            {t["lock"] ?? "Solo terapeutas y empresas"}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
          <div className="flex gap-1 rounded-xl p-[3px]" style={{ background: "var(--brand-tint)" }}>
            {(["ofertas", "profesionales"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setView(v)}
                className={`rounded-lg px-4 py-2 text-[13px] font-medium transition ${
                  view === v ? "bg-brand text-white" : "text-muted hover:text-ink"
                }`}
              >
                {v === "ofertas" ? t["tabOfertas"] : t["tabProfesionales"]}
              </button>
            ))}
          </div>
          <Link
            href="/empleo/publicar"
            className="inline-flex items-center gap-1.5 rounded-control bg-brand px-[18px] py-2 text-[13px] font-medium text-white transition hover:bg-brand-dark"
          >
            <i className="ti ti-plus" aria-hidden />
            {view === "ofertas" ? t["ctaOferta"] : t["ctaDisponibilidad"]}
          </Link>
        </div>

        <div className="grid items-start gap-4 pb-14 lg:grid-cols-[230px_1fr]">
          <aside className="rounded-xl border border-line bg-surface p-4 text-[13px]">
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.04em] text-muted">
              {t["filters"] ?? "Filtros"}
            </p>
            <div className="mb-4">
              <p className="mb-2 font-medium">{t["filterSpecialty"] ?? "Especialidad"}</p>
              <div className="flex flex-col gap-1.5 text-muted">
                {["Psicólogo", "Logopeda", "Fisioterapeuta", "Pedagogo", "Terapeuta ocupacional"].map((e) => (
                  <label key={e} className="flex cursor-pointer items-center gap-1.5">
                    <input type="checkbox" defaultChecked={e === "Psicólogo"} className="accent-brand" /> {e}
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <p className="mb-2 font-medium">{t["filterHiring"] ?? "Contratación"}</p>
              <div className="flex flex-col gap-1.5 text-muted">
                {[t["filterAutonomo"] ?? "Autónomo", t["filterContratado"] ?? "Contratado"].map((c) => (
                  <label key={c} className="flex cursor-pointer items-center gap-1.5">
                    <input type="radio" name="contratacion" defaultChecked={c === (t["filterContratado"] ?? "Contratado")} className="accent-brand" /> {c}
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <p className="mb-2 font-medium">{t["filterMode"] ?? "Modalidad"}</p>
              <div className="flex flex-col gap-1.5 text-muted">
                {[t["filterPresencial"] ?? "Presencial", t["filterOnline"] ?? "Online", t["filterHibrido"] ?? "Híbrido"].map((m) => (
                  <label key={m} className="flex cursor-pointer items-center gap-1.5">
                    <input type="radio" name="modalidad" className="accent-brand" /> {m}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 font-medium">{t["filterCity"] ?? "Ciudad"}</p>
              <input type="text" placeholder="Barcelona"
                className="w-full rounded-lg border border-line px-2 py-1.5 text-[13px] outline-none"
                style={{ color: "var(--ink)" }} />
            </div>
          </aside>

          <div>
            {view === "ofertas" && (
              <div className="flex flex-col gap-3">
                {OFERTAS.map((o, i) => (
                  <article key={i}
                    className={`relative rounded-xl bg-surface p-4 ${
                      o.featured ? "border-2" : "border border-line"
                    }`}
                    style={o.featured ? { borderColor: "var(--accent)" } : undefined}
                  >
                    {o.featured && (
                      <span className="absolute right-3.5 top-3.5 inline-flex items-center gap-1 rounded-full px-2.5 py-[3px] text-[11px] font-semibold"
                        style={{ background: "#F5C518", color: "#ffffff" }}>
                        <i className="ti ti-star-filled text-[10px]" aria-hidden />
                        {t["featured"] ?? "Destacado"}
                      </span>
                    )}
                    <div className="flex gap-3">
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px]`}
                        style={{
                          background: o.iconBg === "blue" ? "var(--brand-tint)" : "var(--accent-tint)",
                          color: o.iconBg === "blue" ? "var(--brand)" : "var(--accent-text)",
                        }}>
                        <i className="ti ti-building text-lg" aria-hidden />
                      </div>
                      <div>
                        <h3 className="text-[15px] font-medium">{o.title}</h3>
                        <p className="mt-0.5 text-[13px] text-muted">
                          <Link href={`/empresa/${o.empresaSlug}`} className="hover:text-brand">{o.empresa}</Link> · {o.ubicacion}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <span className="rounded-full px-2.5 py-1 text-[12px] font-medium"
                        style={{ background: "rgba(94,23,235,0.08)", color: "var(--brand)" }}>{o.especialidad}</span>
                      <span className="rounded-full border border-line px-2.5 py-1 text-[12px] text-muted">{o.contratacion}</span>
                      <span className="rounded-full border border-line px-2.5 py-1 text-[12px] text-muted">{o.modalidad}</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
                      <span className="text-[12px] text-muted"><i className="ti ti-clock" aria-hidden /> {o.hace}</span>
                      <Link href={`/empleo/oferta/${o.id}/postular`}
                        className="inline-flex items-center gap-1.5 rounded-control bg-brand px-[18px] py-2 text-[13px] font-medium text-white transition hover:bg-brand-dark">
                        {t["postular"]}
                      </Link>
                    </div>
                  </article>
                ))}
                <button type="button"
                  className="w-full rounded-xl border border-brand bg-white py-3.5 text-[14px] font-medium text-brand transition hover:bg-brand hover:text-white">
                  {t["loadMore"]}
                </button>
              </div>
            )}

            {view === "profesionales" && (
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl px-[18px] py-3.5"
                  style={{ background: "var(--accent-tint)" }}>
                  <p className="text-[13px]" style={{ color: "#007a75" }}>
                    <i className="ti ti-info-circle" aria-hidden /> {t["bannerText"]}
                  </p>
                  <button type="button"
                    className="rounded-control px-4 py-2 text-[13px] font-medium text-white transition opacity-90 hover:opacity-100"
                    style={{ background: "#007a75" }}>
                    {t["bannerCta"]}
                  </button>
                </div>

                {PROFESIONALES.map((p, i) => (
                  <article key={i}
                    className={`relative rounded-xl bg-surface p-4 ${
                      p.featured ? "border-2" : "border border-line"
                    }`}
                    style={p.featured ? { borderColor: "var(--accent)" } : undefined}
                  >
                    {p.featured && (
                      <span className="absolute right-3.5 top-3.5 inline-flex items-center gap-1 rounded-full px-2.5 py-[3px] text-[11px] font-semibold"
                        style={{ background: "#F5C518", color: "#ffffff" }}>
                        <i className="ti ti-star-filled text-[10px]" aria-hidden />
                        {t["featured"] ?? "Destacado"}
                      </span>
                    )}
                    <div className="flex gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-medium"
                        style={{
                          background: p.iconBg === "blue" ? "var(--brand-tint)" : "var(--accent-tint)",
                          color: p.iconBg === "blue" ? "var(--brand)" : "var(--accent-text)",
                        }}>
                        {p.initials}
                      </div>
                      <div>
                        <h3 className="text-[15px] font-medium">
                          <Link href={`/terapeuta/${p.slug}`} className="hover:text-brand transition">{p.name}</Link>
                        </h3>
                        <p className="mt-0.5 text-[13px] text-muted">{p.especialidad} · {p.subtitle}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <span className="rounded-full px-2.5 py-1 text-[12px] font-medium"
                        style={{ background: "var(--accent-tint)", color: "var(--accent-text)" }}>
                        {t["disponible"] ?? "Disponible"}
                      </span>
                      <span className="rounded-full border border-line px-2.5 py-1 text-[12px] text-muted">{p.contratacion}</span>
                      <span className="rounded-full border border-line px-2.5 py-1 text-[12px] text-muted">{p.modalidad}</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
                      <span className="text-[12px] text-muted"><i className="ti ti-file-cv" aria-hidden /> {t["cvActualizado"] ?? "CV actualizado"}</span>
                      <div className="flex gap-2">
                        <Link href="#"
                          className="inline-flex items-center gap-1.5 rounded-control border border-brand px-[18px] py-2 text-[13px] font-medium text-brand transition hover:bg-brand hover:text-white">
                          {t["verCV"]}
                        </Link>
                        <Link href="#"
                          className="inline-flex items-center gap-1.5 rounded-control bg-brand px-[18px] py-2 text-[13px] font-medium text-white transition hover:bg-brand-dark">
                          {t["contactar"]}
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
                <button type="button"
                  className="w-full rounded-xl border border-brand bg-white py-3.5 text-[14px] font-medium text-brand transition hover:bg-brand hover:text-white">
                  {t["loadMorePros"] ?? t["loadMore"]}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
