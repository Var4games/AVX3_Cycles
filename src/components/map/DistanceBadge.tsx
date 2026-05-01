import { Navigation } from "lucide-react";

export function DistanceBadge({ km, highlight = false }: { km: number | null; highlight?: boolean }) {
  if (km == null) {
    return (
      <span className="inline-flex items-center gap-1 border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        — km
      </span>
    );
  }
  return (
    <span className={`inline-flex items-center gap-1 border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
      highlight ? "border-primary/60 bg-primary/10 text-primary" : "border-border text-muted-foreground"
    }`}>
      <Navigation className="h-2.5 w-2.5" strokeWidth={2} />
      {km.toFixed(1)} km
    </span>
  );
}