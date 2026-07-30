"use client";

import { useState } from "react";

const especialidades = ["Psicólogo", "Logopeda", "Fisioterapeuta", "Pedagogo", "Terapeuta ocupacional"];

export default function PublicarOfertaPage() {
  const [enviado, setEnviado] = useState(false);

  if (enviado) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-white">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
            style={{ background: "var(--accent-tint)", color: "var(--accent-text)" }}>
            <i className="ti ti-check text-3xl" aria-hidden />
          </div>
          <h2 className="mt-4 font-display text-xl">Oferta publicada</h2>
          <p className="mt-2 text-[14px] text-muted">Tu oferta se ha publicado correctamente. Aparecerá en la bolsa de empleo en unos instantes.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-[720px] px-6 py-10">
        <h1 className="font-display text-2xl">Publicar oferta de empleo</h1>
        <p className="mt-1 text-[14px] text-muted">Completá los datos de la oferta. Solo visible para terapeutas registrados.</p>

        <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); setEnviado(true); }}>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-[13px] font-medium text-ink">Título del puesto</label>
              <input type="text" placeholder="Ej: Psicólogo/a clínico — jornada completa"
                className="w-full rounded-control border border-line px-4 py-2.5 text-[14px] outline-none focus:border-brand"
                style={{ color: "var(--ink)" }} required />
            </div>
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-ink">Especialidad</label>
              <select className="w-full rounded-control border border-line px-4 py-2.5 text-[14px] outline-none focus:border-brand"
                style={{ color: "var(--ink)" }} required>
                <option value="">Seleccionar</option>
                {especialidades.map((e) => <option key={e}>{e}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-ink">Tipo de contratación</label>
              <select className="w-full rounded-control border border-line px-4 py-2.5 text-[14px] outline-none focus:border-brand"
                style={{ color: "var(--ink)" }} required>
                <option value="">Seleccionar</option>
                <option>Contratado</option>
                <option>Autónomo</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-ink">Modalidad</label>
              <select className="w-full rounded-control border border-line px-4 py-2.5 text-[14px] outline-none focus:border-brand"
                style={{ color: "var(--ink)" }} required>
                <option value="">Seleccionar</option>
                <option>Presencial</option>
                <option>Online</option>
                <option>Híbrido</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-ink">Jornada</label>
              <select className="w-full rounded-control border border-line px-4 py-2.5 text-[14px] outline-none focus:border-brand"
                style={{ color: "var(--ink)" }} required>
                <option value="">Seleccionar</option>
                <option>Completa</option>
                <option>Media</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-ink">Ciudad</label>
              <input type="text" placeholder="Ej: Barcelona"
                className="w-full rounded-control border border-line px-4 py-2.5 text-[14px] outline-none focus:border-brand"
                style={{ color: "var(--ink)" }} required />
            </div>
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-ink">Salario</label>
              <input type="text" placeholder="Ej: 1.800 – 2.200 €/mes"
                className="w-full rounded-control border border-line px-4 py-2.5 text-[14px] outline-none focus:border-brand"
                style={{ color: "var(--ink)" }} />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-ink">Descripción del puesto</label>
            <textarea rows={5} placeholder="Describí las funciones, el perfil buscado y el día a día del puesto..."
              className="w-full rounded-control border border-line px-4 py-2.5 text-[14px] outline-none focus:border-brand"
              style={{ color: "var(--ink)", resize: "vertical" }} required />
          </div>

          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-ink">Requisitos</label>
            <textarea rows={3} placeholder="Formación, experiencia, idiomas, colegiación..."
              className="w-full rounded-control border border-line px-4 py-2.5 text-[14px] outline-none focus:border-brand"
              style={{ color: "var(--ink)", resize: "vertical" }} />
          </div>

          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-ink">Qué ofrecemos</label>
            <textarea rows={3} placeholder="Beneficios, condiciones, ambiente de trabajo..."
              className="w-full rounded-control border border-line px-4 py-2.5 text-[14px] outline-none focus:border-brand"
              style={{ color: "var(--ink)", resize: "vertical" }} />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit"
              className="rounded-control bg-brand px-8 py-3 text-[14px] font-medium text-white transition hover:bg-brand-dark">
              Publicar oferta
            </button>
            <button type="button"
              className="rounded-control border border-line px-8 py-3 text-[14px] font-medium text-muted transition hover:text-ink">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
