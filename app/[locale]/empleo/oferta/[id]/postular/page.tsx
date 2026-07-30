"use client";

import { useState } from "react";

export default function PostularPage() {
  const [enviado, setEnviado] = useState(false);

  if (enviado) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-white">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
            style={{ background: "var(--accent-tint)", color: "var(--accent-text)" }}>
            <i className="ti ti-check text-3xl" aria-hidden />
          </div>
          <h2 className="mt-4 font-display text-xl">Postulación enviada</h2>
          <p className="mt-2 text-[14px] text-muted">Tu candidatura se ha enviado correctamente. La empresa revisará tu perfil y se pondrá en contacto.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-[720px] px-6 py-10">
        <h1 className="font-display text-2xl">Postular a la oferta</h1>
        <p className="mt-1 text-[14px] text-muted">Tu perfil y CV se enviarán a la empresa para que evalúe tu candidatura.</p>

        <div className="mt-6 rounded-card border border-line bg-surface p-5">
          <div className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px]"
              style={{ background: "var(--brand-tint)", color: "var(--brand)" }}>
              <i className="ti ti-building text-lg" aria-hidden />
            </div>
            <div>
              <p className="text-[15px] font-medium">Psicólogo/a clínico — jornada completa</p>
              <p className="mt-0.5 text-[13px] text-muted">Centro Aurora · Eixample, Barcelona</p>
            </div>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); setEnviado(true); }}>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-ink">Nombre completo</label>
              <input type="text" placeholder="Tu nombre"
                className="w-full rounded-control border border-line px-4 py-2.5 text-[14px] outline-none focus:border-brand"
                style={{ color: "var(--ink)" }} required />
            </div>
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-ink">Email</label>
              <input type="email" placeholder="tu@email.com"
                className="w-full rounded-control border border-line px-4 py-2.5 text-[14px] outline-none focus:border-brand"
                style={{ color: "var(--ink)" }} required />
            </div>
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-ink">Teléfono</label>
              <input type="tel" placeholder="+34 600 000 000"
                className="w-full rounded-control border border-line px-4 py-2.5 text-[14px] outline-none focus:border-brand"
                style={{ color: "var(--ink)" }} required />
            </div>
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-ink">Especialidad</label>
              <select className="w-full rounded-control border border-line px-4 py-2.5 text-[14px] outline-none focus:border-brand"
                style={{ color: "var(--ink)" }} required>
                <option value="">Seleccionar</option>
                <option>Psicólogo/a</option>
                <option>Logopeda</option>
                <option>Fisioterapeuta</option>
                <option>Pedagogo/a</option>
                <option>Terapeuta ocupacional</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-ink">CV</label>
            <div className="flex items-center gap-3 rounded-control border border-line px-4 py-3 text-[13px] text-muted">
              <i className="ti ti-upload text-lg" aria-hidden />
              <span>Subir CV (PDF, máx. 5 MB)</span>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-ink">Carta de presentación</label>
            <textarea rows={5} placeholder="Contanos por qué te interesa este puesto, tu experiencia relevante y qué podés aportar..."
              className="w-full rounded-control border border-line px-4 py-2.5 text-[14px] outline-none focus:border-brand"
              style={{ color: "var(--ink)", resize: "vertical" }} required />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit"
              className="rounded-control bg-brand px-8 py-3 text-[14px] font-medium text-white transition hover:bg-brand-dark">
              Enviar postulación
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
