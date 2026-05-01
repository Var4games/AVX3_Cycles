import { useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Plus, Pencil, Trash2, Bike } from "lucide-react";
import { initialZones, KANHANGAD_CENTER, type Zone } from "@/data/zones";
import { zoneIcon } from "@/components/map/markerIcons";
import { AddZoneModal } from "@/components/map/AddZoneModal";
import { toast } from "sonner";

function ClickCatcher({ onClick }: { onClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) { onClick(e.latlng.lat, e.latlng.lng); },
  });
  return null;
}

export default function AdminMap() {
  const [zones, setZones] = useState<Zone[]>(initialZones);
  const [addCoords, setAddCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [editing, setEditing] = useState<Zone | null>(null);
  const [addMode, setAddMode] = useState(false);

  const totalCycles = useMemo(() => zones.reduce((s, z) => s + z.cycles, 0), [zones]);

  const handleMapClick = (lat: number, lng: number) => {
    if (!addMode) return;
    setAddCoords({ lat, lng });
  };

  const saveNew = ({ name, cycles }: { name: string; cycles: number }) => {
    if (!addCoords) return;
    const id = (zones.at(-1)?.id ?? 0) + 1;
    setZones(z => [...z, { id, name, cycles, lat: addCoords.lat, lng: addCoords.lng }]);
    setAddCoords(null);
    setAddMode(false);
    toast.success(`Zone "${name}" added`);
  };

  const saveEdit = ({ name, cycles }: { name: string; cycles: number }) => {
    if (!editing) return;
    setZones(zs => zs.map(z => z.id === editing.id ? { ...z, name, cycles } : z));
    setEditing(null);
    toast.success("Zone updated");
  };

  const deleteZone = () => {
    if (!editing) return;
    setZones(zs => zs.filter(z => z.id !== editing.id));
    toast.success(`Removed "${editing.name}"`);
    setEditing(null);
  };

  return (
    <div>
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Geo · Admin</p>
          <h1 className="mt-2 font-display text-4xl">Zones Dashboard</h1>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
            {zones.length} zones · {totalCycles} cycles · Kanhangad region
          </p>
        </div>
        <button
          onClick={() => { setAddMode(m => !m); }}
          className={`inline-flex items-center gap-2 border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors ${
            addMode ? "border-primary bg-primary/15 text-primary" : "border-border hover:border-primary/40"
          }`}
        >
          <Plus className="h-3 w-3" /> {addMode ? "Click map to place…" : "Add Zone"}
        </button>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="glass scan-line relative overflow-hidden">
          <MapContainer
            center={KANHANGAD_CENTER}
            zoom={11}
            scrollWheelZoom
            className={`avx-map h-[640px] w-full ${addMode ? "cursor-crosshair" : ""}`}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ClickCatcher onClick={handleMapClick} />
            <MarkerClusterGroup chunkedLoading maxClusterRadius={45}>
              {zones.map(z => (
                <Marker
                  key={z.id}
                  position={[z.lat, z.lng]}
                  icon={zoneIcon(z.cycles)}
                  eventHandlers={{ click: () => {} }}
                >
                  <Popup>
                    <div className="p-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Zone #{z.id}</p>
                      <p className="mt-1 font-display text-base">{z.name}</p>
                      <p className="mt-1 font-mono text-[10px] text-muted-foreground">
                        {z.lat.toFixed(4)}°N, {z.lng.toFixed(4)}°E
                      </p>
                      <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
                        <Bike className="h-3.5 w-3.5 text-primary" />
                        <span className="font-mono text-[11px]">{z.cycles}</span>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">cycles</span>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setEditing(z)}
                          className="flex items-center justify-center gap-1.5 border border-border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] hover:border-primary/40"
                        ><Pencil className="h-3 w-3" /> Edit</button>
                        <button
                          onClick={() => { setZones(zs => zs.filter(x => x.id !== z.id)); toast.success(`Removed "${z.name}"`); }}
                          className="flex items-center justify-center gap-1.5 border border-destructive/50 bg-destructive/10 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-destructive hover:bg-destructive/20"
                        ><Trash2 className="h-3 w-3" /> Delete</button>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
          </MapContainer>
        </div>

        {/* Table */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">All Zones</p>
          <div className="glass mt-4 max-h-[600px] overflow-auto">
            <table className="w-full">
              <thead className="sticky top-0 bg-card">
                <tr className="border-b border-border">
                  {["Name", "Coords", "Cycles", ""].map(h => (
                    <th key={h} className="px-3 py-3 text-left font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {zones.map(z => (
                  <tr key={z.id} className="border-b border-border/50 hover:bg-card/60">
                    <td className="px-3 py-3 font-display text-sm">{z.name}</td>
                    <td className="px-3 py-3 font-mono text-[10px] text-muted-foreground">
                      {z.lat.toFixed(3)}, {z.lng.toFixed(3)}
                    </td>
                    <td className="px-3 py-3 font-mono text-xs text-primary">{z.cycles}</td>
                    <td className="px-3 py-3">
                      <button onClick={() => setEditing(z)} className="text-muted-foreground hover:text-primary">
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AddZoneModal
        mode="create"
        open={!!addCoords}
        onOpenChange={o => { if (!o) setAddCoords(null); }}
        onSave={saveNew}
        coords={addCoords}
      />
      <AddZoneModal
        mode="edit"
        open={!!editing}
        onOpenChange={o => { if (!o) setEditing(null); }}
        onSave={saveEdit}
        onDelete={deleteZone}
        initial={editing}
      />
    </div>
  );
}