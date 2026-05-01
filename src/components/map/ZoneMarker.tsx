import { Marker, Popup } from "react-leaflet";
import { Bike, Navigation2, Lock } from "lucide-react";
import type { Zone } from "@/data/zones";
import { zoneIcon } from "./markerIcons";
import { DistanceBadge } from "./DistanceBadge";
import { toast } from "sonner";

interface Props {
  zone: Zone;
  distanceKm: number | null;
  isNearest?: boolean;
}

export function ZoneMarker({ zone, distanceKm, isNearest = false }: Props) {
  const directions = () => {
    const url = `https://www.openstreetmap.org/directions?from=&to=${zone.lat}%2C${zone.lng}`;
    window.open(url, "_blank", "noopener");
  };
  const reserve = () => {
    if (zone.cycles <= 0) {
      toast.error(`No cycles available at ${zone.name}`);
      return;
    }
    toast.success(`Reserved a cycle at ${zone.name}`);
  };

  return (
    <Marker position={[zone.lat, zone.lng]} icon={zoneIcon(zone.cycles, isNearest)}>
      <Popup>
        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                {isNearest ? "Nearest zone" : "Parking zone"}
              </p>
              <p className="mt-1 font-display text-base text-foreground">{zone.name}</p>
            </div>
            <DistanceBadge km={distanceKm} highlight={isNearest} />
          </div>

          <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
            <Bike className="h-3.5 w-3.5 text-primary" strokeWidth={1.5} />
            <span className="font-mono text-[11px] text-foreground">{zone.cycles}</span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">cycles available</span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              onClick={reserve}
              disabled={zone.cycles <= 0}
              className="flex items-center justify-center gap-1.5 border border-primary/60 bg-primary/10 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary/20 disabled:opacity-40"
            >
              <Lock className="h-3 w-3" /> Reserve
            </button>
            <button
              onClick={directions}
              className="flex items-center justify-center gap-1.5 border border-border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground transition-colors hover:border-primary/40"
            >
              <Navigation2 className="h-3 w-3" /> Directions
            </button>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}