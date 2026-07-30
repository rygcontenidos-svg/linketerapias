"use client";

import { useState } from "react";

interface Service {
  name: string;
  price: number;
}

const DIAS = ["Lun", "Mar", "Mié", "Jue", "Vie"] as const;
const DIAS_COMPLETOS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"] as const;

interface HoraBloque {
  hora: string;
  estado: "disponible" | "ocupado";
}

const HORARIOS_POR_DIA: Record<number, HoraBloque[]> = {
  0: [
    { hora: "09:00", estado: "disponible" },
    { hora: "09:30", estado: "ocupado" },
    { hora: "10:00", estado: "disponible" },
    { hora: "10:30", estado: "disponible" },
    { hora: "11:00", estado: "ocupado" },
    { hora: "11:30", estado: "disponible" },
    { hora: "12:00", estado: "disponible" },
    { hora: "12:30", estado: "ocupado" },
  ],
  1: [
    { hora: "09:00", estado: "disponible" },
    { hora: "09:30", estado: "disponible" },
    { hora: "10:00", estado: "ocupado" },
    { hora: "10:30", estado: "disponible" },
    { hora: "11:00", estado: "disponible" },
    { hora: "11:30", estado: "disponible" },
    { hora: "12:00", estado: "ocupado" },
    { hora: "12:30", estado: "disponible" },
  ],
  2: [
    { hora: "09:00", estado: "disponible" },
    { hora: "09:30", estado: "disponible" },
    { hora: "10:00", estado: "disponible" },
    { hora: "10:30", estado: "disponible" },
    { hora: "11:00", estado: "ocupado" },
    { hora: "11:30", estado: "disponible" },
    { hora: "12:00", estado: "disponible" },
    { hora: "12:30", estado: "disponible" },
  ],
  3: [
    { hora: "10:00", estado: "disponible" },
    { hora: "10:30", estado: "disponible" },
    { hora: "11:00", estado: "disponible" },
    { hora: "11:30", estado: "ocupado" },
    { hora: "12:00", estado: "disponible" },
    { hora: "12:30", estado: "disponible" },
  ],
  4: [
    { hora: "09:00", estado: "disponible" },
    { hora: "09:30", estado: "disponible" },
    { hora: "10:00", estado: "disponible" },
    { hora: "10:30", estado: "ocupado" },
    { hora: "11:00", estado: "disponible" },
    { hora: "11:30", estado: "disponible" },
    { hora: "12:00", estado: "disponible" },
    { hora: "12:30", estado: "disponible" },
  ],
};

export function BookingCard({
  services,
  t,
}: {
  services: Service[];
  t: Record<string, string>;
}) {
  const [modo, setModo] = useState<"presencial" | "online">("presencial");
  const [servicioIdx, setServicioIdx] = useState(0);
  const [diaIdx, setDiaIdx] = useState(2);
  const [horaSel, setHoraSel] = useState<string | null>("11:30");

  const servicio = services[servicioIdx];
  const horarios = HORARIOS_POR_DIA[diaIdx] ?? [];

  const resumen = `${DIAS_COMPLETOS[diaIdx]} · ${horaSel ?? "--:--"}${modo === "online" ? " · Online" : ""}`;

  return (
    <div className="sticky top-24 rounded-card border border-line bg-surface p-5">
      <h3 className="font-display text-lg text-ink">{t["booking.title"]}</h3>

      <div className="mt-4 flex rounded-control border border-line bg-white p-0.5">
        {(["presencial", "online"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => { setModo(m); setHoraSel(null); }}
            className={`flex-1 rounded-control py-2 text-sm font-medium transition ${
              modo === m
                ? "bg-brand text-white"
                : "text-muted hover:text-ink"
            }`}
          >
            {m === "presencial" ? t["booking.inPerson"] : t["booking.online"]}
          </button>
        ))}
      </div>

      <div className="relative mt-4">
        <label className="text-xs font-medium text-muted">{t["booking.selectService"]}</label>
        <div className="mt-1.5 flex items-center gap-2 rounded-control border border-line px-3 py-2.5">
          <i className="ti ti-notes text-muted shrink-0" aria-hidden />
          <select
            value={servicioIdx}
            onChange={(e) => { setServicioIdx(Number(e.target.value)); setHoraSel(null); }}
            className="w-full appearance-none bg-transparent pr-4 text-sm outline-none"
            style={{ color: "var(--ink)" }}
          >
            {services.map((s, i) => (
              <option key={i} value={i}>
                {s.name} · {s.price} €
              </option>
            ))}
          </select>
          <i className="ti ti-chevron-down pointer-events-none absolute right-4 text-xs text-muted" aria-hidden />
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between">
          <i className="ti ti-chevron-left cursor-pointer text-muted hover:text-ink" aria-hidden />
          <div className="flex flex-1 justify-center gap-2">
            {DIAS.map((dia, i) => {
              const numero = [12, 13, 14, 15, 16][i];
              return (
                <button
                  key={dia}
                  type="button"
                  onClick={() => { setDiaIdx(i); setHoraSel(null); }}
                  className={`flex w-11 flex-col items-center rounded-control py-1.5 text-xs transition ${
                    diaIdx === i
                      ? "bg-brand text-white"
                      : "text-muted hover:bg-brand-tint"
                  }`}
                >
                  <span>{dia}</span>
                  <span className="font-medium">{numero}</span>
                </button>
              );
            })}
          </div>
          <i className="ti ti-chevron-right cursor-pointer text-muted hover:text-ink" aria-hidden />
        </div>
      </div>

      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          {horarios.map(({ hora, estado }) => {
            const sel = horaSel === hora;
            return (
              <button
                key={hora}
                type="button"
                disabled={estado === "ocupado"}
                onClick={() => setHoraSel(hora)}
                className={`rounded-control px-3 py-1.5 text-xs font-medium transition ${
                  estado === "ocupado"
                    ? "cursor-not-allowed text-muted line-through opacity-50"
                    : sel
                      ? "bg-[#00b6b0] text-[#007a75]"
                      : "text-accent-text"
                }`}
                style={
                  !sel && estado !== "ocupado"
                    ? { background: "var(--accent-tint)" }
                    : undefined
                }
              >
                {hora}
              </button>
            );
          })}
        </div>
      </div>

      {horaSel && (
        <div className="mt-5 flex items-center gap-2 border-t border-line pt-4 text-[13px] text-ink">
          <i className="ti ti-circle-check shrink-0" style={{ color: "var(--accent)" }} aria-hidden />
          <span>{resumen}</span>
        </div>
      )}

      <button
        type="button"
        className="mt-5 w-full rounded-control bg-brand py-3 text-sm font-medium text-white transition hover:bg-brand-dark"
      >
        {t["booking.cta"]}
      </button>

      <p className="mt-3 text-center text-[11px] text-muted">{t["booking.summary"]}</p>
    </div>
  );
}
