"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { SearchBar } from "@/components/search-bar";
import { TherapistCard } from "@/components/therapist-card";
import type { TherapistCardData } from "@/lib/types";

const MapWrapper = dynamic(() => import("@/components/map-wrapper").then((m) => m.MapWrapper), {
  ssr: false,
  loading: () => <div className="flex h-full items-center justify-center text-sm text-muted">Cargando mapa...</div>,
});

const ALL_TERAPEUTAS: TherapistCardData[] = [
  { slug: "laura-martin", name: "Laura Martín", specialty: "Psicóloga", subtitle: "Terapia cognitivo-conductual", city: "Eixample, Barcelona", rating: 4.9, reviews: 128, featured: true },
  { slug: "jordi-roca", name: "Jordi Roca", specialty: "Logopeda", subtitle: "Infantil y adultos", city: "Gràcia, Barcelona", rating: 4.8, reviews: 74, featured: false },
  { slug: "marta-serra", name: "Marta Serra", specialty: "Fisioterapeuta", subtitle: "Neurológica", city: "Sant Martí, Barcelona", rating: 4.6, reviews: 41, featured: false },
  { slug: "carlos-ruiz", name: "Carlos Ruiz", specialty: "Psicólogo", subtitle: "Terapia de pareja", city: "Les Corts, Barcelona", rating: 4.7, reviews: 93, featured: false },
  { slug: "ana-vidal", name: "Ana Vidal", specialty: "Pedagoga", subtitle: "Dificultades de aprendizaje", city: "Sabadell, Barcelona", rating: 4.9, reviews: 56, featured: true },
  { slug: "pablo-moreno", name: "Pablo Moreno", specialty: "Fisioterapeuta", subtitle: "Deportiva y readaptación", city: "Chamberí, Madrid", rating: 4.5, reviews: 38, featured: false },
  { slug: "elena-gil", name: "Elena Gil", specialty: "Logopeda", subtitle: "Trastornos del lenguaje", city: "L'Hospitalet, Barcelona", rating: 4.8, reviews: 112, featured: false },
  { slug: "marina-costa", name: "Marina Costa", specialty: "Terapeuta ocupacional", subtitle: "Integración sensorial", city: "Ciutat Vella, Barcelona", rating: 4.6, reviews: 27, featured: false },
  { slug: "david-lopez", name: "David López", specialty: "Psicólogo", subtitle: "Neuropsicología clínica", city: "Centro, Madrid", rating: 4.9, reviews: 201, featured: true },
  { slug: "sara-ibanez", name: "Sara Ibáñez", specialty: "Fisioterapeuta", subtitle: "Suelo pélvico", city: "Sants-Montjuïc, Barcelona", rating: 4.7, reviews: 63, featured: false },
  { slug: "alba-camps", name: "Alba Camps", specialty: "Pedagoga", subtitle: "Altas capacidades", city: "Eixample, Valencia", rating: 4.4, reviews: 19, featured: false },
  { slug: "roger-font", name: "Roger Font", specialty: "Logopeda", subtitle: "Deglución y voz", city: "Gràcia, Barcelona", rating: 4.8, reviews: 85, featured: false },
];

const MAP_MARKERS = [
  { lat: 41.3895, lng: 2.1620, name: "Laura Martín", specialty: "Psicóloga" },
  { lat: 41.4026, lng: 2.1538, name: "Jordi Roca", specialty: "Logopeda" },
  { lat: 41.4154, lng: 2.1990, name: "Marta Serra", specialty: "Fisioterapeuta" },
  { lat: 41.3810, lng: 2.1330, name: "Carlos Ruiz", specialty: "Psicólogo" },
  { lat: 41.5463, lng: 2.1086, name: "Ana Vidal", specialty: "Pedagoga" },
  { lat: 40.4360, lng: -3.6980, name: "Pablo Moreno", specialty: "Fisioterapeuta" },
  { lat: 41.3596, lng: 2.0998, name: "Elena Gil", specialty: "Logopeda" },
  { lat: 41.3818, lng: 2.1777, name: "Marina Costa", specialty: "Terapeuta ocupacional" },
  { lat: 40.4168, lng: -3.7038, name: "David López", specialty: "Psicólogo" },
  { lat: 41.3708, lng: 2.1689, name: "Sara Ibáñez", specialty: "Fisioterapeuta" },
  { lat: 39.4699, lng: -0.3763, name: "Alba Camps", specialty: "Pedagoga" },
  { lat: 41.4030, lng: 2.1500, name: "Roger Font", specialty: "Logopeda" },
];

const ESPECIALIDADES_FILTRO = ["Psicólogo/a", "Logopeda", "Fisioterapeuta", "Pedagogo/a", "Terapeuta ocupacional"];

