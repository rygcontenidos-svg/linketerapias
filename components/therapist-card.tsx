import Link from "next/link";
import type { TherapistCardData } from "@/lib/types";

/* Estrellas de valoración (fuente: Google Places API). Verde de marca. */
export function RatingStars({ rating, reviews }: { rating: number; reviews: number }) {
  const full = Math.round(rating);
  return (
    <div className="flex items-center gap-1.5 text-[13px]">
      <span className="tracking-wide" style={{ color: "var(--accent-text)" }} aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <i key={i} className={i < full ? "ti ti-star-filled" : "ti ti-star"} />
        ))}
      </span>
      <span className="text-muted">
        {rating.toLocaleString("es-ES", { minimumFractionDigits: 1 })} · {reviews} opiniones
      </span>
    </div>
  );
}

/* Badge de Destacado — se activa/expira por fecha, sin intervención manual. */
export function FeaturedBadge() {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium"
      style={{ background: "#F5C518", color: "#ffffff" }}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="shrink-0">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
      Destacado
    </span>
  );
}

function Avatar({ name, tone }: { name: string; tone: "brand" | "accent" }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");
  const bg = tone === "brand" ? "var(--brand-tint)" : "var(--accent-tint)";
  const fg = tone === "brand" ? "var(--brand)" : "var(--accent-text)";
  return (
    <div
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-medium"
      style={{ background: bg, color: fg }}
      aria-hidden
    >
      {initials}
    </div>
  );
}

export function TherapistCard({ t }: { t: TherapistCardData }) {
  return (
    <article
      className={`relative rounded-card bg-surface p-4 ${
        t.featured ? "border-2 border-accent" : "border border-line"
      }`}
    >
      {t.featured && (
        <div className="absolute right-3.5 top-3.5">
          <FeaturedBadge />
        </div>
      )}

      <div className="flex gap-3.5">
        <Avatar name={t.name} tone={t.featured ? "brand" : "accent"} />
        <div>
          <h3 className="text-base font-medium">
            <Link href={`/terapeuta/${t.slug}`} className="hover:text-brand transition">
              {t.name}
            </Link>
          </h3>
          <p className="mb-1.5 mt-0.5 text-[13px] text-muted">
            {t.specialty}
            {t.subtitle ? ` · ${t.subtitle}` : ""}
          </p>
          <RatingStars rating={t.rating} reviews={t.reviews} />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
        <span className="text-[13px] text-muted">
          <i className="ti ti-map-pin" aria-hidden /> {t.city}
        </span>
        <Link
          href={`/terapeuta/${t.slug}`}
          className="rounded-control bg-brand px-4 py-2 text-[13px] font-medium text-white transition hover:bg-brand-dark"
        >
          Agendar cita
        </Link>
      </div>
    </article>
  );
}
