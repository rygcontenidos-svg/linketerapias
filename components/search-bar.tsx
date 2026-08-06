"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { NavDropdown } from "@/components/nav-dropdown";

const ESPECIALIDADES_ITEMS = [
  { icon: "ti-layout-grid", label: "Todas", value: "" },
  { icon: "ti-brain", label: "Psicólogo", value: "Psicólogo" },
  { icon: "ti-messages", label: "Logopeda", value: "Logopeda" },
  { icon: "ti-activity", label: "Fisioterapeuta", value: "Fisioterapeuta" },
  { icon: "ti-school", label: "Pedagogo", value: "Pedagogo" },
  { icon: "ti-puzzle", label: "Terapeuta ocupacional", value: "Terapeuta ocupacional" },
];

const LOCALIDADES = [
  "Álava", "Albacete", "Alicante", "Almería", "Asturias", "Ávila",
  "Badajoz", "Baleares", "Barcelona", "Bizkaia", "Burgos", "Cáceres",
  "Cádiz", "Cantabria", "Castellón", "Ceuta", "Ciudad Real", "Córdoba",
  "Cuenca", "Gipuzkoa", "Girona", "Granada", "Guadalajara", "Huelva",
  "Huesca", "Jaén", "La Rioja", "Las Palmas", "León", "Lleida",
  "Lugo", "Madrid", "Málaga", "Melilla", "Murcia", "Navarra",
  "Ourense", "Palencia", "Pontevedra", "Salamanca", "Santa Cruz de Tenerife",
  "Segovia", "Sevilla", "Soria", "Tarragona", "Teruel", "Toledo",
  "Valencia", "Valladolid", "Zamora", "Zaragoza",
  "Andalucía", "Aragón", "Canarias",
  "Castilla y León", "Castilla-La Mancha", "Catalunya",
  "Comunitat Valenciana", "Euskadi", "Extremadura",
  "A Coruña", "Alcalá de Henares", "Alcobendas", "Alcorcón",
  "Algeciras", "Badalona", "Barakaldo", "Bilbao", "Cartagena",
  "Coslada", "Donostia-San Sebastián", "Dos Hermanas", "Elche",
  "Fuenlabrada", "Getafe", "Gijón", "Jerez de la Frontera",
  "L'Hospitalet", "Leganés", "Logroño", "Marbella", "Mataró",
  "Móstoles", "Oviedo", "Palma", "Pamplona", "Parla",
  "Reus", "Sabadell", "San Cristóbal de La Laguna",
  "Santa Coloma de Gramenet", "Santander", "Santiago de Compostela",
  "Terrassa", "Torrejón de Ardoz", "Vigo", "Vitoria-Gasteiz",
  "Barcelona · Ciutat Vella", "Barcelona · Eixample",
  "Barcelona · Gràcia", "Barcelona · Horta-Guinardó",
  "Barcelona · Les Corts", "Barcelona · Nou Barris",
  "Barcelona · Sant Andreu", "Barcelona · Sant Martí",
  "Barcelona · Sants-Montjuïc", "Barcelona · Sarrià-Sant Gervasi",
  "Madrid · Arganzuela", "Madrid · Barajas", "Madrid · Carabanchel",
  "Madrid · Centro", "Madrid · Chamartín", "Madrid · Chamberí",
  "Madrid · Ciudad Lineal", "Madrid · Fuencarral-El Pardo",
  "Madrid · Hortaleza", "Madrid · Latina", "Madrid · Moncloa-Aravaca",
  "Madrid · Moratalaz", "Madrid · Puente de Vallecas",
  "Madrid · Retiro", "Madrid · Salamanca", "Madrid · San Blas-Canillejas",
  "Madrid · Tetuán", "Madrid · Usera", "Madrid · Vicálvaro",
  "Madrid · Villa de Vallecas", "Madrid · Villaverde",
  "Valencia · Ciutat Vella", "Valencia · Eixample",
  "Valencia · Extramurs", "Valencia · Campanar",
  "Valencia · Patraix", "Valencia · Ruzafa",
  "Sevilla · Casco Antiguo", "Sevilla · Nervión",
  "Sevilla · Triana", "Sevilla · Los Remedios",
  "Sevilla · Macarena",
  "Bilbao · Abando", "Bilbao · Deusto", "Bilbao · Uribarri",
  "Donostia · Centro", "Donostia · Gros", "Donostia · Antiguo",
  "Málaga · Centro", "Málaga · Teatinos", "Málaga · El Palo",
  "Palma · Centre", "Palma · Santa Catalina", "Palma · El Terreno",
  "A Coruña · Ciudad Vieja", "A Coruña · Ensanche",
  "Vigo · Casco Vello", "Vigo · Bouzas", "Vigo · Navia",
  "Zaragoza · Casco Histórico", "Zaragoza · El Tubo",
  "Zaragoza · Universidad", "Zaragoza · Actur",
];