export function BuscarContent({
  t,
  f,
}: {
  t: Record<string, string>;
  f: Record<string, string>;
}) {
  const [visible, setVisible] = useState(6);
  const [filtroEspecialidad, setFiltroEspecialidad] = useState<string[]>([]);
  const [filtroRating, setFiltroRating] = useState(0);
  const [filtroPrecio, setFiltroPrecio] = useState(200);
  const [filtroPresencial, setFiltroPresencial] = useState<boolean | null>(null);

  let filtrados = ALL_TERAPEUTAS;
  if (filtroEspecialidad.length > 0) {
    filtrados = filtrados.filter((t) =>
      filtroEspecialidad.some((fe) => t.specialty.toLowerCase().includes(fe.toLowerCase().replace("ó/a", "ó").replace("ó/a", "a")))
    );
  }
  if (filtroRating > 0) {
    filtrados = filtrados.filter((t) => t.rating >= filtroRating);
  }
  if (filtroPresencial !== null) {
    // mock: featured = presencial, non-featured = online para demo
  }

  const visibles = filtrados.slice(0, visible);
  const hayMas = visible < filtrados.length;

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-6">
      <h1 className="mb-1 text-2xl">{t["title"]}</h1>
      <p className="mb-4 text-sm text-muted">{t["subtitle"]}</p>

      <SearchBar />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr_360px] items-start">
        <aside className="hidden rounded-card border border-line bg-surface p-4 lg:block">
          <h3 className="mb-4 text-[13px] font-semibold uppercase tracking-wider text-ink">{t["filterTitle"]}</h3>

          <div className="mb-5">
            <span className="text-[13px] font-medium text-ink">{t["filterSpecialty"]}</span>
            <div className="mt-2 space-y-1.5">
              {ESPECIALIDADES_FILTRO.map((esp) => (
                <label key={esp} className="flex cursor-pointer items-center gap-2 text-[13px] text-muted">
                  <input
                    type="checkbox"
                    checked={filtroEspecialidad.includes(esp)}
                    onChange={(e) => {
                      if (e.target.checked) setFiltroEspecialidad([...filtroEspecialidad, esp]);
                      else setFiltroEspecialidad(filtroEspecialidad.filter((f) => f !== esp));
                    }}
                    className="accent-brand"
                  />
                  {esp}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <span className="text-[13px] font-medium text-ink">{t["filterRating"]}</span>
            <div className="mt-2 space-y-1.5">
              {[4.5, 4.0, 3.5].map((v) => (
                <label key={v} className="flex cursor-pointer items-center gap-2 text-[13px] text-muted">
                  <input
                    type="radio"
                    name="rating"
                    checked={filtroRating === v}
                    onChange={() => setFiltroRating(filtroRating === v ? 0 : v)}
                    className="accent-brand"
                  />
                  {v}+ {t["stars"]}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <span className="text-[13px] font-medium text-ink">{t["filterPrice"]}</span>
            <input
              type="range"
              min={40}
              max={200}
              step={10}
              value={filtroPrecio}
              onChange={(e) => setFiltroPrecio(Number(e.target.value))}
              className="mt-2 w-full accent-brand"
            />
            <span className="text-[12px] text-muted">{t["filterUpTo"]} {filtroPrecio} €</span>
          </div>

          <div>
            <span className="text-[13px] font-medium text-ink">{t["filterMode"]}</span>
            <div className="mt-2 space-y-1.5">
              {[
                { key: true, label: t["filterInPerson"] },
                { key: false, label: t["filterOnline"] },
              ].map(({ key, label }) => (
                <label key={label} className="flex cursor-pointer items-center gap-2 text-[13px] text-muted">
                  <input
                    type="radio"
                    name="modo"
                    checked={filtroPresencial === key}
                    onChange={() => setFiltroPresencial(filtroPresencial === key ? null : key)}
                    className="accent-brand"
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>
        </aside>

        <section className="flex flex-col gap-3" aria-label={t["resultsTitle"]}>
          {visibles.map((th) => (
            <TherapistCard key={th.slug} t={th} />
          ))}
          {hayMas && (
            <button
              type="button"
              onClick={() => setVisible(visible + 6)}
              className="rounded-control border border-brand py-3 text-[14px] font-medium text-brand transition hover:bg-brand hover:text-white"
            >
              {t["loadMore"]}
            </button>
          )}
          {visibles.length === 0 && (
            <p className="py-10 text-center text-sm text-muted">{t["noResults"]}</p>
          )}
        </section>

        <aside className="hidden lg:block" style={{ position: "sticky", top: "76px" }}>
          <div className="rounded-card border border-line overflow-hidden" style={{ height: "calc(100vh - 110px)", minHeight: 500 }}>
            <MapWrapper markers={MAP_MARKERS} loadingText={t["loadingMap"]} />
          </div>
        </aside>
      </div>
    </div>
  );
}
