import { useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { LayoutGrid, MapIcon, Crosshair, Bike } from "lucide-react";
import { initialZones, KANHANGAD_CENTER } from "@/data/zones";
import { haversineKm } from "@/lib/geo";
import { useGeolocation } from "@/hooks/useGeolocation";
import { ZoneMarker } from "@/components/map/ZoneMarker";
import { DistanceBadge } from "@/components/map/DistanceBadge";
import { userIcon } from "@/components/map/markerIcons";
import { toast } from "sonner";

const RADIUS_OPTIONS = [10, 20, 50, 80] as const;

export default function MapView() {
  const [view, setView] = useState<"map" | "list">("map");
  const [radius, setRadius] = useState<(typeof RADIUS_OPTIONS)[number]>(80);
  const { position, error, loading } = useGeolocation();

  const origin = position ?? { lat: KANHANGAD_CENTER[0], lng: KANHANGAD_CENTER[1] };

  const zonesWithDistance = useMemo(() => {
    return initialZones
      .map(z => ({ ...z, distance: haversineKm(origin, { lat: z.lat, lng: z.lng }) }))
      .sort((a, b) => a.distance - b.distance);
  }, [origin]);

  const visible = zonesWithDistance.filter(z => z.distance <= radius);
  const nearestId = visible[0]?.id;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 pb-24 md:pb-12">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Network</p>
          <h1 className="mt-2 font-display text-4xl">Parking Zones</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {visible.length} of {zonesWithDistance.length} zones within {radius} km · Kanhangad, Kasaragod
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="glass flex p-1">
            <button
              onClick={() => setView("map")}
              className={`flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors ${view === "map" ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"}`}
            ><MapIcon className="h-3 w-3" /> Map</button>
            <button
              onClick={() => setView("list")}
              className={`flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors ${view === "list" ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"}`}
            ><LayoutGrid className="h-3 w-3" /> List</button>
          </div>
        </div>
      </div>

      {/* Filter chips */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Radius</span>
        {RADIUS_OPTIONS.map(r => (
          <button
            key={r}
            onClick={() => setRadius(r)}
            className={`border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors ${
              radius === r ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {r} km
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          <Crosshair className="h-3 w-3" />
          {loading ? "Locating…" : position ? "Live location" : error ? "Using Kanhangad center" : "—"}
        </div>
      </div>

      {view === "map" ? (
        <div className="glass scan-line relative mt-6 overflow-hidden">
          <MapContainer
            center={KANHANGAD_CENTER}
            zoom={11}
            scrollWheelZoom
            className="avx-map h-[640px] w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {position && (
              <>
                <Marker position={[position.lat, position.lng]} icon={userIcon}>
                  <Popup>
                    <div className="p-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">You are here</p>
                      <p className="mt-1 font-display text-sm">Live position</p>
                    </div>
                  </Popup>
                </Marker>
                <Circle
                  center={[position.lat, position.lng]}
                  radius={radius * 1000}
                  pathOptions={{ color: "hsl(180 95% 55%)", weight: 1, opacity: 0.4, fillOpacity: 0.04 }}
                />
              </>
            )}

            <MarkerClusterGroup chunkedLoading maxClusterRadius={45}>
              {visible.map(z => (
                <ZoneMarker key={z.id} zone={z} distanceKm={z.distance} isNearest={z.id === nearestId} />
              ))}
            </MarkerClusterGroup>
          </MapContainer>
        </div>
      ) : (
        <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {visible.map(z => (
            <div key={z.id} className={`glass glass-hover p-5 ${z.id === nearestId ? "border-primary/60" : ""}`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                    {z.id === nearestId ? "Nearest" : "Zone"}
                  </p>
                  <p className="mt-1 font-display text-lg">{z.name}</p>
                  <p className="mt-1 font-mono text-[10px] text-muted-foreground">
                    {z.lat.toFixed(4)}°N, {z.lng.toFixed(4)}°E
                  </p>
                </div>
                <DistanceBadge km={z.distance} highlight={z.id === nearestId} />
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                <div className="flex items-center gap-2">
                  <Bike className="h-3.5 w-3.5 text-primary" strokeWidth={1.5} />
                  <span className="font-mono text-sm">{z.cycles}</span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">cycles</span>
                </div>
                <button
                  onClick={() => z.cycles > 0 ? toast.success(`Reserved at ${z.name}`) : toast.error("None available")}
                  className="border border-primary/60 bg-primary/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-primary hover:bg-primary/20"
                >
                  Reserve
                </button>
              </div>
            </div>
          ))}
          {visible.length === 0 && (
            <p className="col-span-full py-10 text-center font-mono text-xs text-muted-foreground">
              No zones within {radius} km. Increase your radius.
            </p>
          )}
        </div>
      )}
    </div>
  );
}