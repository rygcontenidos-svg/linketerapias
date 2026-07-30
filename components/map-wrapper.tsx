"use client";

import dynamic from "next/dynamic";

interface MarkerData {
  lat: number;
  lng: number;
  name: string;
  specialty: string;
}

export function MapWrapper({ markers, zoom, center, loadingText }: { markers: MarkerData[]; zoom?: number; center?: [number, number]; loadingText?: string }) {
  const msg = loadingText ?? "Cargando mapa...";
  const Loader = () => (
    <div
      className="flex h-full w-full items-center justify-center"
      style={{ background: "var(--brand-tint)" }}
    >
      <span className="text-sm text-muted">{msg}</span>
    </div>
  );

  const MapViewDynamic = dynamic(
    () => import("./map-view").then((m) => m.MapView),
    { ssr: false, loading: Loader },
  );

  return <MapViewDynamic markers={markers} zoom={zoom} center={center} />;
}
