"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const icon = L.divIcon({
  className: "custom-marker",
  html: `<div style="background:var(--brand);width:14px;height:14px;border-radius:50%;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.3)"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

interface MarkerData {
  lat: number;
  lng: number;
  name: string;
  specialty: string;
}

export function MapView({ markers, zoom = 13, center }: { markers: MarkerData[]; zoom?: number; center?: [number, number] }) {
  if (typeof window === "undefined") return null;

  const mapCenter = center ?? (markers.length > 0 ? [markers[0].lat, markers[0].lng] : [41.3874, 2.1686]) as [number, number];

  return (
    <MapContainer
      center={mapCenter}
      zoom={zoom}
      className="h-full w-full"
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((m, i) => (
        <Marker key={i} position={[m.lat, m.lng]} icon={icon}>
          <Popup>
            <strong>{m.name}</strong>
            <br />
            {m.specialty}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