function CityAutocomplete({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = value
    ? LOCALIDADES.filter((c) =>
        c.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 6)
    : [];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative flex-1">
      <label className="flex items-center gap-2 px-3">
        <i className="ti ti-map-pin text-muted shrink-0" aria-hidden />
        <input
          value={value}
          onChange={(e) => { onChange(e.target.value); setOpen(true); }}
          onFocus={() => { if (filtered.length > 0) setOpen(true); }}
          placeholder="Ciudad"
          className="w-full bg-transparent py-2.5 text-sm outline-none"
          style={{ color: "var(--ink)" }}
          aria-label="Ciudad"
        />
      </label>
      {open && filtered.length > 0 && (
        <ul className="absolute left-0 top-full z-20 mt-1 w-full rounded-control border border-line bg-surface py-1 shadow-lg">
          {filtered.map((c) => (
            <li key={c}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => { onChange(c); setOpen(false); }}
                className="w-full px-3 py-2.5 text-left text-sm text-ink transition hover:bg-brand-tint"
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function SearchBar({
  defaultSpecialty = "",
  defaultCity = "",
  variant = "default",
}: {
  defaultSpecialty?: string;
  defaultCity?: string;
  /** "hero" matches the Figma main-header pill: white, fully rounded, teal button, no icon. */
  variant?: "default" | "hero";
}) {
  const router = useRouter();
  const [specialty, setSpecialty] = useState(defaultSpecialty);
  const [city, setCity] = useState(defaultCity);
  const isHero = variant === "hero";

  function submit() {
    const params = new URLSearchParams();
    if (specialty) params.set("especialidad", specialty);
    if (city) params.set("ciudad", city);
    router.push(`/buscar?${params.toString()}`);
  }

  return (
    <div
      className={
        isHero
          ? "flex flex-col gap-2 rounded-full bg-white p-2 drop-shadow-[0px_12px_16px_rgba(36,26,53,0.09)] sm:flex-row sm:items-stretch"
          : "flex flex-col gap-2 rounded-card border border-line bg-surface p-2.5 sm:flex-row"
      }
    >
      <div className="flex flex-1 items-stretch sm:border-r sm:border-line">
        <NavDropdown
          mode="select"
          label="Especialidad, ej. ansiedad"
          value={specialty}
          onChange={setSpecialty}
          items={ESPECIALIDADES_ITEMS}
        />
      </div>

      <CityAutocomplete value={city} onChange={setCity} />

      <button
        onClick={submit}
        className={
          isHero
            ? "flex shrink-0 items-center justify-center rounded-full bg-accent px-6 py-3 text-[14.5px] font-bold text-white transition hover:opacity-90"
            : "flex items-center justify-center gap-2 rounded-control bg-brand px-6 py-3 text-sm font-medium text-white transition hover:bg-brand-dark"
        }
      >
        {!isHero && <i className="ti ti-search" aria-hidden />}
        Buscar
      </button>
    </div>
  );
}
